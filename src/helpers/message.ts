import { Message } from 'discord.js'

export const getCommandValue = (message: Message, commandName: string) => {
  const [,commandValue] = message.content.split(`${process.env.DISCORD_BOT_PREFIX} ${commandName}`)
  return commandValue
}

export const checkCommandFromMessage = (message: Message) => (commandName: string) => {
  return message.content.startsWith(`${process.env.DISCORD_BOT_PREFIX} ${commandName}`)
}

export const haveAdminPermission = (message: Message) => {
  if (!message.member) return false
  return message.member.hasPermission(['ADMINISTRATOR'])
}

export const haveUsedPrefix = (message: Message) => message.content.startsWith(process.env.DISCORD_BOT_PREFIX!)

export const sendMessage = (message: Message, text: string) => message.channel.send(text)
