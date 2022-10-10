const twilio = require('twilio')
require('dotenv').config()
const accountSid = `${process.env.ACCOUNT_SID}`
const authToken = `${process.env.AUTH_TOKEN}`

const twilioClient = twilio(accountSid, authToken)

module.exports = async function sendWhatsappToUser(number, idCart) {
    try {
        const from = 'whatsapp:+14155238886'
        const to = `whatsapp:${number}`
        const body = 
        `Hola, ${idCart}!
        Tu pedido ha sido realizado exitosamente.`
        console.log(body)
        const info = await twilioClient.messages.create({body, from, to})
        return info
    } catch (error) {
        return (`sendMailToAdmin ERROR! -> ${error}`)
    }
}




