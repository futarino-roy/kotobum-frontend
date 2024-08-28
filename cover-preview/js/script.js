const swiper = new Swiper(".swiper", {
    pagination: {
        el: ".swiper-pagination",
        type: "fraction"
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    slidesPerView: 1, // デフォルトは1枚
    slidesPerGroup: 1, // デフォルトは1枚ずつ進む
    breakpoints: {
        900: {
            slidesPerView: 2, // 900px以上の場合は2枚表示
            slidesPerGroup: 2, // 900px以上の場合は2枚ずつ進む
        }
    }
});



// メインのスライドからプレビュー
document.addEventListener("DOMContentLoaded", function() {
    // URLのクエリパラメータを取得
    const urlParams = new URLSearchParams(window.location.search);
    const slideNumber = urlParams.get('slide');
    
    // 取得したスライド番号を使って対応するスライドを表示
    if (slideNumber) {
        swiper.slideTo(slideNumber - 1, 0);  // スライド番号に対応するインデックスに移動
        console.log(`Displaying preview for slide ${slideNumber}`);
    }
});





// プレビューからメイン
document.getElementById('editBack').addEventListener('click', function() {
    const currentSlideIndex = swiper.realIndex;  // 現在のスライドインデックスを取得
    const mainPageUrl = `../cover/index.html?slide=${currentSlideIndex + 1}`;  // スライド番号をクエリパラメータに追加
    window.location.href = mainPageUrl;  // メインページに遷移
});



// 画像のアップロードと挿入
document.addEventListener('DOMContentLoaded', function() {
    // cover-dropArea1 と cover-dropArea2 の画像を更新
    updateDropAreas();
});

function updateDropAreas() {
    // cover-dropArea1 の画像を更新
    const dropArea1 = document.getElementById('cover-dropArea1');
    if (dropArea1) {
        const savedImageSrc1 = localStorage.getItem('cover-dropArea1');
        if (savedImageSrc1) {
            const img1 = document.createElement('img');
            img1.src = savedImageSrc1;
            dropArea1.innerHTML = ''; // 現在の内容をクリア
            dropArea1.appendChild(img1);
            dropArea1.classList.remove('empty');
        }
    }

    // cover-dropArea2 の画像を更新
    const dropArea2 = document.getElementById('cover-dropArea2');
    if (dropArea2) {
        const savedImageSrc2 = localStorage.getItem('cover-dropArea2');
        if (savedImageSrc2) {
            const img2 = document.createElement('img');
            img2.src = savedImageSrc2;
            dropArea2.innerHTML = ''; // 現在の内容をクリア
            dropArea2.appendChild(img2);
            dropArea2.classList.remove('empty');
        }
    }
}











// // 画像のドラッグ
// ページが読み込まれたときの処理
document.addEventListener("DOMContentLoaded", function() {
    // ドロップエリアごとのコンテナを取得
    const dropArea1Container = document.getElementById('cover-dropArea1');
    const dropArea2Container = document.getElementById('cover-dropArea2');

    // ローカルストレージからドロップエリア1の画像データを取得して表示
    const dropArea1ImageData = localStorage.getItem('image_cover-dropArea1');
    if (dropArea1ImageData) {
        const img1 = new Image();
        img1.src = dropArea1ImageData;
        img1.classList.add("image-preview");
        dropArea1Container.appendChild(img1);
    }

    // ローカルストレージからドロップエリア2の画像データを取得して表示
    const dropArea2ImageData = localStorage.getItem('image_cover-dropArea2');
    if (dropArea2ImageData) {
        const img2 = new Image();
        img2.src = dropArea2ImageData;
        img2.classList.add("image-preview");
        dropArea2Container.appendChild(img2);
    }
});












// 枠
document.addEventListener("DOMContentLoaded", function() {
    // ドロップエリアごとのコンテナを取得
    const dropArea1Container = document.getElementById('cover-dropArea1');
    const dropArea2Container = document.getElementById('cover-dropArea2');

    // 枠のサイズ変更処理
    function applyBorders() {
        // ローカルストレージからドロップエリア1の枠のサイズを取得して適用
        const dropArea1Size = localStorage.getItem('dropAreaSize_cover-dropArea1');
        if (dropArea1Size) {
            dropArea1Container.classList.add(dropArea1Size);
        }

        // ローカルストレージからドロップエリア2の枠のサイズを取得して適用
        const dropArea2Size = localStorage.getItem('dropAreaSize_cover-dropArea2');
        if (dropArea2Size) {
            dropArea2Container.classList.add(dropArea2Size);
        }
    }

    // 枠のサイズ変更を適用
    applyBorders();
});













// テキスト
// テキストエリアの高さを自動調整する関数
// テキストエリアの高さを調整する関数
function adjustTextareaHeight(textarea) {
    textarea.style.height = 'auto'; // 高さをリセット
    textarea.style.height = `${textarea.scrollHeight}px`; // 内容に応じて高さを調整
}

// プレビューページでローカルストレージからテキストを読み込み、テキストエリアに表示する関数
function loadTextForPreview() {
    const coverTextArea1 = document.getElementById('coverPreviewTextArea1');
    const coverTextArea2 = document.getElementById('coverPreviewTextArea2');

    // ローカルストレージからデータを読み込み、テキストエリアに表示
    coverTextArea1.value = localStorage.getItem('cover-textArea1') || '';
    coverTextArea2.value = localStorage.getItem('cover-textArea2') || '';

    // テキストエリアの高さを調整
    adjustTextareaHeight(coverTextArea1);
    adjustTextareaHeight(coverTextArea2);
}

// ドキュメントが読み込まれたときにテキストを表示
document.addEventListener("DOMContentLoaded", function () {
    loadTextForPreview();
});












// 色変更
// プレビューページで色を適用する関数
function applySavedColor() {
    const savedColor = localStorage.getItem('backgroundColor');
    if (savedColor) {
        let elements = document.getElementsByClassName('uniqueColor');
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = savedColor;
        }
    }
}

// ドキュメントが読み込まれたときに色を適用
document.addEventListener('DOMContentLoaded', function () {
    applySavedColor();
});













