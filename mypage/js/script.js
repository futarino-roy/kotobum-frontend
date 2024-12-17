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
      console.log('取得したデータ：', data);
      const format = data.format;
      const username = data.name; // サーバーから取得した名前
      console.log('フォーマット情報：', format);
      const headerParagraph = document.querySelector('header p');
      if (headerParagraph) {
        headerParagraph.textContent = `${username} 様`; // 名前を表示
      } else {
        console.error('HTML 内に <header> <p> が見つかりません。');
      }

      //中身編集ボタンのリンク先をフォーマットに応じて設定
      const editBtn = document.getElementById('editBtn');
      if (editBtn) {
        editBtn.addEventListener('click', (event) => {
          event.preventDefault();

          if (format === 1) {
            window.location.href = '../edit';
          } else if (format === 2) {
            window.location.href = '../edit2';
          } else if (format === 3) {
            window.location.href = '../edit3';
          } else if (format === 4) {
            window.location.href = '../edit4';
          } else {
            console.warn('不明なフォーマット情報：', format);
          }
        });
      } else {
        console.error('編集ボタンが見つかりません。');
      }

      //中身プレビューボタン
      const previewBtn = document.getElementById('previewBtn');
      if (previewBtn) {
        previewBtn.addEventListener('click', (event) => {
          event.preventDefault();

          if (format === 1) {
            window.location.href = '../preview';
          } else if (format === 2) {
            window.location.href = '../preview2';
          } else if (format === 3) {
            window.location.href = '../preview3';
          } else if (format === 4) {
            window.location.href = '../preview4';
          } else {
            console.warn('不明なフォーマット情報：', format);
          }
        });
      } else {
        console.error('編集ボタンが見つかりません。');
      }

      //表紙編集ボタン
      const coverBtn = document.getElementById('coverBtn');
      if (coverBtn) {
        coverBtn.addEventListener('click', (event) => {
          event.preventDefault();

          if (format === 1) {
            window.location.href = '../cover';
          } else if (format === 2) {
            window.location.href = '../cover2';
          } else if (format === 3) {
            window.location.href = '../cover3';
          } else if (format === 4) {
            window.location.href = '../cover4';
          } else {
            console.warn('不明なフォーマット情報：', format);
          }
        });
      } else {
        console.error('編集ボタンが見つかりません。');
      }

      //表紙プレビューボタン
      const coverpreviewBtn = document.getElementById('cover-previewBtn');
      if (coverpreviewBtn) {
        coverpreviewBtn.addEventListener('click', (event) => {
          event.preventDefault();

          if (format === 1) {
            window.location.href = '../cover-preview';
          } else if (format === 2) {
            window.location.href = '../cover-preview2';
          } else if (format === 3) {
            window.location.href = '../cover-preview3';
          } else if (format === 4) {
            window.location.href = '../cover-preview4';
          } else {
            console.warn('不明なフォーマット情報：', format);
          }
        });
      } else {
        console.error('編集ボタンが見つかりません。');
      }

      //いずれこっちのコードにしたい
      //       // ボタンの設定関数を定義
      // function setupButton(buttonId, path1, path2) {
      //   const button = document.getElementById(buttonId);
      //   if (button) {
      //       button.addEventListener('click', (event) => {
      //           event.preventDefault();

      //           // format の値に応じたリンク先を設定
      //           if (format === 1) {
      //               window.location.href = path1;
      //           } else if (format === 2) {
      //               window.location.href = path2;
      //           } else {
      //               console.warn(`不明なフォーマット情報： ${format}`);
      //           }
      //       });
      //   } else {
      //       console.error(`ボタンが見つかりません：${buttonId}`);
      //   }
      // }

      // // 各ボタンに対して関数を呼び出して設定
      // setupButton('editBtn', '../edit', '../edit2');
      // setupButton('previewBtn', '../preview', '../preview2');
      // setupButton('coverBtn', '../cover', '../cover2');
      // setupButton('cover-reviewBtn', '../cover-preview', '../cover-preview2');


    })
  // .catch((error) => {
  //   console.error('失敗:', error);
  //   alert('名前の取得に失敗しました。3秒後にログインページにリダイレクトします。');
  //   let countdown = 3; // カウントダウンの秒数
  //   const display = document.getElementById('countdown');

  //   const timer = setInterval(() => {
  //     display.textContent = `${countdown}秒後にログインページにリダイレクトします...`;
  //     countdown--;

  //     if (countdown < 0) {
  //       clearInterval(timer); // タイマーを止める
  //       window.location.href = "../login"; // リダイレクト
  //     }
  //   }, 1000); // 1秒ごとに実行
  // });
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

    buttonA_l.style.cursor = 'not-allowed'; // cursorのデザインを変更
    buttonC_l.style.cursor = 'not-allowed';

    // アルバムID取得
    //バックエンドとのAPI連携（校了後にボタンを押せなくする）
    fetch('https://develop-back.kotobum.com/api/albums/${albumId}/cover/send', {
      method: 'POST',
      headers: {
        //この辺の処理送信もいらないかも
        'Content-Type': 'application/json', //送信するデータがJSON形式であることを示す
        Authorization: `Bearer ${token}` //これはトークンで識別のために使うからいる
      },
      body: JSON.stringify({ isKoryoDone: true }), // 校了済みのフラグを送信
    })
      .then((response) => response.json())
      .then((data) => {
        const koryoButton = document.getElementById('koryoButton');
        //　データは返ってこなくて、メッセージが返ってくるので、このこーどはいらないかも

        if (data.isKoryoDone) {
          koryoButton.disabled = true; // 校了済みの場合はボタンを無効化
        } else {
          koryoButton.disabled = false; // 校了がまだの場合はボタンを有効化
        }
      })
      .catch((error) => {
        console.error('サーバーからのフラグ取得時にエラーが発生しました:', error);
      });
  });

  window.addEventListener('load', function () {
    fetch(' ', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const koryoButton = document.getElementById('koryoButton');
        // アルバムIDをもとにアルバムのデータを受け取って、そのデータで校了済みか判断

        if (data.isKoryoDone) {
          koryoButton.disabled = true; // 校了済みの場合はボタンを無効化
        } else {
          koryoButton.disabled = false; // 校了がまだの場合はボタンを有効化
        }
      })
      .catch((error) => {
        console.error('サーバーからのフラグ取得時にエラーが発生しました:', error);
      });
  });

  // モーダルを閉じる
  modalS.classList.remove('is-active');
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
