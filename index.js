require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()
const waterActions = require('./actions')

client.on('message', message => waterActions(message))
client.login(process.env.DISCORD_BOT_TOKEN)
