#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ProductsAppStack } from '../lib/productsApp-stack';
import {  ECommerceApiStack } from '../lib/ecommerceApi-stack';
import { ProductsAppLayersStack } from '../lib/productsAppLayers-Stack';

const app = new cdk.App();

const env: cdk.Environment = {
    account: "637423417630",
    region: "us-east-1"
}

const tags = {
    Cost: "Ecommerce",
    team: "SiecolaCode"
}

const productsAppLayers = new ProductsAppLayersStack(app, "productsAppLayers", {
    tags: tags,
    env: env 
})

const productsAppStack = new ProductsAppStack(app, "ProductsApp", {
    tags: tags,
    env: env
})
productsAppStack.addDependency(productsAppLayers)

const eCommerceApiStack = new ECommerceApiStack (app, "ECommerceApi", {
  productsFetchHandler: productsAppStack.productsFetchHandler,
  productsAdminHandler: productsAppStack.productsAdminHandler,
  tags: tags,
  env: env
})
eCommerceApiStack.addDependency(productsAppStack)