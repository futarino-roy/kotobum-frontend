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
let initialData = {}; // テキストエリアの初期値を保存するオブジェクト
let isSaved = true; // データが保存済みかどうかを示すフラグ

// ページ読み込み時にデータを保存(初期データ)
document.addEventListener('DOMContentLoaded', function () {
    const textAreas = document.querySelectorAll('textarea');
    textAreas.forEach(textarea => {
        initialData[textarea.id] = textarea.value;
        console.log('データを保存しました')
    });
});

// テキストエリアに変更があれば未保存のフラグを設定
document.querySelectorAll('textarea').forEach(textarea => {
    textarea.addEventListener('input', () => {
        isSaved = checkSave();
    });
});

// 初期データと比較して変更されているか確認する関数
function checkSave() {
    const textAreas = document.querySelectorAll('textarea');
    return Array.from(textAreas).every(textarea => {
        return textarea.value === initialData[textarea.id];
    });
}

// 保存ボタンをクリック時に保存状態を更新
const saveBtn = document.getElementById('sendButton');
if (saveBtn) {
    saveBtn.addEventListener('click', function () {
        isSaved = true;
        const textAreas = document.querySelectorAll('textarea');
        textAreas.forEach(textarea => {
            initialData[textarea.id] = textarea.value;
        });
        console.log("保存内容が保存されました");
    });
} else {
    console.warn('Save button with ID "saveButton" not found.');
}

// ページを離れるときに保存されていない場合は警告を表示
window.addEventListener('beforeunload', function (event) {
    if (!isSaved) {
        event.returnValue = '内容が保存されていません＞＜'; // ブラウザがデフォルトの警告メッセージを表示
    }
});

// メインのスライドからプレビュー
document.addEventListener("DOMContentLoaded", function () {
    // プレビューボタンにクリックイベントリスナーを追加
    document.querySelector(".btn-preview").addEventListener("click", function () {
        // 現在のスライドインデックスを取得
        const currentSlideIndex = swiper.realIndex;

        // プレビューページのURLを動的に設定
        const previewUrl = `../coverB-preview/index.html?slide=${currentSlideIndex + 1
            }`;

        // プレビューページに遷移
        window.location.href = previewUrl;
    });
});

// プレビューのスライドからメイン
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const slideNumber = urlParams.get("slide");

    if (slideNumber) {
        swiper.slideTo(slideNumber - 1, 0); // スライド番号に対応するインデックスに移動
        console.log(`Returning to slide ${slideNumber} in the main page`);
    }
});

// inputボタンのデザイン
document.getElementById("frontButton").addEventListener("click", function () {
    document.getElementById("backInput").click();
});

//  ドロワー
let currentContentId = null;
let activeButton = null;

const toggleDrawer = () => {
    const drawer = document.getElementById("drawer");
    const content = document.getElementById("content");
    const sidebar = document.getElementById("sidebar");

    drawer.classList.toggle("open");
    sidebar.classList.toggle("open");
    content.classList.toggle("open");

    if (!drawer.classList.contains("open")) {
        currentContentId = null;

        if (activeButton) {
            activeButton.classList.remove("active");
            activeButton = null;
        }
    }
};

const showDrawerContent = (contentId) => {
    const drawerContent = document.getElementById("drawer-content");
    const contentElement = document.getElementById(contentId);

    const clickedButton = document.querySelector(
        `[date-content-id="${contentId}"]`
    );

    if (!contentElement) {
        console.error(`Content element with ID '${contentId}' not found.`);
        return;
    }

    if (contentId === currentContentId && drawer.classList.contains("open")) {
        toggleDrawer();
        return;
    }

    // 全てのコンテンツを非表示にする
    const allContentItems = document.querySelectorAll(
        ".edit_drawer_container_item"
    );
    allContentItems.forEach((item) => {
        item.style.display = "none";
    });

    // 選択されたコンテンツを表示する
    contentElement.style.display = "block";

    // ボタンのスタイルを更新 new
    if (activeButton) {
        activeButton.classList.remove("active"); // 以前のボタンからactiveクラスを削除
    }
    if (clickedButton) {
        clickedButton.classList.add("active"); // クリックされたボタンにactiveクラスを追加
        activeButton = clickedButton; // 現在のアクティブボタンを更新
    }

    currentContentId = contentId;

    if (!drawer.classList.contains("open")) {
        toggleDrawer(); // ドロワーが閉じている場合は開く
    }
};

// 画像のアップロードと挿入
let selectedImage = null;

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function () {
    addTouchListenerToDropAreas();
    document.getElementById('saveButton').addEventListener('click', function () {
        // サーバに画像を送信する処理は削除済み
    });
});

function loadImage(input) {
    const imgPreviewField = document.getElementById('imgPreviewField');
    if (input.files) {
        const files = Array.from(input.files);
        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = function (e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.left = '0px';
                img.style.top = '0px';

                imgPreviewField.appendChild(img);
                makeDraggable(img);
                makeTouchable(img);
            };

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

function makeTouchable(img) {
    img.addEventListener('click', function () {
        const allImgs = document.querySelectorAll('#imgPreviewField img');
        allImgs.forEach(image => {
            image.classList.remove('selected');
        });
        img.classList.add('selected');
        selectedImage = img;
    });

    img.addEventListener('touchstart', function (e) {
        e.preventDefault();
        const allImgs = document.querySelectorAll('#imgPreviewField img');
        allImgs.forEach(image => {
            image.classList.remove('selected');
        });
        img.classList.add('selected');
        selectedImage = img;
    });
}

function addTouchListenerToDropAreas() {
    const dropAreas = document.querySelectorAll('.empty');
    dropAreas.forEach(dropArea => {
        dropArea.addEventListener('touchstart', function (e) {
            e.preventDefault();
            if (selectedImage) {
                console.log('Selected image:', selectedImage);
                insertImageToDropArea(this);
            }
        });

        dropArea.addEventListener('click', function (e) {
            e.preventDefault();
            if (selectedImage) {
                console.log('Selected image:', selectedImage);
                insertImageToDropArea(this);
            } else {
                // 画像以外のクリックの場合はボタンを非表示
                document.querySelectorAll('.empty.with-buttons').forEach(area => {
                    area.classList.add('hide-buttons');
                });
            }
            // クリックされたドロップエリアのボタンを表示する
            this.classList.remove('hide-buttons');
        });
    });
}

function insertImageToDropArea(dropArea) {
    if (!selectedImage) {
        console.log('No image selected');
        return;
    }

    dropArea.innerHTML = '';

    const newImage = document.createElement('img');
    newImage.src = selectedImage.src;
    newImage.style.width = '100%';
    newImage.style.height = '100%';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function (e) {
        e.stopPropagation();
        dropArea.innerHTML = '';
    });

    const cropButton = document.createElement('button');
    cropButton.classList.add('crop-button');
    cropButton.addEventListener('click', function (e) {
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

// ドキュメント内でクリックしたときの処理
document.addEventListener('click', function (e) {
    const allDropAreas = document.querySelectorAll('.empty.with-buttons');
    if (!e.target.closest('.empty.with-buttons')) {
        allDropAreas.forEach(dropArea => {
            dropArea.classList.add('hide-buttons');
        });
    }
});

function openCroppieModal(dropArea) {
    // Croppieモーダルの表示処理
    console.log('Croppie modal open for drop area:', dropArea);
}

// ドラッグオーバー時の処理
function handleDragOver(event) {
    event.preventDefault();
    this.style.backgroundColor = "#d0f0c0"; // ドラッグ中の背景色変更
}

// ドラッグが離れたときの処理
function handleDragLeave(event) {
    this.style.backgroundColor = "transparent"; // ドラッグが離れたときの背景色リセット
}

// 画像をロードする（IndexedDBを削除したため空の関数に）
function loadAllImages() { }

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
            };
            fileReader.readAsDataURL(file); // ドロップされたファイルをデータURLに変換
        }
    }
}

// 削除ボタンとトリミングボタンの追加
function addButtons(container) {
    if (!container.querySelector(".delete-btn")) {
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.textContent = ""; // ボタンのテキストを設定
        deleteButton.onclick = function () {
            container.innerHTML = ""; // 画像を削除
            container.classList.remove("selected"); // 選択状態を解除
            container.style.backgroundColor = "transparent"; // 背景色をリセット
            hideButtons(); // ボタンを非表示にする
        };
        container.appendChild(deleteButton);
    }

    if (!container.querySelector(".crop-btn")) {
        let cropButton = document.createElement("button");
        cropButton.classList.add("crop-btn");
        cropButton.textContent = ""; // ボタンのテキストを設定
        cropButton.onclick = function (event) {
            event.stopPropagation(); // クリックイベントのバブリングを防ぐ
            openCroppieModal(container); // トリミングモーダルを開く関数
        };
        container.appendChild(cropButton);
    }
}

// ボタンを表示する関数
function showButtons(container) {
    container
        .querySelectorAll(".delete-btn, .crop-btn")
        .forEach((button) => (button.style.display = "flex"));
}

// ボタンを非表示にする関数
function hideButtons() {
    document
        .querySelectorAll(".delete-btn, .crop-btn")
        .forEach((button) => (button.style.display = "none"));
}

// トリミングモーダル処理
let croppieInstance;

function openCroppieModal(container) {
    const croppieModal = document.getElementById("croppieModal");
    const croppieContainer = document.getElementById("croppie-container");
    croppieModal.style.display = "block";

    if (croppieInstance) {
        croppieInstance.destroy();
    }

    croppieInstance = new Croppie(croppieContainer, {
        viewport: { width: 200, height: 200 },
        boundary: { width: 300, height: 300 },
        showZoomer: true,
        enableResize: false,
    });

    const img = container.querySelector("img");
    croppieInstance.bind({
        url: img.src,
    });

    document.getElementById("crop-button").onclick = function () {
        croppieInstance
            .result({
                type: "canvas",
                size: "original",
                format: "png",
                quality: 1,
            })
            .then(function (croppedImageData) {
                container.querySelector("img").src = croppedImageData;
                croppieModal.style.display = "none";
            });
    };
}

// 初期化処理
document.addEventListener("DOMContentLoaded", function () {
    const dropAreas = document.querySelectorAll(".empty");
    dropAreas.forEach(function (dropArea) {
        dropArea.ondragover = handleDragOver;
        dropArea.ondragleave = handleDragLeave;
        dropArea.ondrop = handleDrop;
        dropArea.ontouchend = handleTouchDrop;
    });

    document.getElementById("cancel-button").onclick = function () {
        document.getElementById("croppieModal").style.display = "none";
    };

    document.addEventListener("click", function (event) {
        if (!event.target.closest(".delete-btn, .crop-btn, .draggable-image")) {
            hideButtons();
        }
    });
});

// テキストエリアの内容の保存と高さと幅を自動調整
function saveText() {
    document.querySelectorAll(".text-empty").forEach((textArea) => {
        const id = textArea.id;
    });
}

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

// ドキュメント読み込み時の処理
document.addEventListener("DOMContentLoaded", function () {
    // テキストエリアごとに必要な処理を実行
    document.querySelectorAll(".text-empty").forEach((textarea) => {
        enforceNoMaxLength(textarea);
    });

    // ロード後に高さ調整を行う
    setTimeout(() => {
        document
            .querySelectorAll(".text-empty")
            .forEach((textarea) => adjustHeight(textarea));
    }, 100);
});

// テキストエリア枠の削除
document.addEventListener('DOMContentLoaded', function () {
    const textEmptys = document.querySelectorAll('.text-empty');
    function updateBorders() {
        textEmptys.forEach((textEmpty) => {
            if (textEmpty.value.trim() === '') {
                textEmpty.classList.remove('no-border');
            } else {
                textEmpty.classList.add('no-border');
            }
        });
    }
    textEmptys.forEach((textEmpty) => {
        textEmpty.addEventListener('input', updateBorders);
    });
    updateBorders();
});

//-------------------------追加-----------------------------
document.addEventListener('DOMContentLoaded', function () {
    const textAreas = document.querySelectorAll('.text-size');

    function adjustLineHeight(textArea) {
        const textAreaHeight = textArea.clientHeight;
        const fontSize = parseFloat(window.getComputedStyle(textArea).fontSize);
        const lineHeight = textAreaHeight / fontSize;
        textArea.style.lineHeight = lineHeight;
    }

    function adjustLineHeightForAll() {
        textAreas.forEach(textArea => {
            adjustLineHeight(textArea);
        });
    }

    window.addEventListener('load', adjustLineHeightForAll);

    textAreas.forEach(textArea => {
        textArea.addEventListener('input', function () {
            this.style.height = '';
            adjustLineHeight(this);
        });

        textArea.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                adjustLineHeight(this);
            }
        });
    });

    window.addEventListener('resize', adjustLineHeightForAll);

    function remToPx(rem) {
        return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    }

    textAreas.forEach(textArea => {
        const maxFontSizeRem = 0.9;
        const minFontSizeRem = 0.5;

        function adjustFontSize() {
            let fontSizeRem = maxFontSizeRem;
            textArea.style.fontSize = `${fontSizeRem}rem`;

            while (textArea.scrollWidth > textArea.clientWidth && fontSizeRem > minFontSizeRem) {
                fontSizeRem -= 0.05;
                textArea.style.fontSize = `${fontSizeRem}rem`;
            }
        }

        textArea.addEventListener('input', function () {
            adjustFontSize();
        });

        if (textArea.value.trim() !== '') {
            adjustFontSize();
        }
    });
});
//------------------------ここまで----------------------------

// 枠変更 12-~3変更できない版
document.addEventListener("DOMContentLoaded", () => {
    const dropAreas = [];
    const resizeButtons = document.querySelectorAll(".resizeButton");
    let activeDropArea = null;

    document.querySelectorAll('[id^="dropArea"]').forEach((dropArea) => {
        dropAreas.push(dropArea);
        dropArea.addEventListener("pointerdown", () =>
            handleDropAreaInteraction(dropArea)
        );
    });

    const handleDropAreaInteraction = (dropArea) => {
        dropAreas.forEach((area) => area.classList.remove("active"));
        dropArea.classList.add("active");
        activeDropArea = dropArea;
    };

    const handleResizeButtonInteraction = (button) => {
        if (activeDropArea) {
            const restrictedDropAreas = [
                "dropArea12-1",
                "dropArea12-2",
                "dropArea12-3",
            ];

            if (!restrictedDropAreas.includes(activeDropArea.id)) {
                activeDropArea.classList.remove("square", "rectangle", "mini");
                const size = button.getAttribute("data-size");
                activeDropArea.classList.add(size);
            }
        }
    };

    resizeButtons.forEach((button) => {
        button.addEventListener("pointerdown", () =>
            handleResizeButtonInteraction(button)
        );
    });
});

// 背景色とテキストの色の変更
function changeColor(color) {
    let elements = document.getElementsByClassName("uniqueColorB");
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = color;
    }

    let textElements = document.getElementsByClassName("text-colorB");
    for (let i = 0; i < textElements.length; i++) {
        textElements[i].style.color = color;
    }
}
