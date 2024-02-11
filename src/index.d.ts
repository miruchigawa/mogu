import NodeCache from "node-cache"

export type If<T extends boolean, A, B = null> = T extends true ? A : T extends false ? B : A | B

export type ClientOptions = {
     listenEvents?: boolean
     autoMarkRead?: boolean
     online?: boolean
     selfListen?: boolean
}

export type IAuth = {
     key: string
     value: string
     domain: string
     path: string
     hostOnly: boolean
     creation: string
     lastAccessed: string
}

export type IOptionMessage = {
     reply?: boolean
}

export type IOnMessageCreate = {
     user: User,
     message: Message
}

export type IMessageContent = string

export interface ClientEvents {
     ready: [client: Client<true>]
     error: [error: Error]
     disconnect: [error: string]
     typing: void
     message: [message: IOnMessageCreate]
     reply: void
     read: void
}

export class Client<Ready extends boolean = boolean> {
     constructor(options?: ClientOptions)
     public options: ClientOptions
     
     /**
      * User cache
      * @type { NodeCache }
      */
      public users: NodeCache
     
     /**
      * Client information
      * @type { If<Ready, Me> }
      */
     public me: If<Ready, Me>
     
     /**
      * Api messenger connection
      * @type { any }
      */
     private api?: any
     
     /**
      * Events handler
      * @type { Events }
      */
     private events: Events
     
     /**
      * Start connection to messenger api
      * @param { IAuth[] } auth - Auth session file
      * @param { boolean } [force] - Force login
      * @returns { Promise<Me> }
      */
     public async login(auth: IAuth[], force?: boolean): Promise<Me>
     public once<K extends keyof ClientEvents>(eventName: K, listener: (...args: ClientEvents[K]) => any): this
     public on<K extends keyof ClientEvents>(eventName: K, listener: (...args: ClientEvents[K]) => any): this
     public on(eventName: string | symbol, listener: (...args: any[]) => void): this
     
     /**
      * Say nya.
      * @returns { void }
      */
     public get nya(): void
}

export class Message {
     constructor(client: Client, event: any)
     
     public client: Client
     
     /**
      * Sender information
      * @type { User }
      */
     public user: User
     
     /**
      * Message id
      * @type { string }
      */
     public id: string
     
     /**
      * threadID
      * @type { string }
      */
     public threadID: string
     
     /**
      * Message text content
      * @type { string }
      */
     public content: string
     
     /**
      * Get it is chat from me
      * @returns {boolean}
      */
     public get isMe(): boolean
     
     /**
      * Reply or send message (shortcut)
      * @param {any} message - Message content
      * @param {boolean} [reply] - Reply?
      * @returns {Promise<Message>}
      */
     public async reply(message: IMessageContent, reply?: boolean): Promise<Message>
     
     /**
      * Send message to
      * @param {any} message - Message content
      * @param {string} threadID - destination room id
      * @param {IOptionMessage} [options] - Addional options
      * @returns {Promise<Message>}
      */
     public async send(message: IMessageContent, threadID: string, options?: IOptionMessage): Promise<Message>
     
     /**
      * Unsend message
      * @returns {Promise<this>}
      */
     public async unsend(): Promise<this>
}

export class User {
     constructor(client: Client, user: any)
     public client: Client
     
     /**
      * User id
      * @type { string }
      */
     public id: string
     
     /**
      * Username 
      * @type { string }
      */
     public username: string
     
     /**
      * Is user friend
      * @type { boolean }
      */
     public isFriend: boolean
     
     /**
      * Is user brithday
      * @type { boolean }
      */
     public isBrithday: boolean
     
     /**
      * User gender ( only 2 lol )
      * @type { number }
      */
     public gender: number
     
     /**
      * User link to profile
      * @type { string }
      */
     public url: string
}

export class Me extends User {
     constructor(client: Client, user: any)
}

export enum EventType {
     Ready = "ready",
     Error = "error",
     Typing = "typing",
     Disconnect = "disconnect",
     MessageCreate = "message",
     MessageReply = "reply",
     MessageRead = "read"
}