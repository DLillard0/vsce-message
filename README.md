# Vsce Message

一个 Vscode 插件开发的工具库，让你能够使用类似前端 http 通信的语法与 webview 进行通信

## 基本用法

### 1. webview 有使用 webpack 打包

```javascript
// vscode extension

import { Server } from 'vsce-message'

const panel = vscode.window.createWebviewPanel()
const server80 = new Server(panel, 80)
server80.get('get-path', (send) => {
  send('extension 返回的 Get 数据')
})
server80.post('post-path', (data, send) => {
  console.log(data) // 'webview post 数据'
  send('extension 返回的 Post 数据')
})

// webview

import { Client } from 'vsce-message'

const vscode = acquireVsCodeApi()
const client80 = new Client(vscode, 80)
client80.get('get-path').then(res => {
  console.log(res) // 'extension 返回的 Get 数据'
})
client80.post('psot-path', 'webview post 数据').then(res => {
  console.log(res) // 'extension 返回的 Post 数据'
})
```

### 2. webview 未使用 webpack 打包
可通过加载 js 文件，会将 Client 构造函数挂载在 Window 对象上

```javascript
// vscode extension

import { Server } from 'vsce-message'

const panel = vscode.window.createWebviewPanel()
const server80 = new Server(panel, 80)
server80.get('get-path', (send) => {
  send('extension 返回的 Get 数据')
})
server80.post('post-path', (data, send) => {
  console.log(data) // 'webview post 数据'
  send('extension 返回的 Post 数据')
})
```

```html
<!-- webview -->

<script src="https://unpkg.com/vsce-message/dist/client.js"></script>

<script>
const vscode = acquireVsCodeApi()
const client80 = new window.Client(vscode, 80)
client80.get('get-path').then(res => {
  console.log(res) // 'extension 返回的 Get 数据'
})
client80.post('psot-path', 'webview post 数据').then(res => {
  console.log(res) // 'extension 返回的 Post 数据'
})
</script>
```

