import { Dispatch, SetStateAction } from "react";

export interface StateGenericRequestModel {
  state: Dispatch<SetStateAction<any>>;
  filed: any;
  value: any;
}
