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

export type IErrorMessage = {
     type: 'disconnect' | 'close'
     error: string
}

export interface ClientEvents {
     ready: [client: Client<true>]
     error: [error: IErrorMessage | Error]
     disconnect: [error: string]
     typing: void
     message: [message: IOnMessageCreate]
     reply: void
     read: void
}

export class Client<Ready extends boolean = boolean> {
     constructor(options?: ClientOptions)
     public options: ClientOptions
     public me: If<Ready, Me>
     private api?: any
     private events: Events
     public async login(auth: IAuth[], force?: boolean): Promise<Me>
     public once<K extends keyof ClientEvents>(eventName: K, listener: (...args: ClientEvents[K]) => any): this
     public on<K extends keyof ClientEvents>(eventName: K, listener: (...args: ClientEvents[K]) => any): this
     public on(eventName: string | symbol, listener: (...args: any[]) => void): this
     public get nya(): void
}

export class Message {
     constructor(client: Client, event: any)
     public user: User
     public id: string
     public threadID: string
     public content: string
     public get isMe(): boolean
     public async reply(message: any, reply: boolean): Promise<Message>
     public async send(message: any, options?: IOptionMessage): Promise<Message>
     public async unsend(): Promise<this>
}

export class User {
     constructor(client: Client, user: any)
     public client: Client
     public id: string
     public username: string
     public isFriend: boolean
     public isBrithday: boolean
     public gender: number
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