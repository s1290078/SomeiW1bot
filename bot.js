//LINE Developersで取得したアクセストークンを入れる
let chanelAccessToken = 'Mif7641lvCzuosOkVo4hk2dhLsUkj2z7PXJ6ydo0XjKWe/t4C7bXcSyzcSOrI9eokCsgqYaknd5j0lm5scuPe5baMD1wbBbnzOMh8985WzGXWM6DTSltyxyx5wvPeNWJtKJm1gi43FRLIZQqB1d1nAdB04t89/1O/w1cDnyilFU='; 
let lineEndpoint = 'https://api.line.me/v2/bot/message/reply';

//ポストで送られてくるので、送られてきたJSONをパース
function doPost(e) {
  let json = JSON.parse(e.postData.contents);

  //返信するためのトークン取得
  let replyToken= json.events[0].replyToken;
  if (typeof replyToken === 'undefined') {
    return;
  }

  //送られたメッセージ内容を取得
  let message = json.events[0].message.text;  

  // メッセージを返信    
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
        'text': message,
      }],
    }),
  });
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}