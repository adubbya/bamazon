-- bamazon sql schema
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(20) NULL,
  price INTEGER(12) NULL,
  stock_quantity INTEGER(12) NULL;