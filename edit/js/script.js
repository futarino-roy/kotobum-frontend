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


 
let currentContentId = null;

// new
let activeButton = null;

const toggleDrawer = () => {
    const drawer = document.getElementById('drawer');
    const content = document.getElementById('content');
    const sidebar = document.getElementById('sidebar');

    drawer.classList.toggle('open');
    sidebar.classList.toggle('open');
    content.classList.toggle('open');

    if (!drawer.classList.contains('open')) {
        currentContentId = null; // ドロワーが閉じたときにcurrentContentIdをリセット

        // new
        if (activeButton) {
            activeButton.classList.remove('active'); // 選択されたボタンからactiveクラスを削除
            activeButton = null;
        }
    }

};

const showDrawerContent = (contentId) => {
    const drawerContent = document.getElementById('drawer-content');
    const contentElement = document.getElementById(contentId);

    // new
    const clickedButton = document.querySelector(`[date-content-id="${contentId}"]`);

    if (!contentElement) {
        console.error(`Content element with ID '${contentId}' not found.`);
        return;
    }

    if (contentId === currentContentId && drawer.classList.contains('open')) {
        // 同じボタンをクリックしてドロワーが開いている場合、閉じる
        toggleDrawer();
        return;
    }

    // 全てのコンテンツを非表示にする
    const allContentItems = document.querySelectorAll('.edit_drawer_container_item');
    allContentItems.forEach(item => {
        item.style.display = 'none';
    });

    // 選択されたコンテンツを表示する
    contentElement.style.display = 'block';


    // ボタンのスタイルを更新 new
    if (activeButton) {
        activeButton.classList.remove('active'); // 以前のボタンからactiveクラスを削除
    }
    if (clickedButton) {
        clickedButton.classList.add('active'); // クリックされたボタンにactiveクラスを追加
        activeButton = clickedButton; // 現在のアクティブボタンを更新
    }



    currentContentId = contentId;

    if (!drawer.classList.contains('open')) {
        toggleDrawer(); // ドロワーが閉じている場合は開く
    }
};

 



// 1の進化系の進化系
let selectedImage = null;

function loadImage(input) {
    const imgPreviewField = document.getElementById('imgPreviewField');
    if (input.files) {
        const files = Array.from(input.files);
        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.left = '0px';
                img.style.top = '0px';

                imgPreviewField.appendChild(img);
                makeDraggable(img);
                makeSelectable(img);
            }

            reader.readAsDataURL(file);
        });
    }
}

function makeDraggable(img) {
    let isDragging = false;
    let startX, startY, initialX, initialY;

    function onMouseDown(e) {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialX = parseFloat(img.style.left) || 0;
        initialY = parseFloat(img.style.top) || 0;
        img.style.cursor = 'grabbing';
    }

    function onMouseMove(e) {
        if (isDragging) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            img.style.left = (initialX + dx) + 'px';
            img.style.top = (initialY + dy) + 'px';
        }
    }

    function onMouseUp() {
        isDragging = false;
        img.style.cursor = 'grab';
    }

    function onTouchStart(e) {
        if (e.touches.length === 1) {
            isDragging = true;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            initialX = parseFloat(img.style.left) || 0;
            initialY = parseFloat(img.style.top) || 0;
        }
    }

    function onTouchMove(e) {
        if (isDragging && e.touches.length === 1) {
            const dx = e.touches[0].clientX - startX;
            const dy = e.touches[0].clientY - startY;
            img.style.left = (initialX + dx) + 'px';
            img.style.top = (initialY + dy) + 'px';
        }
    }

    function onTouchEnd() {
        isDragging = false;
    }

    img.addEventListener('mousedown', onMouseDown);
    img.addEventListener('mousemove', onMouseMove);
    img.addEventListener('mouseup', onMouseUp);
    img.addEventListener('mouseleave', onMouseUp);

    img.addEventListener('touchstart', onTouchStart);
    img.addEventListener('touchmove', onTouchMove);
    img.addEventListener('touchend', onTouchEnd);
}

function makeSelectable(img) {
    img.addEventListener('click', function() {
        const allImgs = document.querySelectorAll('#imgPreviewField img');
        allImgs.forEach(image => {
            image.classList.remove('selected');
        });
        img.classList.add('selected');
        selectedImage = img;
    });
}

function addClickListenerToDropAreas() {
    const dropArea = document.getElementById('dropArea');
    const dropArea2 = document.getElementById('dropArea2');
    
    dropArea.addEventListener('click', function() {
        if (selectedImage) {
            insertImageToDropArea(this);
        }
    });

    dropArea2.addEventListener('click', function() {
        if (selectedImage) {
            insertImageToDropArea(this);
        }
    });
}

function insertImageToDropArea(dropArea) {
    dropArea.innerHTML = '';

    const newImage = document.createElement('img');
    newImage.src = selectedImage.src;
    newImage.style.width = '100%';
    newImage.style.height = '100%';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '削除';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function(e) {
        e.stopPropagation();
        dropArea.innerHTML = '';
    });

    const cropButton = document.createElement('button');
    cropButton.textContent = 'トリミング';
    cropButton.classList.add('crop-button');
    cropButton.addEventListener('click', function(e) {
        e.stopPropagation();
        openCroppieModal(dropArea);
    });

    dropArea.appendChild(newImage);
    dropArea.appendChild(deleteButton);
    dropArea.appendChild(cropButton);
    dropArea.classList.add('with-buttons');

    selectedImage.classList.remove('selected');
    selectedImage = null;
}

function openCroppieModal(container) {
    const croppieModal = document.getElementById('croppieModal');
    const croppieContainer = document.getElementById('croppie-container');

    let croppieInstance;
    if (croppieInstance) {
        croppieInstance.destroy();
    }

    croppieInstance = new Croppie(croppieContainer, {
        viewport: { width: 200, height: 200 },
        boundary: { width: 300, height: 300 },
        showZoomer: true,
        enableResize: false
    });

    const img = container.querySelector('img');
    croppieInstance.bind({
        url: img.src
    });

    croppieModal.style.display = 'block';

    document.getElementById('crop-button').onclick = function() {
        croppieInstance.result({
             type: 'canvas', 
             size: 'original',
             format: 'png' ,
             quality:1
        }).then(function(croppedImage) {
            img.src = croppedImage;
            croppieModal.style.display = 'none';
        });
    };

    document.getElementById('close-button').onclick = function() {
        croppieModal.style.display = 'none';
    };
}

document.addEventListener('click', function(event) {
    const isInsideDropArea = event.target.closest('.with-buttons');

    if (!isInsideDropArea) {
        const dropAreas = document.querySelectorAll('.with-buttons');
        dropAreas.forEach(dropArea => {
            const cropButton = dropArea.querySelector('.crop-button');
            const deleteButton = dropArea.querySelector('.delete-button');
            
            if (cropButton && deleteButton) {
                cropButton.style.display = 'none';
                deleteButton.style.display = 'none';
            }
        });
    } else {
        const cropButton = isInsideDropArea.querySelector('.crop-button');
        const deleteButton = isInsideDropArea.querySelector('.delete-button');
        
        if (cropButton && deleteButton) {
            cropButton.style.display = 'block';
            deleteButton.style.display = 'block';
        }
    }
});

addClickListenerToDropAreas();



// 上の保存版


























// inputボタンのデザイン
document.getElementById('frontButton').addEventListener('click', function() {
    document.getElementById('backInput').click();
});






// ドラッグ＆ドロップ処理
// ドラッグオーバー時の処理
function handleDragOver(event) {
    event.preventDefault();
    this.style.backgroundColor = "#d0f0c0"; // ドラッグ中の背景色変更
}

// ドラッグが離れたときの処理
function handleDragLeave(event) {
    this.style.backgroundColor = "transparent"; // ドラッグが離れたときの背景色リセット
}

// ドロップ時の処理
function handleDrop(event) {
    event.preventDefault();
    this.style.backgroundColor = "transparent";

    const files = event.dataTransfer.files;
    if (files.length > 0) {
        let file = files[0];
        let fileReader = new FileReader();
        fileReader.onload = function (e) {
            this.innerHTML = ""; // 既存の内容をクリア
            let img = new Image();
            img.src = e.target.result; // 画像データURLを設定
            img.classList.add("draggable-image"); // 画像にクラスを追加
            img.onclick = function () {
                showButtons(this.parentNode); // 画像がクリックされたときにボタンを表示
            };
            this.appendChild(img);
            addButtons(this); // 削除ボタンとトリミングボタンを追加

            // ローカルストレージに画像データを保存
            saveImageToLocalStorage(e.target.result, this.id);
        }.bind(this);
        fileReader.readAsDataURL(file); // ドロップされたファイルをデータURLに変換
    }
}

// タッチエンド時の処理
function handleTouchDrop(event) {
    event.preventDefault();
    const touch = event.changedTouches[0];
    const dropArea = document.elementFromPoint(touch.clientX, touch.clientY);

    if (dropArea && dropArea.classList.contains("empty")) {
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            let file = files[0];
            let fileReader = new FileReader();
            fileReader.onload = function (e) {
                dropArea.innerHTML = ""; // 既存の内容をクリア
                let img = new Image();
                img.src = e.target.result; // 画像データURLを設定
                dropArea.appendChild(img);
                addButtons(dropArea); // 削除ボタンとトリミングボタンを追加

                // ローカルストレージに画像データを保存
                saveImageToLocalStorage(e.target.result, dropArea.id);
            };
            fileReader.readAsDataURL(file); // ドロップされたファイルをデータURLに変換
        }
    }
}

// 削除ボタンとトリミングボタンの追加
function addButtons(container) {
    // 削除ボタンが既に存在するか確認
    if (!container.querySelector(".delete-btn")) {
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.textContent = "×";
        deleteButton.onclick = function () {
            container.innerHTML = ""; // 画像を削除
            container.classList.remove("selected"); // 選択状態を解除
            container.style.backgroundColor = "transparent"; // 背景色をリセット
            hideButtons(); // ボタンを非表示にする

            // ローカルストレージから画像データを削除
            clearImageFromLocalStorage(container.id);
        };
        container.appendChild(deleteButton);
    }

    // トリミングボタンが既に存在するか確認
    if (!container.querySelector(".crop-btn")) {
        let cropButton = document.createElement("button");
        cropButton.classList.add("crop-btn");
        cropButton.textContent = "ト";
        cropButton.onclick = function (event) {
            event.stopPropagation(); // クリックイベントのバブリングを防ぐ
            openCroppieModal(container); // トリミングモーダルを開く関数
        };
        container.appendChild(cropButton);
    }
}

// ボタンを表示する関数
function showButtons(container) {
    container.querySelectorAll(".delete-btn, .crop-btn").forEach(button => button.style.display = "flex");
}

// ボタンを非表示にする関数
function hideButtons() {
    document.querySelectorAll(".delete-btn, .crop-btn").forEach(button => button.style.display = "none");
}

// トリミングモーダル処理
let croppieInstance; // Croppie インスタンスを保持

function openCroppieModal(container) {
    const croppieModal = document.getElementById('croppieModal');
    const croppieContainer = document.getElementById('croppie-container');
    croppieModal.style.display = 'block';

    // Croppieの設定
    if (croppieInstance) {
        croppieInstance.destroy(); // 既存のインスタンスを破棄
    }

    croppieInstance = new Croppie(croppieContainer, {
        viewport: { width: 200, height: 200 },
        boundary: { width: 300, height: 300 },
        showZoomer: true,
        enableResize: false
    });

    const img = container.querySelector('img');
    croppieInstance.bind({
        url: img.src
    });

    // トリミングボタンのイベント
    document.getElementById('crop-button').onclick = function () {
        croppieInstance.result({
            type: 'canvas',
            size: 'original',
            format: 'png',
            quality: 1
        }).then(function (croppedImage) {
            container.querySelector('img').src = croppedImage; // トリミング後の画像を更新
            croppieModal.style.display = 'none'; // モーダルを閉じる

            // トリミング後の画像データをローカルストレージに保存
            saveImageToLocalStorage(croppedImage, container.id);
        });
    };

    // 閉じるボタンのイベント
    document.getElementById('close-button').onclick = function () {
        croppieModal.style.display = 'none'; // モーダルを閉じる
    };
}

// 画像のクリックイベント処理
function handleElementClick(event) {
    if (event.target.classList.contains('draggable-image')) {
        // 画像がクリックされた場合、ボタンを表示
        showButtons(event.target.parentNode);
        return;
    }

    if (event.target.classList.contains('delete-btn') || event.target.classList.contains('crop-btn')) {
        // 削除ボタンやトリミングボタンがクリックされた場合の処理
        return;
    }

    // その他のクリック時の処理
    hideButtons(); // 画像以外をクリックした場合にボタンを非表示にする
}

// ローカルストレージに画像データを保存
function saveImageToLocalStorage(imageData, containerId) {
    localStorage.setItem(`image_${containerId}`, imageData);
}

// ローカルストレージから画像データを取得
function loadImageFromLocalStorage(containerId) {
    return localStorage.getItem(`image_${containerId}`);
}

// ローカルストレージから画像データを削除
function clearImageFromLocalStorage(containerId) {
    localStorage.removeItem(`image_${containerId}`);
}

// サーバーに画像データを保存する関数
function saveImageToServer(imageData, containerId) {
    fetch('/save-image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image: imageData, id: containerId })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Image saved to server:', data);
    })
    .catch(error => {
        console.error('Error saving image to server:', error);
    });
}

// ドキュメントが読み込まれた後の処理
document.addEventListener("DOMContentLoaded", function () {
    const emptyElements = document.querySelectorAll(".empty");

    emptyElements.forEach(function (dropArea) {
        dropArea.addEventListener("dragover", handleDragOver); // ドラッグオーバー時の処理
        dropArea.addEventListener("dragleave", handleDragLeave); // ドラッグが離れたときの処理
        dropArea.addEventListener("drop", handleDrop); // ドロップ時の処理
        dropArea.addEventListener("touchstart", function (event) {
            event.preventDefault(); // タッチスタート時の処理（デフォルトの動作を防ぐ）
        }, { passive: false });
        dropArea.addEventListener("touchend", handleTouchDrop, { passive: false }); // タッチエンド時の処理
        dropArea.addEventListener("click", handleElementClick); // クリック時の処理
    });

    // ページが読み込まれたときにローカルストレージから画像を復元
    emptyElements.forEach(function(dropArea) {
        const imageData = loadImageFromLocalStorage(dropArea.id);
        if (imageData) {
            dropArea.innerHTML = ""; // 既存の内容をクリア
            let img = new Image();
            img.src = imageData; // 画像データURLを設定
            img.classList.add("draggable-image");
            img.onclick = function() {
                showButtons(this.parentNode); // 画像がクリックされたときにボタンを表示
            };
            dropArea.appendChild(img);
            addButtons(dropArea); // 削除ボタンとトリミングボタンを追加
        }
    });

    // ドキュメント全体をクリックしたときにボタンを非表示にする
    document.addEventListener("click", function(event) {
        if (!event.target.classList.contains('delete-btn') &&
            !event.target.classList.contains('crop-btn') &&
            !event.target.classList.contains('draggable-image') &&
            !event.target.classList.contains('empty')) {
            hideButtons();
        }
    });

    // 保存ボタンにクリックイベントリスナーを追加
    document.querySelector(".btn-E").addEventListener("click", function() {
        emptyElements.forEach(function(dropArea) {
            const imageData = loadImageFromLocalStorage(dropArea.id);
            if (imageData) {
                // ローカルストレージに画像データが保存されている場合
                saveImageToServer(imageData, dropArea.id); // サーバーに画像データを送信
            }
        });
        alert("画像データがサーバーに保存されました。");
    });
});




document.addEventListener("DOMContentLoaded", function() {
    // プレビューボタンにクリックイベントリスナーを追加
    document.querySelector(".btn-preview").addEventListener("click", function() {
        window.location.href = "../preview/index.html"; // プレビューページに遷移
    });
});













// テキストエリアの内容をローカルストレージに保存する関数
function saveTextToLocalStorage() {
    const textArea1 = document.getElementById('textArea');
    const textArea2 = document.getElementById('textArea2');

    localStorage.setItem('textArea1', textArea1.value);
    localStorage.setItem('textArea2', textArea2.value);
}

// テキストエリアの内容をローカルストレージから読み込む関数
function loadTextFromLocalStorage() {
    const textArea1 = document.getElementById('textArea');
    const textArea2 = document.getElementById('textArea2');

    textArea1.value = localStorage.getItem('textArea1') || '';
    textArea2.value = localStorage.getItem('textArea2') || '';
}

// テキストエリアの内容をサーバーに送信する関数
function saveTextToServer() {
    const textArea1 = document.getElementById('textArea').value;
    const textArea2 = document.getElementById('textArea2').value;

    fetch('/save-text', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text1: textArea1, text2: textArea2 })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Text saved to server:', data);
        alert("テキストデータがサーバーに保存されました。");
    })
    .catch(error => {
        console.error('Error saving text to server:', error);
    });
}

// テキストエリアの最大文字数を制限する関数
function enforceMaxLength(textarea, maxLength) {
    textarea.addEventListener('input', function () {
        // 入力された文字列を取得
        const value = this.value;

        // 現在の文字列の長さを計算
        const currentLength = Array.from(value).length;

        // 最大文字数を超えた場合はカットする
        if (currentLength > maxLength) {
            this.value = Array.from(value).slice(0, maxLength).join('');
        }

        adjustHeight(this);
        saveTextToLocalStorage(); // ローカルストレージに保存
    });

    // 高さ調整関数
    function adjustHeight(textarea) {
        textarea.style.height = 'auto'; // 高さをリセットしてから
        textarea.style.height = `${textarea.scrollHeight}px`; // 内容に応じて高さを調整
    }

    // 初期読み込み時にも調整
    adjustHeight(textarea);
}

// 最大文字数を設定
const maxLength = 20; // 変更したい場合はここで設定

const textareas = document.querySelectorAll('#textArea, #textArea2');

textareas.forEach(textarea => {
    enforceMaxLength(textarea, maxLength);
});

// ドキュメントが読み込まれたときにローカルストレージからテキストを復元
document.addEventListener("DOMContentLoaded", function () {
    loadTextFromLocalStorage();

    // 保存ボタンにクリックイベントリスナーを追加
    document.querySelector(".btn-E").addEventListener("click", function() {
        // 画像データの保存処理
        emptyElements.forEach(function(dropArea) {
            const imageData = loadImageFromLocalStorage(dropArea.id);
            if (imageData) {
                saveImageToServer(imageData, dropArea.id); // サーバーに画像データを送信
            }
        });

        // テキストデータの保存処理
        saveTextToServer();
    });
});











  
// 先に変えたい枠から選ぶパターン タッチ
document.addEventListener('DOMContentLoaded', () => {
    const dropArea1 = document.getElementById('dropArea');
    const dropArea2 = document.getElementById('dropArea2');
    const resizeButtons = document.querySelectorAll('.resizeButton');
    const saveButton = document.querySelector('.btn-E');
    let activeDropArea = null;

    // ドロップエリアがクリックまたはタッチされたときの処理
    const handleDropAreaInteraction = (dropArea) => {
        dropArea1.classList.remove('active');
        dropArea2.classList.remove('active');
        dropArea.classList.add('active');
        activeDropArea = dropArea;
    };

    dropArea1.addEventListener('pointerdown', () => handleDropAreaInteraction(dropArea1));
    dropArea2.addEventListener('pointerdown', () => handleDropAreaInteraction(dropArea2));

    // サイズ変更ボタンがクリックまたはタッチされたときの処理
    const handleResizeButtonInteraction = (button) => {
        if (activeDropArea) {
            // サイズをすべてリセット
            activeDropArea.classList.remove('square', 'rectangle', 'mini');
            // ボタンの data-size 属性に基づいてサイズを変更
            const size = button.getAttribute('data-size');
            activeDropArea.classList.add(size);

            // サイズ情報をローカルストレージに保存
            localStorage.setItem('dropAreaSize', size);
        }
    };

    resizeButtons.forEach(button => {
        button.addEventListener('pointerdown', () => handleResizeButtonInteraction(button));
    });

    // 保存ボタンがクリックされたときの処理
    saveButton.addEventListener('click', () => {
        if (activeDropArea) {
            const size = localStorage.getItem('dropAreaSize');

            // サーバにサイズ情報を送信
            fetch('/save-size', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    dropAreaId: activeDropArea.id,
                    size: size
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('成功:', data);
            })
            .catch(error => {
                console.error('エラー:', error);
            });
        }
    });

    // ページロード時にローカルストレージからサイズを復元
    const savedSize = localStorage.getItem('dropAreaSize');
    if (savedSize) {
        dropArea1.classList.add(savedSize);
        dropArea2.classList.add(savedSize);
    }
});




//   color
// 色変更処理
function changeColor(color) {
    let elements = document.getElementsByClassName('uniqueColor');
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = color;
    }

    // 色をローカルストレージに保存
    localStorage.setItem('backgroundColor', color);
}

// ページ読み込み時にローカルストレージから色を取得して適用する
document.addEventListener('DOMContentLoaded', function () {
    const savedColor = localStorage.getItem('backgroundColor');
    if (savedColor) {
        changeColor(savedColor);
    }
});

// 保存ボタンのクリックイベント設定
document.querySelector('.btn-E').addEventListener('click', function() {
    const color = localStorage.getItem('backgroundColor');
    
    if (color) {
        fetch('/saveColor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ color: color })
        })
        .then(response => response.json())
        .then(data => {
            console.log('色がサーバに保存されました:', data);
        })
        .catch(error => {
            console.error('保存中にエラーが発生しました:', error);
        });
    } else {
        console.log('保存する色が設定されていません。');
    }
});













// function previewSlides() {
//     // スライド1の内容を取得
//     const text1 = document.getElementById('textArea').value;
//     // スライド2の内容を取得
//     const text2 = document.getElementById('textArea2').value;

//     // ストレージに保存 (例: sessionStorage)
//     sessionStorage.setItem('slide1Text', text1);
//     sessionStorage.setItem('slide2Text', text2);

//     // プレビューページに遷移 (URLを設定)
//     window.location.href = '../preview/index.html';
// }

