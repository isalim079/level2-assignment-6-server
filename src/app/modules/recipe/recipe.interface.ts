export type TComments = {
    email: string;
    comments: string;
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
    upvote: number;
    downvote: number;
}