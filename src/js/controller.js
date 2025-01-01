import "core-js/stable";
import "regenerator-runtime/runtime";

const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const API_URL = "https://www.themealdb.com/api/json/v1/1/";

const showRecipe = async function (mealName) {
  try {
    const res = await fetch(`${API_URL}search.php?s=${mealName}`);
    if (!res.ok) throw new Error("meal not find!");
    const { meals } = await res.json();
    const meal = meals.at(0);
    console.log(meal);
  } catch (err) {
    console.error(err.message);
  }
};

showRecipe("sushi");
