const mongoose = require("mongoose");

const bugReportSchema = new mongoose.Schema({
    title: {
        type: String,
      },
      email:{
        type:String,
        
      },
      issue:{
        type:String,
      },
      reproduceIssue:{
        type:String,
        
      },
      file: {
        data: Buffer,
        contentType: String,
      },
})
/* controller "email: req.body.email"  email: part must matcch the schema or it wont be go to the databas */
module.exports = mongoose.model("bugReport", bugReportSchema);