export type Food = {
  id: string;
  name: string;
  expiryDate: Date;
  addedAt: Date;
};

export type InventoryUrgency = "critical" | "warning" | "safe";

export interface InventoryItemDisplay {
  id: string;
  title: string;
  pillLabel: string;
  expiryCaption: string;
  expiryDate: Date;
  urgency: InventoryUrgency;
}