<div align="center">
<img src="https://github.com/miruchigawa/mogu/blob/main/assets/icon.png" width="100px" alt="icon.png" />
<h1>Mogu | simple messenger api (non-official) </h1>
</div>

> **Warning**
> This is not an official API and is not affiliated by Meta. We are not responsible for the misuse of this library.

## Example
Before that, install the module first with `yarn add @hanaworks/mogu` or `npm i @hanaworks/mogu` if you are using npm.

``` ts
import { Client, EventType } from "@hanaworks/mogu"
import auth from "./cookies.json"

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

client.on(EventType.Disconnected, (error) => {
     console.error(error)
})

client.login(auth)
```

schema auth file

```json
[
     {
          key: string
          value: string
          domain: string
          path: string
          hostOnly: boolean
          creation: string
          lastAccessed: string
     }
     ...
]
```

- *Note:* Use [c3c-fbstate](https://github.com/c3cbot/c3c-fbstate) to get auth file.

## Documentation
[See here.](https://miruchigawa.github.io/mogu/)