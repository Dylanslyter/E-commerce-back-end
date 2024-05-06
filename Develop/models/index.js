
// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id', // Define the foreign key in the Products table
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id', // Define the foreign key in the Products table
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id', // Define the foreign key in the ProductTag table that references the Products table
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id', // Define the foreign key in the ProductTag table that references the Tags table
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
