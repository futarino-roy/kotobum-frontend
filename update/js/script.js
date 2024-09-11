// // Swiperの設定
// const swiper = new Swiper(".swiper", {
//     pagination: {
//         el: ".swiper-pagination",
//         type: "fraction"
//     },
//     navigation: {
//         nextEl: ".swiper-button-next",
//         prevEl: ".swiper-button-prev"
//     }
// });

// // アップロード処理
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

// // ドラッグ＆ドロップの処理
// const dropZones = document.querySelectorAll('.dropZone');

// dropZones.forEach(dropZone => {
//     dropZone.addEventListener('dragover', (e) => {
//         e.preventDefault();
//         dropZone.style.borderColor = 'blue';
//     });

//     dropZone.addEventListener('dragleave', (e) => {
//         e.preventDefault();
//         dropZone.style.borderColor = '#ccc';
//     });

//     dropZone.addEventListener('drop', (e) => {
//         e.preventDefault();
//         dropZone.style.borderColor = '#ccc';
//         const imageURL = e.dataTransfer.getData('text/plain');
//         dropZone.innerHTML = `<img src="${imageURL}" alt="Dropped Image">`;
//         dropZone.querySelector('img').addEventListener('click', () => {
//             openCroppieModal(imageURL, dropZone);
//         });
//     });
// });

// function handleDragStart(e) {
//     const img = e.target;
//     e.dataTransfer.setData('text/plain', img.src);
//     const dragImage = new Image();
//     dragImage.src = img.src;
//     dragImage.style.width = '100px';
//     dragImage.style.height = '100px';
//     document.body.appendChild(dragImage);
//     e.dataTransfer.setDragImage(dragImage, 50, 50);
//     setTimeout(() => document.body.removeChild(dragImage), 0);
// }

// // Croppieの設定
// const croppieModal = document.getElementById('croppieModal');
// const croppieElement = document.getElementById('croppie-container');
// let croppieInstance;

// function openCroppieModal(imageURL, dropZone) {
//     croppieModal.style.display = 'block';
//     if (croppieInstance) {
//         croppieInstance.destroy();
//     }
//     croppieInstance = new Croppie(croppieElement, {
//         viewport: { width: 200, height: 200, type: 'square' },
//         boundary: { width: 300, height: 300 },
//         showZoomer: true,
//         enableResize: false
//     });
//     croppieInstance.bind({ url: imageURL });
//     document.getElementById('crop-button').onclick = () => {
//         croppieInstance.result({ type: 'canvas', size: 'original', format: 'jpeg', quality: 1 }).then((croppedImage) => {
//             dropZone.innerHTML = `<img src="${croppedImage}" alt="Cropped Image">`;
//             dropZone.querySelector('img').addEventListener('click', () => {
//                 openCroppieModal(croppedImage, dropZone);
//             });
//             croppieModal.style.display = 'none';
//         });
//     };
//     document.getElementById('close-button').onclick = () => {
//         croppieModal.style.display = 'none';
//     };
// }






// // ドロワー
// let currentContentId = null;

// const toggleDrawer = () => {
//     const drawer = document.getElementById('drawer');
//     const content = document.getElementById('content');
//     const sidebar = document.getElementById('sidebar');

//     drawer.classList.toggle('open');
//     sidebar.classList.toggle('open');
//     content.classList.toggle('open');

//     if (!drawer.classList.contains('open')) {
//         currentContentId = null; // ドロワーが閉じたときにcurrentContentIdをリセット
//     }
// };

// const showDrawerContent = (contentId) => {
//     const drawerContent = document.getElementById('drawer-content');
//     const contentElement = document.getElementById(contentId);

//     if (!contentElement) {
//         console.error(`Content element with ID '${contentId}' not found.`);
//         return;
//     }

//     if (contentId === currentContentId && drawer.classList.contains('open')) {
//         // 同じボタンをクリックしてドロワーが開いている場合、閉じる
//         toggleDrawer();
//         return;
//     }

//     // 全てのコンテンツを非表示にする
//     const allContentItems = document.querySelectorAll('.content-item');
//     allContentItems.forEach(item => {
//         item.style.display = 'none';
//     });

//     // 選択されたコンテンツを表示する
//     contentElement.style.display = 'block';

//     currentContentId = contentId;

//     if (!drawer.classList.contains('open')) {
//         toggleDrawer(); // ドロワーが閉じている場合は開く
//     }
// };



