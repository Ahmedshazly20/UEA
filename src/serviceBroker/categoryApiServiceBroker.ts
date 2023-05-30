import AlYusrAxiosApiInstance from "../axios/alYusrAxiosApiInstance";
import {
  CategoryModel,
  CategoryResponseModel,
  ResponseBase,
  TreeViewModel,
} from "../models";
import { CategoryDeleteResponse, UpdateCategoryTaxRequest } from "../models/categroy/category";

export const getCateoryTree = async (): Promise<TreeViewModel[]> => {
  let categoryResult: ResponseBase<CategoryResponseModel[]> = {};
  let respnse: TreeViewModel[] = [];
  let url: string = `GetCategoryList?lang=1`;
  categoryResult = await AlYusrAxiosApiInstance.get(url);
  if (
    categoryResult !== null &&
    categoryResult.Result !== null &&
    categoryResult.Result !== undefined &&
    categoryResult.Result.length !== 0
  ) {
    respnse = generateCategoryTree(categoryResult.Result, 0);
  }
  return respnse;
};
//#region private
const generateCategoryTree = (
  request: CategoryResponseModel[],
  parentId: number
): TreeViewModel[] => {

  let response: TreeViewModel[] = [];
  request
    .filter((p) => p.Parent_ID === parentId && p.ID !== 0)
    .forEach((row, index) => {
      response.push({
        name: row.Name_En,
        nameAr: row.Name,
        key: row.ID.toString(),
        children: generateCategoryTree(request, row.ID),
      });
    });
  return response;
};
export const getCategories = async (): Promise<CategoryResponseModel[]> => {
  try {
    let url: string = `GetCategoryList`;
    const result: ResponseBase<CategoryResponseModel[]> =
      await AlYusrAxiosApiInstance.get(url);
    // @ts-ignore
    return result !== null && result !== undefined ? result.Result : [];
  } catch (err) {
    alert(err);
  }
  return [];
};
export const addCategory = async (
  request: CategoryResponseModel
): Promise<CategoryResponseModel> => {
  let apiResponse: CategoryResponseModel = {
    Code: "",
    CategorySetting: {},
    Name: "",
    Name_En: "",
    AllParent: {},
    ID: 0,
    CreatedBy: 0,
    ModifiedBy: 0,
    rowState: 0,
    Parent_ID: 0,
    IsParent: false,
    IsDefault: false,
    ShowInPOS: false,
    Default_Discount_Percentage: 0,
    IsIgnoreServiceMoneyAdd: false,
    DisplySequence: 0,
    CreationDate: "",
    ModificationDate: "",
    VerifyOnUpdate: false,
    Errors: [],
  };
  try {
    let url: string = `SaveCategory`;
    apiResponse = await AlYusrAxiosApiInstance.post(url, { ...request });
    return apiResponse;
  } catch (err) {
    alert(err);
  }
  return apiResponse;
};
export const deleteCategory = async (id: number): Promise<CategoryDeleteResponse> => {
  let apiResponse: CategoryDeleteResponse = {
    Errors: [],
    Result: {
      Result: false,
      Errors: [],
    },
    Status: 0,
  };
  try {
    let url: string = `DeleteCategory?id=${id}`;
    apiResponse = await AlYusrAxiosApiInstance.post(url);
    return apiResponse;
  } catch (err) {
    alert(err);
  }
  return apiResponse;
};

export const updateTaxPercentageOfCategorys = async (request: UpdateCategoryTaxRequest):
 Promise<CategoryDeleteResponse> => 
 {
  let apiResponse: CategoryDeleteResponse = 
  {
    Errors: [],
    Result: {
      Result: false,
      Errors: [],
    },
    Status: 0,
  };
  try {
    let url: string = `UpdateTaxPercentageOfCategory`;
    apiResponse = await AlYusrAxiosApiInstance.post(url, { ...request });

    return apiResponse;
  } catch (err) {
    alert(err);
  }
  return apiResponse;
};

//#endregion
