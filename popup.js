document.addEventListener('DOMContentLoaded', async () => {
    
    
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    document.getElementById('urlInput').value = tab.url;
    document.getElementById('submitButton').addEventListener('click', async () => {

        const urlInput = document.getElementById('urlInput').value;
        const customCodeInput = document.getElementById('customCodeInput').value;
        const passwordInput = document.getElementById('passwordInput').value;
        const expirationInput = document.getElementById('expirationInput').value;

  
        if (!urlInput) {
            alert('Please enter a URL');
            return;
        }

        try {
            const response = await fetch('http://localhost:5001/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    originalUrl: urlInput,
                    customCode: customCodeInput,
                    password: passwordInput,
                    expiresAt: expirationInput
                })
            });


            if (response.status === 201) {
                const data = await response.json();
                window.location.href = `result.html?shortUrl=${encodeURIComponent(data.url.shortUrl)}&qrCode=${encodeURIComponent(data.qrCode)}`;
                saveToHistory(data.url.shortUrl, data.qrCode);
            } else {
                document.getElementById('result').innerText = 'Error shortening URL';
            }
        } catch (error) {
            document.getElementById('result').innerText = 'Error shortening URL';
        }
    });

    document.getElementById('historyButton').addEventListener('click', () => {
        window.location.href = 'history.html'; 
    });
    document.getElementById('shortenButton').addEventListener('click', () => {
        document.getElementById('urlInput').value = '';
        document.getElementById('customCodeInput').value = '';
        document.getElementById('passwordInput').value = '';
        document.getElementById('expirationInput').value = '';
        document.getElementById('urlInput').focus(); // Set focus back to URL input field
    });

    document.getElementById('showMoreButton').addEventListener('click', () => {
        const additionalFields = document.getElementById('additionalFields');
        const container = document.getElementById('container');
        
        if (additionalFields.classList.contains('hidden')) {
            additionalFields.classList.remove('hidden');
            additionalFields.style.display = 'block';
            container.classList.add('expanded');
            document.getElementById('showMoreButton').innerHTML = '<i class="fas fa-angle-up"></i>';
        } else {
            additionalFields.classList.add('hidden');
            additionalFields.style.display = 'none';
            container.classList.remove('expanded');
            document.getElementById('showMoreButton').innerHTML = '<i class="fas fa-angle-down"></i>';
        }
    });
});


function saveToHistory(shortUrl, qrCode) {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    history.push({ shortUrl, qrCode });
    localStorage.setItem('history', JSON.stringify(history));
}
