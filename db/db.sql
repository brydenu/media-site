\echo 'Delete and recreate media db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE media_site;
CREATE DATABASE media_site;
\connect media_site

\i media-site-schema.sql

\echo 'Delete and recreate media_site_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE media_site_test;
CREATE DATABASE media_site_test;
\connect media_site_test;

\i media-site-schema.sql;
