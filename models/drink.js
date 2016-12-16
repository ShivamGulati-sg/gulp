/**
 * Created by RFreeman on 10/7/2016.
 */
var mongoose = require('mongoose');

// define a schema for the Drink model
// this and all other models inherit from mongoose.Schema
var drinkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Please enter a name'
    },
    drinkType: {
       type: String,
       required: 'Please choose a type'
    },
    size: {
        type: Number,
        required: 'Please enter the size'
    },
    units: {
        type: String,
        required: 'Please enter the units'
    },
    alcoholPercentage: {
        type: Number,
        required: 'Please enter the alcohol %'
    }
});

// make the class public
module.exports = mongoose.model('Drink', drinkSchema);