const ActionsName = require('./enums/actions')
const { setTimeByMinutes, setTimeByHours } = require('./actions')
const { checkCommandFromMessage, haveUsedPrefix, haveAdminPermission } = require('./helpers/message')

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

module.exports = waterActions
