import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-vue'],
  manifest: {
    name: "__MSG_extensionName__",
    description: "__MSG_extensionDescription__",
    default_locale: 'en',
    permissions: ['storage', 'bookmarks', 'notifications'],
    host_permissions: ["https://*.github.com/", "https://*.githubusercontent.com/"],
    optional_host_permissions: [
      "*://*/*",
    ]
  }
});
