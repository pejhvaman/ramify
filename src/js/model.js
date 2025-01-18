import { SEARCH_BY_ID_URL } from "./config";
import { SEARCH_BY_QUERY_URL } from "./config";
import { RES_PER_PAGE } from "./config";
import { getJson } from "./helpers";

export const state = {
  recipe: {},
  search: {
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
    console.log(meals);
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
        data[`strIngredient${i + 1}`],
        Number.parseFloat(data[`strMeasure${i + 1}`]) || "",
        data[`strMeasure${i + 1}`]
          ? data[`strMeasure${i + 1}`]
              .split("")
              .filter((el) => !Number.isFinite(+el))
              .join("")
          : "",
      ]).filter((el) => el[0] !== "" && el[0] !== null),
    };
    console.log(state.recipe);
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJson(`${SEARCH_BY_QUERY_URL}${query}`);

    console.log(data);
    const { meals } = data;

    state.search.results = meals.map((meal) => {
      return {
        id: meal.idMeal,
        title: meal.strMeal,
        thumb: meal.strMealThumb,
        sourceUrl: meal.strYoutube,
      };
    });
    state.search.page = 1; // to get back to page 1 after every search
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
  console.log(state.bookmarks);
};
