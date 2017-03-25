module.exports = function(sequelize, DataTypes) {
  var Reminder = sequelize.define("Reminder", {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      len: [1]
      }
    }, 
    begin_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate:true
      }
    },
    begin_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    frequency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "once"      
    },
  },
 
    {
      // We're saying that we want User to have Reminders
      classMethods: {
        associate: function(models) {
          // An Author (foreignKey) is required or a Post can't be made
          Reminder.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }

  );
    
   
    // freezeTableName: true,
  
  return Reminder;
};