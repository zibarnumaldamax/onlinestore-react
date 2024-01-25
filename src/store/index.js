import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from './slices/cateroriesSlice'
import productsReducer from './slices/productsSlice'
import singleProductReducer from './slices/singleProductSlice'
import basketReducer from './slices/basketSlice'

export const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        products: productsReducer,
        product: singleProductReducer,
        basket: basketReducer,
    }
})
export default store