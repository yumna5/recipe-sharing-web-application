'use strict';

const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
    title: String,
    creator_Id: String,
    chef: String,
    slug: String,
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

const Recipes = mongoose.model('Recipes', RecipeSchema)
module.exports = { Recipes }