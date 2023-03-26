// import { textEvent } from "./message/text.gs";

// export default (event, client) => {
//     let message;
//     switch (event.message.type) {
//         case 'text': {
//             message = textEvent(event, client);
//             break;
//         }
//         default: {
//             message = {
//                 type: 'text',
//                 text: 'すみません、よくわかりません'
//             };
//             break;
//         }
//     }
//     return message;
// }