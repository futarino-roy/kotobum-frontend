// // スライド
// const swiper = new Swiper('.swiper', {
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
//   slidesPerView: 1,
//   slidesPerGroup: 1,
//   initialSlide: 23, // 最後のスライドのインデックス（例: 24スライドの場合）
//   breakpoints: {
//     900: {
//       slidesPerView: 2,
//       slidesPerGroup: 2,
//     },
//   },
// });

// let initialData = {}; // テキストエリアの初期値を保存するオブジェクト
// let isSaved = true; // データが保存済みかどうかを示すフラグ

// // ページ読み込み時にデータを保存(初期データ)
// document.addEventListener('DOMContentLoaded', function () {
//   const textAreas = document.querySelectorAll('textarea');
//   textAreas.forEach(textarea => {
//     initialData[textarea.id] = textarea.value;
//     console.log('データを保存しました')
//   });
// });

// // テキストエリアに変更があれば未保存のフラグを設定
// document.querySelectorAll('textarea').forEach(textarea => {
//   textarea.addEventListener('input', () => {
//     isSaved = checkSave();
//   });
// });

// // 初期データと比較して変更されているか確認する関数
// function checkSave() {
//   const textAreas = document.querySelectorAll('textarea');
//   return Array.from(textAreas).every(textarea => {
//     return textarea.value === initialData[textarea.id];
//   });
// }

// // 保存ボタンをクリック時に保存状態を更新
// const saveBtn = document.getElementById('sendButton');
// if (saveBtn) {
//   saveBtn.addEventListener('click', function () {
//     isSaved = true;
//     const textAreas = document.querySelectorAll('textarea');
//     textAreas.forEach(textarea => {
//       initialData[textarea.id] = textarea.value;
//     });
//     console.log("保存内容が保存されました");
//   });
// } else {
//   console.warn('Save button with ID "saveButton" not found.');
// }

// // ページを離れるときに保存されていない場合は警告を表示
// window.addEventListener('beforeunload', function (event) {
//   if (!isSaved) {
//     event.returnValue = '内容が保存されていません＞＜'; // ブラウザがデフォルトの警告メッセージを表示
//   }
// });


// // モーダル要素の取得
// const modal = document.getElementById('customModal');
// const discardBtn = document.getElementById('discardBtn');

// // ダミーの状態を履歴に追加
// history.pushState(null, document.title, window.location.href);

// // ユーザーが「戻る」ボタンを押した際に popstate イベントを発火
// window.addEventListener('popstate', (event) => {
//   // モーダルを表示
//   modal.classList.add('show');
//   // 履歴にもう一度ダミーの状態を追加
//   history.pushState(null, document.title, window.location.href);
// });

// // 「保存する」ボタンがクリックされたときの処理
// saveBtn.addEventListener('click', () => {
//   modal.classList.remove('show');
//   alert('内容が保存されました');
//   // 実際に戻る操作を実行
//   window.location.href = '/mypage/index.html';   // 戻るボタンが押される前のページに遷移
// });

// // 「保存せずに戻る」ボタンがクリックされたときの処理
// discardBtn.addEventListener('click', () => {
//   modal.classList.remove('show');
//   // 実際に戻る操作を実行
//   window.location.href = '/mypage/index.html';  // 戻るボタンが押される前のページに遷移
// });

// modal.addEventListener('click', (event) => {
//   if (event.target === modal) { // モーダルの外側がクリックされた場合
//     modal.classList.remove('show'); // モーダルを閉じる
//   }
// });

// Swiperの初期化
const swiper = new Swiper('.swiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 1,
  slidesPerGroup: 1,
  breakpoints: {
    900: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
  },
});


// メインのスライドからプレビュー
document.addEventListener('DOMContentLoaded', function () {
  // プレビューボタンにクリックイベントリスナーを追加
  document.querySelector('.btn-preview').addEventListener('click', function () {
    // 現在のスライドインデックスを取得
    const currentSlideIndex = swiper.realIndex;

    // プレビューページのURLを動的に設定
    const previewUrl = `../preview/index.html?slide=${currentSlideIndex + 1}`;

    // プレビューページに遷移
    window.location.href = previewUrl;
  });
});

// プレビューのスライドからメイン
document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const slideNumber = urlParams.get('slide');

  if (slideNumber) {
    swiper.slideTo(slideNumber - 1, 0); // スライド番号に対応するインデックスに移動
    console.log(`Returning to slide ${slideNumber} in the main page`);
  }
});

// inputボタンのデザイン
document.getElementById('frontButton').addEventListener('click', function () {
  document.getElementById('backInput').click();
});

// //  ドロワー
// let currentContentId = null;
// let activeButton = null;

// const toggleDrawer = () => {
//   const drawer = document.getElementById('drawer');
//   const content = document.getElementById('content');
//   const sidebar = document.getElementById('sidebar');
//   const swbtnpre = document.getElementById('swbtnpre');
//   const swbtnnext = document.getElementById('swbtnnext');

//   drawer.classList.toggle('open');
//   sidebar.classList.toggle('open');
//   content.classList.toggle('open');
//   swbtnpre.classList.toggle('open');
//   swbtnnext.classList.toggle('open');

//   if (!drawer.classList.contains('open')) {
//     currentContentId = null;

//     if (activeButton) {
//       activeButton.classList.remove('active');
//       activeButton = null;
//     }
//   }
// };

// const showDrawerContent = (contentId) => {
//   const drawerContent = document.getElementById('drawer-content');
//   const contentElement = document.getElementById(contentId);

//   const clickedButton = document.querySelector(`[date-content-id="${contentId}"]`);

//   if (!contentElement) {
//     console.error(`Content element with ID '${contentId}' not found.`);
//     return;
//   }

//   if (contentId === currentContentId && drawer.classList.contains('open')) {
//     toggleDrawer();
//     return;
//   }

//   // 全てのコンテンツを非表示にする
//   const allContentItems = document.querySelectorAll('.edit_drawer_container_item');
//   allContentItems.forEach((item) => {
//     item.style.display = 'none';
//   });

//   // 選択されたコンテンツを表示する
//   contentElement.style.display = 'block';

//   // ボタンのスタイルを更新 new
//   if (activeButton) {
//     activeButton.classList.remove('active'); // 以前のボタンからactiveクラスを削除
//   }
//   if (clickedButton) {
//     clickedButton.classList.add('active'); // クリックされたボタンにactiveクラスを追加
//     activeButton = clickedButton; // 現在のアクティブボタンを更新
//   }

//   currentContentId = contentId;

//   if (!drawer.classList.contains('open')) {
//     toggleDrawer(); // ドロワーが閉じている場合は開く
//   }
// };

// // 画像のアップロードと挿入
// let myImageDB1;
// let selectedImage = null;

// // 新しいIndexedDBの初期化
// function initNewIndexedDB() {
//   const request = indexedDB.open('NewImageDatabase1', 1);

//   request.onupgradeneeded = function (event) {
//     myImageDB1 = event.target.result;
//     if (!myImageDB1.objectStoreNames.contains('images')) {
//       myImageDB1.createObjectStore('images', { keyPath: 'id' });
//     }
//   };

//   request.onsuccess = function (event) {
//     myImageDB1 = event.target.result;
//     console.log('New IndexedDB initialized.');
//     restoreDropAreas();
//   };

//   request.onerror = function (event) {
//     console.error('Error initializing IndexedDB:', event.target.errorCode);
//   };
// }

// initNewIndexedDB();

// document.addEventListener('DOMContentLoaded', function () {
//   addTouchListenerToDropAreas();
//   document.getElementById('saveButton').addEventListener('click', function () {
//     // サーバに画像を送信する処理は削除済み
//   });
// });

// function loadImage(input) {
//   const imgPreviewField = document.getElementById('imgPreviewField');
//   if (input.files) {
//     const files = Array.from(input.files);
//     files.forEach((file) => {
//       const reader = new FileReader();

//       reader.onload = function (e) {
//         const img = document.createElement('img');
//         img.src = e.target.result;
//         img.style.left = '0px';
//         img.style.top = '0px';

//         imgPreviewField.appendChild(img);
//         makeDraggable(img);
//         makeTouchable(img);
//       };

//       reader.readAsDataURL(file);
//     });
//   }
// }

// function makeDraggable(img) {
//   let isDragging = false;
//   let startX, startY, initialX, initialY;

//   function onMouseDown(e) {
//     isDragging = true;
//     startX = e.clientX;
//     startY = e.clientY;
//     initialX = parseFloat(img.style.left) || 0;
//     initialY = parseFloat(img.style.top) || 0;
//     img.style.cursor = 'grabbing';
//   }

//   function onMouseMove(e) {
//     if (isDragging) {
//       const dx = e.clientX - startX;
//       const dy = e.clientY - startY;
//       img.style.left = initialX + dx + 'px';
//       img.style.top = initialY + dy + 'px';
//     }
//   }

//   function onMouseUp() {
//     isDragging = false;
//     img.style.cursor = 'grab';
//   }

//   function onTouchStart(e) {
//     if (e.touches.length === 1) {
//       isDragging = true;
//       startX = e.touches[0].clientX;
//       startY = e.touches[0].clientY;
//       initialX = parseFloat(img.style.left) || 0;
//       initialY = parseFloat(img.style.top) || 0;
//     }
//   }

//   function onTouchMove(e) {
//     if (isDragging && e.touches.length === 1) {
//       const dx = e.touches[0].clientX - startX;
//       const dy = e.touches[0].clientY - startY;
//       img.style.left = initialX + dx + 'px';
//       img.style.top = initialY + dy + 'px';
//     }
//   }

//   function onTouchEnd() {
//     isDragging = false;
//   }

//   img.addEventListener('mousedown', onMouseDown);
//   img.addEventListener('mousemove', onMouseMove);
//   img.addEventListener('mouseup', onMouseUp);
//   img.addEventListener('mouseleave', onMouseUp);

//   img.addEventListener('touchstart', onTouchStart);
//   img.addEventListener('touchmove', onTouchMove);
//   img.addEventListener('touchend', onTouchEnd);
// }

// function makeTouchable(img) {
//   img.addEventListener('click', function () {
//     const allImgs = document.querySelectorAll('#imgPreviewField img');
//     allImgs.forEach((image) => {
//       image.classList.remove('selected');
//     });
//     img.classList.add('selected');
//     selectedImage = img;
//   });

//   img.addEventListener('touchstart', function (e) {
//     e.preventDefault();
//     const allImgs = document.querySelectorAll('#imgPreviewField img');
//     allImgs.forEach((image) => {
//       image.classList.remove('selected');
//     });
//     img.classList.add('selected');
//     selectedImage = img;
//   });
// }

// function addTouchListenerToDropAreas() {
//   const dropAreas = document.querySelectorAll('.empty');
//   const drawer = document.getElementById('drawer'); // 特定要素を取得
//   const sideBtn = document.getElementById('sideBtn'); // 特定要素を取得

//   dropAreas.forEach((dropArea) => {
//     dropArea.addEventListener('touchstart', function (e) {
//       e.preventDefault();
//       if (selectedImage) {
//         insertImageToDropArea(this);
//       } else {
//         // 画像以外と特定要素以外のタッチの場合はボタンとボーダーを非表示
//         if (!e.target.closest('.empty') && !drawer.contains(e.target) && !sideBtn.contains(e.target)) {
//           document.querySelectorAll('.empty.with-buttons').forEach((area) => {
//             area.classList.add('hide-buttons');
//             area.style.border = 'none'; // ボーダーを消す
//           });
//         }
//         // タッチされたドロップエリアのボタンを表示する
//         this.classList.remove('hide-buttons');
//         this.style.border = ''; // ボーダーを元に戻す
//       }
//     });
//   });

//   document.addEventListener('touchstart', function (e) {
//     const allDropAreas = document.querySelectorAll('.empty.with-buttons');
//     if (!e.target.closest('.empty.with-buttons') && !drawer.contains(e.target) && !sideBtn.contains(e.target)) {
//       allDropAreas.forEach((dropArea) => {
//         dropArea.classList.add('hide-buttons');
//         dropArea.style.border = 'none'; // ボーダーを消す
//       });
//     }
//   });
// }

// function insertImageToDropArea(dropArea) {
//   if (!selectedImage) {
//     console.log('No image selected');
//     return;
//   }

//   dropArea.innerHTML = '';

//   const newImage = document.createElement('img');
//   newImage.src = selectedImage.src;
//   newImage.style.width = '100%';
//   newImage.style.height = '100%';

//   const deleteButton = document.createElement('button');
//   deleteButton.classList.add('delete-button');
//   deleteButton.addEventListener('touchstart', function (e) {
//     e.stopPropagation();
//     dropArea.innerHTML = '';
//     deleteImageFromNewIndexedDB(dropArea.id);
//   });

//   const cropButton = document.createElement('button');
//   cropButton.classList.add('crop-button');
//   cropButton.addEventListener('touchstart', function (e) {
//     e.stopPropagation();
//     openCroppieModal(dropArea);
//   });

//   dropArea.appendChild(newImage);
//   dropArea.appendChild(deleteButton);
//   dropArea.appendChild(cropButton);
//   dropArea.classList.add('with-buttons');

//   selectedImage.classList.remove('selected');
//   selectedImage = null;

//   saveImageToNewIndexedDB(dropArea.id, newImage.src);

//   // ボタンを表示するためのクラスを削除
//   dropArea.classList.remove('hide-buttons');
// }

// function saveImageToNewIndexedDB(id, imageData) {
//   if (!myImageDB1) {
//     console.error('Database not initialized.');
//     return;
//   }

//   const transaction = myImageDB1.transaction(['images'], 'readwrite');
//   const store = transaction.objectStore('images');
//   store.put({ id: id, data: imageData });

//   transaction.oncomplete = function () {
//     console.log('Image saved to new IndexedDB.');
//   };

//   transaction.onerror = function (event) {
//     console.error('Error saving image:', event.target.errorCode);
//   };
// }

// function getImageFromNewIndexedDB(id, callback) {
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
//       callback(result.data);
//     } else {
//       console.log('No image found with ID:', id);
//     }
//   };

//   request.onerror = function (event) {
//     console.error('Error retrieving image:', event.target.errorCode);
//   };
// }

// function restoreDropAreas() {
//   const dropAreas = document.querySelectorAll('.empty');
//   dropAreas.forEach((dropArea) => {
//     getImageFromNewIndexedDB(dropArea.id, function (imageData) {
//       if (imageData) {
//         const newImage = document.createElement('img');
//         newImage.src = imageData;
//         newImage.style.width = '100%';
//         newImage.style.height = '100%';

//         const deleteButton = document.createElement('button');
//         deleteButton.classList.add('delete-button');
//         deleteButton.addEventListener('touchstart', function (e) {
//           e.stopPropagation();
//           dropArea.innerHTML = '';
//           deleteImageFromNewIndexedDB(dropArea.id);
//         });

//         const cropButton = document.createElement('button');
//         cropButton.classList.add('crop-button');
//         cropButton.addEventListener('touchstart', function (e) {
//           e.stopPropagation();
//           openCroppieModal(dropArea);
//         });

//         dropArea.innerHTML = '';
//         dropArea.appendChild(newImage);
//         dropArea.appendChild(deleteButton);
//         dropArea.appendChild(cropButton);
//         dropArea.classList.add('with-buttons');
//         dropArea.classList.remove('hide-buttons'); // Restore visibility
//       }
//     });
//   });
// }

// function deleteImageFromNewIndexedDB(id) {
//   if (!myImageDB1) {
//     console.error('Database not initialized.');
//     return;
//   }

//   const transaction = myImageDB1.transaction(['images'], 'readwrite');
//   const store = transaction.objectStore('images');
//   const request = store.delete(id);

//   request.onsuccess = function () {
//     console.log('Image deleted from new IndexedDB:', id);
//   };

//   request.onerror = function (event) {
//     console.error('Error deleting image:', event.target.errorCode);
//   };
// }

// function openCroppieModal(dropArea) {
//   // Croppieモーダルの表示処理
//   console.log('Croppie modal open for drop area:', dropArea);
// }

// // 画像のドラッグ＆ドロップ indexedDBに保存
// function handleDragOver(event) {
//   event.preventDefault();
//   this.style.backgroundColor = '#d0f0c0';
// }

// // ドラッグが離れたときの処理
// function handleDragLeave(event) {
//   this.style.backgroundColor = 'transparent';
// }

// // IndexedDBへの接続
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

//   // IndexedDB接続が成功した場合にのみ画像をロード
//   if (myimageDB2) {
//     loadAllImages();
//   } else {
//     console.error('IndexedDBへの接続が失敗しました。');
//   }
// };

// request.onerror = function (event) {
//   console.error('IndexedDBに接続できませんでした:', event.target.error);
// };

// // 画像をIndexedDBに保存
// function saveImageToIndexedDB(imageData, containerId) {
//   const transaction = myimageDB2.transaction(['images'], 'readwrite');
//   const store = transaction.objectStore('images');
//   const request = store.put({ id: containerId, data: imageData });

//   request.onsuccess = function () {
//     console.log('画像がIndexedDBに保存されました:', containerId);
//   };

//   request.onerror = function (event) {
//     console.error('画像の保存に失敗しました:', event.target.error);
//   };
// }

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

// // IndexedDBから画像を削除
// function clearImageFromIndexedDB(containerId) {
//   const transaction = myimageDB2.transaction(['images'], 'readwrite');
//   const store = transaction.objectStore('images');
//   const request = store.delete(containerId);

//   request.onsuccess = function () {
//     console.log('画像がIndexedDBから削除されました:', containerId);
//   };

//   request.onerror = function (event) {
//     console.error('画像の削除に失敗しました:', event.target.error);
//   };
// }

// // 全ての画像をロード
// function loadAllImages() {
//   const emptyElements = document.querySelectorAll('.empty');
//   emptyElements.forEach(function (dropArea) {
//     loadImageFromIndexedDB(dropArea.id, function (imageData) {
//       if (imageData) {
//         dropArea.innerHTML = '';
//         let img = new Image();
//         img.src = imageData;
//         img.classList.add('draggable-image');
//         img.onclick = function () {
//           showButtons(this.parentNode);
//         };
//         dropArea.appendChild(img);
//         addButtons(dropArea);

//         // 画像が挿入されたら枠線をなくす処理追加
//         dropArea.style.border = 'none';
//       }
//     });
//   });
// }

// // ドロップ時の処理
// function handleDrop(event) {
//   event.preventDefault();
//   this.style.backgroundColor = 'transparent';

//   const files = event.dataTransfer.files;
//   if (files.length > 0) {
//     let file = files[0];
//     let fileReader = new FileReader();
//     fileReader.onload = function (e) {
//       this.innerHTML = '';
//       let img = new Image();
//       img.src = e.target.result;
//       img.classList.add('draggable-image');
//       img.onclick = function () {
//         showButtons(this.parentNode);
//       };
//       this.appendChild(img);
//       addButtons(this);

//       // 画像が挿入されたら枠線をなくす処理追加
//       this.style.border = 'none';

//       // IndexedDBに画像データを保存
//       saveImageToIndexedDB(e.target.result, this.id);
//     }.bind(this);
//     fileReader.readAsDataURL(file);
//   }
// }

// // タッチエンド時の処理
// function handleTouchDrop(event) {
//   event.preventDefault();
//   const touch = event.changedTouches[0];
//   const dropArea = document.elementFromPoint(touch.clientX, touch.clientY);

//   if (dropArea && dropArea.classList.contains('empty')) {
//     const files = event.dataTransfer.files;
//     if (files.length > 0) {
//       let file = files[0];
//       let fileReader = new FileReader();
//       fileReader.onload = function (e) {
//         dropArea.innerHTML = '';
//         let img = new Image();
//         img.src = e.target.result;
//         dropArea.appendChild(img);
//         addButtons(dropArea);

//         // 画像が挿入されたら枠線をなくす処理追加
//         dropArea.style.border = 'none';

//         // IndexedDBに画像データを保存
//         saveImageToIndexedDB(e.target.result, dropArea.id);
//       };
//       fileReader.readAsDataURL(file);
//     }
//   }
// }

// // 削除ボタンとトリミングボタンの追加
// function addButtons(container) {
//   if (!container.querySelector('.delete-btn')) {
//     let deleteButton = document.createElement('button');
//     deleteButton.classList.add('delete-btn');
//     deleteButton.textContent = '';
//     deleteButton.onclick = function () {
//       container.innerHTML = '';
//       container.classList.remove('selected');
//       container.style.backgroundColor = 'transparent';
//       hideButtons();

//       // IndexedDBから画像データを削除
//       clearImageFromIndexedDB(container.id);

//       // 画像が削除されたら枠線を復元の処理追加
//       container.style.border = '2px dashed #ccc';
//     };
//     container.appendChild(deleteButton);
//   }

//   if (!container.querySelector('.crop-btn')) {
//     let cropButton = document.createElement('button');
//     cropButton.classList.add('crop-btn');
//     cropButton.textContent = '';
//     cropButton.onclick = function (event) {
//       event.stopPropagation();
//       openCroppieModal(container);
//     };
//     container.appendChild(cropButton);
//   }
// }

// // ボタンを表示
// function showButtons(container) {
//   container.querySelectorAll('.delete-btn, .crop-btn').forEach((button) => (button.style.display = 'flex'));

//   // 枠線を追加（選択されたとき）
//   container.style.border = '2px dashed #ccc';
// }

// // ボタンを非表示
// function hideButtons() {
//   document.querySelectorAll('.delete-btn, .crop-btn').forEach((button) => (button.style.display = 'none'));

//   // 選択されていない全ての画像コンテナの枠線をデフォルトに戻す
//   document.querySelectorAll('.empty').forEach(function (container) {
//     if (!container.querySelector('img')) {
//       container.style.border = '2px dashed #ccc'; // デフォルトの枠線
//     } else {
//       container.style.border = 'none'; // 枠線なし
//     }
//   });
// }

// // トリミングモーダル処理
// let croppieInstance;

// function openCroppieModal(container) {
//   const croppieModal = document.getElementById('croppieModal');
//   const croppieContainer = document.getElementById('croppie-container');
//   croppieModal.style.display = 'block';

//   // Croppieの設定
//   if (croppieInstance) {
//     croppieInstance.destroy();
//   }

//   croppieInstance = new Croppie(croppieContainer, {
//     viewport: { width: 200, height: 200 },
//     boundary: { width: 300, height: 300 },
//     showZoomer: true,
//     enableResize: false,
//   });

//   const img = container.querySelector('img');
//   croppieInstance.bind({
//     url: img.src,
//   });

//   // トリミングボタン
//   document.getElementById('crop-button').onclick = function () {
//     croppieInstance
//       .result({
//         type: 'canvas',
//         size: 'original',
//         format: 'png',
//         quality: 1,
//       })
//       .then(function (croppedImageData) {
//         container.querySelector('img').src = croppedImageData;
//         saveImageToIndexedDB(croppedImageData, container.id);
//         croppieModal.style.display = 'none';
//       });
//   };
// }

// document.addEventListener('DOMContentLoaded', function () {
//   const dropAreas = document.querySelectorAll('.empty');
//   dropAreas.forEach(function (dropArea) {
//     dropArea.ondragover = handleDragOver;
//     dropArea.ondragleave = handleDragLeave;
//     dropArea.ondrop = handleDrop;
//     dropArea.ontouchend = handleTouchDrop;
//   });

//   // キャンセルボタンのクリックイベントを追加
//   document.getElementById('cancel-button').onclick = function () {
//     document.getElementById('croppieModal').style.display = 'none';
//   };

//   // ボタンを非表示にするクリックイベントの設定
//   document.addEventListener('click', function (event) {
//     const isImage = event.target.closest('.draggable-image');
//     const isDrawer = event.target.closest('#drawer');
//     const issideBtn = event.target.closest('#sideBtn');

//     if (!isImage && !isDrawer && !issideBtn) {
//       hideButtons();
//     }
//   });
// });

// // テキストエリアの内容の保存と高さと幅を自動調整 ローカルストレージに保存
// function saveTextToLocalStorage() {
//   document.querySelectorAll('.text-empty').forEach((textArea) => {
//     const id = textArea.id;
//     localStorage.setItem(id, textArea.value);
//   });
// }
// // テキストエリアの内容をローカルストレージから読み込む関数
// function loadTextFromLocalStorage() {
//   document.querySelectorAll('.text-empty').forEach((textArea) => {
//     const id = textArea.id;
//     textArea.value = localStorage.getItem(id) || '';
//   });
// }
// // テキストエリアの高さを調整する関数
// function adjustHeight(textarea) {
//   textarea.style.height = 'auto';
//   textarea.style.height = `${textarea.scrollHeight}px`;
// }
// // テキストエリアの幅を調整する関数
// function adjustTextareaWidth(textarea) {
//   textarea.style.width = 'auto';
//   const scrollWidth = textarea.scrollWidth;
//   textarea.style.width = `${scrollWidth}px`;
// }
// // 最大文字数の制限を外し、イベントリスナーを追加する関数
// function enforceNoMaxLength(textarea) {
//   textarea.addEventListener('input', function () {
//     adjustHeight(this);
//     adjustTextareaWidth(this);
//     saveTextToLocalStorage();
//   });
//   adjustHeight(textarea);
//   adjustTextareaWidth(textarea);
// }
// // ドキュメント読み込み時の処理
// document.addEventListener('DOMContentLoaded', function () {
//   loadTextFromLocalStorage();
//   // テキストエリアごとに必要な処理を実行
//   document.querySelectorAll('.text-empty').forEach((textarea) => {
//     enforceNoMaxLength(textarea);
//   });
//   // ロード後に高さ調整を行う
//   setTimeout(() => {
//     document.querySelectorAll('.text-empty').forEach((textarea) => adjustHeight(textarea));
//   }, 100);
// });
// // テキストエリア枠の削除
// document.addEventListener('DOMContentLoaded', function () {
//   const textEmptys = document.querySelectorAll('.text-empty');
//   function updateBorders() {
//     textEmptys.forEach((textEmpty) => {
//       if (textEmpty.value.trim() === '') {
//         textEmpty.classList.remove('no-border');
//       } else {
//         textEmpty.classList.add('no-border');
//       }
//     });
//   }
//   textEmptys.forEach((textEmpty) => {
//     textEmpty.addEventListener('input', updateBorders);
//   });
//   updateBorders();
// });

// 枠変更 12-~3変更できない版 ローカルストレージに保存
document.addEventListener('DOMContentLoaded', () => {
  const dropAreas = [];
  const resizeButtons = document.querySelectorAll('.resizeButton');
  let activeDropArea = null;

  // ドロップエリアをすべて取得し、配列に追加
  document.querySelectorAll('[id^="dropArea"]').forEach((dropArea) => {
    dropAreas.push(dropArea);
    dropArea.addEventListener('pointerdown', () => handleDropAreaInteraction(dropArea));
  });

  // ドロップエリアがクリックまたはタッチされたときの処理
  const handleDropAreaInteraction = (dropArea) => {
    dropAreas.forEach((area) => area.classList.remove('active'));
    dropArea.classList.add('active');
    activeDropArea = dropArea;
  };

  // サイズ変更ボタンがクリックまたはタッチされたときの処理
  const handleResizeButtonInteraction = (button) => {
    if (activeDropArea) {
      // サイズ変更を禁止するドロップエリアのリスト
      // const restrictedDropAreas = ['dropArea12-1', 'dropArea12-2', 'dropArea12-3'];

      // サイズ変更を禁止するドロップエリアでない場合のみ処理
      if (!restrictedDropAreas.includes(activeDropArea.id)) {
        // サイズをすべてリセット
        activeDropArea.classList.remove('square', 'rectangle34', 'rectangle43', 'mini');
        // ボタンの data-size 属性に基づいてサイズを変更
        const size = button.getAttribute('data-size');
        activeDropArea.classList.add(size);

        // サイズ情報をローカルストレージに保存（ドロップエリアごとに異なるキーを使用）
        localStorage.setItem(`dropAreaSize_${activeDropArea.id}`, size);
      }
    }
  };

  resizeButtons.forEach((button) => {
    button.addEventListener('pointerdown', () => handleResizeButtonInteraction(button));
  });

  // ページロード時にローカルストレージからサイズを復元
  dropAreas.forEach((dropArea) => {
    const savedSize = localStorage.getItem(`dropAreaSize_${dropArea.id}`);
    if (savedSize) {
      dropArea.classList.add(savedSize);
    }
  });
});

// 背景色とテキストの色の変更 ローカルストレージに保存
function changeColor(color) {
  // 背景色を変更する
  let elements = document.getElementsByClassName('uniqueColor');
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.backgroundColor = color;
  }

  // テキスト色を変更する
  let textElements = document.getElementsByClassName('text-color');
  for (let i = 0; i < textElements.length; i++) {
    textElements[i].style.color = color;
  }

  // 色をローカルストレージに保存する
  localStorage.setItem('backgroundColorA', color);
}

// ページ読み込み時にローカルストレージから色を取得して適用する
document.addEventListener('DOMContentLoaded', function () {
  const savedColor = localStorage.getItem('backgroundColorA');
  if (savedColor) {
    changeColor(savedColor);
  }
});

// ---------------- API連携に関して ---------------------

// document.getElementById('sendButton').addEventListener('click', function () {
//   const token = localStorage.getItem('token');

//   if (!token) {
//     console.error('認証トークンが見つかりません。ログインしてください。');
//     return;
//   }

//   let albumId; // albumIdをここで宣言

//   function getAllDataFromIndexedDB(dbName, storeName) {
//     return new Promise((resolve, reject) => {
//       const request = indexedDB.open(dbName);

//       request.onerror = function (event) {
//         console.error('IndexedDBにアクセスできません。', event.target.error);
//         reject('IndexedDBにアクセスできません。');
//       };

//       request.onsuccess = function (event) {
//         const db = event.target.result;
//         const transaction = db.transaction(storeName, 'readonly');
//         const objectStore = transaction.objectStore(storeName);
//         const allDataRequest = objectStore.getAll();

//         allDataRequest.onsuccess = function (event) {
//           resolve(event.target.result);
//         };

//         allDataRequest.onerror = function (event) {
//           console.error('データの取得に失敗しました。', event);
//           reject('データの取得に失敗しました。');
//         };
//       };
//     });
//   }

//   // ユーザー情報を取得
//   fetch('https://develop-back.kotobum.com/api/user/album', {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTPエラー: ${response.status} - ${response.statusText}`);
//       }
//       return response.json();
//     })
//     .then((albums) => {
//       console.log('取得したユーザーデータ:', albums); // レスポンスを確認
//       albumId = albums.albumId; // albumIdをここに設定

//       if (!albumId) {
//         console.error('アルバムIDを取得できませんでした。');
//         return;
//       }

//       // アルバムIDを使った追加処理をここに記述
//       console.log('取得したアルバムID:', albumId);

//       // HTMLファイルを取得
//       return fetch('../edit/index.html');
//     })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`別のHTMLページの取得エラー: ${response.status} - ${response.statusText}`);
//       }
//       return response.text();
//     })
//     .then((htmlContent) => {
//       let cssContent = '';
//       let cssUrls = [];
//       const cssPromises = [];

//       // CSSスタイルシートを取得
//       for (let sheet of document.styleSheets) {
//         try {
//           if (sheet.href && sheet.href.startsWith(window.location.origin)) {
//             cssUrls.push(sheet.href);
//             cssPromises.push(
//               fetch(sheet.href)
//                 .then((response) => {
//                   if (!response.ok) {
//                     throw new Error(`CSSファイルの取得エラー: ${response.status} - ${response.statusText}`);
//                   }
//                   return response.text();
//                 })
//                 .then((text) => {
//                   cssContent += text;
//                 })
//                 .catch((e) => {
//                   console.warn('スタイルシートの取得エラー:', e);
//                 })
//             );
//           } else if (!sheet.href) {
//             if (sheet.cssRules) {
//               for (let rule of sheet.cssRules) {
//                 cssContent += rule.cssText;
//               }
//             }
//           }
//         } catch (e) {
//           console.warn('スタイルシートの取得エラー:', e);
//         }
//       }

//       return Promise.all(cssPromises).then(() => ({
//         htmlContent,
//         cssContent,
//         cssUrls,
//       }));
//     })
//     .then(({ htmlContent = '', cssContent = '', cssUrls = [] } = {}) => {
//       let localStorageData = {};
//       for (let i = 0; i < localStorage.length; i++) {
//         const key = localStorage.key(i);
//         localStorageData[key] = localStorage.getItem(key);
//       }

//       return Promise.all([
//         getAllDataFromIndexedDB('NewImageDatabase1', 'images').catch((err) => {
//           console.error('NewImageDatabase1のデータ取得中にエラーが発生しました:', err);
//           return [];
//         }),
//         getAllDataFromIndexedDB('ImageDB', 'images').catch((err) => {
//           console.error('ImageDBのデータ取得中にエラーが発生しました:', err);
//           return [];
//         }),
//       ]).then(([newImageDatabase1Data, imageDBData]) => {
//         const body = new FormData();
//         body.append('htmlContent', htmlContent);
//         body.append('cssContent', cssContent);
//         // body.append('cssUrls', JSON.stringify(cssUrls));
//         // body.append('localStorageData', JSON.stringify(localStorageData));
//         // body.append('newImageDatabase1Data', JSON.stringify(newImageDatabase1Data));
//         // body.append('imageDBData', JSON.stringify(imageDBData));

//         // localStorageData.forEach(url => body.append('localStorageData[]', url));
//         // newImageDatabase1Data.forEach(url => body.append('newImageDatabase1Data[]', url));
//         // imageDBData.forEach(url => body.append('imageDBData[]', url));
//         // cssUrls.forEach(url => body.append('cssUrls[]', url));

//         // 送信するデータをコンソールに出力
//         console.log('送信するデータ:', {
//           htmlContent,
//           cssContent,
//           cssUrls,
//           localStorageData,
//           newImageDatabase1Data,
//           imageDBData,
//         });

//         // データのサイズをコンソールに表示
//         console.log(`HTML Content Size: ${(new Blob([htmlContent]).size / 1024).toFixed(2)} KB`);
//         console.log(`CSS Content Size: ${(new Blob([cssContent]).size / 1024).toFixed(2)} KB`);
//         console.log(`LocalStorage Data Size: ${(new Blob([JSON.stringify(localStorageData)]).size / 1024).toFixed(2)} KB`);
//         console.log(`newImageDatabase1Data Size: ${(new Blob([JSON.stringify(newImageDatabase1Data)]).size / 1024).toFixed(2)} KB`);
//         console.log(`imageDBData Size: ${(new Blob([JSON.stringify(imageDBData)]).size / 1024).toFixed(2)} KB`);

//         // ユーザーIDを使ってデータを送信
//         return fetch(`https://develop-back.kotobum.com/api/albums/${albumId}/body`, {
//           method: 'POST',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           body: body,
//           // body: JSON.stringify(data),
//         });
//       });
//     })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`データ送信に失敗しました: ${response.status} - ${response.statusText}`);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log('成功:', data);
//     })
//     .catch((error) => {
//       console.error('エラーが発生しました:', error.message); // エラーをコンソールに出力
//       if (error.response) {
//         console.error('レスポンスデータ:', error.response.data);
//       }
//       console.error('スタックトレース:', error.stack); // スタックトレースを表示
//     });
// });


// html2canvasを使用してキャプチャ
async function captureSlidesAndSend() {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('認証トークンが見つかりません。ログインしてください。');
    alert('認証トークンが見つかりません。ログインしてください。');
    return;
  }

  let albumId;

  try {
    // 🎨 アルバムIDを取得
    const response = await fetch('https://develop-back.kotobum.com/api/user/album', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTPエラー: ${response.status} - ${response.statusText}`);
    }

    const albums = await response.json();
    albumId = albums.albumId;

    if (!albumId) {
      console.error('アルバムIDを取得できませんでした。');
      return;
    }

    const swiperSlides = document.querySelectorAll('.swiper-slide'); // Swiperの各スライドを取得
    const body = new FormData();

    // 📝 テキストデータ & 画像データを準備
    const pageData = [];

    for (let i = 0; i < swiperSlides.length; i++) {
      const slide = swiperSlides[i];
      const slideId = slide.dataset.slideId || `slide_${i + 1}`;
      const slideBox = slide.querySelector('.swiper-slide_box'); // スクショ対象

      // 📸 `swiper-slide_box` をキャプチャ
      const canvas = await html2canvas(slideBox, { scale: 2, useCORS: true });
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      canvas.toBlob(blob => {
        if (!blob) {
          console.error('⚠️ 画像の Blob を作成できませんでした！');
          return;
        }
        console.log('✅ Blob 作成成功:', blob);
      }, 'image/png');

      // 📤 FormData に画像を追加
      body.append(`images[${i}]`, blob, `${slideId}.png`);

      // 📝 テキストエリアを取得
      const textAreas = slide.querySelectorAll('.text-empty');
      const textData = Array.from(textAreas).map((textarea) => ({
        id: textarea.id,
        text: textarea.value || '',
      }));

      // 🎨 画像データを取得
      const dropAreas = slide.querySelectorAll('.empty');
      const imageData = Array.from(dropAreas).map((dropArea) => {
        const imgElement = dropArea.querySelector("img");
        return {
          id: dropArea.id,
          image: imgElement ? imgElement.src : null,
        };
      });

      // 📌 ページデータをまとめる
      pageData.push({
        slideId,
        textData,
        imageData,
      });
    }

    // 📝 JSON 形式で `FormData` に追加
    body.append("pageData", JSON.stringify(pageData));

    console.log('送信するデータ:', body);

    // 📨 サーバーに送信
    const uploadResponse = await fetch(`https://develop-back.kotobum.com/api/albums/${albumId}/body`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: body,
    });

    if (!uploadResponse.ok) {
      throw new Error(`データ送信に失敗しました: ${uploadResponse.status} - ${uploadResponse.statusText}`);
    }

    const data = await uploadResponse.json();
    console.log('成功:', data);
    alert('データが正常に保存されました。');

  } catch (error) {
    console.error('エラーが発生しました:', error.message);
    alert('エラーが発生しました。再度お試しください。');
  }
}

// 画像化してフロント側に表示
async function captureAndShow() {
  const target = document.querySelector('#target'); // キャプチャしたい要素

  if (!target) {
    console.error("キャプチャ対象が見つかりません💦");
    return;
  }

  //html-to-imageのキャプチャtry
  try {
    const dataUrl = await htmlToImage.toPng(target);

    // 画像を表示
    const imgElement = document.createElement("img");
    imgElement.src = dataUrl;
    imgElement.alt = "キャプチャ画像";
    imgElement.style.maxWidth = "100%";
    imgElement.style.border = "1px solid #ddd";

    const resultContainer = document.getElementById("capture-result");
    resultContainer.innerHTML = ""; // 既存の画像を削除
    resultContainer.appendChild(imgElement); // 新しい画像を追加

  } catch (error) {
    console.error("キャプチャ中にエラーが発生しました💦", error);
  }
}

// 保存ボタン押下時の処理
document.getElementById('sendButton').addEventListener('click', handleSaveOrSend);

function handleSaveOrSend() {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('認証トークンが見つかりません。ログインしてください。');
    alert('認証トークンが見つかりません。ログインしてください。');
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
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTPエラー: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then(albums => {
      albumId = albums.albumId;

      if (!albumId) {
        console.error('アルバムIDを取得できませんでした。');
        return;
      }

      const parentElement = document.querySelector('.input-drop');
      const swiperSlides = document.querySelectorAll('.swiper-slide'); // Swiperの各スライドを取得

      // 背景色とテキスト色の取得
      const backgroundColor = document.querySelector('.uniqueColor')?.style.backgroundColor || '#ffffff';
      const textColor = document.querySelector('.text-color')?.style.color || '#000000';
      // トリミングデータを取得
      // getCroppieImg();

      // 各ページのデータを収集
      const pageData = Array.from(swiperSlides).map((slide) => {
        const initialRect = slide.getBoundingClientRect(); // 各スライドの初期サイズを取得
        const slideWidth = initialRect.width;
        const slideHeight = initialRect.height;

        // スライド内のテキストエリアのデータ収集
        const textAreas = slide.querySelectorAll('.text-empty');
        const textData = Array.from(textAreas).map((textarea) => {
          const { top, left, width, height } = textarea.getBoundingClientRect();

          return {
            id: textarea.id,
            text: textarea.value || '',
            top: ((top - initialRect.top) / slideHeight) * 100, // パーセンテージ
            left: ((left - initialRect.left) / slideWidth) * 100, // パーセンテージ
            width: (width / slideWidth) * 100, // 幅のパーセンテージ
            height: (height / slideHeight) * 100, // 高さのパーセンテージ
          };
        });




        const dropAreas = slide.querySelectorAll('.empty');
        const imageData = Array.from(dropAreas).map((dropArea) => {
          const croppedImage = window.croppedImages[dropArea.id] || null; // ドロップエリアごとの画像データを取得
          const imgElement = dropArea.querySelector("img");
          const originalImage = imgElement ? imgElement.src : null;

          const imageToSend = croppedImage || originalImage;

          const { top, left, width, height } = dropArea.getBoundingClientRect();
          return {
            id: dropArea.id,
            image: imageToSend,
            top: (((top - initialRect.top) / slideHeight) * 100), // パーセンテージで指定
            left: ((left - initialRect.left) / slideWidth) * 100, // パーセンテージで指定
            width: (width / slideWidth) * 100, // 幅をパーセンテージで指定
            height: (height / slideHeight) * 100, // 高さをパーセンテージで指定
          };
        });

        return {
          slideId: slide.dataset.slideId || null, // スライドID（必要ならdata属性などで指定）
          textData,
          imageData,
        };
      });

      // 送信データの構築
      if (pageData.every(page => page.textData.every(text => text.text === '') && page.imageData.every(image => image.image === null))) {
        console.error('送信するデータがありません。');
        alert('送信するデータがありません。');
        return;
      }

      // imageDataとtextDataを分離して送信
      const imageDataToSend = pageData.flatMap(page => page.imageData);
      const textDataToSend = pageData.flatMap(page => page.textData);

      const dataToSend = {
        imageData: imageDataToSend,
        textData: textDataToSend,
        colors: {
          backgroundColor,
          textColor,
        }
      };

      // FormDataに追加して送信
      const body = new FormData();
      Object.entries(dataToSend).forEach(([key, value]) => {
        body.append(key, JSON.stringify(value));
      });

      console.log('送信するデータ:', dataToSend);

      return fetch(`https://develop-back.kotobum.com/api/albums/${albumId}/body`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: body,
      });
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`データ送信に失敗しました: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('成功:', data);
      alert('データが正常に保存されました。');

    })
    .catch(error => {
      console.error('エラーが発生しました:', error.message);
      if (error.response) {
        console.error('レスポンスデータ:', error.response.data);
      }
      console.error('スタックトレース:', error.stack);
      alert('エラーが発生しました。再度お試しください。');
    });

  // レイアウト確認
  function collectLayoutData() {
    const data = [];

    // textareaを収集
    document.querySelectorAll("textarea").forEach((textarea) => {
      const rect = textarea.getBoundingClientRect(); // 要素の座標
      const styles = window.getComputedStyle(textarea); // スタイル情報

      data.push({
        type: "textarea",
        id: textarea.id || null,
        class: textarea.className || null,
        rows: textarea.rows || null,
        maxlength: textarea.maxLength || null,
        value: textarea.value || "",
        styles: {
          position: styles.position,
          top: `${rect.top}px`,
          left: `${rect.left}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`,
          fontSize: styles.fontSize,
          color: styles.color,
          backgroundColor: styles.backgroundColor,
          border: styles.border,
        },
      });
    });

    // dropAreaを収集
    document.querySelectorAll("[id^='dropArea']").forEach((dropArea) => {
      const rect = dropArea.getBoundingClientRect(); // 要素の座標
      const styles = window.getComputedStyle(dropArea); // スタイル情報

      data.push({
        type: "dropArea",
        id: dropArea.id || null,
        class: dropArea.className || null,
        styles: {
          position: styles.position,
          top: `${rect.top}px`,
          left: `${rect.left}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`,
          backgroundColor: styles.backgroundColor,
          border: styles.border,
        },
      });
    });

    return data;
  }

  // JSONデータ取得
  const layoutData = collectLayoutData();
  console.log(layoutData);
};

// ページ読み込み時のアルバムデータ取得処理
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
    .then(response => {
      if (!response.ok) {
        alert("ログインしてください。");
        throw new Error(`アルバムID取得時のHTTPエラー: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then(albums => {
      albumId = albums.albumId;

      if (!albumId) {
        console.error('アルバムIDを取得できませんでした。');
        return;
      }
      console.log('取得したアルバムID:', albumId); // 取得したアルバムIDを表示

      // アルバムデータ取得リクエスト
      return fetch(`https://develop-back.kotobum.com/api/albums/${albumId}/showBody`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`アルバムデータ取得時のHTTPエラー: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('取得したデータ:', data);

      // 必要に応じてJSON文字列をパースして配列に変換
      const textData = Array.isArray(data.textData) ? data.textData : JSON.parse(data.textData);
      const imageData = Array.isArray(data.imageData) ? data.imageData : JSON.parse(data.imageData);
      const colors = typeof data.colors === 'object' ? data.colors : JSON.parse(data.colors);

      console.log(textData); // テキストデータの配列
      console.log(imageData); // 画像データの配列
      console.log(colors);    // 色情報のオブジェクト


      // データの存在チェック
      if (!textData || !Array.isArray(textData)) {
        console.warn('テキストデータが存在しないか、配列ではありません。');
      } else {
        // テキストデータを表示
        textData.forEach(item => {
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
        imageData.forEach(item => {
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

      // 色データを反映
      console.log('colors:', colors);
      if (colors) {
        const { backgroundColor, textColor } = colors;

        // `.uniqueColor` クラスを持つすべての要素に背景色を設定
        document.querySelectorAll('.uniqueColor').forEach(element => {
          element.style.backgroundColor = backgroundColor || '#ffffff';
        });

        // `.text-color` クラスを持つすべての要素にテキスト色を設定
        document.querySelectorAll('.text-color').forEach(element => {
          element.style.color = textColor || '#000000';
        });

        console.log(`背景色: ${backgroundColor}, テキスト色: ${textColor}`);
      } else {
        console.warn('色データが存在しません。');
      }
    })
});


