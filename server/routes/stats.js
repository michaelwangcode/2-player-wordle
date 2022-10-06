const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    getStats(db, req.params.id).then((data) => {
      res.json(data)
    })
  })
  return router
}