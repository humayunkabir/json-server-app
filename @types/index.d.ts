type HttpResponse<T> = {
  status: number;
  message: string;
  data: T | null;
};

type ID = number;

type User = {
  id: ID;
  name: string;
};
