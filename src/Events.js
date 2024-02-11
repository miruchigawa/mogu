const EventType = require("./Enums/Events")
const { Collection } = require("@discordjs/collection")
const MessageType = require("./Enums/MessageEvent")

class Events {
     constructor(client) {
          this.client = client
          this.event = new Collection()
          this.event.set("MessageCreate", require("./Events/MessageCreate"))
          this.event.set("Disconnect", require("./Events/Disconnect"))
     }
     
     
     handle(client, event) {
          const name = MessageType[event.type]
          if (!name) return
          
          if (!this.event.has(name)) return
          this.event.get(name).call(null, client, event)
     }
     
     listen() {
          this.client.api.listenMqtt((e, v) => {
               if (e) this.client.emit(EventType.Error, e)
               else this.handle(this.client, v)
          })
          
          this.client.emit(EventType.Ready, this.client)
     }
}

module.exports = Events