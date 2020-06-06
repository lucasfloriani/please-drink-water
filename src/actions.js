const ActionsName = require('./enums/actions')
const { isBetween, stringToInt } = require('./helpers/common')
const { getCommandValue, sendMessage } = require('./helpers/message')

let intervalRef
const minuteInterval = 1000 * 60
const hourInterval = 1000 * 60 * 60

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
  intervalRef = setInterval(() => sendMessage(message, '@everyone Please Drink Water!'), time)
}

module.exports = {
  setTimeByMinutes,
  setTimeByHours,
}
