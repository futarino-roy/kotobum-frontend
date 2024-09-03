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



// // 戻るボタンのクリックイベントリスナー
// document.getElementById('editBack').addEventListener('click', function() {
//     window.history.back();
// });

// プレビューからメイン
document.getElementById('editBack').addEventListener('click', function() {
    const currentSlideIndex = swiper.realIndex;  // 現在のスライドインデックスを取得
    const mainPageUrl = `../editB/index.html?slide=${currentSlideIndex + 1}`;  // スライド番号をクエリパラメータに追加
    window.location.href = mainPageUrl;  // メインページに遷移
});






// 画像の挿入 
document.addEventListener('DOMContentLoaded', function() {
    // 各 dropArea の画像を更新
    updateDropAreas();
});

function updateDropAreas() {
    // クラス 'empty' を持つすべての要素を取得
    const dropAreas = document.querySelectorAll('.empty');

    dropAreas.forEach((dropArea) => {
        const id = dropArea.id; // 各 dropArea の id を取得 (例: 'dropArea1', 'dropArea2' ...)
        const savedImageSrc = localStorage.getItem(id);
        
        if (savedImageSrc) {
            const img = document.createElement('img');
            img.src = savedImageSrc;
            dropArea.innerHTML = ''; // 現在の内容をクリア
            dropArea.appendChild(img);
            dropArea.classList.remove('empty');
        }
    });
}










// 画像のドラッグ
// ページが読み込まれたときの処理
// document.addEventListener("DOMContentLoaded", function() {
//     // ドロップエリアごとのコンテナを取得
//     const dropArea1Container = document.getElementById('dropArea');
//     const dropArea2Container = document.getElementById('dropArea2');

//     // ローカルストレージからドロップエリア1の画像データを取得して表示
//     const dropArea1ImageData = localStorage.getItem('image_dropArea');
//     if (dropArea1ImageData) {
//         const img1 = new Image();
//         img1.src = dropArea1ImageData;
//         img1.classList.add("image-preview");
//         dropArea1Container.appendChild(img1);
//     }

//     // ローカルストレージからドロップエリア2の画像データを取得して表示
//     const dropArea2ImageData = localStorage.getItem('image_dropArea2');
//     if (dropArea2ImageData) {
//         const img2 = new Image();
//         img2.src = dropArea2ImageData;
//         img2.classList.add("image-preview");
//         dropArea2Container.appendChild(img2);
//     }
// });



// 画像のドラッグ 柔軟版
document.addEventListener("DOMContentLoaded", function() {
    // すべてのドロップエリア要素を取得
    const dropAreas = document.querySelectorAll('[id^="dropArea"]');

    // 各ドロップエリアをループして処理
    dropAreas.forEach(function(dropAreaContainer) {
        // ドロップエリアのIDからローカルストレージのキーを生成
        const dropAreaId = dropAreaContainer.id;
        const imageData = localStorage.getItem(`image_${dropAreaId}`);

        if (imageData) {
            const img = new Image();
            img.src = imageData;
            img.classList.add("image-preview");
            dropAreaContainer.appendChild(img);
        }
    });
});










// 枠
// document.addEventListener("DOMContentLoaded", function() {
//     // ドロップエリアごとのコンテナを取得
//     const dropArea1Container = document.getElementById('dropArea');
//     const dropArea2Container = document.getElementById('dropArea2');

//     // 枠のサイズ変更処理
//     function applyBorders() {
//         // ローカルストレージからドロップエリア1の枠のサイズを取得して適用
//         const dropArea1Size = localStorage.getItem('dropAreaSize_dropArea');
//         if (dropArea1Size) {
//             dropArea1Container.classList.add(dropArea1Size);
//         }

//         // ローカルストレージからドロップエリア2の枠のサイズを取得して適用
//         const dropArea2Size = localStorage.getItem('dropAreaSize_dropArea2');
//         if (dropArea2Size) {
//             dropArea2Container.classList.add(dropArea2Size);
//         }
//     }

//     // 枠のサイズ変更を適用
//     applyBorders();
// });



// 枠24個版
document.addEventListener("DOMContentLoaded", function() {
    // 枠のサイズ変更処理
    function applyBorders() {
        // dropAreaを含む全ての要素を取得
        const dropAreas = document.querySelectorAll('[id^="dropArea"]');
        
        dropAreas.forEach(dropAreaContainer => {
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









// テキスト
// テキストエリアの高さを自動調整する関数
// function adjustTextareaHeight(textarea) {
//     textarea.style.height = 'auto'; // 高さをリセット
//     textarea.style.height = `${textarea.scrollHeight}px`; // 内容に応じて高さを調整
// }

// // プレビューページでテキストエリアにローカルストレージからテキストを表示する関数
// function loadTextForPreview() {
//     const textArea1 = document.getElementById('previewTextArea');
//     const textArea2 = document.getElementById('previewTextArea2');

//     textArea1.value = localStorage.getItem('textArea1') || '';
//     textArea2.value = localStorage.getItem('textArea2') || '';

//     // テキストエリアの高さを調整
//     adjustTextareaHeight(textArea1);
//     adjustTextareaHeight(textArea2);
// }

// // ドキュメントが読み込まれたときにテキストを表示
// document.addEventListener("DOMContentLoaded", function () {
//     loadTextForPreview();
// });





// テキスト
function adjustTextareaHeight(textarea) {
    textarea.style.height = 'auto'; // 高さをリセット
    textarea.style.height = `${textarea.scrollHeight}px`; // 内容に応じて高さを調整
}

// プレビューページでテキストエリアにローカルストレージからテキストを表示する関数
function loadTextForPreview() {
    // テキストエリアのIDが"previewTextArea"で始まるすべての要素を取得
    const textAreas = document.querySelectorAll('textarea[id^="previewTextArea"]');
    
    textAreas.forEach(textArea => {
        const index = textArea.id.replace('previewTextArea', ''); // IDからインデックスを取得
        textArea.value = localStorage.getItem(`textArea${index}`) || '';

        // テキストエリアの高さを調整
        adjustTextareaHeight(textArea);
    });
}

// ドキュメントが読み込まれたときにテキストを表示
document.addEventListener("DOMContentLoaded", function () {
    loadTextForPreview();
});





document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('textarea').forEach(textarea => {
        // ページロード時にテキストエリアの幅を調整
        adjustTextareaWidth(textarea);

        // 入力時にテキストエリアの幅を調整
        textarea.addEventListener('input', function () {
            adjustTextareaWidth(this);
        });
    });
});

function adjustTextareaWidth(textarea) {
    // 一時的に横幅を自動調整して、内容に合わせて適切な幅を取得
    textarea.style.width = 'auto';
    // スクロール幅を取得し、その幅に基づいてテキストエリアの幅を調整
    const scrollWidth = textarea.scrollWidth;
    textarea.style.width = scrollWidth + 'px';
}










// 色変更
// プレビューページで色を適用する関数
function applySavedColor() {
    const savedColor = localStorage.getItem('backgroundColorB');
    if (savedColor) {
        // 背景色を適用
        let elements = document.getElementsByClassName('uniqueColorB');
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = savedColor;
        }
        
        // テキスト色を適用
        let textElements = document.getElementsByClassName('text-colorB');
        for (let i = 0; i < textElements.length; i++) {
            textElements[i].style.color = savedColor;
        }
    }
}

// ドキュメントが読み込まれたときに色を適用
document.addEventListener('DOMContentLoaded', function () {
    applySavedColor();
});














