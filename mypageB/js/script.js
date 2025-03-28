document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('token'); // トークンを取得
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
      Authorization: `Bearer ${token}`, // トークンをヘッダーに追加
    },
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(`Network response was not ok: ${response.status} ${response.statusText}. ${text}`);
        });
      }
      return response.json();
    })
    .then((data) => {
      userData = data; // グローバル変数に保存
      const username = data.name; // サーバーから取得した名前
      const format = data.format;
      console.log('フォーマット情報：', format);
      const headerParagraph = document.querySelector('header p');
      if (headerParagraph) {
        headerParagraph.textContent = `${username} 様`; // 名前を表示
      } else {
        console.error('HTML 内に <header> <p> が見つかりません。');
      }
      //中身編集ボタンのリンク先をフォーマットに応じて設定
      const editBtn = document.getElementById('editBtnB');
      if (editBtn) {
        editBtn.addEventListener('click', (event) => {
          event.preventDefault();

          if (format === 1) {
            window.location.href = '../editB';
          } else if (format === 2) {
            window.location.href = '../editB2';
          } else if (format === 3) {
            window.location.href = '../editB3';
          } else if (format === 4) {
            window.location.href = '../editB4';
          } else {
            console.warn('不明なフォーマット情報：', format);
          }
        });
      } else {
        console.error('編集ボタンが見つかりません。');
      }
      //中身プレビューボタン
      const previewBtn = document.getElementById('previewBtnB');
      if (previewBtn) {
        previewBtn.addEventListener('click', (event) => {
          event.preventDefault();

          if (format === 1) {
            window.location.href = '../previewB';
          } else if (format === 2) {
            window.location.href = '../previewB2';
          } else if (format === 3) {
            window.location.href = '../previewB3';
          } else if (format === 4) {
            window.location.href = '../previewB4';
          } else {
            console.warn('不明なフォーマット情報：', format);
          }
        });
      } else {
        console.error('編集ボタンが見つかりません。');
      }

      //表紙編集ボタン
      const coverBtn = document.getElementById('coverBtnB');
      if (coverBtn) {
        coverBtn.addEventListener('click', (event) => {
          event.preventDefault();

          if (format === 1) {
            window.location.href = '../coverB';
          } else if (format === 2) {
            window.location.href = '../coverB2';
          } else if (format === 3) {
            window.location.href = '../coverB3';
          } else if (format === 4) {
            window.location.href = '../coverB4';
          } else {
            console.warn('不明なフォーマット情報：', format);
          }
        });
      } else {
        console.error('編集ボタンが見つかりません。');
      }

      //表紙プレビューボタン
      const coverpreviewBtn = document.getElementById('cover-previewBtnB');
      if (coverpreviewBtn) {
        coverpreviewBtn.addEventListener('click', (event) => {
          event.preventDefault();

          if (format === 1) {
            window.location.href = '../coverB-preview';
          } else if (format === 2) {
            window.location.href = '../coverB-preview2';
          } else if (format === 3) {
            window.location.href = '../coverB-preview3';
          } else if (format === 4) {
            window.location.href = '../coverB-preview4';
          } else {
            console.warn('不明なフォーマット情報：', format);
          }
        });
      } else {
        console.error('編集ボタンが見つかりません。');
      }
    })
    .catch((error) => {
      console.error('失敗:', error);
      alert('名前の取得に失敗しました。3秒後にログインページにリダイレクトします。');
      let countdown = 3; // カウントダウンの秒数
      const display = document.getElementById('countdown');

      const timer = setInterval(() => {
        display.textContent = `${countdown}秒後にログインページにリダイレクトします...`;
        countdown--;

        if (countdown < 0) {
          clearInterval(timer); // タイマーを止める
          window.location.href = '../login'; // リダイレクト
        }
      }, 1000); // 1秒ごとに実行
    });
});

function logout() {
  localStorage.removeItem('token');
  // ログインページにリダイレクト
  window.location.href = '../login'; // ログインページのURLに変更
}

// ログアウトボタンのクリックイベントに関連づけ
document.getElementById('logoutButton').addEventListener('click', logout);

//----------------- モーダルに関するJavaScript---------------------

//要素を取得
// const modal = document.querySelectorAll(".js-modal, .js-modal2");
const openButtons = document.querySelectorAll('.js-modal-open, .js-modal-open2');

//「開くボタン」をクリックしてモーダルを開く
openButtons.forEach((button) => {
  button.addEventListener('click', modalOpen);
});

function modalOpen(event) {
  const target = event.currentTarget.getAttribute('data-target');
  console.log(`クリックされたボタンのターゲット: ${target}`); // コンソールにクリックされたボタンのターゲットを表示

  const modal = document.querySelector(target);
  if (modal) {
    console.log(`開かれたモーダル: ${modal.id}`); // コンソールに開かれたモーダルのIDを表示
    modal.classList.add('is-active');
  } else {
    console.error(`モーダルが見つかりません: ${target}`); // モーダルが見つからない場合のエラーログ
  }
}

const modals = document.querySelectorAll('.js-modal1, .js-modal2');

modals.forEach((modal) => {
  // モーダルの外側がクリックされたときにモーダルを閉じる
  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.classList.remove('is-active');
    }
  });

  // モーダル内の閉じるボタンがクリックされたときにモーダルを閉じる
  const closeButton = modal.querySelector('.js-modal-close');
  if (closeButton) {
    closeButton.addEventListener('click', function () {
      modal.classList.remove('is-active');
    });
  }
});

//----------- モーダル内の校了ボタンを押した後のモーダル 表紙用 -------------------
const modalF = document.querySelector('.js-modal1');
const modalS = document.querySelector('.js-modal1_2');

// 校了ボタンの取得
const changeButtons = document.querySelectorAll('.modal-change_l');

changeButtons.forEach((changeButton) => {
  changeButton.addEventListener('click', function () {
    // 最初のモーダルを非表示
    modalF.classList.remove('is-active');
    // 次のモーダルを表示
    modalS.classList.add('is-active');
    // 完了状態をlocalStorageに保存
    localStorage.setItem('coverCompleted', 'true');
    // サーバにも送信
    sendCompletionStatusToServerCover();
  });
});

//----------- モーダル内の校了ボタンを押した後のモーダル 中身用 -------------------
const modalF_r = document.querySelector('.js-modal2');
const modalS_r = document.querySelector('.js-modal2_2');

// 校了ボタンの取得
const changeButton_rs = document.querySelectorAll('.modal-change_r');

changeButton_rs.forEach((changeButton_r) => {
  changeButton_r.addEventListener('click', function () {
    // 最初のモーダルを非表示
    modalF_r.classList.remove('is-active');
    // 次のモーダルを表示
    modalS_r.classList.add('is-active');
    // 完了状態をlocalStorageに保存
    localStorage.setItem('mainTextCompleted', 'true');
    // サーバにも送信
    sendCompletionStatusToServerMain();
  });
});

// ページ読み込み時にクエリパラメータをチェック
window.addEventListener('DOMContentLoaded', () => {
  // URLのクエリパラメータを取得
  const urlParams = new URLSearchParams(window.location.search);
  console.log(window.location.search);

  // "disable" パラメータが true ならボタンを無効化
  if (urlParams.get('disable') === 'true') {
    const myPageButton = document.querySelector('.buttonC_r');

    if (myPageButton) {
      myPageButton.disabled = true; // ボタンを無効化
      myPageButton.style.cursor = 'not-allowed'; // カーソル変更
      myPageButton.style.pointerEvents = 'none'; // クリックイベントを無効化
    } else {
      console.log('ボタンが見つかりませんでした');
    }
  }
});

// モーダルを閉じる機能 - エラー修正版
document.addEventListener('DOMContentLoaded', function () {
  // モーダル関連の要素を安全に取得
  const safeGetElement = function (selector) {
    const element = document.querySelector(selector);
    return element || null; // 見つからない場合はnullを返す
  };

  // 完了モーダルの要素（ID: modal1）を取得
  const modal1 = safeGetElement('#modal1');

  // マイページへボタンを取得（クラスやIDが分からないため、テキスト内容で検索）
  const myPageButton = Array.from(document.querySelectorAll('button, a')).find((el) => el.textContent.includes('マイページへ'));

  // ボタンとモーダルの両方が存在する場合のみ処理
  if (myPageButton && modal1) {
    console.log('マイページへボタンとモーダルを検出しました');

    // クリックイベントを追加
    myPageButton.addEventListener('click', function (e) {
      console.log('マイページへボタンがクリックされました');

      // モーダルを非表示にする
      try {
        modal1.style.display = 'none';

        // is-activeクラスがあれば削除（モーダルによって使用されるクラス名が異なる場合があります）
        modal1.classList.remove('is-active');

        console.log('モーダルを非表示にしました');
      } catch (error) {
        console.error('モーダルを閉じる際にエラーが発生しました:', error);
      }

      // イベントの伝播を停止
      e.stopPropagation();
    });

    console.log('マイページへボタンにイベントリスナーを追加しました');
  } else {
    console.warn('マイページへボタンまたはモーダルが見つかりませんでした');
    console.log('マイページへボタン:', myPageButton);
    console.log('モーダル:', modal1);
  }

  // 特定のモーダルが存在しない場合に備えて、より一般的なモーダルクローズ処理
  const allModals = document.querySelectorAll('.modal, [id^="modal"]');
  console.log('検出されたモーダル数:', allModals.length);

  allModals.forEach(function (modal) {
    console.log('検出されたモーダル:', modal.id || 'ID無し');

    // モーダル内の「マイページへ」ボタンを探す
    const modalButton = Array.from(modal.querySelectorAll('button, a')).find((el) => el.textContent.includes('マイページへ'));

    if (modalButton) {
      console.log('モーダル内のマイページへボタンを検出:', modalButton);

      modalButton.addEventListener('click', function (e) {
        console.log('モーダル内のマイページへボタンがクリックされました');

        try {
          // モーダルを非表示
          modal.style.display = 'none';

          // 一般的なモーダルクラスを削除
          modal.classList.remove('is-active', 'active', 'show', 'visible');

          console.log('モーダルを非表示にしました');
        } catch (error) {
          console.error('モーダルを閉じる際にエラーが発生しました:', error);
        }
      });
    }
  });

  // 完了通知のオーバーレイが存在する場合の処理
  const completionOverlay = safeGetElement('.completion-overlay') || safeGetElement('.overlay') || safeGetElement('.modal-background');

  if (completionOverlay) {
    console.log('完了オーバーレイを検出しました');

    // オーバーレイ内の「マイページへ」ボタンを探す
    const overlayButton = Array.from(completionOverlay.querySelectorAll('button, a')).find((el) => el.textContent.includes('マイページへ'));

    if (overlayButton) {
      console.log('オーバーレイ内のマイページへボタンを検出しました');

      overlayButton.addEventListener('click', function () {
        console.log('オーバーレイ内のマイページへボタンがクリックされました');

        try {
          // オーバーレイを非表示
          completionOverlay.style.display = 'none';
          console.log('オーバーレイを非表示にしました');

          // 関連するモーダルがあれば非表示
          const relatedModals = document.querySelectorAll('.modal, [id^="modal"]');
          relatedModals.forEach(function (modal) {
            modal.style.display = 'none';
            modal.classList.remove('is-active', 'active', 'show', 'visible');
          });

          console.log('関連するモーダルも非表示にしました');
        } catch (error) {
          console.error('オーバーレイを閉じる際にエラーが発生しました:', error);
        }
      });
    }
  }
});

// 本文完了ボタンに問題のクラスが追加されるのを防ぐコード
document.addEventListener('DOMContentLoaded', function () {
  // モーダル関連のイベントが発生する前に実行
  const mypageButtons = document.querySelectorAll('[class*="modal-checkafter__mypage"]');

  mypageButtons.forEach((button) => {
    // クリックイベントをキャプチャフェーズで捕捉（他のイベントよりも先に実行）
    button.addEventListener(
      'click',
      function (e) {
        // イベント処理の直後に実行するように設定
        setTimeout(() => {
          const end2Button = document.getElementById('end2');
          if (end2Button && end2Button.classList.contains('btn-small_bl')) {
            // 問題のクラスを削除
            end2Button.classList.remove('btn-small_bl');
          }
        }, 0);
      },
      true
    ); // キャプチャフェーズで実行
  });

  // もう一つのアプローチ: 動的にクラスの追加を監視して防止
  const end2Button = document.getElementById('end2');
  if (end2Button) {
    // MutationObserverを使用してクラス変更を監視
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          // btn-small_blクラスが追加されたら即座に削除
          if (end2Button.classList.contains('btn-small_bl')) {
            end2Button.classList.remove('btn-small_bl');
          }
        }
      });
    });

    // 属性変更を監視
    observer.observe(end2Button, { attributes: true });
  }
});

// 完了ボタンとステータス管理の機能拡張
document.addEventListener('DOMContentLoaded', function () {
  // 完了ボタンを取得
  const coverCompletionButton = document.getElementById('end1');
  const mainTextCompletionButton = document.getElementById('end2');

  // ステータス表示要素を取得
  const coverStatusText = document.getElementById('coverStatusText');
  const mainTextStatusText = document.getElementById('maintextStatusText');

  // localStorage から完了状態を取得
  const coverCompleted = localStorage.getItem('coverCompleted') === 'true';
  const mainTextCompleted = localStorage.getItem('mainTextCompleted') === 'true';

  // 完了ボタンを初期状態でアクティブにする
  if (coverCompletionButton && !coverCompleted) {
    coverCompletionButton.classList.add('active');
    coverCompletionButton.disabled = false;
  }

  if (mainTextCompletionButton && !mainTextCompleted) {
    mainTextCompletionButton.classList.add('active');
    mainTextCompletionButton.disabled = false;

    // btn-small_bl クラスが追加されないように監視 (本文ボタンの形状維持)
    if (mainTextCompletionButton.classList.contains('buttonC_r')) {
      const observer = new MutationObserver(function (mutations) {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            if (mainTextCompletionButton.classList.contains('btn-small_bl')) {
              mainTextCompletionButton.classList.remove('btn-small_bl');
            }
          }
        });
      });

      observer.observe(mainTextCompletionButton, { attributes: true });
    }
  }

  // 既に完了している場合は、ボタンを無効化してステータスを完了に
  if (coverCompleted) {
    // 表紙の完了ボタンを無効化
    if (coverCompletionButton) {
      coverCompletionButton.classList.remove('active');
      coverCompletionButton.disabled = true;
    }

    // 表紙のステータスを完了に
    if (coverStatusText) {
      coverStatusText.textContent = '完了';
      coverStatusText.classList.remove('is-incomplete');
      coverStatusText.classList.add('is-complete');
    }

    // 表紙の編集ボタンも無効化（オプション）
    const coverEditButton = document.querySelector('.button-container a[href="/cover/index.html"]');
    if (coverEditButton) {
      coverEditButton.style.pointerEvents = 'none';
      coverEditButton.style.opacity = '0.6';
    }
  }

  if (mainTextCompleted) {
    // 本文の完了ボタンを無効化
    if (mainTextCompletionButton) {
      mainTextCompletionButton.classList.remove('active');
      mainTextCompletionButton.disabled = true;
    }

    // 本文のステータスを完了に
    if (mainTextStatusText) {
      mainTextStatusText.textContent = '完了';
      mainTextStatusText.classList.remove('is-incomplete');
      mainTextStatusText.classList.add('is-complete');
    }

    // 本文の編集ボタンも無効化（オプション）
    const mainTextEditButton = document.querySelector('.button-container a[href="/edit/index.html"]');
    if (mainTextEditButton) {
      mainTextEditButton.style.pointerEvents = 'none';
      mainTextEditButton.style.opacity = '0.6';
    }
  }

  // 表紙の完了モーダル内の「完了」ボタンクリック時の処理
  const coverModalCompleteButtons = document.querySelectorAll('.modal-change_l');
  coverModalCompleteButtons.forEach((button) => {
    button.addEventListener('click', function () {
      // 完了状態をlocalStorageに保存
      localStorage.setItem('coverCompleted', 'true');
      // サーバにも送信
      sendCompletionStatusToServerCover();

      // ステータスを更新
      if (coverStatusText) {
        coverStatusText.textContent = '完了';
        coverStatusText.classList.remove('is-incomplete');
        coverStatusText.classList.add('is-complete');
      }

      // 表紙のマイページへボタンクリック時に完了ボタンを無効化
      const coverMyPageButtons = document.querySelectorAll('.modal-checkafter__mypage_l');
      coverMyPageButtons.forEach((myPageButton) => {
        myPageButton.addEventListener('click', function () {
          if (coverCompletionButton) {
            coverCompletionButton.classList.remove('active');
            coverCompletionButton.disabled = true;
          }

          // 表紙の編集ボタンも無効化（オプション）
          const coverEditButton = document.querySelector('.button-container a[href="/cover/index.html"]');
          if (coverEditButton) {
            coverEditButton.style.pointerEvents = 'none';
            coverEditButton.style.opacity = '0.6';
          }
        });
      });
    });
  });

  // 本文の完了モーダル内の「完了」ボタンクリック時の処理
  const mainTextModalCompleteButtons = document.querySelectorAll('.modal-change_r');
  mainTextModalCompleteButtons.forEach((button) => {
    button.addEventListener('click', function () {
      // 完了状態をlocalStorageに保存
      localStorage.setItem('mainTextCompleted', 'true');
      // サーバにも送信
      sendCompletionStatusToServerMain();

      // ステータスを更新
      if (mainTextStatusText) {
        mainTextStatusText.textContent = '完了';
        mainTextStatusText.classList.remove('is-incomplete');
        mainTextStatusText.classList.add('is-complete');
      }

      // 本文のマイページへボタンクリック時に完了ボタンを無効化
      const mainTextMyPageButtons = document.querySelectorAll('.modal-checkafter__mypage_r');
      mainTextMyPageButtons.forEach((myPageButton) => {
        myPageButton.addEventListener('click', function () {
          if (mainTextCompletionButton) {
            mainTextCompletionButton.classList.remove('active');
            mainTextCompletionButton.disabled = true;
          }

          // 本文の編集ボタンも無効化（オプション）
          const mainTextEditButton = document.querySelector('.button-container a[href="/edit/index.html"]');
          if (mainTextEditButton) {
            mainTextEditButton.style.pointerEvents = 'none';
            mainTextEditButton.style.opacity = '0.6';
          }
        });
      });
    });
  });

  // マイページへボタンクリック時の共通処理（ボタンの形状維持とページリロード）
  document.addEventListener(
    'click',
    function (event) {
      if (event.target.textContent && event.target.textContent.includes('マイページへ')) {
        // 本文ボタンの形状を維持
        setTimeout(() => {
          if (mainTextCompletionButton) {
            mainTextCompletionButton.style.display = 'flex';
            mainTextCompletionButton.style.flexDirection = 'column';
            mainTextCompletionButton.style.alignItems = 'center';
            mainTextCompletionButton.style.justifyContent = 'center';

            if (mainTextCompletionButton.classList.contains('btn-small_bl')) {
              mainTextCompletionButton.classList.remove('btn-small_bl');
            }
          }

          // ページをリロードして状態を反映（オプション）
          // window.location.reload();
        }, 0);
      }
    },
    true
  );
});

// ステータスボタンにスクロール機能を追加
document.addEventListener('DOMContentLoaded', function () {
  // ステータスボタンを取得
  const coverStatusButton = document.getElementById('coverStatus');
  const maintextStatusButton = document.getElementById('maintextStatus');

  // 表紙ステータスボタンのクリックイベント
  if (coverStatusButton) {
    coverStatusButton.addEventListener('click', function () {
      // ステータスが未完了の場合のみスクロール
      const statusText = document.getElementById('coverStatusText');
      if (statusText && statusText.textContent === '未完了') {
        // 表紙デザインセクションを取得して、そこへスクロール
        const coverSection = document.querySelector('.mypage_flex .design-card:first-child');
        if (coverSection) {
          coverSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }

  // 本文ステータスボタンのクリックイベント
  if (maintextStatusButton) {
    maintextStatusButton.addEventListener('click', function () {
      // ステータスが未完了の場合のみスクロール
      const statusText = document.getElementById('maintextStatusText');
      if (statusText && statusText.textContent === '未完了') {
        // 本文デザインセクションを取得して、そこへスクロール
        const maintextSection = document.querySelector('.mypage_flex .design-card:last-child');
        if (maintextSection) {
          maintextSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    });
  }

  // ステータスボタンにカーソルを変更する（クリック可能なことを示す）
  [coverStatusButton, maintextStatusButton].forEach((button) => {
    if (button) {
      // ステータスが未完了の場合のみポインタカーソルを適用
      const statusText = button.querySelector('.status-text');
      if (statusText && statusText.textContent === '未完了') {
        button.style.cursor = 'pointer';
      }
    }
  });
});

// スマホとPC両方で確実にモーダルを閉じる処理
document.addEventListener('DOMContentLoaded', function () {
  // マイページボタンの取得（モーダル内のすべての「マイページへ」ボタン）
  const myPageButtons = document.querySelectorAll('.modal-checkafter__mypage_l, .modal-checkafter__mypage_r');

  myPageButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
      // すべてのモーダルを非表示にする
      const allModals = document.querySelectorAll('.modal, .js-modal1, .js-modal2, .js-modal1_2, .js-modal2_2');
      allModals.forEach((modal) => {
        // is-activeクラスを削除
        modal.classList.remove('is-active');
        // 念のためdisplayプロパティも設定
        modal.style.display = 'none';
      });

      // マイページに戻る
      window.location.href = '/mypage/index.html';

      // イベント伝播を停止
      e.preventDefault();
      e.stopPropagation();
    });
  });
});

// 校了状態をサーバに送信する関数(中身)
function sendCompletionStatusToServerMain() {
  const token = localStorage.getItem('token'); // 認証トークンを取得
  const Id = userData ? userData.id : null; // グローバルに保存されたデータからIDを取得

  if (!token || !Id) {
    console.error('トークンまたはアルバムIDが見つかりません💦');
  } else {
    fetch(`https://develop-back.kotobum.com/api/albums/${Id}/body/send`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        completed: true, // サーバーに送る完了状態
        id: 'userId',
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTPエラー: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('サーバーに完了状態を送信しました:', data);
      })
      .catch((error) => {
        console.error('完了状態送信中にエラーが発生しました💦', error);
      });
  }
}

// 校了状態をサーバに送信する関数(表紙)
function sendCompletionStatusToServerCover() {
  const token = localStorage.getItem('token'); // 認証トークンを取得
  const Id = userData ? userData.id : null; // グローバルに保存されたデータからIDを取得

  if (!token || !Id) {
    console.error('トークンまたはアルバムIDが見つかりません💦');
  } else {
    fetch(`https://develop-back.kotobum.com/api/albums/${Id}/cover/send`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        completed: true, // サーバーに送る完了状態
        id: 'userId',
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTPエラー: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('サーバーに完了状態を送信しました:', data);
      })
      .catch((error) => {
        console.error('完了状態送信中にエラーが発生しました💦', error);
      });
  }
}
