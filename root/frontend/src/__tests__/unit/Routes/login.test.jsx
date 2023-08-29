import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import Login from "../../../Routes/Login";

// Mocking axios requests
jest.mock("axios");

describe("Login Component", () => {
  it("renders the login form", () => {
    render(<Login />);

    const usernameInput = screen.getByPlaceholderText("Username...");
    const passwordInput = screen.getByPlaceholderText("Password...");
    const submitButton = screen.getByText("Login");

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    const mockNavigate = jest.fn();
    jest.spyOn(React, "useNavigate").mockReturnValue(mockNavigate);

    axios.post.mockResolvedValue({ data: {} });

    render(<Login />);

    const usernameInput = screen.getByPlaceholderText("Username...");
    const passwordInput = screen.getByPlaceholderText("Password...");
    const submitButton = screen.getByText("Login");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(submitButton);

    expect(submitButton).toHaveTextContent("Login");

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("/api/login", {
        u_name: "testuser",
        password: "testpassword",
      });
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("displays form error message", async () => {
    axios.post.mockRejectedValue({
      response: { data: { error: "Invalid credentials" } },
    });

    render(<Login />);

    const usernameInput = screen.getByPlaceholderText("Username...");
    const passwordInput = screen.getByPlaceholderText("Password...");
    const submitButton = screen.getByText("Login");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorElement = screen.getByText("Invalid credentials");
      expect(errorElement).toBeInTheDocument();
    });
  });
});
