import "expo-env";
import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "InFlow",
  slug: "app--mobile-inflow",
  version: "1.0.0",
  orientation: "portrait",
  icon: "",
  scheme: "inflow",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,

  ios: {
    supportsTablet: true,
  },

  android: {
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "",
      backgroundImage: "",
      monochromeImage: "",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: "com.evapp.inflow",
  },

  web: {
    output: "static",
    favicon: "",
  },

  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
        dark: {
          backgroundColor: "#000000",
        },
      },
    ],
  ],

  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },

  extra: {
    firebaseApiKey: process.env.FIREBASE_API_KEY,
    firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
    firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    firebaseMessagingSenderId: process.env.FIREBASE_SENDER_ID,
    firebaseAppId: process.env.FIREBASE_APP_ID,

    router: {},
    eas: {
      projectId: "cb4beb76-8d19-4a28-b1ea-de07e67be3c7",
    },
  },
});
