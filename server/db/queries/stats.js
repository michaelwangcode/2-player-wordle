const getStat = (db, id) => {
  return db.query('SELECT * FROM users WHERE id = $1;', [id])
    .then(data => {
      return data.rows[0];
    });
};

const getStats = (db) => {
  return db.query('SELECT * FROM users')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getStats, getStat };