const User = require("./User")


class Me extends User {
     constructor(client, user, id) {
          super(client, user, id)
     }
}

module.exports = Me