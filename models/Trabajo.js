const mongoose = require('mongoose')
const Schema = mongoose.Schema

const trabajoSchema = new Schema({
  titulo:String,
  materia:{
    type:Schema.Types.ObjectId,
    ref:'Materia'
  },
  estudiantes:[{
    type:Schema.Types.ObjectId,
    ref:'User'
  }],
  estudiante:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  status:{
    type:Boolean,
    default:false


  },
  calificacion: Number,
  contenido:String,
  anotaciones:String,
  fileURL:String,
  fileName:String,
  
}, {
  timestamps: true
})

const Trabajo = mongoose.model('Trabajo',trabajoSchema);
module.exports = Trabajo