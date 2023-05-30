export interface DictionaryModel {
  Id: number;
  Name: string;
  //TranslatedName: string;
  NameAr: string;
  NameEn: string;
  TypeId: number;
}

export interface OriginalDictionaryModel {
  ID: number;
  Name: string;
  //TranslatedName: string;
  ArabicName: string;
  EnglishName: string;
  ControlType_ID: number;
  WebUrl?: string | null;
}
