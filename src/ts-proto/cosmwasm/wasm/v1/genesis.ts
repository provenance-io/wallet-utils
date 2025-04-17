// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.7.0
//   protoc               v5.29.3
// source: cosmwasm/wasm/v1/genesis.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { CodeInfo, ContractCodeHistoryEntry, ContractInfo, Model, Params } from "./types";

export const protobufPackage = "cosmwasm.wasm.v1";

/** GenesisState - genesis state of x/wasm */
export interface GenesisState {
  params?: Params | undefined;
  codes: Code[];
  contracts: Contract[];
  sequences: Sequence[];
}

/** Code struct encompasses CodeInfo and CodeBytes */
export interface Code {
  codeId: Long;
  codeInfo?: CodeInfo | undefined;
  codeBytes: Uint8Array;
  /** Pinned to wasmvm cache */
  pinned: boolean;
}

/** Contract struct encompasses ContractAddress, ContractInfo, and ContractState */
export interface Contract {
  contractAddress: string;
  contractInfo?: ContractInfo | undefined;
  contractState: Model[];
  contractCodeHistory: ContractCodeHistoryEntry[];
}

/** Sequence key and value of an id generation counter */
export interface Sequence {
  idKey: Uint8Array;
  value: Long;
}

function createBaseGenesisState(): GenesisState {
  return { params: undefined, codes: [], contracts: [], sequences: [] };
}

export const GenesisState: MessageFns<GenesisState> = {
  encode(message: GenesisState, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).join();
    }
    for (const v of message.codes) {
      Code.encode(v!, writer.uint32(18).fork()).join();
    }
    for (const v of message.contracts) {
      Contract.encode(v!, writer.uint32(26).fork()).join();
    }
    for (const v of message.sequences) {
      Sequence.encode(v!, writer.uint32(34).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.params = Params.decode(reader, reader.uint32());
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.codes.push(Code.decode(reader, reader.uint32()));
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.contracts.push(Contract.decode(reader, reader.uint32()));
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.sequences.push(Sequence.decode(reader, reader.uint32()));
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

  fromJSON(object: any): GenesisState {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      codes: globalThis.Array.isArray(object?.codes) ? object.codes.map((e: any) => Code.fromJSON(e)) : [],
      contracts: globalThis.Array.isArray(object?.contracts)
        ? object.contracts.map((e: any) => Contract.fromJSON(e))
        : [],
      sequences: globalThis.Array.isArray(object?.sequences)
        ? object.sequences.map((e: any) => Sequence.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    if (message.codes?.length) {
      obj.codes = message.codes.map((e) => Code.toJSON(e));
    }
    if (message.contracts?.length) {
      obj.contracts = message.contracts.map((e) => Contract.toJSON(e));
    }
    if (message.sequences?.length) {
      obj.sequences = message.sequences.map((e) => Sequence.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState>, I>>(base?: I): GenesisState {
    return GenesisState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    message.codes = object.codes?.map((e) => Code.fromPartial(e)) || [];
    message.contracts = object.contracts?.map((e) => Contract.fromPartial(e)) || [];
    message.sequences = object.sequences?.map((e) => Sequence.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCode(): Code {
  return { codeId: Long.UZERO, codeInfo: undefined, codeBytes: new Uint8Array(0), pinned: false };
}

export const Code: MessageFns<Code> = {
  encode(message: Code, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (!message.codeId.equals(Long.UZERO)) {
      writer.uint32(8).uint64(message.codeId.toString());
    }
    if (message.codeInfo !== undefined) {
      CodeInfo.encode(message.codeInfo, writer.uint32(18).fork()).join();
    }
    if (message.codeBytes.length !== 0) {
      writer.uint32(26).bytes(message.codeBytes);
    }
    if (message.pinned !== false) {
      writer.uint32(32).bool(message.pinned);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Code {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.codeId = Long.fromString(reader.uint64().toString(), true);
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.codeInfo = CodeInfo.decode(reader, reader.uint32());
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.codeBytes = reader.bytes();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }

          message.pinned = reader.bool();
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

  fromJSON(object: any): Code {
    return {
      codeId: isSet(object.codeId) ? Long.fromValue(object.codeId) : Long.UZERO,
      codeInfo: isSet(object.codeInfo) ? CodeInfo.fromJSON(object.codeInfo) : undefined,
      codeBytes: isSet(object.codeBytes) ? bytesFromBase64(object.codeBytes) : new Uint8Array(0),
      pinned: isSet(object.pinned) ? globalThis.Boolean(object.pinned) : false,
    };
  },

  toJSON(message: Code): unknown {
    const obj: any = {};
    if (!message.codeId.equals(Long.UZERO)) {
      obj.codeId = (message.codeId || Long.UZERO).toString();
    }
    if (message.codeInfo !== undefined) {
      obj.codeInfo = CodeInfo.toJSON(message.codeInfo);
    }
    if (message.codeBytes.length !== 0) {
      obj.codeBytes = base64FromBytes(message.codeBytes);
    }
    if (message.pinned !== false) {
      obj.pinned = message.pinned;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Code>, I>>(base?: I): Code {
    return Code.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Code>, I>>(object: I): Code {
    const message = createBaseCode();
    message.codeId = (object.codeId !== undefined && object.codeId !== null)
      ? Long.fromValue(object.codeId)
      : Long.UZERO;
    message.codeInfo = (object.codeInfo !== undefined && object.codeInfo !== null)
      ? CodeInfo.fromPartial(object.codeInfo)
      : undefined;
    message.codeBytes = object.codeBytes ?? new Uint8Array(0);
    message.pinned = object.pinned ?? false;
    return message;
  },
};

function createBaseContract(): Contract {
  return { contractAddress: "", contractInfo: undefined, contractState: [], contractCodeHistory: [] };
}

export const Contract: MessageFns<Contract> = {
  encode(message: Contract, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.contractAddress !== "") {
      writer.uint32(10).string(message.contractAddress);
    }
    if (message.contractInfo !== undefined) {
      ContractInfo.encode(message.contractInfo, writer.uint32(18).fork()).join();
    }
    for (const v of message.contractState) {
      Model.encode(v!, writer.uint32(26).fork()).join();
    }
    for (const v of message.contractCodeHistory) {
      ContractCodeHistoryEntry.encode(v!, writer.uint32(34).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Contract {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContract();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.contractAddress = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.contractInfo = ContractInfo.decode(reader, reader.uint32());
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.contractState.push(Model.decode(reader, reader.uint32()));
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.contractCodeHistory.push(ContractCodeHistoryEntry.decode(reader, reader.uint32()));
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

  fromJSON(object: any): Contract {
    return {
      contractAddress: isSet(object.contractAddress) ? globalThis.String(object.contractAddress) : "",
      contractInfo: isSet(object.contractInfo) ? ContractInfo.fromJSON(object.contractInfo) : undefined,
      contractState: globalThis.Array.isArray(object?.contractState)
        ? object.contractState.map((e: any) => Model.fromJSON(e))
        : [],
      contractCodeHistory: globalThis.Array.isArray(object?.contractCodeHistory)
        ? object.contractCodeHistory.map((e: any) => ContractCodeHistoryEntry.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Contract): unknown {
    const obj: any = {};
    if (message.contractAddress !== "") {
      obj.contractAddress = message.contractAddress;
    }
    if (message.contractInfo !== undefined) {
      obj.contractInfo = ContractInfo.toJSON(message.contractInfo);
    }
    if (message.contractState?.length) {
      obj.contractState = message.contractState.map((e) => Model.toJSON(e));
    }
    if (message.contractCodeHistory?.length) {
      obj.contractCodeHistory = message.contractCodeHistory.map((e) => ContractCodeHistoryEntry.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Contract>, I>>(base?: I): Contract {
    return Contract.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Contract>, I>>(object: I): Contract {
    const message = createBaseContract();
    message.contractAddress = object.contractAddress ?? "";
    message.contractInfo = (object.contractInfo !== undefined && object.contractInfo !== null)
      ? ContractInfo.fromPartial(object.contractInfo)
      : undefined;
    message.contractState = object.contractState?.map((e) => Model.fromPartial(e)) || [];
    message.contractCodeHistory = object.contractCodeHistory?.map((e) => ContractCodeHistoryEntry.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSequence(): Sequence {
  return { idKey: new Uint8Array(0), value: Long.UZERO };
}

export const Sequence: MessageFns<Sequence> = {
  encode(message: Sequence, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.idKey.length !== 0) {
      writer.uint32(10).bytes(message.idKey);
    }
    if (!message.value.equals(Long.UZERO)) {
      writer.uint32(16).uint64(message.value.toString());
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Sequence {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSequence();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.idKey = reader.bytes();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }

          message.value = Long.fromString(reader.uint64().toString(), true);
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

  fromJSON(object: any): Sequence {
    return {
      idKey: isSet(object.idKey) ? bytesFromBase64(object.idKey) : new Uint8Array(0),
      value: isSet(object.value) ? Long.fromValue(object.value) : Long.UZERO,
    };
  },

  toJSON(message: Sequence): unknown {
    const obj: any = {};
    if (message.idKey.length !== 0) {
      obj.idKey = base64FromBytes(message.idKey);
    }
    if (!message.value.equals(Long.UZERO)) {
      obj.value = (message.value || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Sequence>, I>>(base?: I): Sequence {
    return Sequence.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Sequence>, I>>(object: I): Sequence {
    const message = createBaseSequence();
    message.idKey = object.idKey ?? new Uint8Array(0);
    message.value = (object.value !== undefined && object.value !== null) ? Long.fromValue(object.value) : Long.UZERO;
    return message;
  },
};

function bytesFromBase64(b64: string): Uint8Array {
  if ((globalThis as any).Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if ((globalThis as any).Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
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
