import react from '@vitejs/plugin-react-swc';
import { readFileSync } from 'fs';
import { readdir, readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { defineConfig, PluginOption, UserConfig } from 'vite';

const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'))

const __ISPROD_ = process.env.NODE_ENV === 'production';

const nameFiles = [ 'bookmarks' ];

/**
 * Asynchronously loads environment-specific data from JSON files.
 * It uses filenames to construct object keys, appending the data 
 * based on the current environment (development or production).
 *
 * @returns {Promise<Object>} An object containing loaded data with keys formatted as `__FILENAME__`.
 */
async function loadEnvironmentData(): Promise<object> {
  const promises = nameFiles.map(async (fileName) => ({
    [ `__${fileName.toUpperCase()}__` ]: __ISPROD_
      ? '""'
      : JSON.stringify(await readFile(`.data/${fileName}.json`, 'utf-8'))
  }));
  return Object.assign({}, ...await Promise.all(promises));
}

const generateManifestChrome = (): PluginOption => {
  return {
    name: 'manifest-generator',
    async closeBundle() {
      const files = await readdir('dist/assets')
      const service_worker = files.find(file => file.startsWith('serviceWorker')) as string
      const injectModalName = files.find(file => file.startsWith('injectModal')) as string

      const manifest: chrome.runtime.ManifestV3 = {
        name: packageJson.name,
        manifest_version: 3,
        description: packageJson.description,
        version: packageJson.version,
        action: {
          default_title: packageJson.name,
        },
        // icons: {
        //   16: 'icon_extension_16.png',
        //   32: 'icon_extension_32.png',
        //   48: 'icon_extension_48.png',
        //   128: 'icon_extension_128.png',
        // },
        permissions: [ 'scripting', 'tabs', 'activeTab', 'topSites', 'storage', 'bookmarks', 'favicon', 'alarms', 'notifications', 'tabGroups' ],
        web_accessible_resources: [ {
          matches: [ '<all_urls>' ],
          resources: [ '*', `assets/${injectModalName}`, ...files.map(file => `assets/${file}`) ],
        } ],
        background: {
          service_worker: `assets/${service_worker}`,
          type: 'module',
        },
        commands: {
          'toggle-modal': {
            description: 'Toggle Modal',
            suggested_key: {
              default: 'Ctrl+Shift+U',
              mac: 'Command+Shift+U',
            },
          }
        }
      }

      const injectModalContent = await readFile(`dist/assets/${injectModalName}`, 'utf-8');
      const edited = injectModalContent.split(';').map(line => {
        if (line.startsWith("import") && line.endsWith('"')) {
          const indexFrom = line.indexOf('from');
          const importStatement = line.substring(6, indexFrom);
          const newImportStatement = importStatement.replace(/as/g, ':');
          const path = line.substring(indexFrom + 5, line.length - 1);
          const fileName = path.split('/').pop();
          const newImport = `const ${newImportStatement} = await import(chrome.runtime.getURL('assets/${fileName}'));`;
          return newImport;
        }
        return line;
      }).join('\n');
      await writeFile(`dist/assets/${injectModalName}`, `(async()=>{${edited}})()`, 'utf-8');
      await writeFile('dist/manifest.json', JSON.stringify(manifest), 'utf-8')
    },
  }
}

const handlerConfig = async (): Promise<UserConfig> => ({
  plugins: [ react(), generateManifestChrome() ],
  define: {
    __VERSION__: JSON.stringify(packageJson.version),
    __ISPROD_,
    isDev: !__ISPROD_,
    ...(await loadEnvironmentData()),
  },
  resolve: {
    alias:
    {
      "@nested": resolve(__dirname, "nested"),
      '@app': resolve(__dirname, 'src'),
      '@public': resolve(__dirname, 'public')
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        injectModal: resolve(__dirname, 'nested/content_scripts/injectModal.tsx'),
        serviceWorker: resolve(__dirname, 'nested/service_worker/service_worker.ts'),
      },
    },
  },
});
// https://vitejs.dev/config/
export default defineConfig(handlerConfig);
