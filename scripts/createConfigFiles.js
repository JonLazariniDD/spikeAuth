require('dotenv').config()

const fs = require('fs').promises
const { argv } = require('yargs')

const  {appName} = argv

const {env:
  {IONIC_HUB_ORG_ID, IONIC_HUB_PRODUCT_KEY, IONIC_HUB_APP_ID, IONIC_HUB_KEY_ID, CLIENT_ID, TENANT_ID}
} = process


const ionicConfigFile = `{
  "name": "${appName}",
  "integrations": {
    "cordova": {},
    "enterprise": {
      "keyId": ${IONIC_HUB_KEY_ID},
      "productKey": "${IONIC_HUB_PRODUCT_KEY}",
      "appId": "${IONIC_HUB_APP_ID}",
      "orgId": "${IONIC_HUB_ORG_ID}",
      "registries": [
        "@ionic-enterprise;https://registry.ionicframework.com/"
      ]
    }
  },
  "type": "ionic-angular"
}`

const environmentFile = `export const environment = {
  CLIENT_ID: '${CLIENT_ID}',
  TENANT_ID: '${TENANT_ID}'
}`

const createFile = async () => {
 try {
   await fs.writeFile('./ionic.config.json', ionicConfigFile, 'utf-8')
   await fs.writeFile('./src/environments/environment.ts', environmentFile, 'utf-8')
 } catch (e) {
   throw e
 }
}

createFile()
  .then(console.log('Finished writing config file\(s\)!'))
