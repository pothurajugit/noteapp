const mongoose = require('mongoose');

const studentModal = mongoose.model('Student', ({
    name : {type: String},
    username : {type: String},
    email : {type: String},
    password : {type: String},
    class : {type: String},
    gender : {type: String},
    time : { type : Date}
}));

module.exports = studentModal;

