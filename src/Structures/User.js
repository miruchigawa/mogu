const Message = require("./Message")

class User {
     constructor(client, user, id) {
          this.user = user
          this.client = client
          this.id = id
          this.username = user.name
          this.isFriend = user.isFriend
          this.isBrithday = user.isBrithday
          this.gender = user.gender
          this.url = user.profileUrl
     }
     
     async dm(message) {
          const msg = await this.client.api.sendMessage(message, this.id, null)
          const obj = await this.client.api.getMessage(msg.threadID, msg.messageID);
          const user = new User(this.client, this.user, this.id)
          
          return new Message(this.client, {
               user,
               ...obj
          })
     }
}

module.exports = User