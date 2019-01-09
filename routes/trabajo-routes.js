const express = require('express')
//const mongoose = require('mongoose')
const Materia = require('../models/Materia')
const User = require('../models/User')
const Trabajo = require('../models/Trabajo')
const multer     = require('multer')
const uploadCloud =  require('../configs/cloudinary')

const router = express.Router()
//califica una tarea por el profesor
router.post('/trabajocalificado/:id',(req,res,next)=>{
    Trabajo.findByIdAndUpdate(req.params.id, {calificacion:req.body.calificacion, anotaciones:req.body.anotaciones})
    .then((respuesta)=>{
      res.json(respuesta)
    }).catch(error=>{
      res.json(error)
    })
})

//sube la tarea hecha en un pdf

router.post('/trabajohecho/:id', uploadCloud.single('picture'), (req, res, next) => {
  Trabajo.findByIdAndUpdate(req.params.id, { fileURL: req.file.url, fileName:req.file.originalname })
    .then(() => {
      res.json({
        success: true,
        fileURL: req.file.url
      })
    })
});
//obtener un trabajo por id

router.get('/trabajo/:id',(req,res,next)=>{
 
  Trabajo.findById(req.params.id).populate('estudiantes').populate('materia').populate('estudiante')
  .then(trabajo =>{
    res.json(trabajo)
  }).catch(error=>{
    res.json(error)
  })
})




//crear nuevo trabajo
// router.post('/trabajo',(req,res,next)=>{
//   Trabajo.create({
//     titulo:req.body.titulo,
//     materia:req.body.materia,
//     contenido:req.body.contenido,
//     estudiantes:req.body.estudiantes
//   }).then(trabajo=>{
    
   
//     Materia.findByIdAndUpdate(trabajo.materia,{ $push:{trabajos:trabajo._id}})
//     .then(resp=>{
//       trabajo.estudiantes.map(user => {
//         User.findByIdAndUpdate(user,{ $push:{trabajos: trabajo._id}})
//       .then(response=>{
//         res.json(response)
//       }).catch(err=>{
//         res.json(err)
//       })
//       })
//     }).catch(err=>{
//       res.json(err)
//     })

    
    
//   }).catch(err=>{
//     res.json(err)
//   })

// })
router.post('/trabajo',(req,res,next)=>{
  req.body.estudiantes.map(user =>{
    Trabajo.create({
      titulo:req.body.titulo,
      materia:req.body.materia,
      contenido:req.body.contenido,
      estudiantes:req.body.estudiantes,
      estudiante: user
    }).then(trabajo=>{
      Materia.findByIdAndUpdate(trabajo.materia,{ $push:{trabajos:trabajo._id}})
      .then(resp =>{
        User.findByIdAndUpdate(user,{ $push:{trabajos: trabajo._id}})
        .then(respuesta=>{
          res.json(respuesta)
        }).catch(error=>{
          res.json(error)
        })


      }).catch(error=>{
        res.json(error)
      })

    }).catch(error=>{
      res.json(error)
    })
  })
})



router.delete('/trabajo/:id',(req,res,next)=>{
  Trabajo.findByIdAndRemove(req.params.id)
  .then(()=>{
    res.json({message:`Trabajo con id  ${req.params.id} ha sido removido`})
  }).catch(err=>{
    res.json(err)
  })
})
module.exports = router