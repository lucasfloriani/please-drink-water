import { Message } from 'discord.js'
import ActionsName from './enums/actions'
import { setTimeByMinutes, setTimeByHours } from './actions'
import { checkCommandFromMessage, haveUsedPrefix, haveAdminPermission } from './helpers/message'

const waterActions = (message: Message) => {
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

export default waterActions
