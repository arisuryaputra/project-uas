const sql = require("./db.js");

// constructor
const Artikel = function (artikel) {
  this.title = artikel.title;
  this.description = artikel.description;
  this.published = artikel.published;
};

Artikel.create = (newArtikel, result) => {
  sql.query("INSERT INTO artikel SET ?", newArtikel, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created artikel: ", { id: res.insertId, ...newArtikel });
    result(null, { id: res.insertId, ...newArtikel });
  });
};

Artikel.findById = (id, result) => {
  sql.query(`SELECT * FROM artikel WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found artikel: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Artikel with the id
    result({ kind: "not_found" }, null);
  });
};

Artikel.getAll = (title, result) => {
  let query = "SELECT * FROM artikel";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("artikel: ", res);
    result(null, res);
  });
};

Artikel.getAllPublished = (result) => {
  sql.query("SELECT * FROM artikel WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("artikel: ", res);
    result(null, res);
  });
};

Artikel.updateById = (id, artikel, result) => {
  sql.query(
    "UPDATE artikel SET title = ?, description = ?, published = ? WHERE id = ?",
    [artikel.title, artikel.description, artikel.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Artikel with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated artikel: ", { id: id, ...artikel });
      result(null, { id: id, ...artikel });
    }
  );
};

Artikel.remove = (id, result) => {
  sql.query("DELETE FROM artikel WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Artikel with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted artikel with id: ", id);
    result(null, res);
  });
};

Artikel.removeAll = (result) => {
  sql.query("DELETE FROM artikel", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} artikel`);
    result(null, res);
  });
};

module.exports = Artikel;
