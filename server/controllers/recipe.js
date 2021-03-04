import fetch from "node-fetch";

export const getAllRecipes = async (req, res) => {
  const { query } = req.params;
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&addRecipeInformation=true&addRecipeNutrition=true&fillIngredients=true&apiKey=ebc9308d8f42410e987b825f8c1aa4ca`
    );
    const data = await response.json();
    // console.log(data.results[0].analyzedInstructions[0].steps);
    res.status(200).json(data.results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
