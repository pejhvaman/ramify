import "core-js/stable";
import "regenerator-runtime/runtime";

import RecipeView from "./views/recipeView";
import SearchView from "./views/searchView";
import ResultsView from "./views/resultsView";

import * as model from "./model";

async function controlRecipe() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    RecipeView.renderSpinner();

    await model.loadRecipe(id);

    RecipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err.message);
    RecipeView.renderErrorMessage();
  }
}

async function controlSearchResults() {
  try {
    const query = SearchView.getQuery();
    if (!query) return;

    ResultsView.renderSpinner();

    await model.loadSearchResults(query);

    console.log(model.state.search.results);
    // searchView.clearInput(); // It has to be in the view and private!
    ResultsView.render(model.state.search.results);
  } catch (err) {
    console.error(err.message);
    ResultsView.renderErrorMessage();
  }
}

const init = function () {
  SearchView.addHandlerSearch(controlSearchResults);
  RecipeView.addHandlerRender(controlRecipe);
};

init();
