import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import reduxStore from "./redux/store";
import Main from "./components/Main";


function App() {
    return (
        <div>
            <BrowserRouter>
                <Main />
            </BrowserRouter>
        </div>
    );
}

export default App;
