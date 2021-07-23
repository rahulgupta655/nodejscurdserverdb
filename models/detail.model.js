const mongoose = require("mongoose");

var detailSchema = new mongoose.Schema({
  productid: {
    type: String,
    required: "This field is required.",
  },
  productname: {
    type: String,
    required: "This field is required.",
  },
  categoryid: {
    type: String,
    required: "This field is required.",
  },
  categoryname: {
    type: String,
    required: "This field is required.",
  },
});

// Custom validation for email
// employeeSchema.path("email").validate((val) => {
//   emailRegex =
//     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return emailRegex.test(val);
// }, "Invalid e-mail.");

mongoose.model("Detail", detailSchema);
