const express = require('express');
const router = express.Router();
const { getStats, getStat } = require('../db/queries/stats');

module.exports = (db) => {

  router.get("/", (req, res) => {
    getStats(db).then((data) => {
      console.log("---------", data)
      res.json(data)
    })
  })

  router.get("/:id", (req, res) => {
    getStat(db, req.params.id).then((data) => {
      console.log("---------", data)
      res.json(data)
    })
  })

  
  return router
}

