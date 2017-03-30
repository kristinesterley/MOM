
var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // Giving the Author model a name of type STRING
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate: {
        len: [1,25]
      }
   },
      phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        len: [10,11],
        isInt: true
        }
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false
     }
    }, { 

        classMethods: {
            associate: function(models) {
              // Associating User with Reminders
              // When an User is deleted, also delete any associated Reminders
              // NOTE: this model must load before its corresponding belongsto model - that is why the 
              // name of this file is ausers.js so that it loads before reminders.js and we believe the load
              // is done alphabetically - this seems to be a sequelize bug
              User.hasMany(models.Reminder, {
                onDelete: "cascade"
              });
            }
          },
         // The user can be compared to the hashed password stored in our database
        instanceMethods: {
          validPassword: function(password) {
            return bcrypt.compareSync(password, this.password);
          }
        },
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password and
    // before a User password it updated, automatically hash the new password
    // NOTE: beforeUpdate did not work here, but beforeBulkUpdate does!
        hooks: {
          beforeBulkUpdate: function(user) {
            if (user.attributes.password){
              user.attributes.password = bcrypt.hashSync(user.attributes.password, bcrypt.genSaltSync(10), null)
            }
          },
          beforeCreate: function(user, options, cb) {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
            cb(null, options);
          }
        }
      }
    );
  return User;
};