import { APIGatewayProxyHandler } from "aws-lambda";
import 'source-map-support/register';
import * as api from '../../api';
import {corsHeaders} from '../constants';

export const getProductById: APIGatewayProxyHandler = async (event) => {
    try {
        const productId = event.pathParameters.productId || '';
        const product = await api.getProductById(productId);
        return {
            statusCode: 200,
            headers: {...corsHeaders},
            body: JSON.stringify(product)
        };
    } catch (err) {
        if (err === 'Product is not found!') {
            return {
                statusCode: 404,
                headers: {...corsHeaders},
                body: JSON.stringify({
                    error: 'Not found item in DB',
                    message: err
                })
            };
        } else {
            return {
                statusCode: 500,
                headers: {...corsHeaders},
                body: JSON.stringify(err)
            };
        }
    }
};