document.addEventListener('DOMContentLoaded', function () {
  //　クエリパラメータの解析
  const urlParams = new URLSearchParams(window.location.search);

  const format = Number(urlParams.get('format'));
  const template = urlParams.get('template');
  const parts = urlParams.get('parts');
  const token = urlParams.get('token');
  const albumId = urlParams.get('albumId');

  if (!format) {
    console.warn('format情報が取得できませんでした。');
    return;
  }

  if (!template) {
    console.warn('template情報が取得できませんでした。');
    return;
  }

  if (!parts) {
    console.warn('表紙か中身かの情報が取得できませんでした。');
    return;
  }

  console.log(`フォーマット: ${format}, テンプレート: ${template}, ページ種類: ${parts}`);

  // フォーマット情報・テンプレ情報より該当ページへ遷移
  let nextPage = '';

  if (format === 1 && template === 'A' && parts === 'body') {
    nextPage = '../edit';
  } else if (format === 1 && template === 'A' && parts === 'cover') {
    nextPage = '../cover';
  } else if (format === 1 && template === 'B' && parts === 'body') {
    nextPage = '../editB';
  } else if (format === 1 && template === 'B' && parts === 'cover') {
    nextPage = '../coverB';
  } else if (format === 2 && template === 'A' && parts === 'body') {
    nextPage = '../edit2';
  } else if (format === 2 && template === 'A' && parts === 'cover') {
    nextPage = '../cover2';
  } else if (format === 2 && template === 'B' && parts === 'body') {
    nextPage = '../editB2';
  } else if (format === 2 && template === 'B' && parts === 'cover') {
    nextPage = '../coverB2';
  } else if (format === 3 && template === 'A' && parts === 'body') {
    nextPage = '../edit3';
  } else if (format === 3 && template === 'A' && parts === 'cover') {
    nextPage = '../cover3';
  } else if (format === 3 && template === 'B' && parts === 'body') {
    nextPage = '../editB3';
  } else if (format === 3 && template === 'B' && parts === 'cover') {
    nextPage = '../coverB3';
  } else if (format === 4 && template === 'A' && parts === 'body') {
    nextPage = '../edit4';
  } else if (format === 4 && template === 'A' && parts === 'cover') {
    nextPage = '../cover4';
  } else if (format === 4 && template === 'B' && parts === 'body') {
    nextPage = '../editB4';
  } else if (format === 4 && template === 'B' && parts === 'cover') {
    nextPage = '../coverB4';
  } else if (format === 5 && template === 'B' && parts === 'body') {
    nextPage = '../edit5_solo1';
  } else if (format === 5 && template === 'B' && parts === 'cover') {
    nextPage = '../cover5_solo1';
  } else if (format === 6 && template === 'B' && parts === 'body') {
    nextPage = '../edit6_solo2';
  } else if (format === 6 && template === 'B' && parts === 'cover') {
    nextPage = '../cover6_solo2';
  } else if (format === 7 && template === 'B' && parts === 'body') {
    nextPage = '../edit7_splo3';
  } else if (format === 7 && template === 'B' && parts === 'cover') {
    nextPage = '../cover7_solo3';
  } else {
    console.warn('対応するページが見つかりませんでした💦');
    return;
  }

  // 編集ページで使用するトークンとアルバムIDをローカルストレージに保存
  if (token) {
    localStorage.setItem('token', token);
  }
  if (albumId) {
    localStorage.setItem('albumId', albumId);
  }

  // 管理者判定用のクエリパラメータの設定
  const adminQuery = 'admin=true';
  const separator = nextPage.includes('?') ? '&' : '?'; // 既にクエリパラメータがあるかチェック
  const nextPageWithAdmin = `${nextPage}${separator}${adminQuery}`;

  //ページ遷移
  console.log(`遷移先のURL: ${nextPage}`);
  window.location.href = nextPageWithAdmin;
});
