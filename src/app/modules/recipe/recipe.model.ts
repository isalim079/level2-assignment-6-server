import { model, Schema } from "mongoose";
import { TComments, TRatings, TRecipe } from "./recipe.interface";

const commentSchema = new Schema<TComments>({
    email: { type: String, required: true },
    comments: { type: String, required: true },
  });

const ratingsSchema = new Schema<TRatings>({
    email: { type: String, required: true },
    ratings: { type: Number, required: true },
  });

const recipeSchema = new Schema<TRecipe>({
  image: { type: String, required: true },
  title: { type: String, required: true },
  recipe: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  profileImg: { type: String, required: true },
  rating: { type: Number, default: 0 },
  comments: { type: [commentSchema], default: [] },
  ratingsData: { type: [ratingsSchema], default: [] },
  upvote: { type: Number, default: 0 },
  downvote: { type: Number, default: 0 },
});

export const Recipe = model<TRecipe>("recipe", recipeSchema);
