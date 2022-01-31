// Service for car-service-repair.

const moment = require("moment");

const db = require("../db");

// service appointment for a car.

class Service {
  constructor({ id, customer_id, date_time, services_needed }) {
    this.id = id;
    this.customer_id = customer_id;
    this.date_time = date_time;
    this.services_needed = services_needed;
  }

  

  // methods for setting/getting date_time.

  set date_time(val) {
    if (val instanceof Date && !isNaN(val)) this._date_time = val;
    else throw new Error("Not a valid date or time.");
  }

  get date_time() {
    return this._date_time;
  }

  get formattedDateTime() {
    return moment(this.date_time).format("MMMM Do YYYY, h:mm a");
  }

  // methods for setting/getting services_needed.

  set services_needed(val) {
    this._services_needed = val || "";
  }

  get services_needed() {
    return this._services_needed;
  }

  // methods for setting/getting customer ID: can only set once.

  set customer_id(val) {
    if (this._customer_id && this._customer_id !== val)
      throw new Error("Cannot change customer ID");
    this._customer_id = val;
  }

  get customer_id() {
    return this._customer_id;
  }

  // given a customer id, find their car service appointment.

  static async getAppointmentsForCustomer(customer_id) {
    const results = await db.query(
      `SELECT id, 
           customer_id, 
           date_time, 
           services_needed
         FROM services 
         WHERE customer_id = $1 ORDER BY date_time DESC`,
      [customer_id]
    );

    return results.rows.map(row => new Service(row));
  }

  // find a service appointment by id.

  static async get(id) {
    const result = await db.query(
      `SELECT id, 
           customer_id, 
           date_time, 
           services_needed
         FROM services 
         WHERE id = $1`,
      [id]
    );

    let serviceAppointment = results.row[0];

    if (serviceAppointment === undefined) {
      const err = new Error(`No such service appointment: ${id}`);
      err.status = 404;
      throw err;
    }

    return new Service(serviceAppointment);
  }

  // save service appointment.

  async save() {
    if (this.id === undefined) {
      const result = await db.query(
        `INSERT INTO services (customer_id, date_time, services_needed)
             VALUES ($1, $2, $3)
             RETURNING id`,
        [this.customer_id, this.date_time, this.services_needed]
      );
      this.id = result.rows[0].id;
    } else {
      await db.query(
        `UPDATE services SET date_time=$1, services_needed=$2
             WHERE id=$3`,
        [this.numGuests, this.startAt, this.notes, this.id]
      );
    }
  }



}

module.exports = Service;
