// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.7.0
//   protoc               v5.29.3
// source: provenance/name/v1/tx.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { NameRecord, Params } from "./name";

export const protobufPackage = "provenance.name.v1";

/**
 * MsgBindNameRequest defines an sdk.Msg type that is used to add an address/name binding under an optional parent name.
 * The record may optionally be restricted to prevent additional names from being added under this one without the
 * owner signing the request.
 */
export interface MsgBindNameRequest {
  /** The parent record to bind this name under. */
  parent?:
    | NameRecord
    | undefined;
  /** The name record to bind under the parent */
  record?: NameRecord | undefined;
}

/** MsgBindNameResponse defines the Msg/BindName response type. */
export interface MsgBindNameResponse {
}

/**
 * MsgDeleteNameRequest defines an sdk.Msg type that is used to remove an existing address/name binding.  The binding
 * may not have any child names currently bound for this request to be successful. All associated attributes on account
 * addresses will be deleted.
 */
export interface MsgDeleteNameRequest {
  /** The record being removed */
  record?: NameRecord | undefined;
}

/** MsgDeleteNameResponse defines the Msg/DeleteName response type. */
export interface MsgDeleteNameResponse {
}

/**
 * MsgCreateRootNameRequest defines an sdk.Msg type to create a new root name
 * that is controlled by a given owner and optionally restricted to the owner
 * for the sole creation of sub names.
 */
export interface MsgCreateRootNameRequest {
  /** The signing authority for the request */
  authority: string;
  /** NameRecord is a structure used to bind ownership of a name hierarchy to a collection of addresses */
  record?: NameRecord | undefined;
}

/** MsgCreateRootNameResponse defines Msg/CreateRootName response type. */
export interface MsgCreateRootNameResponse {
}

/** MsgModifyNameRequest defines a governance method that is used to update an existing address/name binding. */
export interface MsgModifyNameRequest {
  /** The address signing the message */
  authority: string;
  /** The record being updated */
  record?: NameRecord | undefined;
}

/** MsgModifyNameResponse defines the Msg/ModifyName response type. */
export interface MsgModifyNameResponse {
}

/** MsgUpdateParamsRequest is a request message for the UpdateParams endpoint. */
export interface MsgUpdateParamsRequest {
  /** authority should be the governance module account address. */
  authority: string;
  /** params are the new param values to set. */
  params?: Params | undefined;
}

/** MsgUpdateParamsResponse is a response message for the UpdateParams endpoint. */
export interface MsgUpdateParamsResponse {
}

function createBaseMsgBindNameRequest(): MsgBindNameRequest {
  return { parent: undefined, record: undefined };
}

export const MsgBindNameRequest: MessageFns<MsgBindNameRequest> = {
  encode(message: MsgBindNameRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.parent !== undefined) {
      NameRecord.encode(message.parent, writer.uint32(10).fork()).join();
    }
    if (message.record !== undefined) {
      NameRecord.encode(message.record, writer.uint32(18).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgBindNameRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBindNameRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.parent = NameRecord.decode(reader, reader.uint32());
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.record = NameRecord.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgBindNameRequest {
    return {
      parent: isSet(object.parent) ? NameRecord.fromJSON(object.parent) : undefined,
      record: isSet(object.record) ? NameRecord.fromJSON(object.record) : undefined,
    };
  },

  toJSON(message: MsgBindNameRequest): unknown {
    const obj: any = {};
    if (message.parent !== undefined) {
      obj.parent = NameRecord.toJSON(message.parent);
    }
    if (message.record !== undefined) {
      obj.record = NameRecord.toJSON(message.record);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgBindNameRequest>, I>>(base?: I): MsgBindNameRequest {
    return MsgBindNameRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgBindNameRequest>, I>>(object: I): MsgBindNameRequest {
    const message = createBaseMsgBindNameRequest();
    message.parent = (object.parent !== undefined && object.parent !== null)
      ? NameRecord.fromPartial(object.parent)
      : undefined;
    message.record = (object.record !== undefined && object.record !== null)
      ? NameRecord.fromPartial(object.record)
      : undefined;
    return message;
  },
};

function createBaseMsgBindNameResponse(): MsgBindNameResponse {
  return {};
}

export const MsgBindNameResponse: MessageFns<MsgBindNameResponse> = {
  encode(_: MsgBindNameResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgBindNameResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBindNameResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgBindNameResponse {
    return {};
  },

  toJSON(_: MsgBindNameResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgBindNameResponse>, I>>(base?: I): MsgBindNameResponse {
    return MsgBindNameResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgBindNameResponse>, I>>(_: I): MsgBindNameResponse {
    const message = createBaseMsgBindNameResponse();
    return message;
  },
};

function createBaseMsgDeleteNameRequest(): MsgDeleteNameRequest {
  return { record: undefined };
}

export const MsgDeleteNameRequest: MessageFns<MsgDeleteNameRequest> = {
  encode(message: MsgDeleteNameRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.record !== undefined) {
      NameRecord.encode(message.record, writer.uint32(10).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgDeleteNameRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteNameRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.record = NameRecord.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteNameRequest {
    return { record: isSet(object.record) ? NameRecord.fromJSON(object.record) : undefined };
  },

  toJSON(message: MsgDeleteNameRequest): unknown {
    const obj: any = {};
    if (message.record !== undefined) {
      obj.record = NameRecord.toJSON(message.record);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgDeleteNameRequest>, I>>(base?: I): MsgDeleteNameRequest {
    return MsgDeleteNameRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgDeleteNameRequest>, I>>(object: I): MsgDeleteNameRequest {
    const message = createBaseMsgDeleteNameRequest();
    message.record = (object.record !== undefined && object.record !== null)
      ? NameRecord.fromPartial(object.record)
      : undefined;
    return message;
  },
};

function createBaseMsgDeleteNameResponse(): MsgDeleteNameResponse {
  return {};
}

export const MsgDeleteNameResponse: MessageFns<MsgDeleteNameResponse> = {
  encode(_: MsgDeleteNameResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgDeleteNameResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteNameResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgDeleteNameResponse {
    return {};
  },

  toJSON(_: MsgDeleteNameResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgDeleteNameResponse>, I>>(base?: I): MsgDeleteNameResponse {
    return MsgDeleteNameResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgDeleteNameResponse>, I>>(_: I): MsgDeleteNameResponse {
    const message = createBaseMsgDeleteNameResponse();
    return message;
  },
};

function createBaseMsgCreateRootNameRequest(): MsgCreateRootNameRequest {
  return { authority: "", record: undefined };
}

export const MsgCreateRootNameRequest: MessageFns<MsgCreateRootNameRequest> = {
  encode(message: MsgCreateRootNameRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.record !== undefined) {
      NameRecord.encode(message.record, writer.uint32(18).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateRootNameRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateRootNameRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.authority = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.record = NameRecord.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreateRootNameRequest {
    return {
      authority: isSet(object.authority) ? globalThis.String(object.authority) : "",
      record: isSet(object.record) ? NameRecord.fromJSON(object.record) : undefined,
    };
  },

  toJSON(message: MsgCreateRootNameRequest): unknown {
    const obj: any = {};
    if (message.authority !== "") {
      obj.authority = message.authority;
    }
    if (message.record !== undefined) {
      obj.record = NameRecord.toJSON(message.record);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateRootNameRequest>, I>>(base?: I): MsgCreateRootNameRequest {
    return MsgCreateRootNameRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateRootNameRequest>, I>>(object: I): MsgCreateRootNameRequest {
    const message = createBaseMsgCreateRootNameRequest();
    message.authority = object.authority ?? "";
    message.record = (object.record !== undefined && object.record !== null)
      ? NameRecord.fromPartial(object.record)
      : undefined;
    return message;
  },
};

function createBaseMsgCreateRootNameResponse(): MsgCreateRootNameResponse {
  return {};
}

export const MsgCreateRootNameResponse: MessageFns<MsgCreateRootNameResponse> = {
  encode(_: MsgCreateRootNameResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateRootNameResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateRootNameResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgCreateRootNameResponse {
    return {};
  },

  toJSON(_: MsgCreateRootNameResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateRootNameResponse>, I>>(base?: I): MsgCreateRootNameResponse {
    return MsgCreateRootNameResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateRootNameResponse>, I>>(_: I): MsgCreateRootNameResponse {
    const message = createBaseMsgCreateRootNameResponse();
    return message;
  },
};

function createBaseMsgModifyNameRequest(): MsgModifyNameRequest {
  return { authority: "", record: undefined };
}

export const MsgModifyNameRequest: MessageFns<MsgModifyNameRequest> = {
  encode(message: MsgModifyNameRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.record !== undefined) {
      NameRecord.encode(message.record, writer.uint32(18).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgModifyNameRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgModifyNameRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.authority = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.record = NameRecord.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgModifyNameRequest {
    return {
      authority: isSet(object.authority) ? globalThis.String(object.authority) : "",
      record: isSet(object.record) ? NameRecord.fromJSON(object.record) : undefined,
    };
  },

  toJSON(message: MsgModifyNameRequest): unknown {
    const obj: any = {};
    if (message.authority !== "") {
      obj.authority = message.authority;
    }
    if (message.record !== undefined) {
      obj.record = NameRecord.toJSON(message.record);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgModifyNameRequest>, I>>(base?: I): MsgModifyNameRequest {
    return MsgModifyNameRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgModifyNameRequest>, I>>(object: I): MsgModifyNameRequest {
    const message = createBaseMsgModifyNameRequest();
    message.authority = object.authority ?? "";
    message.record = (object.record !== undefined && object.record !== null)
      ? NameRecord.fromPartial(object.record)
      : undefined;
    return message;
  },
};

function createBaseMsgModifyNameResponse(): MsgModifyNameResponse {
  return {};
}

export const MsgModifyNameResponse: MessageFns<MsgModifyNameResponse> = {
  encode(_: MsgModifyNameResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgModifyNameResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgModifyNameResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgModifyNameResponse {
    return {};
  },

  toJSON(_: MsgModifyNameResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgModifyNameResponse>, I>>(base?: I): MsgModifyNameResponse {
    return MsgModifyNameResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgModifyNameResponse>, I>>(_: I): MsgModifyNameResponse {
    const message = createBaseMsgModifyNameResponse();
    return message;
  },
};

function createBaseMsgUpdateParamsRequest(): MsgUpdateParamsRequest {
  return { authority: "", params: undefined };
}

export const MsgUpdateParamsRequest: MessageFns<MsgUpdateParamsRequest> = {
  encode(message: MsgUpdateParamsRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.authority = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.params = Params.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateParamsRequest {
    return {
      authority: isSet(object.authority) ? globalThis.String(object.authority) : "",
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: MsgUpdateParamsRequest): unknown {
    const obj: any = {};
    if (message.authority !== "") {
      obj.authority = message.authority;
    }
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateParamsRequest>, I>>(base?: I): MsgUpdateParamsRequest {
    return MsgUpdateParamsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateParamsRequest>, I>>(object: I): MsgUpdateParamsRequest {
    const message = createBaseMsgUpdateParamsRequest();
    message.authority = object.authority ?? "";
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}

export const MsgUpdateParamsResponse: MessageFns<MsgUpdateParamsResponse> = {
  encode(_: MsgUpdateParamsResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateParamsResponse {
    return {};
  },

  toJSON(_: MsgUpdateParamsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateParamsResponse>, I>>(base?: I): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateParamsResponse>, I>>(_: I): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
};

/** Msg defines the bank Msg service. */
export interface Msg {
  /** BindName binds a name to an address under a root name. */
  BindName(request: MsgBindNameRequest): Promise<MsgBindNameResponse>;
  /** DeleteName defines a method to verify a particular invariance. */
  DeleteName(request: MsgDeleteNameRequest): Promise<MsgDeleteNameResponse>;
  /** ModifyName defines a method to modify the attributes of an existing name. */
  ModifyName(request: MsgModifyNameRequest): Promise<MsgModifyNameResponse>;
  /** CreateRootName defines a governance method for creating a root name. */
  CreateRootName(request: MsgCreateRootNameRequest): Promise<MsgCreateRootNameResponse>;
  /** UpdateParams is a governance proposal endpoint for updating the name module's params. */
  UpdateParams(request: MsgUpdateParamsRequest): Promise<MsgUpdateParamsResponse>;
}

export const MsgServiceName = "provenance.name.v1.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.BindName = this.BindName.bind(this);
    this.DeleteName = this.DeleteName.bind(this);
    this.ModifyName = this.ModifyName.bind(this);
    this.CreateRootName = this.CreateRootName.bind(this);
    this.UpdateParams = this.UpdateParams.bind(this);
  }
  BindName(request: MsgBindNameRequest): Promise<MsgBindNameResponse> {
    const data = MsgBindNameRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "BindName", data);
    return promise.then((data) => MsgBindNameResponse.decode(new BinaryReader(data)));
  }

  DeleteName(request: MsgDeleteNameRequest): Promise<MsgDeleteNameResponse> {
    const data = MsgDeleteNameRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DeleteName", data);
    return promise.then((data) => MsgDeleteNameResponse.decode(new BinaryReader(data)));
  }

  ModifyName(request: MsgModifyNameRequest): Promise<MsgModifyNameResponse> {
    const data = MsgModifyNameRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ModifyName", data);
    return promise.then((data) => MsgModifyNameResponse.decode(new BinaryReader(data)));
  }

  CreateRootName(request: MsgCreateRootNameRequest): Promise<MsgCreateRootNameResponse> {
    const data = MsgCreateRootNameRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateRootName", data);
    return promise.then((data) => MsgCreateRootNameResponse.decode(new BinaryReader(data)));
  }

  UpdateParams(request: MsgUpdateParamsRequest): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateParams", data);
    return promise.then((data) => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
  fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
