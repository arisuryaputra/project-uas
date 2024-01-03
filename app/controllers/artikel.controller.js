const Artikel = require("../models/artikel.model.js");

// Create and Save a new Artikel
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Artikel
  const artikel = new Artikel({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false,
  });

  // Save Artikel in the database
  Artikel.create(artikel, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Artikel.",
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Artikel.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
};

// Find a single Artikel by Id
exports.findOne = (req, res) => {
  Artikel.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Artikel with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Artikel with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// find all published Tutorials
exports.findAllPublished = (req, res) => {
  Artikel.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
};

// Update a Artikel identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Artikel.updateById(req.params.id, new Artikel(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Artikel with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Artikel with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Artikel with the specified id in the request
exports.delete = (req, res) => {
  Artikel.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Artikel with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Artikel with id " + req.params.id,
        });
      }
    } else res.send({ message: `Artikel was deleted successfully!` });
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Artikel.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    else res.send({ message: `All Tutorials were deleted successfully!` });
  });
};
