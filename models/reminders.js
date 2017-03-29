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
      type: DataTypes.DATE,
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
          // A User (foreignKey) is required or a Reminder can't be made
          Reminder.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }

  );
    
   
  return Reminder;
};