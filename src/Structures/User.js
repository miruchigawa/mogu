

class User {
     constructor(client, user, id) {
          this.client = client
          this.id = id
          this.username = user.name
          this.isFriend = user.isFriend
          this.isBrithday = user.isBrithday
          this.gender = user.gender
          this.url = user.profileUrl
     }
}

module.exports = User