import config from '../config';
import { validateAndRefreshToken } from '../utils/auth';

export interface ApiResponse<T = any> {
  status: string;
  type?: string;
  status_code?: number;
  message?: string;
  data: T;
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
  redirect_url?: string;
}

interface ApiOptions {
  requiresAuth?: boolean;
  contentType?: string;
}

interface ErrorResponse {
  status: number;
  message: string;
  data: any;
}

const defaultOptions: ApiOptions = {
  requiresAuth: true,
  contentType: 'application/json'
};

class ApiService {
  private async getHeaders(options: ApiOptions): Promise<Headers> {
    const headers = new Headers();
    
    // Set content type
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', options.contentType || 'application/json');

    // Add authorization header if required
    if (options.requiresAuth) {
      const token = await validateAndRefreshToken();
      if (!token) {
        throw new Error('Authentication required');
      }
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json();
    
    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'An error occurred',
        data
      } as ErrorResponse;
    }

    return data as T;
  }

  async get<T>(endpoint: string, options: ApiOptions = defaultOptions): Promise<T> {
    try {
      const headers = await this.getHeaders(options);
      const response = await fetch(`${config.API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('GET request failed:', error);
      throw error;
    }
  }



  //over write post method by shafa
    async post<T>(
    endpoint: string,
    data: Record<string, any> | URLSearchParams | FormData,
    options: ApiOptions = defaultOptions
  ): Promise<T> {
    try {
      const headers = await this.getHeaders(options);
      let body: string | FormData;
      // Handle different content types
      if (data instanceof FormData) {
        body = data;
        // Remove Content-Type header for FormData to let the browser set it with the boundary
        headers.delete('Content-Type');
      } else if (data instanceof URLSearchParams) {
        body = data.toString();
        headers.set('Content-Type', 'application/x-www-form-urlencoded');
      } else {
        body = JSON.stringify(data);
      }
      const response = await fetch(`${config.API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers,
        body
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('POST request failed:', error);
      throw error;
    }
  }
  
  // async put<T>(
  //   endpoint: string, 
  //   data: Record<string, any>,
  //   options: ApiOptions = defaultOptions
  // ): Promise<T> {
  //   try {
  //     const headers = await this.getHeaders(options);
  //     const response = await fetch(`${config.API_BASE_URL}${endpoint}`, {
  //       method: 'PUT',
  //       headers,
  //       body: JSON.stringify(data)
  //     });

  //     return this.handleResponse<T>(response);
  //   } catch (error) {
  //     console.error('PUT request failed:', error);
  //     throw error;
  //   }
  // }

  //over write put method by shafa
  async put<T>(
    endpoint: string,
    data: Record<string, any> | URLSearchParams | FormData,
    options: ApiOptions = defaultOptions
  ): Promise<T> {
    try {
      const headers = await this.getHeaders(options);
      let body: string | FormData;
      // Handle different content types
      if (data instanceof FormData) {
        body = data;
        // Remove Content-Type header for FormData to let the browser set it with the boundary
        headers.delete('Content-Type');
      } else if (data instanceof URLSearchParams) {
        body = data.toString();
        headers.set('Content-Type', 'application/x-www-form-urlencoded');
      } else {
        body = JSON.stringify(data);
      }
      const response = await fetch(`${config.API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers,
        body
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('POST request failed:', error);
      throw error;
    }
  }

  // async delete<T>(endpoint: string, options: ApiOptions = defaultOptions): Promise<T> {
  //   try {
  //     const headers = await this.getHeaders(options);
  //     const response = await fetch(`${config.API_BASE_URL}${endpoint}`, {
  //       method: 'DELETE',
  //       headers
  //     });

  //     return this.handleResponse<T>(response);
  //   } catch (error) {
  //     console.error('DELETE request failed:', error);
  //     throw error;
  //   }
  // }

  // overwrite delete method by shafa
  async delete<T>(
    endpoint: string,
    data: URLSearchParams,
    options: ApiOptions = defaultOptions
  ): Promise<T> {
    try {
      const headers = await this.getHeaders(options);
      headers.set('Content-Type', 'application/x-www-form-urlencoded');
      headers.set('accept', 'application/json');
      
      const response = await fetch(`${config.API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers,
        body: data.toString()
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('DELETE request failed:', error);
      throw error;
    }
  }
}

export const api = new ApiService();
