import express from "express";
import { recipeController } from "./recipe.controller";
const router = express.Router();

router.post("/recipeFeed", recipeController.createRecipeDataIntoDB);
router.get("/allRecipes", recipeController.getAllRecipesFromDB);
router.get("/myRecipe", recipeController.getMyRecipeFromDB);
router.delete("/myRecipe/:id", recipeController.deleteMyRecipeFromDB);
router.patch("/allRecipes/:id/ratings", recipeController.createRatingsData);
router.patch("/allRecipes/:id/upvote", recipeController.createUpVoteData);
router.patch("/allRecipes/:id/downvote", recipeController.createDownVoteData);
router.patch("/allRecipes/:id/comments", recipeController.createCommentsData);
router.delete("/recipes/:recipeId/comments/:commentId", recipeController.deleteRecipeComment);
router.put("/recipes/:recipeId/comments/:commentId", recipeController.updateComments);

export const recipeRoutes = router;
