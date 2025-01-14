import "core-js/stable";
import "regenerator-runtime/runtime";

import RecipeView from "./views/recipeView";
import SearchView from "./views/searchView";
import ResultsView from "./views/resultsView";
import PaginationView from "./views/paginationView";

import * as model from "./model";
import paginationView from "./views/paginationView";

// if (module.hot) {
//   module.hot.accept();
// }

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

    ResultsView.render(model.getSerachResultsPage());

    PaginationView.render(model.state.search);
  } catch (err) {
    console.error(err.message);
    ResultsView.renderErrorMessage();
  }
}

function controlPagination(goToPage) {
  console.log(goToPage);
  const resultsPerPage = model.getSerachResultsPage(goToPage);
  console.log(resultsPerPage);
  ResultsView.render(resultsPerPage);
  paginationView.render(model.state.search);
}

const init = function () {
  RecipeView.addHandlerRender(controlRecipe);
  SearchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerPagination(controlPagination);
};

init();
