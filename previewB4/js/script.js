// スライド
const swiper = new Swiper('.swiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 1,
  slidesPerGroup: 1,
  breakpoints: {
    900: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
  },
});

// プレビューからメイン
document.getElementById('editBack').addEventListener('click', function () {
  const currentSlideIndex = swiper.realIndex; // 現在のスライドインデックスを取得
  const mainPageUrl = `../edit/index.html?slide=${currentSlideIndex + 1}`; // スライド番号をクエリパラメータに追加
  window.location.href = mainPageUrl; // メインページに遷移
});

document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('認証トークンが見つかりません。ログインしてください。');
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
        throw new Error(`アルバムID取得時のHTTPエラー: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then((albums) => {
      albumId = albums.albumId;

      if (!albumId) {
        console.error('アルバムIDを取得できませんでした。');
        return;
      }
      console.log('取得したアルバムID:', albumId); // 取得したアルバムIDを表示

      // アルバムデータ取得リクエスト
      return fetch(`https://app-back.kotobum.com/api/albums/${albumId}/showBody`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`アルバムデータ取得時のHTTPエラー: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log('取得したデータ:', data);

      // テキストデータを反映
      const textData = Array.isArray(data.textData) ? data.textData : JSON.parse(data.textData);
      if (textData && Array.isArray(textData)) {
        textData.forEach((item) => {
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
        imageData.forEach((item) => {
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
      const colors = typeof data.colors === 'string' ? JSON.parse(data.colors) : data.colors;
      console.log('colors:', colors);
      if (colors) {
        const { backgroundColor, textColor } = colors;

        // `.uniqueColor` クラスを持つすべての要素に背景色を設定
        document.querySelectorAll('.uniqueColor').forEach((element) => {
          element.style.backgroundColor = backgroundColor || '#ffffff';
        });

        // `.text-color` クラスを持つすべての要素にテキスト色を設定
        document.querySelectorAll('.text-color').forEach((element) => {
          element.style.color = textColor || '#000000';
        });

        console.log(`背景色: ${backgroundColor}, テキスト色: ${textColor}`);
      } else {
        console.warn('色データが存在しません。');
      }
    })
    .catch((error) => {
      console.error('データ取得エラー:', error);
    });
});
