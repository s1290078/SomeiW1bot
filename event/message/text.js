// export const textEvent = (event, client) => {
//     let message;
//     switch (event.message.text) {
//         case 'こんにちは': {
//             message = {
//                 type: 'text',
//                 text: 'こんにちは！',
//             };
//             break;
//         }

//         default:{
//             // 返信するメッセージを作成
//             message = {
//                 type: 'text',
//                 text: `受け取ったメッセージ: ${event.message.text}\nそのメッセージの返信には対応してません...`,
//             };
//             break;
//         }
//     }
//     return message;
// };