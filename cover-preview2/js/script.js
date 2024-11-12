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
// let myImageDB1; // この行を削除しました

// IndexedDBの初期化
function initIndexedDBForPreview() {
    // ここでの処理は削除されました
    console.error("Image saving functionality has been removed.");
}

// ドロップエリアに画像を復元する
function restoreDropAreasInPreview() {
    const dropAreas = document.querySelectorAll(".empty"); // すべてのドロップエリアを取得
    dropAreas.forEach((dropArea) => {
        // 画像を復元する処理は削除されました
        console.log("Restoration of images from IndexedDB has been removed.");
    });
}

// ページが読み込まれたときにIndexedDBを初期化
document.addEventListener("DOMContentLoaded", function () {
    initIndexedDBForPreview();
});

// 画像のドラッグ indexedDB
// let myimageDB2; // この行を削除しました
// const request = indexedDB.open("ImageDB", 1); // この行を削除しました

// 画像を取得する処理は削除されました

// すべての画像をロードする
function loadAllImages() {
    const emptyElements = document.querySelectorAll(".empty");
    emptyElements.forEach(function (dropArea) {
        // 画像をロードする処理は削除されました
        console.log("Loading images from IndexedDB has been removed.");
    });
}

// ドキュメントが読み込まれた後の処理
document.addEventListener("DOMContentLoaded", function () {
    loadAllImages(); // ページがロードされたときにすべての画像を表示

    // 必要に応じて、ユーザーが画像を操作するためのその他の機能を追加
});

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
            // localStorageからサイズの情報を取得する処理を削除
            // const dropAreaSize = localStorage.getItem(`dropAreaSize_${dropAreaId}`);

            // dropAreaSizeが存在するかをチェックする処理を削除
            // if (dropAreaSize) {
            //   dropAreaContainer.classList.add(dropAreaSize);
            // }
        });
    }

    // 枠のサイズ変更を適用
    applyBorders();
});

function adjustTextareaSize(textarea) {
    // 高さをリセットしてから内容に応じて高さを調整
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;

    // 幅をリセットしてから内容に応じて幅を調整
    textarea.style.width = "auto";
    textarea.style.width = `${textarea.scrollWidth}px`;
}

// プレビューページでテキストエリアにローカルストレージからテキストを表示する関数
function loadTextForPreview() {
    // テキストエリアのIDが"previewTextArea"で始まるすべての要素を取得
    const textAreas = document.querySelectorAll(
        'textarea[id^="previewTextArea"]'
    );

    textAreas.forEach((textArea) => {
        // テキストエリアの高さと幅を調整
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
