// Database for car-service-repair

const pg = require("pg");

const db = new pg.Client("postgresql:///car-services");



db.connect();

module.exports = db;
