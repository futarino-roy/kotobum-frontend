// スライド
// const swiper = new Swiper('.swiper', {
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
//   slidesPerView: 1,
//   slidesPerGroup: 1,
//   initialSlide: 23, // 初期スライド
//   breakpoints: {
//     900: {
//       slidesPerView: 2,
//       slidesPerGroup: 2,
//       initialSlide: Math.floor(24 / 2), // スライドを2つずつ表示する場合の調整
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

// Swiperの初期化
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

// テキストエリアの要素を取得
const bugFixes = document.querySelectorAll('.swiper textarea');
bugFixes.forEach((textarea) => {
  // フォーカスが当たったときの処理
  textarea.addEventListener('focus', () => {
    swiper.allowTouchMove = false; // スワイプ無効
  });
  // フォーカスが外れたときの処理
  textarea.addEventListener('blur', () => {
    swiper.allowTouchMove = true; // スワイプ有効
  });
  // // Enterキーが押されたときの処理
  // textarea.addEventListener('keydown', (event) => {
  //   if (event.key === 'Enter') {
  //     event.preventDefault(); // Enterキーのデフォルトの動作を防ぐ（改行）
  //   }
  // });
  // 完了ボタン押下時の処理
  textarea.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      textarea.blur(); // テキストエリアのフォーカスを外す
      // ここに必要なら、Swiperの現在のスライドを確認するロジックを追加
    }
  });
  // ここでは、blurイベントを使ってフォーカスを外したときの処理も行います
  textarea.addEventListener('blur', () => {
    swiper.allowTouchMove = true; // スワイプ有効
  });
});

// メインのスライドからプレビュー
document.addEventListener('DOMContentLoaded', function () {
  // プレビューボタンにクリックイベントリスナーを追加
  document.querySelector('.btn-preview').addEventListener('click', function () {
    // 現在のスライドインデックスを取得
    const currentSlideIndex = swiper.realIndex;

    // プレビューページのURLを動的に設定
    const previewUrl = `../previewB/index.html?slide=${currentSlideIndex + 1}`;

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

// // 枠変更 24-1~3変更できない版
// document.addEventListener('DOMContentLoaded', () => {
//   const dropAreas = [];
//   const resizeButtons = document.querySelectorAll('.resizeButton');
//   let activeDropArea = null;

//   // ドロップエリアをすべて取得し、配列に追加
//   document.querySelectorAll('[id^="dropArea"]').forEach((dropArea) => {
//     dropAreas.push(dropArea);
//     dropArea.addEventListener('pointerdown', () => handleDropAreaInteraction(dropArea));
//   });

//   // ドロップエリアがクリックまたはタッチされたときの処理
//   const handleDropAreaInteraction = (dropArea) => {
//     dropAreas.forEach((area) => area.classList.remove('active'));
//     dropArea.classList.add('active');
//     activeDropArea = dropArea;
//   };

//   // サイズ変更ボタンがクリックまたはタッチされたときの処理
//   const handleResizeButtonInteraction = (button) => {
//     if (activeDropArea) {
//       // サイズ変更を禁止するドロップエリアのリスト
//       const restrictedDropAreas = ['dropArea24-1', 'dropArea24-2', 'dropArea24-3'];

//       // サイズ変更を禁止するドロップエリアでない場合のみ処理
//       if (!restrictedDropAreas.includes(activeDropArea.id)) {
//         // サイズをすべてリセット
//         activeDropArea.classList.remove('square', 'rectangle', 'mini');
//         // ボタンの data-size 属性に基づいてサイズを変更
//         const size = button.getAttribute('data-size');
//         activeDropArea.classList.add(size);

//         // サイズ情報をローカルストレージに保存（ドロップエリアごとに異なるキーを使用）
//         localStorage.setItem(`dropAreaSize_${activeDropArea.id}`, size);
//       }
//     }
//   };

//   resizeButtons.forEach((button) => {
//     button.addEventListener('pointerdown', () => handleResizeButtonInteraction(button));
//   });

//   // ページロード時にローカルストレージからサイズを復元
//   dropAreas.forEach((dropArea) => {
//     const savedSize = localStorage.getItem(`dropAreaSize_${dropArea.id}`);
//     if (savedSize) {
//       dropArea.classList.add(savedSize);
//     }
//   });
// });

// 色変更
function changeColor(color) {
  // 背景色を変更する
  // ユニークカラーBって名前が付いた範囲の色が全部変わる
  let elements = document.getElementsByClassName('uniqueColorB');
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.backgroundColor = color;
  }

  // テキスト色を変更する
  // テキストカラーBって名前が付いたテキストの色が変わる
  let textElements = document.getElementsByClassName('text-colorB');
  for (let i = 0; i < textElements.length; i++) {
    textElements[i].style.color = color;
  }

  // 色をローカルストレージに保存する
  localStorage.setItem('backgroundColorB', color);
}

// ページ読み込み時にローカルストレージから色を取得して適用する
document.addEventListener('DOMContentLoaded', function () {
  const savedColor = localStorage.getItem('backgroundColorB');
  if (savedColor) {
    // セーブカラーで好きな色に変えられる
    changeColor(savedColor);
  }
});

// function previewSlides() {
//     // スライド1の内容を取得
//     const text1 = document.getElementById('textArea').value;
//     // スライド2の内容を取得
//     const text2 = document.getElementById('textArea2').value;

//     // ストレージに保存 (例: sessionStorage)
//     sessionStorage.setItem('slide1Text', text1);
//     sessionStorage.setItem('slide2Text', text2);

//     // プレビューページに遷移 (URLを設定)
//     window.location.href = '../preview/index.html';
// }

// 現在のページの内容を取得してサーバに送信
// document.getElementById('sendButton').addEventListener('click', function () {
//     // ページ全体のHTMLを取得
//     const htmlContent = document.documentElement.outerHTML;

//     // ページのすべてのスタイルシートを取得
//     let cssContent = '';
//     let cssUrls = [];
//     const cssPromises = [];

//     // スタイルシートをループして処理
//     for (let sheet of document.styleSheets) {
//         try {
//             if (sheet.href) {
//                 // 外部CSSファイルのURLを取得
//                 cssUrls.push(sheet.href);

//                 // 外部CSSファイルの内容を取得するためにfetchを使用
//                 cssPromises.push(
//                     fetch(sheet.href)
//                         .then(response => response.text())
//                         .then(text => {
//                             cssContent += text;
//                         })
//                         .catch(e => {
//                             console.warn('スタイルシートの取得エラー:', e);
//                         })
//                 );
//             } else {
//                 // インラインスタイルシートの内容を取得
//                 for (let rule of sheet.cssRules) {
//                     cssContent += rule.cssText;
//                 }
//             }
//         } catch (e) {
//             console.warn('スタイルシートの取得エラー:', e);
//         }
//     }

//     // すべてのfetchリクエストが完了するのを待つ
//     Promise.all(cssPromises).then(() => {
//         // ローカルストレージのすべてのデータを取得
//         let localStorageData = {};
//         for (let i = 0; i < localStorage.length; i++) {
//             const key = localStorage.key(i);
//             localStorageData[key] = localStorage.getItem(key);
//         }

//         // FormDataオブジェクトを作成
//         const formData = new FormData();
//         formData.append('htmlContent', htmlContent);  // HTMLの内容
//         formData.append('cssContent', cssContent);    // CSSの内容
//         formData.append('cssUrls', JSON.stringify(cssUrls));  // 外部CSSファイルのURLをJSON文字列にして追加
//         formData.append('localStorageData', JSON.stringify(localStorageData));  // ローカルストレージのデータをJSON文字列にして追加

//         // fetch APIを使ってサーバに送信
//         fetch('https://develop-back.kotobum.com/api/albums', {
//             method: 'POST',
//             body: formData
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Success:', data);
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });
//     });
// });

// 異なるページの内容を取得してサーバに送信
// 異なるページの内容を取得してサーバに送信
// document.getElementById('sendButton').addEventListener('click', function () {
//     // 取得したい別のページのURL
//     const otherPageUrl = '../preview/index.html';  // 例: 同一ドメイン内の別のページ

//     // 別のHTMLページの内容を取得
//     fetch(otherPageUrl)
//         .then(response => response.text())
//         .then(htmlContent => {
//             // ページのすべてのスタイルシートを取得
//             let cssContent = '';
//             let cssUrls = [];
//             const cssPromises = [];

//             // 現在のページのスタイルシートをループして処理
//             for (let sheet of document.styleSheets) {
//                 try {
//                     if (sheet.href) {
//                         // 外部CSSファイルのURLを取得
//                         cssUrls.push(sheet.href);

//                         // 外部CSSファイルの内容を取得するためにfetchを使用
//                         cssPromises.push(
//                             fetch(sheet.href)
//                                 .then(response => response.text())
//                                 .then(text => {
//                                     cssContent += text;
//                                 })
//                                 .catch(e => {
//                                     console.warn('スタイルシートの取得エラー:', e);
//                                 })
//                         );
//                     } else {
//                         // インラインスタイルシートの内容を取得
//                         for (let rule of sheet.cssRules) {
//                             cssContent += rule.cssText;
//                         }
//                     }
//                 } catch (e) {
//                     console.warn('スタイルシートの取得エラー:', e);
//                 }
//             }

//             // すべてのfetchリクエストが完了するのを待つ
//             Promise.all(cssPromises).then(() => {
//                 // ローカルストレージのすべてのデータを取得
//                 let localStorageData = {};
//                 for (let i = 0; i < localStorage.length; i++) {
//                     const key = localStorage.key(i);
//                     localStorageData[key] = localStorage.getItem(key);
//                 }

//                 // FormDataオブジェクトを作成してbodyに代入
//                 const body = new FormData();
//                 body.append('htmlContent', htmlContent);  // 別のHTMLページの内容
//                 body.append('cssContent', cssContent);    // 現在のページのCSSの内容
//                 body.append('cssUrls', JSON.stringify(cssUrls));  // 外部CSSファイルのURLをJSON文字列にして追加
//                 body.append('localStorageData', JSON.stringify(localStorageData));  // ローカルストレージのデータをJSON文字列にして追加

//                 // fetch APIを使ってサーバに送信
//                 fetch('https://develop-back.kotobum.com/api/albums/{album}/body', {
//                     method: 'POST',
//                     body: body // bodyを指定
//                 })
//                 .then(response => response.json())
//                 .then(data => {
//                     console.log('Success:', data);
//                 })
//                 .catch((error) => {
//                     console.error('Error:', error);
//                 });
//             });
//         })
//         .catch((error) => {
//             console.error('別のHTMLページの取得エラー:', error);
//         });
// });

// キャプチャ（html-to-image）
// async function captureAllSlides() {
//   const slides = document.querySelectorAll('.swiper-slide'); // キャプチャしたい要素
//   const message = document.querySelector(".capture"); // メッセージ用の div
//   message.style.display = "block"; // キャプチャ開始時に表示

//   if (!slides.length === 0) {
//     console.error("キャプチャ対象が見つかりません💦");
//     message.style.display = "none"; // エラー時にも非表示
//     return;
//   }

//   for (let i = 0; i < slides.length; i++) {
//     const slide = slides[i]; //現在のスライドを取得
//     try {
//       const scale = 7; // 高画質にする倍率
//       const options = {
//         quality: 1, // JPEGの画質を最大に
//         width: target.offsetWidth * scale, // 元の幅 × 倍率
//         height: target.offsetHeight * scale,
//         useBlob: true, // Blobで出力（画質劣化を防ぐ）
//       };
//       // 🌸 キャプチャ時だけ拡大
//       const originalStyle = slide.style.cssText; // 元のスタイルを保存
//       slide.style.position = "absolute"; // 位置を固定（ズレ防止）
//       slide.style.left = "0";
//       slide.style.top = "0";
//       slide.style.transform = `scale(${scale})`; // 2倍に拡大
//       slide.style.transformOrigin = "top left"; // 左上基準で拡大
//       slide.style.width = `${slide.offsetWidth}px`; // 元のサイズを保持
//       slide.style.height = `${slide.offsetHeight}px`;

//       // 画像の位置を明示的に指定
//       const img = slide.querySelector("img");
//       if (img) {
//         img.style.position = "absolute"; // 画像の位置を相対的に調整
//         img.style.left = "0"; // 画像を左に寄せる
//       }

//       // 📸 画像を生成
//       const blob = await htmlToImage.toBlob(slide, options);

//       // ✨ キャプチャ後、元のスタイルに戻す
//       slide.style.cssText = originalStyle;
//       slide.style.width = "100%"; // これで幅が100%に調整される

//       // 🌟 Blobを画像として表示
//       const imgElement = document.createElement("img");
//       imgElement.src = URL.createObjectURL(blob);
//       imgElement.alt = "キャプチャ画像 ${i + 1}";
//       imgElement.style.maxWidth = "100%";
//       imgElement.style.border = "1px solid #ddd"; // 見やすくする枠

//       document.getElementById("capture-result").appendChild(imgElement);
//     } catch (error) {
//       console.error("スライド ${i + 1} のキャプチャ中にエラーが発生しました💦", error);
//       message.style.display = "none"; // 非表示
//     }
//   }
//   message.style.display = "none"; // 非表示
// }

// キャプチャ=>画像ダウンロード
// async function captureToPDF() {
//   const target = document.querySelector('#target'); // キャプチャしたい要素

//   if (!target) {
//     console.error("キャプチャ対象が見つかりません💦");
//     return;
//   }
//   try {
//     const scale = 4; // 高画質にする倍率
//     const mmToPx = 3.7795275591; // 1mm = 3.78px (96dpi)
//     const widthMM = 158, heightMM = 218; // 画像のサイズ（mm）
//     const canvasWidth = widthMM * mmToPx * scale;
//     const canvasHeight = heightMM * mmToPx * scale;
//     const options = {
//       quality: 1, // JPEGの画質を最大に
//       width: canvasWidth, // 指定サイズ
//       height: canvasHeight,
//       useBlob: true, // Blobで出力（画質劣化を防ぐ）
//     };

//     // 🌸 キャプチャ時だけ拡大
//     const originalStyle = target.style.cssText; // 元のスタイルを保存
//     target.style.position = "absolute"; // 位置を固定（ズレ防止）
//     target.style.left = "0";
//     target.style.top = "0";
//     target.style.transform = `scale(${scale})`; // scale倍に拡大
//     target.style.transformOrigin = "top left"; // 左上基準で拡大
//     target.style.width = `${target.offsetWidth}px`; // 元のサイズを保持
//     target.style.height = `${target.offsetHeight}px`;
//     target.style.clipPath = "none";

//     // 画像の位置を明示的に指定
//     const img = target.querySelector("img");
//     if (img) {
//       img.style.position = "absolute"; // 画像の位置を相対的に調整
//       img.style.left = "0"; // 画像を左に寄せる
//     }

//     // 📸 画像を生成
//     const blob = await htmlToImage.toBlob(target, options);

//     // ✨ キャプチャ後、元のスタイルに戻す
//     target.style.cssText = originalStyle;
//     target.style.width = "100%"; // これで幅が100%に調整される

//     // 🌟 Blobを画像としてダウンロード
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "capture.png"; // ダウンロードファイル名
//     a.click();
//     URL.revokeObjectURL(url); // メモリ解放
//   } catch (error) {
//     console.error("キャプチャ中にエラーが発生しました💦", error);
//   }
// }

//キャプチャ=>PDF
// async function captureToPDF() {
//   const target = document.querySelector('#target'); // キャプチャしたい要素

//   if (!target) {
//     console.error("キャプチャ対象が見つかりません💦");
//     return;
//   }
//   try {
//     const scale = 5; // 高画質にする倍率
//     const options = {
//       quality: 1, // JPEGの画質を最大に
//       width: target.offsetWidth * scale, // 元の幅 × 倍率
//       height: target.offsetHeight * scale,
//       useBlob: true, // Blobで出力（画質劣化を防ぐ）
//     };

//     // 🌸 キャプチャ時だけ拡大
//     const originalStyle = target.style.cssText; // 元のスタイルを保存
//     target.style.position = "absolute"; // 位置を固定（ズレ防止）
//     target.style.left = "0";
//     target.style.top = "0";
//     target.style.transform = `scale(${scale})`; // scale倍に拡大
//     target.style.transformOrigin = "top left"; // 左上基準で拡大
//     target.style.width = `${target.offsetWidth}px`; // 元のサイズを保持
//     target.style.height = `${target.offsetHeight}px`;
//     target.style.clipPath = "none";

//     // 画像の位置を明示的に指定
//     const img = target.querySelector("img");
//     if (img) {
//       img.style.position = "absolute"; // 画像の位置を相対的に調整
//       img.style.left = "0"; // 画像を左に寄せる
//     }

//     // 📸 画像を生成
//     const blob = await htmlToImage.toBlob(target, options);

//     // ✨ キャプチャ後、元のスタイルに戻す
//     target.style.cssText = originalStyle;
//     target.style.width = "100%"; // これで幅が100%に調整される

//     // 🌟 Blobを画像として表示
//     const imgElement = document.createElement("img");
//     imgElement.src = URL.createObjectURL(blob);
//     imgElement.alt = "キャプチャ画像";
//     imgElement.style.maxWidth = "100%";
//     imgElement.style.border = "1px solid #ddd"; // 見やすくする枠

//     // キャプチャした画像をPDF化
//     const { jsPDF } = window.jspdf;
//     const doc = new jsPDF({
//       orientation: "portrait", // 縦向き（横向きなら "landscape"）
//       unit: "mm",  // 単位をmmに指定
//       format: [158, 218]  // 幅158mm × 高さ218mm
//     });

//     const image = new Image();
//     image.src = imgElement.src;
//     image.onload = function () {
//       const pageWidth = doc.internal.pageSize.width; // PDFページの幅
//       const pageHeight = doc.internal.pageSize.height; // PDFページの高さ

//       // 画像のサイズを調整してPDFに追加
//       const imgWidth = pageWidth;
//       const imgHeight = (image.height / image.width) * imgWidth; // アスペクト比を保つ

//       // 画像をPDFに追加
//       doc.addImage(image, 'PNG', 0, 0, imgWidth, imgHeight);

//       // PDFをダウンロード
//       doc.save('capture.pdf');
//     };

//     // 表示された画像も追加
//     document.getElementById("capture-result").appendChild(imgElement);

//   } catch (error) {
//     console.error("キャプチャ中にエラーが発生しました💦", error);
//   }
// }

// jsPDFで12ページPDF化
async function captureToPDF() {
  const targets = document.querySelectorAll('.target'); // すべてのページを取得🐰

  if (targets.length === 0) {
    console.error('キャプチャ対象のページが見つかりません💦');
    return;
  }

  try {
    const scale = 4; // スケールを上げる
    const options = {
      quality: 1,
      width: targets[0].offsetWidth * scale,
      height: targets[0].offsetHeight * scale,
      useBlob: true,
    };

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [158, 218],
    });

    for (let i = 0; i < targets.length; i++) {
      const target = targets[i];

      // 🌸 キャプチャ前に少し待つ
      await new Promise((resolve) => setTimeout(resolve, 100));

      // 🌸 キャプチャ時だけ拡大
      const originalStyle = target.style.cssText;
      target.style.border = 'none';
      target.style.position = 'absolute';
      target.style.left = '0';
      target.style.top = '0';
      target.style.transform = `scale(${scale})`;
      target.style.transformOrigin = 'top left';
      target.style.width = `${target.offsetWidth}px`;
      target.style.height = `${target.offsetHeight}px`;
      target.style.clipPath = 'none';

      // ✅ textarea の表示を確実にする
      const textareas = target.querySelectorAll('textarea');
      textareas.forEach((textarea) => {
        textarea.style.display = 'block';
      });

      // ✅ 画像の位置を明示的に指定
      const img = target.querySelector('img');
      if (img) {
        img.style.position = 'absolute';
        img.style.left = '0';
      }

      // 📸 キャプチャ実行
      const blob = await htmlToImage.toBlob(target, options);

      // 🌟 キャプチャ後、元のスタイルに戻す
      target.style.cssText = originalStyle;
      target.style.width = '100%';

      // 🌟 画像をダウンロード
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `page_${i + 1}.png`; // `page_1.png`, `page_2.png`...
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    console.log('すべての画像をダウンロードしました！');
  } catch (error) {
    console.error('キャプチャ中にエラーが発生しました', error);
  }
}

// 保存ボタン押下時の処理
document.getElementById('sendButton').addEventListener('click', handleSaveOrSend);

// document.getElementById('sendButton').addEventListener('click', handleSaveOrSend);

function handleSaveOrSend() {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('認証トークンが見つかりません。ログインしてください。');
    alert('認証トークンが見つかりません。ログインしてください。2秒後にログインページに戻ります。');
    screen_lock();
    setTimeout(() => {
      window.location.href = '../login';
    }, 2000);
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
        throw new Error(`HTTPエラー: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then((albums) => {
      albumId = albums.albumId;

      if (!albumId) {
        console.error('アルバムIDを取得できませんでした。');
        return;
      }

      const parentElement = document.querySelector('.input-drop');
      const swiperSlides = document.querySelectorAll('.swiper-slide'); // Swiperの各スライドを取得

      // 背景色とテキスト色の取得
      const backgroundColor = document.querySelector('.uniqueColorB')?.style.backgroundColor || '#ffffff';
      const textColor = document.querySelector('.text-colorB')?.style.color || '#000000';
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

        // スライド内の画像データ収集
        // const dropAreas = slide.querySelectorAll('.empty');
        // const imageData = Array.from(dropAreas).map((dropArea) => {
        //   const img = dropArea.querySelector('img'); // 画像要素を取得
        //   const croppedImage = dropArea.dataset.croppedImage || (img ? img.src : null); //トリミング後の画像
        //   const { top, left, width, height } = dropArea.getBoundingClientRect(); // ドロップエリアの座標情報を取得

        //   // return {
        //   //   id: dropArea.id,
        //   //   image: img ? img.src : null,
        //   //   top: ((top - initialRect.top) / canvasHeight) * 100, // 固定基準の高さを使用
        //   //   left: ((left - initialRect.left) / canvasWidth) * 100, // 固定基準の幅を使用
        //   //   width: (width / canvasWidth) * 100, // 固定基準の幅を使用
        //   //   height: (height / canvasHeight) * 100, // 固定基準の高さを使用
        //   // };
        //   return {
        //     id: dropArea.id,
        //     image: croppedImage,
        //     top: (((top - initialRect.top) / slideHeight) * 100), // パーセンテージで指定
        //     left: ((left - initialRect.left) / slideWidth) * 100, // パーセンテージで指定
        //     width: (width / slideWidth) * 100, // 幅をパーセンテージで指定
        //     height: (height / slideHeight) * 100, // 高さをパーセンテージで指定
        //   };
        // });

        const dropAreas = slide.querySelectorAll('.empty');
        const imageData = Array.from(dropAreas).map((dropArea) => {
          const croppedImage = window.croppedImages[dropArea.id] || null; // ドロップエリアごとの画像データを取得
          const imgElement = dropArea.querySelector('img');
          const originalImage = imgElement ? imgElement.src : null;

          const imageToSend = croppedImage || originalImage;

          const { top, left, width, height } = dropArea.getBoundingClientRect();
          return {
            id: dropArea.id,
            image: imageToSend,
            top: ((top - initialRect.top) / slideHeight) * 100, // パーセンテージで指定
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
      if (pageData.every((page) => page.textData.every((text) => text.text === '') && page.imageData.every((image) => image.image === null))) {
        console.error('送信するデータがありません。');
        alert('送信するデータがありません。');
        return;
      }

      // imageDataとtextDataを分離して送信
      const imageDataToSend = pageData.flatMap((page) => page.imageData);
      const textDataToSend = pageData.flatMap((page) => page.textData);

      const dataToSend = {
        imageData: imageDataToSend,
        textData: textDataToSend,
        colors: {
          backgroundColor,
          textColor,
        },
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
    .then((response) => {
      if (!response.ok) {
        throw new Error(`データ送信に失敗しました: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log('成功:', data);
      alert('データが正常に保存されました。');
    })
    .catch((error) => {
      console.error('エラーが発生しました:', error.message);
      if (error.response) {
        console.error('レスポンスデータ:', error.response.data);
      }
      console.error('スタックトレース:', error.stack);
      alert('エラーが発生しました。再度お試しください。');
    });
}

// ログインしていないとき用のスクリーンロック
function screen_lock() {
  let lock_screen = document.createElement('div');
  lock_screen.id = 'screenLock';

  lock_screen.style.backgroundColor = '#000000';
  lock_screen.style.height = '100%';
  lock_screen.style.left = '0px';
  lock_screen.style.position = 'fixed';
  lock_screen.style.top = '0px';
  lock_screen.style.width = '100%';
  lock_screen.style.zIndex = '9999';
  lock_screen.style.opacity = '10%';

  let objBody = document.getElementsByTagName('body').item(0);
  objBody.appendChild(lock_screen);
}

// ページ読み込み時のアルバムデータ取得処理
document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('token');
  // 管理者用のアルバムID取得
  const albumId = localStorage.getItem('albumId');

  if (!token) {
    console.error('認証トークンが見つかりません。ログインしてください。');
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const isAdmin = urlParams.has('admin');

  if (isAdmin) {
    console.log(`管理者モード: トークン: ${token}, アルバムID: ${albumId}`);
    // 画像化ボタンの表示
    showCaptureButton();
    // アルバムデータ取得リクエスト用の関数
    AlbumData(albumId, token);
    return;
  } else {
    console.log('一般ユーザーです');
    // 一般ユーザー用のアルバムIDの取得
    fetchAlbumID(token);
  }

  // 画像化ボタンの表示関数
  function showCaptureButton() {
    const captureButton = document.getElementById('captureButton');
    if (captureButton) {
      captureButton.style.display = 'block';
    } else {
      console.warn('画像化ボタンが見つかりません');
    }
  }

  //一般ユーザー用のアルバムIDの取得
  function fetchAlbumID(token) {
    fetch('https://develop-back.kotobum.com/api/user/album', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          alert('ログインしてください。2秒後にログインページに戻ります。');
          // screen_lock();
          // setTimeout(() => {
          //   window.location.href = '../login';
          // }, 2000);
          throw new Error(`アルバムID取得時のHTTPエラー: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then((albums) => {
        const albumId = albums.albumId;

        if (!albumId) {
          console.error('アルバムIDを取得できませんでした。');
          return;
        }
        console.log('取得したアルバムID:', albumId); // 取得したアルバムIDを表示
        // アルバムデータ取得リクエスト用の関数
        AlbumData(albumId, token);
      })
      .catch((error) => console.error('アルバムIDの取得エラー', error));
  }

  // アルバムデータ取得リクエスト用の関数
  function AlbumData(albumId, token) {
    fetch(`https://develop-back.kotobum.com/api/albums/${albumId}/showBody`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
      });
  }
});

// 管理者用のアルバムIDの取得
// function AdminAlbumID(token) {
//   fetch('https://develop-back.kotobum.com/api/admin/albums', {
//     method: 'GET',
//     headers: {
//       // Authorization: `Bearer ${token}`, //APIリクエストを送るための認証
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => response.json())
//     .then((albums) => {
//       if (!albums || albums.length === 0) {
//         console.error('管理者用のアルバムIDを取得できませんでした。');
//         return;
//       }
//       // 選択したユーザーの処理が入るはず…!
//       albumId = albums[0].albumId; //仮に最初のアルバムを取得

//       console.log('管理者として取得したアルバムID:', albumId);
//       // アルバムデータ取得リクエスト用の関数
//       AlbumData(albumId, token);
//     })
//     .catch((error) => console.error('アルバムIDの取得エラー', error));
// }

// // 遷移元の判断（adminが含まれるURLから来たか判断）
// if (document.referrer && document.referrer.indexOf('admin') == -1) {
//   console.log('一般ユーザーです');
//   // 一般ユーザー用のアルバムIDの取得
//   fetchAlbumID(token);
// } else {
//   if (!token || !albumId) {
//     console.warn('管理者モードエラー：トークンまたはアルバムIDが見つかりません');
//     return;
//   }
//   console.log(`管理者モード: トークン: ${token}, アルバムID: ${albumId}`);
//   // 画像化ボタンの表示
//   showCaptureButton();

//   // アルバムデータ取得リクエスト用の関数
//   AlbumData(albumId, token);
// }
