import View from "./view";

class PreviewView extends View {
  constructor() {
    super();
  }

  get _parentElement() {
    return document.querySelector(".bookmarks");
  }

  _generateMarkup() {
    return this._data?.map(this._generatePreview).join("");
  }

  _generatePreview(meal) {
    const id = window.location.hash.slice(1);
    return `
      <li class="preview">
        <a class="preview__link ${
          meal.id === id ? "preview__link--active" : ""
        }" href="#${meal.id}">
          <figure class="preview__fig">
              <img src="${meal.image}" alt="Photo" />
          </figure>
          <h4 class="preview__title">${meal.title}</h4>
        </a>
      </li>`;
  }
}

export default PreviewView;
