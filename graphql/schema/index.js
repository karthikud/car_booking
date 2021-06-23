const { buildSchema } = require("graphql");

module.exports = buildSchema(`

  scalar DateTime
  scalar Object

  input CustomerInput {
    name: String!
    email: String!
    phone_number: String!
  }

  input VehicleInput {
    make: String!
    model: String
    vin: String
  }

  type Customer {
    name: String!
    email: String!
    phone_number: String!
}

type Vehicle {
    make: String!
    model: String
    vin: String
}
type Setting{
  _id: ID!
  name:String!
  value:String!

}
  type booking {
    _id: ID!
    customer:Customer!
    vehicle:Vehicle!
    time:DateTime
    filter:Object

  }

  input BookingInput {
    customer:CustomerInput
    vehicle:VehicleInput
    time:DateTime

  }
  input SettingInput {
    name:String
    value:String

  }




  type Query {
    bookings(filter: Object): [booking!]

  }

  type Mutation {
    create_booking(booking:BookingInput):booking
    upsert_setting(Setting:SettingInput):Setting
  }

  schema {
    query: Query
    mutation: Mutation
  }
`);
