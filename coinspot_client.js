var coinspot = require ('./coinspot.js');
const { Table } = require("console-table-printer");


var secret = ''; // insert your secret here
var key = ''; // insert your secret here

var client = new coinspot(key, secret);

///Create a table
const output = new Table();
var currBalance = 0;
var keys;
var price;

//variables for reading the investment options from JSON file
var totalBalance = 0;

//Reading the JSON file
const fs=require('fs');
var inveseted = JSON.parse(fs.readFileSync('./investment.json', 'utf8'));

var depthInvestment = inveseted.invested.length;

for (let i = 0; i < depthInvestment; i++){
	totalBalance = totalBalance + inveseted.invested[i].amount
}
//obtaining the balances from coinspot
client.balances(function(e, data) {
var objjj = JSON.parse(data);
  
//finding the number of assests you hold at coinspot
var depth = objjj.balances.length;


//logic to generate table view of the assests you hold, amount invested, current price and gains
for (let i = 0; i < depth; i++){
    
	//obtaining the name of the coin
    keys = Object.keys(objjj.balances[i]);    
    value = keys.join(",")  
	
	//calculating the current balance for all coins
	currBalance = currBalance + objjj.balances[i][value].audbalance
	
	//obtaining the invested amount from investment.json
	inveseted.invested.forEach(element => {
		if (element.coin === value)
		{
			price = element.amount;
		}
		});

	//determine the gains
	difference = objjj.balances[i][value].audbalance - price
	
	//adding the info to array so we can show it in a table
	if (difference < 0){
    output.addRow(
		  {coin: value, Invested: "$ " + price, present: "$ " + (objjj.balances[i][value].audbalance),gains: "$ " + Math.round(difference)},
          {color: "red"}
        );
	  }
	if (difference > 0){
		output.addRow(
			{coin: value, Invested: "$ " + price, present: "$ " + (objjj.balances[i][value].audbalance),gains: "$ " + Math.round(difference)},
			{color: "green"}
			);
		}

}

var gain = Math.round(currBalance - totalBalance);
var totalGainPercentage = Math.round((gain*100)/totalBalance)

let date_ob = new Date();

let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();

//logging the outputs
output.printTable();
console.log("=================================================")
console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
console.log("Current balance is $ " + Math.round(currBalance))
console.log("Total balance is $ " + totalBalance)

if (gain > 1 ){
    console.log("Total Gain is " + '\x1b[42m', gain ,'\x1b[0m'); 
}
if (gain < 1 ){
    console.log("Total Gain is " + '\x1b[41m', gain ,'\x1b[0m'); 
}
if (totalGainPercentage > 1 ){
    console.log("Gain Percentage is " + '\x1b[42m', totalGainPercentage + " %",'\x1b[0m'); 
}
if (totalGainPercentage < 1 ){
    console.log("Gain Percentage is " + '\x1b[41m', totalGainPercentage + " %",'\x1b[0m'); 
}
console.log("=================================================")
});
