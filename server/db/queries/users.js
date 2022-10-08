const getUserById = (db, id) => {
  return db.query('SELECT * FROM users WHERE id = $1;', [id])
    .then(data => {
      return data.rows[0];
    });
};

const addUser = (db, id, username, email, join_date, total_wins, total_losses, total_games_played, total_words_missed, guesses_1, guesses_2, guesses_3, guesses_4, guesses_5, guesses_6) => {
  return db.query(`
  INSERT INTO users (id, username, email, join_date, total_wins, total_losses, total_games_played, total_words_missed, guesses_1, guesses_2, guesses_3, guesses_4, guesses_5, guesses_6)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;`, [id, username, email, join_date, total_wins, total_losses, total_games_played, total_words_missed, guesses_1, guesses_2, guesses_3, guesses_4, guesses_5, guesses_6])
  .then((result) => {
    console.log('Adding new user!');
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
};