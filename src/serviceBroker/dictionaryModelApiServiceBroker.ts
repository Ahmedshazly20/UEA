import AlYusrAxiosApiInstance from "../axios/alYusrAxiosApiInstance";
import {
  TransactionTypeModelResponse,
  DictionaryModel,
  OriginalDictionaryModel,
  DailyTransactionTypeEnum,
} from "../models";
import { ResponseBase } from "../models/base/responseBase";
//#region get
export const getAllDictionaries = async (): Promise<
  DictionaryModel[] | null
> => {
  try {
    let url: string = `GetAllDictionaryList?lang=1`;
    const data: ResponseBase<OriginalDictionaryModel[]> =
      await AlYusrAxiosApiInstance.get(url);
    if (
      data !== null &&
      data !== undefined &&
      data.Result !== null &&
      data.Result !== undefined
    ) {
      // const isArabic: boolean = isArabicCurrentLanguage();
      // console.log("alyusr_dictionary_5", new Date());
      let result: DictionaryModel[] = data.Result.map((rawDat) => ({
        Id: rawDat.ID,
        Name: rawDat.Name,
        NameAr: rawDat.ArabicName,
        NameEn: rawDat.EnglishName,
        TypeId: rawDat.ControlType_ID,
        WebUrl: rawDat.WebUrl,
      }));
      const transactionTypeDictionaries =
        await getTransactionsTypesDictionaries();
      if (
        transactionTypeDictionaries !== null &&
        transactionTypeDictionaries !== undefined &&
        transactionTypeDictionaries.length !== 0
      ) {
        result.push(...transactionTypeDictionaries);
      }
      console.log(
        "resultxxxxx",
        result.filter((p) => p.TypeId == 999)
      );
      return result;
    }

    return [];
  } catch (err) {
    alert(err);
  }
  return null;
};

export const getTransactionsTypesDictionaries = async (): Promise<
  DictionaryModel[] | null
> => {
  try {
    let url: string = `GetAllTRasnactionTypes`;
    let result: DictionaryModel[] = [];
    const data: ResponseBase<TransactionTypeModelResponse[]> =
      await AlYusrAxiosApiInstance.get(url);
    if (
      data !== null &&
      data !== undefined &&
      data.Result !== null &&
      data.Result !== undefined
    ) {
      const keys = Object.keys(DailyTransactionTypeEnum).filter((v) =>
        isNaN(Number(v))
      );
      keys.forEach((row) => {
        const id: number = Number(
          Object.values(DailyTransactionTypeEnum)[
            Object.keys(DailyTransactionTypeEnum).indexOf(row)
          ]
        );
        const record = data.Result?.filter((p) => p.ID == id)[0];
        result.push({
          Id: id,
          Name: row,
          NameAr: record?.ArabicName || "*****",
          NameEn: record?.EnglishName || "******",
          TypeId: 999,
        });
      });
      return result;
    }

    return [];
  } catch (err) {
    alert(err);
  }
  return null;
};

export const getButtonDictionaries = async (
  lang: number = 1
): Promise<DictionaryModel[] | null> => {
  try {
    let url: string = `GetButtonDictionaryList?lang=${lang}`;
    const result: DictionaryModel[] = await AlYusrAxiosApiInstance.get(url);
    // @ts-ignore
    return result;
  } catch (err) {
    alert(err);
  }
  return null;
};
//#endregion
//#region post
export const saveNotExistTranslation = async (
  word: string,
  controltypeId: number
): Promise<DictionaryModel | null> => {
  try {
    let response: DictionaryModel | null = null;
    const url: string = `SaveNotExistTranslation?word=${word}&controltypeId=${controltypeId}`;
    const result: ResponseBase<OriginalDictionaryModel> =
      await AlYusrAxiosApiInstance.post(url);

    if (
      result !== null &&
      result !== undefined &&
      result.Result !== null &&
      result.Result !== undefined
    ) {
      response = {
        Id: result.Result.ID,
        Name: word,
        NameAr: word,
        NameEn: word,
        TypeId: controltypeId,
      };
    }
    return response;
  } catch (err) {
    alert(err);
  }
  return null;
};
//#endregion
