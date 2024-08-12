import * as lambdaNodeJS from "aws-cdk-lib/aws-lambda-nodejs"

import * as cdk from "aws-cdk-lib"

import { Construct } from "constructs"

import * as cwlogs from "aws-cdk-lib/aws-logs"

import * as apigateway from "aws-cdk-lib/aws-apigateway"
import { CfnTopicRule } from "aws-cdk-lib/aws-iot"

interface ECommerceApiStackProps extends cdk.StackProps {
    productsFetchHandler: lambdaNodeJS.NodejsFunction
    productsAdminHandler: lambdaNodeJS.NodejsFunction
}

export class ECommerceApiStack extends cdk.Stack {

    constructor(scope: Construct, id: string, props: ECommerceApiStackProps) {
        super(scope, id, props)

        const logGroup = new cwlogs.LogGroup(this, "EcommerceApiLogs")
        const api = new apigateway.RestApi(this, "EcommerceApi", {
            restApiName: "EcommerceApi",
            deployOptions: {
                accessLogDestination: new apigateway.LogGroupLogDestination(logGroup),
                accessLogFormat: apigateway.AccessLogFormat.jsonWithStandardFields({
                    httpMethod: true,
                    ip: true,
                    protocol: true,
                    requestTime: true,
                    resourcePath: true,
                    responseLength: true,
                    status: true,
                    caller: true,
                    user: true
                })

            }
        })

        const productsFetchIntergration = new apigateway.LambdaIntegration(props.productsFetchHandler)

        // "/products"
        const productsResource = api.root.addResource("products")
        productsResource.addMethod("GET", productsFetchIntergration)

        //  "GET  /products/{id}"
        const productidReource = productsResource.addResource("{id}")
        productidReource.addMethod("GET", productsFetchIntergration)

        const productsAdminIntegration = new apigateway.LambdaIntegration(props.productsAdminHandler)

        // POST /products
        productidReource.addMethod("POST", productsAdminIntegration)

        // PUT /products/{id}
        productidReource.addMethod("PUT", productsAdminIntegration)

        // DELETE /products/{id}
        productidReource.addMethod("DELETE", productsAdminIntegration)

    }

}