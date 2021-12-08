import axios, { AxiosInstance, AxiosResponse, ResponseType } from 'axios';

type RequestConfig = {
  headers?: any;
  params?: any;
  data?: any;
  timeout?: number;
  responseType?: ResponseType;
  onUploadProgress?: (event: any) => void;
};

type Response = {
  status: number;
  data: any;
};

class HttpClient {
  _axiosInstance: AxiosInstance;

  constructor(baseUrl = '', timeout = 20000) {
    this._axiosInstance = axios.create({
      baseURL: baseUrl,
      timeout,
      headers: {
        Accept: 'application/json',
      },
    });
  }

  request = (config = {}): Promise<Response> => {
    return new Promise((resolve, reject) => {
      this._axiosInstance
        .request(config)
        .then(({ status, data }) => {
          resolve({ status, data });
        })
        .catch((err) => {
          let error = {
            status: 0,
            data: err?.message || '',
          };

          if (err.response) {
            error.status = err.response.status;
            error.data = err.response.data;
          }

          reject(error);
        });
    });
  };

  get = (url: string, config: RequestConfig = {}) => {
    return this.request({ method: 'get', url, ...config });
  };

  post = (url: string, config: RequestConfig = {}) => {
    return this.request({ method: 'post', url, ...config });
  };

  put = (url: string, config: RequestConfig = {}) => {
    return this.request({ method: 'put', url, ...config });
  };

  patch = (url: string, config: RequestConfig = {}) => {
    return this.request({ method: 'patch', url, ...config });
  };

  delete = (url: string, config: RequestConfig = {}) => {
    return this.request({ method: 'delete', url, ...config });
  };

  addHeader = (name: string, value: string) => {
    this._axiosInstance.defaults.headers.common[name] = value;
  };

  removeHeader = (name: string) => {
    delete this._axiosInstance.defaults.headers.common[name];
  };

  addResponseInterceptor = (
    successCallback: (
      value: AxiosResponse<any>
    ) => AxiosResponse<any> | Promise<AxiosResponse<any>>,
    errorCallback: (err: any) => any
  ) => {
    this._axiosInstance.interceptors.response.use(
      successCallback,
      errorCallback
    );
  };
}

export default HttpClient;
