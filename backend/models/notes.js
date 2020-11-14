const mongooose = require('mongoose');

const notesdata = mongooose.model('Notesdata',({
    username : {type: String},
    class : {type: String},
    notescontent : {type: String},
    time : {type: Date}
}));


module.exports = notesdata;