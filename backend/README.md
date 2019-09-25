## Linking a Tuya Device

1. Add any devices you want to use with `tuyapi` to the Tuya Smart app.

2. Install the CLI tool by running `npm i @tuyapi/cli -g`. If it returns an error, you may need to prefix the command with `sudo`. (Tip: using `sudo` to install global packages is not considered best practice. See [this NPM article](https://docs.npmjs.com/getting-started/fixing-npm-permissions) for some help.)

3. Install AnyProxy by running `npm i anyproxy -g`.  Then run `anyproxy-ca`.

4. Run `tuya-cli list-app`.  It will print out a QR code; scan it with your phone and install the root certificate.  After installation, [trust the installed root certificate](https://support.apple.com/en-nz/HT204477).

5. [Configure the proxy](http://www.iphonehacks.com/2017/02/how-to-configure-use-proxy-iphone-ipad.html) on your phone with the parameters provided in the console.

6. Enable full trust of certificate by going to Settings > General > About > Certificate Trust Settings

7. Open Tuya Smart and refresh the list of devices by "pulling down".

8. A list of ID and key pairs should appear in the console.

9. It's recommended to untrust the root certificate after you're done for security purposes.

# Adonis fullstack application

This is the fullstack boilerplate for AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Session
3. Authentication
4. Web security middleware
5. CORS
6. Edge template engine
7. Lucid ORM
8. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```
