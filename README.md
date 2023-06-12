# Recipe Sharing Application - Team 21

Deployed app: https://evening-beyond-17027.herokuapp.com/

This application provides users with a beautifully designed and functional interface to create, share, and find recipes with others. Key features of the application include:

- Searching for recipes using filters, ingredients, and key words
- Following other users to get a feed of recipes from users you like
- Create your own recipes to save them and share with others if you like
- Easily track ingredients you need to get to make recipes
- FUTURE: Join groups of like-minded chefs to be apart of a community and easily find recipes you enjoy

## Getting started

To run the app locally:

1. Clone the repo `git clone https://github.com/csc309-winter-2022/team21.git`
2. From root directory, create mogodb folder : `mkdir mongo-data`
3. Run mongo database: `mongod --dbpath mongo-data`
4. Connect to MongoDB Compass, URI: `mongodb://localhost:27017`
5. In a second terminal, change directory to client: `cd client`
6. Install client dependencies: `npm install`
7. Create client build: `npm run build`
8. Change directory to root: `cd ..`
9. Install server dependencies: `npm install`
10. Run server: `node server.js`
11. Visit `http://localhost:5050/`


## General usage steps

Below are some general user flows the application currently supports with mock data.

### Unauthenticated user

As an unauthenticated user, you can search for a recipe using a search bar in the navbar. You can also see featured recipes on the homepage. Unauthenticated users can view recipes they find. They can also see the sign in and sign up pages to create an account. You can create an account by using the "Sign Up" option and use those credentials to login.

### Signing in

You can sign into the app using the credentials you used when signing up (note: your username will be the email you used when signing up). For example:

username: `user@test.com`

password: `password123`

### Logged in as user

As a logged in user, you can do everything an unauthenticated user can do. However, you can also view your profile and other user's profile. This is possibly by clicking the profile picture on the right of the navbar to view your own profile. To view other people's profiles, you can see who you're following or who your followers are, or see featured profiles on homepage. 

Logged in users could also theoretically save other people's recipes and edit their own recipes. Logged in users also can create their own recipe through clicking 'create recipe' on the navbar. They can also select ingredients they need from recipes they are viewing and save them to their profile as things to buy. This is not setup fully yet but the experience is viewable.

Logged in users should also be able to follow/unfollow other users, however currently that is not setup since it is all mock data.

Logged in users can also view their feed page which should show recipes from users they follow.

### Admin user

in deployed site, admin credentials:

username: `admin@admin.com`

password: `admin`

It is clear you are logged in as an admin user because it will say so on the navbar. To be an admin user, you have to use MongoDB Compass to manually change the user "type" to a value of "admin" and login as you normally would.

Admin users see an admin feed page instead of the homepage in which they can see all recipes and users. This allows them to click on them and they have the power to delete recipes/users, and verify users. They will also have the ability to set featured recipes and users in the future which become the recipes and users shown on the homepage.

## Technologies used

This application is currently built with the following:

- Create React app (https://github.com/facebook/create-react-app)
- React Router (https://reactrouter.com/)

Otherwise, it is all Javascript (React.js), HTML, and CSS.


## Server Routes

Routes Overview: In the information below, part (a) is the route that needs to be called in postman along with the type of request. The port number used is 5050, so each call will be as follows: localhost:5050/route, for example: localhost:5050/api/users/follow/624bcb0a5eb90a11070c709a (this id should be retrieved from mongo compass). For the routes that require information to be sent in the body, an example of how the information should be formatted is shown in (e). For the routes that require an id, the id is the ”Object ID” which can be found under the object’s information in mongo compass.

### 1) Check Session:

a) Route: get request: /api/users/check-session

b)Purpose: This route is used to check the current session and ensures that the user is logged in

c) Data expected to be sent: Nothing

d)Data returned: The user object that should be signed in, or error if there is one


### 2) Login and Create Session:
a) Route: post request: /api/users/login

b) Purpose: This route is used to login an existing user and then create a session for them.

c) Data expected to be sent: User’s email and password

d) Data returned: Returns the user object, or error if there is one

Example:
```json
{
    "email": "user@user.com",
    "password" : "password"
}

```

### 3) Logout User:

a) Route: get request: /api/users/logout

b) Purpose: This route is used to logout a logged in user

c) Data expected to be sent: Nothing

d) Data returned: status, or error if there is one

### 4) Create a User:

a) Route: post request: /api/users/register

b) Purpose: Create a new user using the User mongoose model and save it to the database.

c) Data expected to be sent: User’s username, email, name and password

d) Data returned: The created user object, or error if there is one

e) Example: 

```json
{
    "username": "user",
    "name": "User",
    "email": "user@user.com",
    "password" : "password"
}

```

### 5) Get all Users:

a) Route: get request: /api/users

b) Purpose: Get all of the existing users in the database

c) Data expected to be sent: nothing

d) Data returned: All of the user objects, or error if there is one

### 6) Create a New Recipe:

a) Route: post request: /api/recipes

b) Purpose: Logged in user can create a new recipe. The recipe is added to the recipe database as well as the recipe component of the user schema.

c) Data expected to be sent: All of the components of the Recipe schema including title, description, materials etc as well as the user that is creating the recipe.

d) Data returned: The updated user object including the created recipe, or error if there is one

e) Example: 

```json
{
   "title":"Lamb Biryani",
  "description":"food",
  "time_needed":"",
  "cuisines":["Mexican"],
  "restrictions":["None"],
  "tags":[""],
  "servingAmount":1,
  "ingredients":["food"],
  "materials":["food"],
  "instructions":["food"],
  "notes":["food"]
}
```

### 7) Get all Recipes:

a) Route: get request: /api/recipes

b) Purpose: Get all recipes in the database.

c) Data expected to be sent: Nothing

d) Data returned: All recipe objects, or error if there is one

e) No special request or body needed, only send what is in part (a)

### 8) Delete Recipe:

a) Route: delete request: /api/recipes/:rid

b) Purpose: Delete specific recipe object from the recipe database and from the user object’s recipe component

c) Data expected to be sent: ID of recipe to be deleted

d) Data returned: Updated user object with recipe deleted, or error if there is one

e) Example request: localhost:5050/api/recipes/624bcb0a5eb90a11070c709a (this id should be retrieved from mongo compass)

### 9) Edit Recipe:

a) Route: post request: /api/recipes/:rid

b) Purpose: User can edit recipe they created

c) Data expected to be sent: ID of recipe to be edited, as well as all of the components of the recipe schema that were edited.

d) Data returned: Updated recipe object, or error if there is one

e) Example request: localhost:5050/api/recipes/624bcb0a5eb90a11070c709a (this id should be retrieved from mongo compass)

f) Example body: 
```json
{
    "title":"Lamb Biryani Edited",
    "description":"food",
    "time_needed":"",
    "cuisines":["Mexican"],
    "restrictions":["None"],
    "tags":[""],
    "servingAmount":1,
    "ingredients":["food"],
    "materials":["food"],
    "instructions":["food"],
    "notes":["food"]
}
```

### 10) Follow a User:

a) Route: post request: /api/users/follow/:id

b) Purpose: User A (the user that is currently logged in) can follow user B. User A’s following component is updated and user B’s follower component is updated. 

c) Data expected to be sent: ID of user to be followed.

d) Data returned: Updated user object, or error if there is one

e) Example request: localhost:5050/api/users/follow/624bcb0a5eb90a11070c709a (this id should be retrieved from mongo compass)


### 11) Unfollow a User:

a) Route: delete request: /api/users/follow/:id

b) Purpose: User A (the user that is currently logged in) can unfollow user B. User A’s following component is updated and user B’s follower component is updated. 

c) Data expected to be sent: ID of user to be unfollowed.

d) Data returned: Updated user object, or error if there is one

e) Example request: localhost:5050/api/users/follow/624bcb0a5eb90a11070c709a (this id should be retrieved from mongo compass)


### 12) Edit User Information:

a) Route: patch request: /api/users/

b) Purpose: User can edit their information from their profile

c) Data expected to be sent: Components of user information that need to be edited

d) Data returned: Updated user object, or error if there is one

e) Example:
```json
{
    "name": "User",
    "cuisine": "Mexican",
    "bio" : "edited bio"
}
```

### 13) Get Recipes from Following:

a) Route: get request: /api/recipes/following

b) Purpose: Logged in user will be able to get all recipes from their following list

c) Data expected to be sent: Nothing

d) Data returned: All recipe objects created from the users this user is following, or error if there is one

e) Example: No JSON needs to be sent, only route in part a needs to be sent


### 14) Add to cart

a) Route: patch request: /api/users/cart

b) Purpose: User will be able to select ingredients and add them to their personal cart.

c) Data expected to be sent: Ingredients to be added to cart

d) Data returned: Updates user object with cart information edited, or error if there is one.

e) Example :  No JSON needs to be sent, only route in part a

### 15) Delete User

a) Route: delete request: /api/users/:id

b) Purpose: Admin can delete a user

c) Data expected to be sent: ID of user to be deleted

d) Data returned: True, or error if there is one

e) Example request: localhost:5050/api/users/624bcb0a5eb90a11070c709a (this id should be retrieved from mongo compass)
 







