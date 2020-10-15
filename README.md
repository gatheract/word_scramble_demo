# word_scramble_demo
A GatherAct demo app that shows the basics of real-time collaborative programming

![App Example](https://raw.githubusercontent.com/gatheract/word_scramble_demo/master/screenshot.gif)

# How to use this demo
1. Clone this repo
2. Give the app a unique ID for sandbox testing by editing `gatheract.js`. It can be literally anything you feel is unique enough.
```diff
let config = {
    // This should be a unique ID for your app.
    // For development purposes we can set it to anything.
-   appId: '<ENTER_UNIQUE_APP_NAME_HERE>',
+   appId: 'joes_test_app_1322',
    events: {
```
3. Open index.html in your web browser on your local computer. No web server needed.
4. Open index.html in another web browser window