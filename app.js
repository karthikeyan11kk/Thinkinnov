if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
const dbUrl=process.env.Db_url;
// "mongodb://127.0.0.1:27017/thinkinnov"
mongoose.connect(dbUrl);

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});
const Contact = mongoose.model("Contact", contactSchema);

const careerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  role: String,
  portfolio: String
});
const Career = mongoose.model("Career", careerSchema);

var namecust;
var emailcust;
app.get("/", async (req, res) => {
  res.render("home");
});

app.post("/contact", async (req, res) => {
    const customer = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    });
    namecust=customer.name;
    emailcust=customer.email;
    await customer.save();
    res.redirect("/thanks");

});

app.post("/career", async (req, res) => {
  try {
    const career = new Career({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phoneno,
      role: req.body.role,
      portfolio: req.body.portfolio,
    });
    namecust=career.name;
    emailcust=career.email;
    await career.save();
    res.redirect("/thanks");
  } catch (err) {
    console.log(err);
  }
});

app.get("/thanks", (req, res) => {
  res.render("thanks", { cusname: namecust, cusmail: emailcust  });
});

const PORT = process.env.PORT || 1111;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
