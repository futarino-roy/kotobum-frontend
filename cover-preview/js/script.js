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
  // URLのクエリパラメータを取得
  const urlParams = new URLSearchParams(window.location.search);
  const slideNumber = urlParams.get("slide");

  // 取得したスライド番号を使って対応するスライドを表示
  if (slideNumber) {
    swiper.slideTo(slideNumber - 1, 0); // スライド番号に対応するインデックスに移動
    console.log(`Displaying preview for slide ${slideNumber}`);
  }
});

// プレビューからメイン
document.getElementById("editBack").addEventListener("click", function () {
  const currentSlideIndex = swiper.realIndex; // 現在のスライドインデックスを取得
  const mainPageUrl = `../edit/index.html?slide=${currentSlideIndex + 1}`; // スライド番号をクエリパラメータに追加
  window.location.href = mainPageUrl; // メインページに遷移
});

// 画像の挿入 indexedDB
let myImageDB1;

// IndexedDBの初期化
function initIndexedDBForPreview() {
  const request = indexedDB.open("NewImageDatabase1", 1);

  request.onsuccess = function (event) {
    myImageDB1 = event.target.result;
    console.log("IndexedDB connected for preview.");
    restoreDropAreasInPreview(); // プレビューページのドロップエリアに画像を復元
  };

  request.onerror = function (event) {
    console.error("Error connecting to IndexedDB:", event.target.errorCode);
  };
}

// ドロップエリアに画像を復元する
function restoreDropAreasInPreview() {
  const dropAreas = document.querySelectorAll(".empty"); // すべてのドロップエリアを取得
  dropAreas.forEach((dropArea) => {
    // 各ドロップエリアのIDを使ってIndexedDBから画像を取得
    getImageFromIndexedDB(dropArea.id, function (imageData) {
      if (imageData) {
        // 画像要素を作成して表示
        const img = document.createElement("img");
        img.src = imageData;
        img.style.width = "100%";
        img.style.height = "100%";

        dropArea.innerHTML = ""; // 既存の内容をクリア
        dropArea.appendChild(img); // 画像をドロップエリアに追加
      }
    });
  });
}

// IndexedDBから画像を取得する
function getImageFromIndexedDB(id, callback) {
  if (!myImageDB1) {
    console.error("Database not initialized.");
    return;
  }

  const transaction = myImageDB1.transaction(["images"]);
  const store = transaction.objectStore("images");
  const request = store.get(id);

  request.onsuccess = function (event) {
    const result = event.target.result;
    if (result) {
      callback(result.data); // 保存された画像データをコールバック関数で返す
    } else {
      console.log("No image found with ID:", id);
    }
  };

  request.onerror = function (event) {
    console.error("Error retrieving image:", event.target.errorCode);
  };
}

// ページが読み込まれたときにIndexedDBを初期化
document.addEventListener("DOMContentLoaded", function () {
  initIndexedDBForPreview();
});

// 画像のドラッグ indexedDB
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
  loadAllImages(); // ページロード時にすべての画像をロード
};

request.onerror = function (event) {
  console.error("IndexedDBに接続できませんでした:", event.target.error);
};

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
        dropArea.appendChild(img);
      }
    });
  });
}

// ドキュメントが読み込まれた後の処理
document.addEventListener("DOMContentLoaded", function () {
  loadAllImages(); // ページがロードされたときにすべての画像を表示

  // 必要に応じて、ユーザーが画像を操作するためのその他の機能を追加
});

// 枠 柔軟版
document.addEventListener("DOMContentLoaded", function () {
  // 枠のサイズ変更処理
  function applyBorders() {
    // dropAreaを含む全ての要素を取得
    const dropAreas = document.querySelectorAll('[id^="dropArea"]');

    dropAreas.forEach((dropAreaContainer) => {
      // IDからサイズの情報を取得
      const dropAreaId = dropAreaContainer.id;
      const dropAreaSize = localStorage.getItem(`dropAreaSize_${dropAreaId}`);

      if (dropAreaSize) {
        dropAreaContainer.classList.add(dropAreaSize);
      }
    });
  }

  // 枠のサイズ変更を適用
  applyBorders();
});

// テキスト 柔軟版
function adjustTextareaHeight(textarea) {
  textarea.style.height = "auto"; // 高さをリセット
  textarea.style.height = `${textarea.scrollHeight}px`; // 内容に応じて高さを調整
}
function adjustTextareaWidth(textarea) {
  textarea.style.width = "auto"; // 幅をリセット
  textarea.style.width = `${textarea.scrollWidth}px`; // 内容に応じて幅を調整
}

// プレビューページでテキストエリアにローカルストレージからテキストを表示する関数
function loadTextForPreview() {
  // テキストエリアのIDが"previewTextArea"で始まるすべての要素を取得
  const textAreas = document.querySelectorAll(
    'textarea[id^="previewTextArea"]'
  );

  textAreas.forEach((textArea) => {
    // テキストエリアの高さを調整
    adjustTextareaHeight(textArea);
    adjustTextareaWidth(textArea);
  });
}

// ドキュメントが読み込まれたときにテキストを表示
document.addEventListener("DOMContentLoaded", function () {
  loadTextForPreview();
});

//-------------------------------------追加----------------------------------
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

// 最大文字数の制限を外し、イベントリスナーを追加する関数
function enforceNoMaxLength(textarea) {
  textarea.addEventListener("input", function () {
    adjustHeight(this);
    adjustTextareaWidth(this);
  });

  adjustHeight(textarea);
  adjustTextareaWidth(textarea);
}
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
      // 高さを自動調整
      this.style.height = '';
      adjustLineHeight(this); // line-heightを調整
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

    // 初期状態でテキストがある場合の処理
    if (textArea.value.trim() !== '') {
      adjustFontSize();
    }
  });
});
//--------------------------------------ここまで-----------------------------------

// 色変更
// プレビューページで色を適用する関数
function applySavedColor() {
  const savedColor = localStorage.getItem("backgroundColorA");
  if (savedColor) {
    // 背景色を適用
    let elements = document.getElementsByClassName("uniqueColor");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor = savedColor;
    }

    // テキスト色を適用
    let textElements = document.getElementsByClassName("text-color");
    for (let i = 0; i < textElements.length; i++) {
      textElements[i].style.color = savedColor;
    }
  }
}

// ドキュメントが読み込まれたときに色を適用
document.addEventListener("DOMContentLoaded", function () {
  applySavedColor();
});

//--------------------------API連携------------------------------------

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
        throw new Error(`アルバムデータ取得時のHTTPエラー: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('取得したデータ:', data);

      // テキストデータを反映
      const textData = Array.isArray(data.textData) ? data.textData : JSON.parse(data.textData);
      if (textData && Array.isArray(textData)) {
        textData.forEach(item => {
          const textArea = document.getElementById(item.id);
          if (textArea) {
            textArea.value = item.text;
            adjustTextareaSize(textArea);
          } else {
            console.warn(`テキストエリアが見つかりません: ID ${item.id}`);
          }
        });
      } else {
        console.warn('テキストデータが存在しないか、配列ではありません。');
      }

      // 画像データを反映
      const imageData = Array.isArray(data.imageData) ? data.imageData : JSON.parse(data.imageData);
      if (imageData && Array.isArray(imageData)) {
        imageData.forEach(item => {
          const dropArea = document.getElementById(item.id);
          if (dropArea && item.image) {
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = 'Image';
            img.style.width = '100%';
            img.style.height = '100%';
            dropArea.appendChild(img);
          } else {
            console.warn(`画像データが存在しないか、画像が見つかりません: ID ${item.id}`);
          }
        });
      } else {
        console.warn('画像データが存在しないか、配列ではありません。');
      }

      // 色データを反映
      const colors = typeof data.colors === 'object' ? data.colors : JSON.parse(data.colors);
      if (colors) {
        const { backgroundColor, textColor } = colors;
        document.querySelector('.uniqueColor').style.backgroundColor = backgroundColor || '#ffffff';
        document.querySelector('.text-color').style.color = textColor || '#000000';
        console.log(`背景色: ${backgroundColor}, テキスト色: ${textColor}`);
      } else {
        console.warn('色データが存在しません。');
      }
    })
    .catch(error => {
      console.error('データ取得エラー:', error);
    });
});



//----------------- モーダルに関するJavaScript---------------------

//要素を取得
const openButton = document.querySelector('.js-modal-open');
const modal = document.getElementById("modal1");

//「開くボタン」をクリックしてモーダルを開く

openButton.addEventListener('click', function () {
  console.log(`開かれたモーダル: ${modal.id}`); // コンソールに開かれたモーダルのIDを表示
  modal.classList.add('is-active'); // モーダルを表示
});

// モーダルの外側がクリックされたときにモーダルを閉じる
modal.addEventListener('click', function (event) {
  if (event.target === modal) { // event.targetを使ってモーダルの外側かどうかをチェック
    modal.classList.remove('is-active'); // モーダルを閉じる
  }
});

// モーダル内の閉じるボタンがクリックされたときにモーダルを閉じる
const closeButton = modal.querySelector('.js-modal-close');
if (closeButton) {
  closeButton.addEventListener('click', function (event) {
    event.preventDefault();
    modal.classList.remove('is-active');
  });
}

//----------- モーダル内の校了ボタンを押した後のモーダル -------------------
const modalF = document.querySelector('.js-modal1');
const modalS = document.querySelector('.js-modal1_2');

// 校了ボタンの取得
const changeButtons = document.querySelectorAll('.modal-change_l');

changeButtons.forEach((changeButton) => {
  changeButton.addEventListener('click', function () {
    // 最初のモーダルを非表示
    modalF.classList.remove('is-active');
    // 次のモーダルを表示
    modalS.classList.add('is-active');
  });
});

// -------------校了後のマイページのボタン無効化に関するJS　表紙用----------------

// A, C ボタンのセレクタ
const buttonA_l = document.querySelector('.buttonA_l'); //編集ボタン
const buttonC_l = document.querySelector('.buttonC_l'); //校了ボタン

// モーダルを取得
// const modal = document.querySelector('#modal1_2');

// モーダル内の「マイページへ」ボタンを取得
const modalButton_ls = document.querySelectorAll('.modal-checkafter__mypage_l');

// 「マイページへ」ボタンをクリックしたら、AボタンとCボタンを無効化
modalButton_ls.forEach((modalButton_l) => {
  modalButton_l.addEventListener('click', function () {
    buttonA_l.disabled = true;
    buttonC_l.disabled = true;

    buttonA_l.style.cursor = 'not-allowed'; // cursorのデザインを変更
    buttonC_l.style.cursor = 'not-allowed';

    //バックエンドとのAPI連携（校了後にボタンを押せなくする）
    fetch(' ', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', //送信するデータがJSON形式であることを示す
      },
      body: JSON.stringify({ isKoryoDone: true }), // 校了済みのフラグを送信
    })
      .then((response) => response.json())
      .then((data) => {
        const koryoButton = document.getElementById('koryoButton');

        if (data.isKoryoDone) {
          koryoButton.disabled = true; // 校了済みの場合はボタンを無効化
        } else {
          koryoButton.disabled = false; // 校了がまだの場合はボタンを有効化
        }
      })
      .catch((error) => {
        console.error('サーバーからのフラグ取得時にエラーが発生しました:', error);
      });
  });

  window.addEventListener('load', function () {
    fetch(' ', {
      // method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const koryoButton = document.getElementById('koryoButton');

        if (data.isKoryoDone) {
          koryoButton.disabled = true; // 校了済みの場合はボタンを無効化
        } else {
          koryoButton.disabled = false; // 校了がまだの場合はボタンを有効化
        }
      })
      .catch((error) => {
        console.error('サーバーからのフラグ取得時にエラーが発生しました:', error);
      });
  });

  // モーダルを閉じる
  modalS.classList.remove('is-active');
});

// 「マイページへ」ボタンをクリックしたら、AボタンとCボタンのデザインを変更
const button_ls = document.querySelectorAll('.modal-checkafter__mypage_l');

// 変更対象(「編集ボタン」と「校了ボタン」)の要素を取得
//「 A, C ボタンのセレクタ」で以下を取得しているため使いまわします。
// const buttonA_l = document.querySelector('.buttonA_l'); //編集ボタン
// const buttonC_l = document.querySelector('.buttonC_l'); //校了ボタン

// ボタンがクリックされたときにクラスを切り替える
button_ls.forEach((button_l) => {
  button_l.addEventListener('click', function () {
    if (buttonC_l.classList.contains('btn-small_bl')) {
      buttonC_l.classList.remove('btn-small_bl');
      buttonC_l.classList.add('btn-small_wh');
    } else {
      buttonC_l.classList.remove('btn-small_wh');
      buttonC_l.classList.add('btn-small_bl');
    }
    buttonC_l.style.opacity = '0.6';
    buttonA_l.style.opacity = '0.6';
  });
});