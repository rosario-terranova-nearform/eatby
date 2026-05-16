export type FoodCategory =
  | "produce"
  | "dairy"
  | "meat"
  | "seafood"
  | "frozen"
  | "pantry"
  | "beverages"
  | "condiments"
  | "snacks"
  | "other";

export type Food = {
  id: string;
  name: string;
  category: FoodCategory;
  quantity: string;
  unit: string;
  expiryDate: Date;
  addedAt: Date;
};

export type InventoryUrgency = "critical" | "warning" | "safe";

export interface InventoryItemDisplay {
  id: string;
  title: string;
  meta: string;
  pillLabel: string;
  expiryCaption: string;
  urgency: InventoryUrgency;
}