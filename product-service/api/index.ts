import { Product } from '../models';
import products from './productList.json';

export const getProductList = async (): Promise<Array<Product>> => Promise.resolve(products);