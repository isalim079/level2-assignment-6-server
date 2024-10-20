import { Request, Response } from "express";
import { recipeServices } from "./recipe.service";

const createRecipeDataIntoDB = async (req: Request, res: Response) => {
  try {
    const recipeData = req.body;
    const result = await recipeServices.createRecipeIntoDB(recipeData);
    res.status(200).json({
      success: true,
      message: "Recipe created successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllRecipesFromDB = async (req: Request, res: Response) => {
  try {
    const result = await recipeServices.getAllRecipesFromDB();
    res.status(200).json({
      success: true,
      message: "All recipes fetched successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getMyRecipeFromDB = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    const result = await recipeServices.getMyRecipeFromDB(email as string);

    res.status(200).json({
      success: true,
      message: "Recipe retrieved by email success",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteMyRecipeFromDB = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await recipeServices.deleteMyRecipeFromDB(id);

    if (result.deletedCount === 1) {
      res.status(200).json({
        success: true,
        message: "Your recipe deleted successfully!",
        data: null,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const createRatingsData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ratingInfo = req.body;
    const result = await recipeServices.createRatingsData(id, ratingInfo)

    res.status(200).json({
      success: true,
      message: "Rate the recipe success!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const createUpVoteData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const upVoteInfo = req.body;
    const result = await recipeServices.createUpVoteData(id, upVoteInfo)

    res.status(200).json({
      success: true,
      message: "Recipe Liked!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const recipeController = {
  createRecipeDataIntoDB,
  getAllRecipesFromDB,
  getMyRecipeFromDB,
  deleteMyRecipeFromDB,
  createRatingsData,
  createUpVoteData
};
