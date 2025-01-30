import { model, Schema } from "mongoose";
import { TComments, TDownVote, TRatings, TRecipe, TUpVote } from "./recipe.interface";

const commentSchema = new Schema<TComments>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    comments: { type: String, required: true },
  });

const ratingsSchema = new Schema<TRatings>({
    email: { type: String, required: true },
    ratings: { type: Number, required: true },
  });

const upVoteSchema = new Schema<TUpVote>({
    email: { type: String, required: true },
    upvote: { type: Boolean, required: true },
  });

const downVoteSchema = new Schema<TDownVote>({
    email: { type: String, required: true },
    downvote: { type: Boolean, required: true },
  });

const recipeSchema = new Schema<TRecipe>({
  image: { type: String, required: true },
  title: { type: String, required: true },
  recipe: { type: String },
  email: { type: String, required: true },
  name: { type: String, required: true },
  profileImg: { type: String, required: true },
  rating: { type: Number, default: 0 },
  comments: { type: [commentSchema], default: [] },
  ratingsData: { type: [ratingsSchema], default: [] },
  upvote: { type: [upVoteSchema], default: [] },
  downvote: { type: [downVoteSchema], default: [] },
});

export const Recipe = model<TRecipe>("recipe", recipeSchema);
