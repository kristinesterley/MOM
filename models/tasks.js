module.exports = function(sequelize, DataTypes) {
  var Tasks = sequelize.define("Task", {

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

    
   
    // freezeTableName: true,
  
  return Tasks;
};