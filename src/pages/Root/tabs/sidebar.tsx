import BtnOrganizateTabs from '@app/components/ai/BtnOrganizateTabs';
import { DubleButtonCollapse } from '@app/components/ui/button';
import useToogle from '@app/hooks/useToogle';
import { openLinksInGroup, openLinksInWindow } from '@app/services/tabs';
import { useBookmarksStore } from '@app/store/useBookmark';
import { useDrag } from '@app/store/useDrag';
import { useTabs } from '@app/store/useTabs';
import { Windows } from '@app/types/tabs';
import { convertToPastel } from '@app/utils/colors';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const ItemTab = ({
  id,
  title,
  windowID,
  color,
}: chrome.tabGroups.TabGroup & { windowID: number }) => {
  const navigation = useNavigate();

  const location = useLocation();
  const groupId = new URLSearchParams(location.search).get('group');
  const selected = id === Number(groupId);

  const [dragItem, setDragItem] = useDrag((s) => [s.dragItem, s.setDragItem]);
  const [getLinkSelected, handleCleanSelected] = useBookmarksStore((s) => [
    s.getLinkSelected,
    s.handleCleanSelected,
  ]);

  return (
    <DubleButtonCollapse
      key={id}
      btnIcon={{ hidden: true }}
      isDragOver={dragItem !== null}
      btnText={{
        onClick: () => {
          if (!dragItem) {
            navigation(`/tabs?window=${windowID}&group=${id}`);
          } else {
            switch (dragItem.type) {
              case 'bookmark': {
                switch (dragItem?.payload.type) {
                  case 'link': {
                    const links = getLinkSelected();
                    openLinksInGroup(links, windowID, id);
                    break;
                  }
                }
                break;
              }
              default: {
                break;
              }
            }
            handleCleanSelected();
            setDragItem(null);
          }
        },
        children: (
          <div className='u-flex-center gap-3'>
            <div
              className='size-3 rounded-[calc(15px-11px)]'
              style={{ background: convertToPastel(color) }}
            ></div>
            {title}
          </div>
        ),
      }}
      open
      selected={selected}
    >
      {selected && (
        <motion.div
          layoutId='badge'
          className='bg-accent-6/15 size-full absolute rounded-lg z-[-1] inset-0'
          transition={{
            duration: 0.5,
            ease: 'anticipate',
            velocity: 0.1,
          }}
        />
      )}
    </DubleButtonCollapse>
  );
};

const ItemWindow = ({
  id,
  groups,
}: Windows & {
  groups: chrome.tabGroups.TabGroup[];
}) => {
  const [collapsed, toggleCollapsed] = useToogle(false);

  const navigation = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const groupId = searchParams.get('group');
  const windowId = searchParams.get('window');

  const [dragItem, setDragItem] = useDrag((s) => [s.dragItem, s.setDragItem]);

  const [getLinkSelected, handleCleanSelected] = useBookmarksStore((s) => [
    s.getLinkSelected,
    s.handleCleanSelected,
  ]);

  const selected = id === Number(windowId) && !groupId;

  return (
    <div key={id} className='mb-2'>
      <DubleButtonCollapse
        className='u-flex-center-start'
        isDragOver={dragItem !== null}
        btnIcon={{
          onClick: toggleCollapsed,
        }}
        btnText={{
          className: 'flex items-center',
          children: id,
          onClick: () => {
            if (!dragItem) {
              navigation(`/tabs?window=${id}`);
            } else {
              switch (dragItem.type) {
                case 'bookmark': {
                  switch (dragItem?.payload.type) {
                    case 'link': {
                      const links = getLinkSelected();
                      openLinksInWindow(links, id);
                      break;
                    }
                  }
                  break;
                }
                default: {
                  break;
                }
              }
              handleCleanSelected();
              setDragItem(null);
            }
          },
        }}
        open={collapsed}
        selected={selected}
      >
        {selected && (
          <motion.div
            layoutId='badge'
            className='bg-accent-6/15 size-full absolute rounded-lg z-[-1] inset-0'
            transition={{
              duration: 0.5,
              ease: 'anticipate',
              velocity: 0.1,
            }}
          />
        )}
        <div className='w-full py-2 absolute left-full m-2'>
          <BtnOrganizateTabs windowsId={id} />
        </div>
      </DubleButtonCollapse>

      {groups.length > 0 && collapsed && (
        <div className='ml-4 my-2 flex flex-col items-start'>
          {groups.map((group) => (
            <ItemTab {...group} windowID={id} key={group.id} />
          ))}
        </div>
      )}
    </div>
  );
};

function List() {
  const [data] = useTabs((s) => [s.tabs]);
  if (!data) return null;
  return (
    <div>
      {data.map(({ groups, window }) => (
        <ItemWindow key={window.id} {...window} groups={groups} />
      ))}
    </div>
  );
}

export default function TabsSidebar() {
  return (
    <div>
      <List />
    </div>
  );
}
