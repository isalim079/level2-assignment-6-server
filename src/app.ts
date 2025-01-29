import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { AuthRoutes } from "./app/modules/auth/auth.route";
import { UserRoutes } from "./app/modules/user/user.route";
import { recipeRoutes } from "./app/modules/recipe/recipe.route";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// import { loggedUserInfoRoute } from "./app/modules/loggedUser/loggedUser.route";

const app: Application = express();

//parsers
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://chef-client-one.vercel.app",
    ],
    credentials: true,
  })
);

// application routes
app.use("/", UserRoutes);
app.use("/", AuthRoutes);
app.use("/", recipeRoutes);
// app.use('/', loggedUserInfoRoute)

app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;

  const amount = parseInt((price * 100).toString());

  const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
  });
  res.send({
      clientSecret: paymentIntent.client_secret,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Recipe sharing community Server is running correctly..!");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
