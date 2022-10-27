import express from "express";
import viewsRouter from "./routes/views.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import handlebars from "express-handlebars";
import __dirname from "./__dirname.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import initializePassport from "./config/passport.config.js";
import passport from "passport";
import config from "./config/config.js";

const app = express();
const PORT = config.app.PORT;
const server = app.listen(PORT, () => console.log("Now Listening on 8080"));
const admin = true;

app.use(express.json()); //Its a middleware because all its going to be JSON.
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use(express.static(__dirname + "/public"));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongo.MONGO_URL,
      ttl: 600,
    }),
    secret: "C0derSessi0n3000",
    resave: false,
    saveUninitialized: false,
  })
);
initializePassport();

app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", viewsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
