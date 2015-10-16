---
version: v0.34.0
category: Tutorial
title: 'Mac App Store Submission Guide'
source_url: 'https://github.com/atom/electron/blob/master/docs/tutorial/mac-app-store-submission-guide.md'
---

# Mac App Store Submission Guide

Since v0.34.0, Electron allows submitting packaged apps to Mac App Store (MAS),
this guide provides information on how to submit your app, and the limitations
of the MAS build.

## How to submit your app

Following steps introduces a simple way submit your app to Mac App Store, but
it doesn't make sure your app gets approved by Apple, you still have to read
apple's [Submitting Your App][submitting-your-app] guide on how to meet Mac
App Store's requirements.

### Get certificate

To submit your app to Mac App Store, you have to get a certificate from Apple
first, you can follow existing guides on web:

* "First steps" of [Mac App Store (MAS) Submission Guideline][nwjs-guide]
* "Step 2" of [Distributing an app on Mac OS X without Xcode][dist-no-xcode]

### Sign your app

After getting the certificate, you can package your app by following
[Application Distribution](http://electron.atom.io/docs/v0.34.0/tutorial/application-distribution), and then sign your app.
The step is basically the same with other programs, the key is to sign every
dependency of Electron one by one.

First you need to prepare two entitlements files.

`child.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
    <key>com.apple.security.inherit</key>
    <true/>
  </dict>
</plist>
```

`parent.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
  </dict>
</plist>
```

And then sign your app with following script:

```bash
#!/bin/bash

# Name of your app.
APP="YourApp"
# The path of you app to sign.
APP_PATH="/path/to/YouApp.app"
# The path to the location you want to put the signed package.
RESULT_PATH="~/Desktop/$APP.pkg"
# The name of certificates you requested.
APP_KEY="3rd Party Mac Developer Application: Company Name (APPIDENTITY)"
INSTALLER_KEY="3rd Party Mac Developer Installer: Company Name (APPIDENTITY)"

FRAMEWORKS_PATH="$APP_PATH/Contents/Frameworks"

codesign --deep -fs "$APP_KEY" --entitlements child.plist "$FRAMEWORKS_PATH/$APP Framework.framework/Libraries/libnode.dylib"
codesign --deep -fs "$APP_KEY" --entitlements child.plist "$FRAMEWORKS_PATH/$APP Framework.framework/$APP Framework"
codesign --deep -fs "$APP_KEY" --entitlements child.plist "$FRAMEWORKS_PATH/$APP Framework.framework/"
codesign --deep -fs "$APP_KEY" --entitlements child.plist "$FRAMEWORKS_PATH/$APP Helper.app/"
codesign --deep -fs "$APP_KEY" --entitlements child.plist "$FRAMEWORKS_PATH/$APP Helper EH.app/"
codesign --deep -fs "$APP_KEY" --entitlements child.plist "$FRAMEWORKS_PATH/$APP Helper NP.app/"
codesign  -fs "$APP_KEY" --entitlements parent.plist "$APP_PATH"
productbuild --component "$APP_PATH" /Applications --sign "$INSTALLER_KEY" "$APP_PATH"
```

If you are new to app sandboxing of OS X, you should also go through Apple's
[Enabling App Sandbox][enable-app-sandbox] to have a basic idea, and add keys
for the permissions needed by your app to the entitlements files.

### Upload your app and submit for review

After signing your app you can use Application Loader to upload it to iTunes
Connect for processing, make sure you have [created a record][create-record]
before uploading. Then you can [submit your app for review][submit-for-review].

## Limitations of MAS build

In order to satisfy requirements for app sandboxing, following modules have been
disabled in MAS build:

* `crash-reporter`
* `auto-updater`

and following behaviors have been changed:

* Video capture may not work for some machines.
* Certain accessibility features may not work.
* Apps will not be aware of DNS changes.

Also due to the usage of app sandboxing, the resources can be accessed by the
app is strictly limited, you can read [App Sandboxing][app-sandboxing] for more.

[submitting-your-app]: https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html
[nwjs-guide]: https://github.com/nwjs/nw.js/wiki/Mac-App-Store-%28MAS%29-Submission-Guideline#first-steps
[dist-no-xcode]: https://devreboot.wordpress.com/2014/07/04/distributing-an-app-on-mac-os-x-without-xcode-outside-the-mac-app-store/
[enable-app-sandbox]: https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html
[create-record]: https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/CreatingiTunesConnectRecord.html
[submit-for-review]: https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/SubmittingTheApp.html
[app-sandboxing]: https://developer.apple.com/app-sandboxing/
