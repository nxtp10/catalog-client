import * as jspb from 'google-protobuf'

import * as google_protobuf_wrappers_pb from 'google-protobuf/google/protobuf/wrappers_pb';


export class TProductList extends jspb.Message {
  getValueList(): Array<TProduct>;
  setValueList(value: Array<TProduct>): TProductList;
  clearValueList(): TProductList;
  addValue(value?: TProduct, index?: number): TProduct;

  getCount(): number;
  setCount(value: number): TProductList;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TProductList.AsObject;
  static toObject(includeInstance: boolean, msg: TProductList): TProductList.AsObject;
  static serializeBinaryToWriter(message: TProductList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TProductList;
  static deserializeBinaryFromReader(message: TProductList, reader: jspb.BinaryReader): TProductList;
}

export namespace TProductList {
  export type AsObject = {
    valueList: Array<TProduct.AsObject>,
    count: number,
  }
}

export class TProduct extends jspb.Message {
  getId(): number;
  setId(value: number): TProduct;

  getShopId(): number;
  setShopId(value: number): TProduct;

  getName(): string;
  setName(value: string): TProduct;

  getArtnum(): string;
  setArtnum(value: string): TProduct;

  getPrice(): number;
  setPrice(value: number): TProduct;

  getCurrency(): string;
  setCurrency(value: string): TProduct;

  getQuantity(): number;
  setQuantity(value: number): TProduct;

  getUnit(): string;
  setUnit(value: string): TProduct;

  getDescription1(): string;
  setDescription1(value: string): TProduct;

  getDescription2(): string;
  setDescription2(value: string): TProduct;

  getImagesList(): Array<number>;
  setImagesList(value: Array<number>): TProduct;
  clearImagesList(): TProduct;
  addImages(value: number, index?: number): TProduct;

  getShopname(): string;
  setShopname(value: string): TProduct;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TProduct.AsObject;
  static toObject(includeInstance: boolean, msg: TProduct): TProduct.AsObject;
  static serializeBinaryToWriter(message: TProduct, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TProduct;
  static deserializeBinaryFromReader(message: TProduct, reader: jspb.BinaryReader): TProduct;
}

export namespace TProduct {
  export type AsObject = {
    id: number,
    shopId: number,
    name: string,
    artnum: string,
    price: number,
    currency: string,
    quantity: number,
    unit: string,
    description1: string,
    description2: string,
    imagesList: Array<number>,
    shopname: string,
  }
}

export class TSearchParams extends jspb.Message {
  getShopid(): number;
  setShopid(value: number): TSearchParams;

  getFilterstr(): string;
  setFilterstr(value: string): TSearchParams;

  getLimit(): number;
  setLimit(value: number): TSearchParams;

  getMinprice(): number;
  setMinprice(value: number): TSearchParams;

  getMaxprice(): number;
  setMaxprice(value: number): TSearchParams;

  getSortby(): number;
  setSortby(value: number): TSearchParams;

  getLatitude(): number;
  setLatitude(value: number): TSearchParams;

  getLongitude(): number;
  setLongitude(value: number): TSearchParams;

  getRadius(): number;
  setRadius(value: number): TSearchParams;

  getOffset(): number;
  setOffset(value: number): TSearchParams;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TSearchParams.AsObject;
  static toObject(includeInstance: boolean, msg: TSearchParams): TSearchParams.AsObject;
  static serializeBinaryToWriter(message: TSearchParams, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TSearchParams;
  static deserializeBinaryFromReader(message: TSearchParams, reader: jspb.BinaryReader): TSearchParams;
}

export namespace TSearchParams {
  export type AsObject = {
    shopid: number,
    filterstr: string,
    limit: number,
    minprice: number,
    maxprice: number,
    sortby: number,
    latitude: number,
    longitude: number,
    radius: number,
    offset: number,
  }
}

export class TShopList extends jspb.Message {
  getValueList(): Array<TShop>;
  setValueList(value: Array<TShop>): TShopList;
  clearValueList(): TShopList;
  addValue(value?: TShop, index?: number): TShop;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TShopList.AsObject;
  static toObject(includeInstance: boolean, msg: TShopList): TShopList.AsObject;
  static serializeBinaryToWriter(message: TShopList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TShopList;
  static deserializeBinaryFromReader(message: TShopList, reader: jspb.BinaryReader): TShopList;
}

export namespace TShopList {
  export type AsObject = {
    valueList: Array<TShop.AsObject>,
  }
}

export class TShop extends jspb.Message {
  getId(): number;
  setId(value: number): TShop;

  getName(): string;
  setName(value: string): TShop;

  getPhoneList(): Array<string>;
  setPhoneList(value: Array<string>): TShop;
  clearPhoneList(): TShop;
  addPhone(value: string, index?: number): TShop;

  getCountry(): string;
  setCountry(value: string): TShop;

  getState(): string;
  setState(value: string): TShop;

  getTown(): string;
  setTown(value: string): TShop;

  getAddress(): string;
  setAddress(value: string): TShop;

  getDescription(): string;
  setDescription(value: string): TShop;

  getLocation(): TLocation | undefined;
  setLocation(value?: TLocation): TShop;
  hasLocation(): boolean;
  clearLocation(): TShop;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TShop.AsObject;
  static toObject(includeInstance: boolean, msg: TShop): TShop.AsObject;
  static serializeBinaryToWriter(message: TShop, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TShop;
  static deserializeBinaryFromReader(message: TShop, reader: jspb.BinaryReader): TShop;
}

export namespace TShop {
  export type AsObject = {
    id: number,
    name: string,
    phoneList: Array<string>,
    country: string,
    state: string,
    town: string,
    address: string,
    description: string,
    location?: TLocation.AsObject,
  }
}

export class TLocation extends jspb.Message {
  getLat(): number;
  setLat(value: number): TLocation;

  getLng(): number;
  setLng(value: number): TLocation;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TLocation.AsObject;
  static toObject(includeInstance: boolean, msg: TLocation): TLocation.AsObject;
  static serializeBinaryToWriter(message: TLocation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TLocation;
  static deserializeBinaryFromReader(message: TLocation, reader: jspb.BinaryReader): TLocation;
}

export namespace TLocation {
  export type AsObject = {
    lat: number,
    lng: number,
  }
}

