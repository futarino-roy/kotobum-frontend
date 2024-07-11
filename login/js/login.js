document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const id = document.querySelector('.id input').value;
    const password = document.querySelector('.pass input').value;

    fetch('', { // ログイン用のAPIエンドポイント
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            password: password
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('ネットワーク応答が正常ではありません');
        }
        return response.json();
    })
    .then(data => {
        console.log('成功:', data);
        // 成功すると次のページにリダイレクト
        window.location.href = '/mypage'; // ログイン後に遷移するページ
    })
    .catch(error => {
        console.error('失敗:', error);
    });
});
