import { ThemeProvider } from "styled-components"
import { Button } from "./Components/Button/Button";
import { defaultTheme } from "./themes/default";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme} > 
      <Button variant="primary" />
      <Button variant="secondary"/>
    </ThemeProvider>
  )
}

