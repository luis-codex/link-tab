// import { createGoogleGenerativeAI } from '@ai-sdk/google';
// import { generateObject } from 'ai';
// import { z } from 'zod';

// import IconFilesDrop from '@app/assets/icon-files-drop';
// import { ScrollArea } from '@app/components/ui/scroll-area';
// import { useDrag } from '@app/store/useDrag';
// import debounce from '@app/utils/debounce';
// import { usePreferredLanguage } from '@uidotdev/usehooks';
// import { lazy, Suspense } from 'react';

// const ImportDinamicMarkdown = lazy(() => import('react-markdown'));
// const MarkdownContainer = ({ children }: { children: string }) => {
//   return (
//     <Suspense fallback={null}>
//       <ImportDinamicMarkdown
//         className='pt-2 pb-14'
//         components={{
//           pre(props) {
//             const { children, className: _, ...rest } = props;
//             return (
//               <pre
//                 {...rest}
//                 className={
//                   'font-mono mx-8 text-sm text-accent-6 my-8 border rounded-lg p-4 overflow-auto bg-background/20'
//                 }
//               >
//                 {children}
//               </pre>
//             );
//           },
//         }}
//       >
//         {children}
//       </ImportDinamicMarkdown>
//     </Suspense>
//   );
// };

// const google = createGoogleGenerativeAI({
//   apiKey: 'AIzaSyAjudN-F8pqBOGrqke17JprkkReqJ-3Ni0',
// });

// const DragAndDrop = () => {
//   const k = useDrag((s) => s.dragItem);
//   if (!k) return null;

//   return (
//     <div className='absolute inset-0 m-auto u-flex-center u-bg-points-gradient z-[49] bg-background/30 backdrop-blur-md size-[98%] rounded-[calc(15px-5px)] border-2 border-accent-8'>
//       <IconFilesDrop className='size-28 animate-pulse' />
//     </div>
//   );
// };

// export default function Page() {
//   const language = usePreferredLanguage();

//   const handlerSubmit = debounce(
//     async (e: React.FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
//       const dataTabs = [
//         {
//           id: 1,
//           windowId: 109213,
//           title: 'Google',
//           url: 'https://www.google.com/',
//         },
//         {
//           id: 1,
//           windowId: 109213,
//           title: 'YouTube',
//           url: 'https://www.youtube.com/',
//         },
//         {
//           id: 1,
//           windowId: 109213,
//           title: 'twitch.tv',
//           url: 'https://www.twitch.tv/',
//         },
//         {
//           id: 1,
//           windowId: 109213,
//           title: 'Facebook',
//           url: 'https://www.facebook.com/',
//         },
//       ];

//       const result = await generateObject({
//         model: google('models/gemini-1.5-flash-latest'),
//         schema: z.object({
//           result: z.array(
//             z.object({
//               categoryName: z.string(),
//               tabs: z.array(
//                 z.object({
//                   id: z.number(),
//                   windowId: z.number(),
//                   title: z.string(),
//                   url: z.string(),
//                 })
//               ),
//             })
//           ),
//         }),
//         prompt: `Organize the provided tabs into their respective categories based on content and usage. The category names should be in the language specified by the 'lang' variable. Categories should reflect the primary function or theme of each tab. Here is the tabs data: ${JSON.stringify(
//           dataTabs
//         )}, and the specified language is: ${language}`,
//       });
//       console.log(result.object.result);
//     },
//     500,
//     { immediate: true }
//   );

//   // const res = useObjectState();

//   return (
//     <ScrollArea className='px-3 size-full relative'>
//       <DragAndDrop />
//       <MarkdownContainer>{`**Hola**`}</MarkdownContainer>
//       <form
//         className='u-flex-center px-2 h-10 z-[48] text-accent-6 rounded-[calc(15px-5px)] gap-2 bg-background before:absolute before:rounded-[calc(15px-4px)] before:size-full before:inset-0 before:bg-[url(/bg-noise.webp)] before:z-[-1] before:opacity-20 overflow-hidden absolute inset-x-0 bottom-1 mx-auto w-4/5 max-w-[500px]'
//         onSubmit={handlerSubmit}
//       >
//         <input
//           type='text'
//           className='w-full bg-transparent outline-none text-accent-7 placeholder:text-accent-5 h-full u-flex-center-start pl-2'
//           placeholder='Escribe algo...'
//         />
//         <button
//           type='submit'
//           className='bg-foreground px-3 h-7 text-accent-2 rounded-[calc(15px-5px)]'
//         >
//           <svg
//             data-testid='geist-icon'
//             height='16'
//             stroke-linejoin='round'
//             viewBox='0 0 16 16'
//             width='16'
//             className='size-4'
//           >
//             <path
//               fill-rule='evenodd'
//               clip-rule='evenodd'
//               d='M13.5 3V2.25H15V3V10C15 10.5523 14.5523 11 14 11H3.56068L5.53035 12.9697L6.06068 13.5L5.00002 14.5607L4.46969 14.0303L1.39647 10.9571C1.00595 10.5666 1.00595 9.93342 1.39647 9.54289L4.46969 6.46967L5.00002 5.93934L6.06068 7L5.53035 7.53033L3.56068 9.5H13.5V3Z'
//               fill='currentColor'
//             ></path>
//           </svg>
//         </button>
//       </form>
//     </ScrollArea>
//   );
// }

export default function page() {
  return <div className='u-flex-center'>page</div>;
}
