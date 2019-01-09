const express = require('express')
const mongoose = require('mongoose')
const Materia = require('../models/Materia')
const User = require('../models/User')

const router = express.Router()

//obtiene todas las materias del usuario
router.get('/materiasUsuario',(req,res,next)=>{
  const id = req.user.id
  User.findById(id).populate('materias').populate('trabajos')
  .then(user=>{
    res.json(user)
  }).catch(err=>{
    res.json(err)
  })

})
//obtiene todas las materias
router.get('/materias',(req,res,next)=>{
  Materia.find()
  .then(materias =>{
    res.json(materias)
  }).catch(err=>{
    res.json(err)
  })
})
//crear nueva materia
router.post('/materias',(req,res,next)=>{
  Materia.create({
    title:req.body.title,
    profesor:req.user.id,
    estudiantes:[],
    calificaciones:[],
    trabajos:[]
  }).then(materia=>{
    User.findByIdAndUpdate(req.user.id,{ $push:{materias: materia._id}})
    .then(response=>{
      res.json(response)
    }).catch(err=>{
      res.json(err)
    })
    
  }).catch(err=>{
    res.json(err)
  })

})
//Resgistra un esrtudiante en la materia seleccionada
router.post('/materias/:id',(req,res,next)=>{
  console.log('1')
  console.log(req.params.id)
  console.log(req.body.user)
  console.log('2')
  
  const userId = req.body.user
 
  User.findByIdAndUpdate(userId,{ $push:{materias: req.params.id}})
  .then(response=>{
    Materia.findByIdAndUpdate(req.params.id,{ $push:{estudiantes:userId}})
    .then(respuesta=>{
      res.json(respuesta)
    }).catch(err=>{
      res.json(err)
    })
  }).catch(err=>{
    res.json(err)
  })
})

//detalle de materia
router.get('/materias/:id',(req,res,next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Id especificado no es valido' });
    return;
  }

                                  
  Materia.findById(req.params.id).populate('estudiantes').populate('trabajos')
    .then(materia => {
      res.status(200).json(materia);
    })
    .catch(err => {
      res.json(err);
    })
})
//borrar materia
router.delete('/materias/:id',(req,res,next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({message:'Id especificado no es valido'})
    return
  }
  Materia.findByIdAndRemove(req.params.id)
  .then(()=>{
    res.json({message: `Materia con id ${req.params.id} fue removido`})
  }).catch(err=>{
    res.json(err)
  })
})
module.exports = router