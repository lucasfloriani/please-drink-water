const ActionsName = require('./enums/actions')
const { isBetween, stringToInt } = require('./helpers')

let intervalRef
const minuteInterval = 1000 * 60
const hourInterval = 1000 * 60 * 60

const waterActions = (message) => {
  if (!haveUsedPrefix(message)) return
  if (!haveAdminPermission(message)) {
    message.channel.send("You don't have administrator permission to use this command!")
    return
  }

  const isCommand = checkCommandFromMessage(message)
  if (isCommand(ActionsName.ChangeTimeByMinutes)) {
    setTimeByMinutes(message)
    return
  }
  if (isCommand(ActionsName.ChangeTimeByHours)) {
    setTimeByHours(message)
    return
  }
}

const checkCommandFromMessage = (message) => (commandName) => {
  return message.content.startsWith(`${process.env.DISCORD_BOT_PREFIX} ${commandName}`)
}

const setTimeByMinutes = (message) => {
  const commandValue = getCommandValue(message, ActionsName.ChangeTimeByMinutes)
  const minutes = stringToInt(commandValue)
  if (!isBetween(minutes, 1, 60)) {
    sendMessage(message, 'Invalid value for interval of water warning message')
    return
  }
  const intervalTime = minutes * minuteInterval
  configureWaterMessageInterval(message, intervalTime)
  sendMessage(message, 'Interval of messages have been changed')
}

const setTimeByHours = (message) => {
  const commandValue = getCommandValue(message, ActionsName.ChangeTimeByHours)
  const hours = stringToInt(commandValue)
  if (!isBetween(hours, 1, 5)) {
    sendMessage(message, 'Invalid value for interval of water warning message')
    return
  }
  const intervalTime = hours * hourInterval
  configureWaterMessageInterval(message, intervalTime)
  sendMessage(message, 'Interval of messages have been changed')
}

const configureWaterMessageInterval = (message, time) => {
  if (intervalRef) clearInterval(intervalRef)
  intervalRef = setInterval(() => message.channel.send('@everyone Please Drink Water!'), time)
}

const getCommandValue = (message, command) => {
  const [_, commandValue] = message.content.split(`${process.env.DISCORD_BOT_PREFIX} ${command}`)
  return commandValue
}

const haveAdminPermission = message => message.member.hasPermission(['ADMINISTRATOR'])
const haveUsedPrefix = message => message.content.startsWith(process.env.DISCORD_BOT_PREFIX)
const sendMessage = (message, text) => message.channel.send(text)

module.exports = waterActions
