import { BrowserRouter} from "react-router-dom";
import Initial_Route from "./AppRouteing/Initial_Route";

function App() {
  return (
    <>
      <BrowserRouter>
        <Initial_Route/>
      </BrowserRouter>
    </>
  );
}

export default App;
