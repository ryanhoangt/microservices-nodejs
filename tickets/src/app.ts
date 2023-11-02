import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

const app = express();

app.set("trust proxy", true); // for trusting https connection proxied through 'ingress-nginx'
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.all("/api/users/*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
