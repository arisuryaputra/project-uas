module.exports = (app) => {
  const artikel = require("../controllers/artikel.controller.js");

  var router = require("express").Router();

  // Create a new Artikel
  router.post("/", artikel.create);

  // Retrieve all artikel
  router.get("/", artikel.findAll);

  // Retrieve all published artikel
  router.get("/published", artikel.findAllPublished);

  // Retrieve a single Artikel with id
  router.get("/:id", artikel.findOne);

  // Update a Artikel with id
  router.put("/:id", artikel.update);

  // Delete a Artikel with id
  router.delete("/:id", artikel.delete);

  // Delete all artikel
  router.delete("/all", artikel.deleteAll);

  app.use("/api/artikel", router);
};
