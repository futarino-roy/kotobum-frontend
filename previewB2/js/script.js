// スライド
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
// プレビューからメイン
document.getElementById('editBack').addEventListener('click', function () {
    const currentSlideIndex = swiper.realIndex; // 現在のスライドインデックスを取得
    const mainPageUrl = `../editB/index.html?slide=${currentSlideIndex + 1}`; // スライド番号をクエリパラメータに追加
    window.location.href = mainPageUrl; // メインページに遷移
});
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
            return fetch(`https://develop-back.kotobum.com/api/albums/${albumId}/showBody`, {
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
                document.querySelectorAll('.uniqueColorB').forEach(element => {
                    element.style.backgroundColor = backgroundColor || '#ffffff';
                });

                // `.text-color` クラスを持つすべての要素にテキスト色を設定
                document.querySelectorAll('.text-colorB').forEach(element => {
                    element.style.color = textColor || '#000000';
                });

                console.log(`背景色: ${backgroundColor}, テキスト色: ${textColor}`);
            } else {
                console.warn('色データが存在しません。');
            }
        })
        .catch(error => {
            console.error('アルバムデータ取得中にエラーが発生しました:', error.message);
        });
});
