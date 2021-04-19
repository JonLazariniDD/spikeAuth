import { Component, OnInit } from "@angular/core";
import { NavController, Platform } from "ionic-angular";
import { IonicAuth, IonicAuthOptions } from "@ionic-enterprise/auth";

import { environment as ENV } from "../../environments/environment";

// Refreshing token
// get new token -> write it to storage -> read/retrieve token from storage

/** 0. getAuthenticationToken(): Promise<IDToken<string>>
 *
 * a- hasValidToken()
 * b- not valid token ? expireTokens() : getIdToken() (from storage)
 *
 */

/**
 * 1. hasValidToken(): Promise<bool>  - refresh token if required
 *
 * a- ionicAuth.isAuthenticated?
 * b- refreshTokenIfExpired() - see method 2.
 * c- ionicAuth.getIdToken - get current decoded id token
 * d- return token.exp && new Date(token.exp * 1000) > new Date();
 */

/**
 * 2. refreshTokenIfExpired(): Promise<void>
 *
 * a- ionicAuth.getIdToken() - get current decoded id token
 * b- hasTokenExpired ? - see method 3. check if the token is expired before calling refreshSession
 * c- ionicAuth.refreshSession()
 */

/**
 * 3. hasTokenExpired(t): boolean {
 *
 * a- return t.exp && new Date(t.exp * 1000) < new Date();
 */

// https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-protocols-oidc
// const azureWebOptions: IonicAuthOptions = {
//   clientID: `${ENV.CLIENT_ID}`,
//   logoutUrl: "http://localhost:8100/",
//   authConfig: "azure",
//   platform: "web",
//   discoveryUrl: `https://login.microsoftonline.com/${ENV.TENANT_ID}/v2.0/.well-known/openid-configuration?appid=${ENV.CLIENT_ID}`,
//   redirectUri: "http://localhost:8100/",
//   scope: "openid offline_access profile email",
//   tokenStorageProvider: "localStorage",
//   logLevel: "DEBUG",
//   webAuthFlow: "PKCE",
// };

const azureNativeOptions: IonicAuthOptions = {
  clientID: `${ENV.CLIENT_ID}`,
  logoutUrl: "https://uk.gov.dvsa.cvsmobile",
  authConfig: "azure",
  platform: "cordova",
  discoveryUrl: `https://login.microsoftonline.com/${ENV.TENANT_ID}/v2.0/.well-known/openid-configuration?appid=${ENV.CLIENT_ID}`,
  redirectUri: "https://uk.gov.dvsa.cvsmobile",
  scope: "openid offline_access profile email",
  tokenStorageProvider: "localStorage",
  logLevel: "DEBUG",
};
@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage implements OnInit {
  private ionicAuth: IonicAuth;
  constructor(public navCtrl: NavController, platform: Platform) {
    const isCordova = platform.is("cordova");
    console.log({ isCordova });
  }
  ngOnInit(): void {
    this.initialiseAuth();
    // @ts-ignore
    window._ionicAuth = this.ionicAuth;
  }

  public initialiseAuth = (): any => {
    this.ionicAuth = new IonicAuth(azureNativeOptions);
    return this;
  };

  sendStuff() {
    console.log("window");
    //@ts-ignore
    console.log(window.gtag);
    //@ts-ignore
    window.gtag("event", "mobile_test_generated_app", {
      event_category: "category",
      event_label: "some label",
    });
  }

  async login(): Promise<void> {
    try {
      await this.ionicAuth.login();
      // const { id_token } = await this.ionicAuth.getAuthResponse();
      // console.log({ id_token });
      const decodedToken = await this.ionicAuth.getIdToken();
      console.log({ decodedToken });
    } catch (e) {
      console.error(e);
    }
  }
}
