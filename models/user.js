/* Student mongoose model */

'use strict';

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')


const RecipeSchema = new mongoose.Schema({
    title: String,
    slug: String,
	chef: String,
    description: String,
    time_needed: String,
    cuisines: [String],
    restrictions: [String],
    tags: [String],
    servingAmount: Number,
    ingredients: [String],
    materials: [String],
    instructions: [String],
    notes: [String],
	  img: String
})

const FollowerData = new mongoose.Schema({
    username: {
		type: String,
		required: true
    }
})


const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
    email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,   // custom validator
			message: 'Not valid email'
		}
	},
    password: {
		type: String,
		required: true,
		minlength: 4
	}, 
    type: {
		type: String
		// required: true,
	},
    name: String,
    verified: Boolean,
    cuisine: String,
    followers: [FollowerData],
    following: [FollowerData],
    bio: String,
    recipes: [RecipeSchema],
	saved_recipes: [RecipeSchema],
    cart: [String]

})



UserSchema.pre('save', function(next) {
	const user = this; // binds this to User document instance

	// checks to ensure we don't hash password more than once
	if (user.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

// TODO: change email to username
UserSchema.statics.findByEmailPassword = function(email, password) {
	const User = this // binds this to the User model

	// First find the user by their email
	return User.findOne({ email: email }).then((user) => {
		if (!user) {
			return Promise.reject()  // a rejected promise
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					resolve(user)
				} else {
					reject()
				}
			})
		})
	})
}

// make a model using the User schema
const User = mongoose.model('User', UserSchema)
module.exports = { User }
