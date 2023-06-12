/* server.js - Express server*/

"use strict";
const log = console.log;
log("Express server");

const express = require("express");
const app = express();
const env = process.env.NODE_ENV;

// enable CORS if in development, for React local development server to connect to the web server.
const cors = require("cors");
if (env !== "production") {
  app.use(cors());
}
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
const path = require("path");

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set("bufferCommands", false);
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// mongoose.set('useFindAndModify', false); // for some deprecation issues
// Mongo and Mongoose
const { ObjectID } = require("mongodb");
const { User } = require("./models/user");
const { Recipes } = require("./models/recipes");

// express-session for managing user sessions
const session = require("express-session");
const MongoStore = require("connect-mongo"); // to store session information on the database in production

const { v4: uuidv4 } = require("uuid");

const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

cloudinary.config({
  cloud_name: "dxdwxg7ac",
  api_key: "552813774649592",
  api_secret: "kdV17PBYHGiMsU50VTs4wSEehyM",
});
//const Test = require('./models/user');

function isMongoError(error) {
  // checks for first error returned by promise rejection if Mongo database suddently disconnects
  return (
    typeof error === "object" &&
    error !== null &&
    error.name === "MongoNetworkError"
  );
}
const mongoChecker = (req, res, next) => {
  // check mongoose connection established.
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  } else {
    next();
  }
};

//**********************session handling ********************/

// A session is created on every request, but whether or not it is saved depends on the option flags provided.
app.use(
  session({
    secret: "our hardcoded secret",
    cookie: {
      expires: 6000000, // 1 minute expiry date
      httpOnly: true,
    },

    // Session saving options
    saveUninitialized: false,
    resave: false,
	store: env === 'production' ? MongoStore.create({
		mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/mongo-data'
	}) : null
  })
);

app.get("/api/users/check-session", (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ error: "User not logged in" });
  }
});

// A route to login and create a session
app.post("/api/users/login", mongoChecker, async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findByEmailPassword(email, password);
    if (!user) {
      // res.status(400).send()
      return res.json({ status: "user_not_found", user: false, error: false });
    } else {
      req.session.user = user;
      // res.status(200).send({ currentUser: user.email });
      return res.json({ status: "ok", user: user, error: false });
    }
  } catch (error) {
    if (isMongoError(error)) {
      return res.json({ status: "error", user: false, error: error });
    } else {
      log(error);
      return res.json({ status: "error", user: false, error: error });
    }
  }
});

app.get("/api/users/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.json({ status: "ok" });
    }
  });
});
/********************************session handling ended**************************************/

//create a user
app.post("/api/users/register", async (req, res) => {
  // check mongoose connection established.
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  }

  let isAdmin = false;
  if (req.body.username === "admin17") {
    isAdmin = true;
  }

  // Create a new student using the Student mongoose model
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    type: isAdmin ? "admin" : "regular",
    verified: false,
    cart: [],
    recipes: [],
    followers: [],
    following: [],
  });

  // Save student to the database
  // async-await version:
  try {
    const result = await user.save();
    res.status(200).send(result);
  } catch (error) {
    log(error); // log server error to the console, not to the client.
    if (isMongoError(error)) {
      // check for if mongo server suddenly dissconnected before this request.
      res.status(500).send("Internal server error");
    } else {
      res.status(400).send("Bad Request"); // 400 for bad request gets sent to client.
    }
  }
});

//get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ status: "ok", users: users }); // just the array
    //res.send("hi") // can wrap students in object if want to add more properties
  } catch (error) {
    log(error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
});

//create a recipe: POST
app.post("/api/recipes", async (req, res) => {
  if (!req.session.user) {
    return res.json({ status: "user_not_found", result: false, error: false });
  }
  const user_id = req.session.user;
  console.log("CREATING RECIPE");
  // check mongoose connection established.
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  }

  const user = await User.findById(user_id);
  const uuid_slug = uuidv4();
  try {
    const fileStr = req.body.img;
    const imgResult = await cloudinary.uploader.upload(fileStr, {});
    console.log(imgResult);
    if (user) {
      const recipe = new Recipes({
        title: req.body.title,
        creator_Id: user_id,
        chef: user.username,
        slug: uuid_slug,
        description: req.body.description,
        time_needed: req.body.time_needed,
        cuisines: req.body.cuisines,
        restrictions: req.body.restrictions,
        tags: req.body.tags,
        servingAmount: req.body.servingAmount,
        ingredients: req.body.ingredients,
        materials: req.body.materials,
        instructions: req.body.instructions,
        notes: req.body.notes,
        img: imgResult.url,
      });

      const user_recipe = {
        _id: recipe._id,
        title: req.body.title,
        slug: uuid_slug,
        chef: user.username,
        description: req.body.description,
        time_needed: req.body.time_needed,
        cuisines: req.body.cuisines,
        restrictions: req.body.restrictions,
        tags: req.body.tags,
        servingAmount: req.body.servingAmount,
        ingredients: req.body.ingredients,
        materials: req.body.materials,
        instructions: req.body.instructions,
        notes: req.body.notes,
        img: imgResult.url,
      };

      const result = await recipe.save();
      user.recipes.push(user_recipe);
      const user_result = await user.save();
      req.session.user = user_result;
      return res.json({ status: 200, result: user_result, error: false });
    } else {
      return res.json({ status: 404, result: false, error: "User not found" });
    }
  } catch (error) {
    log(error); // log server error to the console, not to the client.
    if (isMongoError(error)) {
      // check for if mongo server suddenly dissconnected before this request.
      // res.status(500).send('Internal server error')
      return res.json({ status: 500, result: [], error: error });
    } else {
      // res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
      return res.json({ status: 400, result: [], error: error });
    }
  }
});

//get all recipes
app.get("/api/recipes", async (req, res) => {
  // check mongoose connection established.
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  }

  // async-await version:
  try {
    const recipe_ids = await Recipes.find();
    return res.json({ status: 200, result: { recipe_ids }, error: false });
  } catch (error) {
    log(error); // log server error to the console, not to the client.
    if (isMongoError(error)) {
      // check for if mongo server suddenly dissconnected before this request.
      // res.status(500).send('Internal server error')
      return res.json({ status: 500, result: [], error: error });
    } else {
      // res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
      return res.json({ status: 400, result: [], error: error });
    }
  }
});

//delete recipe

app.delete("/api/recipes/:rid", async (req, res) => {
  if (!req.session.user) {
    return res.json({ status: "user_not_found", result: false, error: false });
  }
  const user_id = req.session.user;
  const recipe_id = req.params.rid;
  // check mongoose connection established.
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  }

  // Create a new student using the Student mongoose model

  // Save student to the database
  // async-await version:
  try {
    const user = await User.findById(user_id);
    const recipe = await Recipes.findById(recipe_id);
    const recipe_all = await Recipes.find();
    if (user && recipe) {
      user.recipes.id(recipe_id).remove();
      const user_result = await user.save();

      req.session.user = user_result;
      recipe.remove();

      return res.json({ status: 200, result: user_result, error: false });
    } else {
      return res.json({ status: 404, result: [], error: "Resource not found" });
    }
  } catch (error) {
    log(error); // log server error to the console, not to the client.
    if (isMongoError(error)) {
      // check for if mongo server suddenly dissconnected before this request.
      // res.status(500).send('Internal server error')
      return res.json({ status: 500, result: [], error: error });
    } else {
      // res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
      return res.json({ status: 400, result: [], error: error });
    }
  }
});

//edit recipe: PATCH
app.post("/api/recipes/:rid", async (req, res) => {
  if (!req.session.user) {
    return res.json({ status: "user_not_found", result: false, error: false });
  }
  const user_id = req.session.user;
  const recipe_id = req.params.rid;
  // check mongoose connection established.
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  }
  // Create a new student using the Student mongoose model

  // Save student to the database
  // async-await version:
  try {
    const user = await User.findById(user_id);
    const user_recipe = user.recipes.id(recipe_id);
    const recipe = await Recipes.findById(recipe_id);

    if (user_recipe && recipe) {
      recipe.title = req.body.title;
      recipe.description = req.body.description;
      recipe.time_needed = req.body.time_needed;
      recipe.cuisines = req.body.cuisines;
      recipe.restrictions = req.body.restrictions;
      recipe.tags = req.body.tags;
      recipe.servingAmount = req.body.servingAmount;
      recipe.ingredients = req.body.ingredients;
      recipe.materials = req.body.materials;
      recipe.instructions = req.body.instructions;
      recipe.notes = req.body.notes;

      user_recipe.title = req.body.title;
      user_recipe.description = req.body.description;
      user_recipe.time_needed = req.body.time_needed;
      user_recipe.cuisines = req.body.cuisines;
      user_recipe.restrictions = req.body.restrictions;
      user_recipe.tags = req.body.tags;
      user_recipe.servingAmount = req.body.servingAmount;
      user_recipe.ingredients = req.body.ingredients;
      user_recipe.materials = req.body.materials;
      user_recipe.instructions = req.body.instructions;
      user_recipe.notes = req.body.notes;

      const result = await recipe.save();
      const user_result = await user.save();
      req.session.user = user_result;
      return res.json({ status: 200, result: result, error: false });
    } else {
      return res.json({
        status: 404,
        result: false,
        error: "Resource not found",
      });
    }
  } catch (error) {
    log(error); // log server error to the console, not to the client.
    if (isMongoError(error)) {
      // check for if mongo server suddenly dissconnected before this request.
      // res.status(500).send('Internal server error')
      return res.json({ status: 500, result: false, error: error });
    } else {
      // res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
      return res.json({ status: 400, result: false, error: error });
    }
  }
});

// images

// follow
app.post("/api/users/follow/:id", async (req, res) => {
  if (!req.session.user) {
    return res.json({ status: "user_not_found", result: false, error: false });
  }
  const user_id = req.session.user;
  const follower_user = req.params.id;
  // check mongoose connection established.
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  }

  // async-await version:
  try {
    const user = await User.findById(user_id);
    const user_to_follow = await User.findById(follower_user);

    if (user && user_to_follow) {
      // Add "user" to the followers of the followed user
      const user_followed = {
        _id: user_id._id,
        username: user_id.username,
      };
      user_to_follow.followers.push(user_followed);
      await user_to_follow.save();

      // Add "user_to_follow" to the following list of the user
      const user_to_follow_schema = {
        _id: user_to_follow._id,
        username: user_to_follow.username,
      };
      user.following.push(user_to_follow_schema);
      const user_result = await user.save();
      req.session.user = user_result;
      return res.json({ status: 200, result: user_result, error: false });
    } else {
      return res.json({
        status: 404,
        result: false,
        error: "Resource not found",
      });
    }
  } catch (error) {
    log(error); // log server error to the console, not to the client.
    if (isMongoError(error)) {
      // check for if mongo server suddenly dissconnected before this request.
      // res.status(500).send('Internal server error')
      return res.json({ status: 500, result: false, error: error });
    } else {
      // res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
      return res.json({ status: 400, result: false, error: error });
    }
  }
});

// unfollow
app.delete("/api/users/follow/:id", async (req, res) => {
  if (!req.session.user) {
    return res.json({ status: "user_not_found", result: false, error: false });
  }
  const user_id = req.session.user;
  const unfollow_user = req.params.id;
  // check mongoose connection established.
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  }

  // async-await version:
  try {
    const user = await User.findById(user_id);
    const user_to_unfollow = await User.findById(unfollow_user);

    if (user && user_to_unfollow) {
      // remove user from followers of other user
      user_to_unfollow.followers.id(user_id).remove();
      await user_to_unfollow.save();

      // remove followed user from following list of user
      user.following.id(unfollow_user).remove();
      const user_result = await user.save();

      req.session.user = user_result;
      return res.json({ status: 200, result: user_result, error: false });
    } else {
      return res.json({
        status: 404,
        result: false,
        error: "Resource not found",
      });
    }
  } catch (error) {
    log(error); // log server error to the console, not to the client.
    if (isMongoError(error)) {
      // check for if mongo server suddenly dissconnected before this request.
      // res.status(500).send('Internal server error')
      return res.json({ status: 500, result: false, error: error });
    } else {
      // res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
      return res.json({ status: 400, result: false, error: error });
    }
  }
});

//edit user info
app.patch("/api/users/", async (req, res) => {
  if (!req.session.user) {
    return res.json({ status: "user_not_found", result: false, error: false });
  }
  const user_id = req.session.user._id;
  // check mongoose connection established.
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  }
  // async-await version:
  try {
    const user = await User.findById(user_id);
    if (user) {
      user.name = req.body.name;
      user.cuisine = req.body.cuisine;
      user.bio = req.body.bio;
      const result = await user.save();
      req.session.user = result;
      return res.json({ status: 200, result: result, error: false });
    } else {
      return res.json({
        status: 404,
        result: false,
        error: "Resource not found",
      });
    }
  } catch (error) {
    log(error); // log server error to the console, not to the client.
    if (isMongoError(error)) {
      // check for if mongo server suddenly dissconnected before this request.
      // res.status(500).send('Internal server error')
      return res.json({ status: 500, result: false, error: error });
    } else {
      // res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
      return res.json({ status: 400, result: false, error: error });
    }
  }
});

// get recipes from following
app.get("/api/recipes/following", async (req, res) => {
  if (!req.session.user) {
    return res.json({ status: "user_not_found", result: false, error: false });
  }
  const user_id = req.session.user._id;

  const all_recipes = [];
  // check mongoose connection established.
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  }
  const user = await User.findById(user_id);
  const following = user.following;

  // async-await version:
  try {
    for (let i = 0; i < following.length; i++) {
      const followed_user = await User.findById(following[i]);
      const followed_user_recipes = followed_user.recipes;
      for (let j = 0; j < followed_user_recipes.length; j++) {
        all_recipes.push(followed_user_recipes[j]);
      }
    }
    return res.json({ status: 200, result: all_recipes, error: false });
  } catch (error) {
    log(error); // log server error to the console, not to the client.
    if (isMongoError(error)) {
      // check for if mongo server suddenly dissconnected before this request.
      // res.status(500).send('Internal server error')
      return res.json({ status: 500, result: [], error: error });
    } else {
      // res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
      return res.json({ status: 400, result: [], error: error });
    }
  }
});

// add to cart
app.patch("/api/users/cart", async (req, res) => {
  if (!req.session.user) {
    return res.json({ status: "user_not_found", result: false, error: false });
  }
  const user_id = req.session.user._id;
  // check mongoose connection established.
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  }
  // async-await version:
  try {
    const user = await User.findById(user_id);
    if (user) {
      for (let i = 0; i < req.body.cart.length; i++) {
        user.cart.push(req.body.cart[i]);
      }
      const result = await user.save();
      req.session.user = result;
      return res.json({ status: 200, result: result, error: false });
    } else {
      return res.json({
        status: 404,
        result: false,
        error: "Resource not found",
      });
    }
  } catch (error) {
    log(error); // log server error to the console, not to the client.
    if (isMongoError(error)) {
      // check for if mongo server suddenly dissconnected before this request.
      // res.status(500).send('Internal server error')
      return res.json({ status: 500, result: false, error: error });
    } else {
      // res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
      return res.json({ status: 400, result: false, error: error });
    }
  }
});

//delete user
app.delete("/api/users/:id", async (req, res) => {
  if (!req.session.user || req.session.user.type != "admin") {
    return res.json({ status: "user_not_found", result: false, error: false });
  }
  const user_deleteid = req.params.id;
  // check mongoose connection established.
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  }

  // async-await version:
  try {
    const user = await User.findById(user_deleteid);
    const recipes_todelete = user.recipes;
    if (user) {
      for (let i = 0; i < recipes_todelete.length; i++) {
        const recipedel = await Recipes.findById(recipes_todelete[i]);
        recipedel.remove();
      }
      const followers = user.followers;
      for (let i = 0; i < followers.length; i++) {
        const follower = await User.findById(followers[i]._id);
        follower.following.id(user_deleteid).remove();
        follower.save();
      }
      const followingdel = user.following;
      for (let i = 0; i < followingdel.length; i++) {
        const followingdelid = await User.findById(followingdel[i]._id);
        followingdelid.followers.id(user_deleteid).remove();
        followingdelid.save();
      }
      user.remove();

      return res.json({ status: 200, result: true, error: false });
    } else {
      return res.json({ status: 404, result: [], error: "Resource not found" });
    }
  } catch (error) {
    log(error); // log server error to the console, not to the client.
    if (isMongoError(error)) {
      // check for if mongo server suddenly dissconnected before this request.
      // res.status(500).send('Internal server error')
      return res.json({ status: 500, result: [], error: error });
    } else {
      // res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
      return res.json({ status: 400, result: [], error: error });
    }
  }
});

//verify
app.post("/api/users/verify/:id", async (req, res) => {
  if (!req.session.user || req.session.user.type != "admin") {
    return res.json({ status: "user_not_found", result: false, error: false });
  }
  const user_id = req.params.id;
  // check mongoose connection established.
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  }

  // async-await version:
  try {
    const user = await User.findById(user_id);
    if (user) {
      user.verified = req.body.verify
      user.save()
      return res.json({ status: 200, result: true, error: false });
    } else {
      return res.json({ status: 404, result: [], error: "Resource not found" });
    }
  } catch (error) {
    log(error); // log server error to the console, not to the client.
    if (isMongoError(error)) {
      // check for if mongo server suddenly dissconnected before this request.
      // res.status(500).send('Internal server error')
      return res.json({ status: 500, result: [], error: error });
    } else {
      // res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
      return res.json({ status: 400, result: [], error: error });
    }
  }
});
// store admin for when deployed

//set user to verified? PATCH

app.use(express.static(path.join(__dirname, "/client/build")));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
  // check for page routes that we expect in the frontend to provide correct status code.
  const goodPageRoutes = [
    "/",
    "/signup",
    "/signin",
    "/resetpassword",
    "/recipe",
    "/feed",
    "/search",
    "/adminfeed",
    "/profile",
  ];
  if (!goodPageRoutes.includes(req.url)) {
    // if url not in expected page routes, set status to 404.
    res.status(404);
  }

  // send index.html
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

const port = process.env.PORT || 5050;
app.listen(port, () => {
  log(`Listening on port ${port}...`);
}); // localhost development port 5000  (http://localhost:5000)
