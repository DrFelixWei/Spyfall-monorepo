import { io, Socket } from 'socket.io-client'
import { SocketState } from './SocketState'
import { Listener } from './types'
import { ClientEvents } from './ClientEvents'
import { ServerEvents } from './ServerEvents'
import { ServerExceptionResponse } from './SocketExceptions'
import { SetterOrUpdater } from 'recoil'

type EmitOptions<T> = {
  event: ClientEvents
  data?: T
}

const backendURL = import.meta.env.VITE_BACKEND_URL;

export default class SocketManager {


  public readonly socket: Socket

  public setSocketState!: SetterOrUpdater<SocketState>

  private connectionLost: boolean = false

  constructor() {
    this.socket = io(backendURL, {
      autoConnect: false,
      path: '/wsapi',
      transports: ['websocket'],
      withCredentials: true,
    })

    this.onConnect()
    this.onDisconnect()
    this.onException()
  }

  emit<T>(options: EmitOptions<T>): this {
    this.socket.emit(options.event, options.data)
    return this
  }

  getSocketId(): string | null {
    if (!this.socket.connected) {
      return null
    }
    return this.socket.id ?? null
  }

  connect(): void {
    console.log('connecting')
    this.socket.connect()
  }

  disconnect(): void {
    this.socket.disconnect()
  }

  registerListener<T>(event: ServerEvents, listener: Listener<T>): this {
    this.socket.on(event, listener)
    return this
  }

  removeListener<T>(event: ServerEvents, listener: Listener<T>): this {
    this.socket.off(event, listener)
    return this
  }

  private onConnect(): void {
    this.socket.on('connect', () => {
      console.log('connected')
      if (this.connectionLost) {
        this.showNotification('Reconnected to server!', 'green', 2000)
        this.connectionLost = false
      }
    })
  }

  private onDisconnect(): void {
    this.socket.on('disconnect', async (reason: Socket.DisconnectReason) => {
      console.log('disconnected', reason)
      if (reason === 'io client disconnect') {
        this.showNotification('Disconnected successfully!', 'green', 2000)
      }

      if (reason === 'io server disconnect') {
        this.showNotification('You got disconnected by the server', 'orange', 3000)
      }

      if (reason === 'ping timeout' || reason === 'transport close' || reason === 'transport error') {
        this.showNotification('Connection lost to the server', 'orange', 3000)
        this.connectionLost = true
      }

      this.setSocketState((currVal) => {
        return { ...currVal, connected: false }
      })
    })
  }

  private onException(): void {
    this.socket.on('exception', (data: ServerExceptionResponse) => {
      if (typeof data.exception === 'undefined') {
        this.showNotification('Unexpected error from server', 'red')
        return
      }

      let body = `Error: ${data.exception}`

      if (data.message) {
        if (typeof data.message === 'string') {
          body += ` | Message: "${data.message}"`
        } else if (typeof data.message === 'object') {
          body += ` | Message: "${JSON.stringify(data.message)}"`
        }
      }

      if (data?.message === "Lobby not found") {
        window.history.pushState({}, '', '/');
      }

      this.showNotification(body, 'red')
    })
  }

  private showNotification(message: string, color: string, duration: number = 5000): void {
    console.log(message) 
  }
}
