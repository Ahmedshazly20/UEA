import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./store/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import reportWebVitals from "./reportWebVitals";
import "react-datepicker/dist/react-datepicker.css";
import "./assets/css/mdi/css/materialdesignicons.min.css";
import "./assets/css/bundle.base.css";
import "./assets/css/style.css";
import "./index.css";
import "./assets/js/bundle.base.js"
import {ErrorBoundaryProps, ErrorBoundaryState} from "./models";


const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({children}) => {
    const [errorState, setErrorState] = useState<ErrorBoundaryState>({
        hasError: false,
        //error: null,
    });
    useEffect(() => {
        const errorHandler = (
            error: Event | string,
            url?: string,
            line?: number,
            col?: number,
            errorObj?: Error | null
        ) => {
            setErrorState({hasError: true});//errorObj != undefined ? errorObj :
            console.log('p_1', new Date());
            console.error(error, errorObj);
            //return true;
        };
        return () => {
            window.onerror = null;
        };
    }, []);
    useEffect(() => {
        if (errorState.hasError) {
            console.log('p_2', new Date());
        }
    }, [errorState.hasError])


    const componentDidCatch = (error: Error, errorInfo: React.ErrorInfo) => {
        console.log('p_3', new Date());
        setErrorState({hasError: true});
        // You can also log the error to an error reporting service
        // or perform any other custom error handling logic here
        // console.log('p_2', 'componentDidCatch')
        // console.error(error, errorInfo);
    };
    return (<>
        {errorState.hasError === true && <h2>Something went wrong.</h2>}
        {errorState.hasError === false && <>{children}</>}
    </>)
};

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});


root.render(

  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <React.StrictMode>
          <ErrorBoundary>
        <App />
      </ErrorBoundary>
      </React.StrictMode>
    </Provider>
  </QueryClientProvider>

);

// ReactDOM.render(
//   <Provider store={store}>
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   </Provider>,
//   document.getElementById("root")
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
