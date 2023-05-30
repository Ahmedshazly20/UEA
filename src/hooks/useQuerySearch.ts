import { useQuery } from "react-query";
import { QueryResult } from "../models";

export const useQuerySearch = (
  queryParameters: any,
  queryFunction: any,
  queryKey: string,
  staleTime: number | undefined = 120000
): QueryResult<any> => {
  let response: QueryResult<any> = {
    data: undefined,
    isLoading: false,
    isSuccess: false,
    Errors: [],
    isError: false,
  };
  var result = useQuery(
    [queryKey, JSON.stringify(queryParameters).toString()],
    queryFunction,
    { staleTime: staleTime }
  );

  response.data = result.data;
  //@ts-ignore
  response.isLoading = Boolean(result.isLoading);
  //@ts-ignore
  response.isSuccess = Boolean(result.isSuccess);
  //@ts-ignore
  response.isError = Boolean(result.isError);
  if (result.error != null) {
    response.Errors = [
      //@ts-ignore
      { MessageAr: result.error, MessageEn: result.error },
    ];
  }
  return response;
};
