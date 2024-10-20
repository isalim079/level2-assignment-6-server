export type TComments = {
    email: string;
    comments: string;
}

export type TRatings = {
    email: string;
    ratings: string;
}

export type TRecipe = {
    image: string;
    title: string;
    recipe: string; 
    email: string;
    name: string;
    profileImg: string;
    rating: number;
    comments?: TComments[];
    ratingsData?: TRatings[];
    upvote: number;
    downvote: number;
}