const { Router } = require("express");
const auth = require("../middleware/auth");
const router = Router();
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

const lessons = [];



//get all lessons
router.get("/", (req, res) => {
  res.render("lessons", {
    title: "All lessons",
    lessons,
    isLessons: true
  });
});

// add lesson
router.get("/add", (req, res) => {
  res.render("addLessons", {
    title: "Add lesson",
    isLessonAdd: true
  });
});

// get single lesson with id

router.get("/:id", (req, res) => {
  const lesson = lessons.find((les) => les.id === req.params.id);
  if (!lesson) {
    return res.status(404).send("404");
  }

  res.render("lesson", {
    title: lesson.name,
    lesson,
  });
});

router.post("/add", auth, (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    author: Joi.string().required(),
    price: Joi.string().required(),
    img: Joi.string().required(),
    year: Joi.number(),
  });

  const val = schema.validate(req.body);

  if (val.error) {
    res.status(404).send(val.error.message);
    return;
  }

  const newCount = {
    name: req.body.name,
    id: uuidv4(),
    img: req.body.img,
    year: req.body.year,
    author: req.body.author,
    price: req.body.price,
  };

  lessons.push(newCount);
  res.redirect("/api/lessons");
});

router.get("/delete/:id", auth, (req, res) => {
  const idx = lessons.findIndex((les) => les.id === req.params.id);
  lessons.splice(idx, 1);
  res.redirect("/api/lessons");
});

router.get("/update/:id", auth, (req, res) => {
  const idx = lessons.findIndex((les) => les.id === req.params.id);
  res.render("update", {
    title: "Update Product",
    update: lessons[idx],
  });
});

router.post("/update/:id", auth, (req, res) => {
    const idx = lessons.findIndex((les) => les.id === req.params.id);
    let newC = {
      name: req.body.name,
      id: uuidv4(),
    };
    if (idx === -1) {
      return res.status(404).send("bor idni kiriting");
    }
    lessons[idx] = req.body;
    res.redirect("/api/lessons");
  });

module.exports = router;
