const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const router = express.Router()

/*router.post('/signup',(req,res,next)=>{
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;
  const role = req.body.role;
  if(!name || !password){
    res.status(400).json({message:'Provee un usuario y un password'});
  
 
    return
  }
  if(password.length <3){
    res.status(400).json({message:'Por favor escribe un password de mayor longitud'})
   
    return
  }
  User.findOne({name},(err,usuario)=>{
    if(err){
      res.status(500).json({message:'Fallo al buscar usuario'})
      return
    }
    if(usuario){
      res.status(400).json({message:'Usuario ya escogido. Por favor escribe otro nombre'})
      
      return
    }
    //hashea password
    const salt = bcrypt.genSaltSync(10)
    const hashPass = bcrypt.hashSync(password,salt);

    const newUser = new User({
      name: name,
      password: hashPass,
      email:email,
      role:role
    })

    newUser.save(err=>{
      //guarda usuario nuevo
      if(err){
        res.status(400).json({message:'Error al guardar usuario en base de datos'})
      
        return
      }
      //hace login despues de hacer signup
      req.login(newUser,(err)=>{
        if(err){
          res.status(500).json({message:'Error al hacer login despues de guardar usuario'})
          return
        }
        //mandamos usuario a frontend
        res.status(200).json(newUser)
      })
    })


  })
})*/

router.post('/signup', (req, res, next)=>{
  User.register(req.body, req.body.password)
    .then(user=>{
      req.login(user,(err)=>{
        if(err){
          res.status(500).json({message:'Error al hacer login despues de guardar usuario'})
          return
        }
        //mandamos usuario a frontend
        return res.status(200).json(user)
      })
  //    return res.status(201).json(user)
    }).catch(e=>{
      console.log(e)
      return res.status(500).json(e)
    })
})
router.post('/login',(req,res,next)=>{
  console.log(req.body)
  passport.authenticate('local',(err,theuser,failureDetails)=>{
    if(err){
      res.status(500).json({message:'Ocurrio un error al hacer login al user'})
      return
    }
    if(!theuser){      
      return res.status(401).json(failureDetails)            
    }
    req.login(theuser,(err)=>{
      if(err){
        return res.status(500).json({message:'Error al salvar sesion'})
        
      }
      res.status(200).json(theuser)
    })
  })(req,res,next)
})
router.post('/logout',(req,res,next)=>{
  req.logout();
  res.status(200).json({message:'Log out con exito'})


})

router.get('/loggedin',(req,res,next)=>{
  if(req.isAuthenticated()){
    res.status(200).json(req.user)
    return
  }
  res.status(403).json({message:'sin autorizacion'})
})

router.get('/user/:id',(req,res,next)=>{
  console.log(req.params.id)
  User.findById(req.params.id).populate('trabajos').populate('materias')
  .then(usuario =>{
    res.json(usuario)
  }).catch(error=>{
    res.json(error)
  })
})
module.exports = router