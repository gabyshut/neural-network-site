import './styles/article.css';

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Функция форматирования текста статьи в абзацы
function renderArticleText(text, container) {
  const paragraphs = text.split('\n');
  container.innerHTML = '';

  paragraphs.forEach((para) => {
    if (para.trim()) {
      const p = document.createElement('p');
      p.textContent = para.trim();
      container.appendChild(p);
    }
  });
}

async function loadArticle() {
  const nameParam = getQueryParam('name');
  if (!nameParam) {
    alert('Не указана статья');
    return;
  }

  const res = await fetch('./data/articles.json');
  const articles = await res.json();

  const article = articles.find((a) => a.name === nameParam);
  if (!article) {
    alert('Статья не найдена');
    return;
  }

  // Заполнение страницы
  document.querySelector('.article-page__title').textContent = article.name;

  // Отображение текста с разбивкой на абзацы
  const textContainer = document.querySelector('.article-page__text');
  renderArticleText(article.text, textContainer);

  // Ссылка
  const link = document.querySelector('.article-page__link');
  link.setAttribute('href', article.source);
  link.setAttribute('target', '_blank')
  link.textContent = 'Попробуйте сами!';

  // Медиа
  const mediaContainer = document.querySelector('.media');
  mediaContainer.innerHTML = ''; // очищаем перед добавлением
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
    } else if (item.type === 'iframe') {
    const iframe = document.createElement('iframe');
    iframe.src = item.src;
    iframe.title = item.title || '';
    iframe.width = '560';
    iframe.height = '315';
    iframe.frameBorder = '0';
    iframe.allow =
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    mediaContainer.appendChild(iframe);
  }

  });
}

loadArticle();
