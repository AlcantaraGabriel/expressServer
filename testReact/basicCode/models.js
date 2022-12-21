const { Schema } = monoose;

const modelSchema =  new Schema({
  modelName: {type: String, default: 'Model'},
  date: { type: Date, default: Date.now },
  hidden: { type: Boolean, default: false },

});





