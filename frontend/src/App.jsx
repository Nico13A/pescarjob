import { AutenticacionProvider } from "./contexts/AutenticacionContext";
import { AppRouter } from "./router/AppRouter";
import { Toaster } from "sonner";

function App() {
  return (
    <AutenticacionProvider>
      <Toaster richColors closeButton position="top-right" />
      <AppRouter />
    </AutenticacionProvider>
  );
}

export default App;



