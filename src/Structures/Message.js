
class Message {
     constructor(client, message) {
          this.client = client
          this.user = message.user
          this.id = message.messageID
          this.threadID = message.threadID
          this.content = message.body
     }
     
     get isMe() {
          return this.client.me.id === this.user.id
     }
     
     async reply(message, reply=true) {
          const msg = await this.client.api.sendMessage(message, this.threadID, null, reply ? this.id : null)
          
          const obj = await this.client.api.getMessage(msg.threadID, msg.messageID);
          return new Message(this.client, {
               user: this.user,
               ...obj
          })
     }
     
     async send(message, id, options= {
          reply: false
     }) {
          const msg = await this.client.api.sendMessage(message, id, null, options.reply ? this.id : null)
          
          const obj = await this.client.api.getMessage(msg.threadID, msg.messageID);
          return new Message(this.client, {
               user: this.user,
               ...obj
          })
     }
     
     async unsend() {
          await this.client.api.unsendMessage(this.id)
          return this
     }
}

module.exports = Message