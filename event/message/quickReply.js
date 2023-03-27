// LINE Developersで取得したアクセストークンを入れる
let chanelAccessToken = 'Mif7641lvCzuosOkVo4hk2dhLsUkj2z7PXJ6ydo0XjKWe/t4C7bXcSyzcSOrI9eokCsgqYaknd5j0lm5scuPe5baMD1wbBbnzOMh8985WzGXWM6DTSltyxyx5wvPeNWJtKJm1gi43FRLIZQqB1d1nAdB04t89/1O/w1cDnyilFU=';
let lineEndpoint = 'https://api.line.me/v2/bot/message/reply';

function doPost(e) {
  let json = JSON.parse(e.postData.contents);

  //返信するためのトークン取得
  let replyToken = json.events[0].replyToken;
  if (typeof replyToken === 'undefined') {
    return;
  }

  let message;
  // メッセージを返信    
  switch (json.events[0].message.text) {
    case 'なんでもない': {
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
    case 'メンバー': {
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
            'text': '2100 徳田龍輝\n2101 member1\n2102 member2\n2103 member3\n2104 member4\n2105 member5\n2106 member6\n2107 member7\n2108 member8\n2109 member9\n2110 member10\n2111 member11\n2112 member12',
          }],
        }),
      });
      break;
    }
    case '掃除担当者': {
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
            'text': '廊下:徳田龍輝\nリビング: \nトイレ: \nシャワールーム: \n洗面台付近:',
          }],
        }),
      });
      break;
    }
    case 'ゴミ出し担当者': {
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
            'text': '燃えないゴミの日(月曜日):memberOfMonday\n燃えるゴミの日(火曜日と金曜日):memberOfTuesdayAndFriday',
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
            'text': '要件は何ですか？',
            quickReply: {
              items: [
                {
                  type: 'action',
                  action: {
                    type: 'message',
                    label: 'メンバー',
                    text: 'メンバー',
                  },
                },
                {
                  type: 'action',
                  action: {
                    type: 'message',
                    label: '掃除担当者',
                    text: '掃除担当者',
                  },
                },
                {
                  type: 'action',
                  action: {
                    type: 'message',
                    label: 'ゴミ出し担当者',
                    text: 'ゴミ出し担当者'
                  },
                },
                {
                  type: 'action',
                  action: {
                    type: 'message',
                    label: 'なんでもない',
                    text: 'なんでもない'
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