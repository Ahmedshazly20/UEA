import { ValidationError } from "../validation/error";

export interface QueryResult<T> {
  data: T;
  isLoading: false;
  isSuccess: false;
  Errors?: ValidationError[];
  isError: false;
}
