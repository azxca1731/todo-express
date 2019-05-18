var mongoose = require("mongoose");
var todoSchema = mongoose.Schema({
	owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
	body: String,
	title: String,
	endDate: Date
});
module.exports = mongoose.model("Todo", todoSchema);
