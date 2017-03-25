var User = require("./models/users");
var Reminder = require("./models/reminders")

module.exports = function(sequelize, DataTypes){
	var userArray = [];
	User.findAll().then(function(users){
		for(i=0; i<users.length; i++){
			var person = {};
			person.id = users[i].id;
			person.phone = users[i].phone;
			person.reminders=[];
			Reminder.findAll({
				where: {
				user
				}
			}).then(function(rems){
				for(j=0; j<reminders.length;j++){
					person.reminders.push(rems[i]);
				} //end reminders for loop
			}); //end .then for reminders
		} //end user for loop
		userArray.push(person);
	}); //end .then for user
	return userArray;
}