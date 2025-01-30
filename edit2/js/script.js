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

            const parentElement = document.querySelector('.input-drop');
            const swiperSlides = document.querySelectorAll('.swiper-slide'); // Swiperの各スライドを取得

            // 背景色とテキスト色の取得
            const backgroundColor = document.querySelector('.uniqueColorB')?.style.backgroundColor || '#ffffff';
            const textColor = document.querySelector('.text-colorB')?.style.color || '#000000';
            // トリミングデータを取得
            // getCroppieImg();

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

                // スライド内の画像データ収集
                // const dropAreas = slide.querySelectorAll('.empty');
                // const imageData = Array.from(dropAreas).map((dropArea) => {
                //   const img = dropArea.querySelector('img'); // 画像要素を取得
                //   const croppedImage = dropArea.dataset.croppedImage || (img ? img.src : null); //トリミング後の画像
                //   const { top, left, width, height } = dropArea.getBoundingClientRect(); // ドロップエリアの座標情報を取得

                //   // return {
                //   //   id: dropArea.id,
                //   //   image: img ? img.src : null,
                //   //   top: ((top - initialRect.top) / canvasHeight) * 100, // 固定基準の高さを使用
                //   //   left: ((left - initialRect.left) / canvasWidth) * 100, // 固定基準の幅を使用
                //   //   width: (width / canvasWidth) * 100, // 固定基準の幅を使用
                //   //   height: (height / canvasHeight) * 100, // 固定基準の高さを使用
                //   // };
                //   return {
                //     id: dropArea.id,
                //     image: croppedImage,
                //     top: (((top - initialRect.top) / slideHeight) * 100), // パーセンテージで指定
                //     left: ((left - initialRect.left) / slideWidth) * 100, // パーセンテージで指定
                //     width: (width / slideWidth) * 100, // 幅をパーセンテージで指定
                //     height: (height / slideHeight) * 100, // 高さをパーセンテージで指定
                //   };
                // });


                const dropAreas = slide.querySelectorAll('.empty');
                const imageData = Array.from(dropAreas).map((dropArea) => {
                    const croppedImage = window.croppedImages[dropArea.id] || null; // ドロップエリアごとの画像データを取得
                    const imgElement = dropArea.querySelector("img");
                    const originalImage = imgElement ? imgElement.src : null;

                    const imageToSend = croppedImage || originalImage;

                    const { top, left, width, height } = dropArea.getBoundingClientRect();
                    return {
                        id: dropArea.id,
                        image: imageToSend,
                        top: (((top - initialRect.top) / slideHeight) * 100), // パーセンテージで指定
                        left: ((left - initialRect.left) / slideWidth) * 100, // パーセンテージで指定
                        width: (width / slideWidth) * 100, // 幅をパーセンテージで指定
                        height: (height / slideHeight) * 100, // 高さをパーセンテージで指定
                    };
                });

                return {
                    slideId: slide.dataset.slideId || null, // スライドID（必要ならdata属性などで指定）
                    textData,
                    imageData,
                };
            });

            // 送信データの構築
            if (pageData.every(page => page.textData.every(text => text.text === '') && page.imageData.every(image => image.image === null))) {
                console.error('送信するデータがありません。');
                alert('送信するデータがありません。');
                return;
            }

            // imageDataとtextDataを分離して送信
            const imageDataToSend = pageData.flatMap(page => page.imageData);
            const textDataToSend = pageData.flatMap(page => page.textData);

            const dataToSend = {
                imageData: imageDataToSend,
                textData: textDataToSend,
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

            return fetch(`https://develop-back.kotobum.com/api/albums/${albumId}/body`, {
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
                alert("ログインしてください。");
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
});
