# Sample Product Checkout Sample Code

## API

### Setup

- Run `npm install`
- Then run `npm run dev`

### Sample POST request

- The app will run at `http://localhost:7000/api/checkout`
- Use the following JSON sample to send a POST request. Please note that the prices are in cents.

```
{
  "rules": [
    {
      "item": "large_pizza",
      "type": "discount",
      "condition": {
        "price": 29999
      }
    }
  ],
  "orderItems": [
    {
      "itemId": "medium_pizza",
      "quantity": 3
    },
    {
      "itemId": "large_pizza",
      "quantity": 1
    }
  ]
}

```

### Tests

- Run `npm run test`
