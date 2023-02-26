
const { User } = require('../../db.js')

const findUser = async(mail) => {
    try {
        const usuario = await User.findOne({
            where: {mail: mail} 
        })
        return usuario
    } catch (error) {
        console.log(error)
    }
  
}

    

module.exports = {
    findUser,
    
}

