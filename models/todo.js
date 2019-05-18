var mongoose = require("mongoose");
var todoSchema = mongoose.Schema({
	owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
	body: String,
	title: String,
	endDate: Date,
	check: { type: Boolean, default: false },
	type: { type: Number, default: 1 }
});
module.exports = mongoose.model("Todo", todoSchema);
