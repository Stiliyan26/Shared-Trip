const { Schema, model, Types: { ObjectId } } = require('mongoose');

//TODO change user model according to exam description
//TODO add validation
const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;

const userSchema = new Schema({
    email: { type: String, required: true, validate: {
        validator(value){
            return EMAIL_PATTERN.test(value);
        },
        message: 'The email should be in the following format (mailboxname @ domainname)'
    } },
    hashedPassword: { type: String, required: true },
    gender: { type: String, required: true },
    tripCollection: { type: [ObjectId], ref: 'Trip', default: []}
});

//TODO change index parameter to email if it is written on the exam description
userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;