import Document, { Html, Head, Main, NextScript } from "next/document"
import { AppRegistry } from "react-native"

// Force Next.js to use the same registry that react-native-web uses
AppRegistry.registerComponent("Main", () => Main)

class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    AppRegistry.registerComponent("Main", () => Main)
    const { getStyleElement } = AppRegistry.getApplication("Main")
    const page = await renderPage()
    const styles = [getStyleElement()]
    return { ...page, styles }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
