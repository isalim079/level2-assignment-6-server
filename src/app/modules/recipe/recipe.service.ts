import { Types } from "mongoose";
import {
  TComments,
  TDownVote,
  TRatings,
  TRecipe,
  TUpVote,
} from "./recipe.interface";
import { Recipe } from "./recipe.model";

const createRecipeIntoDB = async (recipeData: TRecipe) => {
  const result = await Recipe.create(recipeData);
  return result;
};

const getAllRecipesFromDB = async () => {
  const result = await Recipe.find();
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

const createUpVoteData = async (id: string, updateInfo: TUpVote) => {
  const objectId = new Types.ObjectId(id);
  const upVoteId = await Recipe.findById(objectId);

  const existingUpvote = upVoteId?.upvote.find(
    (upvote) => upvote.email === updateInfo.email
  );

  if (!existingUpvote) {
    const result = await Recipe.findOneAndUpdate(
      { _id: objectId },
      { $push: { upvote: updateInfo } },
      { new: true }
    );
    return result;
  }

  if (existingUpvote) {
    const result = await Recipe.findOneAndUpdate(
      { _id: objectId, "upvote.email": updateInfo.email },
      { $set: { "upvote.$.upvote": updateInfo.upvote } },
      { new: true }
    );
    return result;
  }
};

const createDownVoteData = async (id: string, updateInfo: TDownVote) => {
  const objectId = new Types.ObjectId(id);
  const downVoteId = await Recipe.findById(objectId);

  const existingDownvote = downVoteId?.downvote.find(
    (upvote) => upvote.email === updateInfo.email
  );

  if (!existingDownvote) {
    const result = await Recipe.findOneAndUpdate(
      { _id: objectId },
      { $push: { downvote: updateInfo } },
      { new: true }
    );
    return result;
  }

  if (existingDownvote) {
    const result = await Recipe.findOneAndUpdate(
      { _id: objectId, "downvote.email": updateInfo.email },
      { $set: { "downvote.$.downvote": updateInfo.downvote } },
      { new: true }
    );
    return result;
  }
};

const createCommentsData = async (id: string, updateInfo: TComments) => {
  const objectId = new Types.ObjectId(id);

  const result = await Recipe.findOneAndUpdate(
    { _id: objectId },
    { $push: { comments: updateInfo } },
    { new: true }
  );
  return result;
};

const deleteCommentData = async (recipeId: string, commentId: string) => {
  const updatedRecipe = await Recipe.findByIdAndUpdate(
    recipeId,
    {
      $pull: { comments: { _id: commentId } },
    },
    { new: true }
  );

  return updatedRecipe;
};

const updateCommentData = async (
  recipeId: string,
  commentId: string,
  updatedComment: string
) => {
  const result = await Recipe.updateOne(
    { _id: recipeId, "comments._id": commentId }, 
    { $set: { "comments.$.comments": updatedComment } } 
  );

  return result;
};

export const recipeServices = {
  createRecipeIntoDB,
  getAllRecipesFromDB,
  getMyRecipeFromDB,
  deleteMyRecipeFromDB,
  createRatingsData,
  createUpVoteData,
  createDownVoteData,
  createCommentsData,
  deleteCommentData,
  updateCommentData,
};
