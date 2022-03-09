# **Coinspot Tracking**

This is used to track the value of crypto assets from Coinspot.

To get started

- Make sure you have node.js installed. (https://nodejs.dev/download/)

- Run `npm install`

- Update the following fields in `coinspot_client.js` (generate an API key from the API page after logging in to your account at: https://www.coinspot.com.au/my/api. )

  > secret = (get this from coinspot)
  > key = (get this from coinspot)

- update your investments in `investment.json` in json format (One block for each coin you own)

```
{
   "invested":[
      {
         "coin": "ETH",
         "amount":10000
      },
      {
         "coin": "UNI",
         "amount":50000
      }
}
```

- To execute the script, run the following

> `node coinspot_client.js`
