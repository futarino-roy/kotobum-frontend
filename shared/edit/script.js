// editの共通するJSを　中身と表紙
// 共通するJSをいれたら、もとのJSはコメントアウトする!!!!!!!!!!!!

//  ドロワー
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
  const drawer = document.getElementById('drawer'); // 特定要素を取得
  const sideBtn = document.getElementById('sideBtn'); // 特定要素を取得

  dropAreas.forEach((dropArea) => {
    dropArea.addEventListener('touchstart', function (e) {
      e.preventDefault();
      if (selectedImage) {
        insertImageToDropArea(this);
      } else {
        // 画像以外と特定要素以外のタッチの場合はボタンとボーダーを非表示
        if (!e.target.closest('.empty') && !drawer.contains(e.target) && !sideBtn.contains(e.target)) {
          document.querySelectorAll('.empty.with-buttons').forEach((area) => {
            area.classList.add('hide-buttons');
            area.style.border = 'none'; // ボーダーを消す
          });
        }
        // タッチされたドロップエリアのボタンを表示する
        this.classList.remove('hide-buttons');
        this.style.border = ''; // ボーダーを元に戻す
      }
    });
  });

  document.addEventListener('touchstart', function (e) {
    const allDropAreas = document.querySelectorAll('.empty.with-buttons');
    if (!e.target.closest('.empty.with-buttons') && !drawer.contains(e.target) && !sideBtn.contains(e.target)) {
      allDropAreas.forEach((dropArea) => {
        dropArea.classList.add('hide-buttons');
        dropArea.style.border = 'none'; // ボーダーを消す
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
    deleteImageFromNewIndexedDB(dropArea.id);
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

  saveImageToNewIndexedDB(dropArea.id, newImage.src);

  // ボタンを表示するためのクラスを削除
  dropArea.classList.remove('hide-buttons');
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
  dropAreas.forEach((dropArea) => {
    getImageFromNewIndexedDB(dropArea.id, function (imageData) {
      if (imageData) {
        const newImage = document.createElement('img');
        newImage.src = imageData;
        newImage.style.width = '100%';
        newImage.style.height = '100%';

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('touchstart', function (e) {
          e.stopPropagation();
          dropArea.innerHTML = '';
          deleteImageFromNewIndexedDB(dropArea.id);
        });

        const cropButton = document.createElement('button');
        cropButton.classList.add('crop-button');
        cropButton.addEventListener('touchstart', function (e) {
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
