var mongoose = require('mongoose');
var NumSchema = new mongoose.Schema({
    serial_number: String,
    create_time: {
      type:Date,
      default:new Date()
    }
    // parent_id:Number
}, {
    collection: "numbers"
});
var Num = mongoose.model('numbers', NumSchema);

module.exports=Num;