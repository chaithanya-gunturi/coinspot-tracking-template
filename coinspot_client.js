var coinspot = require ('./coinspot.js');

var secret = ''; // insert your secret here
var key =  ''; // insert your secret here

var client = new coinspot(key, secret);

var currBalance = 0;
var keys;
var price;
var info = {};

//variables for reading the investment options from JSON file
var totalBalance = 0;
var o = {};
var a = 'Crypto Holdings';
o[a] = [];

//Reading the JSON file
const fs=require('fs');
var inveseted = JSON.parse(fs.readFileSync('./investment.json', 'utf8'));

var depthInvestment = inveseted.invested.length;

for (let i = 0; i < depthInvestment; i++){
	totalBalance = totalBalance + inveseted.invested[i].amount
}
//obtaining the balances from coinspot
client.balances(function(e, data) {
var APIresponse = JSON.parse(data);
  
//finding the number of assests you hold at coinspot
var depth = APIresponse.balances.length;


//logic to generate table view of the assests you hold, amount invested, current price and gains
for (let i = 0; i < depth; i++){
    
	//obtaining the name of the coin
    keys = Object.keys(APIresponse.balances[i]);    
    value = keys.join(",")  
	
	//calculating the current balance for all coins
	currBalance = currBalance + APIresponse.balances[i][value].audbalance
	
	//obtaining the invested amount from investment.json
	inveseted.invested.forEach(element => {
		if (element.coin === value)
		{
			price = element.amount;
		}
		});

	//determine the gains
	difference = APIresponse.balances[i][value].audbalance - price
	
	//adding the info to array so we can show it in a table
	info = {
		  coin: value,
		  Invested: price,
		  present: APIresponse.balances[i][value].audbalance,
		  gains: Math.round(difference)
	  }
	  o[a].push(info);
}

var totalGain = Math.round(((currBalance - totalBalance)*100)/totalBalance)
//logging the outputs
console.table(o[a]);
console.log("=================================================")
console.log("Current balance is " + currBalance)
console.log("Total balance is " + totalBalance)
console.log("Gain is " + totalGain)
console.log("=================================================")
});
