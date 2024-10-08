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
let myImageDB1;
let selectedImage = null;

// 新しいIndexedDBの初期化
function initNewIndexedDB() {
  const request = indexedDB.open('NewImageDatabase1', 1);

  request.onupgradeneeded = function (event) {
    myImageDB1 = event.target.result;
    if (!myImageDB1.objectStoreNames.contains('images')) {
      myImageDB1.createObjectStore('images', { keyPath: 'id' });
    }
  };

  request.onsuccess = function (event) {
    myImageDB1 = event.target.result;
    console.log('New IndexedDB initialized.');
    restoreDropAreas();
  };

  request.onerror = function (event) {
    console.error('Error initializing IndexedDB:', event.target.errorCode);
  };
}

initNewIndexedDB();

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
      }
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
    deleteImageFromNewIndexedDB(dropArea.id);
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

  saveImageToNewIndexedDB(dropArea.id, newImage.src);

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

// ドロップエリア内でクリックしたときはボタンが表示されるように設定
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

function saveImageToNewIndexedDB(id, imageData) {
  if (!myImageDB1) {
    console.error('Database not initialized.');
    return;
  }

  const transaction = myImageDB1.transaction(['images'], 'readwrite');
  const store = transaction.objectStore('images');
  store.put({ id: id, data: imageData });

  transaction.oncomplete = function () {
    console.log('Image saved to new IndexedDB.');
  };

  transaction.onerror = function (event) {
    console.error('Error saving image:', event.target.errorCode);
  };
}

function getImageFromNewIndexedDB(id, callback) {
  if (!myImageDB1) {
    console.error('Database not initialized.');
    return;
  }

  const transaction = myImageDB1.transaction(['images']);
  const store = transaction.objectStore('images');
  const request = store.get(id);

  request.onsuccess = function (event) {
    const result = event.target.result;
    if (result) {
      callback(result.data);
    } else {
      console.log('No image found with ID:', id);
    }
  };

  request.onerror = function (event) {
    console.error('Error retrieving image:', event.target.errorCode);
  };
}

function restoreDropAreas() {
  const dropAreas = document.querySelectorAll('.empty');
  dropAreas.forEach(dropArea => {
    getImageFromNewIndexedDB(dropArea.id, function (imageData) {
      if (imageData) {
        const newImage = document.createElement('img');
        newImage.src = imageData;
        newImage.style.width = '100%';
        newImage.style.height = '100%';

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function (e) {
          e.stopPropagation();
          dropArea.innerHTML = '';
          deleteImageFromNewIndexedDB(dropArea.id);
        });

        const cropButton = document.createElement('button');
        cropButton.classList.add('crop-button');
        cropButton.addEventListener('click', function (e) {
          e.stopPropagation();
          openCroppieModal(dropArea);
        });

        dropArea.innerHTML = '';
        dropArea.appendChild(newImage);
        dropArea.appendChild(deleteButton);
        dropArea.appendChild(cropButton);
        dropArea.classList.add('with-buttons');
        dropArea.classList.remove('hide-buttons'); // Restore visibility
      }
    });
  });
}

function deleteImageFromNewIndexedDB(id) {
  if (!myImageDB1) {
    console.error('Database not initialized.');
    return;
  }

  const transaction = myImageDB1.transaction(['images'], 'readwrite');
  const store = transaction.objectStore('images');
  const request = store.delete(id);

  request.onsuccess = function () {
    console.log('Image deleted from new IndexedDB:', id);
  };

  request.onerror = function (event) {
    console.error('Error deleting image:', event.target.errorCode);
  };
}

function openCroppieModal(dropArea) {
  // Croppieモーダルの表示処理
  console.log('Croppie modal open for drop area:', dropArea);
}



// // 画像のドラッグ＆ドロップ indexedDBに保存
// ドラッグオーバー時の処理
function handleDragOver(event) {
  event.preventDefault();
  this.style.backgroundColor = "#d0f0c0"; // ドラッグ中の背景色変更
}

// ドラッグが離れたときの処理
function handleDragLeave(event) {
  this.style.backgroundColor = "transparent"; // ドラッグが離れたときの背景色リセット
}

// IndexedDBへの接続
let myimageDB2;
const request = indexedDB.open("ImageDB", 1);

request.onupgradeneeded = function (event) {
  myimageDB2 = event.target.result;
  if (!myimageDB2.objectStoreNames.contains("images")) {
    myimageDB2.createObjectStore("images", { keyPath: "id" });
  }
};

request.onsuccess = function (event) {
  myimageDB2 = event.target.result;

  // IndexedDB接続が成功した場合にのみ画像をロードする
  if (myimageDB2) {
    loadAllImages();
  } else {
    console.error("IndexedDBへの接続が失敗しました。");
  }
};

request.onerror = function (event) {
  console.error("IndexedDBに接続できませんでした:", event.target.error);
};

// 画像をIndexedDBに保存
function saveImageToIndexedDB(imageData, containerId) {
  const transaction = myimageDB2.transaction(["images"], "readwrite");
  const store = transaction.objectStore("images");
  const request = store.put({ id: containerId, data: imageData });

  request.onsuccess = function () {
    console.log("画像がIndexedDBに保存されました:", containerId);
  };

  request.onerror = function (event) {
    console.error("画像の保存に失敗しました:", event.target.error);
  };
}

// IndexedDBから画像を取得
function loadImageFromIndexedDB(containerId, callback) {
  const transaction = myimageDB2.transaction(["images"], "readonly");
  const store = transaction.objectStore("images");
  const request = store.get(containerId);

  request.onsuccess = function (event) {
    callback(event.target.result ? event.target.result.data : null);
  };

  request.onerror = function (event) {
    console.error("画像の取得に失敗しました:", event.target.error);
    callback(null);
  };
}

// IndexedDBから画像を削除
function clearImageFromIndexedDB(containerId) {
  const transaction = myimageDB2.transaction(["images"], "readwrite");
  const store = transaction.objectStore("images");
  const request = store.delete(containerId);

  request.onsuccess = function () {
    console.log("画像がIndexedDBから削除されました:", containerId);
  };

  request.onerror = function (event) {
    console.error("画像の削除に失敗しました:", event.target.error);
  };
}

// すべての画像をロードする
function loadAllImages() {
  const emptyElements = document.querySelectorAll(".empty");
  emptyElements.forEach(function (dropArea) {
    loadImageFromIndexedDB(dropArea.id, function (imageData) {
      if (imageData) {
        dropArea.innerHTML = ""; // 既存の内容をクリア
        let img = new Image();
        img.src = imageData; // 画像データURLを設定
        img.classList.add("draggable-image");
        img.onclick = function () {
          showButtons(this.parentNode); // 画像がクリックされたときにボタンを表示
        };
        dropArea.appendChild(img);
        addButtons(dropArea); // 削除ボタンとトリミングボタンを追加

        // 画像が挿入されたら枠線をなくす処理追加
        dropArea.style.border = 'none';
      }
    });
  });
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
      this.innerHTML = ""; // 既存の内容をクリア
      let img = new Image();
      img.src = e.target.result; // 画像データURLを設定
      img.classList.add("draggable-image"); // 画像にクラスを追加
      img.onclick = function () {
        showButtons(this.parentNode); // 画像がクリックされたときにボタンを表示
      };
      this.appendChild(img);
      addButtons(this); // 削除ボタンとトリミングボタンを追加

      // 画像が挿入されたら枠線をなくす処理追加
      this.style.border = 'none';

      // IndexedDBに画像データを保存
      saveImageToIndexedDB(e.target.result, this.id);
    }.bind(this);
    fileReader.readAsDataURL(file); // ドロップされたファイルをデータURLに変換
  }
}

// タッチエンド時の処理
function handleTouchDrop(event) {
  event.preventDefault();
  const touch = event.changedTouches[0];
  const dropArea = document.elementFromPoint(touch.clientX, touch.clientY);

  if (dropArea && dropArea.classList.contains("empty")) {
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      let file = files[0];
      let fileReader = new FileReader();
      fileReader.onload = function (e) {
        dropArea.innerHTML = ""; // 既存の内容をクリア
        let img = new Image();
        img.src = e.target.result; // 画像データURLを設定
        dropArea.appendChild(img);
        addButtons(dropArea); // 削除ボタンとトリミングボタンを追加

        // 画像が挿入されたら枠線をなくす処理追加
        dropArea.style.border = 'none';

        // IndexedDBに画像データを保存
        saveImageToIndexedDB(e.target.result, dropArea.id);
      };
      fileReader.readAsDataURL(file); // ドロップされたファイルをデータURLに変換
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

      // IndexedDBから画像データを削除
      clearImageFromIndexedDB(container.id);

      // 画像が削除されたら枠線を復元の処理追加
      container.style.border = '2px dashed #ccc';
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
        saveImageToIndexedDB(croppedImageData, container.id); // トリミング後の画像を保存
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

// テキストエリアの内容をローカルストレージに保存
function saveTextToLocalStorage() {
  document.querySelectorAll(".text-empty").forEach((textArea) => {
    const id = textArea.id;
    localStorage.setItem(id, textArea.value);
  });
}

// テキストエリアの内容をローカルストレージから読み込む関数
function loadTextFromLocalStorage() {
  document.querySelectorAll(".text-empty").forEach((textArea) => {
    const id = textArea.id;
    textArea.value = localStorage.getItem(id) || "";
  });
}

// テキストエリアの高さを調整する関数
function adjustHeight(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
}

// テキストエリアの幅を調整する関数
function adjustTextareaWidth(textarea) {
  textarea.style.width = "auto";
  const scrollWidth = textarea.scrollWidth;
  textarea.style.width = `${scrollWidth}px`;
}

// // 最大文字数の制限を外し、イベントリスナーを追加する関数
// function enforceNoMaxLength(textarea) {
//   textarea.addEventListener("input", function () {
//     adjustHeight(this);
//     adjustTextareaWidth(this);
//     saveTextToLocalStorage();
//   });

//   adjustHeight(textarea);
//   adjustTextareaWidth(textarea);
// }

// // テキストエリアの文字数に応じて自動的に広がるように
// const textAreas = document.getElementsByClassName('text-height');

// Array.from(textAreas).forEach(textArea => {
//   textArea.addEventListener('input', function () {
//     this.style.height = 'auto'; // 高さをリセット
//     this.style.height = `${this.scrollHeight + 10}px`; // 内容に応じて高さを再設定
//   });

//   // 初回ロード時に高さを調整
//   window.addEventListener('load', function () {
//     textArea.style.height = 'auto';
//     textArea.style.height = `${textArea.scrollHeight}px`;
//   });
// });
// console.log(this.scrollHeight);

// // テキスト量が増えてもテキストエリアの枠内に収まるようにフォントサイズ変更
// const textArea = document.getElementsByClassName('text-size');
// const maxFontSize = 24; // 最大フォントサイズ
// const minFontSize = 12; // 最小フォントサイズ
// const padding = 10; // テキストエリアの内側のパディング

// // テキストの量に応じてフォントサイズを調整する関数
// function adjustFontSize() {
//   let fontSize = maxFontSize;
//   textArea.style.fontSize = `${fontSize}px`;

//   while (textArea.scrollHeight > textArea.clientHeight - padding && fontSize > minFontSize) {
//     fontSize -= 1; // フォントサイズを少しずつ小さくする
//     textArea.style.fontSize = `${fontSize}px`;
//   }
// }

// // テキストエリアに文字が入力されたときにフォントサイズを調整
// textArea.addEventListener('input', function () {
//   this.style.height = 'auto'; // 高さをリセット
//   this.style.height = `${this.scrollHeight}px`; // 内容に応じて高さを再設定
//   adjustFontSize(); // フォントサイズを調整
// });

// // 初回ロード時にフォントサイズと高さを調整（テキストがすでに入力されている場合）
// window.addEventListener('load', function () {
//   textArea.style.height = 'auto';
//   textArea.style.height = `${textArea.scrollHeight}px`;
//   adjustFontSize();
// });

// // ドキュメント読み込み時の処理
// document.addEventListener("DOMContentLoaded", function () {
//   loadTextFromLocalStorage();

//   // テキストエリアごとに必要な処理を実行
//   document.querySelectorAll(".text-empty").forEach((textarea) => {
//     enforceNoMaxLength(textarea);
//   });

//   // ロード後に高さ調整を行う
//   setTimeout(() => {
//     document
//       .querySelectorAll(".text-empty")
//       .forEach((textarea) => adjustHeight(textarea));
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

document.addEventListener('DOMContentLoaded', function () {
  // テキストエリアの自動リサイズ
  const textAreas = document.querySelectorAll('.text-height');

  textAreas.forEach(textArea => {
    textArea.addEventListener('input', function () {
      this.style.height = 'auto'; // 高さをリセット
      this.style.height = `${this.scrollHeight + 10}px`; // 内容に応じて高さを再設定
    });

    // 初回ロード時に高さを調整
    textArea.style.height = 'auto';
    textArea.style.height = `${textArea.scrollHeight}px`;
  });

  // フォントサイズ変更を避けたいクラス
  const excludeFontSizeAdjustment = 'no-font-adjust'; // このクラスがついている要素はフォントサイズ調整をしない

  // テキスト量に応じてフォントサイズを変更
  const maxFontSize = 24; // 最大フォントサイズ
  const minFontSize = 12; // 最小フォントサイズ
  const padding = 10; // テキストエリアの内側のパディング

  function adjustFontSize(textArea) {
    // フォントサイズ調整を除外するクラスがあればスキップ
    if (textArea.classList.contains(excludeFontSizeAdjustment)) return;

    let fontSize = maxFontSize;
    textArea.style.fontSize = `${fontSize}px`;

    while (textArea.scrollHeight > textArea.clientHeight - padding && fontSize > minFontSize) {
      fontSize -= 1; // フォントサイズを小さくする
      textArea.style.fontSize = `${fontSize}px`;
    }
  }

  textAreas.forEach(textArea => {
    textArea.addEventListener('input', function () {
      this.style.height = 'auto'; // 高さをリセット
      this.style.height = `${this.scrollHeight}px`; // 内容に応じて高さを再設定
      adjustFontSize(this); // フォントサイズ調整
    });

    // 初回ロード時にフォントサイズと高さを調整
    adjustFontSize(textArea);
  });

  // テキストエリア枠の削除機能
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

  // テキストエリアの入力に応じて枠の表示を切り替える
  textEmptys.forEach((textEmpty) => {
    textEmpty.addEventListener('input', updateBorders);
  });

  // 初回ロード時に枠の状態を更新
  updateBorders();

  // テキストエリアにすでに入力がある場合の処理
  document.querySelectorAll(".text-empty").forEach((textarea) => {
    enforceNoMaxLength(textarea);
    adjustFontSize(textarea);
  });

  // ロード後に高さ調整を行う
  setTimeout(() => {
    document.querySelectorAll(".text-empty").forEach((textarea) => {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    });
  }, 100);
});


// 枠変更 12-~3変更できない版 ローカルストレージに保存
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

        // サイズ情報をローカルストレージに保存（ドロップエリアごとに異なるキーを使用）
        localStorage.setItem(`dropAreaSize_${activeDropArea.id}`, size);
      }
    }
  };

  resizeButtons.forEach((button) => {
    button.addEventListener("pointerdown", () =>
      handleResizeButtonInteraction(button)
    );
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

document.getElementById("sendButton").addEventListener("click", function () {
  // 認証トークンの取得
  const token = localStorage.getItem("token");

  // トークンのチェック
  if (!token) {
    console.error("認証トークンが見つかりません。ログインしてください。");
    return;
  }

  let albumId; // albumIdをここで宣言

  // IndexedDBのデータを取得する関数
  function getAllDataFromIndexedDB(dbName, storeName) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName);

      request.onerror = function (event) {
        console.error("IndexedDBにアクセスできません。", event);
        reject("IndexedDBにアクセスできません。");
      };

      request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction(storeName, "readonly");
        const objectStore = transaction.objectStore(storeName);
        const allDataRequest = objectStore.getAll();

        allDataRequest.onsuccess = function (event) {
          resolve(event.target.result);
        };

        allDataRequest.onerror = function (event) {
          console.error("データの取得に失敗しました。", event);
          reject("データの取得に失敗しました。");
        };
      };
    });
  }

  // サーバからアルバムIDを取得
  fetch("https://develop-back.kotobum.com/api/user/album", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `HTTPエラー: ${response.status} - ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((albumData) => {
      console.log("取得したアルバムデータ:", albumData);

      const albumId = albumData.albumId;
      if (!albumId) {
        console.error("アルバムIDを取得できませんでした。");
        return;
      }

      // 別ページのHTMLを取得
      return fetch("../preview/index.html")
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `別のHTMLページの取得エラー: ${response.status} - ${response.statusText}`
            );
          }
          return response.text();
        })
        .then((htmlContent) => {
          // CSSの取得
          let cssContent = "";
          let cssUrls = [];
          const cssPromises = [];

          for (let sheet of document.styleSheets) {
            try {
              if (sheet.href) {
                cssUrls.push(sheet.href);
                cssPromises.push(
                  fetch(sheet.href)
                    .then((response) => response.text())
                    .then((text) => {
                      cssContent += text;
                    })
                    .catch((e) => {
                      console.warn("スタイルシートの取得エラー:", e);
                    })
                );
              } else {
                for (let rule of sheet.cssRules) {
                  cssContent += rule.cssText;
                }
              }
            } catch (e) {
              console.warn("スタイルシートの取得エラー:", e);
            }
          }

          return Promise.all(cssPromises).then(() => ({
            htmlContent,
            cssContent,
            cssUrls,
          }));
        });
    })
    .then(({ htmlContent, cssContent, cssUrls }) => {
      console.log("取得したHTMLコンテンツ:", htmlContent);
      console.log("取得したCSSコンテンツ:", cssContent);
      console.log("取得したCSS URL:", cssUrls);

      // ローカルストレージのデータを収集
      let localStorageData = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        localStorageData[key] = localStorage.getItem(key);
      }

      // IndexedDBのデータを取得
      return Promise.all([
        getAllDataFromIndexedDB("NewImageDatabase1", "images"),
        getAllDataFromIndexedDB("ImageDB", "images"),
      ]).then(([newImageDatabase1Data, imageDBData]) => {

        // // データの存在確認
        // if (!newImageDatabase1Data || !Array.isArray(newImageDatabase1Data)) {
        //   console.warn("NewImageDatabase1のデータが空です。");
        //   newImageDatabase1Data = []; // 空の配列を代入
        // }

        // if (!imageDBData || !Array.isArray(imageDBData)) {
        //   console.warn("ImageDBのデータが空です。");
        //   imageDBData = []; // 空の配列を代入
        // }

        console.log("NewImageDatabase1のデータ:", newImageDatabase1Data);
        console.log("ImageDBのデータ:", imageDBData);

        // FormDataの作成
        const cover = new FormData();
        cover.append("htmlContent", htmlContent);
        cover.append("cssContent", cssContent);
        cover.append("cssUrls", JSON.stringify(cssUrls));
        cover.append("localStorageData", JSON.stringify(localStorageData)); // ローカルストレージのデータ

        // データが存在する場合のみ追加
        if (newImageDatabase1Data.length > 0) {
          cover.append("newImageDatabase1Data", JSON.stringify(newImageDatabase1Data)); // NewImageDatabase1のデータ
        }

        if (imageDBData.length > 0) {
          cover.append("imageDBData", JSON.stringify(imageDBData)); // ImageDBのデータ
        }

        // cover.append(
        //   "newImageDatabase1Data",
        //   JSON.stringify(newImageDatabase1Data)
        // ); // NewImageDatabase1のデータ
        // cover.append("imageDBData", JSON.stringify(imageDBData)); // ImageDBのデータ

        // サーバへデータを送信
        return fetch(
          `https://develop-back.kotobum.com/api/albums/${albumId}/cover`,
          // api/user/albumにしないといけないかも？
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: cover,
          }
        );
      });
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `サーバ送信エラー: ${response.status} - ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("エラー:", error.message);
    });
});
