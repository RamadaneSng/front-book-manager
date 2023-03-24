import "../styles/index.scss";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

import { Provider } from "react-redux";
import store from "../app/store";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <ModalsProvider>
          <Notifications />
          <Component {...pageProps} />
        </ModalsProvider>
      </MantineProvider>
    </Provider>
  );
}
