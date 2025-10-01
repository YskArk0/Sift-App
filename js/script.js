//GASのAPIのURL（各自変更してください。）
const endpoint =
  "https://script.google.com/macros/s/AKfycby4Rv0lg9mD2_8k1KGRqCN_VAIDrTMg7d0SZ-R3ukDUnMQDNXcH3Z9dtU_aRmtqDGBE/exec?type=shiftApp";
// "https://script.google.com/macros/s/AKfycbzPesZNajnjHLjBNKqm660g8-NBueIHJnpcypAETvI1t71oE0MgLyU8p5YbLVL0ntc9/exec";
// "https://script.google.com/macros/s/AKfycbxQzA52vna2G3Xg2Mu0AZLrntRn4ccKqQo7JLcQ31FHkwk3zGw56Dq1dtzCb8dCITKR/exec";
// "https://script.google.com/macros/s/AKfycbxWf4nZ22jXM_Bzs9CvBCzCaQqkeHadj5_0rnSCaYuWXoCuuHV9s3Lpt9RKQo5qap1v/exec";
// const endpoint = "../json/sheet.json";
const endpointplase =
  "https://script.google.com/macros/s/AKfycby4Rv0lg9mD2_8k1KGRqCN_VAIDrTMg7d0SZ-R3ukDUnMQDNXcH3Z9dtU_aRmtqDGBE/exec?type=meetingPlace";
var number;
var now = new Date();
var month = now.getMonth() + 1;
var day = now.getDate();
var hour = now.getHours();
var minutes = now.getMinutes();
var second = now.getSeconds();
var shift = [];
var dkey;
var tkey = [];
var key = [];
var name;
var num;
//APIを使って非同期データを取得する
var object;
var objectplase;
fetch(endpoint)
  .then((response) => response.json())
  /*成功した処理*/
  .then((data) => {
    //JSONから配列に変換
    object = data;
  });
fetch(endpointplase)
  .then((response) => response.json())
  /*成功した処理*/
  .then((data) => {
    //JSONから配列に変換
    objectplase = data;
  });
function getText() {
  var textField = document.getElementById("number");
  var text = textField.value;

  getTime();
  // dkey = `d${day}`;
  getSelectedDay();
  console.log(dkey);
  var j = 8;
  for (let i = 0; i <= 24; i++) {
    tkey[i] = `t${j}00`;
    key[i] = dkey + tkey[i];
    i++;
    tkey[i] = `t${j}30`;
    key[i] = dkey + tkey[i];
    j++;
  }

  if (object && object.length) {
    for (num = 0; num < object.length; num++) {
      if (text.toLowerCase() === object[num].number.toLowerCase()) {
        document.getElementById(
          "name"
        ).innerHTML = `${object[num].position} ${object[num].name}`;
        name = object[num].name;
        for (var j = 0; j < 24; j++) {
          // シフト名と集合場所を分割
          const [shiftName, place] = object[num][key[j]]
            ? object[num][key[j]].split("_")
            : [null, null];
          shift[j] = { shiftName, place }; // シフト名と集合場所のオブジェクトを作成
        }
        break;
      }
    }
  }
  console.log(shift);
  for (var i = 0; i < 24; i++) {
    document.getElementById(tkey[i]).innerHTML = shift[i].shiftName;
  }
  nowShift();
}
function getTime() {
  now = new Date();
  month = now.getMonth() + 1;
  day = now.getDate() +1;
  // day = 1;
  hour = now.getHours();
  minutes = now.getMinutes();
  second = now.getSeconds();
  console.log(month, day, hour, minutes, second);
}
function nowShift() {
  getTime();
  var shiftNumber = getShiftNumber(hour, minutes);
  console.log(shiftNumber);

  const currentShift = shift[shiftNumber];
  const nextShift = shift[shiftNumber + 1];

  // 現在のシフト表示
  document.getElementById("now").innerHTML =
    hour.toString().padStart(2, "0") +
    "時" +
    minutes.toString().padStart(2, "0") +
    "分現在のシフト：" +
    (currentShift && currentShift.shiftName
      ? currentShift.shiftName
      : "シフト情報なし");

  // 次のシフト表示
  if (nextShift && nextShift.shiftName) {
    document.getElementById("next").innerHTML =
      "　　　　  　　次のシフト：" + nextShift.shiftName;
  } else {
    document.getElementById("next").innerHTML = "次のシフトはありません";
  }
}

function getShiftNumber(hour, minutes) {
  // 開始時間と終了時間を設定
  const startTime = 8 * 60; // 8時の時間を分単位に変換

  // 指定された時間を分単位に変換
  const currentTime = hour * 60 + minutes;

  // 開始時間からの経過時間を計算
  const elapsedTime = currentTime - startTime;

  // 区切りの時間間隔を設定（30分ごと）
  const interval = 30;

  // 経過時間を区切りの時間間隔で割り、番号を計算
  const shiftNumber = Math.floor(elapsedTime / interval);

  // 番号を返す
  return shiftNumber;
}
nowShift();
setInterval(nowShift, 30000);

// ボタン要素を取得
const modalButtons = document.querySelectorAll(".modal-button");
const discordModalButton = document.getElementById("discordModalButton");

// モーダル要素を取得
const modal = document.getElementById("modal");
const discordModal = document.getElementById("discordModal");
const modalContent = document.querySelector(".modal-content");
const closeModalButton = document.querySelector(".close-button");
const closeDiscordModalButton = document.querySelector(".discordclose-button");
const modalTime = document.getElementById("modal-time");
const modalShift = document.getElementById("modal-shift");
const modalMember = document.getElementById("modal-member");
const modalLeader = document.getElementById("modal-leader");
const modalPlase = document.getElementById("modal-plase");

// モーダル表示関数
function openModal(content) {
  modalTime.textContent = content;
  modal.style.display = "block";
}
function openDiscordModal() {
  // modalTime.textContent = content;
  discordModal.style.display = "block";
}

// モーダル非表示関数
function closeModal() {
  modal.style.display = "none";
}
function closeDiscordModal() {
  discordModal.style.display = "none";
}

modalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const index = button.getAttribute("data-index");
    const namesArray = [];
    const row = button.closest("tr");
    const timeCell = row.cells[0];
    const dataCell = row.cells[1];
    const time = timeCell.textContent;
    const data = dataCell.textContent;
    const id = dataCell.getAttribute("id");
    const keyword = dkey + id;
    console.log(keyword); // indexをコンソールに出力
    let shiftName = "不明なシフト";
    let place = "場所不明";
    // indexが数値として解釈されることを確認
    const numericalIndex = parseInt(index, 10);
    // シフト名と集合場所を分離
    if (object[num] && object[num][keyword]) {
      const entry = object[num][keyword]; // エントリを取得
      [shiftName, place] = entry.includes("_")
        ? entry.split("_")
        : [entry, "場所不明"];
      modalShift.textContent = `シフト: ${shiftName}`;
      modalPlase.textContent = `集合場所: ${place}`;
      // 以下に必要な処理を追加
    }
    // モーダルに詳細情報を表示
    modal.style.display = "block";

    // 他の操作を行う
    let leader = ""; // 初期化
    for (var i = 0; i < object.length; i++) {
      console.log(`Checking object[${i}]:`, object[i]); // デバッグ用にobject[i]を表示

      if (object[i] && object[i][keyword]) {
        console.log(`keyword found in object[${i}]:`, object[i][keyword]);

        if (
          shiftName + "_" + place === object[i][keyword] ||
          shiftName === object[i][keyword]
        ) {
          const name = object[i].name;
          if (name) {
            // name が存在するかチェック
            namesArray.push(name); // object[i].name を配列に追加
            console.log(object[i].name);
          } else {
            console.warn(`name property is missing in object[${i}]`);
          }
        }
      } else {
        console.warn(`object[${i}] does not contain the keyword property`);
      }
    }

    for (var i = 0; i < objectplase.length; i++) {
      if (shiftName === objectplase[i].shift) {
        leader = objectplase[i].leader;
        console.log(leader);
      }
    }

    console.log(namesArray);
    modalTime.textContent = `時間: ${time}`;
    modalLeader.textContent = `担責: ${leader}`;
    modalMember.textContent = `メンバー: ${namesArray.join(", ")}`;
  });
});

discordModalButton.addEventListener("click", openDiscordModal);

// モーダルを閉じるボタンのクリックイベント
closeModalButton.addEventListener("click", closeModal);
closeDiscordModalButton.addEventListener("click", closeDiscordModal);

// モーダルの外側をクリックしたらモーダルを閉じる
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
  if (event.target === discordModal) {
    closeDiscordModal();
  }
});

// script.js
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  const content = document.querySelector(".content");

  // ローディング画面を非表示にする
  loader.style.display = "none";

  // コンテンツを表示する
  content.style.display = "block";
});

document.getElementById("arrival").addEventListener("click", function () {
  sendMessage("arrival");
  document.getElementById("arrival").disabled = true;
  setTimeout(function () {
    document.getElementById("arrival").disabled = false;
  }, 3000);
});
document.getElementById("finish").addEventListener("click", function () {
  sendMessage("finish");
  document.getElementById("finish").disabled = true;
  setTimeout(function () {
    document.getElementById("finish").disabled = false;
  }, 3000);
});
document.getElementById("help").addEventListener("click", function () {
  sendMessage("help");
  document.getElementById("help").disabled = true;
  setTimeout(function () {
    document.getElementById("help").disabled = false;
  }, 3000);
});

function sendMessage(mode) {
  const webhookURL =
    "https://discord.com/api/webhooks/1166236123664752720/vZ59soyAPBZFdhuHbg8bPagpvalqapyuzCo0fc9-eU-EMguxm5a5pradIrCso6Vif1SV";
  const webhookURLSOS =
    "https://discord.com/api/webhooks/1166326645020426261/bM0p-EVqIPNU96bUF7LXWG43rF9y8OvKgfQOtl-KZJjHOgMdOqobrisNd8f_XRJcCwTT";
  var shiftNumber;
  shiftNumber = getShiftNumber(hour, minutes);

  if (mode == "arrival") {
    const message = {
      content: name + "は " + shift[shiftNumber].shiftName + " に到着しました",
    };

    fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((response) => {
        if (response.ok) {
          alert("メッセージが送信されました！");
        } else {
          alert("メッセージの送信に失敗しました。");
        }
      })
      .catch((error) => {
        console.error("エラーが発生しました:", error);
        alert("エラーが発生しました。");
      });
  }
  if (mode == "finish") {
    const message = {
      content: name + "は " + shift[shiftNumber].shiftName + " を終了しました",
    };

    fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((response) => {
        if (response.ok) {
          alert("メッセージが送信されました！");
        } else {
          alert("メッセージの送信に失敗しました。");
        }
      })
      .catch((error) => {
        console.error("エラーが発生しました:", error);
        alert("エラーが発生しました。");
      });
  }
  if (mode == "help") {
    const message = {
      content:
        name + " : " + shift[shiftNumber].shiftName + " の人が足りません",
    };

    fetch(webhookURLSOS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((response) => {
        if (response.ok) {
          alert("メッセージが送信されました！");
        } else {
          alert("メッセージの送信に失敗しました。");
        }
      })
      .catch((error) => {
        console.error("エラーが発生しました:", error);
        alert("エラーが発生しました。");
      });
  }
}

function getSelectedDay() {
  const daySelector = document.getElementById("daySelector");
  const selectedDay = daySelector.options[daySelector.selectedIndex].text;
  console.log("選択した日は: " + selectedDay);
  switch (selectedDay) {
    case "10月31日":
      dkey = "d1";
      break;
    case "11月1日":
      dkey = "d2";
      break;
    case "11月2日":
      dkey = "d3";
      break;
    case "11月3日":
      dkey = "d4";
      break;
    case "11月4日":
      dkey = "d5";
      break;
    case "11月5日":
      dkey = "d6";
      break;
    default:
      // デフォルトの処理 - 何も選択されなかった場合の処理を追加できます
      break;
  }
  // return selectedDay;
}
window.addEventListener("load", function () {
  const daySelector = document.getElementById("daySelector");
  // 初期値を3日目に設定
  daySelector.selectedIndex = day - 1; // 0から始まるインデックスで2は3日目を表します
  console.log(day);
});
