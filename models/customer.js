// Customer for car-service-repair.

const db = require("../db");
const Service = require("./service");

// Customer of the shop.

class Customer {
  constructor({ id, firstName, lastName, phone, car_model, license_plate, notes }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.car_model = car_model;
    this.license_plate = license_plate;
    this.notes = notes;
  }


    //find all customers.

    static async all() {
        const results = await db.query(
          `SELECT id, 
             first_name AS "firstName",  
             last_name AS "lastName", 
             phone,
             car_model,
             license_plate, 
             notes
           FROM customers
           ORDER BY first_name, last_name`
        );
        return results.rows.map(c => new Customer(c));
      }

        // property to get full name.

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }


    // get all appointments for this customer.

    async getAppointments() {
      return await Service.getAppointmentsForCustomer(this.id);
    }


  // get a customer by ID.
  
  static async get(id) {
    const results = await db.query(
      `SELECT id, 
         first_name AS "firstName",  
         last_name AS "lastName", 
         phone,
         car_model,
         license_plate, 
         notes 
        FROM customers WHERE id = $1`,
      [id]
    );

    const customer = results.rows[0];

    if (customer === undefined) {
      const err = new Error(`No such customer: ${id}`);
      err.status = 404;
      throw err;
    }

    return new Customer(customer);
  }


    // save this customer.

    async save() {
      if (this.id === undefined) {
        const result = await db.query(
          `INSERT INTO customers (first_name, last_name, phone, car_model, license_plate, notes)
               VALUES ($1, $2, $3, $4, $5, $6)
               RETURNING id`,
          [this.firstName, this.lastName, this.phone, this.car_model, this.license_plate, this.notes]
        );
        this.id = result.rows[0].id;
      } else {
        await db.query(
          `UPDATE customers SET first_name=$1, last_name=$2, phone=$3, car_model=$4, license_plate=$5, notes=$6
               WHERE id=$7`,
          [this.firstName, this.lastName, this.phone, this.car_model, this.license_plate, this.notes, this.id]
        );
      }
    }


}


module.exports = Customer;