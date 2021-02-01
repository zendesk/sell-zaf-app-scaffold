# Zendesk App Framework(ZAF) React Skeleton for Sell Apps

The package allows you to bootstrap a React-based application, that's integrated with Zendesk App Framework(ZAF), and enables you to quickly get started with developing apps for Zendesk Sell.

Note: The docs are based on [Zendesk Developer Guide](https://developer.zendesk.com/apps/docs/zendesk-apps/resources). They contain only selected and hopefully the most necessary information in terms of creating an app integrated with Zendesk Sell. If you struggle with something or there's not enough information here, please visit the actual documentation.

# File requirements

The following folder structure and files must be included in an app to install the app successfully in a Zendesk product:

```
assets/
  logo.png
  logo-small.png
translations/
  en.json
manifest.json
```

The following are brief descriptions of the required files:

- manifest.json - Describes and configures the app. See [Manifest reference](https://developer.zendesk.com/apps/docs/developer-guide/manifest).
- translations/en.json - A standard English translation file. See [Internationalization](https://developer.zendesk.com/apps/docs/developer-guide/deploying#internationalization).
- assets/logo-small.png (128x128px) - Small icon displayed in the header of the app. See [App icons](https://developer.zendesk.com/apps/docs/publish/create_assets) for the image specifications.
- assets/logo.png (320x320px) - Large icon displayed in the Zendesk admin pages for managing apps. See [App icons](https://developer.zendesk.com/apps/docs/publish/create_assets) for the image specifications.

Example HubSpot for Sell app manifest:

```json
{
  "name": "Hubspot",
  "author": {
    "name": "Zendesk",
    "email": "support@zendesk.com",
    "url": "https://www.zendesk.com"
  },

  "defaultLocale": "en",
  "private": false,
  "singleInstall": true,

  "location": {
    "sell": {
      "lead_card": {
        "url": "assets/index.html"
      },
      "person_card": {
        "url": "assets/index.html"
      },
      "company_card": {
        "url": "assets/index.html"
      }
    }
  },

  "version": "2.0.3",
  "frameworkVersion": "2.0",

  "parameters": [
    {
      "name": "access_token",
      "type": "oauth"
    }
  ],

  "oauth": {
    "client_id": "{Client ID}",
    "client_secret": "{Client Secret}",
    "authorize_uri": "https://app.hubspot.com/oauth/authorize",
    "access_token_uri": "https://api.hubapi.com/oauth/v1/token",
    "scope": "contacts content oauth"
  }
}
```

# Setting the app location

You must declare where you want your app to appear in each product interface with the `location` property in manifest.json. The locations are where iframes can appear in the product.
You can specify one or more locations in one or more Zendesk products. By default your app will be available in Zendesk Sell on all object cards (Lead, Contact, Deal) in the panel on the right side.

```json
"location": {
  "sell": {
    "lead_card": {
      "url": "assets/index.html"
    },
    "person_card": {
      "url": "assets/index.html"
    },
    "company_card": {
      "url": "assets/index.html"
    },
    "deal_card": {
      "url": "assets/index.html"
    }
  }
}
```

For available locations, see [Sell Apps API](https://developer.zendesk.com/apps/docs/apps-sell-api/introduction).
To find out more about setting the app location visit [Setting the app location](https://developer.zendesk.com/apps/docs/developer-guide/setup#setting-the-app-location) section in the developer guide.

# Security and Authentication

When an app makes AJAX requests, the settings for the request can be viewed in the browser console. Some settings may contain sensitive information such as an API key or token.
A recommended way to prevent this behaviour is to use `OAuth Authentication`. The other option can be using `Secure Settings`. Choose whatever option suits you best.

## OAuth Authentication

You can use OAuth2 to authenticate all your API requests to external service. OAuth provides a secure way for your application to access your account data without requiring sensitive information
like usernames and passwords to be sent with the requests. To use OAuth authentication, you need to register your application with 3rd party service to generate OAuth credentials for your app.
You also need to add some functionality to your application to implement an OAuth authorization flow.

### Registering the app with 3rd party service

When registering an app, you'll be presented with a screen showing the settings for your new app including the app name, the description, and other app information that you should fill in.
In addition, you'll also find the Auth settings for your app such as the client ID, client secret, redirect URL, as well as the scopes used by your app.
You'll need these items when initiating an OAuth connection between your app and 3rd party service.

- `Client ID` - This ID is unique to your app and is used for initiating OAuth.
- `Client secret` - Used to establish and refresh OAuth authentication.
- `Redirect URL` - Users will be redirected to this location after granting access to your app.
  Use one of the following urls:
  - https://zis.zendesk.com/api/services/zis/connections/oauth/callback (on production)
  - https://zis.zendesk-staging.com/api/services/zis/connections/oauth/callback (on staging)
- `Scope` - Optional security measure. Scope determines what data your app has permission to access.
- `OAuth URL` - A user will need this URL to connect your app. The URL is being constructed based on your app's client credentials, redirect URL, and scopes configuration.

Use the `Client ID` and the `Client secret` in your application as described in this following section.

### Implementing an OAuth in the app

Once you've registered your app you have to define OAuth settings in `manifest.json` file.
Update `client_id` and `client_secret` with yours.

```json
"oauth": {
  "client_id": "{Client ID}",
  "client_secret": "{Client Secret}",
  "authorize_uri": "https://app.hubspot.com/oauth/authorize",
  "access_token_uri": "https://api.hubapi.com/oauth/v1/token",
  "scope": "contacts content oauth"
}
```

You also need to add a parameter of type "oauth" to the parameters list:
```json
"parameters": [
  {
    "name": "access_token",
    "type": "oauth"
  }
]
```

For more information visit the [docs](https://developer.zendesk.com/apps/docs/developer-guide/using_sdk#using-oauth)

### OAuth access token

In your app code, use the placeholder `{{setting.access_token}}` and a `secure: true` property to make an OAuth request.

```javascript
var settings = {
  url: 'https://www.example.com/api/user',
  headers: {"Authorization": "Bearer {{setting.access_token}}"},
  secure: true,
  type: 'GET'
};
var client = ZAFClient.init();
client.request(settings).then(...);
```

### Request Format

This is a JSON-only API. You must supply a `Content-Type: application/json` header on PUT and POST requests.
You must set an `Accept: application/json` header on all requests.

```javascript
var settings = {
  url: 'https://www.example.com/api/user',
  dataType: 'json',
  contentType: 'application/json',
  ...
};
```

## Secure settings

Secure settings are another way to make settings inaccessible to agents when making AJAX requests. The setting values are inserted only in the outbound request server-side at the proxy layer.
See [Using secure settings](https://developer.zendesk.com/apps/docs/developer-guide/using_sdk#using-secure-settings) to set them up.

# Using Zendesk Garden

While you can use any custom CSS or front-end framework for the look and feel of your app, Zendesk recommends using Zendesk Garden.
Zendesk Garden is designed to be a common baseline of styles and components between all Zendesk products. To make your app to match
the Zendesk look and feel, Zendesk Garden is used in the app as a default.

Example:

```css
.YourElement {
  color: var(--zd-color-green-600);
  padding: var(--zd-spacing-sm);
}
```

For more information about the CSS classes and React components in Zendesk Garden, see [garden.zendesk.com](https://garden.zendesk.com/).

# ZAF Client

The ZAF client lets your app in the iframe communicate with the host Zendesk product.
You can use the client in your apps to listen for events, invoke actions, and access properties in each location.
See [ZAF Client API](https://developer.zendesk.com/apps/docs/core-api/client_api) guide.

Example:

```javascript
const client = ZAFClient.init()
client.get('contact.email').then(function(data) {
  console.log(data) // { "contact.email": "mark@designservices.com" }
})
```

# @zendesk/sell-zaf-app-toolbox

@zendesk/sell-zaf-app-toolbox package delivers a bunch of useful methods, hooks and components that help you build React apps integrated with Zendesk Sell quicker and with less effort. They use Zendesk's App Framework Client under the hood. To find out more visit the [repository](https://github.com/zendesk/sell-zaf-app-toolbox).

## Testing an app locally

1. Use your command-line interface navigate to the folder containing the app you want to test.

2. Install dependencies if necessary:

   ```bash
   npm install
   ```

3. Start your app with the following command:

   ```bash
   npm start
   ```

4. Open a new window in your terminal and start the server:

   ```
   npm run server
   ```

5. In a browser, navigate to the product page where you specified the app to appear (eq. deal/lead/contact card) and append `?zcli_apps=true` to the URL. Example:

   https://app.futuresimple.com/crm/contacts/1234?zcli_apps=true

6. In your browser's Address bar, click the shield icon on the right (Chrome) or lock icon on the left (Firefox) and agree to load an unsafe script (Chrome) or to disable protection (Firefox).

   Note: Safari has no option to disable protection.

## Running linter

In order to lint and automatically fix some errors run:

```bash
npm run lint
```

## Running prettier

In order to format your code:

```bash
npm run prettier
```

## Building zip

Build a package with minified sources:

```bash
npm run build
```

The command creates a new .zip file in `dist/tmp`. Now your app is ready to be installed as a private app in your Zendesk Sell!

## Installing a private app in Zendesk Sell

1. Go to your Zendesk Sell settings.
2. Find the `Integrations` section and then select the `Apps` tab.
3. Click the `Upload private app` button.
4. Give your app a name and upload the latest .zip file from `dist/tmp` in your local app project.
5. Install the app.

## Testing an app with OAuth or secure settings locally

If your app uses OAuth or secure settings, you can keep testing it locally after installing it remotely.

1. Install the app as a private app in Zendesk Sell. See [Installing a private app in Zendesk Sell](#installing-a-private-app-in-zendesk-sell)
2. Navigate to the app's root folder and create a file named `zcli.apps.config.json`
3. Paste the content below (note: you can also modify `plan` and `paramters` keys).

```json
{
    "plan": "silver",
    "app_id": YOUR_APP_ID,
    "parameters": {}
}
```

   To find app installation id, sign in to your Zendesk Sell instance as an admin and open the following page in the same browser, replacing `your_subdomain` with your own:

   https://your_subdomain.zendesk.com/api/sell/apps/installations.json (on production)

   Locate your installed app and note its `id` value, not its `app_id` value.

3. Test the app normally with the local server. See [Testing an app locally](#testing-an-app-locally).
