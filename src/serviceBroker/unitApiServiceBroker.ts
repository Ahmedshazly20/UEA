import AlYusrAxiosApiInstance from "../axios/alYusrAxiosApiInstance";
import { ResponseBase } from "../models/base/responseBase";
import _ from "lodash";
import { DeleteunitModel, UnitModel, UnitsModel } from "../models/unit/unit";

export const getUnits = async (): Promise<ResponseBase<
  UnitsModel[]
> | null> => {
  try {
    let url: string = `GetUnitList`;
    const result: ResponseBase<UnitsModel[]> = await AlYusrAxiosApiInstance.get(
      url
    );
    // @ts-ignore
    return result;
  } catch (err) {
    alert(err);
  }
  return null;
};
export const saveUnit = async (
  request: UnitModel
): Promise<ResponseBase<UnitModel> | null> => {
  try {
    let url: string = `SaveUnit`;
    const result: ResponseBase<UnitModel> = await AlYusrAxiosApiInstance.post(
      url,
      request
    );
    // @ts-ignore
    return result;
  } catch (err) {
    alert(err);
  }
  return null;
};
export const deleteUnit = async (
  id: number
): Promise<ResponseBase<DeleteunitModel>> => {
  let apiResponse: ResponseBase<DeleteunitModel> = {};
  try {
    let url: string = `DeleteUnit?id=${id}`;
    apiResponse = await AlYusrAxiosApiInstance.post(url);
    // @ts-ignore
    console.log("delete", apiResponse);
    return apiResponse;
  } catch (err) {
    alert(err);
  }
  return apiResponse;
};
