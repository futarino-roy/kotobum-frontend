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

 








 

// グローバル変数
// let key = 0; // 画像のIDを管理するカウンタ
// let croppieInstance = null; // Croppieのインスタンス

// // // 画像のアップロード処理
// function loadImage(obj) {
//     for (let i = 0; i < obj.files.length; i++) {
//         let fileReader = new FileReader();
//         fileReader.onload = function (e) {
//             let field = document.getElementById("imgPreviewField");
//             let figure = document.createElement("figure");
//             let rmBtn = document.createElement("input");
//             let img = new Image();
//             img.src = e.target.result; // 画像のプレビュー用データURL
//             rmBtn.type = "button";
//             rmBtn.name = key; // 画像のID
//             // rmBtn.value = "削除";
//             rmBtn.onclick = function () {
//                 document.getElementById("img-" + rmBtn.name).remove(); // 画像を削除する処理
//             };
//             figure.setAttribute("id", "img-" + key);
//             figure.appendChild(img);
//             // figure.appendChild(rmBtn);
//             field.appendChild(figure);
//             key++; // 次の画像のためにIDをインクリメント
//         };
//         fileReader.readAsDataURL(obj.files[i]); // 画像ファイルをデータURLに変換
//     }
// }





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
    img.addEventListener('mouseleave', onMouseUp); // ドラッグ中にマウスが要素外に出た場合も対応

    img.addEventListener('touchstart', onTouchStart);
    img.addEventListener('touchmove', onTouchMove);
    img.addEventListener('touchend', onTouchEnd);
}






document.getElementById('frontButton').addEventListener('click', function() {
    document.getElementById('backInput').click();
});









// function loadImage(input) {
//     const previewField = document.getElementById('imgPreviewField');

//     Array.from(input.files).forEach(file => {
//         if (file.type.startsWith('image/')) {
//             const reader = new FileReader();
//             reader.onload = (event) => {
//                 const img = new Image();
//                 img.src = event.target.result;
//                 img.classList.add('thumbnail');
//                 previewField.appendChild(img);
//             };
//             reader.readAsDataURL(file);
//         }
//     });
// }





// function loadImage(input) {
//     const imgPreviewField = document.getElementById('imgPreviewField');
//     if (input.files) {
//         const files = Array.from(input.files);
//         files.forEach(file => {
//             const reader = new FileReader();

//             reader.onload = function(e) {
//                 const img = document.createElement('img');
//                 img.src = e.target.result;
//                 imgPreviewField.appendChild(img);
//             }

//             reader.readAsDataURL(file);
//         });
//     }
// }

// function handleDrop(e) {
//     e.preventDefault();
//     e.stopPropagation();
//     const dataTransfer = e.dataTransfer;
//     if (dataTransfer && dataTransfer.files) {
//         loadImage({ files: dataTransfer.files });
//     }
// }

// function handleDragOver(e) {
//     e.preventDefault();
//     e.stopPropagation();
//     e.currentTarget.classList.add('dragover');
// }

// function handleDragLeave(e) {
//     e.preventDefault();
//     e.stopPropagation();
//     e.currentTarget.classList.remove('dragover');
// }

// document.addEventListener('DOMContentLoaded', () => {
//     const uploadZone = document.getElementById('uploadZone');

//     uploadZone.addEventListener('drop', handleDrop);
//     uploadZone.addEventListener('dragover', handleDragOver);
//     uploadZone.addEventListener('dragleave', handleDragLeave);
// });










// ドラッグ＆ドロップ処理
// function handleDragOver(event) {
//     event.preventDefault();
//     this.style.backgroundColor = "#d0f0c0"; // ドラッグ中の背景色変更
// }

// function handleDragLeave(event) {
//     this.style.backgroundColor = "transparent"; // ドラッグが離れたときの背景色リセット
// }

// function handleDrop(event) {
//     event.preventDefault();
//     this.style.backgroundColor = "transparent";

//     const files = event.dataTransfer.files;
//     if (files.length > 0) {
//         let file = files[0];
//         let fileReader = new FileReader();
//         fileReader.onload = function (e) {
//             this.innerHTML = ""; // 既存の内容をクリア
//             let img = new Image();
//             img.src = e.target.result; // 画像データURLを設定




//             // 画像クリック時の挙動 new
//             img.classList.add("draggable-image"); // 画像にクラスを追加
//             img.onclick = function() {
//                 // 画像がクリックされたときにボタンを表示
//                 showButtons(this.parentNode);
//                 event.stopPropagation(); // クリックイベントのバブリングを防ぐ
//             };




//             this.appendChild(img);
//             addButtons(this); // 削除ボタンとトリミングボタンを追加
//         }.bind(this);
//         fileReader.readAsDataURL(file); // ドロップされたファイルをデータURLに変換
//     }
// }

// function handleTouchDrop(event) {
//     event.preventDefault();
//     const touch = event.changedTouches[0];
//     const dropArea = document.elementFromPoint(touch.clientX, touch.clientY);

//     if (dropArea && dropArea.classList.contains("empty")) {
//         const files = event.dataTransfer.files;
//         if (files.length > 0) {
//             let file = files[0];
//             let fileReader = new FileReader();
//             fileReader.onload = function (e) {
//                 dropArea.innerHTML = ""; // 既存の内容をクリア
//                 let img = new Image();
//                 img.src = e.target.result; // 画像データURLを設定
//                 dropArea.appendChild(img);
//                 addButtons(dropArea); // 削除ボタンとトリミングボタンを追加
//             };
//             fileReader.readAsDataURL(file); // ドロップされたファイルをデータURLに変換
//         }
//     }
// }

// // 削除ボタンとトリミングボタンの追加
// function addButtons(container) {
//     // 削除ボタンが既に存在するか確認
//     let existingDeleteButton = container.querySelector(".delete-btn");
//     if (!existingDeleteButton) {
//         let deleteButton = document.createElement("button");
//         deleteButton.classList.add("delete-btn");
//         deleteButton.textContent = "×";
//         deleteButton.onclick = function () {
//             container.innerHTML = ""; // 画像を削除
//             container.classList.remove("selected"); // 選択状態を解除
//             container.style.backgroundColor = "transparent"; // 背景色をリセット


//             hideButtons(); // ボタンを非表示にする new


//         };
//         container.appendChild(deleteButton);
//     }
    
//     // トリミングボタンが既に存在するか確認
//     let existingCropButton = container.querySelector(".crop-btn");
//     if (!existingCropButton) {
//         let cropButton = document.createElement("button");
//         cropButton.classList.add("crop-btn");
//         cropButton.textContent = "ト";
//         cropButton.onclick = function (event) {
//             event.stopPropagation(); // クリックイベントのバブリングを防ぐ
//             openCroppieModal(container); // トリミングモーダルを開く関数
//         };
//         container.appendChild(cropButton);
//     }
// }



// // ボタンを表示する関数 new
// function showButtons(container) {
//     const deleteButtons = container.querySelectorAll(".delete-btn");
//     deleteButtons.forEach(button => button.style.display = "flex");
//     const cropButtons = container.querySelectorAll(".crop-btn");
//     cropButtons.forEach(button => button.style.display = "flex");
// }






// // トリミングモーダル処理
// let croppieInstance; // Croppie インスタンスを保持

// function openCroppieModal(container) {
//     const croppieModal = document.getElementById('croppieModal');
//     const croppieContainer = document.getElementById('croppie-container');
//     croppieModal.style.display = 'block';

//     // Croppieの設定
//     if (croppieInstance) {
//         croppieInstance.destroy(); // 既存のインスタンスを破棄
//     }

//     croppieInstance = new Croppie(croppieContainer, {
//         viewport: { width: 200, height: 200 },
//         boundary: { width: 300, height: 300 },
//         showZoomer: true,
//         enableResize: false
//     });

//     const img = container.querySelector('img');
//     croppieInstance.bind({
//         url: img.src
//     });

//     // トリミングボタンのイベント
//     document.getElementById('crop-button').onclick = function() {
//         croppieInstance.result({
//              type: 'canvas', 
//              size: 'original',
//              format: 'jpeg' ,
//              quality:1
//             }).then(function (croppedImage) {
//             container.querySelector('img').src = croppedImage; // トリミング後の画像を更新
//             croppieModal.style.display = 'none'; // モーダルを閉じる
//         });
//     };

//     // 閉じるボタンのイベント
//     document.getElementById('close-button').onclick = function() {
//         croppieModal.style.display = 'none'; // モーダルを閉じる
//     };
// }

// // 画像のクリックイベント処理
// function handleElementClick(event) {

//     // new
//     if (event.target.classList.contains('draggable-image')) {

//         // 画像がクリックされた場合、ボタンを表示 new
//         showButtons(event.target.parentNode);
//         return;
//     }

//     if (event.target.classList.contains('delete-btn') || event.target.classList.contains('crop-btn')) {
//         // 削除ボタンやトリミングボタンがクリックされた場合の処理
//         return;
//     }

//     // その他のクリック時の処理 
//     // new
//     hideButtons(); // 画像以外をクリックした場合にボタンを非表示にする
// }


// // 画像以外をクリックしたときに削除ボタンとトリミングボタンを非表示にする関数 new
// function hideButtons() {
//     const deleteButtons = document.querySelectorAll(".delete-btn");
//     const cropButtons = document.querySelectorAll(".crop-btn");
    
//     deleteButtons.forEach(button => button.style.display = "none");
//     cropButtons.forEach(button => button.style.display = "none");
// }


// // ドキュメントが読み込まれた後の処理
// document.addEventListener("DOMContentLoaded", function () {
//     const emptyElements = document.querySelectorAll(".empty");

//     emptyElements.forEach(function (dropArea) {
//         dropArea.addEventListener("dragover", handleDragOver); // ドラッグオーバー時の処理
//         dropArea.addEventListener("dragleave", handleDragLeave); // ドラッグが離れたときの処理
//         dropArea.addEventListener("drop", handleDrop); // ドロップ時の処理
//         dropArea.addEventListener("touchstart", function (event) {
//             event.preventDefault();
//         }, { passive: false }); // タッチスタート時の処理（デフォルトの動作を防ぐ）
//         dropArea.addEventListener("touchend", handleTouchDrop, { passive: false }); // タッチエンド時の処理
//         dropArea.addEventListener("click", handleElementClick); // クリック時の処理
//         dropArea.addEventListener("touchstart", handleElementClick, { passive: false }); // タッチスタート時の処理（クリックと同じ）
//     });

//     // ドキュメント全体をクリックしたときにボタンを非表示にする new
//     document.addEventListener("click", function(event) {
//         if (!event.target.classList.contains('delete-btn') &&
//             !event.target.classList.contains('crop-btn') &&
//             !event.target.classList.contains('draggable-image') &&
//             !event.target.classList.contains('empty')) {
//             hideButtons();
//         }
//     });
// });



// ドラッグ＆ドロップ処理
function handleDragOver(event) {
    event.preventDefault(); // デフォルトの動作を防ぐ
    this.style.backgroundColor = "#d0f0c0"; // ドラッグ中の背景色変更
}

function handleDragLeave(event) {
    this.style.backgroundColor = "transparent"; // ドラッグが離れたときの背景色リセット
}

function handleDrop(event) {
    event.preventDefault(); // デフォルトの動作を防ぐ
    this.style.backgroundColor = "transparent"; // 背景色リセット

    const files = event.dataTransfer.files; // ドロップされたファイルの取得
    if (files.length > 0) {
        let file = files[0];
        let fileReader = new FileReader();
        fileReader.onload = function (e) {
            this.innerHTML = ""; // 既存の内容をクリア
            let img = new Image();
            img.src = e.target.result; // 画像データURLを設定

            // 画像クリック時の挙動
            img.classList.add("draggable-image"); // 画像にクラスを追加
            img.onclick = function() {
                showButtons(this.parentNode); // 画像がクリックされたときにボタンを表示
                event.stopPropagation(); // クリックイベントのバブリングを防ぐ
            };

            this.appendChild(img);
            addButtons(this); // 削除ボタンとトリミングボタンを追加
        }.bind(this);
        fileReader.readAsDataURL(file); // ドロップされたファイルをデータURLに変換
    }
}

function handleTouchDrop(event) {
    event.preventDefault(); // デフォルトの動作を防ぐ
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
    // 削除ボタンが既に存在するか確認
    let existingDeleteButton = container.querySelector(".delete-btn");
    if (!existingDeleteButton) {
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.textContent = "×";
        deleteButton.onclick = function () {
            container.innerHTML = ""; // 画像を削除
            container.classList.remove("selected"); // 選択状態を解除
            container.style.backgroundColor = "transparent"; // 背景色をリセット

            hideButtons(); // ボタンを非表示にする
        };
        container.appendChild(deleteButton);
    }
    
    // トリミングボタンが既に存在するか確認
    let existingCropButton = container.querySelector(".crop-btn");
    if (!existingCropButton) {
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
    const deleteButtons = container.querySelectorAll(".delete-btn");
    deleteButtons.forEach(button => button.style.display = "flex");
    const cropButtons = container.querySelectorAll(".crop-btn");
    cropButtons.forEach(button => button.style.display = "flex");
}

// ボタンを非表示にする関数
function hideButtons() {
    const deleteButtons = document.querySelectorAll(".delete-btn");
    const cropButtons = document.querySelectorAll(".crop-btn");
    
    deleteButtons.forEach(button => button.style.display = "none");
    cropButtons.forEach(button => button.style.display = "none");
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
    document.getElementById('crop-button').onclick = function() {
        croppieInstance.result({
            type: 'canvas', 
            size: 'original',
            format: 'jpeg',
            quality: 1
        }).then(function (croppedImage) {
            container.querySelector('img').src = croppedImage; // トリミング後の画像を更新
            croppieModal.style.display = 'none'; // モーダルを閉じる
        });
    };

    // 閉じるボタンのイベント
    document.getElementById('close-button').onclick = function() {
        croppieModal.style.display = 'none'; // モーダルを閉じる
    };
}

// 画像のクリックイベント処理
function handleElementClick(event) {
    if (event.target.classList.contains('draggable-image')) {
        showButtons(event.target.parentNode); // 画像がクリックされた場合、ボタンを表示
        return;
    }

    if (event.target.classList.contains('delete-btn') || event.target.classList.contains('crop-btn')) {
        // 削除ボタンやトリミングボタンがクリックされた場合の処理
        return;
    }

    hideButtons(); // 画像以外をクリックした場合にボタンを非表示にする
}

// タッチ開始時にボタンを非表示にする関数
function handleTouchStart(event) {
    if (!event.target.classList.contains('delete-btn') &&
        !event.target.classList.contains('crop-btn') &&
        !event.target.classList.contains('draggable-image') &&
        !event.target.classList.contains('empty')) {
        hideButtons(); // タッチでボタンを非表示にする
    }
}

// ドキュメントが読み込まれた後の処理
document.addEventListener("DOMContentLoaded", function () {
    const emptyElements = document.querySelectorAll(".empty");

    emptyElements.forEach(function (dropArea) {
        dropArea.addEventListener("dragover", handleDragOver); // ドラッグオーバー時の処理
        dropArea.addEventListener("dragleave", handleDragLeave); // ドラッグが離れたときの処理
        dropArea.addEventListener("drop", handleDrop); // ドロップ時の処理
        dropArea.addEventListener("touchstart", function (event) {
            event.preventDefault(); // タッチスタート時のデフォルト動作を防ぐ
        }, { passive: false });
        dropArea.addEventListener("touchend", handleTouchDrop, { passive: false }); // タッチエンド時の処理
        dropArea.addEventListener("click", handleElementClick); // クリック時の処理
        dropArea.addEventListener("touchend", handleElementClick, { passive: false }); // タッチエンド時の処理
    });

    // ドキュメント全体をクリックしたときにボタンを非表示にする
    document.addEventListener("click", function(event) {
        if (!event.target.classList.contains('delete-btn') &&
            !event.target.classList.contains('crop-btn') &&
            !event.target.classList.contains('draggable-image') &&
            !event.target.classList.contains('empty')) {
            hideButtons(); // クリックでボタンを非表示にする
        }
    });

    // ドキュメント全体をタッチしたときにボタンを非表示にする
    document.addEventListener("touchstart", handleTouchStart, { passive: false });
});






 

// //  upload
// const fileInput = document.getElementById('fileInput');
// const imageList = document.getElementById('imageList');

// fileInput.addEventListener('change', (e) => {
//     Array.from(e.target.files).forEach(file => {
//         if (file.type.startsWith('image/')) {
//             const reader = new FileReader();
//             reader.onload = (event) => {
//                 const img = new Image();
//                 img.src = event.target.result;
//                 img.classList.add('thumbnail');
//                 img.draggable = true;
//                 img.addEventListener('dragstart', handleDragStart);
//                 imageList.appendChild(img);
//             };
//             reader.readAsDataURL(file);
//         }
//     });
// });

// document.getElementById('fileButton').addEventListener('click', function() {
//     document.getElementById('fileInput').click();
//   });
  
//   document.getElementById('fileInput').addEventListener('change', function() {
//     // ファイルが選択された後の処理をここに書く
//     console.log(this.files);
//   });


//   color
function changeColor(color) {
    let elements = document.getElementsByClassName('uniqueColor');
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = color;
    }
}

  


















// // 枠選択 先にサイドバーからのパターン
// const rectangleButton = document.getElementById('rectangle-button');
// const squareButton = document.getElementById('square-button');
// const dropArea = document.getElementById('dropArea');
// const dropArea2 = document.getElementById('dropArea2');

// // ボタンがクリックされたときに枠の色を赤色に変更
// function setBorderColor(color) {
//     dropArea.style.borderColor = color;
//     dropArea2.style.borderColor = color;
// }

// // ボタンにイベントリスナーを追加
// rectangleButton.addEventListener('click', function() {
//     setBorderColor('red');
//     dropArea.dataset.shape = 'rectangle'; // 長方形の形を設定
//     dropArea2.dataset.shape = 'rectangle';
// });

// squareButton.addEventListener('click', function() {
//     setBorderColor('red');
//     dropArea.dataset.shape = 'square'; // 正方形の形を設定
//     dropArea2.dataset.shape = 'square';
// });

// // ボタン以外がクリックされたときに枠の色を元に戻す
// document.addEventListener('click', function(event) {
//     if (!event.target.closest('button')) {
//         setBorderColor('#ccc'); // 枠の色を初期の灰色に戻す
//     }
// });

// // ドロップエリアがクリックされたときに枠の大きさを変更する
// function resizeDropArea(event) {
//     const target = event.currentTarget; // クリックした要素を取得
//     const shape = target.dataset.shape;
//     if (shape === 'rectangle') {
//         target.style.width = '20%'; // 長方形の幅
//         target.style.height = '150px'; // 長方形の高さ
//     } else if (shape === 'square') {
//         target.style.width = '20%'; // 正方形のサイズ
//         target.style.height = '20%'; // 正方形のサイズ
//     }
// }

// // ドロップエリアとその中の画像にクリックイベントリスナーを追加
// dropArea.addEventListener('click', resizeDropArea);
// dropArea2.addEventListener('click', resizeDropArea);





// 先に変えたい枠から選ぶパターン
// document.addEventListener('DOMContentLoaded', () => {
//     const dropArea1 = document.getElementById('dropArea');
//     const dropArea2 = document.getElementById('dropArea2');
//     const resizeButtons = document.querySelectorAll('.resizeButton');
//     let activeDropArea = null;

//     // ドロップエリアがクリックされたときの処理
//     dropArea1.addEventListener('click', () => {
//         dropArea1.classList.add('active');
//         dropArea2.classList.remove('active');
//         activeDropArea = dropArea1;
//     });
    
//     dropArea2.addEventListener('click', () => {
//         dropArea1.classList.remove('active');
//         dropArea2.classList.add('active');
//         activeDropArea = dropArea2;
//     });

//     // サイズ変更ボタンがクリックされたときの処理
//     resizeButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             if (activeDropArea) {
//                 // サイズをすべてリセット
//                 activeDropArea.classList.remove('square', 'rectangle', 'mini');
//                 // ボタンの data-size 属性に基づいてサイズを変更
//                 const size = button.getAttribute('data-size');
//                 activeDropArea.classList.add(size);
//             }
//         });
//     });
// });


// 先に変えたい枠から選ぶパターン タッチ
document.addEventListener('DOMContentLoaded', () => {
    const dropArea1 = document.getElementById('dropArea');
    const dropArea2 = document.getElementById('dropArea2');
    const resizeButtons = document.querySelectorAll('.resizeButton');
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
        }
    };

    resizeButtons.forEach(button => {
        button.addEventListener('pointerdown', () => handleResizeButtonInteraction(button));
    });
});
