const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const plm = require('passport-local-mongoose')
const userSchema = new Schema({
  name:String,
  email:String,
  
  // photoUrl:{
  //   type:String,
  //   default:'/pics/default.jpg'
  // },
  // photoName:{
  //   type:String,
  //   default:"deafult"
  // },
  role:{
    type:String,
    enum:["Profesor","Estudiante"]
  },
  materias:[{
    type:Schema.Types.ObjectId,
    ref:'Materia'
  }],
  trabajos:[{
    type:Schema.Types.ObjectId,
    ref:'Trabajo'
  }]

}, {
  timestamps: true
})
userSchema.plugin(plm, {usernameField: 'name'})
const User = mongoose.model('User',userSchema);
module.exports = User;