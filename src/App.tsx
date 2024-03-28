import { useState } from "react";

import "./App.css";
import { LoginForm } from "./components/LoginForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <>
      <div data-testid="login-app">
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
        <LoginForm
          onSubmit={(inputs: any) => {
            Promise.resolve().then(() => {
              setIsLoggedIn(true);
            });
          }}
        />
      ) : (
        <span>Welcome to MyWAVE.AI</span>
      )}
    </>
  );
}

export default App;
