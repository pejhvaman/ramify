import icons from "url:../../../src/img/icons.svg";

import View from "./view";

class ResultsView extends View {
  _parentElement = document.querySelector(".search-results");
  _errorMessage = "Recipe not found";
  _message = "Start by searching for a meal just by the first letter!";

  // constructor() {
  //   super();
  //   this.renderMessage();
  // }

  render(data) {
    if (!data || (Array.isArray(data) && data.lenght === 0))
      return this.renderErrorMessage();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._insertMarkup(markup);
  }

  _generateMarkup() {
    return this._data.map(this._generatePreview).join("");
  }

  _generatePreview(meal) {
    return `<li class="preview">
    <a class="preview__link preview__link--active" href="#${meal.id}">
    <figure class="preview__fig">
        <img src="${meal.thumb}" alt="Photo" />
    </figure>
    <div class="preview__data">
        <h4 class="preview__title">${meal.title}</h4>
        <p  class="preview__publisher">View source</p>
        <div class="preview__user-generated">
        </div>
    </div>
    </a>
</li>`;
  }
}

export default new ResultsView();
