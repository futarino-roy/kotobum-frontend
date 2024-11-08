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
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const login_id = document.querySelector('input[name="login_id"]').value.trim();
    const password = document.querySelector('input[name="password"]').value;

    // バリデーション
    if (!login_id || !password) {
        showError('すべてのフィールドを入力してください。');
        return;
    }

    // メールアドレスの形式を確認
    // const login_idPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!login_idPattern.test(login_id)) {
    //     showError('無効なメールアドレスです。');
    //     return;
    // }

    // サーバーにリクエストを送信
    fetch('https://develop-back.kotobum.com/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login_id: login_id,
            password: password
        })
    })
        .then(response => {
            if (!response.ok) {
                // サーバーからのエラーレスポンスを取得
                return response.json().then(data => {
                    const errorMessage = data.message || 'ログインIDまたはパスワードが正しくありません。';
                    if (errorMessage === 'Invalid login ID or password') {
                        // ログインIDまたはパスワードが異なる場合のメッセージ
                        throw new Error('ログインIDまたはパスワードが正しくありません。');
                    } else {
                        throw new Error(errorMessage);
                    }
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('成功:', data);
            localStorage.setItem('token', data.token); // トークンを保存
            localStorage.setItem('template', data.template); // トークンを保存
            localStorage.setItem('format', data.format); // トークンを保存

            const format = data.format;
            console.log('フォーマット情報：', format)

            // サーバーから取得した情報
            const template = data.template; // サーバーから「template」情報を取得

            // テンプレート情報をコンソールに出力
            console.log('取得したテンプレート情報:', template);

            // 選択されたtemplateに基づいてリダイレクト
            if (template === 'A') {
                window.location.href = '../mypage';
            } else if (template === 'B') {
                window.location.href = '../mypageB';
            } else {
                window.location.href = '/mypageB'; // template情報が無い場合のデフォルト
            }
        })
        .catch(error => {
            console.error('失敗:', error);
            showError('ログインに失敗しました。エラーの詳細: ' + error.message);
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
