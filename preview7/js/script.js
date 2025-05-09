// スライド
const swiper = new Swiper('.swiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 1,
  slidesPerGroup: 1,
  initialSlide: 23, // 最後のスライドのインデックス
  breakpoints: {
    900: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
  },
});

// // メインのスライドからプレビュー
// document.addEventListener("DOMContentLoaded", function() {
//     // URLのクエリパラメータを取得
//     const urlParams = new URLSearchParams(window.location.search);
//     const slideNumber = urlParams.get('slide');

//     // 取得したスライド番号を使って対応するスライドを表示
//     if (slideNumber) {
//         swiper.slideTo(slideNumber - 1, 0);  // スライド番号に対応するインデックスに移動
//         console.log(`Displaying preview for slide ${slideNumber}`);
//     }
// });

// プレビューからメイン
document.getElementById('editBack').addEventListener('click', function () {
  const currentSlideIndex = swiper.realIndex; // 現在のスライドインデックスを取得
  const mainPageUrl = `../editB/index.html?slide=${currentSlideIndex + 1}`; // スライド番号をクエリパラメータに追加
  window.location.href = mainPageUrl; // メインページに遷移
});

// // 画像の挿入 indexedDB
// let myImageDB1;

// // IndexedDBの初期化
// function initIndexedDBForPreview() {
//     const request = indexedDB.open('NewImageDatabase1', 1);

//     request.onsuccess = function(event) {
//         myImageDB1 = event.target.result;
//         console.log('IndexedDB connected for preview.');
//         restoreDropAreasInPreview(); // プレビューページのドロップエリアに画像を復元
//     };

//     request.onerror = function(event) {
//         console.error('Error connecting to IndexedDB:', event.target.errorCode);
//     };
// }

// // ドロップエリアに画像を復元する
// function restoreDropAreasInPreview() {
//     const dropAreas = document.querySelectorAll('.empty'); // すべてのドロップエリアを取得
//     dropAreas.forEach(dropArea => {
//         // 各ドロップエリアのIDを使ってIndexedDBから画像を取得
//         getImageFromIndexedDB(dropArea.id, function(imageData) {
//             if (imageData) {
//                 // 画像要素を作成して表示
//                 const img = document.createElement('img');
//                 img.src = imageData;
//                 img.style.width = '100%';
//                 img.style.height = '100%';

//                 dropArea.innerHTML = ''; // 既存の内容をクリア
//                 dropArea.appendChild(img); // 画像をドロップエリアに追加
//             }
//         });
//     });
// }

// // IndexedDBから画像を取得する
// function getImageFromIndexedDB(id, callback) {
//     if (!myImageDB1) {
//         console.error('Database not initialized.');
//         return;
//     }

//     const transaction = myImageDB1.transaction(['images']);
//     const store = transaction.objectStore('images');
//     const request = store.get(id);

//     request.onsuccess = function(event) {
//         const result = event.target.result;
//         if (result) {
//             callback(result.data); // 保存された画像データをコールバック関数で返す
//         } else {
//             console.log('No image found with ID:', id);
//         }
//     };

//     request.onerror = function(event) {
//         console.error('Error retrieving image:', event.target.errorCode);
//     };
// }

// // ページが読み込まれたときにIndexedDBを初期化
// document.addEventListener('DOMContentLoaded', function() {
//     initIndexedDBForPreview();
// });

// // 画像のドラッグ indexedDB
// let myimageDB2;
// const request = indexedDB.open("ImageDB", 1);

// request.onupgradeneeded = function (event) {
//     myimageDB2 = event.target.result;
//     if (!myimageDB2.objectStoreNames.contains("images")) {
//         myimageDB2.createObjectStore("images", { keyPath: "id" });
//     }
// };

// request.onsuccess = function (event) {
//     myimageDB2 = event.target.result;
//     loadAllImages(); // ページロード時にすべての画像をロード
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

// // テキスト 柔軟版
// function adjustTextareaHeight(textarea) {
//   textarea.style.height = 'auto'; // 高さをリセット
//   textarea.style.height = `${textarea.scrollHeight}px`; // 内容に応じて高さを調整
// }

// // プレビューページでテキストエリアにローカルストレージからテキストを表示する関数
// function loadTextForPreview() {
//   // テキストエリアのIDが"previewTextArea"で始まるすべての要素を取得
//   const textAreas = document.querySelectorAll('textarea[id^="previewTextArea"]');

//   textAreas.forEach((textArea) => {
//     const index = textArea.id.replace('previewTextArea', ''); // IDからインデックスを取得
//     textArea.value = localStorage.getItem(`textArea${index}`) || '';

//     // テキストエリアの高さを調整
//     adjustTextareaHeight(textArea);
//   });
// }

// // ドキュメントが読み込まれたときにテキストを表示
// document.addEventListener('DOMContentLoaded', function () {
//   loadTextForPreview();
// });

// function adjustTextareaSize(textarea) {
//   // 高さをリセットしてから内容に応じて高さを調整
//   textarea.style.height = "auto";
//   textarea.style.height = `${textarea.scrollHeight}px`;

//   // 幅をリセットしてから内容に応じて幅を調整
//   textarea.style.width = "auto";
//   textarea.style.width = `${textarea.scrollWidth}px`;
// }

// // プレビューページでテキストエリアに表示する関数
// function loadTextForPreview() {
//   // テキストエリアのIDが"previewTextArea"で始まるすべての要素を取得
//   const textAreas = document.querySelectorAll('textarea[id^="previewTextArea"]');

//   textAreas.forEach((textArea) => {
//     // IDからインデックスを取得
//     textArea.value = ''; // ローカルストレージからの取得処理を削除
//     // テキストエリアの高さを調整
//     adjustTextareaSize();
//   });
// }

// // ドキュメントが読み込まれたときにテキストを表示
// document.addEventListener('DOMContentLoaded', function () {
//   loadTextForPreview();
// });

// --------------------------------------------------------------------
// document.addEventListener('DOMContentLoaded', function () {
//   document.querySelectorAll('textarea').forEach((textarea) => {
//     // ページロード時にテキストエリアの幅を調整
//     adjustTextareaWidth(textarea);

//     // 入力時にテキストエリアの幅を調整
//     textarea.addEventListener('input', function () {
//       adjustTextareaWidth(this);
//     });
//   });
// });

// function adjustTextareaWidth(textarea) {
//   // 一時的に横幅を自動調整して、内容に合わせて適切な幅を取得
//   textarea.style.width = 'auto';
//   // スクロール幅を取得し、その幅に基づいてテキストエリアの幅を調整
//   const scrollWidth = textarea.scrollWidth;
//   textarea.style.width = scrollWidth + 'px';
// }
// ----------------------------------------------------------------------

// 色変更
// プレビューページで色を適用する関数
// function applySavedColor() {
//   const savedColor = localStorage.getItem('backgroundColorB');
//   if (savedColor) {
//     // 背景色を適用
//     let elements = document.getElementsByClassName('uniqueColorB');
//     for (let i = 0; i < elements.length; i++) {
//       elements[i].style.backgroundColor = savedColor;
//     }

//     // テキスト色を適用
//     let textElements = document.getElementsByClassName('text-colorB');
//     for (let i = 0; i < textElements.length; i++) {
//       textElements[i].style.color = savedColor;
//     }
//   }
// }

// // ドキュメントが読み込まれたときに色を適用
// document.addEventListener('DOMContentLoaded', function () {
//   applySavedColor();
// });

// ページ読み込み時のアルバムデータ取得処理
document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('認証トークンが見つかりません。ログインしてください。');
    return;
  }

  let albumId;

  // アルバムIDを取得
  fetch('https://app-back.kotobum.com/api/user/album', {
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
      return fetch(`https://app-back.kotobum.com/api/albums/${albumId}/showBody`, {
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

      // 必要に応じてJSON文字列をパースして配列に変換
      const textData = Array.isArray(data.textData) ? data.textData : JSON.parse(data.textData);
      const imageData = Array.isArray(data.imageData) ? data.imageData : JSON.parse(data.imageData);
      const colors = typeof data.colors === 'object' ? data.colors : JSON.parse(data.colors);

      console.log(textData); // テキストデータの配列
      console.log(imageData); // 画像データの配列
      console.log(colors); // 色情報のオブジェクト

      // データの存在チェック
      if (!textData || !Array.isArray(textData)) {
        console.warn('テキストデータが存在しないか、配列ではありません。');
      } else {
        // テキストデータを表示
        textData.forEach((item) => {
          const textArea = document.getElementById(item.id);
          if (textArea) {
            textArea.value = item.text;
          } else {
            console.warn(`テキストエリアが見つかりません: ID ${item.id}`);
          }
        });
      }

      if (!imageData || !Array.isArray(imageData)) {
        console.warn('画像データが存在しないか、配列ではありません。');
      } else {
        // 画像データを表示
        imageData.forEach((item) => {
          const dropArea = document.getElementById(item.id);
          if (dropArea && item.image) {
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = 'Image';
            dropArea.appendChild(img);
          } else {
            console.warn(`画像データが存在しないか、画像が見つかりません: ID ${item.id}`);
          }
        });
      }

      // 背景色とテキスト色を設定
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
      console.error('アルバムデータ取得中にエラーが発生しました:', error.message);
    });
});
