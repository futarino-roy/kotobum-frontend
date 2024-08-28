// // 選択なし
// document.getElementById('login-form').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const email = document.querySelector('input[name="email"]').value.trim();
//     const password = document.querySelector('input[name="password"]').value;

//     // バリデーション
//     if (!email || !password) {
//         showError('すべてのフィールドを入力してください。');
//         return;
//     }

//     // メールアドレスの形式を確認
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailPattern.test(email)) {
//         showError('無効なメールアドレスです。');
//         return;
//     }

//     // サーバーにリクエストを送信
//     fetch('https://develop-back.kotobum.com/api/login', { // ログイン用のAPIエンドポイント
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             email: email,
//             password: password
//         })
//     })
//     .then(response => {
//         if (!response.ok) {
//             return response.json().then(data => {
//                 throw new Error(data.message || 'サーバーエラーが発生しました。');
//             });
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log('成功:', data);
//         // トークンをローカルストレージに保存
//         localStorage.setItem('token', data.token); // サーバーのレスポンスに合わせて 'token' を変更してください
//         // 成功すると次のページにリダイレクト
//         window.location.href = '/mypage'; // ログイン後に遷移するページ
//     })
//     .catch(error => {
//         console.error('失敗:', error);
//         showError('ログインに失敗しました。メールアドレスまたはパスワードを確認してください。');
//     });
// });

// // エラーメッセージを表示する関数
// function showError(message) {
//     const errorElement = document.getElementById('error-message');
//     if (errorElement) {
//         errorElement.textContent = message;
//     } else {
//         alert(message); // Fallback
//     }
// }



// 選択アリ
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.querySelector('input[name="email"]').value.trim();
    const password = document.querySelector('input[name="password"]').value;

    // バリデーション
    if (!email || !password) {
        showError('すべてのフィールドを入力してください。');
        return;
    }

    // メールアドレスの形式を確認
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showError('無効なメールアドレスです。');
        return;
    }

    // サーバーにリクエストを送信
    fetch('https://develop-back.kotobum.com/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.message || 'サーバーエラーが発生しました。');
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('成功:', data);
        localStorage.setItem('token', data.token); // トークンを保存

        // サーバーから取得した情報
        const template = data.template; // サーバーから「template」情報を取得

        // 選択されたtemplateに基づいてリダイレクト
        if (template === 'A') {
            window.location.href = '../mypage';
        } else if (template === 'B') {
            window.location.href = '/mypageB';
        } else {
            window.location.href = '../edit'; // template情報が無い場合のデフォルト
        }
    })
    .catch(error => {
        console.error('失敗:', error);
        showError('ログインに失敗しました。メールアドレスまたはパスワードを確認してください。');
    });
});

// エラーメッセージを表示する関数
function showError(message) {
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        errorElement.textContent = message;
    } else {
        alert(message); // Fallback
    }
}
