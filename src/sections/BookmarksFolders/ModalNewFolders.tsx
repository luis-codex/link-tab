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
        <Content className='fixed inset-0 m-auto w-[300px] h-fit border z-50 bg-background rounded shadow-2xl dark:shadow-foreground/5'>
          <form
            className='u-bg-noise size-full p-4 grid gap-6 overflow-hidden'
            onSubmit={handleSubmit}
          >
            <div className='absolute pointer-events-none size-full bg-foreground/5 inset-0'></div>
            <Title
              className='font-semibold text-center uppercase text
            -sm'
            >
              {dataNewFolder?.type === 'edit' ? 'Edit' : 'New'} folder
            </Title>
            <Input
              placeholder='Folder name'
              name='folderName'
              defaultValue={
                dataNewFolder?.type === 'edit' ? dataNewFolder?.title : ''
              }
            />
            {/* <div className='grid grid-cols-2'> */}
            <Button type='submit' className='uppercase text-sm'>
              save
            </Button>
            {/* </div> */}
          </form>
          <Close
            type='button'
            className='text-red-500 absolute -right-3 -top-3 uppercase text-sm bg-accent-2 rounded-full p-1 u-flex-center'
          >
            <X className='size-4' />
          </Close>
        </Content>
      </Portal>
    </Root>
  );
}
