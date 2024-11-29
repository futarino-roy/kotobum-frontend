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


const swiper = new Swiper(".swiper", {
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 1, // 常に1枚のスライドを表示
  slidesPerGroup: 1, // 常に1スライドずつ移動
});

// メインのスライドからプレビュー
document.addEventListener("DOMContentLoaded", function () {
  // プレビューボタンにクリックイベントリスナーを追加
  document.querySelector(".btn-preview").addEventListener("click", function () {
    // 現在のスライドインデックスを取得
    const currentSlideIndex = swiper.realIndex;

    // プレビューページのURLを動的に設定
    const previewUrl = `../cover-preview/index.html?slide=${currentSlideIndex + 1
      }`;

    // プレビューページに遷移
    window.location.href = previewUrl;
  });
});

// プレビューのスライドからメイン
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const slideNumber = urlParams.get("slide");

  if (slideNumber) {
    swiper.slideTo(slideNumber - 1, 0); // スライド番号に対応するインデックスに移動
    console.log(`Returning to slide ${slideNumber} in the main page`);
  }
});

// inputボタンのデザイン
document.getElementById("frontButton").addEventListener("click", function () {
  document.getElementById("backInput").click();
});

//  ドロワー
let currentContentId = null;
let activeButton = null;

const toggleDrawer = () => {
  const drawer = document.getElementById("drawer");
  const content = document.getElementById("content");
  const sidebar = document.getElementById("sidebar");

  drawer.classList.toggle("open");
  sidebar.classList.toggle("open");
  content.classList.toggle("open");

  if (!drawer.classList.contains("open")) {
    currentContentId = null;

    if (activeButton) {
      activeButton.classList.remove("active");
      activeButton = null;
    }
  }
};

const showDrawerContent = (contentId) => {
  const drawerContent = document.getElementById("drawer-content");
  const contentElement = document.getElementById(contentId);

  const clickedButton = document.querySelector(
    `[date-content-id="${contentId}"]`
  );

  if (!contentElement) {
    console.error(`Content element with ID '${contentId}' not found.`);
    return;
  }

  if (contentId === currentContentId && drawer.classList.contains("open")) {
    toggleDrawer();
    return;
  }

  // 全てのコンテンツを非表示にする
  const allContentItems = document.querySelectorAll(
    ".edit_drawer_container_item"
  );
  allContentItems.forEach((item) => {
    item.style.display = "none";
  });

  // 選択されたコンテンツを表示する
  contentElement.style.display = "block";

  // ボタンのスタイルを更新 new
  if (activeButton) {
    activeButton.classList.remove("active"); // 以前のボタンからactiveクラスを削除
  }
  if (clickedButton) {
    clickedButton.classList.add("active"); // クリックされたボタンにactiveクラスを追加
    activeButton = clickedButton; // 現在のアクティブボタンを更新
  }

  currentContentId = contentId;

  if (!drawer.classList.contains("open")) {
    toggleDrawer(); // ドロワーが閉じている場合は開く
  }
};

// 画像のアップロードと挿入
let selectedImage = null;

document.addEventListener('DOMContentLoaded', function () {
  addTouchListenerToDropAreas();
});

function loadImage(input) {
  const imgPreviewField = document.getElementById('imgPreviewField');
  if (input.files) {
    const files = Array.from(input.files);
    files.forEach(file => {
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
      img.style.left = (initialX + dx) + 'px';
      img.style.top = (initialY + dy) + 'px';
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
      img.style.left = (initialX + dx) + 'px';
      img.style.top = (initialY + dy) + 'px';
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
    allImgs.forEach(image => {
      image.classList.remove('selected');
    });
    img.classList.add('selected');
    selectedImage = img;
  });

  img.addEventListener('touchstart', function (e) {
    e.preventDefault();
    const allImgs = document.querySelectorAll('#imgPreviewField img');
    allImgs.forEach(image => {
      image.classList.remove('selected');
    });
    img.classList.add('selected');
    selectedImage = img;
  });
}

function addTouchListenerToDropAreas() {
  const dropAreas = document.querySelectorAll('.empty');
  dropAreas.forEach(dropArea => {
    dropArea.addEventListener('touchstart', function (e) {
      e.preventDefault();
      if (selectedImage) {
        console.log('Selected image:', selectedImage);
        insertImageToDropArea(this);
      }
    });

    dropArea.addEventListener('click', function (e) {
      e.preventDefault();
      if (selectedImage) {
        console.log('Selected image:', selectedImage);
        insertImageToDropArea(this);
      } else {
        // 画像以外のクリックの場合はボタンとボーダーを非表示
        document.querySelectorAll('.empty.with-buttons').forEach(area => {
          area.classList.add('hide-buttons');
          area.style.border = 'none'; // ボーダーを消す
        });
      }
      // クリックされたドロップエリアのボタンを表示する
      this.classList.remove('hide-buttons');
      this.style.border = ''; // ボーダーを元に戻す
    });
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
  deleteButton.addEventListener('click', function (e) {
    e.stopPropagation();
    dropArea.innerHTML = '';
  });

  const cropButton = document.createElement('button');
  cropButton.classList.add('crop-button');
  cropButton.addEventListener('click', function (e) {
    e.stopPropagation();
    openCroppieModal(dropArea);
  });

  dropArea.appendChild(newImage);
  dropArea.appendChild(deleteButton);
  dropArea.appendChild(cropButton);
  dropArea.classList.add('with-buttons');

  selectedImage.classList.remove('selected');
  selectedImage = null;

  // ボタンを表示するためのクラスを削除
  dropArea.classList.remove('hide-buttons');
}

// ドキュメント内でクリックしたときの処理
document.addEventListener('click', function (e) {
  const allDropAreas = document.querySelectorAll('.empty.with-buttons');
  if (!e.target.closest('.empty.with-buttons')) {
    allDropAreas.forEach(dropArea => {
      dropArea.classList.add('hide-buttons');
      dropArea.style.border = 'none'; // ボーダーを消す
    });
  }
});

// Croppieモーダルの表示処理
function openCroppieModal(dropArea) {
  console.log('Croppie modal open for drop area:', dropArea);
}



// 画像のドラッグ＆ドロップ処理
// ドラッグオーバー時の処理
function handleDragOver(event) {
  event.preventDefault();
  this.style.backgroundColor = "#d0f0c0"; // ドラッグ中の背景色変更
}

// ドラッグが離れたときの処理
function handleDragLeave(event) {
  this.style.backgroundColor = "transparent"; // ドラッグが離れたときの背景色リセット
}

// ドロップ時の処理
function handleDrop(event) {
  event.preventDefault();
  this.style.backgroundColor = "transparent";

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
  // 削除ボタンが既に存在するか確認
  if (!container.querySelector(".delete-btn")) {
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = ""; // ボタンのテキストを設定
    deleteButton.onclick = function () {
      container.innerHTML = ""; // 画像を削除
      container.classList.remove("selected"); // 選択状態を解除
      container.style.backgroundColor = "transparent"; // 背景色をリセット
      hideButtons(); // ボタンを非表示にする

      // ここでIndexedDBから削除処理を削除しました
      // IndexedDBから画像データを削除
    };
    container.appendChild(deleteButton);
  }

  // トリミングボタンが既に存在するか確認
  if (!container.querySelector(".crop-btn")) {
    let cropButton = document.createElement("button");
    cropButton.classList.add("crop-btn");
    cropButton.textContent = ""; // ボタンのテキストを設定
    cropButton.onclick = function (event) {
      event.stopPropagation(); // クリックイベントのバブリングを防ぐ
      openCroppieModal(container); // トリミングモーダルを開く関数
    };
    container.appendChild(cropButton);
  }
}

// ボタンを表示する関数
function showButtons(container) {
  container
    .querySelectorAll(".delete-btn, .crop-btn")
    .forEach((button) => (button.style.display = "flex"));

  // 枠線を追加（選択されたとき）
  container.style.border = '2px dashed #ccc';
}

// ボタンを非表示にする関数
function hideButtons() {
  document
    .querySelectorAll(".delete-btn, .crop-btn")
    .forEach((button) => (button.style.display = "none"));

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
let croppieInstance; // Croppie インスタンスを保持

function openCroppieModal(container) {
  const croppieModal = document.getElementById("croppieModal");
  const croppieContainer = document.getElementById("croppie-container");
  croppieModal.style.display = "block";

  // Croppieの設定
  if (croppieInstance) {
    croppieInstance.destroy(); // 既存のインスタンスを破棄
  }

  croppieInstance = new Croppie(croppieContainer, {
    viewport: { width: 200, height: 200 },
    boundary: { width: 300, height: 300 },
    showZoomer: true,
    enableResize: false,
  });

  const img = container.querySelector("img");
  croppieInstance.bind({
    url: img.src,
  });

  // トリミングボタンのイベント
  document.getElementById("crop-button").onclick = function () {
    croppieInstance
      .result({
        type: "canvas",
        size: "original",
        format: "png",
        quality: 1,
      })
      .then(function (croppedImageData) {
        container.querySelector("img").src = croppedImageData;
        // トリミング後の画像を保存する処理を削除しました
        croppieModal.style.display = "none"; // モーダルを閉じる
      });
  };
}

// 初期化処理
document.addEventListener("DOMContentLoaded", function () {
  const dropAreas = document.querySelectorAll(".empty");
  dropAreas.forEach(function (dropArea) {
    dropArea.ondragover = handleDragOver;
    dropArea.ondragleave = handleDragLeave;
    dropArea.ondrop = handleDrop;
    dropArea.ontouchend = handleTouchDrop;
  });

  // キャンセルボタンのクリックイベントを追加
  document.getElementById("cancel-button").onclick = function () {
    document.getElementById("croppieModal").style.display = "none"; // モーダルを閉じる
  };

  // ボタンを非表示にするクリックイベントの設定
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".delete-btn, .crop-btn, .draggable-image")) {
      hideButtons(); // 画像外のクリックでボタンを非表示
    }
  });
});


// テキストエリアの内容をローカルストレージに保存する処理を削除

// テキストエリアの内容をローカルストレージから読み込む関数を削除

const defaultWidth = "13.5%"; // CSSで指定した幅
const defaultHeight = "4.5%"; // CSSで指定した高さ

// テキストエリアの高さを調整する関数
function adjustHeight(textarea) {
  if (textarea.value.trim() === '') {
    // テキストが空の場合、デフォルトのCSSサイズに戻す
    textarea.style.width = defaultWidth;
    textarea.style.height = defaultHeight;
  } else {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
}

// テキストエリアの幅を調整する関数
function adjustTextareaWidth(textarea) {
  if (textarea.value.trim() === '') {
    // テキストが空の場合、デフォルトのCSSサイズに戻す
    textarea.style.width = defaultWidth;
    textarea.style.height = defaultHeight;
  } else {
    textarea.style.width = "auto";
    const scrollWidth = textarea.scrollWidth;
    textarea.style.width = `${scrollWidth}px`;
  }
}

// 最大文字数の制限を外し、イベントリスナーを追加する関数
function enforceNoMaxLength(textarea) {
  textarea.addEventListener("input", function () {
    adjustHeight(this);
    adjustTextareaWidth(this);
  });

  adjustHeight(textarea);
  adjustTextareaWidth(textarea);
}

// ドキュメント読み込み時の処理
document.addEventListener("DOMContentLoaded", function () {
  // ローカルストレージからの読み込み処理を削除

  // テキストエリアごとに必要な処理を実行
  document.querySelectorAll(".text-empty").forEach((textarea) => {
    enforceNoMaxLength(textarea);
  });

  // ロード後に高さ調整を行う
  setTimeout(() => {
    document
      .querySelectorAll(".text-empty")
      .forEach((textarea) => adjustHeight(textarea));
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
document.addEventListener('DOMContentLoaded', function () {
  const textAreas = document.querySelectorAll('.text-size');

  function adjustLineHeight(textArea) {
    // テキストエリアの高さを取得
    const textAreaHeight = textArea.clientHeight;

    // フォントサイズを取得 (必要に応じて固定)
    const fontSize = parseFloat(window.getComputedStyle(textArea).fontSize);

    // line-height をテキストエリアの高さに応じて計算
    const lineHeight = textAreaHeight / fontSize;

    // line-height を設定
    textArea.style.lineHeight = lineHeight;
  }

  function adjustLineHeightForAll() {
    textAreas.forEach(textArea => {
      adjustLineHeight(textArea); // 各テキストエリアのline-heightを調整
    });
  }

  // 初期ロード時にline-heightを設定
  window.addEventListener('load', adjustLineHeightForAll);

  // テキストエリアに入力があったときにline-heightを調整
  textAreas.forEach(textArea => {
    textArea.addEventListener('input', function () {
      this.style.height = ''; // 高さの自動調整を無効化
      adjustLineHeight(this); // line-heightを調整
    });

    // エンターキーを押したときにline-heightを更新
    textArea.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        // エンターキーが押されたときにline-heightを更新
        adjustLineHeight(this);
      }
    });
  });

  // ウィンドウサイズがリサイズされた場合にline-heightを再設定
  window.addEventListener('resize', adjustLineHeightForAll);

  // 1remが何pxかを計算する関数
  function remToPx(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

  textAreas.forEach(textArea => {
    // フォントサイズの最大と最小を rem で指定
    const maxFontSizeRem = 0.9; // 1.5rem (例として最大フォントサイズ)
    const minFontSizeRem = 0.5; // 0.75rem (最小フォントサイズ)

    // テキスト量に応じてフォントサイズを調整
    function adjustFontSize() {
      let fontSizeRem = maxFontSizeRem;
      textArea.style.fontSize = `${fontSizeRem}rem`;

      // 最大幅以内に収まるようにフォントサイズを調整
      while (textArea.scrollWidth > textArea.clientWidth && fontSizeRem > minFontSizeRem) {
        fontSizeRem -= 0.05; // フォントサイズをremで小さくする
        textArea.style.fontSize = `${fontSizeRem}rem`;
      }
    }

    // テキスト入力時のイベント
    textArea.addEventListener('input', function () {
      adjustFontSize();
    });

    // 初期状態でテキストがある場合の処理
    if (textArea.value.trim() !== '') {
      adjustFontSize();
    }
  });
});
//------------------------ここまで----------------------------

// 枠変更 12-~3変更できない版
document.addEventListener("DOMContentLoaded", () => {
  const dropAreas = [];
  const resizeButtons = document.querySelectorAll(".resizeButton");
  let activeDropArea = null;

  // ドロップエリアをすべて取得し、配列に追加
  document.querySelectorAll('[id^="dropArea"]').forEach((dropArea) => {
    dropAreas.push(dropArea);
    dropArea.addEventListener("pointerdown", () =>
      handleDropAreaInteraction(dropArea)
    );
  });

  // ドロップエリアがクリックまたはタッチされたときの処理
  const handleDropAreaInteraction = (dropArea) => {
    dropAreas.forEach((area) => area.classList.remove("active"));
    dropArea.classList.add("active");
    activeDropArea = dropArea;
  };

  // サイズ変更ボタンがクリックまたはタッチされたときの処理
  const handleResizeButtonInteraction = (button) => {
    if (activeDropArea) {
      // サイズ変更を禁止するドロップエリアのリスト
      const restrictedDropAreas = [
        "dropArea12-1",
        "dropArea12-2",
        "dropArea12-3",
      ];

      // サイズ変更を禁止するドロップエリアでない場合のみ処理
      if (!restrictedDropAreas.includes(activeDropArea.id)) {
        // サイズをすべてリセット
        activeDropArea.classList.remove("square", "rectangle", "mini");
        // ボタンの data-size 属性に基づいてサイズを変更
        const size = button.getAttribute("data-size");
        activeDropArea.classList.add(size);
      }
    }
  };

  resizeButtons.forEach((button) => {
    button.addEventListener("pointerdown", () =>
      handleResizeButtonInteraction(button)
    );
  });

  // ページロード時にローカルストレージからサイズを復元する処理を削除
});

// 背景色とテキストの色の変更 ローカルストレージに保存
function changeColor(color) {
  // 背景色を変更する
  let elements = document.getElementsByClassName("uniqueColor");
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.backgroundColor = color;
  }

  // テキスト色を変更する
  let textElements = document.getElementsByClassName("text-color");
  for (let i = 0; i < textElements.length; i++) {
    textElements[i].style.color = color;
  }

  // 色をローカルストレージに保存する
  localStorage.setItem("backgroundColorA", color);
}

// ページ読み込み時にローカルストレージから色を取得して適用する
document.addEventListener("DOMContentLoaded", function () {
  const savedColor = localStorage.getItem("backgroundColorA");
  if (savedColor) {
    changeColor(savedColor);
  }
});

// --------------------------------API連携-------------------------------------------
// 保存ボタン押下時の処理
document.getElementById('sendButton').addEventListener('click', handleSaveOrSend);
document.getElementById('saveBtn').addEventListener('click', handleSaveOrSend);

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

      // テキストエリアと画像データの収集
      const textAreas = document.querySelectorAll('.text-empty');
      const textData = Array.from(textAreas).map(textarea => ({
        id: textarea.id,
        text: textarea.value || '',
      }));

      const textAreaCover = document.querySelector('.textArea_cover textarea');
      const textDataCover = textAreaCover
        ? { id: textAreaCover.id, text: textAreaCover.value || '' }
        : null;

      const dropAreas = document.querySelectorAll('.empty');
      const imageData = Array.from(dropAreas).map(dropArea => {
        const img = dropArea.querySelector('img');
        return {
          id: dropArea.id,
          image: img ? img.src : null,
        };
      });

      const backgroundColor = document.querySelector('.uniqueColor').style.backgroundColor || '#ffffff';
      const textColor = document.querySelector('.text-color').style.color || '#000000';

      if (textData.every(text => text.text === '') && !textDataCover || textDataCover.text === '' && imageData.every(image => image.image === null)) {
        console.error('送信するデータがありません。');
        alert('送信するデータがありません。');
        return;
      }

      const dataToSend = {
        textData,
        textDataCover,
        imageData,
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

      return fetch(`https://develop-back.kotobum.com/api/albums/${albumId}/cover`, {
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
      return fetch(`https://develop-back.kotobum.com/api/albums/${albumId}/showCover`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    })
    .then(response => {
      if (!response.ok) {
        alert("ログインしてください。");
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

      // 背景色とテキスト色を設定
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
