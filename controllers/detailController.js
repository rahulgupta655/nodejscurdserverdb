const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Detail = mongoose.model("Detail");

router.get("/", (req, res) => {
  res.render("detail/addOrEdit", {
    viewTitle: "Insert Items",
  });
});

router.post("/", (req, res) => {
  if (req.body._id == "") insertRecord(req, res);
  else updateRecord(req, res);
});

function insertRecord(req, res) {
  var detail = new Detail();
  detail.productid = req.body.productid;
  detail.productname = req.body.productname;
  detail.categoryid = req.body.categoryid;
  detail.categoryname = req.body.categoryname;
  detail.save((err, doc) => {
    if (!err) res.redirect("detail/list");
    else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.render("detail/addOrEdit", {
          viewTitle: "Insert Items",
          detail: req.body,
        });
      } else console.log("Error during record insertion : " + err);
    }
  });
}

function updateRecord(req, res) {
  Detail.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("detail/list");
      } else {
        if (err.name == "ValidationError") {
          handleValidationError(err, req.body);
          res.render("detail/addOrEdit", {
            viewTitle: "Update Items",
            detail: req.body,
          });
        } else console.log("Error during record update : " + err);
      }
    }
  );
}

router.get("/list", (req, res) => {
  Detail.find((err, docs) => {
    if (!err) {
      res.render("detail/list", {
        list: docs,
      });
    } else {
      console.log("Error in retrieving employee list :" + err);
    }
  });
});

function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case "productid":
        body["productidError"] = err.errors[field].message;
        break;
      case "productname":
        body["productnameError"] = err.errors[field].message;
        break;
      case "categoryid":
        body["productidError"] = err.errors[field].message;
        break;
      case "categoryname":
        body["productnameError"] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}

router.get("/:id", (req, res) => {
  Detail.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("detail/addOrEdit", {
        viewTitle: "Update Items",
        detail: doc,
      });
    }
  });
});

router.get("/delete/:id", (req, res) => {
  Detail.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/detail/list");
    } else {
      console.log("Error in employee delete :" + err);
    }
  });
});

module.exports = router;
