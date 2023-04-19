export interface Product {
  id: string;
  productName: string;
  description: string;
  unitPrice: number;
  category: string;
  imageUrl: string;
}

export interface CartProduct {
  id: string;
  productName: string;
  description: string;
  unitPrice: number;
  category: string;
  imageUrl: string;
  quantity: number;
}

export interface CartPayload {
  product: Product;
  quantity: number;
}

export interface CartState {
  cart: Array<CartProduct>;
  totalAmount: number;
}
