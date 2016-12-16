/**
 * Created by RFreeman on 11/4/2016.
 */
// link to mongoose
var mongoose = require('mongoose');
var plm = require('passport-local-mongoose');

var accountSchema = new mongoose.Schema({
    // empty schema is ok as passport defines username / password automatically
    oauthID: String,
    created: Date
});

accountSchema.plugin(plm);

// make this public
module.exports = mongoose.model('Account', accountSchema);

