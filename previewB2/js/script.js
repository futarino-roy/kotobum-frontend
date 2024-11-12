// スライド
const swiper = new Swiper('.swiper', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    slidesPerView: 1,
    slidesPerGroup: 1,
    initialSlide: 23, // 最後のスライドのインデックス
    breakpoints: {
        900: {
            slidesPerView: 2,
            slidesPerGroup: 2,
        },
    },
});
// プレビューからメイン
document.getElementById('editBack').addEventListener('click', function () {
    const currentSlideIndex = swiper.realIndex; // 現在のスライドインデックスを取得
    const mainPageUrl = `../editB/index.html?slide=${currentSlideIndex + 1}`; // スライド番号をクエリパラメータに追加
    window.location.href = mainPageUrl; // メインページに遷移
});