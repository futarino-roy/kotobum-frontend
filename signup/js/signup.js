document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    fetch('https://develop-back.kotobum.com/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
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
        console.log('成功:', data);
        // 成功すると次のページにリダイレクト
        window.location.href = '次のページのURL';  // ここにリダイレクト先のURLを指定
    })
    .catch(error => {
        console.error('失敗:', error);
        // ユーザーにエラーを表示するなどの処理を追加する
        alert('サインアップに失敗しました。もう一度お試しください。');
    });
});
