import type { IApi } from '@winner-fed/winjs';
import { codeInspectorPlugin } from 'code-inspector-plugin';

export default (api: IApi) => {
  api.describe({
    key: 'codeInspector',
    config: {
      schema({ zod }) {
        return zod
          .object({
            editor: zod
              .enum([
                'code',
                'cursor',
                'webstorm',
                'appcode',
                'atom',
                'atom-beta',
                'brackets',
                'code-insiders',
                'codium',
                'colin',
                'emacs',
                'goland',
                'hbuilder',
                'idea',
                'notepad',
                'phpstorm',
                'pycharm',
                'rider',
                'rubymine',
                'sublime',
                'vim',
                'zed',
              ])
              .describe(
                '指定要打开的IDE编辑器。插件会自动识别系统运行的IDE，当同时运行多个IDE时可通过此配置指定。code对应VSCode，cursor对应Cursor编辑器。',
              )
              .optional(),
            hotKeys: zod
              .array(zod.enum(['ctrlKey', 'altKey', 'metaKey', 'shiftKey']))
              .describe(
                '触发源码定位的快捷键组合。默认为 ["altKey", "shiftKey"]。Mac中ctrlKey对应control键，altKey对应option键，metaKey对应command键。设置为空数组则关闭快捷键功能。',
              )
              .default(['altKey', 'shiftKey'])
              .optional(),
            showSwitch: zod
              .boolean()
              .describe(
                '是否在页面显示开关按钮来控制源码定位功能。移动端开发时推荐开启此选项，因为快捷键在移动端不方便使用。',
              )
              .default(false)
              .optional(),
            autoToggle: zod
              .boolean()
              .describe(
                '配合showSwitch使用。触发跳转IDE后自动关闭开关，防止切回页面时误触发定位功能。',
              )
              .default(true)
              .optional(),
            dev: zod
              .boolean()
              .describe(
                '手动指定是否为开发环境。插件默认自动判断，但某些情况下（如老版本webpack）可能判断失败，可通过此配置强制启用。',
              )
              .optional(),
            enforcePre: zod
              .boolean()
              .describe(
                '是否添加 enforce: "pre" 配置。vue-cli项目若有eslint-loader冲突时需设为false，让插件编译逻辑在eslint校验之后执行。',
              )
              .default(true)
              .optional(),
            ip: zod
              .union([zod.boolean(), zod.string()])
              .describe(
                '向node server发送请求的方式。false使用localhost，true自动检测本机IP，字符串则使用指定地址。',
              )
              .optional(),
            port: zod
              .number()
              .int()
              .min(1024)
              .max(65535)
              .describe(
                '插件server启动的端口号。默认从5678端口开始寻找可用端口。',
              )
              .default(5678)
              .optional(),
            hideConsole: zod
              .boolean()
              .describe('是否隐藏浏览器控制台中打印的快捷键提示信息。')
              .default(false)
              .optional(),
            hideDomPathAttr: zod
              .boolean()
              .describe(
                '是否在浏览器控制台中隐藏DOM元素上的data-insp-path属性。',
              )
              .default(false)
              .optional(),
            include: zod
              .array(zod.string())
              .describe(
                '需要参与编译的文件匹配规则。用于monorepo架构中让node_modules内的本地包也能进行代码定位。',
              )
              .optional(),
            exclude: zod
              .array(zod.string())
              .describe(
                '排除不参与编译的文件匹配规则。默认排除node_modules，配置后为默认值与此配置的并集。',
              )
              .optional(),
            escapeTags: zod
              .array(zod.string())
              .describe(
                '指定的HTML标签不会注入data-insp-path属性，点击时不触发源码定位。',
              )
              .optional(),
            openIn: zod
              .enum(['reuse', 'new', 'auto'])
              .describe(
                '使用VSCode或Cursor时打开IDE窗口的方式。reuse复用当前窗口，new打开新窗口，auto自动选择。推荐在IDE设置中配置。',
              )
              .default('auto')
              .optional(),
            pathType: zod
              .enum(['absolute', 'relative'])
              .describe(
                'data-insp-path属性的路径类型。默认使用相对路径，微前端场景下多项目不在同一仓库时需使用绝对路径。',
              )
              .default('relative')
              .optional(),
            printServer: zod
              .boolean()
              .describe('是否在控制台打印server启动信息。')
              .default(false)
              .optional(),
            cache: zod
              .boolean()
              .describe(
                '仅对webpack/rspack且缓存类型为filesystem的项目生效。防止页面与IDE通信时端口号不一致导致通信失败。建议同时固定port配置。',
              )
              .default(false)
              .optional(),
            behavior: zod
              .object({
                locate: zod
                  .boolean()
                  .describe('是否启用点击跳转IDE定位代码功能。')
                  .default(true)
                  .optional(),
                copy: zod
                  .union([zod.boolean(), zod.string()])
                  .describe(
                    '是否启用点击复制源码位置信息。true等同于"{file}:{line}:{column}"格式，可自定义字符串模板。',
                  )
                  .default(true)
                  .optional(),
                target: zod
                  .string()
                  .describe(
                    '点击元素时跳转的URL模板。可使用{file}、{line}、{column}占位符。',
                  )
                  .optional(),
              })
              .describe('定义点击元素时的行为配置。')
              .optional(),
            skipSnippets: zod
              .array(zod.enum(['console', 'htmlScript']))
              .describe(
                '跳过注入的代码片段。console为console.error/warn片段，htmlScript为html中的script标签。nextjs/nuxt项目不建议跳过console，MPA项目不建议跳过htmlScript。',
              )
              .optional(),
          })
          .describe(
            '代码检查器插件配置。基于code-inspector-plugin实现，在开发环境中点击页面元素快速定位到源码文件。支持多种IDE编辑器，通过快捷键+点击实现浏览器到编辑器的快速跳转。详细文档：https://inspector.fe-dev.cn',
          )
          .optional()
          .default({});
      },
    },
    enableBy: api.EnableBy.config,
  });
  const { codeInspector = {} } = api.userConfig;

  // only dev running
  if (['dev'].includes(api.name)) {
    api.modifyViteConfig((config) => {
      config.plugins?.push(
        codeInspectorPlugin({
          bundler: 'vite',
          ...codeInspector,
        }),
      );

      return config;
    });

    api.modifyWebpackConfig((memo) => {
      memo.plugins?.push(
        codeInspectorPlugin({
          bundler: 'webpack',
          ...codeInspector,
        }),
      );

      return memo;
    });

    api.modifyRspackConfig((memo) => {
      memo.plugins?.push(
        codeInspectorPlugin({
          bundler: 'rspack',
          ...codeInspector,
        }),
      );

      return memo;
    });
  }
};
