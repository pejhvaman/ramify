import "core-js/stable";
import "regenerator-runtime/runtime";

import recipeView from "./views/recipeView";

import * as model from "./model";

// const searchInput = document.querySelector(".search__btn");
// const searchField = document.querySelector(".search__field");

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

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // let searchUrl = `${API_URL}lookup.php?i=${id}`;
    // if (query !== "" && query.length > 0)
    //   searchUrl = `${API_URL}search.php?s=${query}`;

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err.message);
  }
};

["load", "hashchange"].forEach((ev) => {
  window.addEventListener(ev, controlRecipe);
});
