import express from "express";
import { recipeController } from "./recipe.controller";
const router = express.Router();

router.post('/recipeFeed', recipeController.createRecipeDataIntoDB);
router.get('/allRecipes', recipeController.getAllRecipesFromDB)
router.get('/myRecipe', recipeController.getMyRecipeFromDB)
router.delete('/myRecipe/:id', recipeController.deleteMyRecipeFromDB)
router.patch('/allRecipes/:id/ratings', recipeController.createRatingsData)


export const recipeRoutes = router