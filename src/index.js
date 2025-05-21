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

  articles.forEach((article) => {
    const card = createCard(cardElementTemplate, article);
    listContainer.appendChild(card);
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

const popupOverlay = document.querySelector(".popup-overlay");
const popupTerm = document.querySelector(".popup__term");
const popupDefinition = document.querySelector(".popup__definition");

// Открыть попап
function openPopup(term, definition) {
  popupTerm.textContent = term;
  popupDefinition.textContent = definition;
  popupOverlay.classList.remove("hidden");
}

// Закрыть попап
const closeButtons = document.querySelectorAll(".close-button");
closeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    popupOverlay.classList.add("hidden");
    document.querySelector(".header__menu")?.classList.remove("header__menu_active");
  });
});

// (опционально) закрыть по клику на затемнение
popupOverlay.addEventListener("click", (e) => {
  if (e.target === popupOverlay) {
    popupOverlay.classList.add("hidden");
  }
});


const headerButton = document.querySelector('.header__button');
headerButton.addEventListener('click', (evt) => {
    document.querySelector('.header__menu').classList.add('header__menu_active');
})