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

const getAllRecipesFromDB = async (rq: Request, res: Response) => {
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

export const recipeController = {
    createRecipeDataIntoDB,
    getAllRecipesFromDB,
};
