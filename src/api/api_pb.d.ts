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

export class TAuthResp extends jspb.Message {
  getSessionid(): string;
  setSessionid(value: string): TAuthResp;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TAuthResp.AsObject;
  static toObject(includeInstance: boolean, msg: TAuthResp): TAuthResp.AsObject;
  static serializeBinaryToWriter(message: TAuthResp, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TAuthResp;
  static deserializeBinaryFromReader(message: TAuthResp, reader: jspb.BinaryReader): TAuthResp;
}

export namespace TAuthResp {
  export type AsObject = {
    sessionid: string,
  }
}

export class TNewUserReq extends jspb.Message {
  getName(): string;
  setName(value: string): TNewUserReq;

  getEmail(): string;
  setEmail(value: string): TNewUserReq;

  getPwd(): string;
  setPwd(value: string): TNewUserReq;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TNewUserReq.AsObject;
  static toObject(includeInstance: boolean, msg: TNewUserReq): TNewUserReq.AsObject;
  static serializeBinaryToWriter(message: TNewUserReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TNewUserReq;
  static deserializeBinaryFromReader(message: TNewUserReq, reader: jspb.BinaryReader): TNewUserReq;
}

export namespace TNewUserReq {
  export type AsObject = {
    name: string,
    email: string,
    pwd: string,
  }
}

export class TAuthReq extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): TAuthReq;

  getPwd(): string;
  setPwd(value: string): TAuthReq;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TAuthReq.AsObject;
  static toObject(includeInstance: boolean, msg: TAuthReq): TAuthReq.AsObject;
  static serializeBinaryToWriter(message: TAuthReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TAuthReq;
  static deserializeBinaryFromReader(message: TAuthReq, reader: jspb.BinaryReader): TAuthReq;
}

export namespace TAuthReq {
  export type AsObject = {
    email: string,
    pwd: string,
  }
}

export class TAuthStatus extends jspb.Message {
  getIsauthorized(): boolean;
  setIsauthorized(value: boolean): TAuthStatus;

  getName(): string;
  setName(value: string): TAuthStatus;

  getEmail(): string;
  setEmail(value: string): TAuthStatus;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TAuthStatus.AsObject;
  static toObject(includeInstance: boolean, msg: TAuthStatus): TAuthStatus.AsObject;
  static serializeBinaryToWriter(message: TAuthStatus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TAuthStatus;
  static deserializeBinaryFromReader(message: TAuthStatus, reader: jspb.BinaryReader): TAuthStatus;
}

export namespace TAuthStatus {
  export type AsObject = {
    isauthorized: boolean,
    name: string,
    email: string,
  }
}

export class TUser extends jspb.Message {
  getId(): number;
  setId(value: number): TUser;

  getName(): string;
  setName(value: string): TUser;

  getEmail(): string;
  setEmail(value: string): TUser;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TUser.AsObject;
  static toObject(includeInstance: boolean, msg: TUser): TUser.AsObject;
  static serializeBinaryToWriter(message: TUser, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TUser;
  static deserializeBinaryFromReader(message: TUser, reader: jspb.BinaryReader): TUser;
}

export namespace TUser {
  export type AsObject = {
    id: number,
    name: string,
    email: string,
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

export class TCatalogTemplateList extends jspb.Message {
  getValueList(): Array<TCatalogTemplate>;
  setValueList(value: Array<TCatalogTemplate>): TCatalogTemplateList;
  clearValueList(): TCatalogTemplateList;
  addValue(value?: TCatalogTemplate, index?: number): TCatalogTemplate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TCatalogTemplateList.AsObject;
  static toObject(includeInstance: boolean, msg: TCatalogTemplateList): TCatalogTemplateList.AsObject;
  static serializeBinaryToWriter(message: TCatalogTemplateList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TCatalogTemplateList;
  static deserializeBinaryFromReader(message: TCatalogTemplateList, reader: jspb.BinaryReader): TCatalogTemplateList;
}

export namespace TCatalogTemplateList {
  export type AsObject = {
    valueList: Array<TCatalogTemplate.AsObject>,
  }
}

export class TCatalogTemplate extends jspb.Message {
  getId(): number;
  setId(value: number): TCatalogTemplate;

  getShopid(): number;
  setShopid(value: number): TCatalogTemplate;

  getName(): string;
  setName(value: string): TCatalogTemplate;

  getUniqueconditionList(): Array<string>;
  setUniqueconditionList(value: Array<string>): TCatalogTemplate;
  clearUniqueconditionList(): TCatalogTemplate;
  addUniquecondition(value: string, index?: number): TCatalogTemplate;

  getReferences(): TTplReferences | undefined;
  setReferences(value?: TTplReferences): TCatalogTemplate;
  hasReferences(): boolean;
  clearReferences(): TCatalogTemplate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TCatalogTemplate.AsObject;
  static toObject(includeInstance: boolean, msg: TCatalogTemplate): TCatalogTemplate.AsObject;
  static serializeBinaryToWriter(message: TCatalogTemplate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TCatalogTemplate;
  static deserializeBinaryFromReader(message: TCatalogTemplate, reader: jspb.BinaryReader): TCatalogTemplate;
}

export namespace TCatalogTemplate {
  export type AsObject = {
    id: number,
    shopid: number,
    name: string,
    uniqueconditionList: Array<string>,
    references?: TTplReferences.AsObject,
  }
}

export class TTplReferences extends jspb.Message {
  getName(): TTplCell | undefined;
  setName(value?: TTplCell): TTplReferences;
  hasName(): boolean;
  clearName(): TTplReferences;

  getArtnum(): TTplCell | undefined;
  setArtnum(value?: TTplCell): TTplReferences;
  hasArtnum(): boolean;
  clearArtnum(): TTplReferences;

  getPrice(): TTplCell | undefined;
  setPrice(value?: TTplCell): TTplReferences;
  hasPrice(): boolean;
  clearPrice(): TTplReferences;

  getCurrency(): TTplCell | undefined;
  setCurrency(value?: TTplCell): TTplReferences;
  hasCurrency(): boolean;
  clearCurrency(): TTplReferences;

  getQuantity(): TTplCell | undefined;
  setQuantity(value?: TTplCell): TTplReferences;
  hasQuantity(): boolean;
  clearQuantity(): TTplReferences;

  getUnit(): TTplCell | undefined;
  setUnit(value?: TTplCell): TTplReferences;
  hasUnit(): boolean;
  clearUnit(): TTplReferences;

  getDescription1(): TTplCell | undefined;
  setDescription1(value?: TTplCell): TTplReferences;
  hasDescription1(): boolean;
  clearDescription1(): TTplReferences;

  getDescription2(): TTplCell | undefined;
  setDescription2(value?: TTplCell): TTplReferences;
  hasDescription2(): boolean;
  clearDescription2(): TTplReferences;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TTplReferences.AsObject;
  static toObject(includeInstance: boolean, msg: TTplReferences): TTplReferences.AsObject;
  static serializeBinaryToWriter(message: TTplReferences, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TTplReferences;
  static deserializeBinaryFromReader(message: TTplReferences, reader: jspb.BinaryReader): TTplReferences;
}

export namespace TTplReferences {
  export type AsObject = {
    name?: TTplCell.AsObject,
    artnum?: TTplCell.AsObject,
    price?: TTplCell.AsObject,
    currency?: TTplCell.AsObject,
    quantity?: TTplCell.AsObject,
    unit?: TTplCell.AsObject,
    description1?: TTplCell.AsObject,
    description2?: TTplCell.AsObject,
  }
}

export class TTplCell extends jspb.Message {
  getName(): string;
  setName(value: string): TTplCell;

  getCol(): number;
  setCol(value: number): TTplCell;

  getRow(): number;
  setRow(value: number): TTplCell;

  getEnable(): boolean;
  setEnable(value: boolean): TTplCell;

  getNotnull(): boolean;
  setNotnull(value: boolean): TTplCell;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TTplCell.AsObject;
  static toObject(includeInstance: boolean, msg: TTplCell): TTplCell.AsObject;
  static serializeBinaryToWriter(message: TTplCell, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TTplCell;
  static deserializeBinaryFromReader(message: TTplCell, reader: jspb.BinaryReader): TTplCell;
}

export namespace TTplCell {
  export type AsObject = {
    name: string,
    col: number,
    row: number,
    enable: boolean,
    notnull: boolean,
  }
}

export class TCatalogData extends jspb.Message {
  getTemplate(): TCatalogTemplate | undefined;
  setTemplate(value?: TCatalogTemplate): TCatalogData;
  hasTemplate(): boolean;
  clearTemplate(): TCatalogData;

  getProductsList(): Array<TProduct>;
  setProductsList(value: Array<TProduct>): TCatalogData;
  clearProductsList(): TCatalogData;
  addProducts(value?: TProduct, index?: number): TProduct;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TCatalogData.AsObject;
  static toObject(includeInstance: boolean, msg: TCatalogData): TCatalogData.AsObject;
  static serializeBinaryToWriter(message: TCatalogData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TCatalogData;
  static deserializeBinaryFromReader(message: TCatalogData, reader: jspb.BinaryReader): TCatalogData;
}

export namespace TCatalogData {
  export type AsObject = {
    template?: TCatalogTemplate.AsObject,
    productsList: Array<TProduct.AsObject>,
  }
}

export class TUploadCatalogResp extends jspb.Message {
  getOk(): boolean;
  setOk(value: boolean): TUploadCatalogResp;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TUploadCatalogResp.AsObject;
  static toObject(includeInstance: boolean, msg: TUploadCatalogResp): TUploadCatalogResp.AsObject;
  static serializeBinaryToWriter(message: TUploadCatalogResp, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TUploadCatalogResp;
  static deserializeBinaryFromReader(message: TUploadCatalogResp, reader: jspb.BinaryReader): TUploadCatalogResp;
}

export namespace TUploadCatalogResp {
  export type AsObject = {
    ok: boolean,
  }
}

export class TAccountConfig extends jspb.Message {
  getUniqueconditionlistList(): Array<TUniqueCondition>;
  setUniqueconditionlistList(value: Array<TUniqueCondition>): TAccountConfig;
  clearUniqueconditionlistList(): TAccountConfig;
  addUniqueconditionlist(value?: TUniqueCondition, index?: number): TUniqueCondition;

  getProductfieldsList(): Array<TProductField>;
  setProductfieldsList(value: Array<TProductField>): TAccountConfig;
  clearProductfieldsList(): TAccountConfig;
  addProductfields(value?: TProductField, index?: number): TProductField;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TAccountConfig.AsObject;
  static toObject(includeInstance: boolean, msg: TAccountConfig): TAccountConfig.AsObject;
  static serializeBinaryToWriter(message: TAccountConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TAccountConfig;
  static deserializeBinaryFromReader(message: TAccountConfig, reader: jspb.BinaryReader): TAccountConfig;
}

export namespace TAccountConfig {
  export type AsObject = {
    uniqueconditionlistList: Array<TUniqueCondition.AsObject>,
    productfieldsList: Array<TProductField.AsObject>,
  }
}

export class TUniqueCondition extends jspb.Message {
  getFieldsList(): Array<string>;
  setFieldsList(value: Array<string>): TUniqueCondition;
  clearFieldsList(): TUniqueCondition;
  addFields(value: string, index?: number): TUniqueCondition;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TUniqueCondition.AsObject;
  static toObject(includeInstance: boolean, msg: TUniqueCondition): TUniqueCondition.AsObject;
  static serializeBinaryToWriter(message: TUniqueCondition, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TUniqueCondition;
  static deserializeBinaryFromReader(message: TUniqueCondition, reader: jspb.BinaryReader): TUniqueCondition;
}

export namespace TUniqueCondition {
  export type AsObject = {
    fieldsList: Array<string>,
  }
}

export class TProductField extends jspb.Message {
  getDbname(): string;
  setDbname(value: string): TProductField;

  getName(): string;
  setName(value: string): TProductField;

  getClassname(): string;
  setClassname(value: string): TProductField;

  getAsobjectname(): string;
  setAsobjectname(value: string): TProductField;

  getColor(): string;
  setColor(value: string): TProductField;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TProductField.AsObject;
  static toObject(includeInstance: boolean, msg: TProductField): TProductField.AsObject;
  static serializeBinaryToWriter(message: TProductField, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TProductField;
  static deserializeBinaryFromReader(message: TProductField, reader: jspb.BinaryReader): TProductField;
}

export namespace TProductField {
  export type AsObject = {
    dbname: string,
    name: string,
    classname: string,
    asobjectname: string,
    color: string,
  }
}

