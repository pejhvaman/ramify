const API_URL = "https://www.themealdb.com/api/json/v1/1/";

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(`${API_URL}lookup.php?i=${id}`);
    if (!res.ok)
      throw new Error(
        `Meal with id=${id} not found.🔴 ${res.message} (${res.status})`
      );
    // const meals = await res.json();
    const { meals } = await res.json();
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
    // console.log(state.recipe.ingredients);
    // console.log(state.recipe.instructions);
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};
