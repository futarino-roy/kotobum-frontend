// editの共通するJSを　中身と表紙
// 共通するJSをいれたら、もとのJSはコメントアウトする!!!!!!!!!!!!

//  ドロワー-------------------------------------------------------------
let currentContentId = null;
let activeButton = null;

const toggleDrawer = () => {
  const drawer = document.getElementById('drawer');
  const content = document.getElementById('content');
  const sidebar = document.getElementById('sidebar');
  const swbtnpre = document.getElementById('swbtnpre');
  const swbtnnext = document.getElementById('swbtnnext');

  drawer.classList.toggle('open');
  sidebar.classList.toggle('open');
  content.classList.toggle('open');
  swbtnpre.classList.toggle('open');
  swbtnnext.classList.toggle('open');

  if (!drawer.classList.contains('open')) {
    currentContentId = null;

    if (activeButton) {
      activeButton.classList.remove('active');
      activeButton = null;
    }
  }
};

const showDrawerContent = (contentId) => {
  const drawerContent = document.getElementById('drawer-content');
  const contentElement = document.getElementById(contentId);

  const clickedButton = document.querySelector(`[date-content-id="${contentId}"]`);

  if (!contentElement) {
    console.error(`Content element with ID '${contentId}' not found.`);
    return;
  }

  if (contentId === currentContentId && drawer.classList.contains('open')) {
    toggleDrawer();
    return;
  }

  // 全てのコンテンツを非表示にする
  const allContentItems = document.querySelectorAll('.edit_drawer_container_item');
  allContentItems.forEach((item) => {
    item.style.display = 'none';
  });

  // 選択されたコンテンツを表示する
  contentElement.style.display = 'block';

  // ボタンのスタイルを更新 new
  if (activeButton) {
    activeButton.classList.remove('active'); // 以前のボタンからactiveクラスを削除
  }
  if (clickedButton) {
    clickedButton.classList.add('active'); // クリックされたボタンにactiveクラスを追加
    activeButton = clickedButton; // 現在のアクティブボタンを更新
  }

  currentContentId = contentId;

  if (!drawer.classList.contains('open')) {
    toggleDrawer(); // ドロワーが閉じている場合は開く
  }
};

//　画像の挿入（inputタグ）
document.addEventListener('DOMContentLoaded', () => {
  const dropAreas = document.querySelectorAll('.empty'); // .emptyクラスの要素を全て取得
  const fileInput = document.getElementById('fileInput');

  dropAreas.forEach((dropArea) => {
    // .emptyをクリックしたらfileInputをクリック
    dropArea.addEventListener('click', () => {
      fileInput.dataset.target = dropArea.id; // 選択したdropAreaのIDを記録
      fileInput.click();
    });
  });

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('選択されたファイル:', file); // ファイルの詳細を確認
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log('画像データ:', e.target.result); // Base64データを確認
        // 選択された画像をemptyDivに挿入
        const targetId = fileInput.dataset.target;
        const targetDropArea = document.getElementById(targetId);

        if (targetDropArea) {
          targetDropArea.innerHTML = `<img src="${e.target.result}" alt="Selected Image">`;
          targetDropArea.style.border = 'none';

          showButtons(targetDropArea);
          addButtons(targetDropArea);
        } else {
          console.error(`ターゲットエリアが見つかりません: ${targetId}`);
        }
      };
      reader.readAsDataURL(file);
    } else {
      console.error('ファイルが選択されませんでした。');
    }
  });
});

// // // 画像のアップロードと挿入-----------------------------------------------
// let selectedImage = null;

// document.addEventListener('DOMContentLoaded', function () {
//   addTouchListenerToDropAreas();

// });

// // サイドバーに画像読み込み、ドラッグ・タッチ操作可能に
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

// //画像をドラッグ可能にするための関数。マウスとタッチイベントで画像を移動できるようにする。
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

// //画像をクリックまたはタッチすると、その画像を選択状態にする関数。
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
//   const drawer = document.getElementById('drawer');
//   const sideBtn = document.getElementById('sideBtn');

//   dropAreas.forEach((dropArea) => {
//     dropArea.addEventListener('touchstart', function (e) {
//       e.preventDefault();
//       if (selectedImage) {
//         insertImageToDropArea(this);
//       } else {
//         if (!e.target.closest('.empty') && !drawer.contains(e.target) && !sideBtn.contains(e.target)) {
//           document.querySelectorAll('.empty.with-buttons').forEach((area) => {
//             area.classList.add('hide-buttons');
//             area.style.border = 'none';
//           });
//         }
//         this.classList.remove('hide-buttons');
//         this.style.border = '';
//       }
//     });
//   });

//   document.addEventListener('touchstart', function (e) {
//     const allDropAreas = document.querySelectorAll('.empty.with-buttons');
//     if (!e.target.closest('.empty.with-buttons') && !drawer.contains(e.target) && !sideBtn.contains(e.target)) {
//       allDropAreas.forEach((dropArea) => {
//         dropArea.classList.add('hide-buttons');
//         dropArea.style.border = 'none';
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

//   dropArea.classList.remove('hide-buttons');
// }

// function openCroppieModal(dropArea) {
//   console.log('Croppie modal open for drop area:', dropArea);
// }

// // // 画像のドラッグ＆ドロップ indexedDBに保存--------------------------------
// function handleDragOver(event) {
//   event.preventDefault();
//   this.style.backgroundColor = '#d0f0c0';
// }

// // ドラッグが離れたときの処理
// function handleDragLeave(event) {
//   this.style.backgroundColor = 'transparent';
// }

// // ーーーーーーードロップ時の処理(原型)ーーーーーーーーーーーーーーー
// // function handleDrop(event) {
// //   console.log('Drop event fired');
// //   event.preventDefault();
// //   this.style.backgroundColor = 'transparent';

// //   const files = event.dataTransfer.files;
// //   if (files.length > 0) {
// //     let file = files[0];
// //     let fileReader = new FileReader();
// //     fileReader.onload = function (e) {
// //       this.innerHTML = '';
// //       let img = new Image();
// //       img.src = e.target.result;
// //       img.classList.add('draggable-image');
// //       img.onclick = function () {
// //         showButtons(this.parentNode);
// //       };
// //       this.appendChild(img);
// //       addButtons(this);

// //       // 画像が挿入されたら枠線をなくす処理追加
// //       this.style.border = 'none';
// //     }.bind(this);
// //     fileReader.readAsDataURL(file);
// //   }
// // }

// // // ーーーーーーードロップ時の処理(変更1)ーーーーーーーーーーーーーーー
// // function handleDrop(event) {
// //   console.log('Drop event fired');

// //   event.preventDefault();
// //   console.log('Default behavior prevented');

// //   this.style.backgroundColor = 'transparent';
// //   console.log('Background color set to transparent');

// //   const dropArea = this; // thisを保存
// //   console.log('Drop area saved:', dropArea);

// //   const files = event.dataTransfer.files;
// //   console.log('Files dropped:', files);

// //   if (files.length > 0) {
// //     let file = files[0];
// //     console.log('Processing file:', file);

// //     let fileReader = new FileReader();
// //     console.log('FileReader created:', fileReader);

// //     fileReader.onload = function (e) {
// //       console.log('File loaded successfully');

// //       dropArea.innerHTML = ''; // 保存したdropAreaを使用
// //       console.log('Drop area content cleared');

// //       let img = new Image();
// //       console.log('Image element created:', img);

// //       img.src = e.target.result;
// //       console.log('Image source set to:', img.src);

// //       img.classList.add('draggable-image');
// //       console.log('Class "draggable-image" added to image');

// //       img.onclick = function () {
// //         console.log('Image clicked');
// //         showButtons(dropArea);
// //       };

// //       dropArea.appendChild(img);
// //       console.log('Image added to drop area');

// //       addButtons(dropArea);
// //       console.log('Buttons added to drop area');

// //       // 画像が挿入されたら枠線をなくす処理追加
// //       dropArea.style.border = 'none';
// //       console.log('Drop area border set to "none"');
// //     };
// //     fileReader.readAsDataURL(file);
// //   } else {
// //     console.log('fileが無いです！');
// //   }

// // }

// // ーーーーーーードロップ時の処理(変更2)ーーーーーーーーーーーーーーー

// // タッチエンド時の処理---------------------------------------------------------

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
//         img.onload = function () {
//           dropArea.appendChild(img);
//           addButtons(dropArea);
//           dropArea.style.border = 'none'; // 画像が挿入されたら枠線をなくす
//         };
//       };
//       fileReader.readAsDataURL(file);
//     }
//   }
// }

//グローバルで空の配列を初期化
if (!window.croppedImages) {
  window.croppedImages = [];
}

// 削除ボタンとトリミングボタンの追加
function addButtons(container) {
  if (!container.querySelector('.delete-btn')) {
    let deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = '';
    deleteButton.onclick = function () {
      container.innerHTML = '';
      container.classList.remove('selected');
      container.style.backgroundColor = 'transparent';
      hideButtons();

      // 画像が削除されたら枠線を復元の処理追加
      container.style.border = '2px dashed #ccc';
    };
    container.appendChild(deleteButton);
  }

  if (!container.querySelector('.crop-btn')) {
    let cropButton = document.createElement('button');
    cropButton.classList.add('crop-btn');
    cropButton.textContent = '';
    cropButton.onclick = function (event) {
      event.stopPropagation();
      const dropAreaId = container.id;
      const viewportSize = dropAreaSettings[dropAreaId];
      if (viewportSize) {
        openCroppieModal(container, viewportSize.width, viewportSize.height);
      }
    };
    container.appendChild(cropButton);
  }
}

// // ボタンを表示
function showButtons(container) {
  container.querySelectorAll('.delete-btn, .crop-btn').forEach((button) => (button.style.display = 'flex'));

  // 枠線を追加（選択されたとき）
  container.style.border = '2px dashed #ccc';
}

// ボタンを非表示
function hideButtons() {
  document.querySelectorAll('.delete-btn, .crop-btn').forEach((button) => (button.style.display = 'none'));

  // 選択されていない全ての画像コンテナの枠線をデフォルトに戻す
  document.querySelectorAll('.empty').forEach(function (container) {
    if (!container.querySelector('img')) {
      container.style.border = '2px dashed #ccc'; // デフォルトの枠線
    } else {
      container.style.border = 'none'; // 枠線なし
    }
  });
}

// トリミングモーダル処理
let croppieInstance;

function openCroppieModal(container, viewportWidth, viewportHeight) {
  const croppieModal = document.getElementById('croppieModal');
  const croppieContainer = document.getElementById('croppie-container');
  croppieModal.style.display = 'block';

  // Croppieの設定
  if (window.croppieInstance) {
    window.croppieInstance.destroy();
  }

  window.croppieInstance = new Croppie(croppieContainer, {
    viewport: { width: viewportWidth, height: viewportHeight },
    boundary: { width: 300, height: 300 },
    showZoomer: true,
    enableResize: false,
  });

  const img = container.querySelector('img');
  window.croppieInstance.bind({
    url: img.src,
  });

  // トリミングボタン
  document.getElementById('crop-button').onclick = function () {
    window.croppieInstance
      .result({
        type: 'canvas',
        size: 'original',
        format: 'png',
        quality: 1,
      })
      .then(function (croppedImageData) {
        if (!container) {
          console.error('選択されたドロップエリアが見つかりません。');
          alert('画像をトリミングするドロップエリアを選択してください。');
          return; // 処理を中止
        }

        const dropAreaId = container.id;

        window.croppedImages[dropAreaId] = croppedImageData; // ドロップエリアごとに画像を保存
        container.querySelector('img').src = croppedImageData;
        croppieModal.style.display = 'none';
      });
  };
}

// ドロップエリアごとに設定されたviewportサイズを定義
const dropAreaSettings = {
  'dropArea24-1': { width: 255, height: 230 },
  'dropArea24-2': { width: 255, height: 230 },
  'dropArea24-3': { width: 290, height: 170 },
  dropArea22: { width: 170, height: 210 },
  dropArea20: { width: 215, height: 220 },
  dropArea18: { width: 210, height: 240 },
  dropArea16: { width: 230, height: 210 },
  dropArea14: { width: 270, height: 210 },
  dropArea13: { width: 270, height: 250 },

  'dropArea12-3': { width: 255, height: 230 },
  'dropArea12-2': { width: 255, height: 230 },
  'dropArea12-1': { width: 290, height: 170 },

  dropArea1_t2: { width: 260, height: 250 },
  dropArea2_t2: { width: 250, height: 300 },
  'dropArea4-1_t2': { width: 270, height: 250 },
  'dropArea4-2_t2': { width: 270, height: 250 },
  'dropArea4-3_t2': { width: 270, height: 250 },
  'dropAreaB4-1_t2': { width: 270, height: 250 },
  'dropAreaB4-2_t2': { width: 270, height: 250 },
  'dropAreaB4-3_t2': { width: 270, height: 250 },
  dropArea6_t2: { width: 250, height: 270 },
  'dropArea8-1_t2': { width: 270, height: 250 },
  'dropArea8-2_t2': { width: 270, height: 250 },
  dropArea10_t2: { width: 250, height: 270 },
  dropAreaB12_t2: { width: 260, height: 260 },
  dropArea12_t2: { width: 260, height: 260 },

  dropArea15_t3: { width: 250, height: 260 },
  dropArea14_t3: { width: 300, height: 250 },
  dropArea12_t3: { width: 240, height: 280 },
  dropArea6_t3: { width: 240, height: 280 },
  dropArea4_t3: { width: 240, height: 280 },
  dropArea2_t3: { width: 250, height: 300 },
  dropArea1_t3: { width: 270, height: 250 },

  dropArea1_t4: { width: 270, height: 250 },
  dropArea2_t4: { width: 270, height: 250 },
  dropArea4_t4: { width: 270, height: 250 },
  dropArea6_t4: { width: 270, height: 250 },
  dropArea8_t4: { width: 270, height: 250 },
  dropArea10_t4: { width: 270, height: 250 },
  dropArea12_t4: { width: 270, height: 250 },
  dropArea16_t4: { width: 270, height: 250 },
  dropArea16_t4B: { width: 270, height: 250 },
};

// 各ドロップエリアにクリックイベントを設定
document.querySelectorAll('.empty').forEach((dropArea) => {
  dropArea.addEventListener('click', (event) => {
    event.stopPropagation();
  });
});

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

// function getCroppieImg() {
//   if (window.croppieInstance) {
//     window.croppieInstance.result({
//       type: 'blob', // 画像データをBlob形式で取得
//       format: 'png',
//       size: 'viewport', // 表示サイズで取得
//     })
//       .then((croppedImage) => {
//         // 取得したトリミング画像をrawDataとしてwindowに格納
//         window.rawData = croppedImage; // ここで画像データをwindow.rawDataに格納
//         console.log('トリミング後の画像:', window.rawData);
//       })
//       .catch(error => {
//         console.error('エラー:', error);
//       });
//   } else {
//     console.log('Croppieのインスタンスが見つかりません。');
//   }
// }

document.addEventListener('DOMContentLoaded', function () {
  const dropAreas = document.querySelectorAll('.empty');
  // dropAreas.forEach(function (dropArea) {
  //   dropArea.ondragover = handleDragOver;
  //   dropArea.ondragleave = handleDragLeave;
  //   dropArea.ondrop = handleDrop;
  //   dropArea.ontouchend = handleTouchDrop;
  // });

  // キャンセルボタンのクリックイベントを追加
  document.getElementById('cancel-button').onclick = function () {
    document.getElementById('croppieModal').style.display = 'none';
  };

  // ボタンを非表示にするクリックイベントの設定
  document.addEventListener('click', function (event) {
    // ドロップエリア外をクリックした場合のみ実行
    const clickedInsideDropArea = event.target.closest('.empty');
    const isDrawer = event.target.closest('#drawer');
    const isSideBtn = event.target.closest('#sideBtn');

    if (!clickedInsideDropArea && !isDrawer && !isSideBtn) {
      hideButtons();
    }
  });
});

// 枠変更
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
      // サイズをすべてリセット
      activeDropArea.classList.remove('square', 'rectangle34', 'rectangle43', 'mini');
      // ボタンの data-size 属性に基づいてサイズを変更
      const size = button.getAttribute('data-size');
      activeDropArea.classList.add(size);
    }
  };
  resizeButtons.forEach((button) => {
    button.addEventListener('pointerdown', () => handleResizeButtonInteraction(button));
  });
});

// テキストエリアのサイズを内容に合わせて調整する関数
document.addEventListener('DOMContentLoaded', function () {
  // 指定したクラスのテキストエリアを全て取得し、初期化
  document.querySelectorAll('.text-empty').forEach((textarea) => {
    setupDynamicTextarea(textarea);
  });

  // ウィンドウリサイズ時に全テキストエリアのサイズを再調整
  window.addEventListener('resize', function () {
    document.querySelectorAll('.text-empty').forEach((textarea) => {
      adjustTextareaSize(textarea); // リサイズ時にサイズ再調整
    });
  });
});

function adjustTextareaSize(textarea) {
  if (!textarea) return; // テキストエリアが存在しない場合は処理を中断

  // 横幅を内容に応じて調整
  textarea.style.width = 'auto'; // 初期幅にリセット
  textarea.style.width = `${textarea.scrollWidth}px`; // 内容に合わせた幅に調整

  // 高さを内容に応じて調整
  if (textarea.value.trim() === '') {
    textarea.style.height = 'auto'; // 空の時は高さをリセット
    textarea.style.height = '40px'; // 初期の最小高さ（調整可能）
  } else {
    textarea.style.height = 'auto'; // 一旦リセット
    textarea.style.height = `${textarea.scrollHeight}px`; // 内容に合わせて高さを再設定
  }
}

// テキストエリアのイベントリスナーを設定し、サイズを動的に調整
function setupDynamicTextarea(textarea) {
  if (!textarea) return;

  // 入力イベントに応じてサイズを調整
  textarea.addEventListener('input', function () {
    adjustTextareaSize(this);
  });

  // 初期表示時にサイズ調整
  setTimeout(() => adjustTextareaSize(textarea), 0); // 少し遅延させて調整
}

// テキストエリア枠の削除
document.addEventListener('DOMContentLoaded', function () {
  const textEmptys = document.querySelectorAll('.text-empty');
  function updateBorders() {
    textEmptys.forEach((textEmpty) => {
      if (textEmpty.value.trim() === '') {
        textEmpty.classList.remove('no-border');
      } else {
        textEmpty.classList.add('no-border');
      }
    });
  }
  textEmptys.forEach((textEmpty) => {
    textEmpty.addEventListener('input', updateBorders);
  });
  updateBorders();
});

// マイページへボタンを押されたとき
// 保存状態を取得
let initialData = {}; // テキストエリアの初期値を保存するオブジェクト
let isSaved = true; // データが保存済みかどうかを示すフラグ

// ページ読み込み時にデータを保存(初期データ)
document.addEventListener('DOMContentLoaded', function () {
  const textAreas = document.querySelectorAll('textarea');
  textAreas.forEach((textarea) => {
    initialData[textarea.id] = textarea.value;
    console.log('データを保存しました');
  });
});

// テキストエリアに変更があれば未保存のフラグを設定
document.querySelectorAll('textarea').forEach((textarea) => {
  textarea.addEventListener('input', () => {
    isSaved = checkSave();
  });
});

// 初期データと比較して変更されているか確認する関数
function checkSave() {
  const textAreas = document.querySelectorAll('textarea');
  return Array.from(textAreas).every((textarea) => {
    return textarea.value === initialData[textarea.id];
  });
}

// 保存ボタンをクリック時に保存状態を更新
const saveBtn = document.getElementById('sendButton');
if (saveBtn) {
  saveBtn.addEventListener('click', function () {
    isSaved = true;
    const textAreas = document.querySelectorAll('textarea');
    textAreas.forEach((textarea) => {
      initialData[textarea.id] = textarea.value;
    });
    console.log('保存内容が保存されました');
  });
} else {
  console.warn('Save button with ID "saveButton" not found.');
}

// ページを離れるときに保存されていない場合は警告を表示 (beforeunloadイベント)
window.addEventListener('beforeunload', function (event) {
  if (!isSaved) {
    event.returnValue = '内容が保存されていません＞＜'; // ブラウザがデフォルトの警告メッセージを表示
  }
});

// visibilitychangeイベントでタブを切り替えたときにも警告を表示
// document.addEventListener('visibilitychange', function () {
//   if (document.visibilityState === 'hidden' && !isSaved) {
//     alert('未保存の内容があります。ページを離れる前に保存してください。');
//   }
// });

// //マイページへボタンを押されたとき
// // 保存状態を取得
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
