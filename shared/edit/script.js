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

// 画像のアップロードと挿入-----------------------------------------------
let selectedImage = null;

document.addEventListener('DOMContentLoaded', function () {
  addTouchListenerToDropAreas();
  document.getElementById('saveButton').addEventListener('click', function () {
    // サーバに画像を送信する処理は削除済み
  });
});

function loadImage(input) {
  const imgPreviewField = document.getElementById('imgPreviewField');
  if (input.files) {
    const files = Array.from(input.files);
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = function (e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.style.left = '0px';
        img.style.top = '0px';

        imgPreviewField.appendChild(img);
        makeDraggable(img);
        makeTouchable(img);
      };

      reader.readAsDataURL(file);
    });
  }
}

function makeDraggable(img) {
  let isDragging = false;
  let startX, startY, initialX, initialY;

  function onMouseDown(e) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    initialX = parseFloat(img.style.left) || 0;
    initialY = parseFloat(img.style.top) || 0;
    img.style.cursor = 'grabbing';
  }

  function onMouseMove(e) {
    if (isDragging) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      img.style.left = initialX + dx + 'px';
      img.style.top = initialY + dy + 'px';
    }
  }

  function onMouseUp() {
    isDragging = false;
    img.style.cursor = 'grab';
  }

  function onTouchStart(e) {
    if (e.touches.length === 1) {
      isDragging = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      initialX = parseFloat(img.style.left) || 0;
      initialY = parseFloat(img.style.top) || 0;
    }
  }

  function onTouchMove(e) {
    if (isDragging && e.touches.length === 1) {
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;
      img.style.left = initialX + dx + 'px';
      img.style.top = initialY + dy + 'px';
    }
  }

  function onTouchEnd() {
    isDragging = false;
  }

  img.addEventListener('mousedown', onMouseDown);
  img.addEventListener('mousemove', onMouseMove);
  img.addEventListener('mouseup', onMouseUp);
  img.addEventListener('mouseleave', onMouseUp);

  img.addEventListener('touchstart', onTouchStart);
  img.addEventListener('touchmove', onTouchMove);
  img.addEventListener('touchend', onTouchEnd);
}

function makeTouchable(img) {
  img.addEventListener('click', function () {
    const allImgs = document.querySelectorAll('#imgPreviewField img');
    allImgs.forEach((image) => {
      image.classList.remove('selected');
    });
    img.classList.add('selected');
    selectedImage = img;
  });

  img.addEventListener('touchstart', function (e) {
    e.preventDefault();
    const allImgs = document.querySelectorAll('#imgPreviewField img');
    allImgs.forEach((image) => {
      image.classList.remove('selected');
    });
    img.classList.add('selected');
    selectedImage = img;
  });
}

function addTouchListenerToDropAreas() {
  const dropAreas = document.querySelectorAll('.empty');
  const drawer = document.getElementById('drawer');
  const sideBtn = document.getElementById('sideBtn');

  dropAreas.forEach((dropArea) => {
    dropArea.addEventListener('touchstart', function (e) {
      e.preventDefault();
      if (selectedImage) {
        insertImageToDropArea(this);
      } else {
        if (!e.target.closest('.empty') && !drawer.contains(e.target) && !sideBtn.contains(e.target)) {
          document.querySelectorAll('.empty.with-buttons').forEach((area) => {
            area.classList.add('hide-buttons');
            area.style.border = 'none';
          });
        }
        this.classList.remove('hide-buttons');
        this.style.border = '';
      }
    });
  });

  document.addEventListener('touchstart', function (e) {
    const allDropAreas = document.querySelectorAll('.empty.with-buttons');
    if (!e.target.closest('.empty.with-buttons') && !drawer.contains(e.target) && !sideBtn.contains(e.target)) {
      allDropAreas.forEach((dropArea) => {
        dropArea.classList.add('hide-buttons');
        dropArea.style.border = 'none';
      });
    }
  });
}

function insertImageToDropArea(dropArea) {
  if (!selectedImage) {
    console.log('No image selected');
    return;
  }

  dropArea.innerHTML = '';

  const newImage = document.createElement('img');
  newImage.src = selectedImage.src;
  newImage.style.width = '100%';
  newImage.style.height = '100%';

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.addEventListener('touchstart', function (e) {
    e.stopPropagation();
    dropArea.innerHTML = '';
  });

  const cropButton = document.createElement('button');
  cropButton.classList.add('crop-button');
  cropButton.addEventListener('touchstart', function (e) {
    e.stopPropagation();
    openCroppieModal(dropArea);
  });

  dropArea.appendChild(newImage);
  dropArea.appendChild(deleteButton);
  dropArea.appendChild(cropButton);
  dropArea.classList.add('with-buttons');

  selectedImage.classList.remove('selected');
  selectedImage = null;

  dropArea.classList.remove('hide-buttons');
}

function openCroppieModal(dropArea) {
  console.log('Croppie modal open for drop area:', dropArea);
}

// 画像のドラッグ＆ドロップ indexedDBに保存--------------------------------
function handleDragOver(event) {
  event.preventDefault();
  this.style.backgroundColor = '#d0f0c0';
}

// ドラッグが離れたときの処理
function handleDragLeave(event) {
  this.style.backgroundColor = 'transparent';
}

// ドロップ時の処理
function handleDrop(event) {
  event.preventDefault();
  this.style.backgroundColor = 'transparent';

  const files = event.dataTransfer.files;
  if (files.length > 0) {
    let file = files[0];
    let fileReader = new FileReader();
    fileReader.onload = function (e) {
      this.innerHTML = '';
      let img = new Image();
      img.src = e.target.result;
      img.classList.add('draggable-image');
      img.onclick = function () {
        showButtons(this.parentNode);
      };
      this.appendChild(img);
      addButtons(this);

      // 画像が挿入されたら枠線をなくす処理追加
      this.style.border = 'none';
    }.bind(this);
    fileReader.readAsDataURL(file);
  }
}

// タッチエンド時の処理
function handleTouchDrop(event) {
  event.preventDefault();
  const touch = event.changedTouches[0];
  const dropArea = document.elementFromPoint(touch.clientX, touch.clientY);

  if (dropArea && dropArea.classList.contains('empty')) {
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      let file = files[0];
      let fileReader = new FileReader();
      fileReader.onload = function (e) {
        dropArea.innerHTML = '';
        let img = new Image();
        img.src = e.target.result;
        dropArea.appendChild(img);
        addButtons(dropArea);

        // 画像が挿入されたら枠線をなくす処理追加
        dropArea.style.border = 'none';
      };
      fileReader.readAsDataURL(file);
    }
  }
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
      openCroppieModal(container);
    };
    container.appendChild(cropButton);
  }
}

// ボタンを表示
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

function openCroppieModal(container) {
  const croppieModal = document.getElementById('croppieModal');
  const croppieContainer = document.getElementById('croppie-container');
  croppieModal.style.display = 'block';

  // Croppieの設定
  if (croppieInstance) {
    croppieInstance.destroy();
  }

  croppieInstance = new Croppie(croppieContainer, {
    viewport: { width: 200, height: 200 },
    boundary: { width: 300, height: 300 },
    showZoomer: true,
    enableResize: false,
  });

  const img = container.querySelector('img');
  croppieInstance.bind({
    url: img.src,
  });

  // トリミングボタン
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

document.addEventListener('DOMContentLoaded', function () {
  const dropAreas = document.querySelectorAll('.empty');
  dropAreas.forEach(function (dropArea) {
    dropArea.ondragover = handleDragOver;
    dropArea.ondragleave = handleDragLeave;
    dropArea.ondrop = handleDrop;
    dropArea.ontouchend = handleTouchDrop;
  });

  // キャンセルボタンのクリックイベントを追加
  document.getElementById('cancel-button').onclick = function () {
    document.getElementById('croppieModal').style.display = 'none';
  };

  // ボタンを非表示にするクリックイベントの設定
  document.addEventListener('click', function (event) {
    const isImage = event.target.closest('.draggable-image');
    const isDrawer = event.target.closest('#drawer');
    const issideBtn = event.target.closest('#sideBtn');

    if (!isImage && !isDrawer && !issideBtn) {
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

// テキストエリアの高さを調整する関数
function adjustHeight(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
}

// テキストエリアの幅を調整する関数
function adjustWidth(textarea) {
  textarea.style.width = 'auto';
  textarea.style.width = `${textarea.scrollWidth}px`;
}

// function adjustTextareaSize(textarea) {
//   textarea.style.height = 'auto';
//   textarea.style.width = 'auto';
//   textarea.style.height = `${textarea.scrollHeight}px`;
//   textarea.style.width = `${textarea.scrollWidth}px`;
// }
// document.addEventListener('DOMContentLoaded', function () {
//   adjustTextareaSize(textArea);
// });

// 最大文字数の制限を外し、イベントリスナーを追加する関数
function enforceNoMaxLength(textarea) {
  textarea.addEventListener('input', function () {
    adjustHeight(this);
    adjustWidth(this);
  });
  adjustHeight(textarea);
  adjustWidth(textarea);
}

// ドキュメント読み込み時の処理
document.addEventListener('DOMContentLoaded', function () {
  // テキストエリアごとに必要な処理を実行
  document.querySelectorAll('.text-empty').forEach((textarea) => {
    enforceNoMaxLength(textarea);
  });

  // ロード後に高さと幅の調整を行う
  setTimeout(() => {
    document.querySelectorAll('.text-empty').forEach((textarea) => {
      adjustHeight(textarea);
      adjustWidth(textarea);
    });
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

//マイページへボタンを押されたとき
// 保存状態を取得
let initialData = {}; // テキストエリアの初期値を保存するオブジェクト
let isSaved = true; // データが保存済みかどうかを示すフラグ

// ページ読み込み時にデータを保存(初期データ)
document.addEventListener('DOMContentLoaded', function () {
  const textAreas = document.querySelectorAll('textarea');
  textAreas.forEach(textarea => {
    initialData[textarea.id] = textarea.value;
    console.log('データを保存しました')
  });
});

// テキストエリアに変更があれば未保存のフラグを設定
document.querySelectorAll('textarea').forEach(textarea => {
  textarea.addEventListener('input', () => {
    isSaved = checkSave();
  });
});

// 初期データと比較して変更されているか確認する関数
function checkSave() {
  const textAreas = document.querySelectorAll('textarea');
  return Array.from(textAreas).every(textarea => {
    return textarea.value === initialData[textarea.id];
  });
}

// 保存ボタンをクリック時に保存状態を更新
const saveBtn = document.getElementById('sendButton');
if (saveBtn) {
  saveBtn.addEventListener('click', function () {
    isSaved = true;
    const textAreas = document.querySelectorAll('textarea');
    textAreas.forEach(textarea => {
      initialData[textarea.id] = textarea.value;
    });
    console.log("保存内容が保存されました");
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
// ボタン押されたら
// モーダル表示のクラスを付与
// 保存してないけど保存しますか？
// 保存してマイページへ
// 保存せずマイページへ
// 