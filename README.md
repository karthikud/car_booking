
## DEMO App Deployed here https://v-car-booking.herokuapp.com/graphql

## Available Scripts

In the project directory, you can run:
### `npm install`
To install all the dependencies in the project


### `npm start`

Runs the app.<br />
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.


## `Example Queries`

### `Change capacity`
```
mutation {
  upsert_setting(Setting: {name: "capacity", value: "6"}) {
    name
    value
  }
}

```


### `Create a booking`
```
mutation {
  create_booking(booking: {customer: {name: "cstomer_name", email: "customer@gmail.com", phone_number: "123456789"}, vehicle: {make: "volvo", model: "xc40", vin: "5N3AA08CX7N805813"}, time: "2021-06-21T14:48:00.000+00:00"}) {
    time
  }
}
```


### `Get all bookings for a day`
```
{
  bookings(filter: {day: "2021-06-21"}) {
    customer {
      name
    }
    vehicle {
      make
      model
      vin
    }
    time
  }
}
```

### `Search booking by  VIN`
```
{
  bookings(filter: {vin: "5N3AA08CX7N805813"}) {
    customer {
      name
    }
    vehicle {
      make
      model
      vin
    }
    time
  }
}

```




