import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserMenu from "./UserMenu";
import Image from "next/image";
import config from "../config";

interface AuthState {
  isAuthenticated: boolean;
  username?: string;
}

const Header = () => {
  const router = useRouter();
  const [auth, setAuth] = useState<AuthState>({ isAuthenticated: false });

  useEffect(() => {
    // Check if user is authenticated
    const authData = localStorage.getItem(config.TOKEN_STORAGE_KEY);
    if (authData) {
      setAuth({
        isAuthenticated: true,
        username: JSON.parse(authData).name ?? "User",
      }); // You can get actual username from API if needed
    }
  }, []);

  const isPublicPage = [
    "/",
    "/login",
  ].includes(router.pathname);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary landing-header-top-nav">
      {auth.isAuthenticated ? (
        <div className="container-fluid ht-full-area">
          <Link href="/" className="navbar-brand">
            <Image
              src="/images/logo.svg"
              width={auth.isAuthenticated ? 154 : 203}
              height={auth.isAuthenticated ? 36 : 47}
              alt="logo"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse container navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className="navbar-nav logged-menu-area">
              <li className="nav-item">
                <Link
                  href="/dashboard"
                  className={`cs-link ${
                    router.pathname === "/dashboard" ? "active" : ""
                  }`}
                >
                  <Image
                    src="/images/home-icon.svg"
                    width={17.05}
                    height={18.37}
                    alt="icon"
                  />{" "}
                  Home
                </Link>
              </li>
            

              <li className="nav-item border-top mt-4 mb-2 logged-user-area mobile-usermenu">
                {auth.isAuthenticated ? (
                  <UserMenu username={auth.username} />
                ) : (
                  <></>
                )}
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center logged-user-area mobile-usermenu-hide">
            {auth.isAuthenticated ? (
              <UserMenu username={auth.username} />
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <div className="container">
          <Link href="/" className="navbar-brand">
            <Image
              src="/images/logo.svg"
              width={auth.isAuthenticated ? 154 : 203}
              height={auth.isAuthenticated ? 36 : 47}
              alt="logo"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  href="/"
                  className={`nav-link ${
                    router.pathname === "/home" ? "active" : ""
                  }`}
                >
                  Home
                </Link>
              </li>
             
              
              <li className="nav-item">
                {auth.isAuthenticated ? (
                  <UserMenu username={auth.username} />
                ) : (
                  <Link
                    href="/"
                    className={`nav-link ${
                      router.pathname === "/" ? "active" : ""
                    }`}
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
