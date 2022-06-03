const { Router } = require("express");
const { GetUrl, CreateUrl, GetUserUrls } = require("./controller/urlShortner");
let router = Router();
const fs = require("fs");
const { createUser, loginUser } = require("./controller/user");
const verifyToken = require("./middleware/verifyToken");

router.get("/", (req, res) => {
  res.json("yahoo!!");
});

router.post("/login", async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;
  const { status, statusCode, data, message } = await loginUser(
    email,
    password
  );
  if (status) {
    res.status(statusCode).json({ status, data, message });
  } else {
    res.status(statusCode).json({ status, message });
  }
});

router.post("/register", async (req, res) => {
  console.log(req.body);
  const { status, statusCode, message, data } = await createUser(req.body);
  if (status) {
    res.status(statusCode).json({
      status,
      message,
      data,
    });
  } else {
    res.status(statusCode).json({
      status,
      message,
    });
  }
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let { status, message, url } = await GetUrl(id);
  console.log(status, message, url);
  if (status) {
    return res.redirect(`${url}`);
  } else {
    console.log("redirect to 404");
    return res.redirect("http://localhost:8080/404-not-found");
  }
});

router.use("/", verifyToken);
router.post("/shorten", async (req, res) => {
  let { originalUrl, title } = req.body;
  let { status, message, id } = await CreateUrl(originalUrl, title, req.user);
  if (status) {
    return res.json({ status, message, id });
  }
  return res.status(500).json({ status, message });
});

router.get("/user/urls", async (req, res) => {
  let { status, message, data } = await GetUserUrls(req.user);
  if (status) {
    return res.json({ status, message, data });
  }
  return res.status(500).json({ status, message });
});

module.exports = router;
