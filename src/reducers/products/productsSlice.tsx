import {createSlice} from '@reduxjs/toolkit';
import ShopItems from '../../assets/data/items.json';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface Product {
  id: string;
  productName: string;
  description: string;
  unitPrice: number;
  category: string;
  imageUrl: string;
}

export interface ProductsState {
  products: Array<Product>;
  filter:
    | ''
    | 'All Items'
    | 'Groceries'
    | 'Lifestyle'
    | 'Cloths'
    | 'Automotive'
    | 'Gadgets'
    | 'Furniture'
    | 'Toys'
    | string;
  filteredProducts: Array<Product>;
  sortBy: string;
  sortOrder: string;
  isFilteringByCategory: boolean;
  isSearching: boolean;
  searchKeyWord: string;
}

const initialState: ProductsState = {
  products: [...ShopItems],
  filter: 'All Items',
  filteredProducts: [...ShopItems],
  sortBy: '',
  sortOrder: '',
  isFilteringByCategory: false,
  isSearching: false,
  searchKeyWord: '',
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      if (action.payload.toLowerCase() === 'all items') {
        state.filteredProducts = state.products;
        state.isFilteringByCategory = false;
        state.filter = 'All Items';
      } else {
        state.filteredProducts = state.products.filter(
          product => product.category === action.payload.toLowerCase(),
        );
        state.filter = action.payload;
        state.isFilteringByCategory = true;
      }
      state.searchKeyWord = '';
      state.isSearching = false;
    },
    searchProduct: (state, action: PayloadAction<string>) => {
      state.searchKeyWord = action.payload;
      if (action.payload !== '') {
        if (state.isFilteringByCategory) {
          state.filteredProducts = state.filteredProducts.filter(product =>
            product.productName
              .toLowerCase()
              .includes(action.payload.toLowerCase()),
          );
        } else {
          state.filteredProducts = state.products.filter(product =>
            product.productName
              .toLowerCase()
              .includes(action.payload.toLowerCase()),
          );
          state.isSearching = false;
        }

        state.isSearching = true;
      } else {
        if (state.isFilteringByCategory) {
          state.filteredProducts = state.products.filter(
            product => product.productName === state.filter.toLowerCase(),
          );
        } else {
          state.filteredProducts = state.products;
        }
        state.isSearching = false;
      }
    },
    toggleSearch: state => {
      if (state.isSearching) {
        state.searchKeyWord = '';
      }
      state.isSearching = !state.isSearching;
    },
    sortByPriceAsc: state => {
      if (state.isFilteringByCategory) {
        state.filteredProducts = state.filteredProducts.sort(function (
          item1,
          item2,
        ) {
          return item1.unitPrice - item2.unitPrice;
        });
      } else {
        state.filteredProducts = state.products.sort(function (item1, item2) {
          return item1.unitPrice - item2.unitPrice;
        });
      }
    },
    sortByPriceDesc: state => {
      if (state.isFilteringByCategory) {
        state.filteredProducts = state.filteredProducts.sort(function (
          item1,
          item2,
        ) {
          return item2.unitPrice - item1.unitPrice;
        });
      } else {
        state.filteredProducts = state.products.sort(function (item1, item2) {
          return item2.unitPrice - item1.unitPrice;
        });
      }
    },
    removeSort: state => {
      if (state.filter === 'all items') {
        state.filteredProducts = ShopItems;
        state.isFilteringByCategory = false;
        state.filter = 'All Items';
      } else {
        state.filteredProducts = ShopItems.filter(
          product => product.category === state.filter.toLowerCase(),
        );
      }
    },
  },
});

export const {
  setCategory,
  searchProduct,
  toggleSearch,
  sortByPriceAsc,
  sortByPriceDesc,
  removeSort,
} = productsSlice.actions;

export default productsSlice.reducer;
