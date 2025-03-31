const swiper = new Swiper('.swiper', {
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  zoom: true,
  touchStartPreventDefault: false,
  passiveListeners: true,
  slidesPerView: 1, // 常に1枚のスライドを表示
  slidesPerGroup: 1, // 常に1スライドずつ移動
});
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

// ページを離れるときに保存されていない場合は警告を表示
window.addEventListener('beforeunload', function (event) {
  if (!isSaved) {
    event.returnValue = '内容が保存されていません＞＜'; // ブラウザがデフォルトの警告メッセージを表示
  }
});

// メインのスライドからプレビュー
document.addEventListener('DOMContentLoaded', function () {
  // プレビューボタンにクリックイベントリスナーを追加
  document.querySelector('.btn-preview').addEventListener('click', function () {
    // 現在のスライドインデックスを取得
    const currentSlideIndex = swiper.realIndex;

    // プレビューページのURLを動的に設定
    const previewUrl = `../coverB-preview/index.html?slide=${currentSlideIndex + 1}`;

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

//  ドロワー
let currentContentId = null;
let activeButton = null;

const toggleDrawer = () => {
  const drawer = document.getElementById('drawer');
  const content = document.getElementById('content');
  const sidebar = document.getElementById('sidebar');

  drawer.classList.toggle('open');
  sidebar.classList.toggle('open');
  content.classList.toggle('open');

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
//画像挿入
document.addEventListener('DOMContentLoaded', () => {
  const dropAreas = document.querySelectorAll('.empty'); // .emptyクラスの要素を全て取得
  const fileInput = document.getElementById('fileInput');

  dropAreas.forEach((dropArea) => {
    // 画像エリアをクリックしたときの処理
    dropArea.addEventListener('click', (event) => {
      event.stopPropagation(); // 他のクリックイベントを防ぐ

      // 画像がすでにある場合はボタンを表示し、fileInput は開かない
      if (dropArea.querySelector('img')) {
        removeSelectedState();
        dropArea.classList.add('selected'); // 選択状態を追加
        showButtons(dropArea);
      } else {
        // 画像がない場合は fileInput を開く
        fileInput.dataset.target = dropArea.id;
        fileInput.click();
      }
    });
  });

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const targetId = fileInput.dataset.target;
        const targetDropArea = document.getElementById(targetId);

        if (targetDropArea) {
          targetDropArea.innerHTML = `<img src="${e.target.result}" alt="Selected Image">`;
          targetDropArea.style.border = 'none';

          removeSelectedState();
          targetDropArea.classList.add('selected'); // 画像が入ったエリアを選択状態にする
          showButtons(targetDropArea);
          addButtons(targetDropArea);
        } else {
          console.error(`ターゲットエリアが見つかりません: ${targetId}`);
        }
      };
      reader.readAsDataURL(file);
    }
  });

  // 他のエリアをクリックしたらボタンを非表示にする
  document.addEventListener('click', () => {
    removeSelectedState();
  });
});

// 他の選択状態を解除する関数
function removeSelectedState() {
  document.querySelectorAll('.empty.selected').forEach((el) => {
    el.classList.remove('selected');
    hideButtons(el);
  });
}

// // 画像のアップロードと挿入
// let selectedImage = null;

// // ページ読み込み時の初期化
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
//     files.forEach(file => {
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
//       img.style.left = (initialX + dx) + 'px';
//       img.style.top = (initialY + dy) + 'px';
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
//       img.style.left = (initialX + dx) + 'px';
//       img.style.top = (initialY + dy) + 'px';
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
//     allImgs.forEach(image => {
//       image.classList.remove('selected');
//     });
//     img.classList.add('selected');
//     selectedImage = img;
//   });

//   img.addEventListener('touchstart', function (e) {
//     e.preventDefault();
//     const allImgs = document.querySelectorAll('#imgPreviewField img');
//     allImgs.forEach(image => {
//       image.classList.remove('selected');
//     });
//     img.classList.add('selected');
//     selectedImage = img;
//   });
// }

// function addTouchListenerToDropAreas() {
//   const dropAreas = document.querySelectorAll('.empty');
//   dropAreas.forEach(dropArea => {
//     dropArea.addEventListener('touchstart', function (e) {
//       e.preventDefault();
//       if (selectedImage) {
//         console.log('Selected image:', selectedImage);
//         insertImageToDropArea(this);
//       }
//     });

//     dropArea.addEventListener('click', function (e) {
//       e.preventDefault();
//       if (selectedImage) {
//         console.log('Selected image:', selectedImage);
//         insertImageToDropArea(this);
//       } else {
//         // 画像以外のクリックの場合はボタンを非表示
//         document.querySelectorAll('.empty.with-buttons').forEach(area => {
//           area.classList.add('hide-buttons');
//           area.style.border = 'none'; // ボーダーを消す
//         });
//       }
//       // クリックされたドロップエリアのボタンを表示する
//       this.classList.remove('hide-buttons');
//       this.style.border = ''; // ボーダーを元に戻す
//     });
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
//   deleteButton.addEventListener('click', function (e) {
//     e.stopPropagation();
//     dropArea.innerHTML = '';
//   });

//   const cropButton = document.createElement('button');
//   cropButton.classList.add('crop-button');
//   cropButton.addEventListener('click', function (e) {
//     e.stopPropagation();
//     openCroppieModal(dropArea);
//   });

//   dropArea.appendChild(newImage);
//   dropArea.appendChild(deleteButton);
//   dropArea.appendChild(cropButton);
//   dropArea.classList.add('with-buttons');

//   selectedImage.classList.remove('selected');
//   selectedImage = null;
// }

// // ドキュメント内でクリックしたときの処理
// document.addEventListener('click', function (e) {
//   const allDropAreas = document.querySelectorAll('.empty.with-buttons');
//   if (!e.target.closest('.empty.with-buttons')) {
//     allDropAreas.forEach(dropArea => {
//       dropArea.classList.add('hide-buttons');
//       dropArea.style.border = 'none'; // ボーダーを消す
//     });
//   }
// });

// function openCroppieModal(dropArea) {
//   // Croppieモーダルの表示処理
//   console.log('Croppie modal open for drop area:', dropArea);
// }

// // ドラッグオーバー時の処理
// function handleDragOver(event) {
//   event.preventDefault();
//   this.style.backgroundColor = "#d0f0c0"; // ドラッグ中の背景色変更
// }

// // ドラッグが離れたときの処理
// function handleDragLeave(event) {
//   this.style.backgroundColor = "transparent"; // ドラッグが離れたときの背景色リセット
// }

// // 画像をロードする（IndexedDBを削除したため空の関数に）
// // function loadAllImages() { }

// // ドロップ時の処理
// function handleDrop(event) {
//   event.preventDefault();
//   this.style.backgroundColor = "transparent";

//   const files = event.dataTransfer.files;
//   if (files.length > 0) {
//     let file = files[0];
//     let fileReader = new FileReader();
//     fileReader.onload = function (e) {
//       this.innerHTML = ""; // 既存の内容をクリア
//       let img = new Image();
//       img.src = e.target.result; // 画像データURLを設定
//       img.classList.add("draggable-image"); // 画像にクラスを追加
//       img.onclick = function () {
//         showButtons(this.parentNode); // 画像がクリックされたときにボタンを表示
//       };
//       this.appendChild(img);
//       addButtons(this); // 削除ボタンとトリミングボタンを追加
//       // 画像が挿入されたら枠線をなくす処理追加
//       this.style.border = 'none';
//     }.bind(this);
//     fileReader.readAsDataURL(file); // ドロップされたファイルをデータURLに変換
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
//       };
//       fileReader.readAsDataURL(file);
//     }
//   }
// }

// 削除ボタンとトリミングボタンの追加
function addButtons(container) {
  if (!container.querySelector('.delete-btn')) {
    let deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = ''; // ボタンのテキストを設定
    deleteButton.onclick = function () {
      container.innerHTML = ''; // 画像を削除
      container.classList.remove('selected'); // 選択状態を解除
      container.style.backgroundColor = 'transparent'; // 背景色をリセット
      hideButtons(); // ボタンを非表示にする

      container.style.border = '2px dashed #ccc';
    };
    container.appendChild(deleteButton);
  }

  if (!container.querySelector('.crop-btn')) {
    let cropButton = document.createElement('button');
    cropButton.classList.add('crop-btn');
    cropButton.textContent = ''; // ボタンのテキストを設定
    cropButton.onclick = function (event) {
      event.stopPropagation(); // クリックイベントのバブリングを防ぐ
      openCroppieModal(container); // トリミングモーダルを開く関数
    };
    container.appendChild(cropButton);
  }
}

// ボタンを表示する関数
function showButtons(container) {
  container.querySelectorAll('.delete-btn, .crop-btn').forEach((button) => (button.style.display = 'flex'));
  container.style.border = '2px dashed #ccc';
}

// ボタンを非表示にする関数
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

function openCroppieModal(container) {
  const croppieModal = document.getElementById('croppieModal');
  const croppieContainer = document.getElementById('croppie-container');
  croppieModal.style.display = 'block';

  if (croppieInstance) {
    croppieInstance.destroy();
  }

  croppieInstance = new Croppie(croppieContainer, {
    viewport: { width: 200, height: 200 },
    boundary: { width: 300, height: 300 },
    showZoomer: true,
    enableResize: false,
    // enableZoom: true,
  });

  const img = container.querySelector('img');
  croppieInstance.bind({
    url: img.src,
  });

  document.getElementById('crop-button').onclick = function () {
    croppieInstance
      .result({
        type: 'canvas',
        size: 'original',
        format: 'png',
        quality: 1,
      })
      .then(function (croppedImageData) {
        container.querySelector('img').src = croppedImageData;
        croppieModal.style.display = 'none';
      });
  };
}

// 初期化処理
document.addEventListener('DOMContentLoaded', function () {
  const dropAreas = document.querySelectorAll('.empty');
  dropAreas.forEach(function (dropArea) {
    // dropArea.ondragover = handleDragOver;
    // dropArea.ondragleave = handleDragLeave;
    // dropArea.ondrop = handleDrop;
    // dropArea.ontouchend = handleTouchDrop;
  });

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

// テキストエリアの内容の保存と高さと幅を自動調整
function saveText() {
  document.querySelectorAll('.text-empty').forEach((textArea) => {
    const id = textArea.id;
  });
}

// テキストエリアの高さを調整する関数
function adjustHeight(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
}

// テキストエリアの幅を調整する関数
function adjustTextareaWidth(textarea) {
  textarea.style.width = 'auto';
  const scrollWidth = textarea.scrollWidth;
  textarea.style.width = `${scrollWidth}px`;
}

// 最大文字数の制限を外し、イベントリスナーを追加する関数
function enforceNoMaxLength(textarea) {
  textarea.addEventListener('input', function () {
    adjustHeight(this);
    adjustTextareaWidth(this);
  });

  adjustHeight(textarea);
  adjustTextareaWidth(textarea);
}

// ドキュメント読み込み時の処理
document.addEventListener('DOMContentLoaded', function () {
  // テキストエリアごとに必要な処理を実行
  document.querySelectorAll('.text-empty').forEach((textarea) => {
    enforceNoMaxLength(textarea);
  });

  // ロード後に高さ調整を行う
  setTimeout(() => {
    document.querySelectorAll('.text-empty').forEach((textarea) => adjustHeight(textarea));
  }, 100);
});

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

//-------------------------追加-----------------------------
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
      fontSize = '0.5rem';
      lineHeight = 1.6;
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
//------------------------ここまで----------------------------

// 枠変更 12-~3変更できない版
document.addEventListener('DOMContentLoaded', () => {
  const dropAreas = [];
  const resizeButtons = document.querySelectorAll('.resizeButton');
  let activeDropArea = null;

  document.querySelectorAll('[id^="dropArea"]').forEach((dropArea) => {
    dropAreas.push(dropArea);
    dropArea.addEventListener('pointerdown', () => handleDropAreaInteraction(dropArea));
  });

  const handleDropAreaInteraction = (dropArea) => {
    dropAreas.forEach((area) => area.classList.remove('active'));
    dropArea.classList.add('active');
    activeDropArea = dropArea;
  };

  const handleResizeButtonInteraction = (button) => {
    if (activeDropArea) {
      const restrictedDropAreas = ['dropArea12-1', 'dropArea12-2', 'dropArea12-3'];

      if (!restrictedDropAreas.includes(activeDropArea.id)) {
        activeDropArea.classList.remove('square', 'rectangle', 'mini');
        const size = button.getAttribute('data-size');
        activeDropArea.classList.add(size);
      }
    }
  };

  resizeButtons.forEach((button) => {
    button.addEventListener('pointerdown', () => handleResizeButtonInteraction(button));
  });
});

// 背景色とテキストの色の変更
function changeColor(color) {
  let elements = document.getElementsByClassName('uniqueColorB');
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.backgroundColor = color;
  }

  let textElements = document.getElementsByClassName('text-colorB');
  for (let i = 0; i < textElements.length; i++) {
    textElements[i].style.color = color;
  }
}

// --------------------------------API連携-------------------------------------------
// 保存ボタン押下時の処理
document.getElementById('sendButton').addEventListener('click', handleSaveOrSend);
document.getElementById('saveBtn').addEventListener('click', handleSaveOrSend);

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

  // URLからユーザー種別を判別
  const isAdmin = window.location.href.includes('/?admin'); // URLに`/admin`が含まれる場合、管理者と判定

  let albumId;

  if (isAdmin) {
    // 管理者の場合：ローカルストレージからアルバムIDを取得
    albumId = localStorage.getItem('albumId');

    console.log('管理者アルバムID: ', albumId);
    if (!albumId) {
      console.error('管理者用アルバムIDがローカルストレージに保存されていません。');
      alert('管理者用アルバムIDが見つかりません。');
      return;
    }

    // 保存処理を実行
    saveAlbumData(albumId, token);
  } else {
    // 一般ユーザーの場合：APIからアルバムIDを取得
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
        console.log('一般ユーザーアルバムID: ', albumId);
        // 保存処理を実行
        saveAlbumData(albumId, token);
      })
      .catch((error) => {
        console.error('エラーが発生しました:', error.message);
        alert('エラーが発生しました。再度お試しください。');
      });
  }
}

function saveAlbumData(albumId, token) {
  const parentElement = document.querySelector('.input-drop');
  const swiperSlides = document.querySelectorAll('.swiper-slide'); // Swiperの各スライドを取得

  // 背景色とテキスト色の取得
  const backgroundColor = document.querySelector('.uniqueColorB')?.style.backgroundColor || '#ffffff';
  const textColor = document.querySelector('.text-colorB')?.style.color || '#000000';

  //背表紙のテキストエリア
  const textAreaCover = document.querySelector('.textArea-cover');
  const covertext = textAreaCover
    ? {
        id: textAreaCover.id,
        text: textAreaCover.value.trim() || '',
      }
    : null;

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

    const dropAreas = document.querySelectorAll('#dropAreaB');
    const imageData = Array.from(dropAreas).map((dropAreaB) => {
      // const croppedImage = window.croppedImages[dropAreaB.id] || null; // ドロップエリアごとの画像データを取得
      const imgElement = dropAreaB.querySelector('img');
      const originalImage = imgElement ? imgElement.src : null;

      const imageToSend = originalImage;

      const { top, left, width, height } = dropAreaB.getBoundingClientRect();
      return {
        id: dropAreaB.id,
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
      covertext,
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
    covertext,
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

  fetch(`https://develop-back.kotobum.com/api/albums/${albumId}/cover`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: body,
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorDetails) => {
          console.error('サーバーエラー詳細:', errorDetails);
          throw new Error(`データ送信に失敗しました: ${response.status}`);
        });
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

// ページ読み込み時のアルバムデータ取得処理
document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('認証トークンが見つかりません。ログインしてください。');
    return;
  }

  // URLパラメータから管理者モードかどうかを判定
  const urlParams = new URLSearchParams(window.location.search);
  const isAdmin = urlParams.has('admin');

  let albumId, partner_id;
  let covertextFetched = false; // 表紙テキストデータ取得フラグ

  if (isAdmin) {
    // 管理者はローカルストレージからデータを取得
    albumId = localStorage.getItem('albumId');
    partner_id = localStorage.getItem('partner_id');
    console.log('管理者モード');
    console.log('アルバムID:', albumId);
    console.log('ペアのアルバムID:', partner_id || 'ソロ');
    showCaptureButton();

    // アルバムデータ取得処理
    fetchAlbumData(albumId);

    if (partner_id) {
      fetchAlbumData(partner_id);
    }
  } else {
    // 一般ユーザーはAPIを使用してアルバムIDを取得
    console.log('一般ユーザーモード');
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
        partner_id = albums.partner_id;

        console.log('取得したアルバムID:', albumId);
        console.log('ペアのアルバムID:', partner_id || 'ソロ');

        // アルバムデータ取得処理
        fetchAlbumData(albumId);

        if (partner_id) {
          fetchAlbumData(partner_id);
        }
      })
      .catch((error) => console.error('アルバムID取得エラー:', error));
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

  // アルバムデータ取得処理
  function fetchAlbumData(albumId) {
    if (!albumId) {
      console.warn('アルバムIDが無効です:', albumId);
      return;
    }

    fetch(`https://develop-back.kotobum.com/api/albums/${albumId}/showCover`, {
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
        console.log(`取得したアルバムデータ (${albumId}):`, data);
        processAlbumData(data);
      })
      .catch((error) => console.error(`アルバムデータ取得エラー (${albumId}):`, error));
  }

  function processAlbumData(data) {
    // 必要に応じてJSON文字列をパース
    const textData = Array.isArray(data.textData) ? data.textData : JSON.parse(data.textData || '[]');
    const covertext = Array.isArray(data.covertext) ? data.covertext : JSON.parse(data.covertext || '[]');
    const imageData = Array.isArray(data.imageData) ? data.imageData : JSON.parse(data.imageData || '[]');
    const colors = typeof data.colors === 'object' ? data.colors : JSON.parse(data.colors || '{}');

    console.log('テキストデータ:', textData);
    console.log('画像データ:', imageData);
    console.log('色情報:', colors);

    // 背表紙のテキストデータ修正
    if (!covertextFetched) {
      console.log('表紙テキストデータ:', covertext);
      covertextFetched = true; // 表紙テキストデータ取得済みに設定

      const textAreaCover = document.getElementById('textArea-cover');
      if (textAreaCover) {
        const item = covertext; // 必要に応じてデータ加工
        textAreaCover.value = item.text;
      } else {
        console.warn('表紙テキストエリアが見つかりません');
      }
    }

    // テキストデータの表示処理
    textData.forEach((item) => {
      const textArea = document.getElementById(item.id);
      if (textArea) {
        textArea.value = item.text;
      } else {
        console.warn(`テキストエリアが見つかりません: ID ${item.id}`);
      }
    });

    // 画像データの表示処理
    imageData.forEach((item) => {
      const dropArea = document.getElementById(item.id);
      if (dropArea && item.image) {
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = 'Image';
        dropArea.appendChild(img);
      } else {
        console.warn(`画像データが見つかりません: ID ${item.id}`);
      }
    });

    // 背景色とテキスト色の適用
    if (colors) {
      const { backgroundColor, textColor } = colors;
      document.querySelectorAll('.uniqueColorB').forEach((element) => {
        element.style.backgroundColor = backgroundColor || '#ffffff';
      });
      document.querySelectorAll('.text-colorB').forEach((element) => {
        element.style.color = textColor || '#000000';
      });
    }
  }
});
