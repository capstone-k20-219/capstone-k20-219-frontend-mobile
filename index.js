// This is the first file that ReactNative will run when it starts up.
// If you use Expo (`yarn expo:start`), the entry point is ./App.js instead.
// Both do essentially the same thing.

import App from "./app/app.tsx"
import React from "react"
import { AppRegistry } from "react-native"
// import RNBootSplash from "react-native-bootsplash"
import SplashScreen from "react-native-splash-screen"

function IgniteApp() {
  return <App hideSplashScreen={SplashScreen.hide} />
}

AppRegistry.registerComponent("CapstoneProjectK20219FrontendMobile", () => IgniteApp)
export default App
