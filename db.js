// Database for car-service-repair

const pg = require("pg");

const db = new pg.Client(process.env['DATABASE_URL']);
// const db = new pg.Client("postgresql:///car-services");



db.connect();

module.exports = db;
