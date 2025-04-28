import { useRouter } from 'next/router';
import Image from "next/image";
import config from '../config';

interface UserMenuProps {
  username?: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ username = 'User' }) => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear auth tokens
    localStorage.removeItem(config.TOKEN_STORAGE_KEY);
    router.push('/');
  };
  let baseUrl = '';
  if (typeof window !== 'undefined') {
    baseUrl = `${window.location.protocol}//${window.location.host}`;
  }
  return (
    <div className="dropdown">
      <button
        className="btn dropdown-toggle d-flex align-items-center pe-0"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span className="me-2">
          Welcome 
          {/* {username} */}
        </span>
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <button className="dropdown-item" onClick={handleLogout}>
            {/* <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> */}
            <Image 
             src={`${baseUrl}/images/logout-icon.svg`} 
          
              alt="icon"
              width={22}
              height={24}
            />
            Log out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
