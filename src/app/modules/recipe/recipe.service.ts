import { TRecipe } from "./recipe.interface"
import { Recipe } from "./recipe.model"

const createRecipeIntoDB = async(recipeData: TRecipe) => {
    const result = await Recipe.create(recipeData)
    return result
}

const getAllRecipesFromDB = async () => {
    const result = await Recipe.find();
    return result;
};

export const recipeServices = {
    createRecipeIntoDB,
    getAllRecipesFromDB,
}