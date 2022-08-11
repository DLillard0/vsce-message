export interface Message {
  type: 'vsce-message'
  id: number,
  port: number,
  method: 'get' | 'post',
  path: string,
  data?: any
}

class Base {
  constructor(type: 'server' | 'client', port: number) {
    this.type = type
    this.port = port
  }

  type: 'server' | 'client'
  port: number

  protected stringifyUrl(method: string, path: string, port?: number) {
    const _port = port || this.port
    return this.type + ':' + _port + '/' + method + '/' + path
  }
  protected stringifyIDUrl(id: number, method: string, path: string, port?: number) {
    const _port = port || this.port
    return this.type + ':' + _port + '/' + method + '/' + path + id
  }
}

export default Base
