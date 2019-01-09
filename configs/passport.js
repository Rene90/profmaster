const User          = require('../models/User');
 const LocalStrategy = require('passport-local').Strategy;
 const bcrypt        = require('bcryptjs'); // !!!
const passport      = require('passport');

// passport.serializeUser((loggedInUser, cb) => {
//   cb(null, loggedInUser._id);
// });

// passport.deserializeUser((userIdFromSession, cb) => {
//   User.findById(userIdFromSession, (err, userDocument) => {
//     if (err) {
//       cb(err);
//       return;
//     }
//     cb(null, userDocument);
//   });
// });

// passport.use(new LocalStrategy((name, password, next) => {
//   User.findOne({ name }, (err, foundUser) => {
//     if (err) {
//       next(err);
//       return;
//     }

//     if (!foundUser) {
//       next(null, false, { message: 'Nombre de usuario incorrecto' });
      
//       return;
//     }

//     if (!bcrypt.compareSync(password, foundUser.password)) {
//       next(null, false, { message: 'Password incorrecto' });
    
//       return;
//     }

//     next(null, foundUser);
//   });
// }));

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


module.exports = passport 
