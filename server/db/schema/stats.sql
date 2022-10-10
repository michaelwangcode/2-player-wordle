DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  join_date DATE,
  total_wins INT,
  total_losses INT,
  total_games_played INT,
  total_words_missed INT,
  guesses_1 INT,
  guesses_2 INT,
  guesses_3 INT,
  guesses_4 INT,
  guesses_5 INT,
  guesses_6 INT
 );
