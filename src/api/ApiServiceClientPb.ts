/**
 * @fileoverview gRPC-Web generated client stub for pb
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.0
// 	protoc              v3.12.4
// source: api.proto


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as google_protobuf_wrappers_pb from 'google-protobuf/google/protobuf/wrappers_pb';
import * as api_pb from './api_pb';


export class GuestClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'binary';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname.replace(/\/+$/, '');
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorGetProducts = new grpcWeb.MethodDescriptor(
    '/pb.Guest/GetProducts',
    grpcWeb.MethodType.UNARY,
    api_pb.TSearchParams,
    api_pb.TProductList,
    (request: api_pb.TSearchParams) => {
      return request.serializeBinary();
    },
    api_pb.TProductList.deserializeBinary
  );

  getProducts(
    request: api_pb.TSearchParams,
    metadata: grpcWeb.Metadata | null): Promise<api_pb.TProductList>;

  getProducts(
    request: api_pb.TSearchParams,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: api_pb.TProductList) => void): grpcWeb.ClientReadableStream<api_pb.TProductList>;

  getProducts(
    request: api_pb.TSearchParams,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: api_pb.TProductList) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pb.Guest/GetProducts',
        request,
        metadata || {},
        this.methodDescriptorGetProducts,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pb.Guest/GetProducts',
    request,
    metadata || {},
    this.methodDescriptorGetProducts);
  }

  methodDescriptorGetProductById = new grpcWeb.MethodDescriptor(
    '/pb.Guest/GetProductById',
    grpcWeb.MethodType.UNARY,
    google_protobuf_wrappers_pb.Int64Value,
    api_pb.TProduct,
    (request: google_protobuf_wrappers_pb.Int64Value) => {
      return request.serializeBinary();
    },
    api_pb.TProduct.deserializeBinary
  );

  getProductById(
    request: google_protobuf_wrappers_pb.Int64Value,
    metadata: grpcWeb.Metadata | null): Promise<api_pb.TProduct>;

  getProductById(
    request: google_protobuf_wrappers_pb.Int64Value,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: api_pb.TProduct) => void): grpcWeb.ClientReadableStream<api_pb.TProduct>;

  getProductById(
    request: google_protobuf_wrappers_pb.Int64Value,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: api_pb.TProduct) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pb.Guest/GetProductById',
        request,
        metadata || {},
        this.methodDescriptorGetProductById,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pb.Guest/GetProductById',
    request,
    metadata || {},
    this.methodDescriptorGetProductById);
  }

  methodDescriptorGetShopsBySearchParams = new grpcWeb.MethodDescriptor(
    '/pb.Guest/GetShopsBySearchParams',
    grpcWeb.MethodType.UNARY,
    api_pb.TSearchParams,
    api_pb.TShopList,
    (request: api_pb.TSearchParams) => {
      return request.serializeBinary();
    },
    api_pb.TShopList.deserializeBinary
  );

  getShopsBySearchParams(
    request: api_pb.TSearchParams,
    metadata: grpcWeb.Metadata | null): Promise<api_pb.TShopList>;

  getShopsBySearchParams(
    request: api_pb.TSearchParams,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: api_pb.TShopList) => void): grpcWeb.ClientReadableStream<api_pb.TShopList>;

  getShopsBySearchParams(
    request: api_pb.TSearchParams,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: api_pb.TShopList) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pb.Guest/GetShopsBySearchParams',
        request,
        metadata || {},
        this.methodDescriptorGetShopsBySearchParams,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pb.Guest/GetShopsBySearchParams',
    request,
    metadata || {},
    this.methodDescriptorGetShopsBySearchParams);
  }

  methodDescriptorGetShopById = new grpcWeb.MethodDescriptor(
    '/pb.Guest/GetShopById',
    grpcWeb.MethodType.UNARY,
    google_protobuf_wrappers_pb.Int32Value,
    api_pb.TShop,
    (request: google_protobuf_wrappers_pb.Int32Value) => {
      return request.serializeBinary();
    },
    api_pb.TShop.deserializeBinary
  );

  getShopById(
    request: google_protobuf_wrappers_pb.Int32Value,
    metadata: grpcWeb.Metadata | null): Promise<api_pb.TShop>;

  getShopById(
    request: google_protobuf_wrappers_pb.Int32Value,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: api_pb.TShop) => void): grpcWeb.ClientReadableStream<api_pb.TShop>;

  getShopById(
    request: google_protobuf_wrappers_pb.Int32Value,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: api_pb.TShop) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pb.Guest/GetShopById',
        request,
        metadata || {},
        this.methodDescriptorGetShopById,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pb.Guest/GetShopById',
    request,
    metadata || {},
    this.methodDescriptorGetShopById);
  }

}

