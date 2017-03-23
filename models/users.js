
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
         // The user can be compared to the hashed password stored in our database
    instanceMethods: {
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      }
    },
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    hooks: {
      beforeCreate: function(user, options, cb) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
        cb(null, options);
      }
    },



 


  // {
  //   freezeTableName: true,

    // Here we'll pass a second "classMethods" object into the define method
    // This is for any additional configuration we want to give our models
    
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // Associating Author with Posts
          // When an Author is deleted, also delete any associated Posts
          User.hasMany(models.Reminder, {
            onDelete: "cascade"
          });
        }
      },

    // Creating a custom method for our User model. This will check if an unhashed password entered by

  });
  return User;
};