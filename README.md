## Front Setup

* [Download the installer](https://nodejs.org/) for Node.js 8 or greater.
* Install the ionic CLI globally: `npm install -g ionic`
* Clone this repository: `git clone https://github.com/Lesowaya/Test-Maurox.git`.
* Run `npm install` from the `/app` folder.
* Run `ionic serve` in a terminal from the project root.

## Building

NOTE: Android requires the correct Gradle definition to be setup:

### Adding platforms

```
ionic cordova platform add ios
ionic cordova platform add android
```

```
ionic cordova build ios
ionic cordova build android
```

## Back Setup

*Install MongoDB and create database
*Run MongoDB
* Run `npm install` from the `/server` folder.
* Create certificates for https.
* Run `node app.js` in a terminal from the project root.