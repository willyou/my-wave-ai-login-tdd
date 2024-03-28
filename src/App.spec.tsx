import { screen, render } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });
  it("should render App", () => {
    const app = screen.getByTestId("login-app");
    expect(app).toBeInTheDocument();
  });

  it("should render company logo", () => {
    const image = document.querySelector(".company-logo");
    expect(image).toBeInTheDocument();
  });
});
