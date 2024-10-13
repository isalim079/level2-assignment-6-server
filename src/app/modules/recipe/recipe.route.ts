import express from "express";
import { recipeController } from "./recipe.controller";
const router = express.Router();

router.post('/recipeFeed', recipeController.createRecipeDataIntoDB);
router.get('/allRecipes', recipeController.getAllRecipesFromDB)

export const recipeRoutes = router