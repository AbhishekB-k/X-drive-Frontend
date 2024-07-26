import { Provider } from "react-redux";
import appStore from "./store/appStore";
import AppRouter from "./Router/Router";


const App = () => {
    return (
        <Provider store={appStore}>
            <AppRouter />
        </Provider>
    );
};

export default App;
