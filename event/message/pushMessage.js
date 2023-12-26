// pushメッセージ用URL
const url = 'https://api.line.me/v2/bot/message/push';

// ゴミ出しを通知する
function notifyTakingOutTrash() {
  const date = new Date()
  const dayOfToday = getDayOfWeekStr_(date);
  const weekOfMonth = getWeekOfMonth_(date);
  let message = getMessageAboutTrash_(date);
  console.log(`${weekOfMonth}`);
  if (!message) {
    console.log(`${dayOfToday}`);
    return;
  }

  const payload = {
    // ユーザーID
    to: values[13][1].toString(),
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
function notifyMeeting() {
  setting();
  const date = new Date()
  const dayOfToday = getDayOfWeekStr_(date);
  if (dayOfToday != '土曜日')
    return;

  const payload = {
    // ユーザーID
    to: values[13][1].toString(),
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
  let member = '';
  const weekOfMonth = getWeekOfMonth_(date);
  const dayOfWeek = getDayOfWeekStr_(date);
  const trash1 = '・かん類\n・ペットボトル\n・プラスチック製包装容器\n・古紙類\n・燃やせないごみ'
  const trash2 = '・びん類\n・プラスチック製包装容器\n・古紙類'

  if (dayOfWeek == '火曜日') {
    member = getMember(0);
    message = `燃えるゴミの日です！\n${member}\nよろしくお願いします!`;
  }
  else if (dayOfWeek == '金曜日') {
    member = getMember(1);
    message = `燃えるゴミの日です！\n${member}\nよろしくお願いします!`;
  }
  else if (dayOfWeek == '月曜日') {
    member = getMember(2);
    if (weekOfMonth % 2 != 0 && weekOfMonth < 6) {
      message = `燃えないゴミの日です！\n${member}\nよろしくお願いします！\n${trash1}`;
    } else {
      message = `燃えないゴミの日です！\n${member}\nよろしくお願いします！\n${trash2}`;
    }
  }
  console.log(message);
  return message;
}

// 何週間目か返す
function getWeekOfMonth_(date) {

  return Math.floor((date.getDate() - date.getDay() + 12) / 7);
}

// 曜日を返す
function getDayOfWeekStr_(date) {
  const dayOfWeeks = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
  const dayOfWeek = date.getDay();
  return dayOfWeeks[dayOfWeek];
}

// 曜日ごとのメンバー取得
function getMember(number) {
  let data = [];
  switch (number) {
    case 0: {
      for (let i = 0; i < values.length; i++) {
        if (values[i][3] == 'mon') {
          data.push(values[i][1].toString());
        }
      }
      console.log(data.join("\n"));
      return data.join("\n");
      break;
    }
    case 1: {
      for (let i = 0; i < values.length; i++) {
        if (values[i][3] == 'tue') {
          data.push(values[i][1].toString());
        }
      }
      console.log(data.join("\n"));
      return data.join("\n");
      break;
    }
    case 2: {
      for (let i = 0; i < values.length; i++) {
        if (values[i][3] == 'fri') {
          data.push(values[i][1].toString());
        }
      }
      console.log(data.join("\n"));
      return data.join("\n");
      break;
    }
    default:
      break;
  }
}