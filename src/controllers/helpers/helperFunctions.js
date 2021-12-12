import mongoose from "mongoose"
import mailgun from "mailgun-js"

export const validMongoDBId = (id) => {
    if (mongoose.Types.ObjectId.isValid(id)) return true
    return false
}


export const sendEmailMessage = (from, to, subject='Pizza Receipt', text, callback ) => {
    const DOMAIN = process.env.MAILGUN_DOMAIN;
    const APIKEY = process.env.MAILGUN_APIKEY
    const mg = mailgun({apiKey: APIKEY, domain: DOMAIN});
    const data = {
        from, to, subject, text
    };
    
    mg.messages().send(data, function (error, body) {
        callback(error, body)
    });
}
