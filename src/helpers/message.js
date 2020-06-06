const getCommandValue = (message, command) => {
  const [_, commandValue] = message.content.split(`${process.env.DISCORD_BOT_PREFIX} ${command}`)
  return commandValue
}

const checkCommandFromMessage = (message) => (commandName) => {
  return message.content.startsWith(`${process.env.DISCORD_BOT_PREFIX} ${commandName}`)
}

const haveAdminPermission = message => message.member.hasPermission(['ADMINISTRATOR'])
const haveUsedPrefix = message => message.content.startsWith(process.env.DISCORD_BOT_PREFIX)
const sendMessage = (message, text) => message.channel.send(text)

module.exports = {
  checkCommandFromMessage,
  getCommandValue,
  haveAdminPermission,
  haveUsedPrefix,
  sendMessage,
}