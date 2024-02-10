const User = require("../Structures/User")
const Message = require("../Structures/Message")
const EventType = require("../Enums/Events")

module.exports = async function(client, events) {
     
     const usr = await client.api.getUserInfo(events.senderID);
     const user = new User(client, usr[events.senderID], events.senderID)
     const message = new Message(client, { user, ...events})
     
     client.emit(EventType.MessageCreate, {user, message})
}