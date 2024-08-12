import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export async function handler(event: APIGatewayProxyEvent,
    context: Context): Promise<APIGatewayProxyResult> {

    const lambdaResquestID = context.awsRequestId
    const apiRequestId = event.requestContext.requestId

    console.log(`API Gateway ResquestId: ${apiRequestId} - Lambda ResquestId: ${lambdaResquestID}`)

    if (event.resource === "/products") {
        console.log("POST /ptoducts")
        return {
            statusCode: 201,
            body: "POST /products"
        }
    } else if (event.resource === "/products/{id}") {
        const productId = event.pathParameters!.id as string
        if (event.httpMethod === "PUT") {

            console.log(`POST /ptoducts/${productId}`)
            return {
                statusCode: 200,
                body: `POST /ptoducts/${productId}`
            }

        } else if (event.httpMethod === "DELETE") {

            
            console.log(`DELETE /ptoducts/${productId}`)
            return {
                statusCode: 200,
                body: `DELETE /ptoducts/${productId}`
            }

        }
    }
    return {
        statusCode: 400,
        body: "Bad request"
    }

}