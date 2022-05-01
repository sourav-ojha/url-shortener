const { Router } = require("express");
let router = Router();
const fs = require("fs");
const { nanoid } = require("nanoid");
router.get("/", (req, res) => {
  res.json("yahoo!!");
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  let data = fs.readFileSync(`./data/${id}.json`);
  let parsedData = JSON.parse(data);
  parsedData.count++;
  fs.writeFileSync(`./data/${id}.json`, JSON.stringify(parsedData));
  fs.appendFile(
    `./log.json`,
    JSON.stringify({
      date: new Date(),
      id: id,
      url: parsedData.url,
      action: "visit",
      status: "success",
    }),
    (err) => {
      throw err;
    }
  );

  return res.redirect(`${parsedData.url}`);
});

router.post("/shorten", (req, res) => {
  const newID = nanoid(4);
  const { originalUrl } = req.body;
  let payload = {
    url: originalUrl,
    count: 0,
    id: newID,
  };
  fs.writeFile(`./data/${newID}.json`, JSON.stringify(payload), (err) => {
    if (err) {
      fs.writeFileSync(
        `./log.json`,
        JSON.stringify({
          date: new Date(),
          id: newID,
          url: originalUrl,
          action: "create",
          status: "success",
          message: err.message,
        })
      );
      res.json({
        status: false,
        message: err.message,
      });
    } else {
      fs.appendFile(
        `./log.json`,
        JSON.stringify({
          date: new Date(),
          id: newID,
          url: originalUrl,
          action: "created",
        }),
        (err) => {
          if (err) {
            res.json({
              status: false,
              message: err.message,
            });
          } else {
            res.json({
              status: true,
              message: "success",
              id: newID,
            });
          }
        }
      );
    }
  });
});

module.exports = router;
