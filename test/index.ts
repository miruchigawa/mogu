import { Client, EventType, IErrorMessage } from "../src"
import auth from "./cookies.json"

function main() {
     const client = new Client({ online: true })
     
     client.on(EventType.MessageCreate, async (event) => {
          if (event.message.isMe) return
          
          //console.log(event)
          if (event.message.content == ".nya"){
               const msg = await event.message.reply("nya.", false)
               setTimeout(function() {msg.unsend()}, 5000);
          }
     
     })
     
     client.on(EventType.Ready, (event) => {
          console.log(`Logged as @${event.me.username}`)
     })
     
     client.once(EventType.Disconnect, (msg) => {
          main()
     })
     
     client.login(auth)
}

main()