document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token"); // トークンを取得
  console.log("取得したトークン:", token); // トークンをコンソールに表示

  if (!token) {
    console.error("トークンが見つかりません。サインインしてください。");
    alert("サインインしてください。");
    return;
  }

  fetch("https://develop-back.kotobum.com/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // トークンをヘッダーに追加
    },
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(
            `Network response was not ok: ${response.status} ${response.statusText}. ${text}`
          );
        });
      }
      return response.json();
    })
    .then((data) => {
      const username = data.name; // サーバーから取得した名前
      const headerParagraph = document.querySelector("header p");
      if (headerParagraph) {
        headerParagraph.textContent = `${username} 様`; // 名前を表示
      } else {
        console.error("HTML 内に <header> <p> が見つかりません。");
      }
    })
    .catch((error) => {
      console.error("失敗:", error);
      alert("名前の取得に失敗しました。もう一度お試しください。");
    });
});

//----------------- モーダルに関するJavaScript---------------------

//要素を取得
// const modal = document.querySelectorAll(".js-modal, .js-modal2");
const openButtons = document.querySelectorAll(
  ".js-modal-open, .js-modal-open2"
);

//「開くボタン」をクリックしてモーダルを開く
openButtons.forEach((button) => {
  button.addEventListener("click", modalOpen);
});

function modalOpen(event) {
  const target = event.currentTarget.getAttribute("data-target");
  console.log(`クリックされたボタンのターゲット: ${target}`); // コンソールにクリックされたボタンのターゲットを表示

  const modal = document.querySelector(target);
  if (modal) {
    console.log(`開かれたモーダル: ${modal.id}`); // コンソールに開かれたモーダルのIDを表示
    modal.classList.add("is-active");
  } else {
    console.error(`モーダルが見つかりません: ${target}`); // モーダルが見つからない場合のエラーログ
  }
}

const modals = document.querySelectorAll(".js-modal1, .js-modal2");

modals.forEach((modal) => {
  // モーダルの外側がクリックされたときにモーダルを閉じる
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.classList.remove("is-active");
    }
  });
});
