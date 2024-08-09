document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.querySelector('.name').value;
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.pass').value;
    const passwordConfirmation = document.querySelector('.pass-confirm').value; // 確認用パスワードを追加
    fetch('https://develop-back.kotobum.com/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation // 確認用パスワードを送信
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('成功:', data);
        // 成功すると次のページにリダイレクト
        window.location.href = ''; // 適切なリダイレクト先に変更
    })
    .catch(error => {
        console.error('失敗:', error);
    });
});