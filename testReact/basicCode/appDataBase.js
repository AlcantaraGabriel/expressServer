const mongoose = require('mongoose')
const { Schema } = mongoose;

main().catch(err => console.log(err));

const accountSchema =  new Schema({
  modelName: {type: String, default: 'Account'},
  name:  {type: String},
  email: {type: String, validate: {
  	validator: function(mail){
  				return RegExp("[a-z0-9.]+@[a-z]+\.([a-z])\.[a-z]{2,3}").test(mail);
  		},
  			message: props => '${props.value} is not valid email!'
  	}, 
  	required: [true, 'Is not valid E-mail!'],
   },
  password: { type: String,
  		validate: {
  			validator: function(pswd){
  				return RegExp('[a-zA-Z0-9)]{8,15}').test(pswd);
  			},
  				message: props => '${props.value} is not valid password!'	
  		},
  		required: [true, 'Is not valid password!'],
  },
  date: { type: Date, default: Date.now },
  hidden: { type: Boolean, default: false },
  typeAccount: { type: String, default: '1'},
  permission: { type: String, default: 'Standad' }
  
});

const Account = mongoose.model('Account', accountSchema);

const productSchema = new Schema({
	modelName: String,
	name: String,
	description: String,
	value: mongoose.Decimal128,
	quantidade: Number,
	date: { type: Date, default: Date.now },
	hidden: Boolean,		
});

async function main(modelAccount, ...args){
   mongoose.set('strictQuery', false);

   await mongoose.connect('mongodb+srv://userAdmin:uWFbDin9BcDKbQdO@cluster70054.ppi7cld.mongodb.net/app?retryWrites=true&w=majority', { autoIndex: false });
   
   //let arrayObjects = ['Account', 'Product'];
   let arrayObjects = ["Account"];
   for(let i = 0; i<arrayObjects.length; i++){
   	//console.log(modelAccount);
   	const doc = new Account()
   	doc.email = args[0];
   	doc.password = args[1];
	const searchresult = await Account.find({email: args[0]}).exec();
	//console.log(typeof searchresult);
	if(searchresult[0]){
		console.log(searchresult[0].email);
	}else{
		console.log("not ok");
	}
	//console.log(Object.getOwnPropertyNames(Account));
   	//doc.find()
   	//console.log(doc);
   	//console.log(Object.keys(doc.pswd));
   	//await doc.save();
   	//await doc.save();
   }
   console.log("ok");
   // const Account =  mongoose.model('Account', accountSchema );
   // const doc = new Account();
   // await doc.save();
   // doc._id = 1;
   // await doc.save();
   
   mongoose.disconnect()
   //return true; 
}

module.exports = { Mongoose: mongoose, UserSchema: accountSchema, connect: main }
