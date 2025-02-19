import "core-js/stable";
import "regenerator-runtime/runtime";

import RecipeView from "./views/recipeView";
import SearchView from "./views/searchView";
import ResultsView from "./views/resultsView";
import PaginationView from "./views/paginationView";
import BookmarksView from "./views/bookmarksView";

import * as model from "./model";
import paginationView from "./views/paginationView";
import bookmarksView from "./views/bookmarksView";

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

    ResultsView.update(model.getSerachResultsPage());

    BookmarksView.update(model.state.bookmarks);

    console.log(model.state.recipe);
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
  const resultsPerPage = model.getSerachResultsPage(goToPage);
  ResultsView.render(resultsPerPage);
  paginationView.render(model.state.search);
}

function controlServings(newServings) {
  model.updateServings(newServings);
  RecipeView.update(model.state.recipe);
}

function controlAddBookmark() {
  if (model.state.recipe.bookmarked)
    model.deleteBookmark(model.state.recipe.id);
  else if (!model.state.recipe.bookmarked)
    model.addBookmark(model.state.recipe);

  model.storeBookmarks();

  RecipeView.update(model.state.recipe);

  if (model.state.bookmarks.length === 0) BookmarksView.renderMessage();
  if (model.state.bookmarks.length !== 0)
    BookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function () {
  if (model.state.bookmarks?.length !== 0)
    bookmarksView.render(model.state.bookmarks);
  else bookmarksView.renderErrorMessage();
};

const init = function () {
  RecipeView.addHandlerRender(controlRecipe);
  RecipeView.addHandlerUpdateServings(controlServings);
  RecipeView.addHandlerBookmark(controlAddBookmark);
  SearchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerPagination(controlPagination);
  BookmarksView.addHandlerRender(controlBookmarks);
};

init();
