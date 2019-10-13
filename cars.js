const mongoose = require('mongoose');

const carschema=mongoose.Schema({
    vehicle_number:String,
    model:String,
    seating_capacity:String,
    rent_per_day:String,
    booked:Boolean,
    customer_name:String,
    issue_date:String,
    return_date:String
});
mongoose.exports=mongoose.model('cars',carschema);


