DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255),
  join_date DATE,
  total_wins INT,
  total_losses INT,
  total_games_played INT,
  total_words_missed INT,
  1_guesses INT,
  2_guesses INT,
  3_guesses INT,
  4_guesses INT,
  5_guesses INT,
  6_guesses INT
 );
