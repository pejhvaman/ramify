import icons from "url:../../img/icons.svg";

class recipeView {
  _data;
  _parentElement = document.querySelector(".recipe");

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._insertMarkup(markup);
  }

  _generateMarkup() {
    return `
      <figure class="recipe__fig">
          <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
      </figure>
      <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-category"></use>
            </svg>
            <span class="recipe__info-text">${this._data.category}</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark"></use>
            </svg>
          </button>
        </div>
        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this._data.ingredients
            .map((ingredient) => {
              return `<li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ingredient[1]}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ingredient[2]}</span>
                ${ingredient[0]}
              </div>
            </li>`;
            })
            .join("")}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <ul class="recipe__directions-steps">
          ${this._data.instructions
            .map(
              (inst) => `<li class="recipe__directions-step">
              ${
                inst.length > 10
                  ? `<svg class="recipe__icon">
                <use href="${icons}#icon-step"></use>
              </svg>`
                  : ""
              }  
              <div class="recipe__directions--description">
                ${inst}
              </div>
            </li>`
            )
            .join("")}
            
          </ul>
          <a
            class="btn--small recipe__btn"
            href="${this._data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
    `;
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  _insertMarkup(markup) {
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderSpinner() {
    const markup = `
            <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>
            `;
    this._clear();
    this._insertMarkup(markup);
  }
}

export default new recipeView();
