const { Router } = require("express");
let router = Router();
const fs = require("fs");
router.get("/", (req, res) => {
  res.json("yahoo!!");
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let { status, message, url } = await GetUrl(id);
  if (status) {
    return res.redirect(`${url}`);
  } else {
    return res.json({ status, message });
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
