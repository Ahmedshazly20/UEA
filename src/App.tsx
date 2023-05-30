import React, {useEffect, useState} from "react";
import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { RoutesComponent } from "./routes/route/RoutesComponent";
import { IThemeState } from "./models/languages/iLanguageTypes";
import "./App.css";
import {AppConfiguration, ErrorBoundaryProps, ErrorBoundaryState} from "./models";
import useFetchAppConfiguration from "./hooks/useFetchAppConfiguration";


function useErrorBoundary(): boolean {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = () => setHasError(true);
    window.addEventListener('error', errorHandler);
    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  return hasError;
}

const ErrorBoundary1: React.FC<any> = ({ children }) => {
  const hasError = useErrorBoundary();

  if (hasError) {
    // Render an error fallback component
    return <div>Something went wrong.</div>;
  }

  return <>{children}</>;
};



function App() {
  const theme: IThemeState = useSelector((state: any) => state.theme);
  const { data } = useFetchAppConfiguration();
  const [config, setConfig] = useState<AppConfiguration | null>(data);
  if (config != null) {
    return (
        //<ErrorBoundary >
      <div dir={theme.isRtl ? "rtl" : "ltr"}>
        <BrowserRouter>
          <RoutesComponent />
        </BrowserRouter>
      </div>
        //</ErrorBoundary>
    );
  }
  return null;
}

export default App;
