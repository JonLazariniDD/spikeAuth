import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicAuth, IonicAuthOptions } from '@ionic-enterprise/auth';

import {environment as ENV} from '../../environments/environment'


// https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-protocols-oidc
const ionicAuthOptions: IonicAuthOptions = {
  authConfig: 'azure',
  platform: 'web',
  discoveryUrl: `https://login.microsoftonline.com/${ENV.TENANT_ID}/v2.0/.well-known/openid-configuration?appid=${ENV.CLIENT_ID}`,
  redirectUri: 'http://localhost:8100/',
  scope: 'openid',
  clientID: `${ENV.CLIENT_ID}`,
  logoutUrl: 'http://localhost:8100/',
  tokenStorageProvider: 'localStorage',
  logLevel: 'DEBUG'
}
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  private ionicAuth: IonicAuth
  constructor(public navCtrl: NavController) {
  }
  ngOnInit(): void {
    this.initialiseAuth()
  }

  public initialiseAuth = (): any => {
    this.ionicAuth = new IonicAuth(ionicAuthOptions)
    return this
  }

  async login(): Promise<void> {
    try {
      await this.ionicAuth.login()
      const accessToken = await this.ionicAuth.getAccessToken()
      console.log('accessToken')
      console.log(accessToken)
    } catch (e) {
      console.error(e)
    }
  }

}
