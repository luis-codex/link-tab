import { Button } from '@app/components/ui/button';
import { Input } from '@app/components/ui/input';
import { createFolder, editFolder } from '@app/services/bookmarks';
import useStoreSidebar from '@app/store/Sidebar/useStoreSidebar';
import { Close, Content, Portal, Root, Title } from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

export default function ModalNewFolders() {
  const [dataNewFolder, SetIdNewFolder] = useStoreSidebar((s) => [
    s.dataNewFolder,
    s.SetIdNewFolder,
  ]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!dataNewFolder?.id) return;
    const formData = new FormData(e.currentTarget);
    const folderName = formData.get('folderName') as string;
    switch (dataNewFolder.type) {
      case 'edit':
        editFolder(dataNewFolder.id, folderName);
        break;
      case 'new':
        createFolder(folderName, dataNewFolder.id);
        break;
      default:
        break;
    }
    SetIdNewFolder(null);
  };

  return (
    <Root
      open={!!dataNewFolder}
      onOpenChange={(open) => {
        if (!open) {
          SetIdNewFolder(null);
        }
      }}
    >
      <Portal>
        <Content className='fixed inset-0 m-auto w-[300px] h-fit outline outline-accent-2 z-50 before-noise bg-background/50 backdrop-blur-3xl rounded-[calc(15px-5px)] shadow-2xl'>
          <form
            className='size-full p-4 grid gap-6 overflow-hidden text-accent-6 rounded-xl'
            onSubmit={handleSubmit}
          >
            <Title className='font-semibold text-center uppercase text-sm'>
              {dataNewFolder?.type === 'edit' ? 'Edit' : 'New'} folder
            </Title>
            <Input
              placeholder='Folder name'
              name='folderName'
              className='bg-transparent'
              defaultValue={
                dataNewFolder?.type === 'edit' ? dataNewFolder?.title : ''
              }
            />
            <Button type='submit' className='uppercase text-sm'>
              save
            </Button>
            {/* </div> */}
          </form>
          <Close
            type='button'
            className='text-red-300 absolute -right-3 -top-3 uppercase text-sm bg-red-700 rounded-full p-1 u-flex-center'
          >
            <X className='size-4' />
          </Close>
        </Content>
      </Portal>
    </Root>
  );
}
