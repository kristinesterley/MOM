module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {

    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      len: [1]
      }
    }    
    }, {
        timestamps:false
  });
  
  return Task;
};