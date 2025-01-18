import View from "./view";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "Recipe not found";
  _message = "Start by searching for a meal just by the first letter!";

  _generateMarkup() {
    return this._data.map(this._generatePreview).join("");
  }

  _generatePreview(meal) {
    const id = window.location.hash.slice(1);
    return `
    <li class="preview">
      <a class="preview__link ${
        meal.id === id ? "preview__link--active" : ""
      }" href="#${meal.id}">
        <figure class="preview__fig">
            <img src="${meal.thumb}" alt="Photo" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${meal.title}</h4>
        </div>
      </a>
    </li>`;
  }
}

export default new ResultsView();
