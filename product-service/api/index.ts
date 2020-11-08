import { Product } from '../models';
import products from './productList.json';

export const getProductList = (): Promise<Array<Product>> => Promise.resolve(products);
export const getProductById = (queryId: string): Promise<Product> => new Promise((resolve, reject) => {
    const product = products.find(({id}) => id === queryId);
    product ? resolve(product) : reject({message: 'Product is not found!'});
});