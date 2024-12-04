document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('token'); // トークンを取得
  console.log('取得したトークン:', token); // トークンをコンソールに表示

  if (!token) {
    console.error('トークンが見つかりません。サインインしてください。');
    alert('サインインしてください。');
    return;
  }

  fetch('https://develop-back.kotobum.com/api/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // トークンをヘッダーに追加
    },
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(`Network response was not ok: ${response.status} ${response.statusText}. ${text}`);
        });
      }
      return response.json();
    })
    .then((data) => {
      const username = data.name; // サーバーから取得した名前
      const format = data.format;
      console.log('フォーマット情報：', format);
      const headerParagraph = document.querySelector('header p');
      if (headerParagraph) {
        headerParagraph.textContent = `${username} 様`; // 名前を表示
      } else {
        console.error('HTML 内に <header> <p> が見つかりません。');
      }
      //中身編集ボタンのリンク先をフォーマットに応じて設定
      const editBtn = document.getElementById('editBtnB');
      if (editBtn) {
        editBtn.addEventListener('click', (event) => {
          event.preventDefault();

          if (format === 1) {
            window.location.href = '../editB';
          } else if (format === 2) {
            window.location.href = '../editB2';
          } else if (format === 3) {
            window.location.href = '../editB3';
          } else {
            console.warn('不明なフォーマット情報：', format);
          }
        });
      } else {
        console.error('編集ボタンが見つかりません。');
      }
      //中身プレビューボタン
      const previewBtn = document.getElementById('previewBtnB');
      if (previewBtn) {
        previewBtn.addEventListener('click', (event) => {
          event.preventDefault();

          if (format === 1) {
            window.location.href = '../previewB';
          } else if (format === 2) {
            window.location.href = '../previewB2';
          } else if (format === 3) {
            window.location.href = '../previewB3';
          } else {
            console.warn('不明なフォーマット情報：', format);
          }
        });
      } else {
        console.error('編集ボタンが見つかりません。');
      }

      //表紙編集ボタン
      const coverBtn = document.getElementById('coverBtnB');
      if (coverBtn) {
        coverBtn.addEventListener('click', (event) => {
          event.preventDefault();

          if (format === 1) {
            window.location.href = '../coverB';
          } else if (format === 2) {
            window.location.href = '../coverB2';
          } else if (format === 3) {
            window.location.href = '../coverB3';
          } else {
            console.warn('不明なフォーマット情報：', format);
          }
        });
      } else {
        console.error('編集ボタンが見つかりません。');
      }

      //表紙プレビューボタン
      const coverpreviewBtn = document.getElementById('cover-previewBtnB');
      if (coverpreviewBtn) {
        coverpreviewBtn.addEventListener('click', (event) => {
          event.preventDefault();

          if (format === 1) {
            window.location.href = '../coverB-preview';
          } else if (format === 2) {
            window.location.href = '../coverB-preview2';
          } else if (format === 3) {
            window.location.href = '../coverB-preview3';
          } else {
            console.warn('不明なフォーマット情報：', format);
          }
        });
      } else {
        console.error('編集ボタンが見つかりません。');
      }
    })
    .catch((error) => {
      console.error('失敗:', error);
      alert('名前の取得に失敗しました。3秒後にログインページにリダイレクトします。');
      let countdown = 3; // カウントダウンの秒数
      const display = document.getElementById('countdown');

      const timer = setInterval(() => {
        display.textContent = `${countdown}秒後にログインページにリダイレクトします...`;
        countdown--;

        if (countdown < 0) {
          clearInterval(timer); // タイマーを止める
          window.location.href = "../login"; // リダイレクト
        }
      }, 1000); // 1秒ごとに実行
    });
});

//----------------- モーダルに関するJavaScript---------------------

//要素を取得
// const modal = document.querySelectorAll(".js-modal, .js-modal2");
const openButtons = document.querySelectorAll('.js-modal-open, .js-modal-open2');

//「開くボタン」をクリックしてモーダルを開く
openButtons.forEach((button) => {
  button.addEventListener('click', modalOpen);
});

function modalOpen(event) {
  const target = event.currentTarget.getAttribute('data-target');
  console.log(`クリックされたボタンのターゲット: ${target}`); // コンソールにクリックされたボタンのターゲットを表示

  const modal = document.querySelector(target);
  if (modal) {
    console.log(`開かれたモーダル: ${modal.id}`); // コンソールに開かれたモーダルのIDを表示
    modal.classList.add('is-active');
  } else {
    console.error(`モーダルが見つかりません: ${target}`); // モーダルが見つからない場合のエラーログ
  }
}

const modals = document.querySelectorAll('.js-modal1, .js-modal2');

modals.forEach((modal) => {
  // モーダルの外側がクリックされたときにモーダルを閉じる
  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.classList.remove('is-active');
    }
  });

  // モーダル内の閉じるボタンがクリックされたときにモーダルを閉じる
  const closeButton = modal.querySelector('.js-modal-close');
  if (closeButton) {
    closeButton.addEventListener('click', function () {
      modal.classList.remove('is-active');
    });
  }
});

//----------- モーダル内の校了ボタンを押した後のモーダル 表紙用 -------------------
const modalF = document.querySelector('.js-modal1');
const modalS = document.querySelector('.js-modal1_2');

// 校了ボタンの取得
const changeButtons = document.querySelectorAll('.modal-change_l');

changeButtons.forEach((changeButton) => {
  changeButton.addEventListener('click', function () {
    // 最初のモーダルを非表示
    modalF.classList.remove('is-active');
    // 次のモーダルを表示
    modalS.classList.add('is-active');
  });
});

// -------------校了後のマイページのボタン無効化に関するJS　表紙用----------------

// A, C ボタンのセレクタ
const buttonA_l = document.querySelector('.buttonA_l'); //編集ボタン
const buttonC_l = document.querySelector('.buttonC_l'); //校了ボタン

// モーダルを取得
const modal = document.querySelector('#modal1_2');

// モーダル内の「マイページへ」ボタンを取得
const modalButton_ls = document.querySelectorAll('.modal-checkafter__mypage_l');

// 「マイページへ」ボタンをクリックしたら、AボタンとCボタンを無効化
modalButton_ls.forEach((modalButton_l) => {
  modalButton_l.addEventListener('click', function () {
    buttonA_l.disabled = true;
    buttonC_l.disabled = true;

    buttonA_l.style.cursor = 'not-allowed';
    buttonC_l.style.cursor = 'not-allowed';

    // モーダルを閉じる
    modalS.classList.remove('is-active');
  });
});

// 「マイページへ」ボタンをクリックしたら、AボタンとCボタンのデザインを変更
const button_ls = document.querySelectorAll('.modal-checkafter__mypage_l');

// 変更対象(「編集ボタン」と「校了ボタン」)の要素を取得
//「 A, C ボタンのセレクタ」で以下を取得しているため使いまわします。
// const buttonA_l = document.querySelector('.buttonA_l'); //編集ボタン
// const buttonC_l = document.querySelector('.buttonC_l'); //校了ボタン

// ボタンがクリックされたときにクラスを切り替える
button_ls.forEach((button_l) => {
  button_l.addEventListener('click', function () {
    if (buttonC_l.classList.contains('btn-small_bl')) {
      buttonC_l.classList.remove('btn-small_bl');
      buttonC_l.classList.add('btn-small_wh');
    } else {
      buttonC_l.classList.remove('btn-small_wh');
      buttonC_l.classList.add('btn-small_bl');
    }
    buttonC_l.style.opacity = '0.6';
    buttonA_l.style.opacity = '0.6';
  });
});

//----------- モーダル内の校了ボタンを押した後のモーダル 中身用 -------------------
const modalF_r = document.querySelector('.js-modal2');
const modalS_r = document.querySelector('.js-modal2_2');

// 校了ボタンの取得
const changeButton_rs = document.querySelectorAll('.modal-change_r');

changeButton_rs.forEach((changeButton_r) => {
  changeButton_r.addEventListener('click', function () {
    // 最初のモーダルを非表示
    modalF_r.classList.remove('is-active');
    // 次のモーダルを表示
    modalS_r.classList.add('is-active');
  });
});

// -------------校了後のマイページのボタン無効化に関するJS　中身用----------------

// A, C ボタンのセレクタ
const buttonA_r = document.querySelector('.buttonA_r'); //編集ボタン
const buttonC_r = document.querySelector('.buttonC_r'); //校了ボタン

// モーダルを取得
const modal_r = document.querySelector('#modal2_2');

// モーダル内の「マイページへ」ボタンを取得
const modalButton_rs = document.querySelectorAll('.modal-checkafter__mypage_r');

// 「マイページへ」ボタンをクリックしたら、AボタンとCボタンを無効化
modalButton_rs.forEach((modalButton_r) => {
  modalButton_r.addEventListener('click', function () {
    buttonA_r.disabled = true;
    buttonC_r.disabled = true;

    buttonA_r.style.cursor = 'not-allowed';
    buttonC_r.style.cursor = 'not-allowed';

    // モーダルを閉じる
    modalS_r.classList.remove('is-active');
  });
});

// 「マイページへ」ボタンをクリックしたら、AボタンとCボタンのデザインを変更
const button_rs = document.querySelectorAll('.modal-checkafter__mypage_r');

// 変更対象(「編集ボタン」と「校了ボタン」)の要素を取得
//「 A, C ボタンのセレクタ」で以下を取得しているため使いまわします。
// const buttonA_l = document.querySelector('.buttonA_l'); //編集ボタン
// const buttonC_l = document.querySelector('.buttonC_l'); //校了ボタン

// ボタンがクリックされたときにクラスを切り替える
button_rs.forEach((button_r) => {
  button_r.addEventListener('click', function () {
    if (buttonC_r.classList.contains('btn-small_bl')) {
      buttonC_r.classList.remove('btn-small_bl');
      buttonC_r.classList.add('btn-small_wh');
    } else {
      buttonC_r.classList.remove('btn-small_wh');
      buttonC_r.classList.add('btn-small_bl');
    }
    buttonC_r.style.opacity = '0.6';
    buttonA_r.style.opacity = '0.6';
  });
});
