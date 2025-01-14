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
      sourceUrl: data.strSource,
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
        source: meal.strSource,
      };
    });
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};
