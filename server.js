let Gallery = require("./models/Gallery");

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require("cors");
const fse = require("fs-extra");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static(__dirname + "/"));

const text = bodyParser.text();
const db = require("./paths").mongoURI;

const storageOptions = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, FOLDER_PATHS.temp);
  },
  filename: (req, file, cb) => {
    return cb(null, file.originalname);
  }
});

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

app.get("/gallery", (req, res) => {
  Gallery.find({}, { name: 1, path: 1, _id: 0, image: 1 }).then(
    gallery => {
      res.json({ gallery });
    },
    e => {
      res
        .status(500)
        .send(e)
        .send("Undefined error");
    }
  );
});

app.get("/gallery/:path", (req, res) => {
  let path = decodeURIComponent(req.params.path);

  Gallery.find({ path: path }, { _id: 0 })
    .then(gallery => {
      console.log(gallery);
      if (gallery.length < 1) {
        return res.status(404).send("Zvolená galéria neexistuje");
      }
      res.send({ gallery });
    })
    .catch(e => {
      res.status(500).send("Nedefinovaná chyba");
    });
});

app.delete("/gallery/:path", (req, res) => {
  let path = req.params.path;

  Gallery.findOneAndRemove({ $or: [{ name: path }] })
    .then(remove => {
      if (!remove) {
        res.status(404).send("Zvolená galéria neexistuje");
      } else {
        res.status(200).send("Galéria bola úspešne vymazaná");
      }
      res.send(remove);
    })
    .catch(e => {
      res
        .status(500)
        .send("Nedefinovaná chyba")
        .send(e);
    });
});

app.delete("/:gallery/:picture", (req, res) => {
  let gallery = req.params.gallery;
  let picture = req.params.picture;
  Gallery.findOneAndRemove(
    { name: gallery },
    { image: { $elemMatch: { name: picture } } }
  )
    .then(remove => {
      if (!remove) {
        res.status(404).send("Zvolený obrázok neexistuje");
      } else {
        res.status(200).send("Obrázok bol úspešne vymazaný");
      }
      res.send(remove);
    })
    .catch(e => {
      res
        .status(500)
        .send("Nedefinovaná chyba")
        .send(e);
    });
});
app.post("/gallery", text, (req, res) => {
  let nameObj = JSON.parse(req.body);
  let name =
    JSON.stringify(nameObj.name)
      .charAt(1)
      .toUpperCase() + nameObj.name.slice(1);

  let gallery = new Gallery({
    name: name,
    path: name,
    image: []
  });

  try {
    fse
      .ensureDir("./gallery/" + name)
      .then(() => {
        console.log("success!");
      })
      .catch(err => {
        console.error(err);
      });
  } catch (err) {
    console.error(err);
  }

  gallery.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      console.log(e);
      res.status(400).send({
        code: 400,
        payload: {
          paths: ["name"],
          validator: "required",
          example: null
        },
        name: "INVALID_SCHEMA",
        description: "Bad JSON object: u'name' is a required property"
      });
    }
  );
});
const upload = multer({
  storage: storageOptions,
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(new Error("Iba obrázky sú dovolené"));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024
  }
});
app.post("/gallery/:picture", upload.any(), (req, res) => {
  let picture = decodeURI(req.params.picture);
  let path;

  if (req.files.length < 1) {
    res.status(400).send("Chybný request - nenašiel sa súbor pre upload.");
  }
  req.files.map(file => {
    path = file.filename;
    try {
      fse.copySync(FOLDER_PATHS.temp, "./gallery/" + picture + "/");
    } catch (err) {
      console.error(err);
    }

    try {
      fse.unlinkSync(FOLDER_PATHS.temp + path);
    } catch (err) {
      console.error(err);
    }

    let name = path.replace(/\..+$/, "");
    let fullpath = picture + "/" + path;
    let now = new Date();

    Gallery.updateOne(
      { name: picture },
      {
        $push: {
          image: {
            $each: [
              { path: path, fullpath: fullpath, name: name, modified: now }
            ]
          }
        }
      },
      { strict: false }
    ).then(
      doc => {
        if (doc.nModified !== 0) {
          res.status(201).send({
            uploaded: {
              path: path,
              fullpath: path,
              name: name,
              modified: now
            }
          });
        }
        res.status(404).send("Galéria pre upload sa nenašla");
      },
      e => {
        res
          .status(400)
          .send(e)
          .send("Chybný request - nenašiel sa súbor pre upload.");
      }
    );
  });
  console.log("Data z requestu REQ.FILES", req.files);
});

/*app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});*/

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
