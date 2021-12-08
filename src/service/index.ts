import HttpClient from './HttpClient';

const httpClient = new HttpClient(process.env.REACT_APP_HOST_URL);

export function checkHealth() {
  return new Promise<Response>((resolve, reject) => {
    httpClient
      .get('/db')
      .then(({ data }) => {
        resolve(data.data);
      })
      .catch(({ data }) => {
        reject(data);
      });
  });
}

export function createUser(data: User) {
  return new Promise<HttpResponse<User>>((resolve, reject) => {
    httpClient
      .post('/users', { data })
      .then((response) => {
        resolve({
          ...response,
          message: 'User Created Successfully',
        });
      })
      .catch(({ data }) => {
        reject(data);
      });
  });
}

export function getUsers() {
  return new Promise<User[]>((resolve, reject) => {
    httpClient
      .get('/users')
      .then(({ data }) => {
        resolve(data);
      })
      .catch(({ data }) => {
        reject(data);
      });
  });
}

export function updateUser(id: ID, data: User) {
  return new Promise<HttpResponse<null>>((resolve, reject) => {
    httpClient
      .put('/users/' + id, { data })
      .then((response) => {
        resolve({
          ...response,
          message: 'User Updated Successfully',
        });
      })
      .catch(({ data }) => {
        reject(data);
      });
  });
}

export function deleteUser(id: ID) {
  return new Promise<HttpResponse<null>>((resolve, reject) => {
    httpClient
      .delete('/users/' + id)
      .then((response) => {
        resolve({
          ...response,
          message: 'User Deleted Successfully',
        });
      })
      .catch(({ data }) => {
        reject(data);
      });
  });
}

const ApiService = {
  checkHealth,
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};

export default ApiService;
