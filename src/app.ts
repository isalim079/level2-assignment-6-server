import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { AuthRoutes } from "./app/modules/auth/auth.route";
import { UserRoutes } from "./app/modules/user/user.route";
import { recipeRoutes } from "./app/modules/recipe/recipe.route";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
    credentials: true,
}));

// application routes
app.use('/', UserRoutes)
app.use('/', AuthRoutes)
app.use('/', recipeRoutes)

app.get("/", (req: Request, res: Response) => {
  res.send("Recipe sharing community Server is running correctly..!");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
