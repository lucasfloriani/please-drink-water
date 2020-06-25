require('dotenv').config()
import Discord from 'discord.js'
import waterActions from './configureActions'
import fakeApi from './fakeApi'

const client = new Discord.Client()
client.on('message', message => waterActions(message))
client.login(process.env.DISCORD_BOT_TOKEN)
fakeApi()
