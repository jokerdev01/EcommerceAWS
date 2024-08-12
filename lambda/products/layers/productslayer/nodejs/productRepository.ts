import { Repository } from "aws-cdk-lib/aws-ecr";

export interface Product {
    id: String;
    productName: String;
    code: String;
    price: Number;
    model: String
}

export class ProductRepository {

}