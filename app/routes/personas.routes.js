module.exports = app => {
  const personas = require("../controllers/personas.controller.js");

  var router = require("express").Router();

  router.post("/", personas.create);

  router.get("/", personas.findAll);

  router.get("/disponibles", personas.findAllPublished);


  router.get("/:id", personas.findOne);


  router.put("/:id", personas.update);


  router.delete("/:id", personas.delete);


  router.delete("/", personas.deleteAll);

  app.use('/api/personas', router);
};
