document.addEventListener('DOMContentLoaded', function() {
    const historyContainer = document.getElementById('history');
    const origHistory = JSON.parse(localStorage.getItem('history')) || [];

    const history=origHistory.reverse()

    if (history.length === 0) {
        historyContainer.innerText = 'No history found';
    } else {
        history.forEach((item, index) => {
            const div = document.createElement('div');
            div.classList.add('shortened-url');
            div.innerHTML = `
                <span>Shortened URL: <a href="${item.shortUrl}" target="_blank">${item.shortUrl}</a></span>
                <div class="shortened-url-actions">
                    <button class="copy-button"><i class="fas fa-copy"></i></button>
                    <button class="share-button" data-index="${index}"><i class="fas fa-share"></i></button>
                    <button class="qr-code-icon"><i class="fas fa-qrcode"></i></button>
                </div>
                <div id="shareOptions-${index}" class="share-options" style="display: none;">
                    <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(item.shortUrl)}" target="_blank"><i class="fab fa-whatsapp"></i></a>
                    <a href="https://www.instagram.com/?url=${encodeURIComponent(item.shortUrl)}" target="_blank"><i class="fab fa-instagram"></i></a>
                    <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(item.shortUrl)}" target="_blank"><i class="fab fa-twitter"></i></a>
                    <a href="mailto:?subject=Check out this link&body=${encodeURIComponent(item.shortUrl)}" target="_blank"><i class="fas fa-envelope"></i></a>
                </div>
                <div class="qr-code-container">
                    <img src="${item.qrCode}" style="display: none;" />
                </div>
            `;

            const copyButton = div.querySelector('.copy-button');
            copyButton.addEventListener('click', () => copyToClipboard(item.shortUrl));

            const shareButton = div.querySelector('.share-button');
            shareButton.addEventListener('click', () => {
                const index = shareButton.getAttribute('data-index');
                const shareOptions = div.querySelector(`#shareOptions-${index}`);
                shareOptions.style.display = shareOptions.style.display === 'none' ? 'flex' : 'none';
            });

            const qrCodeIcon = div.querySelector('.qr-code-icon');
            const qrCodeImage = div.querySelector('.qr-code-container img');
            qrCodeIcon.addEventListener('click', () => {
                qrCodeImage.style.display = qrCodeImage.style.display === 'none' ? 'block' : 'none';
            });

            historyContainer.appendChild(div);
        });
    }

    document.getElementById('shortenButton').addEventListener('click', () => {
        window.location.href = 'popup.html';
    });

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copied to clipboard');
        }, function(err) {
            console.error('Could not copy text: ', err);
        });
    }
});
