const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options.js') 
const token = '5724246511:AAEngB5OpcFZNCXMV2Axoq7hvdb5zCTP__s'

const bot = new TelegramApi(token, {polling:true})

const chats = {}

const  startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'я загадываю число от 0 до 9')
    const randomNumber = Math.floor(Math.random()*10)
    chats[chatId] = randomNumber
    await bot.sendMessage(chatId, 'Отгадывай' , gameOptions)
}


bot.on('callback_query', async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if(data === '/again') {
        return startGame(chatId)
    }
    if(data === chats[chatId]){
        return bot.sendMessage(chatId, `Красаучик, ты отгадал ${chats[chatId]}`, againOptions)
    }else{
        return bot.sendMessage(chatId, `дебил, а мог выиграть лям наличными, правильный номер: ${chats[chatId]}`, againOptions)
    }
})

const start = () =>{
    bot.setMyCommands([
        {command:'/start', description:'ЭЭЭ мал не тыкай сюда '},
        {command:'/info', description:'я тебя по инфе пробью'},
        {command:'/game', description:'кетик играть'}
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if(text == '/start'){
            await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/fbd/952/fbd9520a-adee-3d3c-8ddd-7f55640da0e1/1.webp')
            return  bot.sendMessage(chatId, `ты зачем мне пишешь ? ${text} А ` )
        }
        if(text === '/info'){ 
            return bot.sendMessage(chatId, `ты ${msg.from.first_name}  ${msg.from.last_name}`)
        }    
        if (text === '/game'){
           return startGame(chatId)
        }
        else{
            return bot.sendMessage(chatId, 'ты че за фигню мне написал, я тебя не понимаю')
        }
    })
}

start()