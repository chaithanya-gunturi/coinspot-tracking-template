# **Coinspot Tracking**

This is used to track the crypto assets from Coinspot.

To get started

- Update the following fields in `coinspot_client.js` (generate an API key from the API page after logging in to your account at: https://www.coinspot.com.au/my/api. )

  > secret = (get this from coinspot)
  > key = (get this from coinspot)

- update your investments in `investment.json` in json format (One block for each coin you own)

Some basic Git commands are:

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
```

- to execute the script, you must have node.js installed and run `node coinspot_client.js`
