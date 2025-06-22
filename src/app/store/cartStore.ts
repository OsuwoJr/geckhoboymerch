import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

export interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size?: string, color?: string) => void;
  updateQuantity: (id: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  getTotal: () => number;
}

// Helper function to create unique cart item key
const getItemKey = (id: string, size?: string, color?: string) => {
  return `${id}-${size || 'no-size'}-${color || 'no-color'}`;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  
  addItem: (item) => {
    set((state) => {
      const itemKey = getItemKey(item.id, item.size, item.color);
      const existingItem = state.items.find((i) => 
        getItemKey(i.id, i.size, i.color) === itemKey
      );
      
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            getItemKey(i.id, i.size, i.color) === itemKey 
              ? { ...i, quantity: i.quantity + 1 } 
              : i
          ),
        };
      }
      return { items: [...state.items, { ...item, quantity: 1 }] };
    });
  },

  removeItem: (id, size, color) => {
    const itemKey = getItemKey(id, size, color);
    set((state) => ({
      items: state.items.filter((item) => 
        getItemKey(item.id, item.size, item.color) !== itemKey
      ),
    }));
  },

  updateQuantity: (id, quantity, size, color) => {
    if (quantity < 1) return;
    const itemKey = getItemKey(id, size, color);
    set((state) => ({
      items: state.items.map((item) =>
        getItemKey(item.id, item.size, item.color) === itemKey
          ? { ...item, quantity }
          : item
      ),
    }));
  },

  clearCart: () => {
    set({ items: [] });
  },

  getTotal: () => {
    const state = get();
    return state.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
})); 