
Use ecommerce_db;
SET FOREIGN_KEY_CHECKS = 0;
-- Sample data for categories
INSERT INTO category (category_name) VALUES
('Electronics'),
('Clothing'),
('Home & Kitchen'),
('Books');

-- Sample data for products
INSERT INTO product (product_name, price, stock, category_id) VALUES
('Laptop', 999.99, 50, 1),
('Smartphone', 699.99, 100, 1),
('T-Shirt', 19.99, 200, 2),
('Jeans', 49.99, 150, 2),
('Coffee Maker', 39.99, 75, 3),
('Blender', 29.99, 100, 3),
('Python Programming Book', 29.99, 50, 4),
('JavaScript Programming Book', 29.99, 50, 4);

-- Sample data for tags
INSERT INTO tag (tag_name) VALUES
('Electronic'),
('Fashion'),
('Appliance'),
('Book'),
('Smart'),
('Casual');

-- Sample data for product_tag (associations between products and tags)
INSERT INTO product_tag (product_id, tag_id) VALUES
(1, 1),
(1, 5),
(2, 1),
(2, 5),
(3, 2),
(4, 2),
(5, 3),
(6, 3),
(7, 4),
(8, 4);

SET FOREIGN_KEY_CHECKS = 0;