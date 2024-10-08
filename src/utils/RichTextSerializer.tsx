// import React from 'react'

// const RichTextSerializer = ({ content }: any) => {
//   const renderNode = (node) => {
//     if (!node) return null

//     switch (node.type) {
//       case 'paragraph':
//         return <p className="mb-4">{node.children.map(renderNode)}</p>

//       case 'text':
//         let textContent = node.text
//         if (node.format & 1) {
//           // Bold
//           textContent = <strong>{textContent}</strong>
//         }
//         if (node.format & 2) {
//           // Italic
//           textContent = <em>{textContent}</em>
//         }
//         return textContent

//       case 'linebreak':
//         return <br />

//       case 'heading':
//         const HeadingTag = node.tag
//         return <HeadingTag className="font-bold mb-2">{node.children.map(renderNode)}</HeadingTag>

//       case 'list':
//         const ListTag = node.tag
//         return (
//           <ListTag
//             className={`${node.listType === 'number' ? 'list-decimal' : 'list-disc'} pl-5 mb-4`}
//           >
//             {node.children.map(renderNode)}
//           </ListTag>
//         )

//       case 'listitem':
//         return (
//           <li className="mb-1">
//             {node.checked !== undefined && (
//               <input type="checkbox" checked={node.checked} readOnly className="mr-2" />
//             )}
//             {node.children.map(renderNode)}
//           </li>
//         )

//       default:
//         return null
//     }
//   }

//   return (
//     <div className="rich-text-content">
//       {content.map((node, index) => (
//         <React.Fragment key={index}>{renderNode(node)}</React.Fragment>
//       ))}
//     </div>
//   )
// }

// export default RichTextSerializer
