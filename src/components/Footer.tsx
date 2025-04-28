import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  return (
    <footer className="footer">
      <div className="container-fluid ft-full-area">
        <div className="footer-content">
          <div className="copyright">
            &copy; All rights reserved MediArchive PLC.2025
          </div>
          <div className="footer-links">
            
          </div>
          <div className="social-links">
            <a href="#" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
