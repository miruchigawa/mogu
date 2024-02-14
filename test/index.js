"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const cookies_json_1 = __importDefault(require("./cookies.json"));
function main() {
    const client = new src_1.Client({ online: true });
    client.on(src_1.EventType.MessageCreate, (event) => __awaiter(this, void 0, void 0, function* () {
        if (event.message.isMe)
            return;
        //console.log(event)
        if (event.message.content == ".nya") {
            const msg = yield event.message.reply("nya.", false);
            event.user.dm("nya.");
            setTimeout(function () { msg.unsend(); }, 5000);
        }
    }));
    client.on(src_1.EventType.Ready, (event) => {
        console.log(`Logged as @${event.me.username}`);
    });
    client.once(src_1.EventType.Disconnect, (msg) => {
        main();
    });
    client.login(cookies_json_1.default);
}
main();
