import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import config from "../config";
import { saveAuthTokens } from "../utils/auth";
import { api } from "../services/api";

interface LoginFormProps {
  onSuccess?: () => void;
}

interface AuthTokens {
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

interface UserData {
  id: number;
  name: string;
  email: string;
}

interface LoginResponse {
  status: string;
  message: string;
  data: UserData;
  access_token: string;
  refresh_token: string;
}

const saveUserAuth = (tokens: AuthTokens) => {
  localStorage.setItem(config.TOKEN_STORAGE_KEY, JSON.stringify(tokens));
};

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const errors = {
      username: "",
      password: "",
    };

    // Validate mobile number (username)
    const mobileRegex = /^01[3-9][0-9]{8}$/; // Bangladesh mobile number format
    if (!formData.username) {
      errors.username = "Mobile number is required";
      isValid = false;
    } else if (!mobileRegex.test(formData.username)) {
      errors.username =
        "Please enter a valid Bangladesh mobile number (e.g., 01712345678)";
      isValid = false;
    }

    // Validate password
    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
    // Clear error when user starts typing
    setFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
    // Clear general error message
    setError(null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    console.log("Form data:", formData);

    try {
      // Create form data
      const postData = new URLSearchParams();
      postData.append("username", formData.username);
      postData.append("password", formData.password);

      const response = await api.post<LoginResponse>(
        config.API_ENDPOINTS.LOGIN,
        postData,
        { requiresAuth: false }
      );

      console.log("Login response:", response);

      if (response.status === "success" && response.data) {
        console.log("Login response userData:", response.data);

        saveAuthTokens({
          name: response.data.name ?? "",
          email: response.data.email ?? "",
          accessToken: response.access_token,
          refreshToken: response.refresh_token,
        });

        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        setError(response.message || "Login failed");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.status === 401) {
        setError("Invalid mobile number or password");
      } else {
        setError(error.message || "Failed to login. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-card">
      <h2>LOGIN</h2>
      <form onSubmit={onSubmit} className="login-form" noValidate>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="mb-2rem">
          <input
            type="tel"
            className={`form-control ${
              formErrors.username ? "is-invalid" : ""
            }`}
            id="username"
            name="username"
            placeholder="Mobile Number"
            value={formData.username}
            onChange={handleChange}
            autoComplete="username"
            required
          />
          {formErrors.username && (
            <div className="invalid-feedback">{formErrors.username}</div>
          )}
        </div>
        <div className="mb-3 mt-2">
          <input
            type="password"
            className={`form-control ${
              formErrors.password ? "is-invalid" : ""
            }`}
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
          {formErrors.password && (
            <div className="invalid-feedback">{formErrors.password}</div>
          )}
        </div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="remember-area">
            <label className="remember-me">
              <input type="checkbox" name="remember" />
              <span>Remember me</span>
            </label>
            <Link href="#" className="text-decoration-none">
              Forgot your password?
            </Link>
          </div>
          <button
            type="submit"
            className="btn btn-primary login-btn-custom"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              </>
            ) : (
              "LOGIN"
            )}
          </button>
        </div>
        <div className="login-divider">
          <span>Or</span>
        </div>
        <div className="register-link-group">
          <Link href="" className="register-link">
            Register Now
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
