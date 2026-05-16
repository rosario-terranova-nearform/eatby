import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { Food, InventoryItemDisplay, InventoryUrgency } from "./types";

interface InventoryContextType {
  items: Food[];
  addFood: (food: Omit<Food, "id" | "addedAt">) => void;
  updateFood: (id: string, updates: Partial<Omit<Food, "id" | "addedAt">>) => void;
  removeFood: (id: string) => void;
  getDisplayItems: () => InventoryItemDisplay[];
  getFoodById: (id: string) => Food | undefined;
}

const InventoryContext = createContext<InventoryContextType | null>(null);

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function getUrgency(expiryDate: Date): InventoryUrgency {
  const now = new Date();
  const diffTime = expiryDate.getTime() - now.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  if (diffDays <= 1) return "critical";
  if (diffDays <= 3) return "warning";
  return "safe";
}

function formatTimeLeft(expiryDate: Date): string {
  const now = new Date();
  const diffTime = expiryDate.getTime() - now.getTime();
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 0) return "EXPIRED";
  if (diffHours <= 24) return `${diffHours} HOURS LEFT`;
  if (diffDays === 1) return "1 DAY LEFT";
  return `${diffDays} DAYS LEFT`;
}

function formatExpiryDate(expiryDate: Date): string {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const isToday =
    expiryDate.getDate() === now.getDate() &&
    expiryDate.getMonth() === now.getMonth() &&
    expiryDate.getFullYear() === now.getFullYear();

  const isTomorrow =
    expiryDate.getDate() === tomorrow.getDate() &&
    expiryDate.getMonth() === tomorrow.getMonth() &&
    expiryDate.getFullYear() === tomorrow.getFullYear();

  if (isToday) {
    const hours = expiryDate.getHours();
    const minutes = expiryDate.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, "0");
    return `Exp: Today, ${displayHours}:${displayMinutes} ${ampm}`;
  }

  if (isTomorrow) return "Exp: Tomorrow";

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };

  const diffFromNow = expiryDate.getTime() - now.getTime();
  const daysFromNow = Math.floor(diffFromNow / (1000 * 60 * 60 * 24));

  if (daysFromNow > 30) {
    options.month = "short";
    options.day = "numeric";
    return `Exp: ${expiryDate.toLocaleDateString("en-US", options)}`;
  }

  return `Exp: ${expiryDate.toLocaleDateString("en-US", options)}`;
}

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Food[]>([]);

  function addFood(food: Omit<Food, "id" | "addedAt">) {
    const newFood: Food = {
      ...food,
      id: generateId(),
      addedAt: new Date(),
    };
    setItems((prev) => [...prev, newFood]);
  }

  function updateFood(id: string, updates: Partial<Omit<Food, "id" | "addedAt">>) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  }

  function removeFood(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function getFoodById(id: string): Food | undefined {
    return items.find((item) => item.id === id);
  }

  function getDisplayItems(): InventoryItemDisplay[] {
    return items
      .map((item) => ({
        id: item.id,
        title: item.name,
        pillLabel: formatTimeLeft(item.expiryDate),
        expiryCaption: formatExpiryDate(item.expiryDate),
        expiryDate: item.expiryDate,
        urgency: getUrgency(item.expiryDate),
      }))
      .sort((a, b) => {
        return a.expiryDate.getTime() - b.expiryDate.getTime();
      });
  }

  const value = {
    items,
    addFood,
    updateFood,
    removeFood,
    getDisplayItems,
    getFoodById,
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventory must be used within an InventoryProvider");
  }
  return context;
}