console.log('Service Worker Loaded...');
import { toggleModal } from './actions';

const manifest = chrome.runtime.getManifest()
const { resources } = manifest.web_accessible_resources![ 0 ] as {
    resources: string[];
}

async function handleModal(tab: chrome.tabs.Tab) {
    let isActivated = false;
    do {
        try {
            await toggleModal(tab)
            isActivated = true;
        } catch (error) {
            try {
                const fileInjectModal = resources.find((resource) => resource.includes('injectModal')) as string;
                await chrome.scripting.executeScript({
                    target: { tabId: tab.id! },
                    files: [ fileInjectModal ],
                });
            } catch (error) {
                isActivated = true;
            }
        }
    } while (!isActivated);
}

chrome.commands.onCommand.addListener(async (command, tab) => {
    switch (command) {
        case 'toggle-modal': {
            handleModal(tab);
            break;
        }
        default:
            break;
    }
});

async function sendMessageAllTabs(message: string) {
    try {
        const tabs = await chrome.tabs.query({});
        tabs.forEach((tab) => {
            chrome.tabs.sendMessage(tab.id!, {
                type: 'ALIGHT_MODAL',
                payload: message,
            });
        });

    } catch (error) {
        console.error(error);
    }
}

chrome.storage.local.onChanged.addListener((changes) => {
    if (changes.ALIGHT_MODAL) {
        sendMessageAllTabs(changes.ALIGHT_MODAL.newValue ?? 'center');
    }
});


chrome.action.onClicked.addListener(async (tab) => {
    handleModal(tab);
});

