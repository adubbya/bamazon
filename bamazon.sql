DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(20) NULL,
  price INTEGER(12) NULL,
  stock_quantity INTEGER(12) NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("AR-15", "Sports and Outdoors", 599, 47), ("Beef Jerky", "Groceries", 7, 1436), ("Isis - Panopticon", "Music", 29, 1),
("Aleve", "Pharmaceuticals", 10, 34789), ("Orange Juice", "Groceries", 5, 237), ("Neuromancer", "Books", 13, 129),
("Gouda Wheel", "Groceries", 99, 23), ("Brazilian Hammock", "Sports and Outdoors", 34, 1436), ("Nick Cave and The Bad Seeds - From Her to Eternity", "Music", 13, 0), ("The Wheel of Time Collection", "Books", 109, 76);

SELECT * FROM bamazon.products;