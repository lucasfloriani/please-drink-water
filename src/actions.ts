import { Message } from 'discord.js'
import ActionsName from './enums/actions'
import { isBetween, stringToInt } from './helpers/common'
import { getCommandValue, sendMessage } from './helpers/message'

let intervalRef: ReturnType<typeof setTimeout>
const minuteInterval = 1000 * 60
const hourInterval = 1000 * 60 * 60

export const setTimeByMinutes = (message: Message) => {
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

export const setTimeByHours = (message: Message) => {
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

const configureWaterMessageInterval = (message: Message, time: number) => {
  if (intervalRef) clearInterval(intervalRef)
  intervalRef = setInterval(() => sendMessage(message, '@everyone Please Drink Water!'), time)
}
