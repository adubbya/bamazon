// require mysql, inquirer, cli-table
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var table = new Table({
    head: ["Item ID", "Product", "Department", "Price", "Quantity"]
    , colWidths: [10, 60, 25, 10, 10]
});

// mysql connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    displayProducts();
});

// function to display entire table
function displayProducts() {
    console.log("Welcome to Bamazon, here are my wares, Chummer.");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }

        console.log(table.toString());
        productPick();
    });
}

//function to prompt users with product ID request, then # of units 
function productPick() { 
    inquirer
        .prompt({
            name: "itemID",
            type: "input",
            message: "Please enter item ID of product you want to purchase:  ",
        })
        .then(function(answer) {
            console.log(answer.itemID);
            var query = "SELECT products.product_name FROM products WHERE ?"
            connection.query(query, { item_id: answer.itemID }, function(err, res) {
            console.log("You want " + res.product_name + "?")
            });
                 
         });
    };

    //if stock_quantity is => #units request,
        // UPDATE diff of stock_quantity -= #unitsrequest
        // price *= #unitsrequest 

    // else 
        // console.log("ain't got enuff")
