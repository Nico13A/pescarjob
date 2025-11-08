import { AutenticacionProvider } from "./contexts/AutenticacionContext";
import { AppRouter } from "./router/AppRouter";

function App() {
  return (
    <AutenticacionProvider>
      <AppRouter />
    </AutenticacionProvider>
  );
}

export default App;



