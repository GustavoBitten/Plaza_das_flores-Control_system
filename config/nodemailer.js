const mailer = require('nodemailer')

const config= {
    service: 'Gmail',
    auth:{
        user: 'plazadasfloresdh@gmail.com',
        pass: 'plazadasflores'
    }
}

const transporter = mailer.createTransport(config)

module.exports = transporter