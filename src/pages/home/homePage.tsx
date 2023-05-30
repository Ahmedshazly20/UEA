import { FC, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoginForm } from "../../components/authentication/loginForm";
import logo from "../../assets/images/logo.svg";
import secureLocalStorage from "react-secure-storage";
import { SystemConfiguration } from "../../configuration/config";
import { SecureLocalStorageGet, SecureLocalStorageSet } from "../../utils";
import { DailyTransactionTypeEnum } from "../../models";
export const HomePage: FC<{}> = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  function refreshPage() {
    window.location.reload();
    navigate("/");
  }
  useEffect(() => {
    if (
      SecureLocalStorageGet(SystemConfiguration.keys.homePageReloaded) == "0"
    ) {
      SecureLocalStorageSet(SystemConfiguration.keys.homePageReloaded, "1");
      window.location.reload();
    }
  }, []);
  return (
    <div className="auth mx-auto row g-0">
      <div className="col-md-5">
        <div className="auth-form-light text-left p-4">
          <div className="brand-logo">
            <img src={logo} />
          </div>
          <h4>Let's get started</h4>
          <h6 className="font-weight-light">Sign in to continue</h6>
          <LoginForm />
        </div>
      </div>
      <div className="col-md-7 alyusr-description">
        <div>
          <span>Alyusr System</span> To provide excellent services to customers
          and the preservation of the environment and public health and the
          development of building regulations and investment in human resources.
        </div>
      </div>
    </div>
  );
};
