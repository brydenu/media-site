CREATE TABLE users (
    username VARCHAR(20) PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    country_code VARCHAR(2)
);

CREATE TABLE queries (
    id SERIAL PRIMARY KEY,
    search_term TEXT NOT NULL
);

CREATE TABLE users_queries (
    username TEXT REFERENCES users,
    query_id INTEGER REFERENCES queries
);

CREATE TABLE songs (
    id INTEGER PRIMARY KEY,
    title TEXT,
    artist TEXT,
    album TEXT,
    release_date TEXT,
    image_url TEXT,
    link TEXT
);

CREATE TABLE shows (
    id TEXT PRIMARY KEY,
    title TEXT,
    image_url TEXT,
    start_year INTEGER,
    episode_count INTEGER
);

CREATE TABLE movies (
    id TEXT PRIMARY KEY,
    title TEXT,
    release_year INTEGER,
    image_url TEXT,
    runtime INTEGER
);

CREATE TABLE songs_queries (
    id SERIAL PRIMARY KEY,
    query_id INTEGER REFERENCES queries,
    song_id INTEGER REFERENCES songs
);

CREATE TABLE shows_queries (
    id SERIAL PRIMARY KEY,
    query_id INTEGER REFERENCES queries,
    show_id TEXT REFERENCES shows
);

CREATE TABLE movies_queries (
    id SERIAL PRIMARY KEY,
    query_id INTEGER REFERENCES queries,
    movie_id  TEXT REFERENCES movies
);