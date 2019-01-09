const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const materiaSchema = new Schema({
   title:String,
   profesor:{
     type:Schema.Types.ObjectId,
      ref:'User'
   },
   estudiantes:[{
     type:Schema.Types.ObjectId,
     ref:'User'
   }],
   
   trabajos:[{
     type:Schema.Types.ObjectId,
     ref:'Trabajo'
   }]
}, {
  timestamps: true
}
)
const Materia = mongoose.model('Materia',materiaSchema);
module.exports = Materia;