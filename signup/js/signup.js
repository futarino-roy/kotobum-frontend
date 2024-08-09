document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const id = document.querySelector('.id input').value;
    const password = document.querySelector('.pass input').value;

    fetch('https://develop-back.kotobum.com/api/resister', {
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
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('成功:', data);
        // 成功すると次のページに
        window.location.href = '';
    })
    .catch(error => {
        console.error('失敗:', error);
    });
});
