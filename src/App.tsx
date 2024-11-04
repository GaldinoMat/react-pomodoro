import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import GlobalStyle from "./styles/global";
import Router from "./components/Router/Router";
import { BrowserRouter } from "react-router-dom";
import CycleContextProvider from "./contexts/CycleContexts";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CycleContextProvider>
          <Router />
        </CycleContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
