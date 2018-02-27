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
        productPick(res);
    });
}

//function to prompt users with product ID request, then # of units 
function productPick(stock) {
    inquirer
        .prompt({
            name: "itemID",
            type: "input",
            message: "Please enter item ID of product you want to purchase:  ",
        })
        .then(function (answer) {
            var itemIDint = parseInt(answer.itemID);
            var product = checkTheStock(itemIDint, stock);
            if (product) {
                console.log("You want " + product.product_name + "?");
                productQuantity(product);

            }
            else {
                console.log("ain't got dat, frag face")
            }
        });
};

// Inventory checker for loop?
function checkTheStock(itemIDint, stock) {
    for (var i = 0; i < stock.length; i++) {

        if (stock[i].item_id === itemIDint) {
            return stock[i];
            console.log(stock[i]);
        }
    }
    return null;
}

// quantity check
function productQuantity(product) {
    inquirer
        .prompt({
            name: "itemQuantity",
            type: "input",
            message: "OK, How many ya want?",
        })
        .then(function (answer) {
            var quantity = parseInt(answer.itemQuantity);
            if (quantity > answer.stock_quantity) {
                console.log("\nWe're all out!");
            }
            else {
                console.log("We can give ya " + quantity + " of 'em");
                productBuy(product, quantity);
            };
        });
    }

 //price check
 function productBuy(product, quantity) {
     // sql update, math: quant*quantwanted
 }   