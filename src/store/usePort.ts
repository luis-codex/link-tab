import { create } from 'zustand';

export enum IPortMessage {
    REVALIDATE_NOTES = 1,
    REVALIDATE_LIBRARY = 2,
    REVALIDATE_THEME = 3,
    REVALIDATE_CHATGPT = 4,
    REVALIDATE_KANBAN = 5,
}

type Message = {
    type: IPortMessage;
    payload?: unknown;
};

export interface PopupMessageEvent {
    data: Message;
}

interface PortPopupMessages {
    postMessage: (message: Message) => void;
    addEventListener: (
        type: 'message' | 'messageerror',
        callback: (event: PopupMessageEvent) => void
    ) => void;
    removeEventListener: (
        type: 'message' | 'messageerror',
        callback: (event: PopupMessageEvent) => void
    ) => void;
}

type GlobalPort = {
    port: PortPopupMessages;
};

export const useGlobalPort = create<GlobalPort>(() => ({
    port: new BroadcastChannel('port-global-store'),
}));