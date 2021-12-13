CREATE TABLE users (
    username VARCHAR(20) PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT
);

CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    api_id INTEGER,
    title TEXT,
    artist TEXT,
    genre TEXT,
    song_length TEXT,
    album TEXT,
    release_date TEXT,
    year TEXT,
    image_url TEXT,
    preview TEXT
);

CREATE TABLE shows (
    id SERIAL PRIMARY KEY,
    api_id TEXT,
    title TEXT,
    rating TEXT,
    first_aired TEXT,
    genre TEXT,
    writer TEXT,
    plot TEXT,
    actors TEXT,
    awards TEXT,
    episode_length TEXT,
    image_url TEXT,
    years TEXT,
    imdb_rating TEXT,
    imdb_votes TEXT,
    seasons TEXT
);

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    api_id TEXT,
    title TEXT,
    rating TEXT,
    genre TEXT,
    release_date TEXT,
    image_url TEXT,
    runtime TEXT,
    director TEXT,
    writer TEXT,
    plot TEXT,
    year_released TEXT,
    actors TEXT,
    awards TEXT,
    imdb_rating TEXT,
    imdb_votes TEXT,
    earnings TEXT
);

CREATE TABLE queries (
    id SERIAL PRIMARY KEY,
    search_term TEXT NOT NULL,
    top_movies TEXT,
    top_songs TEXT,
    top_shows TEXT
);

CREATE TABLE users_queries (
    id SERIAL PRIMARY KEY,
    username TEXT REFERENCES users,
    query_id INTEGER REFERENCES queries
);

-- CREATE TABLE songs_queries (
--     id SERIAL PRIMARY KEY,
--     query_id INTEGER REFERENCES queries,
--     song_id INTEGER REFERENCES songs
-- );

-- CREATE TABLE shows_queries (
--     id SERIAL PRIMARY KEY,
--     query_id INTEGER REFERENCES queries,
--     show_id INTEGER REFERENCES shows
-- );

-- CREATE TABLE movies_queries (
--     id SERIAL PRIMARY KEY,
--     query_id INTEGER REFERENCES queries,
--     movie_id INTEGER REFERENCES movies
-- );