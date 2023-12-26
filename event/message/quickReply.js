// スプレッドシート取得
  const spreadsheet = SpreadsheetApp.openById('1nOjhRPgf-MN6__ZmLq7Tgll6Rfxri1bfYsWqBQfj2Kg');

  // シートの指定
  const sheet = spreadsheet.getSheetByName('シート1');

  // 範囲指定
  const range = sheet.getRange("A2:D15");

  const values = range.getValues();

// LINE Developersで取得したアクセストークンを入れる
let chanelAccessToken = values[13][0];
let lineEndpoint = 'https://api.line.me/v2/bot/message/reply';

// 入居者情報を取得
function getInfo(number) {
  let data = [];
  switch (number) {
    case 0: {
      // メンバー取得
      for (let i = 0; i < values.length; i++) {
        data.push(values[i][0].toString() + ':\n' + values[i][1] + '\n');
        if (i == 10)
          break;
      }
      console.log(data.join("\n"));
      return data.join("\n");
      break;
    }
    case 1: {
      // 掃除当番取得
      let hollway = [];
      let living = [];
      let bathRoom = [];
      let toilet = [];
      let sinkArea = [];
      for (let i = 0; i < values.length; i++) {
        switch (values[i][2].toString()) {
          case ('hollway'): {
            hollway.push(values[i][1].toString());
            break;
          }
          case ('living'): {
            living.push(values[i][1].toString());
            break;
          }
          case ('bathRoom'): {
            bathRoom.push(values[i][1].toString());
            break;
          }
          case ('toilet'): {
            toilet.push(values[i][1].toString());
            break;
          }
          case ('sinkArea'): {
            sinkArea.push(values[i][1].toString());
            break;
          }
          default:
            break;
        }
      }
      data.push('Hollway:\n' + hollway.join("\n") + '\n\nLiving:\n' + living.join("\n") + '\n\nBathRoom:\n' + bathRoom.join("\n") + '\n\nToilet:\n' + toilet.join("\n") + '\n\nSink Area:\n' + sinkArea.join("\n"));
      console.log(data.join("\n"));
      return data.join("\n");
      break;
    }
    case 2: {
      // ゴミ出し当番取得
      let mon = [];
      let tue = [];
      let fri = [];
      for (let i = 0; i < values.length; i++) {
        switch (values[i][3].toString()) {
          case ('mon'): {
            mon.push(values[i][1].toString());
            break;
          }
          case ('tue'): {
            tue.push(values[i][1].toString());
            break;
          }
          case ('fri'): {
            fri.push(values[i][1].toString());
            break;
          }
          default:
            break;
        }
      }
      data.push('Monday:\n' + mon.join("\n") + '\n\nTuesday:\n' + tue.join("\n") + '\n\nFriday:\n' + fri.join("\n"));
      console.log(data.join("\n"));
      return data.join("\n");
      break;
    }
    default: {
      break;
    }
  }
}

// クイックリプライ
function doPost(e) {
  let json = JSON.parse(e.postData.contents);

  //返信するためのトークン取得
  let replyToken = json.events[0].replyToken;
  if (typeof replyToken === 'undefined') {
    return;
  }

  // メッセージを返信    
  switch (json.events[0].message.text) {
    case 'なんでもない no': {
      UrlFetchApp.fetch(lineEndpoint, {
        'headers': {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer ' + chanelAccessToken,
        },
        'method': 'post',
        'payload': JSON.stringify({
          'replyToken': replyToken,
          'messages': [{
            'type': 'text',
            'text': '了解です！\n何かあればメッセージを送信してください！',
          }],
        }),
      });
      break;
    }
    case 'メンバー member': {
      const member = getInfo(0);
      UrlFetchApp.fetch(lineEndpoint, {
        'headers': {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer ' + chanelAccessToken,
        },
        'method': 'post',
        'payload': JSON.stringify({
          'replyToken': replyToken,
          'messages': [{
            'type': 'text',
            'text': member,
          }],
        }),
      });
      break;
    }
    case '掃除担当者 clean member': {
      const cleanData = getInfo(1);
      UrlFetchApp.fetch(lineEndpoint, {
        'headers': {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer ' + chanelAccessToken,
        },
        'method': 'post',
        'payload': JSON.stringify({
          'replyToken': replyToken,
          'messages': [{
            'type': 'text',
            'text': cleanData,
          }],
        }),
      });
      break;
    }
    case 'ゴミ出し担当者 trash member': {
      const trashData = getInfo(2);
      UrlFetchApp.fetch(lineEndpoint, {
        'headers': {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer ' + chanelAccessToken,
        },
        'method': 'post',
        'payload': JSON.stringify({
          'replyToken': replyToken,
          'messages': [{
            'type': 'text',
            'text': trashData,
          }],
        }),
      });
      break;
    }
    default: {
      UrlFetchApp.fetch(lineEndpoint, {
        'headers': {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer ' + chanelAccessToken,
        },
        'method': 'post',
        'payload': JSON.stringify({
          'replyToken': replyToken,
          'messages': [{
            'type': 'text',
            'text': '要件は何ですか？\nWhat do you do?',
            quickReply: {
              items: [
                {
                  type: 'action',
                  action: {
                    type: 'message',
                    label: 'メンバー member',
                    text: 'メンバー member',
                  },
                },
                {
                  type: 'action',
                  action: {
                    type: 'message',
                    label: '掃除担当者 clean member',
                    text: '掃除担当者 clean member',
                  },
                },
                {
                  type: 'action',
                  action: {
                    type: 'message',
                    label: 'ゴミ出し担当者 trash member',
                    text: 'ゴミ出し担当者 trash member'
                  },
                },
                {
                  type: 'action',
                  action: {
                    type: 'message',
                    label: 'なんでもない no',
                    text: 'なんでもない no'
                  },
                },
              ]
            }
          }],
        }),
      });
      return ContentService.createTextOutput(JSON.stringify({ 'content': 'post ok' })).setMimeType(ContentService.MimeType.JSON);
    }
  }
}