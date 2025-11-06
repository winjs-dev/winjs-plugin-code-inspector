# @winner-fed/plugin-code-inspector

WinJS 代码检查器插件，基于 [code-inspector-plugin](https://github.com/zh-lx/code-inspector) 封装，在开发环境中提供点击页面元素快速定位到源码文件的功能。

<p>
  <a href="https://npmjs.com/package/@winner-fed/plugin-code-inspector">
   <img src="https://img.shields.io/npm/v/@winner-fed/plugin-code-inspector?style=flat-square&colorA=564341&colorB=EDED91" alt="npm version" />
  </a>
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="license" />
  <a href="https://npmcharts.com/compare/@winner-fed/plugin-code-inspector?minimal=true"><img src="https://img.shields.io/npm/dm/@winner-fed/plugin-code-inspector.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="downloads" /></a>
</p>

## 功能特性

- 🎯 点击页面元素快速定位到源码文件
- 🔧 支持 22+ 种主流 IDE（VSCode、Cursor、WebStorm 等）
- ⌨️ 可自定义快捷键组合
- 📱 支持移动端调试（开关按钮模式）
- 🚀 支持 Vite、Webpack、Rspack 等打包工具
- 🎨 仅在开发环境生效，零侵入生产代码

## 安装

```bash
npm add @winner-fed/plugin-code-inspector -D
# or
pnpm add @winner-fed/plugin-code-inspector -D
```

## 使用

在 `.winrc.ts` 中添加插件配置：

```ts
// .winrc.ts
export default {
  plugins: ['@winner-fed/plugin-code-inspector'],
  codeInspector: {
    // 默认配置已足够使用，以下为可选配置
  }
};
```

启动开发服务器后，按住 `Alt + Shift` 组合键（Mac 为 `Option + Shift`），然后点击页面元素，即可在 IDE 中打开对应的源码文件。

## 配置选项

### editor

指定要打开的 IDE 编辑器。

- Type: `'code' | 'cursor' | 'webstorm' | 'phpstorm' | 'idea' | ...`
- Default: 自动识别
- 说明：插件会自动识别系统运行的 IDE，当同时运行多个 IDE 时可通过此配置指定

```ts
export default {
  plugins: ['@winner-fed/plugin-code-inspector'],
  codeInspector: {
    editor: 'cursor' // 指定使用 Cursor 编辑器
  }
};
```

### hotKeys

触发源码定位的快捷键组合。

- Type: `Array<'ctrlKey' | 'altKey' | 'metaKey' | 'shiftKey'>`
- Default: `['altKey', 'shiftKey']`
- 说明：设置为空数组则关闭快捷键功能

```ts
export default {
  plugins: ['@winner-fed/plugin-code-inspector'],
  codeInspector: {
    hotKeys: ['metaKey', 'shiftKey'] // Mac: Cmd + Shift，Windows: Win + Shift
  }
};
```

### showSwitch

是否在页面显示开关按钮来控制源码定位功能。

- Type: `boolean`
- Default: `false`
- 说明：移动端开发时推荐开启此选项

```ts
export default {
  plugins: ['@winner-fed/plugin-code-inspector'],
  codeInspector: {
    showSwitch: true
  }
};
```

### behavior

定义点击元素时的行为配置。

- Type: `{ locate?: boolean; copy?: boolean | string; target?: string }`
- Default: `{ locate: true, copy: true }`

```ts
export default {
  plugins: ['@winner-fed/plugin-code-inspector'],
  codeInspector: {
    behavior: {
      locate: true, // 是否跳转 IDE
      copy: '{file}:{line}:{column}', // 复制源码位置信息
      target: 'https://github.com/your-repo/blob/main/{file}#L{line}' // 自定义跳转 URL
    }
  }
};
```

### 更多配置

插件支持更多配置项，包括：

- `autoToggle` - 触发跳转后自动关闭开关
- `dev` - 手动指定开发环境
- `enforcePre` - 控制编译顺序
- `ip` - 服务器通信地址
- `port` - 服务器端口号
- `hideConsole` - 隐藏控制台提示
- `hideDomPathAttr` - 隐藏 DOM 属性
- `include` / `exclude` - 文件过滤规则
- `escapeTags` - 跳过的 HTML 标签
- `openIn` - IDE 窗口打开方式
- `pathType` - 路径类型（相对/绝对）
- `printServer` - 打印服务器信息
- `cache` - 缓存控制
- `skipSnippets` - 跳过代码片段注入

完整配置文档请参考：[code-inspector-plugin 官方文档](https://inspector.fe-dev.cn)

## 支持的 IDE

code、cursor、webstorm、appcode、atom、atom-beta、brackets、code-insiders、codium、colin、emacs、goland、hbuilder、idea、notepad、phpstorm、pycharm、rider、rubymine、sublime、vim、zed

## License

[MIT](./LICENSE)
