const Utils = require("../Utils")

module.exports = Utils.enumBuilder({
     Ready: "ready",
     Error: "error",
     Typing: "typing",
     MessageCreate: "message",
     MessageReply: "reply",
     MessageRead: "read"
})