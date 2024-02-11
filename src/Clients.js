const EventEmitter = require("events")
const NodeCache = require("node-cache")
const login = require("./lib/index")
const Me = require("./Structures/Me")
const Events = require("./Events")
const EventsType = require("./Enums/Events")

class Client extends EventEmitter{
     constructor(option = {
          listenEvents: true,
          autoMarkRead: true,
          online: true,
          selfListen: true
     }) {
          super()
          this.api = undefined
          this.options = {
               listenEvents: option.listenEvents ?? true,
               autoMarkRead: option.autoMarkRead ?? false,
               online: option.online ?? true,
               selfListen: option.selfListen ?? true
          }
          this.users = new NodeCache()
     }
     
     async login(auth, forceLogin=false) {
          if (!auth) throw new Error("Missing auth credentials, forgot to add ?")
          
          this.api = await new Promise((r, j) => {
               login({appState: auth}, { forceLogin, logLevel: "silent" }, (e, a) => {
                    if (e) j(new Error(`Invalid auth _${e.message}_`))
                    else r(a)
               })
          })
          
          this.api.setOptions({
               ...this.options
          })
          
          const id = this.api.getCurrentUserID();
          const usr = await this.api.getUserInfo(id);
          
          this.me = new Me(this.client, usr[id], id)
          this.events = new Events(this)
          this.events.listen()
          return this.me
     }
     
     get nya() {
          console.log("nya!")
     }
}

module.exports = Client