export interface MenuModel {
  ArabicName: string;
  Name: string;
  ChildBusinessObject: MenuModel[];
  ID: number;
  WebUrl?:string|null;
}
export interface MenuItemName{
  name:string
  nameAr:string
  url:string
}
// export interface MenuItem {
//   ArabicName: string;
//   EnglishName: string;
//   ID: number;
// }
