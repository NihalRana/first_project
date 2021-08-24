var DataTypes = require("sequelize").DataTypes;
var _banners = require("./banners");

function initModels(sequelize) {
  var banners = _banners(sequelize, DataTypes);


  return {
    banners,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
