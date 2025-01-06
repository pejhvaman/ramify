import "core-js/stable";
import "regenerator-runtime/runtime";
import icons from "url:./../img/icons.svg";

const API_URL = "https://www.themealdb.com/api/json/v1/1/";
const recipeContainer = document.querySelector(".recipe");
const searchInput = document.querySelector(".search__btn");
const searchField = document.querySelector(".search__field");
// helpers
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// event handlers
// searchInput.addEventListener("click", function (e) {
//   e.preventDefault();
//   const searchQuery = searchField.value;
//   if (!searchQuery) return;
//   console.log(searchField.value);
//   showRecipe(searchQuery);
//   searchField.value = "";
//   searchField.blur();
// });

["load", "hashchange"].forEach((ev) => {
  window.addEventListener(ev, showRecipe);
});

async function showRecipe() {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;

    // const res = await fetch(`${API_URL}search.php?s=${mealName}`);
    const res = await fetch(`${API_URL}lookup.php?i=${id}`);
    if (!res.ok) throw new Error("meal not find!");

    const { meals } = await res.json();
    console.log(meals);

    let recipe = meals.at(0);
    console.log(recipe);

    recipe = {
      id: recipe.idMeal,
      title: recipe.strMeal,
      category: recipe.strCategory,
      sourceUrl: recipe.strSource,
      image: recipe.strMealThumb,
      servings: 1, // by default
      instructions: recipe.strInstructions
        .split("\r")
        .filter((el) => el !== "\n" && el !== "\r"), //FIXME
      ingredients: Array.from({ length: 20 }, (_, i) => [
        recipe[`strIngredient${i + 1}`],
        Number.parseFloat(recipe[`strMeasure${i + 1}`]) || "",
        recipe[`strMeasure${i + 1}`],
      ]).filter((el) => el[0] !== "" && el[0] !== null),
    };

    console.log(recipe);
    console.log(recipe.ingredients);
    console.log(recipe.instructions);

    const markup = `
      <figure class="recipe__fig">
          <img src="${recipe.image}" alt="${
      recipe.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
      </figure>
      <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-category"></use>
            </svg>
            <span class="recipe__info-text">${recipe.category}</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              recipe.servings
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
          ${recipe.ingredients
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
          ${recipe.instructions
            .map(
              (inst, i) => `<li class="recipe__directions-step">
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
            href="${recipe.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
    `;

    recipeContainer.innerHTML = "";
    recipeContainer.insertAdjacentHTML("afterbegin", markup);
  } catch (err) {
    console.error(err.message);
  }
}

// showRecipe(53065);
