import * as vscode from 'vscode'
import Base, { Message } from './base'

interface GetCallback {
  (send: (data: any) => void) : void
}
interface PostCallback {
  (data: any, send: (data: any) => void) : void
}

class Server extends Base {
  constructor(panel: vscode.WebviewPanel, port: number) {
    super('server', port)

    this.panel = panel
    this.disposable = panel.webview.onDidReceiveMessage(this.handleMessage)
  }
  panel: vscode.WebviewPanel
  disposable: vscode.Disposable

  urlMap: Map<string, GetCallback | PostCallback> = new Map()

  private handleMessage = (message: Message) => {
    const { method, path, data, port } = message
    const url = this.stringifyUrl(method, path, port)
    const callback = this.urlMap.get(url)
    if (callback) {
      method === 'get'
        ? (callback as GetCallback)(this.getSend(method, path))
        : callback(data, this.getSend(method, path))
    }
  }

  private getSend(method: string, path: string) {
    return (data: any) => {
      this.panel.webview.postMessage({
        type: 'vsce-message',
        port: this.port,
        method,
        path,
        data
      })
    }
  }

  get(path: string, callback: GetCallback) {
    const url = this.stringifyUrl('get', path)
    this.urlMap.set(url, callback)
  }

  post(path: string, callback: PostCallback) {
    const url = this.stringifyUrl('post', path)
    this.urlMap.set(url, callback)
  }

  dispose() {
    this.disposable.dispose()
  }
}

export default Server
