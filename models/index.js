// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'catagory_id'
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'product_id'
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  foreignKey: 'tag_id'
});


// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  foreignKey: 'procut_id'
});



module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
