import config from '../config';
import jwt from 'jsonwebtoken';

interface AuthTokens {
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

interface JwtPayload {
  exp: number;
  iat: number;
  [key: string]: any;
}

export const getStoredAuth = (): AuthTokens | null => {
  const authData = localStorage.getItem(config.TOKEN_STORAGE_KEY);
  return authData ? JSON.parse(authData) : null;
};

export const saveAuthTokens = (tokens: AuthTokens) => {
  localStorage.setItem(config.TOKEN_STORAGE_KEY, JSON.stringify(tokens));
};

export const refreshAccessToken = async (): Promise<AuthTokens | null> => {
  try {
    const authData = getStoredAuth();
    if (!authData?.refreshToken) {
      return null;
    }

    // Create form data
    const formData = new URLSearchParams();
    formData.append('refresh_token', authData.refreshToken);

    // Call refresh token API
    const response = await fetch(`${config.API_BASE_URL}${config.API_ENDPOINTS.REFRESH_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();

    console.log('Refreshed token:', data);

    if (data.status === 'success') {
      const newTokens: AuthTokens = {
        name: authData.name,
        email: authData.email,
        accessToken: data.access_token,
        refreshToken: data.refresh_token || authData.refreshToken // Use new refresh token if provided
      };

      // Save new tokens
      saveAuthTokens(newTokens);
      return newTokens;
    }

    return null;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
};

export const validateAndRefreshToken = async (): Promise<string | null> => {
  try {
    const authData = getStoredAuth();
    if (!authData) {
      return null;
    }

    // Check if access token exists and not expired
    if (authData.accessToken) {
      try {
        const decodedToken = jwt.decode(authData.accessToken) as JwtPayload;
        console.log('Decoded token:', decodedToken);
        
        // Check if token is expired
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp && decodedToken.exp > currentTime) {
          console.log('Token is still valid');
          return authData.accessToken;
        }
        console.log('Token is expired');
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }

    // If no access token or it's expired, try to refresh
    console.log('Attempting to refresh token');
    const newTokens = await refreshAccessToken();
    return newTokens?.accessToken || null;
  } catch (error) {
    console.error('Error validating token:', error);
    return null;
  }
};
