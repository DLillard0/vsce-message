export interface Message {
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

  protected stringifyUrl(method: string, path: string) {
    return this.type + ':' + this.port + '/' + method + '/' + path
  }
}

export default Base
