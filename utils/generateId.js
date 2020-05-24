const crypto = require('crypto')

function generateId(){
    
    return crypto.randomBytes(4).toString('HEX') 
}


//console.log(generateId())
module.exports = generateId