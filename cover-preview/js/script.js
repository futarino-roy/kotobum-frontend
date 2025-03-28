const swiper = new Swiper('.swiper', {
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 1, // 常に1枚のスライドを表示
  slidesPerGroup: 1, // 常に1スライドずつ移動
});

// メインのスライドからプレビュー
document.addEventListener('DOMContentLoaded', function () {
  // URLのクエリパラメータを取得
  const urlParams = new URLSearchParams(window.location.search);
  const slideNumber = urlParams.get('slide');

  // 取得したスライド番号を使って対応するスライドを表示
  if (slideNumber) {
    swiper.slideTo(slideNumber - 1, 0); // スライド番号に対応するインデックスに移動
    console.log(`Displaying preview for slide ${slideNumber}`);
  }
});

// プレビューからメイン
document.getElementById('editBack').addEventListener('click', function () {
  const currentSlideIndex = swiper.realIndex; // 現在のスライドインデックスを取得
  const mainPageUrl = `../coverB/index.html?slide=${currentSlideIndex + 1}`; // スライド番号をクエリパラメータに追加
  window.location.href = mainPageUrl; // メインページに遷移
});

// 画像の挿入 indexedDB
// let myImageDB1; // この行を削除しました

// IndexedDBの初期化
function initIndexedDBForPreview() {
  // ここでの処理は削除されました
  console.error('Image saving functionality has been removed.');
}

// ドロップエリアに画像を復元する
function restoreDropAreasInPreview() {
  const dropAreas = document.querySelectorAll('.empty'); // すべてのドロップエリアを取得
  dropAreas.forEach((dropArea) => {
    // 画像を復元する処理は削除されました
    console.log('Restoration of images from IndexedDB has been removed.');
  });
}

// ページが読み込まれたときにIndexedDBを初期化
document.addEventListener('DOMContentLoaded', function () {
  initIndexedDBForPreview();
});

// 画像のドラッグ indexedDB
// let myimageDB2; // この行を削除しました
// const request = indexedDB.open("ImageDB", 1); // この行を削除しました

// 画像を取得する処理は削除されました

// すべての画像をロードする
function loadAllImages() {
  const emptyElements = document.querySelectorAll('.empty');
  emptyElements.forEach(function (dropArea) {
    // 画像をロードする処理は削除されました
    console.log('Loading images from IndexedDB has been removed.');
  });
}

// ドキュメントが読み込まれた後の処理
document.addEventListener('DOMContentLoaded', function () {
  loadAllImages(); // ページがロードされたときにすべての画像を表示

  // 必要に応じて、ユーザーが画像を操作するためのその他の機能を追加
});

// ドキュメントが読み込まれた後の処理
document.addEventListener('DOMContentLoaded', function () {
  loadAllImages(); // ページがロードされたときにすべての画像を表示

  // 必要に応じて、ユーザーが画像を操作するためのその他の機能を追加
});

// 枠 柔軟版
document.addEventListener('DOMContentLoaded', function () {
  // 枠のサイズ変更処理
  function applyBorders() {
    // dropAreaを含む全ての要素を取得
    const dropAreas = document.querySelectorAll('[id^="dropArea"]');

    dropAreas.forEach((dropAreaContainer) => {
      // IDからサイズの情報を取得
      const dropAreaId = dropAreaContainer.id;
      // ここでローカルストレージからサイズ情報を取得する処理を削除しました。
      // const dropAreaSize = localStorage.getItem(`dropAreaSize_${dropAreaId}`);
      // もし必要であれば、他の方法でサイズを管理してください。

      // サイズの適用処理は必要に応じて追加してください
    });
  }

  // 枠のサイズ変更を適用
  applyBorders();
});

function adjustTextareaSize(textarea) {
  // 高さをリセットしてから内容に応じて高さを調整
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;

  // 幅をリセットしてから内容に応じて幅を調整
  textarea.style.width = 'auto';
  textarea.style.width = `${textarea.scrollWidth}px`;
}

// プレビューページでテキストエリアに表示する関数
function loadTextForPreview() {
  // テキストエリアのIDが"previewTextArea"で始まるすべての要素を取得
  const textAreas = document.querySelectorAll('textarea[id^="previewTextArea"]');

  textAreas.forEach((textArea) => {
    // IDからインデックスを取得
    textArea.value = ''; // ローカルストレージからの取得処理を削除
    // テキストエリアの高さを調整
    adjustTextareaSize();
  });
}

// ドキュメントが読み込まれたときにテキストを表示
document.addEventListener('DOMContentLoaded', function () {
  loadTextForPreview();
});

//-------------------------------------追加----------------------------------
const textArea = document.getElementById('textAreaB-1');

const updateTextAreaStyle = () => {
  const textLength = textArea.value.length;
  const windowWidth = window.innerWidth;
  let fontSize = '0.75rem';
  let lineHeight = 1.2;

  if (windowWidth >= 1500) {
    // モニタサイズ (1500px以上)
    if (textLength <= 4) {
      fontSize = '0.95rem';
      lineHeight = 1.5;
    } else if (textLength <= 6) {
      fontSize = '0.85rem';
      lineHeight = 1.6;
    } else if (textLength === 7) {
      fontSize = '0.75rem';
      lineHeight = 1.9;
    } else {
      fontSize = '0.65rem';
      lineHeight = 2.4;
    }
  } else if (windowWidth >= 1200 && windowWidth < 1500) {
    // PC① (1200px～1500px)
    if (textLength <= 4) {
      fontSize = '0.7rem';
      lineHeight = 1.3;
    } else if (textLength <= 6) {
      fontSize = '0.6rem';
      lineHeight = 1.5;
    } else if (textLength === 7) {
      fontSize = '0.5rem';
      lineHeight = 1.8;
    } else {
      fontSize = '0.4rem';
      lineHeight = 2.375;
    }
  } else if (windowWidth >= 900 && windowWidth < 1200) {
    // PC② (900px～1200px)
    if (textLength <= 4) {
      fontSize = '0.6rem';
      lineHeight = 1.1;
    } else if (textLength <= 6) {
      fontSize = '0.4rem';
      lineHeight = 1.3;
    } else if (textLength === 7) {
      fontSize = '0.4rem';
      lineHeight = 1.7;
    } else {
      fontSize = '0.34rem';
      lineHeight = 2.0;
    }
  } else if (windowWidth >= 480 && windowWidth < 900) {
    // タブレットサイズ (480px～900px)
    if (textLength <= 4) {
      fontSize = '0.75rem';
      lineHeight = 1.3;
    } else if (textLength <= 6) {
      fontSize = '0.65rem';
      lineHeight = 1.6;
    } else if (textLength === 7) {
      fontSize = '0.55rem';
      lineHeight = 2.0;
    } else {
      fontSize = '0.55rem';
      lineHeight = 2.0;
    }
  } else {
    // スマホサイズ (480px未満)
    if (textLength <= 4) {
      fontSize = '0.75rem';
      lineHeight = 1.2;
    } else if (textLength <= 6) {
      fontSize = '0.6rem';
      lineHeight = 1.5;
    } else if (textLength === 7) {
      fontSize = '0.55rem';
      lineHeight = 1.8;
    } else {
      fontSize = '0.45rem';
      lineHeight = 2.0;
    }
  }

  // スタイル適用
  textArea.style.fontSize = fontSize;
  textArea.style.lineHeight = lineHeight.toString();
};

// イベントリスナーを追加
textArea.addEventListener('input', updateTextAreaStyle);
window.addEventListener('resize', updateTextAreaStyle);

// 初期スタイルを適用
updateTextAreaStyle();

//--------------------------------------ここまで-----------------------------------

// 色変更
// プレビューページで色を適用する関数
function applySavedColor() {
  const savedColor = ''; // ローカルストレージからの取得処理を削除
  // もし色が必要な場合は、色を直接指定してください。
  if (savedColor) {
    // 背景色を適用
    let elements = document.getElementsByClassName('uniqueColorB');
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor = savedColor;
    }

    // テキスト色を適用
    let textElements = document.getElementsByClassName('text-colorB');
    for (let i = 0; i < textElements.length; i++) {
      textElements[i].style.color = savedColor;
    }
  }
}

// ドキュメントが読み込まれたときに色を適用
document.addEventListener('DOMContentLoaded', function () {
  applySavedColor();
});

//--------------------------API連携------------------------------------

document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('認証トークンが見つかりません。ログインしてください。');
    return;
  }

  let albumId;

  // アルバムIDを取得
  fetch('https://develop-back.kotobum.com/api/user/album', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`アルバムID取得時のHTTPエラー: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then((albums) => {
      albumId = albums.albumId;

      if (!albumId) {
        console.error('アルバムIDを取得できませんでした。');
        return;
      }
      console.log('取得したアルバムID:', albumId); // 取得したアルバムIDを表示

      // アルバムデータ取得リクエスト
      return fetch(`https://develop-back.kotobum.com/api/albums/${albumId}/showCover`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`アルバムデータ取得時のHTTPエラー: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log('取得したデータ:', data);

      // テキストデータを反映
      const textData = Array.isArray(data.textData) ? data.textData : JSON.parse(data.textData);
      if (textData && Array.isArray(textData)) {
        textData.forEach((item) => {
          const textArea = document.getElementById(item.id);
          if (textArea) {
            textArea.value = item.text;
            adjustTextareaSize(textArea);
          } else {
            console.warn(`テキストエリアが見つかりません: ID ${item.id}`);
          }
        });
      } else {
        console.warn('テキストデータが存在しないか、配列ではありません。');
      }

      const covertext = Array.isArray(data.covertext) ? data.covertext : JSON.parse(data.covertext);
      if (covertext && Array.isArray(covertext)) {
        covertext.forEach((item) => {
          const textArea = document.getElementById(item.id);
          if (textArea) {
            textArea.value = item.text;
            adjustTextareaSize(textArea);
          } else {
            console.warn(`テキストエリアが見つかりません: ID ${item.id}`);
          }
        });
      } else {
        console.warn('テキストデータが存在しないか、配列ではありません。');
      }

      // 画像データを反映
      const imageData = Array.isArray(data.imageData) ? data.imageData : JSON.parse(data.imageData);
      if (imageData && Array.isArray(imageData)) {
        imageData.forEach((item) => {
          const dropArea = document.getElementById(item.id);
          if (dropArea && item.image) {
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = 'Image';
            img.style.width = '100%';
            img.style.height = '100%';
            dropArea.appendChild(img);
          } else {
            console.warn(`画像データが存在しないか、画像が見つかりません: ID ${item.id}`);
          }
        });
      } else {
        console.warn('画像データが存在しないか、配列ではありません。');
      }

      // 色データを反映
      const colors = typeof data.colors === 'object' ? data.colors : JSON.parse(data.colors);
      console.log('colors:', colors);
      if (colors) {
        const { backgroundColor, textColor } = colors;

        // `.uniqueColor` クラスを持つすべての要素に背景色を設定
        document.querySelectorAll('.uniqueColorB').forEach((element) => {
          element.style.backgroundColor = backgroundColor || '#ffffff';
        });

        // `.text-color` クラスを持つすべての要素にテキスト色を設定
        document.querySelectorAll('.text-colorB').forEach((element) => {
          element.style.color = textColor || '#000000';
        });

        console.log(`背景色: ${backgroundColor}, テキスト色: ${textColor}`);
      } else {
        console.warn('色データが存在しません。');
      }
    })
    .catch((error) => {
      console.error('データ取得エラー:', error);
    });
});

//----------------- モーダルに関するJavaScript---------------------

//要素を取得
const openButton = document.querySelector('.js-modal-open');
const modal = document.getElementById('modal1');

//「開くボタン」をクリックしてモーダルを開く

openButton.addEventListener('click', function () {
  console.log(`開かれたモーダル: ${modal.id}`); // コンソールに開かれたモーダルのIDを表示
  modal.classList.add('is-active'); // モーダルを表示
  console.log(`開かれたモーダル: ${modal.id}`); // コンソールに開かれたモーダルのIDを表示
});

// モーダルの外側がクリックされたときにモーダルを閉じる
modal.addEventListener('click', function (event) {
  if (event.target === modal) {
    // event.targetを使ってモーダルの外側かどうかをチェック
    modal.classList.remove('is-active'); // モーダルを閉じる
  }
});

// モーダル内の閉じるボタンがクリックされたときにモーダルを閉じる
const closeButton = modal.querySelector('.js-modal-close');
if (closeButton) {
  closeButton.addEventListener('click', function (event) {
    event.preventDefault();
    modal.classList.remove('is-active');
  });
}

//----------- モーダル内の校了ボタンを押した後のモーダル -------------------
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
    // 完了状態をローカルストレージに保存
    localStorage.setItem('coverCompleted', 'true');
    // サーバーに完了状態を送信
    sendCompletionStatusToServer();
  });
});

// -------------校了後のマイページのボタン無効化に関するJS　表紙用----------------

// モーダル内の「マイページへ」ボタンを取得
const modalButton_ls = document.querySelector('.modal-checkafter__mypage_l');

modalButton_ls.addEventListener('click', function () {
  window.location.href = 'mypage.html?disable=true&cursor=not-allowed';
});

// //----------- モーダル内の校了ボタンを押した後のモーダル 中身用 -------------------
// const modalF_r = document.querySelector('.js-modal2');
// const modalS_r = document.querySelector('.js-modal2_2');

// // 校了ボタンの取得
// const changeButton_rs = document.querySelectorAll('.modal-change_r');

// changeButton_rs.forEach((changeButton_r) => {
//   changeButton_r.addEventListener('click', function () {
//     // 最初のモーダルを非表示
//     modalF_r.classList.remove('is-active');
//     // 次のモーダルを表示
//     modalS_r.classList.add('is-active');
//   });
//   // 完了状態をローカルストレージに保存
//   localStorage.setItem('mainTextCompleted', 'true');

//   // サーバーに完了状態を送信
//   sendCompletionStatusToServer();
// });

// // -------------校了後のマイページのボタン無効化に関するJS　中身用----------------

// // モーダル内の「マイページへ」ボタンを取得
// const modalButton_rs = document.querySelectorAll('.modal-checkafter__mypage_r');

// modalButton_ls.addEventListener('click', function () {
//   window.location.href = 'mypage.html?disable=true&cursor=not-allowed';
//   console.log(window.location.search);
// });

// --------------------完了状態をサーバーに送信する関数-----------------------------------
function sendCompletionStatusToServer() {
  const token = localStorage.getItem('token'); // 認証トークンを取得

  if (!token) {
    console.error('認証トークンが見つかりません。ログインしてください。');
    return;
  }

  // アルバムIDを取得
  fetch('https://develop-back.kotobum.com/api/user/album', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`アルバムID取得時のHTTPエラー: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then((albums) => {
      const albumId = albums.albumId; // サーバーから取得したアルバムID

      if (!albumId) {
        console.error('アルバムIDを取得できませんでした。');
        return;
      }

      console.log('取得したアルバムID:', albumId); // 取得したアルバムIDを表示

      // アルバムIDを使って完了状態をサーバーに送信
      return fetch(`https://develop-back.kotobum.com/api/albums/${Id}/cover/send`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: true, // サーバーに送る完了状態
          id: albumId,
        }),
      });
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTPエラー: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log('サーバーに完了状態を送信しました:', data);
    })
    .catch((error) => {
      console.error('完了状態送信中にエラーが発生しました💦', error);
    });
}
