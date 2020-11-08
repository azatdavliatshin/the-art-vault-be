const serverlessConfiguration = {
  service: {
    name: 'product-service',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    },
    documentation: {
      api: {
        info: {
          title: "The Art Vault API",
          description: "API for best shop of art"
        }
      },
      models: [
        {
          name: 'Product',
          description: 'Product model in search page',
          contentType: 'application/json',
          schema: {
            type: 'object',
            properties: {
              id: {
                type: 'string'
              },
              title: {
                type: 'string'
              },
              description: {
                type: 'string'
              },
              price: {
                type: 'number'
              },
              image: {
                type: 'string'
              }
            }
          }
        },
        {
          name: 'SearchResponse',
          description: 'Search result model in search page',
          contentType: 'application/json',
          schema: {
            type: 'array',
            items: {
              $ref: '{{model: Product}}'
            }
          }
        },
        {
          name: 'ProductNotFoundResponse',
          description: 'Product is not found',
          contentType: 'application/json',
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string'
              }
            }
          }
        }
      ]
    }
  },
  // Add the serverless-webpack plugin
  plugins: [
    'serverless-webpack',
    'serverless-aws-documentation'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  functions: {
    getProductsList: {
      handler: 'handler.getProductsList',
      events: [
        {
          http: {
            method: 'get',
            path: 'products',
            cors: true,
            documentation: {
              summary: 'Get all products',
              description: 'method to get all products',
              methodResponses: [
                {
                  statusCode: '200',
                  description: 'Success response',
                  responseModels: {'application/json': 'SearchResponse'}
                }
              ]
            }
          }
        }
      ]
    },
    getProductById : {
      handler: 'handler.getProductById',
      events: [
        {
          http: {
            method: 'get',
            path: '/products/{productId}',
            cors: true,
            request: {
              parameters: {
                paths: {
                  productId: true
                }
              }
            },
            documentation: {
              summary: 'Get product by id',
              description: 'method to get product by id',
              methodResponses: [
                {
                  statusCode: '200',
                  description: 'Success response',
                  responseModels: {'application/json': 'Product'}
                },
                {
                  statusCode: '404',
                  description: 'Error response: product not found',
                  responseModels: {'application/json': 'ProductNotFoundResponse'}
                }
              ]
            }
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;
