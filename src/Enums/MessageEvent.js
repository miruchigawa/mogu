const Utils = require("../Utils")

module.exports = Utils.enumBuilder({
     presence: "Presence",
     typ: "Typing",
     message: "MessageCreate",
     message_reply: "MessageReply",
     read_receipt: "MessageRead"
})