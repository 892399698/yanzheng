var mongoose = require('mongoose');
var ModelSchema = new mongoose.Schema({
    num_id: String,
    ip:String,
    create_time: {
      type:Date,
      default:new Date()
    }
    // parent_id:Number
}, {
    collection: "num_record"
});
var M = mongoose.model('numRecord', ModelSchema);

module.exports=M;