// pushメッセージ用URL
const url = 'https://api.line.me/v2/bot/message/push';

function setting() {
  // チャネルアクセストークン
  const chanelAccessToken = ''; 
}

// ゴミ出しを通知する
function notyfyTakingOutTrash() {
  setting();
  const date = new Date()
  const dayOfToday = getDayOfWeekStr_(date);
  const weekOfMonth = getWeekOfMonth_(date);
  let message = getMessageAboutTrash_(date);
  console.log(`${weekOfMonth}`);
  if (!message){
    console.log(`${dayOfToday}`);
    return;
  }

  const payload = {
    // ユーザーID
    to: 'U6616557a5378302e99c925ab5c5c85a2',
    messages: [
      { 
        type: 'text',
        text: `今日は${dayOfToday}!` 
      },
      {
        type: 'text',
        text: message
      }
    ]
  };

  const params = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + chanelAccessToken
    },
    // オブジェクトをJSONに変換
    payload: JSON.stringify(payload)
  };
  
  // GASでHTTPリクエストを行う
  UrlFetchApp.fetch(url, params);
}

// ミーティングを通知する
function notyfyMeeting() {
  setting();
  const date = new Date()
  const dayOfToday = getDayOfWeekStr_(date);
  if (dayOfToday != '土曜日')
    return;

  const payload = {
    // ユーザーID
    to: 'U6616557a5378302e99c925ab5c5c85a2',
    messages: [
      { 
        type: 'text',
        text: `今日は${dayOfToday}!` 
      },
      {
        type: 'text',
        text: '21:00からミーティングになります。\n参加できない方はSRAにご連絡ください。'
      }
    ]
  };

  const params = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + chanelAccessToken
    },
    // オブジェクトをJSONに変換
    payload: JSON.stringify(payload)
  };
  
  // GASでHTTPリクエストを行う
  UrlFetchApp.fetch(url, params);
}

// ゴミ出しの詳細を返す
function getMessageAboutTrash_(date) {
  let message;
  let member = '徳田龍輝'
  const weekOfMonth = getWeekOfMonth_(date);
  const dayOfWeek = getDayOfWeekStr_(date);
  const trash1 = '・かん類\n・ペットボトル\n・プラスチック製包装容器\n・古紙類\n・燃やせないごみ'
  const trash2 = '・びん類\n・プラスチック製包装容器\n・古紙類'
  
  if (['火曜日', '金曜日'].includes(dayOfWeek)) {
    message = `燃えるゴミの日です！\n${member}さんよろしくお願いします!`;
  }
  else if (dayOfWeek == '月曜日') {
    if (weekOfMonth % 2 != 0 && weekOfMonth < 6){
      message = `燃えないゴミの日です！\n${member}さんよろしくお願いします！\n${trash1}`;
    }else {
      message = `燃えないゴミの日です！\n${member}さんよろしくお願いします！\n${trash2}`;
    }
  }
    return message;
}

// 何週間目か返す
function getWeekOfMonth_(date){
  
  return Math.floor((date.getDate() - date.getDay() + 12 ) / 7);
}

// 曜日を返す
function getDayOfWeekStr_(date){
  const dayOfWeeks = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
  const dayOfWeek = date.getDay();
  return dayOfWeeks[dayOfWeek];
}