const { Router } = require("express");
let router = Router();
const fs = require("fs");
const nanoId = require("nanoid");
router.get("/", (req, res) => {
  res.json("yahoo!!");
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  let data = fs.readFileSync(`./data/${id}.json`);
  let parsedData = JSON.parse(data);
  parsedData.count++;
  fs.writeFileSync(`./data/${id}.json`, JSON.stringify(parsedData));
  fs.writeFileSync(
    `./log.json`,
    JSON.stringify({
      date: new Date(),
      id: id,
      url: parsedData.url,
      title: parsedData.title,
      action: "visit",
    })
  );

  return res.redirect(`${parsedData.url}`);
});

router.post("/", (req, res) => {
  const newID = nanoId(4);
  console.log(req.body, newID);
  let payload = {
    ...req.body,
    count: 0,
    id: newID,
  };
  fs.writeFile(`./data/${newID}.json`, JSON.stringify(payload), (err) => {
    if (err) {
      fs.writeFileSync(
        `./log.json`,
        JSON.stringify({
          date: new Date(),
          id: id,
          url: parsedData.url,
          title: parsedData.title,
          action: "error",
        })
      );
      res.json({
        status: false,
        message: "error",
      });
    } else {
      fs.writeFileSync(
        `./log.json`,
        JSON.stringify({
          date: new Date(),
          id: id,
          url: parsedData.url,
          title: parsedData.title,
          action: "created",
        })
      );
      res.json({
        status: true,
        message: "success",
        id: newID,
      });
    }
  });
});

module.exports = router;
