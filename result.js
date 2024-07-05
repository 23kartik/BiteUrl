document.addEventListener('DOMContentLoaded', function() {
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    function displayShortenedUrl(shortUrl, qrCode) {
        const resultContainer = document.getElementById('result');
        resultContainer.innerHTML = `
            <div class="shortened-url">
                <span>Shortened URL: <a href="${shortUrl}" target="_blank">${shortUrl}</a></span>
                <div class="shortened-url-actions">
                    <button id="copyButton" class="copy-button"><i class="fas fa-copy"></i></button>
                    <button class="share-button"><i class="fas fa-share"></i></button>
                   
                </div>
                <div id="shareOptions" class="share-options" style="display: none;">
                <div>
                   <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(shortUrl)}" target="_blank"><i class="fab fa-whatsapp"></i></a>
                </div>
                <div>
                    <a href="https://www.instagram.com/?url=${encodeURIComponent(shortUrl)}" target="_blank"><i class="fab fa-instagram"></i></a>

                </div>
                <div>
                    <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(shortUrl)}" target="_blank"><i class="fab fa-twitter"></i></a>

                </div>
                <div>
                    <a href="mailto:?subject=Check out this link&body=${encodeURIComponent(shortUrl)}" target="_blank"><i class="fas fa-envelope"></i></a>

                </div>
                </div>
                <div class="qr-code-container">
                    <img id="qrCodeImage" src="${qrCode}" style="display: block;" />
                </div>
            </div>
         
        `;

   

        const copyButton = resultContainer.querySelector('.copy-button');
        copyButton.addEventListener('click', () => copyToClipboard(shortUrl));

        const shareButton = resultContainer.querySelector('.share-button');
        
        shareButton.addEventListener('click', () => {
            const shareOptions = document.getElementById('shareOptions');
            shareOptions.style.display = shareOptions.style.display === 'none' ? 'flex' : 'none';
        });
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            const copyButton = document.getElementById('copyButton');
            copyButton.style.backgroundColor = '#ccc'; // Change to grey
            setTimeout(() => {
                copyButton.style.backgroundColor = '#4CAF50'; // Change back to green after 1 second
            }, 1000);
        }, function(err) {
            console.error('Could not copy text: ', err);
        });
    }


    const shortUrl = getQueryParam('shortUrl');
    const qrCode = getQueryParam('qrCode');

    if (shortUrl && qrCode) {
        displayShortenedUrl(shortUrl, qrCode);
    } else {
        document.getElementById('result').innerText = 'No shortened URL or QR code found';
    }
    document.getElementById('shortenButton').addEventListener('click', () => {
        window.location.href = 'popup.html'; 
    });
    document.getElementById('historyButton').addEventListener('click', () => {
        window.location.href = 'history.html'; 
    });
});
