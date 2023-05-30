export interface TreeViewModel {
  nameAr: string;
  name: string;
  key: string;
  children?: TreeViewModel[] | null;
}
