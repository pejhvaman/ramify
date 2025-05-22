//https://www.themealdb.com/api.php

import { SEARCH_BY_ID_URL } from "./config";
import { SEARCH_BY_QUERY_URL } from "./config";
import { RES_PER_PAGE } from "./config";
import { getJson } from "./helpers";

export const state = {
  recipe: {},
  search: {
    visibility: "",
    query: "",
    page: 1,
    results: [],
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const { meals } = await getJson(`${SEARCH_BY_ID_URL}${id}`);
    const data = meals.at(0);

    console.log(data);

    state.recipe = {
      id: data.idMeal,
      title: data.strMeal,
      category: data.strCategory,
      sourceUrl: data.strYoutube,
      image: data.strMealThumb,
      servings: 1, // by default
      instructions: data.strInstructions
        .split("\r")
        .filter((el) => el !== "\n" && el !== "\r"),
      ingredients: Array.from({ length: 20 }, (_, i) => [
        data[`strIngredient${i + 1}`], // first el= ing name
        Number.parseFloat(data[`strMeasure${i + 1}`]) || "", // second el= ing amount
        data[`strMeasure${i + 1}`]
          ? data[`strMeasure${i + 1}`]
              .split("")
              .filter((el) => !Number.isFinite(+el))
              .join("")
          : "", // third el= ing material
      ]).filter((el) => el[0] !== "" && el[0] !== null),
    }; //BUG: some recipes are useing number like 1/2, 1/4 that it is a challenge to update servings with it-- this API is just used to practice and not to build the finall production, in future maybe I will solve this bug😉

    // assume that we already have some bookmarks, so every time we load a recipe we check if that has been bookmarked before or not
    if (state.bookmarks?.some((bm) => bm.id === state.recipe.id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJson(`${SEARCH_BY_QUERY_URL}${query[0]}`); // This API supports searching maels only by first letter!

    const { meals } = data;

    state.search.results = meals.map((meal) => {
      return {
        id: meal.idMeal,
        title: meal.strMeal,
        image: meal.strMealThumb,
        sourceUrl: meal.strYoutube,
      };
    });
    state.search.page = 1; // to get back to page 1 after every search

    state.search.visibility = "visible";
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export const getSerachResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe = {
    ...state.recipe,
    ingredients: state.recipe.ingredients.map((ing) => [
      ing[0],
      (ing[1] * newServings) / state.recipe.servings,
      ing[2],
    ]),
    servings: newServings,
  };
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  state.recipe.bookmarked = true;
};

export const deleteBookmark = function (id) {
  state.bookmarks.splice(
    state.bookmarks.findIndex((bm) => bm.id === id),
    1
  );
  state.recipe.bookmarked = false;
};

export const storeBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks ?? []));
};

export const persistBookmarks = function () {
  const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  if (storedBookmarks) state.bookmarks = storedBookmarks;
};

export const toggleResultsVisibility = function (visibility) {
  state.search.visibility = visibility;
};

const init = function () {
  persistBookmarks();
};

init();
