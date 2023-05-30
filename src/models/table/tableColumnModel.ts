export interface TableColumnModel {
  name: string;
  selector: string;
  sortable?: boolean;
  hide?: number | "sm" | "md" | "lg";
}
