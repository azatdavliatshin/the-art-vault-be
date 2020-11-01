import { APIGatewayProxyHandler } from "aws-lambda";
import 'source-map-support/register';
import {getProductList} from '../api';

export const getProductsList: APIGatewayProxyHandler = async () => {
    const products = await getProductList();
    return {
        statusCode: 200,
        body: JSON.stringify({products})
    };
};