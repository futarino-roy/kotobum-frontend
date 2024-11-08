// Swiperの初期化
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


// メインのスライドからプレビュー
document.addEventListener('DOMContentLoaded', function () {
    // プレビューボタンにクリックイベントリスナーを追加
    document.querySelector('.btn-preview').addEventListener('click', function () {
        // 現在のスライドインデックスを取得
        const currentSlideIndex = swiper.realIndex;

        // プレビューページのURLを動的に設定
        const previewUrl = `../preview/index.html?slide=${currentSlideIndex + 1}`;

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


// 枠変更 12-~3変更できない版 ローカルストレージに保存
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
            // サイズ変更を禁止するドロップエリアのリスト
            // const restrictedDropAreas = ['dropArea12-1', 'dropArea12-2', 'dropArea12-3'];

            // サイズ変更を禁止するドロップエリアでない場合のみ処理
            if (!restrictedDropAreas.includes(activeDropArea.id)) {
                // サイズをすべてリセット
                activeDropArea.classList.remove('square', 'rectangle34', 'rectangle43', 'mini');
                // ボタンの data-size 属性に基づいてサイズを変更
                const size = button.getAttribute('data-size');
                activeDropArea.classList.add(size);

                // サイズ情報をローカルストレージに保存（ドロップエリアごとに異なるキーを使用）
                localStorage.setItem(`dropAreaSize_${activeDropArea.id}`, size);
            }
        }
    };

    resizeButtons.forEach((button) => {
        button.addEventListener('pointerdown', () => handleResizeButtonInteraction(button));
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
    let elements = document.getElementsByClassName('uniqueColor');
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = color;
    }

    // テキスト色を変更する
    let textElements = document.getElementsByClassName('text-color');
    for (let i = 0; i < textElements.length; i++) {
        textElements[i].style.color = color;
    }

    // 色をローカルストレージに保存する
    localStorage.setItem('backgroundColorA', color);
}

// ページ読み込み時にローカルストレージから色を取得して適用する
document.addEventListener('DOMContentLoaded', function () {
    const savedColor = localStorage.getItem('backgroundColorA');
    if (savedColor) {
        changeColor(savedColor);
    }
});