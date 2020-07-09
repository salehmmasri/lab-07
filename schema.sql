DROP TABLE IF EXISTS locations;
CREATE TABLE IF NOT EXISTS locations(
    id SERIAL PRIMARY KEY,
    search_query VARCHAR(255),
    formatted_query VARCHAR(255),
    latitude NUMERIC(20,14),
    longitude NUMERIC(20,14)
);
-- PSQL -F SCHEMA.SQL -d DBS_NAME
-- INSERT INTO locations (search_query,formatted_query,latitude,longitude) VALUES('ny','anything',50.111,40);
