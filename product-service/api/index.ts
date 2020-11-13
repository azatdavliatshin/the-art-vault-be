import { Product } from '../models';
import {getProductsListDAL, getProductByIdDAL} from '../dal';

export const getProductList = (): Promise<Array<Product>> => getProductsListDAL();
export const getProductById = async (queryId: string): Promise<Product> => {
    try {
        const product = await getProductByIdDAL(queryId);
        if (product) {
            return product;
        } else {
            throw('Product is not found!');
        }
    } catch (error) {
        throw (error);
    }
};