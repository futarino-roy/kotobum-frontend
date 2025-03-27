// // 中身と表紙のプレビューに共通するJS

// // メインのスライドからプレビュー
// document.addEventListener('DOMContentLoaded', function () {
//   // URLのクエリパラメータを取得
//   const urlParams = new URLSearchParams(window.location.search);
//   const slideNumber = urlParams.get('slide');

//   // 取得したスライド番号を使って対応するスライドを表示
//   if (slideNumber) {
//     swiper.slideTo(slideNumber - 1, 0); // スライド番号に対応するインデックスに移動
//     console.log(`Displaying preview for slide ${slideNumber}`);
//   }
// });

// // 画像の挿入 indexedDB
// let myImageDB1;

// // IndexedDBの初期化
// function initIndexedDBForPreview() {
//   const request = indexedDB.open('NewImageDatabase1', 1);

//   request.onsuccess = function (event) {
//     myImageDB1 = event.target.result;
//     console.log('IndexedDB connected for preview.');
//     restoreDropAreasInPreview(); // プレビューページのドロップエリアに画像を復元
//   };

//   request.onerror = function (event) {
//     console.error('Error connecting to IndexedDB:', event.target.errorCode);
//   };
// }

// // ドロップエリアに画像を復元する
// function restoreDropAreasInPreview() {
//   const dropAreas = document.querySelectorAll('.empty'); // すべてのドロップエリアを取得
//   dropAreas.forEach((dropArea) => {
//     // 各ドロップエリアのIDを使ってIndexedDBから画像を取得
//     getImageFromIndexedDB(dropArea.id, function (imageData) {
//       if (imageData) {
//         // 画像要素を作成して表示
//         const img = document.createElement('img');
//         img.src = imageData;
//         img.style.width = '100%';
//         img.style.height = '100%';

//         dropArea.innerHTML = ''; // 既存の内容をクリア
//         dropArea.appendChild(img); // 画像をドロップエリアに追加
//       }
//     });
//   });
// }

// // IndexedDBから画像を取得する
// function getImageFromIndexedDB(id, callback) {
//   if (!myImageDB1) {
//     console.error('Database not initialized.');
//     return;
//   }

//   const transaction = myImageDB1.transaction(['images']);
//   const store = transaction.objectStore('images');
//   const request = store.get(id);

//   request.onsuccess = function (event) {
//     const result = event.target.result;
//     if (result) {
//       callback(result.data); // 保存された画像データをコールバック関数で返す
//     } else {
//       console.log('No image found with ID:', id);
//     }
//   };

//   request.onerror = function (event) {
//     console.error('Error retrieving image:', event.target.errorCode);
//   };
// }

// // ページが読み込まれたときにIndexedDBを初期化
// document.addEventListener('DOMContentLoaded', function () {
//   initIndexedDBForPreview();
// });

// // 画像のドラッグ indexedDB
// let myimageDB2;
// const request = indexedDB.open('ImageDB', 1);

// request.onupgradeneeded = function (event) {
//   myimageDB2 = event.target.result;
//   if (!myimageDB2.objectStoreNames.contains('images')) {
//     myimageDB2.createObjectStore('images', { keyPath: 'id' });
//   }
// };

// request.onsuccess = function (event) {
//   myimageDB2 = event.target.result;
//   loadAllImages(); // ページロード時にすべての画像をロード
// };

// request.onerror = function (event) {
//   console.error('IndexedDBに接続できませんでした:', event.target.error);
// };

// // IndexedDBから画像を取得
// function loadImageFromIndexedDB(containerId, callback) {
//   const transaction = myimageDB2.transaction(['images'], 'readonly');
//   const store = transaction.objectStore('images');
//   const request = store.get(containerId);

//   request.onsuccess = function (event) {
//     callback(event.target.result ? event.target.result.data : null);
//   };

//   request.onerror = function (event) {
//     console.error('画像の取得に失敗しました:', event.target.error);
//     callback(null);
//   };
// }

// // すべての画像をロードする
// function loadAllImages() {
//   const emptyElements = document.querySelectorAll('.empty');
//   emptyElements.forEach(function (dropArea) {
//     loadImageFromIndexedDB(dropArea.id, function (imageData) {
//       if (imageData) {
//         dropArea.innerHTML = ''; // 既存の内容をクリア
//         let img = new Image();
//         img.src = imageData; // 画像データURLを設定
//         img.classList.add('draggable-image');
//         dropArea.appendChild(img);
//       }
//     });
//   });
// }

// // ドキュメントが読み込まれた後の処理
// document.addEventListener('DOMContentLoaded', function () {
//   loadAllImages(); // ページがロードされたときにすべての画像を表示

//   // 必要に応じて、ユーザーが画像を操作するためのその他の機能を追加
// });

// // 枠 柔軟版
// document.addEventListener('DOMContentLoaded', function () {
//   // 枠のサイズ変更処理
//   function applyBorders() {
//     // dropAreaを含む全ての要素を取得
//     const dropAreas = document.querySelectorAll('[id^="dropArea"]');

//     dropAreas.forEach((dropAreaContainer) => {
//       // IDからサイズの情報を取得
//       const dropAreaId = dropAreaContainer.id;
//       const dropAreaSize = localStorage.getItem(`dropAreaSize_${dropAreaId}`);

//       if (dropAreaSize) {
//         dropAreaContainer.classList.add(dropAreaSize);
//       }
//     });
//   }

//   // 枠のサイズ変更を適用
//   applyBorders();
// });

// テキストエリアの高さと幅を自動調整する関数
function adjustTextareaSize(textarea) {
  textarea.style.height = 'auto'; // 高さをリセット
  textarea.style.width = 'auto'; // 幅をリセット
  textarea.style.height = `${textarea.scrollHeight}px`; // 内容に応じて高さを調整
  textarea.style.width = `${textarea.scrollWidth}px`; // 内容に応じて幅を調整
}

// ドキュメントが読み込まれたときにテキストを表示
document.addEventListener('DOMContentLoaded', function () {
  adjustTextareaSize(textArea);
});
window.addEventListener('load', () => {
  adjustTextareaSize(textarea);
});
// // ドキュメントが読み込まれたときに色を適用
// document.addEventListener('DOMContentLoaded', function () {
//   applySavedColor();
// });

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

// アルバムのボディデータをサーバーから取得し表示する
function loadAlbumBody(albumId) {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('認証トークンが見つかりません。ログインしてください。');
    return;
  }

  fetch(`https://develop-back.kotobum.com/api/albums/${albumId}/showBody`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((albumData) => {
      if (albumData && albumData.images && albumData.texts && albumData.colors) {
        displayImages(albumData.images);
        displayTexts(albumData.texts);
        applyColors(albumData.colors);
      }
    })
    .catch((error) => console.error('アルバムデータのロードに失敗しました:', error));
}

// 画像データをプレビューに表示
function displayImages(images) {
  const emptyElements = document.querySelectorAll('.empty');
  emptyElements.forEach((dropArea) => {
    const imageInfo = images.find((item) => item.id === dropArea.id);
    if (imageInfo && imageInfo.image) {
      const img = new Image();
      img.src = imageInfo.image;
      img.classList.add('draggable-image');
      dropArea.innerHTML = ''; // 既存の内容をクリア
      dropArea.appendChild(img); // 画像をドロップエリアに追加
    }
  });
}

// テキストデータをプレビューに表示
function displayTexts(texts) {
  const textAreas = document.querySelectorAll('textarea[id^="previewTextArea"]');
  textAreas.forEach((textArea) => {
    const textInfo = texts.find((item) => item.id === textArea.id);
    if (textInfo) {
      textArea.value = textInfo.text;
      // adjustTextareaSize(textArea);
    }
  });
}

// 色データを適用
function applyColors(colors) {
  if (colors) {
    const { backgroundColor, textColor } = colors;
    document.querySelector('.uniqueColor').style.backgroundColor = backgroundColor || '#ffffff';
    document.querySelector('.text-color').style.color = textColor || '#000000';
  }
}

function adjustTextareaSize(textarea) {
  if (!textarea) return;

  textarea.style.height = 'auto';
  textarea.style.width = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
  textarea.style.width = `${textarea.scrollWidth}px`;
}

document.addEventListener('DOMContentLoaded', function () {
  // `.text-empty`クラスがついたすべてのテキストエリアを取得
  const textAreas = document.querySelectorAll('.text-empty');

  // 取得した各テキストエリアのサイズを調整
  textAreas.forEach((textArea) => {
    // adjustTextareaSize(textArea);
  });
});

// ドキュメントが読み込まれたときの初期処理
document.addEventListener('DOMContentLoaded', function () {
  const albumId = 'your_album_id'; // 必要なアルバムIDに置き換える
  loadAlbumBody(albumId); // サーバーからアルバムデータをロード
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
    localStorage.setItem('mainTextCompleted', 'true');
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
      return fetch(`https://develop-back.kotobum.com/api/albums/${albumId}/cover/send`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: true, // サーバーに送る完了状態
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
