import { Types } from "mongoose";
import { TRatings, TRecipe } from "./recipe.interface";
import { Recipe } from "./recipe.model";

const createRecipeIntoDB = async (recipeData: TRecipe) => {
  const result = await Recipe.create(recipeData);
  return result;
};

const getAllRecipesFromDB = async () => {
  const result = await Recipe.find().sort({ rating: -1 });
  return result;
};

const getMyRecipeFromDB = async (email: string) => {
  const result = await Recipe.find({ email });
  return result;
};

const deleteMyRecipeFromDB = async (id: string) => {
  const objectId = new Types.ObjectId(id);
  const result = await Recipe.deleteOne(objectId);
  return result;
};

const createRatingsData = async (id: string, updateInfo: TRatings) => {
  const objectId = new Types.ObjectId(id);

  const recipe = await Recipe.findById(objectId);

  const existingRating = recipe?.ratingsData?.find(
    (rating) => rating.email === updateInfo.email
  );

  if (!existingRating) {
    const result = await Recipe.findOneAndUpdate(
      { _id: objectId },
      { $push: { ratingsData: updateInfo } },
      { new: true }
    );
    return result;
  }

  if (existingRating) {
    const result = await Recipe.findOneAndUpdate(
      { _id: objectId, "ratingsData.email": updateInfo.email },
      { $set: { "ratingsData.$.ratings": updateInfo.ratings } },
      { new: true }
    );
    return result;
  }
};

export const recipeServices = {
  createRecipeIntoDB,
  getAllRecipesFromDB,
  getMyRecipeFromDB,
  deleteMyRecipeFromDB,
  createRatingsData,
};
