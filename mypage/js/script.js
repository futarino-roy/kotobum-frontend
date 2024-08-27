// document.addEventListener("DOMContentLoaded", function () {
//     // ユーザーの進捗状況を取得する関数
//     function getLastEditedPage() {
//         // 例として、最後に編集したページを3ページ目とする
//         // 実際にはサーバーやローカルストレージからデータを取得する処理が必要
//         return 3; // 仮のデータ
//     }

//     // プレビュー画像のパスを生成する関数
//     function getPreviewImagePath(pageNumber) {
//         return `/mypage/images/preview_page_${pageNumber}.png`; // 実際の画像パスに置き換える
//     }

//     // プレビュー画像を表示する関数
//     function showPreviewImage() {
//         const previewBox = document.getElementById("photobook-preview");
//         const pageNumber = getLastEditedPage();
//         const imagePath = getPreviewImagePath(pageNumber);

//         // プレビュー画像をクリア
//         previewBox.innerHTML = '';

//         // 新しいプレビュー画像を表示
//         const img = document.createElement("img");
//         img.src = imagePath;
//         img.alt = ``;
//         img.style.width = "100%"; // 必要に応じてスタイルを追加

//         previewBox.appendChild(img);
//     }

//     // プレビュー画像を表示
//     showPreviewImage();
// });



document.addEventListener('DOMContentLoaded', function() {
    fetch('https://develop-back.kotobum.com/api/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // トークンをローカルストレージから取得
        }
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}. ${text}`);
            });
        }
        return response.json();
    })
    .then(data => {
        const name = data.name; // サーバーから取得した名前
        document.querySelector('header p').textContent = `${name} 様`; // 名前を表示
    })
    .catch(error => {
        console.error('失敗:', error);
        alert('名前の取得に失敗しました。もう一度お試しください。');
    });
});

