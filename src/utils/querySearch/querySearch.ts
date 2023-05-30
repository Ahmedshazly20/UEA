import { Observable } from "@reduxjs/toolkit";
import { GeneralResponse, ItemModel, ResponseBase } from "../../models";

// export const  getUseQuerySearchtData<T>= (
//     queryParameters: any,
//     queryFunction: any,
//     queryKey: string,
//     staleTime: number | undefined = 120000
//   ): Observable<T>=>{
// return null;

//   }

//@ts-ignore
// const search<T>(query: string, type: string): T|null =>{
//    return null;
//    }

export interface TestResponse {}
export interface t1 extends TestResponse {
  query: string;
  id: number;
}
export interface t2 {
  query1: string;
  id1: number;
}
export function pickObjectKeys<T>(query: string, id: number): T {
  const tz: ResponseBase<t1> = {
    Result: { query: query, id: id },
    token: "",
    Errors: [],
  };
  return tz as T;
}

export function testFunction<E extends TestResponse>(
  query: string,
  id: number
): E {
  const tz: ResponseBase<t1> = {
    Result: { query: query, id: id },
    token: "",
    Errors: [],
  };
  //@ts-ignore
  return tz;
  //   return {
  //     tz,
  //   } as unknown as TransformerFn<E>;
}

type TransformerFn<T> = () => T extends any ? T : T;
export function generateValue<E extends TestResponse>(
  q: string
): TransformerFn<E> {
  const x: any = { query: q };
  return x as TransformerFn<E>;
}
