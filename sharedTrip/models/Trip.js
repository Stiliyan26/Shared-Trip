const { Schema, model, Types: { ObjectId } } = require('mongoose');

const URL_PATTERN = /^https?:\/\/(.+)/;


const tripSchema = new Schema({
    start: { type: String, required: true, minlength: [4, 'Start point should be at least 4 characters long!'] },
    end: { type: String, required: true, minlength: [4, 'End point should be at least 4 characters long!'] },
    date: { type: String, required: true },
    time: { type: String, required: true },
    image: { type: String, required: true, validate: {
        validator(value){
            return URL_PATTERN.test(value);
        },
        message: 'Car image should start with http:// or https://'
    } },
    brand: { type: String, required: true, minlength: [4, 'Car brand should be at least 4 characters long!'] },
    seats: { type: Number, required: true, min: [0, 'Seats should be in range from 0 to 4'], max: [4, 'Seats should be in range from 0 to 4']},
    price: { type: Number, required: true, min: [1, 'The Price should be positive number (from 1 to 50 inclusive)'], max: [50, 'The Price should be positive number (from 1 to 50 inclusive)']  },
    description: { type: String, required: true, maxlength: [10, 'Description should be maximum 10 characters long'] },
    owner: { type: ObjectId, ref: 'User' },
    buddies: {type: [ObjectId], ref: 'User', default: []}
})

const Trip = model('Trip', tripSchema);

module.exports = Trip;