const { Router } = require('express');
const passport = require('passport');
//const LocalStrategy = require("passport-local").Strategy;
const LocalStrategy = require('../../authentication/index')
const User = require('../../db')
const {findUser}= require('./controller.js')



const router = Router();
// Configuración de la sesión de Passport.js
/* passport.use(
  new LocalStrategy(
    {
      usernameField: "mail", // campo de formulario para el correo electrónico
      passwordField: "password", // campo de formulario para la contraseña
    },
    async function (mail, password, done) {
      try {
        // Busca el usuario en la base de datos por su correo electrónico
        const user = await User.findOne({ where: { mail } });
        if (!user) {
          return done(null, false, {
            message: "Correo electrónico incorrecto.",
          });
        }
        if (password !== user.password) {
          return done(null, false, { message: "Contraseña incorrecta." });
        }
        // Si todo sale bien, devuelve el usuario
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
) */;
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    // Busca el usuario en la base de datos por su ID
    const user = await User.findByPk(id);
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error);
  }
});
//login
router.post('/', passport.authenticate('local', {
  successRedirect: "/",
  failureRedirect: "/?err=password",
}),
  async (req, res, next) => {
    try {
      const {mail, password }= req.body;
      const users = await findUser(mail)
     
     
      res.send({
       id: users.id,
       name: users.name,
       mail:users.mail

      }) 
    } catch (error) {
      next(error)
    }
  }
)
//si ya iniciamos sesion
router.get('/', (req, res) => {
  res.send('holi')
})

// recibir las credenciales
router.get('/', (req, res) => {
  res.send('holi')
})
//get ---> form--> ruta nueva 
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(function (err) {
      if (err) return next(err);
      res.redirect("/");
    });
  });
});

module.exports = router