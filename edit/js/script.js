// スライド
const swiper = new Swiper(".swiper", {
    pagination: {
        el: ".swiper-pagination",
        type: "fraction"
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    slidesPerView: 1,
    slidesPerGroup: 1, 
    breakpoints: {
        900: {
            slidesPerView: 2,
            slidesPerGroup: 2,
        }
    }
});




// メインのスライドからプレビュー
document.addEventListener("DOMContentLoaded", function() {
    // プレビューボタンにクリックイベントリスナーを追加
    document.querySelector(".btn-preview").addEventListener("click", function() {
        // 現在のスライドインデックスを取得
        const currentSlideIndex = swiper.realIndex;
        
        // プレビューページのURLを動的に設定
        const previewUrl = `../preview/index.html?slide=${currentSlideIndex + 1}`;
        
        // プレビューページに遷移
        window.location.href = previewUrl;
    });
});


// プレビューのスライドからメイン
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const slideNumber = urlParams.get('slide');

    if (slideNumber) {
        swiper.slideTo(slideNumber - 1, 0);  // スライド番号に対応するインデックスに移動
        console.log(`Returning to slide ${slideNumber} in the main page`);
    }
});





//  ドロワー
let currentContentId = null;
let activeButton = null;

const toggleDrawer = () => {
    const drawer = document.getElementById('drawer');
    const content = document.getElementById('content');
    const sidebar = document.getElementById('sidebar');

    drawer.classList.toggle('open');
    sidebar.classList.toggle('open');
    content.classList.toggle('open');

    if (!drawer.classList.contains('open')) {
        currentContentId = null;

        if (activeButton) {
            activeButton.classList.remove('active');
            activeButton = null;
        }
    }

};

const showDrawerContent = (contentId) => {
    const drawerContent = document.getElementById('drawer-content');
    const contentElement = document.getElementById(contentId);

    const clickedButton = document.querySelector(`[date-content-id="${contentId}"]`);

    if (!contentElement) {
        console.error(`Content element with ID '${contentId}' not found.`);
        return;
    }

    if (contentId === currentContentId && drawer.classList.contains('open')) {
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

 








// 画像のアップロードと挿入 スマホなし
// let selectedImage = null;

// document.addEventListener('DOMContentLoaded', function() {
//     // ドロップエリアの復元
//     restoreDropAreas();

//     // ドロップエリアのクリックリスナー追加
//     addClickListenerToDropAreas();

//     // 保存ボタンのクリックリスナー追加
//     document.getElementById('saveButton').addEventListener('click', function() {
//         // サーバに画像を送信する処理は削除済み
//     });
// });

// function loadImage(input) {
//     const imgPreviewField = document.getElementById('imgPreviewField');
//     if (input.files) {
//         const files = Array.from(input.files);
//         files.forEach(file => {
//             const reader = new FileReader();

//             reader.onload = function(e) {
//                 const img = document.createElement('img');
//                 img.src = e.target.result;
//                 img.style.left = '0px';
//                 img.style.top = '0px';

//                 imgPreviewField.appendChild(img);
//                 makeDraggable(img);
//                 makeSelectable(img);
//             }

//             reader.readAsDataURL(file);
//         });
//     }
// }

// function makeDraggable(img) {
//     let isDragging = false;
//     let startX, startY, initialX, initialY;

//     function onMouseDown(e) {
//         isDragging = true;
//         startX = e.clientX;
//         startY = e.clientY;
//         initialX = parseFloat(img.style.left) || 0;
//         initialY = parseFloat(img.style.top) || 0;
//         img.style.cursor = 'grabbing';
//     }

//     function onMouseMove(e) {
//         if (isDragging) {
//             const dx = e.clientX - startX;
//             const dy = e.clientY - startY;
//             img.style.left = (initialX + dx) + 'px';
//             img.style.top = (initialY + dy) + 'px';
//         }
//     }

//     function onMouseUp() {
//         isDragging = false;
//         img.style.cursor = 'grab';
//     }

//     function onTouchStart(e) {
//         if (e.touches.length === 1) {
//             isDragging = true;
//             startX = e.touches[0].clientX;
//             startY = e.touches[0].clientY;
//             initialX = parseFloat(img.style.left) || 0;
//             initialY = parseFloat(img.style.top) || 0;
//         }
//     }

//     function onTouchMove(e) {
//         if (isDragging && e.touches.length === 1) {
//             const dx = e.touches[0].clientX - startX;
//             const dy = e.touches[0].clientY - startY;
//             img.style.left = (initialX + dx) + 'px';
//             img.style.top = (initialY + dy) + 'px';
//         }
//     }

//     function onTouchEnd() {
//         isDragging = false;
//     }

//     img.addEventListener('mousedown', onMouseDown);
//     img.addEventListener('mousemove', onMouseMove);
//     img.addEventListener('mouseup', onMouseUp);
//     img.addEventListener('mouseleave', onMouseUp);

//     img.addEventListener('touchstart', onTouchStart);
//     img.addEventListener('touchmove', onTouchMove);
//     img.addEventListener('touchend', onTouchEnd);
// }

// function makeSelectable(img) {
//     img.addEventListener('click', function() {
//         const allImgs = document.querySelectorAll('#imgPreviewField img');
//         allImgs.forEach(image => {
//             image.classList.remove('selected');
//         });
//         img.classList.add('selected');
//         selectedImage = img;
//     });
// }

// function addClickListenerToDropAreas() {
//     const dropAreas = document.querySelectorAll('.empty');
//     dropAreas.forEach(dropArea => {
//         dropArea.addEventListener('click', function() {
//             if (selectedImage) {
//                 insertImageToDropArea(this);
//             }
//         });
//     });
// }

// function insertImageToDropArea(dropArea) {
//     dropArea.innerHTML = '';

//     const newImage = document.createElement('img');
//     newImage.src = selectedImage.src;
//     newImage.style.width = '100%';
//     newImage.style.height = '100%';

//     const deleteButton = document.createElement('button');
//     deleteButton.textContent = '';
//     deleteButton.classList.add('delete-button');
//     deleteButton.addEventListener('click', function(e) {
//         e.stopPropagation();
//         dropArea.innerHTML = '';
//         saveDropAreaImages();
//     });

//     const cropButton = document.createElement('button');
//     cropButton.textContent = '';
//     cropButton.classList.add('crop-button');
//     cropButton.addEventListener('click', function(e) {
//         e.stopPropagation();
//         openCroppieModal(dropArea);
//     });

//     dropArea.appendChild(newImage);
//     dropArea.appendChild(deleteButton);
//     dropArea.appendChild(cropButton);
//     dropArea.classList.add('with-buttons');

//     selectedImage.classList.remove('selected');
//     selectedImage = null;

//     saveDropAreaImages();
// }

// function saveDropAreaImages() {
//     const dropAreas = document.querySelectorAll('.empty');
//     dropAreas.forEach(dropArea => {
//         const img = dropArea.querySelector('img');
//         if (img) {
//             localStorage.setItem(dropArea.id, img.src);
//         } else {
//             localStorage.removeItem(dropArea.id);
//         }
//     });
// }

// function openCroppieModal(container) {
//     const croppieModal = document.getElementById('croppieModal');
//     const croppieContainer = document.getElementById('croppie-container');

//     let croppieInstance = new Croppie(croppieContainer, {
//         viewport: { width: 200, height: 200 },
//         boundary: { width: 300, height: 300 },
//         showZoomer: true,
//         enableResize: false
//     });

//     const img = container.querySelector('img');
//     croppieInstance.bind({
//         url: img.src
//     });

//     croppieModal.style.display = 'block';

//     document.getElementById('crop-button').onclick = function() {
//         croppieInstance.result({
//              type: 'canvas', 
//              size: 'original',
//              format: 'png',
//              quality: 1
//         }).then(function(croppedImage) {
//             img.src = croppedImage;
//             croppieModal.style.display = 'none';
//             saveDropAreaImages();
//         });
//     };

//     document.getElementById('close-button').onclick = function() {
//         croppieModal.style.display = 'none';
//     };
// }

// function restoreDropAreas() {
//     const dropAreas = document.querySelectorAll('.empty');
//     dropAreas.forEach(dropArea => {
//         const savedImageSrc = localStorage.getItem(dropArea.id);
//         if (savedImageSrc) {
//             const newImage = document.createElement('img');
//             newImage.src = savedImageSrc;
//             newImage.style.width = '100%';
//             newImage.style.height = '100%';

//             const deleteButton = document.createElement('button');
//             deleteButton.textContent = '削除';
//             deleteButton.classList.add('delete-button');
//             deleteButton.addEventListener('click', function(e) {
//                 e.stopPropagation();
//                 dropArea.innerHTML = '';
//                 saveDropAreaImages();
//             });

//             const cropButton = document.createElement('button');
//             cropButton.textContent = 'トリミング';
//             cropButton.classList.add('crop-button');
//             cropButton.addEventListener('click', function(e) {
//                 e.stopPropagation();
//                 openCroppieModal(dropArea);
//             });

//             dropArea.appendChild(newImage);
//             dropArea.appendChild(deleteButton);
//             dropArea.appendChild(cropButton);
//             dropArea.classList.add('with-buttons');
//         }
//     });
// }

// document.addEventListener('click', function(event) {
//     const isInsideDropArea = event.target.closest('.with-buttons');

//     if (!isInsideDropArea) {
//         const dropAreas = document.querySelectorAll('.with-buttons');
//         dropAreas.forEach(dropArea => {
//             const cropButton = dropArea.querySelector('.crop-button');
//             const deleteButton = dropArea.querySelector('.delete-button');
            
//             if (cropButton && deleteButton) {
//                 cropButton.style.display = 'none';
//                 deleteButton.style.display = 'none';
//             }
//         });
//     } else {
//         const cropButton = isInsideDropArea.querySelector('.crop-button');
//         const deleteButton = isInsideDropArea.querySelector('.delete-button');
        
//         if (cropButton && deleteButton) {
//             cropButton.style.display = 'block';
//             deleteButton.style.display = 'block';
//         }
//     }
// });



// 画像のアップロードと挿入 スマホあり
// let selectedImage = null;

// document.addEventListener('DOMContentLoaded', function() {
//     // ドロップエリアの復元
//     restoreDropAreas();

//     // ドロップエリアのタッチリスナー追加
//     addTouchListenerToDropAreas();

//     // 保存ボタンのクリックリスナー追加
//     document.getElementById('saveButton').addEventListener('click', function() {
//         // サーバに画像を送信する処理は削除済み
//     });
// });

// function loadImage(input) {
//     const imgPreviewField = document.getElementById('imgPreviewField');
//     if (input.files) {
//         const files = Array.from(input.files);
//         files.forEach(file => {
//             const reader = new FileReader();

//             reader.onload = function(e) {
//                 const img = document.createElement('img');
//                 img.src = e.target.result;
//                 img.style.left = '0px';
//                 img.style.top = '0px';

//                 imgPreviewField.appendChild(img);
//                 makeDraggable(img);
//                 makeTouchable(img);
//             }

//             reader.readAsDataURL(file);
//         });
//     }
// }

// function makeDraggable(img) {
//     let isDragging = false;
//     let startX, startY, initialX, initialY;

//     function onMouseDown(e) {
//         isDragging = true;
//         startX = e.clientX;
//         startY = e.clientY;
//         initialX = parseFloat(img.style.left) || 0;
//         initialY = parseFloat(img.style.top) || 0;
//         img.style.cursor = 'grabbing';
//     }

//     function onMouseMove(e) {
//         if (isDragging) {
//             const dx = e.clientX - startX;
//             const dy = e.clientY - startY;
//             img.style.left = (initialX + dx) + 'px';
//             img.style.top = (initialY + dy) + 'px';
//         }
//     }

//     function onMouseUp() {
//         isDragging = false;
//         img.style.cursor = 'grab';
//     }

//     function onTouchStart(e) {
//         if (e.touches.length === 1) {
//             isDragging = true;
//             startX = e.touches[0].clientX;
//             startY = e.touches[0].clientY;
//             initialX = parseFloat(img.style.left) || 0;
//             initialY = parseFloat(img.style.top) || 0;
//         }
//     }

//     function onTouchMove(e) {
//         if (isDragging && e.touches.length === 1) {
//             const dx = e.touches[0].clientX - startX;
//             const dy = e.touches[0].clientY - startY;
//             img.style.left = (initialX + dx) + 'px';
//             img.style.top = (initialY + dy) + 'px';
//         }
//     }

//     function onTouchEnd() {
//         isDragging = false;
//     }

//     img.addEventListener('mousedown', onMouseDown);
//     img.addEventListener('mousemove', onMouseMove);
//     img.addEventListener('mouseup', onMouseUp);
//     img.addEventListener('mouseleave', onMouseUp);

//     img.addEventListener('touchstart', onTouchStart);
//     img.addEventListener('touchmove', onTouchMove);
//     img.addEventListener('touchend', onTouchEnd);
// }

// function makeTouchable(img) {
//     img.addEventListener('click', function() {
//         const allImgs = document.querySelectorAll('#imgPreviewField img');
//         allImgs.forEach(image => {
//             image.classList.remove('selected');
//         });
//         img.classList.add('selected');
//         selectedImage = img;
//     });

//     img.addEventListener('touchstart', function(e) {
//         e.preventDefault();  // Prevent default touch behavior
//         const allImgs = document.querySelectorAll('#imgPreviewField img');
//         allImgs.forEach(image => {
//             image.classList.remove('selected');
//         });
//         img.classList.add('selected');
//         selectedImage = img;
//     });
// }

// function addTouchListenerToDropAreas() {
//     const dropAreas = document.querySelectorAll('.empty');
//     dropAreas.forEach(dropArea => {
//         dropArea.addEventListener('touchstart', function() {
//             if (selectedImage) {
//                 insertImageToDropArea(this);
//             }
//         });
//     });
// }

// function insertImageToDropArea(dropArea) {
//     dropArea.innerHTML = '';

//     const newImage = document.createElement('img');
//     newImage.src = selectedImage.src;
//     newImage.style.width = '100%';
//     newImage.style.height = '100%';

//     const deleteButton = document.createElement('button');
//     deleteButton.textContent = '';
//     deleteButton.classList.add('delete-button');
//     deleteButton.addEventListener('touchstart', function(e) {
//         e.stopPropagation();
//         dropArea.innerHTML = '';
//         saveDropAreaImages();
//     });

//     const cropButton = document.createElement('button');
//     cropButton.textContent = '';
//     cropButton.classList.add('crop-button');
//     cropButton.addEventListener('touchstart', function(e) {
//         e.stopPropagation();
//         openCroppieModal(dropArea);
//     });

//     dropArea.appendChild(newImage);
//     dropArea.appendChild(deleteButton);
//     dropArea.appendChild(cropButton);
//     dropArea.classList.add('with-buttons');

//     selectedImage.classList.remove('selected');
//     selectedImage = null;

//     saveDropAreaImages();
// }

// function saveDropAreaImages() {
//     const dropAreas = document.querySelectorAll('.empty');
//     dropAreas.forEach(dropArea => {
//         const img = dropArea.querySelector('img');
//         if (img) {
//             localStorage.setItem(dropArea.id, img.src);
//         } else {
//             localStorage.removeItem(dropArea.id);
//         }
//     });
// }

// function openCroppieModal(container) {
//     const croppieModal = document.getElementById('croppieModal');
//     const croppieContainer = document.getElementById('croppie-container');

//     let croppieInstance = new Croppie(croppieContainer, {
//         viewport: { width: 200, height: 200 },
//         boundary: { width: 300, height: 300 },
//         showZoomer: true,
//         enableResize: false
//     });

//     const img = container.querySelector('img');
//     croppieInstance.bind({
//         url: img.src
//     });

//     croppieModal.style.display = 'block';

//     document.getElementById('crop-button').addEventListener('touchstart', function() {
//         croppieInstance.result({
//              type: 'canvas', 
//              size: 'original',
//              format: 'png',
//              quality: 1
//         }).then(function(croppedImage) {
//             img.src = croppedImage;
//             croppieModal.style.display = 'none';
//             saveDropAreaImages();
//         });
//     });

//     document.getElementById('close-button').addEventListener('touchstart', function() {
//         croppieModal.style.display = 'none';
//     });
// }

// function restoreDropAreas() {
//     const dropAreas = document.querySelectorAll('.empty');
//     dropAreas.forEach(dropArea => {
//         const savedImageSrc = localStorage.getItem(dropArea.id);
//         if (savedImageSrc) {
//             const newImage = document.createElement('img');
//             newImage.src = savedImageSrc;
//             newImage.style.width = '100%';
//             newImage.style.height = '100%';

//             const deleteButton = document.createElement('button');
//             deleteButton.textContent = '削除';
//             deleteButton.classList.add('delete-button');
//             deleteButton.addEventListener('touchstart', function(e) {
//                 e.stopPropagation();
//                 dropArea.innerHTML = '';
//                 saveDropAreaImages();
//             });

//             const cropButton = document.createElement('button');
//             cropButton.textContent = 'トリミング';
//             cropButton.classList.add('crop-button');
//             cropButton.addEventListener('touchstart', function(e) {
//                 e.stopPropagation();
//                 openCroppieModal(dropArea);
//             });

//             dropArea.appendChild(newImage);
//             dropArea.appendChild(deleteButton);
//             dropArea.appendChild(cropButton);
//             dropArea.classList.add('with-buttons');
//         }
//     });
// }

// document.addEventListener('touchstart', function(event) {
//     const isInsideDropArea = event.target.closest('.with-buttons');

//     if (!isInsideDropArea) {
//         const dropAreas = document.querySelectorAll('.with-buttons');
//         dropAreas.forEach(dropArea => {
//             const cropButton = dropArea.querySelector('.crop-button');
//             const deleteButton = dropArea.querySelector('.delete-button');
            
//             if (cropButton && deleteButton) {
//                 cropButton.style.display = 'none';
//                 deleteButton.style.display = 'none';
//             }
//         });
//     } else {
//         const cropButton = isInsideDropArea.querySelector('.crop-button');
//         const deleteButton = isInsideDropArea.querySelector('.delete-button');
        
//         if (cropButton && deleteButton) {
//             cropButton.style.display = 'block';
//             deleteButton.style.display = 'block';
//         }
//     }
// });



// 処理1
let imageDB;

// 新しいIndexedDBの初期化
function initNewIndexedDB() {
    const request = indexedDB.open('NewImageDatabase', 1);

    request.onupgradeneeded = function(event) {
        imageDB = event.target.result;
        if (!imageDB.objectStoreNames.contains('images')) {
            imageDB.createObjectStore('images', { keyPath: 'id' });
        }
    };

    request.onsuccess = function(event) {
        imageDB = event.target.result;
        console.log('New IndexedDB initialized.');
        restoreDropAreas(); // データベースから画像を復元
    };

    request.onerror = function(event) {
        console.error('Error initializing IndexedDB:', event.target.errorCode);
    };
}

initNewIndexedDB();

document.addEventListener('DOMContentLoaded', function() {
    addTouchListenerToDropAreas();
    document.getElementById('saveButton').addEventListener('click', function() {
        // サーバに画像を送信する処理は削除済み
    });
});

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
    img.addEventListener('click', function() {
        const allImgs = document.querySelectorAll('#imgPreviewField img');
        allImgs.forEach(image => {
            image.classList.remove('selected');
        });
        img.classList.add('selected');
        selectedImage = img;
    });

    img.addEventListener('touchstart', function(e) {
        e.preventDefault();  // Prevent default touch behavior
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
        dropArea.addEventListener('touchstart', function(e) {
            e.preventDefault();  // Prevent default touch behavior
            if (selectedImage) {
                console.log('Selected image:', selectedImage);
                insertImageToDropArea(this);
            }
        });

        dropArea.addEventListener('click', function(e) {
            e.preventDefault();
            if (selectedImage) {
                console.log('Selected image:', selectedImage);
                insertImageToDropArea(this);
            }
        });
    });
}

function insertImageToDropArea(dropArea) {
    console.log('Inserting image into drop area', dropArea);

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
    deleteButton.textContent = '削除';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function(e) {
        e.stopPropagation();
        dropArea.innerHTML = '';
        deleteImageFromIndexedDB(dropArea.id);
    });
    deleteButton.addEventListener('touchstart', function(e) {
        e.stopPropagation();
        dropArea.innerHTML = '';
        deleteImageFromIndexedDB(dropArea.id);
    });

    const cropButton = document.createElement('button');
    cropButton.textContent = 'トリミング';
    cropButton.classList.add('crop-button');
    cropButton.addEventListener('click', function(e) {
        e.stopPropagation();
        openCroppieModal(dropArea);
    });
    cropButton.addEventListener('touchstart', function(e) {
        e.stopPropagation();
        openCroppieModal(dropArea);
    });

    dropArea.appendChild(newImage);
    dropArea.appendChild(deleteButton);
    dropArea.appendChild(cropButton);
    dropArea.classList.add('with-buttons');

    selectedImage.classList.remove('selected');
    selectedImage = null;

    // Save image data to new IndexedDB
    saveImageToNewIndexedDB(dropArea.id, newImage.src);
}

function saveImageToNewIndexedDB(id, imageData) {
    if (!imageDB) {
        console.error('Database not initialized.');
        return;
    }

    const transaction = imageDB.transaction(['images'], 'readwrite');
    const store = transaction.objectStore('images');
    store.put({ id: id, data: imageData });

    transaction.oncomplete = function() {
        console.log('Image saved to new IndexedDB.');
    };

    transaction.onerror = function(event) {
        console.error('Error saving image:', event.target.errorCode);
    };
}

function getImageFromNewIndexedDB(id, callback) {
    if (!imageDB) {
        console.error('Database not initialized.');
        return;
    }

    const transaction = imageDB.transaction(['images']);
    const store = transaction.objectStore('images');
    const request = store.get(id);

    request.onsuccess = function(event) {
        const result = event.target.result;
        if (result) {
            callback(result.data); // 'data' を使用
        } else {
            console.log('No image found with ID:', id);
        }
    };

    request.onerror = function(event) {
        console.error('Error retrieving image:', event.target.errorCode);
    };
}

function restoreDropAreas() {
    const dropAreas = document.querySelectorAll('.empty');
    dropAreas.forEach(dropArea => {
        getImageFromNewIndexedDB(dropArea.id, function(imageData) {
            if (imageData) {
                const newImage = document.createElement('img');
                newImage.src = imageData;
                newImage.style.width = '100%';
                newImage.style.height = '100%';

                const deleteButton = document.createElement('button');
                deleteButton.textContent = '削除';
                deleteButton.classList.add('delete-button');
                deleteButton.addEventListener('click', function(e) {
                    e.stopPropagation();
                    dropArea.innerHTML = '';
                    deleteImageFromNewIndexedDB(dropArea.id);
                });
                deleteButton.addEventListener('touchstart', function(e) {
                    e.stopPropagation();
                    dropArea.innerHTML = '';
                    deleteImageFromNewIndexedDB(dropArea.id);
                });

                const cropButton = document.createElement('button');
                cropButton.textContent = 'トリミング';
                cropButton.classList.add('crop-button');
                cropButton.addEventListener('click', function(e) {
                    e.stopPropagation();
                    openCroppieModal(dropArea);
                });
                cropButton.addEventListener('touchstart', function(e) {
                    e.stopPropagation();
                    openCroppieModal(dropArea);
                });

                dropArea.innerHTML = '';
                dropArea.appendChild(newImage);
                dropArea.appendChild(deleteButton);
                dropArea.appendChild(cropButton);
                dropArea.classList.add('with-buttons');
            }
        });
    });
}

function deleteImageFromNewIndexedDB(id) {
    if (!imageDB) {
        console.error('Database not initialized.');
        return;
    }

    const transaction = imageDB.transaction(['images'], 'readwrite');
    const store = transaction.objectStore('images');
    const request = store.delete(id);

    request.onsuccess = function() {
        console.log('Image deleted from new IndexedDB:', id);
    };

    request.onerror = function(event) {
        console.error('Error deleting image:', event.target.errorCode);
    };
}

function openCroppieModal(dropArea) {
    // Croppieモーダルの表示処理
    console.log('Croppie modal open for drop area:', dropArea);
}


















// inputボタンのデザイン
document.getElementById('frontButton').addEventListener('click', function() {
    document.getElementById('backInput').click();
});





// 画像のドラッグ＆ドロップ
// ドラッグオーバー時の処理
// function handleDragOver(event) {
//     event.preventDefault();
//     this.style.backgroundColor = "#d0f0c0"; // ドラッグ中の背景色変更
// }

// // ドラッグが離れたときの処理
// function handleDragLeave(event) {
//     this.style.backgroundColor = "transparent"; // ドラッグが離れたときの背景色リセット
// }

// // ドロップ時の処理
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
//             img.classList.add("draggable-image"); // 画像にクラスを追加
//             img.onclick = function () {
//                 showButtons(this.parentNode); // 画像がクリックされたときにボタンを表示
//             };
//             this.appendChild(img);
//             addButtons(this); // 削除ボタンとトリミングボタンを追加

//             // ローカルストレージに画像データを保存
//             saveImageToLocalStorage(e.target.result, this.id);
//         }.bind(this);
//         fileReader.readAsDataURL(file); // ドロップされたファイルをデータURLに変換
//     }
// }

// // タッチエンド時の処理
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

//                 // ローカルストレージに画像データを保存
//                 saveImageToLocalStorage(e.target.result, dropArea.id);
//             };
//             fileReader.readAsDataURL(file); // ドロップされたファイルをデータURLに変換
//         }
//     }
// }

// // 削除ボタンとトリミングボタンの追加
// function addButtons(container) {
//     // 削除ボタンが既に存在するか確認
//     if (!container.querySelector(".delete-btn")) {
//         let deleteButton = document.createElement("button");
//         deleteButton.classList.add("delete-btn");
//         deleteButton.textContent = "";
//         deleteButton.onclick = function () {
//             container.innerHTML = ""; // 画像を削除
//             container.classList.remove("selected"); // 選択状態を解除
//             container.style.backgroundColor = "transparent"; // 背景色をリセット
//             hideButtons(); // ボタンを非表示にする

//             // ローカルストレージから画像データを削除
//             clearImageFromLocalStorage(container.id);
//         };
//         container.appendChild(deleteButton);
//     }

//     // トリミングボタンが既に存在するか確認
//     if (!container.querySelector(".crop-btn")) {
//         let cropButton = document.createElement("button");
//         cropButton.classList.add("crop-btn");
//         cropButton.textContent = "";
//         cropButton.onclick = function (event) {
//             event.stopPropagation(); // クリックイベントのバブリングを防ぐ
//             openCroppieModal(container); // トリミングモーダルを開く関数
//         };
//         container.appendChild(cropButton);
//     }
// }

// // ボタンを表示する関数
// function showButtons(container) {
//     container.querySelectorAll(".delete-btn, .crop-btn").forEach(button => button.style.display = "flex");
// }

// // ボタンを非表示にする関数
// function hideButtons() {
//     document.querySelectorAll(".delete-btn, .crop-btn").forEach(button => button.style.display = "none");
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
//     document.getElementById('crop-button').onclick = function () {
//         croppieInstance.result({
//             type: 'canvas',
//             size: 'original',
//             format: 'png',
//             quality: 1
//         }).then(function (croppedImage) {
//             container.querySelector('img').src = croppedImage; // トリミング後の画像を更新
//             croppieModal.style.display = 'none'; // モーダルを閉じる

//             // トリミング後の画像データをローカルストレージに保存
//             saveImageToLocalStorage(croppedImage, container.id);
//         });
//     };

//     // 閉じるボタンのイベント
//     document.getElementById('close-button').onclick = function () {
//         croppieModal.style.display = 'none'; // モーダルを閉じる
//     };
// }

// // 画像のクリックイベント処理
// function handleElementClick(event) {
//     if (event.target.classList.contains('draggable-image')) {
//         // 画像がクリックされた場合、ボタンを表示
//         showButtons(event.target.parentNode);
//         return;
//     }

//     if (event.target.classList.contains('delete-btn') || event.target.classList.contains('crop-btn')) {
//         // 削除ボタンやトリミングボタンがクリックされた場合の処理
//         return;
//     }

//     // その他のクリック時の処理
//     hideButtons(); // 画像以外をクリックした場合にボタンを非表示にする
// }

// // ローカルストレージに画像データを保存
// function saveImageToLocalStorage(imageData, containerId) {
//     localStorage.setItem(`image_${containerId}`, imageData);
// }

// // ローカルストレージから画像データを取得
// function loadImageFromLocalStorage(containerId) {
//     return localStorage.getItem(`image_${containerId}`);
// }

// // ローカルストレージから画像データを削除
// function clearImageFromLocalStorage(containerId) {
//     localStorage.removeItem(`image_${containerId}`);
// }

// // ドキュメントが読み込まれた後の処理
// document.addEventListener("DOMContentLoaded", function () {
//     const emptyElements = document.querySelectorAll(".empty");

//     emptyElements.forEach(function (dropArea) {
//         dropArea.addEventListener("dragover", handleDragOver); // ドラッグオーバー時の処理
//         dropArea.addEventListener("dragleave", handleDragLeave); // ドラッグが離れたときの処理
//         dropArea.addEventListener("drop", handleDrop); // ドロップ時の処理
//         dropArea.addEventListener("touchstart", function (event) {
//             event.preventDefault(); // タッチスタート時の処理（デフォルトの動作を防ぐ）
//         }, { passive: false });
//         dropArea.addEventListener("touchend", handleTouchDrop, { passive: false }); // タッチエンド時の処理
//         dropArea.addEventListener("click", handleElementClick); // クリック時の処理
//     });

//     // ページが読み込まれたときにローカルストレージから画像を復元
//     emptyElements.forEach(function(dropArea) {
//         const imageData = loadImageFromLocalStorage(dropArea.id);
//         if (imageData) {
//             dropArea.innerHTML = ""; // 既存の内容をクリア
//             let img = new Image();
//             img.src = imageData; // 画像データURLを設定
//             img.classList.add("draggable-image");
//             img.onclick = function() {
//                 showButtons(this.parentNode); // 画像がクリックされたときにボタンを表示
//             };
//             dropArea.appendChild(img);
//             addButtons(dropArea); // 削除ボタンとトリミングボタンを追加
//         }
//     });

//     // ドキュメント全体をクリックしたときにボタンを非表示にする
//     document.addEventListener("click", function(event) {
//         if (!event.target.classList.contains('delete-btn') &&
//             !event.target.classList.contains('crop-btn') &&
//             !event.target.classList.contains('draggable-image') &&
//             !event.target.classList.contains('empty')) {
//             hideButtons();
//         }
//     });
// });





// 処理2
function handleDragOver(event) {
    event.preventDefault();
    this.style.backgroundColor = "#d0f0c0"; // ドラッグ中の背景色変更
}

// ドラッグが離れたときの処理
function handleDragLeave(event) {
    this.style.backgroundColor = "transparent"; // ドラッグが離れたときの背景色リセット
}

// IndexedDBへの接続
const request = indexedDB.open("ImageDB", 1);

request.onupgradeneeded = function (event) {
    db = event.target.result;
    if (!db.objectStoreNames.contains("images")) {
        db.createObjectStore("images", { keyPath: "id" });
    }
};

request.onsuccess = function (event) {
    db = event.target.result;
    loadAllImages(); // ページロード時にすべての画像をロード
};

request.onerror = function (event) {
    console.error("IndexedDBに接続できませんでした:", event.target.error);
};

// 画像をIndexedDBに保存
function saveImageToIndexedDB(imageData, containerId) {
    const transaction = db.transaction(["images"], "readwrite");
    const store = transaction.objectStore("images");
    const request = store.put({ id: containerId, data: imageData });

    request.onsuccess = function () {
        console.log("画像がIndexedDBに保存されました:", containerId);
    };

    request.onerror = function (event) {
        console.error("画像の保存に失敗しました:", event.target.error);
    };
}

// IndexedDBから画像を取得
function loadImageFromIndexedDB(containerId, callback) {
    const transaction = db.transaction(["images"], "readonly");
    const store = transaction.objectStore("images");
    const request = store.get(containerId);

    request.onsuccess = function (event) {
        callback(event.target.result ? event.target.result.data : null);
    };

    request.onerror = function (event) {
        console.error("画像の取得に失敗しました:", event.target.error);
        callback(null);
    };
}

// IndexedDBから画像を削除
function clearImageFromIndexedDB(containerId) {
    const transaction = db.transaction(["images"], "readwrite");
    const store = transaction.objectStore("images");
    const request = store.delete(containerId);

    request.onsuccess = function () {
        console.log("画像がIndexedDBから削除されました:", containerId);
    };

    request.onerror = function (event) {
        console.error("画像の削除に失敗しました:", event.target.error);
    };
}

// すべての画像をロードする
function loadAllImages() {
    const emptyElements = document.querySelectorAll(".empty");
    emptyElements.forEach(function (dropArea) {
        loadImageFromIndexedDB(dropArea.id, function (imageData) {
            if (imageData) {
                dropArea.innerHTML = ""; // 既存の内容をクリア
                let img = new Image();
                img.src = imageData; // 画像データURLを設定
                img.classList.add("draggable-image");
                img.onclick = function () {
                    showButtons(this.parentNode); // 画像がクリックされたときにボタンを表示
                };
                dropArea.appendChild(img);
                addButtons(dropArea); // 削除ボタンとトリミングボタンを追加
            }
        });
    });
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

            // IndexedDBに画像データを保存
            saveImageToIndexedDB(e.target.result, this.id);
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

                // IndexedDBに画像データを保存
                saveImageToIndexedDB(e.target.result, dropArea.id);
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
        deleteButton.textContent = "削除"; // ボタンのテキストを設定
        deleteButton.onclick = function () {
            container.innerHTML = ""; // 画像を削除
            container.classList.remove("selected"); // 選択状態を解除
            container.style.backgroundColor = "transparent"; // 背景色をリセット
            hideButtons(); // ボタンを非表示にする

            // IndexedDBから画像データを削除
            clearImageFromIndexedDB(container.id);
        };
        container.appendChild(deleteButton);
    }

    // トリミングボタンが既に存在するか確認
    if (!container.querySelector(".crop-btn")) {
        let cropButton = document.createElement("button");
        cropButton.classList.add("crop-btn");
        cropButton.textContent = "トリミング"; // ボタンのテキストを設定
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

            // トリミング後の画像データをIndexedDBに保存
            saveImageToIndexedDB(croppedImage, container.id);
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

    // ページが読み込まれたときにIndexedDBから画像を復元
    loadAllImages();

    // ドキュメント全体をクリックしたときにボタンを非表示にする
    document.addEventListener("click", function (event) {
        if (!event.target.classList.contains('delete-btn') &&
            !event.target.classList.contains('crop-btn') &&
            !event.target.classList.contains('draggable-image') &&
            !event.target.classList.contains('empty')) {
            hideButtons();
        }
    });
});



















// テキストエリアの内容の保存と高さと幅を自動調整
function saveTextToLocalStorage() {
    document.querySelectorAll('.text-empty').forEach(textArea => {
        const id = textArea.id;
        localStorage.setItem(id, textArea.value);
    });
}

// テキストエリアの内容をローカルストレージから読み込む関数
function loadTextFromLocalStorage() {
    document.querySelectorAll('.text-empty').forEach(textArea => {
        const id = textArea.id;
        textArea.value = localStorage.getItem(id) || '';
    });
}

// テキストエリアの高さを調整する関数
function adjustHeight(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
}

// テキストエリアの幅を調整する関数
function adjustTextareaWidth(textarea) {
    textarea.style.width = 'auto';
    const scrollWidth = textarea.scrollWidth;
    textarea.style.width = `${scrollWidth}px`;
}

// 最大文字数の制限を外し、イベントリスナーを追加する関数
function enforceNoMaxLength(textarea) {
    textarea.addEventListener('input', function () {
        adjustHeight(this);
        adjustTextareaWidth(this);
        saveTextToLocalStorage();
    });

    adjustHeight(textarea);
    adjustTextareaWidth(textarea);
}

// ドキュメント読み込み時の処理
document.addEventListener("DOMContentLoaded", function () {
    loadTextFromLocalStorage();

    // テキストエリアごとに必要な処理を実行
    document.querySelectorAll('.text-empty').forEach(textarea => {
        enforceNoMaxLength(textarea);
    });

    // ロード後に高さ調整を行う
    setTimeout(() => {
        document.querySelectorAll('.text-empty').forEach(textarea => adjustHeight(textarea));
    }, 100);
});











// 枠変更 12-~3変更できない版
document.addEventListener('DOMContentLoaded', () => {
    const dropAreas = [];
    const resizeButtons = document.querySelectorAll('.resizeButton');
    let activeDropArea = null;

    // ドロップエリアをすべて取得し、配列に追加
    document.querySelectorAll('[id^="dropArea"]').forEach(dropArea => {
        dropAreas.push(dropArea);
        dropArea.addEventListener('pointerdown', () => handleDropAreaInteraction(dropArea));
    });

    // ドロップエリアがクリックまたはタッチされたときの処理
    const handleDropAreaInteraction = (dropArea) => {
        dropAreas.forEach(area => area.classList.remove('active'));
        dropArea.classList.add('active');
        activeDropArea = dropArea;
    };

    // サイズ変更ボタンがクリックまたはタッチされたときの処理
    const handleResizeButtonInteraction = (button) => {
        if (activeDropArea) {
            // サイズ変更を禁止するドロップエリアのリスト
            const restrictedDropAreas = ['dropArea12-1', 'dropArea12-2', 'dropArea12-3'];

            // サイズ変更を禁止するドロップエリアでない場合のみ処理
            if (!restrictedDropAreas.includes(activeDropArea.id)) {
                // サイズをすべてリセット
                activeDropArea.classList.remove('square', 'rectangle', 'mini');
                // ボタンの data-size 属性に基づいてサイズを変更
                const size = button.getAttribute('data-size');
                activeDropArea.classList.add(size);

                // サイズ情報をローカルストレージに保存（ドロップエリアごとに異なるキーを使用）
                localStorage.setItem(`dropAreaSize_${activeDropArea.id}`, size);
            }
        }
    };

    resizeButtons.forEach(button => {
        button.addEventListener('pointerdown', () => handleResizeButtonInteraction(button));
    });

    // ページロード時にローカルストレージからサイズを復元
    dropAreas.forEach(dropArea => {
        const savedSize = localStorage.getItem(`dropAreaSize_${dropArea.id}`);
        if (savedSize) {
            dropArea.classList.add(savedSize);
        }
    });
});







// 背景色とテキストの色の変更
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


















// アルバムIDを取得してそのIDを使ってサーバにデータを送信する
document.getElementById('sendButton').addEventListener('click', function () {
    // 認証トークンの設定（例：ローカルストレージやCookieから取得）
    const token = localStorage.getItem('token'); // 例：トークンがローカルストレージに保存されている場合
    
    // トークンが正しく取得できているか確認
    console.log('取得したトークン:', token);

    // トークンが存在しない場合、エラーを表示して終了
    if (!token) {
        console.error('認証トークンが見つかりません。ログインしてください。');
        return;
    }

    // サーバからアルバムIDを取得
    fetch('https://develop-back.kotobum.com/api/user/album', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, // 必要に応じて適切な認証ヘッダーを設定
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTPエラー: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    })
    .then(albumData => {
        console.log('取得したアルバムデータ:', albumData); // アルバムデータを確認

        const albumId = albumData.albumId; // 実際のレスポンス構造に合わせて修正

        // アルバムIDが取得できたかチェック
        if (!albumId) {
            console.error('アルバムIDを取得できませんでした。');
            return;
        }

        // 取得したい別のページのURL
        const otherPageUrl = '../preview/index.html'; // 例: 同一ドメイン内の別のページ

        // 別のHTMLページの内容を取得
        return fetch(otherPageUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`別のHTMLページの取得エラー: ${response.status} - ${response.statusText}`);
                }
                return response.text();
            })
            .then(htmlContent => {
                // ページのすべてのスタイルシートを取得
                let cssContent = '';
                let cssUrls = [];
                const cssPromises = [];

                // 現在のページのスタイルシートをループして処理
                for (let sheet of document.styleSheets) {
                    try {
                        if (sheet.href) {
                            // 外部CSSファイルのURLを取得
                            cssUrls.push(sheet.href);

                            // 外部CSSファイルの内容を取得するためにfetchを使用
                            cssPromises.push(
                                fetch(sheet.href)
                                    .then(response => response.text())
                                    .then(text => {
                                        cssContent += text;
                                    })
                                    .catch(e => {
                                        console.warn('スタイルシートの取得エラー:', e);
                                    })
                            );
                        } else {
                            // インラインスタイルシートの内容を取得
                            for (let rule of sheet.cssRules) {
                                cssContent += rule.cssText;
                            }
                        }
                    } catch (e) {
                        console.warn('スタイルシートの取得エラー:', e);
                    }
                }

                // すべてのfetchリクエストが完了するのを待つ
                return Promise.all(cssPromises).then(() => ({
                    htmlContent,
                    cssContent,
                    cssUrls
                }));
            });
    })
    .then(({ htmlContent, cssContent, cssUrls }) => {
        console.log('取得したHTMLコンテンツ:', htmlContent);
        console.log('取得したCSSコンテンツ:', cssContent);
        console.log('取得したCSS URL:', cssUrls);

        // ローカルストレージのすべてのデータを取得
        let localStorageData = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            localStorageData[key] = localStorage.getItem(key);
        }

        // FormDataオブジェクトを作成してbodyに代入
        const body = new FormData();
        body.append('htmlContent', htmlContent);  // 別のHTMLページの内容
        body.append('cssContent', cssContent);    // 現在のページのCSSの内容
        body.append('cssUrls', JSON.stringify(cssUrls));  // 外部CSSファイルのURLをJSON文字列にして追加
        body.append('localStorageData', JSON.stringify(localStorageData));  // ローカルストレージのデータをJSON文字列にして追加

        // fetch APIを使ってサーバに送信
        return fetch(`https://develop-back.kotobum.com/api/albums/${albumId}/body`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,  // トークンを追加
            },
            body: body // bodyを指定
        });
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`サーバ送信エラー: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('エラー:', error.message);
    });
});
