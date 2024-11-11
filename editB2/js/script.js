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