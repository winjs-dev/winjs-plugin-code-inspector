import { defineConfig } from 'win';

export default defineConfig({
  plugins: ['../src'],
  codeInspector: {
    editor: 'code',
    hotKeys: ['shiftKey', 'metaKey'],
    showSwitch: true,
    autoToggle: true,
    ip: '127.0.0.1',
    port: 3050
  },
});
