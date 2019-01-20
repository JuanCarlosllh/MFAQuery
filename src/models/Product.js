module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('product', {
    id: { type: DataTypes.STRING, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING },
    type: { type: DataTypes.STRING }
  })

  return Product
}
