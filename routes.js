const { Router } = require("express");
const { GetUrl, CreateUrl } = require("./controller/urlShortner");
let router = Router();
const fs = require("fs");
router.get("/", (req, res) => {
  res.json("yahoo!!");
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

router.post("/shorten", async (req, res) => {
  let originalUrl = req.body.originalUrl;
  let { status, message, id } = await CreateUrl(originalUrl);
  if (status) {
    return res.json({ status, message, id });
  }
  return res.status(500).json({ status, message });
});

module.exports = router;
