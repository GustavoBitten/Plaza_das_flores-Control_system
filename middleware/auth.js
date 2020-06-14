const session = require('express-session')
const ativadorAuth = require('../utils/ativadorAuth')
const {
    Usuario
} = require('../models')

const auth = async (req, res, next) => {

    if (ativadorAuth) {

        if (req.session.user != undefined) {
            return next()
        } else if (req.cookies.user) {
            const user = await Usuario.findOne({
                where: {
                    token: req.cookies.user,
                    status: true
                }
            })

            if (user) {
                req.session.user = user
                return next()
            }
            return res.redirect('/login')

        } else {
            return res.redirect('/login')
        }

    } else {
    
            const url = req.originalUrl
            const urlParts = url.split('/')
            const typeRoute = urlParts[2]


            async function getUser(idUser) {

                const user = await Usuario.findByPk(idUser)
                req.session.user = user
                return next()

            }

            switch (typeRoute) {
                case 'morador':

                    return getUser('1')

                case 'sindico':

                    return getUser('2')

                case 'portaria':

                    return getUser('3')

                default:
                    break;
            }





       
    }



}
module.exports = auth