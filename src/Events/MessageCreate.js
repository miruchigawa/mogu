const User = require("../Structures/User")
const Message = require("../Structures/Message")
const EventType = require("../Enums/Events")

module.exports = async function(client, events) {
     
     if (!client.users.has(events.senderID)) {
          const usr = await client.api.getUserInfo(events.senderID);
          const newuser = new User(client, usr[events.senderID], events.senderID)
          client.users.set(events.senderID, newuser)
     }
     
     const user = client.users.get(events.senderID)
     const message = new Message(client, { user, ...events})
     
     client.emit(EventType.MessageCreate, {user, message})
}