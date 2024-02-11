const EventType = require("../Enums/Events")


module.exports = async function(client, events) {
     client.emit(EventType.Disconnect, events.message)
}