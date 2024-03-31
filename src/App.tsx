import { useState } from "react";

import "./App.css";
import { SignUpForm } from "./components/SignUpForm";
import { LoginAPI } from "./apis/LoginAPI";
import { AuthData } from "./types";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="flex-container">
      <div className="company-logo" data-testid="login-app">
        <a href="https://mywave.ai" target="_blank">
          <img
            src={
              "https://mywave.ai/wp-content/uploads/2022/10/mywave-logo-white.svg"
            }
            className="company-logo"
            alt="Company logo"
          />
        </a>
      </div>
      {!isLoggedIn ? (
        <SignUpForm
          onSubmit={async (inputs: AuthData) => {
            setLoading(true);
            const data = await LoginAPI.login(inputs);
            if (data.success) {
              setIsLoggedIn(true);
            }
            setLoading(false);
          }}
          loading={loading}
        />
      ) : (
        <span>Welcome to MyWAVE.AI</span>
      )}
    </div>
  );
}

export default App;
