const Joi = require('joi');
const db = require('./connect');
const moment = require('moment');

const schema = Joi.object().keys({
    username: Joi.string().alphanum().required(),
    subject: Joi.string().required(),
    message: Joi.string().max(500).required(),
    imgUrl: Joi.string().uri({
        scheme: [
            /https?/
        ]
    })
});

const mes = db.get('message');

getAllMes = () => {
    return mes.find();
}

create = (message) => {
    if (!message.username) {
        message.username = 'Anonymous';
    }
    const rez = Joi.validate(message, schema);
    if (rez.error == null) {
        message.created = moment().format('MMMM Do YYYY, h:mm:ss a');
        return mes.insert(message);
    }
    else {
        return Promise.reject(rez.error);
    }
}

module.exports = {
    getAllMes,
    create
}