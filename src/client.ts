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
      const url = this.stringifyUrl(message.method, message.path)
      const callback = this.urlMap.get(url)
      callback && callback(message.data)
    })
  }

  get(path: string) {
    return new Promise(resolve => {
      const message: Message = {
        port: this.port,
        method: 'get',
        path
      }
      const url = this.stringifyUrl('get', path)
      this.urlMap.set(url, resolve)
      this.vscode.postMessage(message)
    })
  }

  post(path: string, data: any) {
    return new Promise(resolve => {
      const message: Message = {
        port: this.port,
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
