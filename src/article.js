import './styles/article.css';

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function loadArticle() {
    const nameParam = getQueryParam('name');
    if (!nameParam) {
        alert('Не указана статья');
        return;
    }

    const res = await fetch('/data/articles.json');
    const articles = await res.json();

    const article = articles.find((a) => a.name === nameParam);
    if (!article) {
        alert('Статья не найдена');
        return;
    }

    // Заполнение страницы
    document.querySelector('.article-page__title').textContent = article.name;
    document.querySelector('.article-page__description').textContent = article.text;
    document.querySelector('.article-page__link').setAttribute('href', article.source);
    document.querySelector('.article-page__link').textContent = 'Попробуйте сами!';

    const mediaContainer = document.querySelector('.media');
    article.media.forEach((item) => {
        if (item.type === 'image') {
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.alt || '';
            mediaContainer.appendChild(img);
        } else if (item.type === 'video') {
            const video = document.createElement('video');
            video.src = item.src;
            video.controls = true;
            mediaContainer.appendChild(video);
        } else if (item.type === 'audio') {
            const audio = document.createElement('audio');
            audio.src = item.src;
            audio.controls = true;
            mediaContainer.appendChild(audio);
        }
    });
}

loadArticle();
