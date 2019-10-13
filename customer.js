const mongoose = require('mongoose');

const customerschema=mongoose.Schema({
    customer_name:String,
    issue_date:String,
    return_date:String
});
mongoose.exports=mongoose.model('customers',customerschema);


