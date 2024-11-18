// 選択なし
// document.getElementById('signup-form').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const name = document.querySelector('input[name="name"]').value.trim();
//     const email = document.querySelector('input[name="email"]').value.trim();
//     const password = document.querySelector('input[name="password"]').value;

//     // 簡単なバリデーション
//     if (!name || !email || !password) {
//         alert('すべてのフィールドを入力してください。');
//         return;
//     }

//     // メールアドレスの形式を確認
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailPattern.test(email)) {
//         alert('無効なメールアドレスです。');
//         return;
//     }

//     // サーバーにリクエストを送信
//     fetch('https://develop-back.kotobum.com/api/register', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             name: name,
//             email: email,
//             password: password
//         })
//     })
//     .then(response => {
//         if (!response.ok) {
//             return response.text().then(text => {
//                 throw new Error(`Network response was not ok: ${response.status} ${response.statusText}. ${text}`);
//             });
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log('成功:', data);
//         // サインアップ成功後にログインページにリダイレクト
//         window.location.href = '/login'; // ここにリダイレクト先のURLを指定
//     })
//     .catch(error => {
//         console.error('失敗:', error);
//         alert('サインアップに失敗しました。もう一度お試しください。');
//     });
// });



// 選択アリ
document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.querySelector('input[name="name"]').value.trim();
    const login_id = document.querySelector('input[name="login_id"]').value.trim();
    const password = document.querySelector('input[name="password"]').value;
    const template = document.querySelector('input[name="template"]:checked').value; // AまたはBを取得
    const format = document.querySelector('select[name="format"]').value;

    // 簡単なバリデーション
    if (!name || !login_id || !password || !template || !format) {
        alert('すべてのフィールドを入力してください。');
        return;
    }
    if (password.length <= 8) {
        alert('パスワードは8文字以上で入力して下さい。');
        return;
    }
    // メールアドレスの形式を確認
    // const login_idPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!login_idPattern.test(login_id)) {
    //     alert('無効なメールアドレスです。');
    //     return;
    // }

    // サーバーにリクエストを送信
    fetch('https://develop-back.kotobum.com/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            login_id: login_id,
            password: password,
            template: template, // 選択された値をサーバーに送信
            format: format
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
            // サインアップ成功後にログインページにリダイレクト
            window.location.href = '/login';
        })
        .catch(error => {
            console.error('失敗:', error);
            alert('サインアップに失敗しました。もう一度お試しください。');
        });
});
