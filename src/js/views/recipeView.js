import icons from "/public/icons.svg";

import View from "./view";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _errorMessage = "Recipe not found";
  _message = "Start by searching for a recipe or an ingredient. Have fun!";

  constructor() {
    super();
    this.renderMessage();
  }

  addHandlerRender(handler) {
    ["load", "hashchange"].forEach((ev) => {
      window.addEventListener(ev, handler);
    });
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btnServings = e.target.closest(".btn__servings");
      if (!btnServings) return;
      const currentServings = +this.querySelector(".recipe__info-data--people")
        .textContent;
      const newServings = btnServings.classList.contains(
        "btn__servings--decrease"
      )
        ? currentServings > 1
          ? currentServings - 1
          : currentServings
        : currentServings + 1;
      this.querySelector(".recipe__info-data--people").textContent =
        newServings;
      handler(newServings);
    });
  }

  addHandlerBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const bookmarkBtn = e.target.closest(".btn__bookmark");
      if (!bookmarkBtn) return;
      handler();
    });
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
            <span class="recipe__info-data recipe__info-data--people recipe__servings">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn__servings btn__servings--decrease">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn__servings btn__servings--increase">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>
          <button class="btn--round btn__bookmark">
            <svg>
              <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? "-fill" : ""
    }"></use>
            </svg>
          </button>
        </div>
        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this._data.ingredients
            .map(this._generateIngredientsMarkup)
            .join("")}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <ul class="recipe__directions-steps">
          ${this._data.instructions
            .map(this._generateInstructionsMarkup)
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

  _generateIngredientsMarkup(ingredient) {
    return `<li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${ingredient[1] || ""}</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ingredient[2]}</span>
        ${ingredient[0]}
      </div>
    </li>`;
  }

  _generateInstructionsMarkup(instruction) {
    return `<li class="recipe__directions-step">
    ${
      instruction.length > 10
        ? `<svg class="recipe__icon">
      <use href="${icons}#icon-step"></use>
    </svg>`
        : ""
    }  
    <div class="recipe__directions--description">
      ${instruction}
    </div>
  </li>`;
  }
}

export default new RecipeView();
