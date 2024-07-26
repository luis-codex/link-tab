// import './style.css';

// // export default BookCollection;

// // export default BookComponent;

// // function convertHtmlToJsx(html: string): string {
// //   // Reemplaza los guiones en los nombres de las propiedades de estilo con camelCase y ajusta las comillas correctamente
// //   const styleRegex = /style="([^"]*)"/g;
// //   html = html.replace(styleRegex, (match, styles) => {
// //     const camelCaseStyles = styles
// //       .split(';')
// //       .filter((style) => style.includes(':')) // Asegura que solo procesa estilos válidos
// //       .map((style) => {
// //         const [key, value] = style.split(':');
// //         // Ajuste de camelCase para claves de estilo
// //         const camelCaseKey = key
// //           .trim()
// //           .replace(/-([a-z])/g, (_, m1) => m1.toUpperCase());
// //         // Corrige las comillas para los valores de estilo en JSX
// //         return `${camelCaseKey}: '${value.trim()}'`;
// //       })
// //       .join(', ');
// //     return `style={{ ${camelCaseStyles} }}`;
// //   });

// //   // Reemplaza class por className
// //   html = html.replace(/\bclass=/g, 'className=');

// //   // Ajusta las propiedades personalizadas para ser compatibles con JSX, corrigiendo las comillas
// //   html = html.replace(/--([a-zA-Z0-9-]+):/g, (match, p1) => {
// //     return `'--${p1}':`;
// //   });

// //   return html;
// // }

// export default function Books() {
//   //   console.log(convertHtmlToJsx(html));
//   return (
//     <div>
//       <section
//         className='grid_grid__MIUsj'
//         data-grid=''
//         style={{
//           '--grid-columns': '1',
//           '--grid-rows': '1',
//           '--sm-height': 'fit-content',
//           borderBottom: '1px solid var(--ds-gray-400)',
//         }}
//       >
//         <div
//           className='grid_block__lyImu'
//           data-grid-cell=''
//           style={{
//             '--lg-cell-columns': 'NaN',
//             '--lg-cell-rows': 'NaN',
//             '--md-cell-columns': 'NaN',
//             '--md-cell-rows': 'NaN',
//             '--sm-cell-columns': 'NaN',
//             '--sm-cell-rows': 'NaN',
//             '--sm-grid-column': '1',
//             '--sm-grid-row': '1',
//             '--smd-cell-columns': 'NaN',
//             '--smd-cell-rows': 'NaN',
//             '--xs-cell-columns': 'NaN',
//             '--xs-cell-rows': 'NaN',
//             overflow: 'visible',
//           }}
//         >
//           <a
//             className='focus-visible:shadow-focus-ring group relative -ml-5 inline-block pl-5 no-underline outline-none'
//             href='#responsive-grid'
//             id='responsive-grid'
//             style={{
//               scrollMarginTop: '32px',
//             }}
//           >
//             <h2
//               className='text_wrapper__i87JK'
//               data-version='v1'
//               style={{
//                 '--text-color': 'var(--ds-gray-1000)',
//                 '--text-letter-spacing': '-0.96px',
//                 '--text-line-height': '2rem',
//                 '--text-size': '1.5rem',
//                 '--text-weight': '600',
//               }}
//             >
//               <div className='absolute left-0 top-[8px] opacity-0 outline-none group-hover:opacity-100 group-focus:opacity-100'>
//                 <svg
//                   data-testid='geist-icon'
//                   height='16'
//                   strokeLinejoin='round'
//                   style={{
//                     color: 'currentcolor',
//                     height: '14px',
//                     width: '14px',
//                   }}
//                   viewBox='0 0 16 16'
//                   width='16'
//                 >
//                   <path
//                     clipRule='evenodd'
//                     d='M8.46968 1.46968C10.1433 -0.203925 12.8567 -0.203923 14.5303 1.46968C16.2039 3.14329 16.2039 5.85674 14.5303 7.53034L12.0303 10.0303L10.9697 8.96968L13.4697 6.46968C14.5575 5.38186 14.5575 3.61816 13.4697 2.53034C12.3819 1.44252 10.6182 1.44252 9.53034 2.53034L7.03034 5.03034L5.96968 3.96968L8.46968 1.46968ZM11.5303 5.53034L5.53034 11.5303L4.46968 10.4697L10.4697 4.46968L11.5303 5.53034ZM1.46968 14.5303C3.14329 16.2039 5.85673 16.204 7.53034 14.5303L10.0303 12.0303L8.96968 10.9697L6.46968 13.4697C5.38186 14.5575 3.61816 14.5575 2.53034 13.4697C1.44252 12.3819 1.44252 10.6182 2.53034 9.53034L5.03034 7.03034L3.96968 5.96968L1.46968 8.46968C-0.203923 10.1433 -0.203925 12.8567 1.46968 14.5303Z'
//                     fill='currentColor'
//                     fillRule='evenodd'
//                   />
//                 </svg>
//               </div>
//               Responsive grid
//             </h2>
//           </a>
//           <p className='mt-2 leading-6 text-gray-900 xl:mt-4'>
//             Grid component with responsive <code>rows</code> and{' '}
//             <code>columns</code> props at all 3 breakpoints.
//           </p>
//           <div className='mt-4 xl:mt-7'>
//             <div className='border-gray-alpha-400 bg-background-100 group relative rounded-lg border'>
//               <div className='flex w-full overflow-x-auto md:overflow-visible'>
//                 <div className='w-full p-6'>
//                   <div className='grid_unstable_gridSystemWrapper__9OFL9'>
//                     <div
//                       className='grid_gridSystem__LtQ2f'
//                       style={{
//                         '--guide-width': '1px',
//                       }}
//                     >
//                       <section
//                         className='grid_grid__MIUsj'
//                         data-grid=''
//                         style={{
//                           '--grid-columns': '3',
//                           '--grid-rows': '2',
//                           '--sm-height': 'fit-content',
//                         }}
//                       >
//                         <div
//                           className='grid_block__lyImu'
//                           data-grid-cell=''
//                           style={{
//                             '--sm-cell-columns': 'auto',
//                             '--sm-cell-rows': 'auto',
//                             '--sm-grid-column': 'auto',
//                             '--sm-grid-row': 'auto',
//                           }}
//                         >
//                           1
//                         </div>
//                         <div
//                           className='grid_block__lyImu'
//                           data-grid-cell=''
//                           style={{
//                             '--sm-cell-columns': 'auto',
//                             '--sm-cell-rows': 'auto',
//                             '--sm-grid-column': 'auto',
//                             '--sm-grid-row': 'auto',
//                           }}
//                         >
//                           2
//                         </div>
//                         <div
//                           className='grid_block__lyImu'
//                           data-grid-cell=''
//                           style={{
//                             '--sm-cell-columns': 'auto',
//                             '--sm-cell-rows': 'auto',
//                             '--sm-grid-column': 'auto',
//                             '--sm-grid-row': 'auto',
//                           }}
//                         >
//                           3
//                         </div>
//                         <div
//                           className='grid_block__lyImu'
//                           data-grid-cell=''
//                           style={{
//                             '--sm-cell-columns': 'auto',
//                             '--sm-cell-rows': 'auto',
//                             '--sm-grid-column': 'auto',
//                             '--sm-grid-row': 'auto',
//                           }}
//                         >
//                           4
//                         </div>
//                         <div
//                           className='grid_block__lyImu'
//                           data-grid-cell=''
//                           style={{
//                             '--sm-cell-columns': 'auto',
//                             '--sm-cell-rows': 'auto',
//                             '--sm-grid-column': 'auto',
//                             '--sm-grid-row': 'auto',
//                           }}
//                         >
//                           5
//                         </div>
//                         <div
//                           className='grid_block__lyImu'
//                           data-grid-cell=''
//                           style={{
//                             '--sm-cell-columns': 'auto',
//                             '--sm-cell-rows': 'auto',
//                             '--sm-grid-column': 'auto',
//                             '--sm-grid-row': 'auto',
//                           }}
//                         >
//                           6
//                         </div>
//                         <div
//                           className='grid_guides__XbybQ'
//                           data-grid-guides='true'
//                         >
//                           <div
//                             aria-hidden='true'
//                             className='grid_guide__Ei25j'
//                             style={{
//                               '--x': '1',
//                               '--y': '1',
//                             }}
//                           />
//                           <div
//                             aria-hidden='true'
//                             className='grid_guide__Ei25j'
//                             style={{
//                               '--x': '2',
//                               '--y': '1',
//                             }}
//                           />
//                           <div
//                             aria-hidden='true'
//                             className='grid_guide__Ei25j'
//                             style={{
//                               '--x': '3',
//                               '--y': '1',
//                               borderRight: 'none',
//                             }}
//                           />
//                           <div
//                             aria-hidden='true'
//                             className='grid_guide__Ei25j'
//                             style={{
//                               '--x': '1',
//                               '--y': '2',
//                               borderBottom: 'none',
//                             }}
//                           />
//                           <div
//                             aria-hidden='true'
//                             className='grid_guide__Ei25j'
//                             style={{
//                               '--x': '2',
//                               '--y': '2',
//                               borderBottom: 'none',
//                             }}
//                           />
//                           <div
//                             aria-hidden='true'
//                             className='grid_guide__Ei25j'
//                             style={{
//                               '--x': '3',
//                               '--y': '2',
//                               borderBottom: 'none',
//                               borderRight: 'none',
//                             }}
//                           />
//                         </div>
//                       </section>
//                       <div className='grid_gridSystemLazyContent__qAuyX' />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className='bg-background-200 relative flex items-center rounded-b-lg border-t border-gray-400'>
//                 <div className='border-b-lg w-full' data-state='closed'>
//                   <button
//                     aria-controls='radix-:r6f:'
//                     aria-expanded='false'
//                     className='bg-background-200 focus-visible:shadow-focus-ring flex h-[48px] w-full cursor-pointer items-center gap-3 rounded-b-lg px-4 text-left font-sans text-sm text-gray-900 focus:outline-none'
//                     data-state='closed'
//                     type='button'
//                   >
//                     <div className='rotate-[-90deg]'>
//                       <svg
//                         data-testid='geist-icon'
//                         height='16'
//                         strokeLinejoin='round'
//                         style={{
//                           color: 'currentcolor',
//                         }}
//                         viewBox='0 0 16 16'
//                         width='16'
//                       >
//                         <path
//                           clipRule='evenodd'
//                           d='M12.0607 6.74999L11.5303 7.28032L8.7071 10.1035C8.31657 10.4941 7.68341 10.4941 7.29288 10.1035L4.46966 7.28032L3.93933 6.74999L4.99999 5.68933L5.53032 6.21966L7.99999 8.68933L10.4697 6.21966L11 5.68933L12.0607 6.74999Z'
//                           fill='currentColor'
//                           fillRule='evenodd'
//                         />
//                       </svg>
//                     </div>
//                     Show code
//                   </button>
//                   <div data-state='closed' hidden id='radix-:r6f:' style={{}} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className='grid_guides__XbybQ' data-grid-guides='true'>
//           <div
//             aria-hidden='true'
//             className='grid_guide__Ei25j'
//             style={{
//               '--x': '1',
//               '--y': '1',
//               borderBottom: 'none',
//               borderRight: 'none',
//             }}
//           />
//         </div>
//       </section>
//       {/* ------------------------ */}
//       <div className='mt-4 xl:mt-7'>
//         <div className='border-gray-alpha-400 bg-background-100 group relative rounded-lg border'>
//           <div className='flex w-full overflow-x-auto md:overflow-visible'>
//             <div className='w-full p-6'>
//               <div
//                 className='stack_stack__iZkUS stack'
//                 data-version='v1'
//                 style={{
//                   '--stack-align': 'baseline',
//                   '--stack-direction': 'row',
//                   '--stack-flex': 'initial',
//                   '--stack-gap': '32px',
//                   '--stack-justify': 'flex-start',
//                   '--stack-padding': '0px',
//                 }}
//               >
//                 <div
//                   className='book_perspective__3OWAu'
//                   style={{
//                     '--book-width': '196',
//                   }}
//                 >
//                   <div className='book_rotate-wrapper___GDX_ book_simple__8nFo3'>
//                     <div
//                       className='stack_stack__iZkUS stack book_book__dm8K_'
//                       data-version='v1'
//                       style={{
//                         '--stack-align': 'stretch',
//                         '--stack-direction': 'column',
//                         '--stack-flex': 'initial',
//                         '--stack-gap': '0px',
//                         '--stack-justify': 'flex-start',
//                         '--stack-padding': '0px',
//                       }}
//                     >
//                       <div
//                         className='stack_stack__iZkUS stack book_body__kq24l'
//                         data-version='v1'
//                         style={{
//                           '--stack-align': 'stretch',
//                           '--stack-direction': 'row',
//                           '--stack-flex': 'initial',
//                           '--stack-gap': '0px',
//                           '--stack-justify': 'flex-start',
//                           '--stack-padding': '0px',
//                         }}
//                       >
//                         <div aria-hidden='true' className='book_bind__hmyBW' />
//                         <div
//                           className='stack_stack__iZkUS stack book_content__3675U'
//                           data-version='v1'
//                           style={{
//                             '--stack-align': 'stretch',
//                             '--stack-direction': 'column',
//                             '--stack-flex': 'initial',
//                             '--stack-gap': '0px',
//                             '--stack-justify': 'flex-start',
//                             '--stack-padding': '0px',
//                           }}
//                         >
//                           <span
//                             className='text_wrapper__i87JK book_title__H_uQ3'
//                             data-version='v1'
//                             style={{
//                               '--text-color': 'var(--ds-gray-1000)',
//                               '--text-letter-spacing': 'initial',
//                               '--text-line-height': '1.25rem',
//                               '--text-size': '0.875rem',
//                               '--text-weight': '600',
//                             }}
//                           >
//                             The user experience of the Frontend Cloud
//                           </span>
//                           <div className='book_illustration__VZiZd'>
//                             <svg
//                               fill='none'
//                               height='56'
//                               viewBox='0 0 36 56'
//                               width='36'
//                               xmlns='http://www.w3.org/2000/svg'
//                             >
//                               <path
//                                 clipRule='evenodd'
//                                 d='M3.03113 28.0005C6.26017 23.1765 11.7592 20.0005 18 20.0005C24.2409 20.0005 29.7399 23.1765 32.9689 28.0005C29.7399 32.8244 24.2409 36.0005 18 36.0005C11.7592 36.0005 6.26017 32.8244 3.03113 28.0005Z'
//                                 fill='#0070F3'
//                                 fillRule='evenodd'
//                               />
//                               <path
//                                 clipRule='evenodd'
//                                 d='M32.9691 28.0012C34.8835 25.1411 36 21.7017 36 18.0015C36 8.06034 27.9411 0.00146484 18 0.00146484C8.05887 0.00146484 0 8.06034 0 18.0015C0 21.7017 1.11648 25.1411 3.03094 28.0012C6.25996 23.1771 11.7591 20.001 18 20.001C24.2409 20.001 29.74 23.1771 32.9691 28.0012Z'
//                                 fill='#45DEC4'
//                                 fillRule='evenodd'
//                               />
//                               <path
//                                 clipRule='evenodd'
//                                 d='M32.9692 28.0005C29.7402 32.8247 24.241 36.001 18 36.001C11.759 36.001 6.25977 32.8247 3.03077 28.0005C1.11642 30.8606 0 34.2999 0 38C0 47.9411 8.05887 56 18 56C27.9411 56 36 47.9411 36 38C36 34.2999 34.8836 30.8606 32.9692 28.0005Z'
//                                 fill='#E5484D'
//                                 fillRule='evenodd'
//                               />
//                             </svg>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div aria-hidden='true' className='book_pages__6N3lq' />
//                     <div aria-hidden='true' className='book_back__Du6NO' />
//                   </div>
//                 </div>
//                 <div
//                   className='book_perspective__3OWAu'
//                   style={{
//                     '--book-width': '196',
//                   }}
//                 >
//                   <div
//                     className='book_rotate-wrapper___GDX_ book_stripe__HjWCM book_color__PrK1W'
//                     style={{
//                       '--book-color': 'var(--ds-amber-600)',
//                     }}
//                   >
//                     <div
//                       className='stack_stack__iZkUS stack book_book__dm8K_'
//                       data-version='v1'
//                       style={{
//                         '--stack-align': 'stretch',
//                         '--stack-direction': 'column',
//                         '--stack-flex': 'initial',
//                         '--stack-gap': '0px',
//                         '--stack-justify': 'flex-start',
//                         '--stack-padding': '0px',
//                       }}
//                     >
//                       <div
//                         aria-hidden='true'
//                         className='stack_stack__iZkUS stack book_stripe__HjWCM'
//                         data-version='v1'
//                         style={{
//                           '--stack-align': 'stretch',
//                           '--stack-direction': 'row',
//                           '--stack-flex': 'initial',
//                           '--stack-gap': '8px',
//                           '--stack-justify': 'flex-start',
//                           '--stack-padding': '0px',
//                         }}
//                       >
//                         <div className='book_illustration__VZiZd' />
//                         <div className='book_bind__hmyBW' />
//                       </div>
//                       <div
//                         className='stack_stack__iZkUS stack book_body__kq24l'
//                         data-version='v1'
//                         style={{
//                           '--stack-align': 'stretch',
//                           '--stack-direction': 'row',
//                           '--stack-flex': 'initial',
//                           '--stack-gap': '0px',
//                           '--stack-justify': 'flex-start',
//                           '--stack-padding': '0px',
//                         }}
//                       >
//                         <div aria-hidden='true' className='book_bind__hmyBW' />
//                         <div
//                           className='stack_stack__iZkUS stack book_content__3675U'
//                           data-version='v1'
//                           style={{
//                             '--stack-align': 'stretch',
//                             '--stack-direction': 'column',
//                             '--stack-flex': 'initial',
//                             '--stack-gap': '0px',
//                             '--stack-justify': 'space-between',
//                             '--stack-padding': '0px',
//                           }}
//                         >
//                           <span
//                             className='text_wrapper__i87JK book_title__H_uQ3'
//                             data-version='v1'
//                             style={{
//                               '--text-color': 'var(--ds-gray-1000)',
//                               '--text-letter-spacing': 'initial',
//                               '--text-line-height': '1.25rem',
//                               '--text-size': '0.875rem',
//                               '--text-weight': '600',
//                             }}
//                           >
//                             The user experience of the Frontend Cloud
//                           </span>
//                           <svg
//                             aria-hidden='true'
//                             data-testid='geist-icon'
//                             height='16'
//                             strokeLinejoin='round'
//                             style={{
//                               color: 'currentcolor',
//                               height: '16px',
//                               width: '16px',
//                             }}
//                             viewBox='0 0 16 16'
//                             width='16'
//                           >
//                             <path
//                               clipRule='evenodd'
//                               d='M8 1L16 15H0L8 1Z'
//                               fill='currentColor'
//                               fillRule='evenodd'
//                             />
//                           </svg>
//                         </div>
//                       </div>
//                     </div>
//                     <div aria-hidden='true' className='book_pages__6N3lq' />
//                     <div aria-hidden='true' className='book_back__Du6NO' />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className='bg-background-200 relative flex items-center rounded-b-lg border-t border-gray-400'>
//             <div className='border-b-lg w-full' data-state='closed'>
//               <button
//                 aria-controls='radix-:rst:'
//                 aria-expanded='false'
//                 className='bg-background-200 focus-visible:shadow-focus-ring flex h-[48px] w-full cursor-pointer items-center gap-3 rounded-b-lg px-4 text-left font-sans text-sm text-gray-900 focus:outline-none'
//                 data-state='closed'
//                 type='button'
//               >
//                 <div className='rotate-[-90deg]'>
//                   <svg
//                     data-testid='geist-icon'
//                     height='16'
//                     strokeLinejoin='round'
//                     style={{
//                       color: 'currentcolor',
//                     }}
//                     viewBox='0 0 16 16'
//                     width='16'
//                   >
//                     <path
//                       clipRule='evenodd'
//                       d='M12.0607 6.74999L11.5303 7.28032L8.7071 10.1035C8.31657 10.4941 7.68341 10.4941 7.29288 10.1035L4.46966 7.28032L3.93933 6.74999L4.99999 5.68933L5.53032 6.21966L7.99999 8.68933L10.4697 6.21966L11 5.68933L12.0607 6.74999Z'
//                       fill='currentColor'
//                       fillRule='evenodd'
//                     />
//                   </svg>
//                 </div>
//                 Show code
//               </button>
//               <div data-state='closed' hidden id='radix-:rst:' style={{}} />
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* ------------ */}
//       <div className='mt-4 xl:mt-7'>
//         <div className='border-gray-alpha-400 bg-background-100 group relative rounded-lg border'>
//           <div className='flex w-full overflow-x-auto md:overflow-visible'>
//             <div className='w-full p-6'>
//               <div
//                 className='book_perspective__3OWAu'
//                 style={{
//                   '--md-book-width': '196',
//                   '--sm-book-width': '150',
//                 }}
//               >
//                 <div
//                   className='book_rotate-wrapper___GDX_ book_stripe__HjWCM book_color__PrK1W'
//                   style={{
//                     '--book-color': 'var(--ds-amber-600)',
//                   }}
//                 >
//                   <div
//                     className='stack_stack__iZkUS stack book_book__dm8K_'
//                     data-version='v1'
//                     style={{
//                       '--stack-align': 'stretch',
//                       '--stack-direction': 'column',
//                       '--stack-flex': 'initial',
//                       '--stack-gap': '0px',
//                       '--stack-justify': 'flex-start',
//                       '--stack-padding': '0px',
//                     }}
//                   >
//                     <div
//                       aria-hidden='true'
//                       className='stack_stack__iZkUS stack book_stripe__HjWCM'
//                       data-version='v1'
//                       style={{
//                         '--stack-align': 'stretch',
//                         '--stack-direction': 'row',
//                         '--stack-flex': 'initial',
//                         '--stack-gap': '8px',
//                         '--stack-justify': 'flex-start',
//                         '--stack-padding': '0px',
//                       }}
//                     >
//                       <div className='book_illustration__VZiZd' />
//                       <div className='book_bind__hmyBW' />
//                     </div>
//                     <div
//                       className='stack_stack__iZkUS stack book_body__kq24l'
//                       data-version='v1'
//                       style={{
//                         '--stack-align': 'stretch',
//                         '--stack-direction': 'row',
//                         '--stack-flex': 'initial',
//                         '--stack-gap': '0px',
//                         '--stack-justify': 'flex-start',
//                         '--stack-padding': '0px',
//                       }}
//                     >
//                       <div aria-hidden='true' className='book_bind__hmyBW' />
//                       <div
//                         className='stack_stack__iZkUS stack book_content__3675U'
//                         data-version='v1'
//                         style={{
//                           '--stack-align': 'stretch',
//                           '--stack-direction': 'column',
//                           '--stack-flex': 'initial',
//                           '--stack-gap': '0px',
//                           '--stack-justify': 'space-between',
//                           '--stack-padding': '0px',
//                         }}
//                       >
//                         <span
//                           className='text_wrapper__i87JK book_title__H_uQ3'
//                           data-version='v1'
//                           style={{
//                             '--text-color': 'var(--ds-gray-1000)',
//                             '--text-letter-spacing': 'initial',
//                             '--text-line-height': '1.25rem',
//                             '--text-size': '0.875rem',
//                             '--text-weight': '600',
//                           }}
//                         >
//                           The user experience of the Frontend Cloud
//                         </span>
//                         <svg
//                           aria-hidden='true'
//                           data-testid='geist-icon'
//                           height='16'
//                           strokeLinejoin='round'
//                           style={{
//                             color: 'currentcolor',
//                             height: '16px',
//                             width: '16px',
//                           }}
//                           viewBox='0 0 16 16'
//                           width='16'
//                         >
//                           <path
//                             clipRule='evenodd'
//                             d='M8 1L16 15H0L8 1Z'
//                             fill='currentColor'
//                             fillRule='evenodd'
//                           />
//                         </svg>
//                       </div>
//                     </div>
//                   </div>
//                   <div aria-hidden='true' className='book_pages__6N3lq' />
//                   <div aria-hidden='true' className='book_back__Du6NO' />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className='bg-background-200 relative flex items-center rounded-b-lg border-t border-gray-400'>
//             <div className='border-b-lg w-full' data-state='closed'>
//               <button
//                 aria-controls='radix-:rt0:'
//                 aria-expanded='false'
//                 className='bg-background-200 focus-visible:shadow-focus-ring flex h-[48px] w-full cursor-pointer items-center gap-3 rounded-b-lg px-4 text-left font-sans text-sm text-gray-900 focus:outline-none'
//                 data-state='closed'
//                 type='button'
//               >
//                 <div className='rotate-[-90deg]'>
//                   <svg
//                     data-testid='geist-icon'
//                     height='16'
//                     strokeLinejoin='round'
//                     style={{
//                       color: 'currentcolor',
//                     }}
//                     viewBox='0 0 16 16'
//                     width='16'
//                   >
//                     <path
//                       clipRule='evenodd'
//                       d='M12.0607 6.74999L11.5303 7.28032L8.7071 10.1035C8.31657 10.4941 7.68341 10.4941 7.29288 10.1035L4.46966 7.28032L3.93933 6.74999L4.99999 5.68933L5.53032 6.21966L7.99999 8.68933L10.4697 6.21966L11 5.68933L12.0607 6.74999Z'
//                       fill='currentColor'
//                       fillRule='evenodd'
//                     />
//                   </svg>
//                 </div>
//                 Show code
//               </button>
//               <div data-state='closed' hidden id='radix-:rt0:' style={{}} />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className='border-gray-alpha-400 bg-background-100 group relative rounded-lg border'>
//         <div className='flex w-full overflow-x-auto md:overflow-visible'>
//           <div className='w-full p-6'>
//             <div
//               className='stack_stack__iZkUS stack'
//               data-version='v1'
//               style={{
//                 '--stack-align': 'stretch',
//                 '--stack-direction': 'column',
//                 '--stack-flex': 'initial',
//                 '--stack-gap': '48px',
//                 '--stack-justify': 'flex-start',
//                 '--stack-padding': '0px',
//               }}
//             >
//               <div
//                 className='stack_stack__iZkUS stack'
//                 data-version='v1'
//                 style={{
//                   '--stack-align': 'baseline',
//                   '--stack-direction': 'row',
//                   '--stack-flex': 'initial',
//                   '--stack-gap': '32px',
//                   '--stack-justify': 'flex-start',
//                   '--stack-padding': '0px',
//                 }}
//               >
//                 <div
//                   className='book_perspective__3OWAu'
//                   style={{
//                     '--book-width': '196',
//                   }}
//                 >
//                   <div
//                     className='book_rotate-wrapper___GDX_ book_stripe__HjWCM book_color__PrK1W'
//                     style={{
//                       '--book-color': '#7DC1C1',
//                     }}
//                   >
//                     <div
//                       className='stack_stack__iZkUS stack book_book__dm8K_'
//                       data-version='v1'
//                       style={{
//                         '--stack-align': 'stretch',
//                         '--stack-direction': 'column',
//                         '--stack-flex': 'initial',
//                         '--stack-gap': '0px',
//                         '--stack-justify': 'flex-start',
//                         '--stack-padding': '0px',
//                       }}
//                     >
//                       <div
//                         aria-hidden='true'
//                         className='stack_stack__iZkUS stack book_stripe__HjWCM'
//                         data-version='v1'
//                         style={{
//                           '--stack-align': 'stretch',
//                           '--stack-direction': 'row',
//                           '--stack-flex': 'initial',
//                           '--stack-gap': '8px',
//                           '--stack-justify': 'flex-start',
//                           '--stack-padding': '0px',
//                         }}
//                       >
//                         <div className='book_illustration__VZiZd' />
//                         <div className='book_bind__hmyBW' />
//                       </div>
//                       <div
//                         className='stack_stack__iZkUS stack book_body__kq24l'
//                         data-version='v1'
//                         style={{
//                           '--stack-align': 'stretch',
//                           '--stack-direction': 'row',
//                           '--stack-flex': 'initial',
//                           '--stack-gap': '0px',
//                           '--stack-justify': 'flex-start',
//                           '--stack-padding': '0px',
//                         }}
//                       >
//                         <div aria-hidden='true' className='book_bind__hmyBW' />
//                         <div
//                           className='stack_stack__iZkUS stack book_content__3675U'
//                           data-version='v1'
//                           style={{
//                             '--stack-align': 'stretch',
//                             '--stack-direction': 'column',
//                             '--stack-flex': 'initial',
//                             '--stack-gap': '0px',
//                             '--stack-justify': 'space-between',
//                             '--stack-padding': '0px',
//                           }}
//                         >
//                           <span
//                             className='text_wrapper__i87JK book_title__H_uQ3'
//                             data-version='v1'
//                             style={{
//                               '--text-color': 'var(--ds-gray-1000)',
//                               '--text-letter-spacing': 'initial',
//                               '--text-line-height': '1.25rem',
//                               '--text-size': '0.875rem',
//                               '--text-weight': '600',
//                             }}
//                           >
//                             Design Engineering at Vercel
//                           </span>
//                           <svg
//                             aria-hidden='true'
//                             data-testid='geist-icon'
//                             height='16'
//                             strokeLinejoin='round'
//                             style={{
//                               color: 'currentcolor',
//                               height: '16px',
//                               width: '16px',
//                             }}
//                             viewBox='0 0 16 16'
//                             width='16'
//                           >
//                             <path
//                               clipRule='evenodd'
//                               d='M8 1L16 15H0L8 1Z'
//                               fill='currentColor'
//                               fillRule='evenodd'
//                             />
//                           </svg>
//                         </div>
//                       </div>
//                       <div
//                         aria-hidden='true'
//                         className='book_texture__4d3lr'
//                         style={{
//                           transform: 'rotate(0deg)',
//                         }}
//                       />
//                     </div>
//                     <div
//                       aria-hidden='true'
//                       className='book_pages__6N3lq book_textured__slT7K'
//                     />
//                     <div aria-hidden='true' className='book_back__Du6NO' />
//                   </div>
//                 </div>
//                 <div
//                   className='book_perspective__3OWAu'
//                   style={{
//                     '--book-width': '196',
//                   }}
//                 >
//                   <div
//                     className='book_rotate-wrapper___GDX_ book_stripe__HjWCM book_color__PrK1W'
//                     style={{
//                       '--book-color': '#9D2127',
//                     }}
//                   >
//                     <div
//                       className='stack_stack__iZkUS stack book_book__dm8K_'
//                       data-version='v1'
//                       style={{
//                         '--stack-align': 'stretch',
//                         '--stack-direction': 'column',
//                         '--stack-flex': 'initial',
//                         '--stack-gap': '0px',
//                         '--stack-justify': 'flex-start',
//                         '--stack-padding': '0px',
//                       }}
//                     >
//                       <div
//                         aria-hidden='true'
//                         className='stack_stack__iZkUS stack book_stripe__HjWCM'
//                         data-version='v1'
//                         style={{
//                           '--stack-align': 'stretch',
//                           '--stack-direction': 'row',
//                           '--stack-flex': 'initial',
//                           '--stack-gap': '8px',
//                           '--stack-justify': 'flex-start',
//                           '--stack-padding': '0px',
//                         }}
//                       >
//                         <div className='book_illustration__VZiZd' />
//                         <div className='book_bind__hmyBW' />
//                       </div>
//                       <div
//                         className='stack_stack__iZkUS stack book_body__kq24l'
//                         data-version='v1'
//                         style={{
//                           '--stack-align': 'stretch',
//                           '--stack-direction': 'row',
//                           '--stack-flex': 'initial',
//                           '--stack-gap': '0px',
//                           '--stack-justify': 'flex-start',
//                           '--stack-padding': '0px',
//                         }}
//                       >
//                         <div aria-hidden='true' className='book_bind__hmyBW' />
//                         <div
//                           className='stack_stack__iZkUS stack book_content__3675U'
//                           data-version='v1'
//                           style={{
//                             '--stack-align': 'stretch',
//                             '--stack-direction': 'column',
//                             '--stack-flex': 'initial',
//                             '--stack-gap': '0px',
//                             '--stack-justify': 'space-between',
//                             '--stack-padding': '0px',
//                           }}
//                         >
//                           <span
//                             className='text_wrapper__i87JK book_title__H_uQ3'
//                             data-version='v1'
//                             style={{
//                               '--text-color': 'var(--ds-gray-1000)',
//                               '--text-letter-spacing': 'initial',
//                               '--text-line-height': '1.25rem',
//                               '--text-size': '0.875rem',
//                               '--text-weight': '600',
//                             }}
//                           >
//                             Design Engineering at Vercel
//                           </span>
//                           <svg
//                             aria-hidden='true'
//                             data-testid='geist-icon'
//                             height='16'
//                             strokeLinejoin='round'
//                             style={{
//                               color: 'currentcolor',
//                               height: '16px',
//                               width: '16px',
//                             }}
//                             viewBox='0 0 16 16'
//                             width='16'
//                           >
//                             <path
//                               clipRule='evenodd'
//                               d='M8 1L16 15H0L8 1Z'
//                               fill='currentColor'
//                               fillRule='evenodd'
//                             />
//                           </svg>
//                         </div>
//                       </div>
//                       <div
//                         aria-hidden='true'
//                         className='book_texture__4d3lr'
//                         style={{
//                           transform: 'rotate(0deg)',
//                         }}
//                       />
//                     </div>
//                     <div
//                       aria-hidden='true'
//                       className='book_pages__6N3lq book_textured__slT7K'
//                     />
//                     <div aria-hidden='true' className='book_back__Du6NO' />
//                   </div>
//                 </div>
//                 <div
//                   className='book_perspective__3OWAu'
//                   style={{
//                     '--book-width': '196',
//                   }}
//                 >
//                   <div
//                     className='book_rotate-wrapper___GDX_ book_stripe__HjWCM book_color__PrK1W'
//                     style={{
//                       '--book-color': '#FED954',
//                     }}
//                   >
//                     <div
//                       className='stack_stack__iZkUS stack book_book__dm8K_'
//                       data-version='v1'
//                       style={{
//                         '--stack-align': 'stretch',
//                         '--stack-direction': 'column',
//                         '--stack-flex': 'initial',
//                         '--stack-gap': '0px',
//                         '--stack-justify': 'flex-start',
//                         '--stack-padding': '0px',
//                       }}
//                     >
//                       <div
//                         aria-hidden='true'
//                         className='stack_stack__iZkUS stack book_stripe__HjWCM'
//                         data-version='v1'
//                         style={{
//                           '--stack-align': 'stretch',
//                           '--stack-direction': 'row',
//                           '--stack-flex': 'initial',
//                           '--stack-gap': '8px',
//                           '--stack-justify': 'flex-start',
//                           '--stack-padding': '0px',
//                         }}
//                       >
//                         <div className='book_illustration__VZiZd' />
//                         <div className='book_bind__hmyBW' />
//                       </div>
//                       <div
//                         className='stack_stack__iZkUS stack book_body__kq24l'
//                         data-version='v1'
//                         style={{
//                           '--stack-align': 'stretch',
//                           '--stack-direction': 'row',
//                           '--stack-flex': 'initial',
//                           '--stack-gap': '0px',
//                           '--stack-justify': 'flex-start',
//                           '--stack-padding': '0px',
//                         }}
//                       >
//                         <div aria-hidden='true' className='book_bind__hmyBW' />
//                         <div
//                           className='stack_stack__iZkUS stack book_content__3675U'
//                           data-version='v1'
//                           style={{
//                             '--stack-align': 'stretch',
//                             '--stack-direction': 'column',
//                             '--stack-flex': 'initial',
//                             '--stack-gap': '0px',
//                             '--stack-justify': 'space-between',
//                             '--stack-padding': '0px',
//                           }}
//                         >
//                           <span
//                             className='text_wrapper__i87JK book_title__H_uQ3'
//                             data-version='v1'
//                             style={{
//                               '--text-color': 'var(--ds-gray-1000)',
//                               '--text-letter-spacing': 'initial',
//                               '--text-line-height': '1.25rem',
//                               '--text-size': '0.875rem',
//                               '--text-weight': '600',
//                             }}
//                           >
//                             Design Engineering at Vercel
//                           </span>
//                           <svg
//                             aria-hidden='true'
//                             data-testid='geist-icon'
//                             height='16'
//                             strokeLinejoin='round'
//                             style={{
//                               color: 'currentcolor',
//                               height: '16px',
//                               width: '16px',
//                             }}
//                             viewBox='0 0 16 16'
//                             width='16'
//                           >
//                             <path
//                               clipRule='evenodd'
//                               d='M8 1L16 15H0L8 1Z'
//                               fill='currentColor'
//                               fillRule='evenodd'
//                             />
//                           </svg>
//                         </div>
//                       </div>
//                       <div
//                         aria-hidden='true'
//                         className='book_texture__4d3lr'
//                         style={{
//                           transform: 'rotate(0deg)',
//                         }}
//                       />
//                     </div>
//                     <div
//                       aria-hidden='true'
//                       className='book_pages__6N3lq book_textured__slT7K'
//                     />
//                     <div aria-hidden='true' className='book_back__Du6NO' />
//                   </div>
//                 </div>
//               </div>
//               <div
//                 className='stack_stack__iZkUS stack'
//                 data-version='v1'
//                 style={{
//                   '--stack-align': 'baseline',
//                   '--stack-direction': 'row',
//                   '--stack-flex': 'initial',
//                   '--stack-gap': '32px',
//                   '--stack-justify': 'flex-start',
//                   '--stack-padding': '0px',
//                 }}
//               >
//                 <div
//                   className='book_perspective__3OWAu'
//                   style={{
//                     '--book-width': '196',
//                   }}
//                 >
//                   <div
//                     className='book_rotate-wrapper___GDX_ book_simple__8nFo3 book_color__PrK1W'
//                     style={{
//                       '--book-color': '#7DC1C1',
//                       '--book-text-color': 'white',
//                     }}
//                   >
//                     <div
//                       className='stack_stack__iZkUS stack book_book__dm8K_'
//                       data-version='v1'
//                       style={{
//                         '--stack-align': 'stretch',
//                         '--stack-direction': 'column',
//                         '--stack-flex': 'initial',
//                         '--stack-gap': '0px',
//                         '--stack-justify': 'flex-start',
//                         '--stack-padding': '0px',
//                       }}
//                     >
//                       <div
//                         className='stack_stack__iZkUS stack book_body__kq24l'
//                         data-version='v1'
//                         style={{
//                           '--stack-align': 'stretch',
//                           '--stack-direction': 'row',
//                           '--stack-flex': 'initial',
//                           '--stack-gap': '0px',
//                           '--stack-justify': 'flex-start',
//                           '--stack-padding': '0px',
//                         }}
//                       >
//                         <div aria-hidden='true' className='book_bind__hmyBW' />
//                         <div
//                           className='stack_stack__iZkUS stack book_content__3675U'
//                           data-version='v1'
//                           style={{
//                             '--stack-align': 'stretch',
//                             '--stack-direction': 'column',
//                             '--stack-flex': 'initial',
//                             '--stack-gap': '0px',
//                             '--stack-justify': 'flex-start',
//                             '--stack-padding': '0px',
//                           }}
//                         >
//                           <span
//                             className='text_wrapper__i87JK book_title__H_uQ3'
//                             data-version='v1'
//                             style={{
//                               '--text-color': 'var(--ds-gray-1000)',
//                               '--text-letter-spacing': 'initial',
//                               '--text-line-height': '1.25rem',
//                               '--text-size': '0.875rem',
//                               '--text-weight': '600',
//                             }}
//                           >
//                             Design Engineering at Vercel
//                           </span>
//                           <div className='book_illustration__VZiZd'>
//                             <svg
//                               fill='none'
//                               height='56'
//                               viewBox='0 0 36 56'
//                               width='36'
//                               xmlns='http://www.w3.org/2000/svg'
//                             >
//                               <path
//                                 clipRule='evenodd'
//                                 d='M3.03113 28.0005C6.26017 23.1765 11.7592 20.0005 18 20.0005C24.2409 20.0005 29.7399 23.1765 32.9689 28.0005C29.7399 32.8244 24.2409 36.0005 18 36.0005C11.7592 36.0005 6.26017 32.8244 3.03113 28.0005Z'
//                                 fill='#0070F3'
//                                 fillRule='evenodd'
//                               />
//                               <path
//                                 clipRule='evenodd'
//                                 d='M32.9691 28.0012C34.8835 25.1411 36 21.7017 36 18.0015C36 8.06034 27.9411 0.00146484 18 0.00146484C8.05887 0.00146484 0 8.06034 0 18.0015C0 21.7017 1.11648 25.1411 3.03094 28.0012C6.25996 23.1771 11.7591 20.001 18 20.001C24.2409 20.001 29.74 23.1771 32.9691 28.0012Z'
//                                 fill='#45DEC4'
//                                 fillRule='evenodd'
//                               />
//                               <path
//                                 clipRule='evenodd'
//                                 d='M32.9692 28.0005C29.7402 32.8247 24.241 36.001 18 36.001C11.759 36.001 6.25977 32.8247 3.03077 28.0005C1.11642 30.8606 0 34.2999 0 38C0 47.9411 8.05887 56 18 56C27.9411 56 36 47.9411 36 38C36 34.2999 34.8836 30.8606 32.9692 28.0005Z'
//                                 fill='#E5484D'
//                                 fillRule='evenodd'
//                               />
//                             </svg>
//                           </div>
//                         </div>
//                       </div>
//                       <div
//                         aria-hidden='true'
//                         className='book_texture__4d3lr'
//                         style={{
//                           transform: 'rotate(180deg)',
//                         }}
//                       />
//                     </div>
//                     <div
//                       aria-hidden='true'
//                       className='book_pages__6N3lq book_textured__slT7K'
//                     />
//                     <div aria-hidden='true' className='book_back__Du6NO' />
//                   </div>
//                 </div>
//                 <div
//                   className='book_perspective__3OWAu'
//                   style={{
//                     '--book-width': '196',
//                   }}
//                 >
//                   <div
//                     className='book_rotate-wrapper___GDX_ book_simple__8nFo3 book_color__PrK1W'
//                     style={{
//                       '--book-color': '#9D2127',
//                       '--book-text-color': '#ece4db',
//                     }}
//                   >
//                     <div
//                       className='stack_stack__iZkUS stack book_book__dm8K_'
//                       data-version='v1'
//                       style={{
//                         '--stack-align': 'stretch',
//                         '--stack-direction': 'column',
//                         '--stack-flex': 'initial',
//                         '--stack-gap': '0px',
//                         '--stack-justify': 'flex-start',
//                         '--stack-padding': '0px',
//                       }}
//                     >
//                       <div
//                         className='stack_stack__iZkUS stack book_body__kq24l'
//                         data-version='v1'
//                         style={{
//                           '--stack-align': 'stretch',
//                           '--stack-direction': 'row',
//                           '--stack-flex': 'initial',
//                           '--stack-gap': '0px',
//                           '--stack-justify': 'flex-start',
//                           '--stack-padding': '0px',
//                         }}
//                       >
//                         <div aria-hidden='true' className='book_bind__hmyBW' />
//                         <div
//                           className='stack_stack__iZkUS stack book_content__3675U'
//                           data-version='v1'
//                           style={{
//                             '--stack-align': 'stretch',
//                             '--stack-direction': 'column',
//                             '--stack-flex': 'initial',
//                             '--stack-gap': '0px',
//                             '--stack-justify': 'flex-start',
//                             '--stack-padding': '0px',
//                           }}
//                         >
//                           <span
//                             className='text_wrapper__i87JK book_title__H_uQ3'
//                             data-version='v1'
//                             style={{
//                               '--text-color': 'var(--ds-gray-1000)',
//                               '--text-letter-spacing': 'initial',
//                               '--text-line-height': '1.25rem',
//                               '--text-size': '0.875rem',
//                               '--text-weight': '600',
//                             }}
//                           >
//                             Design Engineering at Vercel
//                           </span>
//                           <div className='book_illustration__VZiZd'>
//                             <svg
//                               fill='none'
//                               height='56'
//                               viewBox='0 0 36 56'
//                               width='36'
//                               xmlns='http://www.w3.org/2000/svg'
//                             >
//                               <path
//                                 clipRule='evenodd'
//                                 d='M3.03113 28.0005C6.26017 23.1765 11.7592 20.0005 18 20.0005C24.2409 20.0005 29.7399 23.1765 32.9689 28.0005C29.7399 32.8244 24.2409 36.0005 18 36.0005C11.7592 36.0005 6.26017 32.8244 3.03113 28.0005Z'
//                                 fill='#0070F3'
//                                 fillRule='evenodd'
//                               />
//                               <path
//                                 clipRule='evenodd'
//                                 d='M32.9691 28.0012C34.8835 25.1411 36 21.7017 36 18.0015C36 8.06034 27.9411 0.00146484 18 0.00146484C8.05887 0.00146484 0 8.06034 0 18.0015C0 21.7017 1.11648 25.1411 3.03094 28.0012C6.25996 23.1771 11.7591 20.001 18 20.001C24.2409 20.001 29.74 23.1771 32.9691 28.0012Z'
//                                 fill='#45DEC4'
//                                 fillRule='evenodd'
//                               />
//                               <path
//                                 clipRule='evenodd'
//                                 d='M32.9692 28.0005C29.7402 32.8247 24.241 36.001 18 36.001C11.759 36.001 6.25977 32.8247 3.03077 28.0005C1.11642 30.8606 0 34.2999 0 38C0 47.9411 8.05887 56 18 56C27.9411 56 36 47.9411 36 38C36 34.2999 34.8836 30.8606 32.9692 28.0005Z'
//                                 fill='#E5484D'
//                                 fillRule='evenodd'
//                               />
//                             </svg>
//                           </div>
//                         </div>
//                       </div>
//                       <div
//                         aria-hidden='true'
//                         className='book_texture__4d3lr'
//                         style={{
//                           transform: 'rotate(180deg)',
//                         }}
//                       />
//                     </div>
//                     <div
//                       aria-hidden='true'
//                       className='book_pages__6N3lq book_textured__slT7K'
//                     />
//                     <div aria-hidden='true' className='book_back__Du6NO' />
//                   </div>
//                 </div>
//                 <div
//                   className='book_perspective__3OWAu'
//                   style={{
//                     '--book-width': '196',
//                   }}
//                 >
//                   <div
//                     className='book_rotate-wrapper___GDX_ book_simple__8nFo3 book_color__PrK1W'
//                     style={{
//                       '--book-color': '#FED954',
//                       '--book-text-color': '#9d3b05',
//                     }}
//                   >
//                     <div
//                       className='stack_stack__iZkUS stack book_book__dm8K_'
//                       data-version='v1'
//                       style={{
//                         '--stack-align': 'stretch',
//                         '--stack-direction': 'column',
//                         '--stack-flex': 'initial',
//                         '--stack-gap': '0px',
//                         '--stack-justify': 'flex-start',
//                         '--stack-padding': '0px',
//                       }}
//                     >
//                       <div
//                         className='stack_stack__iZkUS stack book_body__kq24l'
//                         data-version='v1'
//                         style={{
//                           '--stack-align': 'stretch',
//                           '--stack-direction': 'row',
//                           '--stack-flex': 'initial',
//                           '--stack-gap': '0px',
//                           '--stack-justify': 'flex-start',
//                           '--stack-padding': '0px',
//                         }}
//                       >
//                         <div aria-hidden='true' className='book_bind__hmyBW' />
//                         <div
//                           className='stack_stack__iZkUS stack book_content__3675U'
//                           data-version='v1'
//                           style={{
//                             '--stack-align': 'stretch',
//                             '--stack-direction': 'column',
//                             '--stack-flex': 'initial',
//                             '--stack-gap': '0px',
//                             '--stack-justify': 'flex-start',
//                             '--stack-padding': '0px',
//                           }}
//                         >
//                           <span
//                             className='text_wrapper__i87JK book_title__H_uQ3'
//                             data-version='v1'
//                             style={{
//                               '--text-color': 'var(--ds-gray-1000)',
//                               '--text-letter-spacing': 'initial',
//                               '--text-line-height': '1.25rem',
//                               '--text-size': '0.875rem',
//                               '--text-weight': '600',
//                             }}
//                           >
//                             Design Engineering at Vercel
//                           </span>
//                           <div className='book_illustration__VZiZd'>
//                             <svg
//                               fill='none'
//                               height='56'
//                               viewBox='0 0 36 56'
//                               width='36'
//                               xmlns='http://www.w3.org/2000/svg'
//                             >
//                               <path
//                                 clipRule='evenodd'
//                                 d='M3.03113 28.0005C6.26017 23.1765 11.7592 20.0005 18 20.0005C24.2409 20.0005 29.7399 23.1765 32.9689 28.0005C29.7399 32.8244 24.2409 36.0005 18 36.0005C11.7592 36.0005 6.26017 32.8244 3.03113 28.0005Z'
//                                 fill='#0070F3'
//                                 fillRule='evenodd'
//                               />
//                               <path
//                                 clipRule='evenodd'
//                                 d='M32.9691 28.0012C34.8835 25.1411 36 21.7017 36 18.0015C36 8.06034 27.9411 0.00146484 18 0.00146484C8.05887 0.00146484 0 8.06034 0 18.0015C0 21.7017 1.11648 25.1411 3.03094 28.0012C6.25996 23.1771 11.7591 20.001 18 20.001C24.2409 20.001 29.74 23.1771 32.9691 28.0012Z'
//                                 fill='#45DEC4'
//                                 fillRule='evenodd'
//                               />
//                               <path
//                                 clipRule='evenodd'
//                                 d='M32.9692 28.0005C29.7402 32.8247 24.241 36.001 18 36.001C11.759 36.001 6.25977 32.8247 3.03077 28.0005C1.11642 30.8606 0 34.2999 0 38C0 47.9411 8.05887 56 18 56C27.9411 56 36 47.9411 36 38C36 34.2999 34.8836 30.8606 32.9692 28.0005Z'
//                                 fill='#E5484D'
//                                 fillRule='evenodd'
//                               />
//                             </svg>
//                           </div>
//                         </div>
//                       </div>
//                       <div
//                         aria-hidden='true'
//                         className='book_texture__4d3lr'
//                         style={{
//                           transform: 'rotate(0deg)',
//                         }}
//                       />
//                     </div>
//                     <div
//                       aria-hidden='true'
//                       className='book_pages__6N3lq book_textured__slT7K'
//                     />
//                     <div aria-hidden='true' className='book_back__Du6NO' />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className='bg-background-200 relative flex items-center rounded-b-lg border-t border-gray-400'>
//           <div className='border-b-lg w-full' data-state='closed'>
//             <button
//               aria-controls='radix-:rt2:'
//               aria-expanded='false'
//               className='bg-background-200 focus-visible:shadow-focus-ring flex h-[48px] w-full cursor-pointer items-center gap-3 rounded-b-lg px-4 text-left font-sans text-sm text-gray-900 focus:outline-none'
//               data-state='closed'
//               type='button'
//             >
//               <div className='rotate-[-90deg]'>
//                 <svg
//                   data-testid='geist-icon'
//                   height='16'
//                   strokeLinejoin='round'
//                   style={{
//                     color: 'currentcolor',
//                   }}
//                   viewBox='0 0 16 16'
//                   width='16'
//                 >
//                   <path
//                     clipRule='evenodd'
//                     d='M12.0607 6.74999L11.5303 7.28032L8.7071 10.1035C8.31657 10.4941 7.68341 10.4941 7.29288 10.1035L4.46966 7.28032L3.93933 6.74999L4.99999 5.68933L5.53032 6.21966L7.99999 8.68933L10.4697 6.21966L11 5.68933L12.0607 6.74999Z'
//                     fill='currentColor'
//                     fillRule='evenodd'
//                   />
//                 </svg>
//               </div>
//               Show code
//             </button>
//             <div data-state='closed' hidden id='radix-:rt2:' style={{}} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
