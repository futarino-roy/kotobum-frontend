// スライドショーの設定
const swiper = new Swiper(".swiper", {
    pagination: {
        el: ".swiper-pagination",
        type: "fraction"
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    }
});

// アップロード処理
const fileInput = document.getElementById('fileInput');
const imageList = document.getElementById('imageList');

fileInput.addEventListener('change', (e) => {
    Array.from(e.target.files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.classList.add('thumbnail');
                img.draggable = true;
                img.addEventListener('dragstart', handleDragStart);
                imageList.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    });
});

// ドラッグ＆ドロップの処理
const dropZones = document.querySelectorAll('.dropZone');

dropZones.forEach(dropZone => {
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'blue';
    });

    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#ccc';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#ccc';
        const imageURL = e.dataTransfer.getData('text/plain');
        dropZone.innerHTML = `<img src="${imageURL}" alt="Dropped Image">`;
    });
});

function handleDragStart(e) {
    const img = e.target;
    e.dataTransfer.setData('text/plain', img.src);
    const dragImage = new Image();
    dragImage.src = img.src;
    dragImage.style.width = '100px';
    dragImage.style.height = '100px';
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 50, 50);
    setTimeout(() => document.body.removeChild(dragImage), 0);
}
