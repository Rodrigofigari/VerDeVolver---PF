const {Strategy} = require('passport-local');
const {findBymail} = require('../../routes/user/controllers')

//ver como me traigo el email


const LocalStrategy = new Strategy(
  {
    usernameField : 'email',
    passwordField: 'password'
  },
  async (mail, password, done) => {
    try {
      const user = await findBymail(mail);
      if(!user){
        done(null, false, {
           message: "Correo electrónico incorrecto.",
          
        })
      }
      if (password !== user.password) {
        return done(null, false, { message: "Contraseña incorrecta." });
      }
      return done(null, user)
    
    } catch (error) {
      done(error, false)
    }
  }
)

module.exports = LocalStrategy;