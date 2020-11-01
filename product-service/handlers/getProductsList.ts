import { APIGatewayProxyHandler } from "aws-lambda";
import 'source-map-support/register';
import * as api from '../api';

export const getProductsList: APIGatewayProxyHandler = async () => {
    const products = await api.getProductList();
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(products)
    };
};