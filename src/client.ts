import Base, { Message } from './base'

class Client extends Base {
  constructor(vscode: any, port: number) {
    super('client', port)

    this.vscode = vscode
    this.handleMessage()
  }

  vscode: any
  urlMap: Map<string, (data: any) => void> = new Map()

  private handleMessage() {
    window.addEventListener('message', event => {
      const message: Message = event.data
      const url = this.stringifyUrl(message.method, message.path, message.port)
      const callback = this.urlMap.get(url)
      callback && callback(message.data)
    })
  }

  get(path: string, port?: number) {
    const _port = port || this.port
    return new Promise(resolve => {
      const message: Message = {
        port: _port,
        method: 'get',
        path
      }
      const url = this.stringifyUrl('get', path)
      this.urlMap.set(url, resolve)
      this.vscode.postMessage(message)
    })
  }

  post(path: string, data: any, port?: number) {
    const _port = port || this.port
    return new Promise(resolve => {
      const message: Message = {
        port: _port,
        method: 'post',
        path,
        data
      }
      const url = this.stringifyUrl('post', path)
      this.urlMap.set(url, resolve)
      this.vscode.postMessage(message)
    })
  }
}

export default Client
