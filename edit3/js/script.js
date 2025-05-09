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
  fetch('https://app-back.kotobum.com/api/user/album', {
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

      // テキストエリアと画像データの収集
      const textAreas = document.querySelectorAll('.text-empty');
      const textData = Array.from(textAreas).map((textarea) => ({
        id: textarea.id,
        text: textarea.value || '',
      }));

      const dropAreas = document.querySelectorAll('.empty');
      const imageData = Array.from(dropAreas).map((dropArea) => {
        const img = dropArea.querySelector('img');
        return {
          id: dropArea.id,
          image: img ? img.src : null,
        };
      });

      const backgroundColor = document.querySelector('.uniqueColorB').style.backgroundColor || '#ffffff';
      const textColor = document.querySelector('.text-colorB').style.color || '#000000';

      if (textData.every((text) => text.text === '') && imageData.every((image) => image.image === null)) {
        console.error('送信するデータがありません。');
        alert('送信するデータがありません。');
        return;
      }

      const dataToSend = {
        textData,
        imageData,
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

// ページ読み込み時のアルバムデータ取得処理
document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('token');
  console.log('取得したトークン:', token); // ← ここでちゃんと表示されるかチェック
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
    console.log('取得したトークン:', token); // ← ここでちゃんと表示されるかチェック
    fetch('https://app-back.kotobum.com/api/user/album', {
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
        console.log('サーバーのレスポンス:', response);
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
              textArea.style.border = 'none';
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

              dropArea.style.border = 'none';
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
