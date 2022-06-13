import { ManifestType } from '@src/manifest-type';
import packageJson from '../package.json';

const manifest: ManifestType = {
  manifest_version: 3,
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  options_page: 'src/pages/options/index.html',
  permissions: ['tabs'],
  background: { service_worker: 'src/pages/background/index.js' },
  action: {
    default_popup: 'src/pages/popup/index.html',
    default_icon: 'fake-64.png'
  },
  icons: {
    64: 'fake-64.png'
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*', '<all_urls>'],
      js: ['src/pages/content/index.js'],
      css: ['contentStyle.css']
    }
  ],
  devtools_page: 'src/pages/devtools/index.html',
  web_accessible_resources: [
    {
      resources: ['contentStyle.css', 'fake-64.png'],
      matches: []
    }
  ]
};

export default manifest;
