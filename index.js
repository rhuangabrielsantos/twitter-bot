var Twit = require('twit')

require('dotenv').config()

const Bot = new Twit({
    consumer_key:         process.env.CONSUMER_KEY,
    consumer_secret:      process.env.CONSUMER_SECRET,
    access_token:         process.env.ACCESS_TOKEN,
    access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
    timeout_ms:           60 * 1000,
});

let idLastMessage = ''

function BotInit() {
	var query = {
        q: "@rhuangs_",
        result_type: "recent"
    }

	Bot.get('search/tweets', query, Tweet)
}

function Tweet(error, data) {
    let tweetId = data.statuses[0].id_str
    let user = '@' + data.statuses[0].user.screen_name

    if (idLastMessage !== tweetId) {
        let query = { 
            in_reply_to_status_id: tweetId, 
            status: getRandomMessage(user)
        }

        Bot.post('statuses/update', query)
        idLastMessage = tweetId
    }
}

function getRandomMessage(user) {
    const messages = [
        { message: user + ' Eu to dormindo, se for meme ou urgente me chama no wpp!' },
        { message: user + ' Você de novo? Eu to dormindo vei!' },
        { message: user + ' Achei interessante, manda mais' },
        { message: user + ' Kkkkkkkkkkkkkkkkkkkkkkk' },
        { message: user + ' Eu sou uma mensagem automática, o rhuan acha isso engraçado' },
        { message: user + ' Por que você continua marcando ele?' },
        { message: user + ' Você ta de marcação comigo né?' },
        { message: user + ' Que divertido' },
        { message: user + ' Eu não uso Twitter, vai procurar o que fazer' },
        { message: user + ' Péssimo dia irmão, péssimo dia' },
        { message: user + ' Sem tempo irmão' },
        { message: user + ' Era isso?' },
        { message: user + ' Ninguém perguntou' },
    ];
    
    const randomMessages = [];

    while (messages.length) {
        const index = Math.floor(Math.random() * messages.length - 1);    
        const [option] = messages.splice(index, 1);
    
        randomMessages.push(option);
    }
    
    return randomMessages[0].message
}

setInterval(BotInit, 30*60*1000);
BotInit()