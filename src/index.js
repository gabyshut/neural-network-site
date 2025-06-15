import "./styles/index.css";

function getData(path) {
  return fetch(path)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Данные не найдена");
      }
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
}

function createCard(template, articleInfo) {
  const cardTemplate = template.content.cloneNode(true);

  cardTemplate.querySelector(".articles__title").textContent =
    articleInfo["name"];
  cardTemplate.querySelector(".articles__description").textContent =
    articleInfo.description;
  cardTemplate
    .querySelector(".articles__link")
    .setAttribute(
      "href",
      `article.html?name=${encodeURIComponent(articleInfo.name)}`
    );
  return cardTemplate;
}

const cardElementTemplate = document.querySelector(".card-template");

async function renderArticles() {
  const articles = await getData("/data/articles.json");
  const listContainer = document.querySelector(".articles__list");
  const menuContainer = document.querySelector(".header__menu");

  articles.forEach((article) => {
    const card = createCard(cardElementTemplate, article);
    listContainer.appendChild(card);

    // Добавляем ссылку в меню
    const link = document.createElement("a");
    link.classList.add("header__link");
    link.textContent = article.name;
    link.href = `article.html?name=${encodeURIComponent(article.name)}`;
    menuContainer.appendChild(link);
  });
}


renderArticles();

getData("/data/glossary.json")
  .then((terms) => {
    const template = document.querySelector(".term-template");
    const glossaryList = document.querySelector(".glossary__terms-list");

    terms.forEach((item) => {
      const clone = template.content.cloneNode(true);
      const termElement = clone.querySelector(".glossary__term");
      termElement.textContent = item.term;
      termElement.addEventListener("click", () => {
        openPopup(item.term, item.definition); // definition берём из JSON
      });
      glossaryList.appendChild(clone);
    });
  })
  .catch((err) => {
    console.error(err);
  });

const overlay = document.querySelector('.overlay');
const popupOverlay = document.querySelector('.popup-overlay');
const menuOverlay = document.querySelector('.menu-overlay');
const popupTerm = document.querySelector(".popup__term");
const popupDefinition = document.querySelector(".popup__definition");

// Открыть попап
function openPopup(term, definition) {
  popupTerm.textContent = term;
  popupDefinition.textContent = definition;
  popupOverlay.classList.remove("hidden");
}

// Закрыть меню и попап
function closeOverlay() {
  menuOverlay.classList.add("hidden");
  popupOverlay.classList.add("hidden");
  menu.classList.remove("header__menu_active");
  document.body.classList.remove("menu-open");
}

const closeButtons = document.querySelectorAll(".close-button");

// Кнопки закрытия
closeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    closeOverlay();
  });
});

// Закрытие по клику на оверлей
popupOverlay.addEventListener("click", (e) => {
  if (e.target === popupOverlay) {
    closeOverlay();
  }
});

menuOverlay.addEventListener("click", (e) => {
  if (e.target === menuOverlay) {
    closeOverlay();
  }
});


const menu = document.querySelector('.header__menu')
const headerButton = document.querySelector('.header__button');
headerButton.addEventListener("click", () => {
  menu.classList.add("header__menu_active");
  menuOverlay.classList.remove("hidden");
  document.body.classList.add("menu-open");
});

document.querySelectorAll('.header__link[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    closeOverlay();
  });
});
