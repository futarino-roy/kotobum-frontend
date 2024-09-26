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
