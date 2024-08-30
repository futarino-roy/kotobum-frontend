document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('authToken'); // トークンを取得
    console.log('取得したトークン:', token); // トークンをコンソールに表示

    if (!token) {
        console.error('トークンが見つかりません。サインインしてください。');
        alert('サインインしてください。');
        return;
    }

    fetch('https://develop-back.kotobum.com/api/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // トークンをヘッダーに追加
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
        const username = data.name; // サーバーから取得した名前
        const headerParagraph = document.querySelector('header p');
        if (headerParagraph) {
            headerParagraph.textContent = `${username} 様`; // 名前を表示
        } else {
            console.error('HTML 内に <header> <p> が見つかりません。');
        }
    })
    .catch(error => {
        console.error('失敗:', error);
        alert('名前の取得に失敗しました。もう一度お試しください。');
    });
});



