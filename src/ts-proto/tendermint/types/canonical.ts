// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.7.0
//   protoc               v5.29.3
// source: tendermint/types/canonical.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { Timestamp } from "../../google/protobuf/timestamp";
import { SignedMsgType, signedMsgTypeFromJSON, signedMsgTypeToJSON } from "./types";

export const protobufPackage = "tendermint.types";

export interface CanonicalBlockID {
  hash: Uint8Array;
  partSetHeader?: CanonicalPartSetHeader | undefined;
}

export interface CanonicalPartSetHeader {
  total: number;
  hash: Uint8Array;
}

export interface CanonicalProposal {
  /** type alias for byte */
  type: SignedMsgType;
  /** canonicalization requires fixed size encoding here */
  height: Long;
  /** canonicalization requires fixed size encoding here */
  round: Long;
  polRound: Long;
  blockId?: CanonicalBlockID | undefined;
  timestamp?: Date | undefined;
  chainId: string;
}

export interface CanonicalVote {
  /** type alias for byte */
  type: SignedMsgType;
  /** canonicalization requires fixed size encoding here */
  height: Long;
  /** canonicalization requires fixed size encoding here */
  round: Long;
  blockId?: CanonicalBlockID | undefined;
  timestamp?: Date | undefined;
  chainId: string;
}

/**
 * CanonicalVoteExtension provides us a way to serialize a vote extension from
 * a particular validator such that we can sign over those serialized bytes.
 */
export interface CanonicalVoteExtension {
  extension: Uint8Array;
  height: Long;
  round: Long;
  chainId: string;
}

function createBaseCanonicalBlockID(): CanonicalBlockID {
  return { hash: new Uint8Array(0), partSetHeader: undefined };
}

export const CanonicalBlockID: MessageFns<CanonicalBlockID> = {
  encode(message: CanonicalBlockID, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.hash.length !== 0) {
      writer.uint32(10).bytes(message.hash);
    }
    if (message.partSetHeader !== undefined) {
      CanonicalPartSetHeader.encode(message.partSetHeader, writer.uint32(18).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): CanonicalBlockID {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCanonicalBlockID();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.hash = reader.bytes();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.partSetHeader = CanonicalPartSetHeader.decode(reader, reader.uint32());
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

  fromJSON(object: any): CanonicalBlockID {
    return {
      hash: isSet(object.hash) ? bytesFromBase64(object.hash) : new Uint8Array(0),
      partSetHeader: isSet(object.partSetHeader) ? CanonicalPartSetHeader.fromJSON(object.partSetHeader) : undefined,
    };
  },

  toJSON(message: CanonicalBlockID): unknown {
    const obj: any = {};
    if (message.hash.length !== 0) {
      obj.hash = base64FromBytes(message.hash);
    }
    if (message.partSetHeader !== undefined) {
      obj.partSetHeader = CanonicalPartSetHeader.toJSON(message.partSetHeader);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CanonicalBlockID>, I>>(base?: I): CanonicalBlockID {
    return CanonicalBlockID.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CanonicalBlockID>, I>>(object: I): CanonicalBlockID {
    const message = createBaseCanonicalBlockID();
    message.hash = object.hash ?? new Uint8Array(0);
    message.partSetHeader = (object.partSetHeader !== undefined && object.partSetHeader !== null)
      ? CanonicalPartSetHeader.fromPartial(object.partSetHeader)
      : undefined;
    return message;
  },
};

function createBaseCanonicalPartSetHeader(): CanonicalPartSetHeader {
  return { total: 0, hash: new Uint8Array(0) };
}

export const CanonicalPartSetHeader: MessageFns<CanonicalPartSetHeader> = {
  encode(message: CanonicalPartSetHeader, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.total !== 0) {
      writer.uint32(8).uint32(message.total);
    }
    if (message.hash.length !== 0) {
      writer.uint32(18).bytes(message.hash);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): CanonicalPartSetHeader {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCanonicalPartSetHeader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.total = reader.uint32();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.hash = reader.bytes();
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

  fromJSON(object: any): CanonicalPartSetHeader {
    return {
      total: isSet(object.total) ? globalThis.Number(object.total) : 0,
      hash: isSet(object.hash) ? bytesFromBase64(object.hash) : new Uint8Array(0),
    };
  },

  toJSON(message: CanonicalPartSetHeader): unknown {
    const obj: any = {};
    if (message.total !== 0) {
      obj.total = Math.round(message.total);
    }
    if (message.hash.length !== 0) {
      obj.hash = base64FromBytes(message.hash);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CanonicalPartSetHeader>, I>>(base?: I): CanonicalPartSetHeader {
    return CanonicalPartSetHeader.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CanonicalPartSetHeader>, I>>(object: I): CanonicalPartSetHeader {
    const message = createBaseCanonicalPartSetHeader();
    message.total = object.total ?? 0;
    message.hash = object.hash ?? new Uint8Array(0);
    return message;
  },
};

function createBaseCanonicalProposal(): CanonicalProposal {
  return {
    type: 0,
    height: Long.ZERO,
    round: Long.ZERO,
    polRound: Long.ZERO,
    blockId: undefined,
    timestamp: undefined,
    chainId: "",
  };
}

export const CanonicalProposal: MessageFns<CanonicalProposal> = {
  encode(message: CanonicalProposal, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (!message.height.equals(Long.ZERO)) {
      writer.uint32(17).sfixed64(message.height.toString());
    }
    if (!message.round.equals(Long.ZERO)) {
      writer.uint32(25).sfixed64(message.round.toString());
    }
    if (!message.polRound.equals(Long.ZERO)) {
      writer.uint32(32).int64(message.polRound.toString());
    }
    if (message.blockId !== undefined) {
      CanonicalBlockID.encode(message.blockId, writer.uint32(42).fork()).join();
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(50).fork()).join();
    }
    if (message.chainId !== "") {
      writer.uint32(58).string(message.chainId);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): CanonicalProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCanonicalProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        }
        case 2: {
          if (tag !== 17) {
            break;
          }

          message.height = Long.fromString(reader.sfixed64().toString());
          continue;
        }
        case 3: {
          if (tag !== 25) {
            break;
          }

          message.round = Long.fromString(reader.sfixed64().toString());
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }

          message.polRound = Long.fromString(reader.int64().toString());
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }

          message.blockId = CanonicalBlockID.decode(reader, reader.uint32());
          continue;
        }
        case 6: {
          if (tag !== 50) {
            break;
          }

          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        }
        case 7: {
          if (tag !== 58) {
            break;
          }

          message.chainId = reader.string();
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

  fromJSON(object: any): CanonicalProposal {
    return {
      type: isSet(object.type) ? signedMsgTypeFromJSON(object.type) : 0,
      height: isSet(object.height) ? Long.fromValue(object.height) : Long.ZERO,
      round: isSet(object.round) ? Long.fromValue(object.round) : Long.ZERO,
      polRound: isSet(object.polRound) ? Long.fromValue(object.polRound) : Long.ZERO,
      blockId: isSet(object.blockId) ? CanonicalBlockID.fromJSON(object.blockId) : undefined,
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
      chainId: isSet(object.chainId) ? globalThis.String(object.chainId) : "",
    };
  },

  toJSON(message: CanonicalProposal): unknown {
    const obj: any = {};
    if (message.type !== 0) {
      obj.type = signedMsgTypeToJSON(message.type);
    }
    if (!message.height.equals(Long.ZERO)) {
      obj.height = (message.height || Long.ZERO).toString();
    }
    if (!message.round.equals(Long.ZERO)) {
      obj.round = (message.round || Long.ZERO).toString();
    }
    if (!message.polRound.equals(Long.ZERO)) {
      obj.polRound = (message.polRound || Long.ZERO).toString();
    }
    if (message.blockId !== undefined) {
      obj.blockId = CanonicalBlockID.toJSON(message.blockId);
    }
    if (message.timestamp !== undefined) {
      obj.timestamp = message.timestamp.toISOString();
    }
    if (message.chainId !== "") {
      obj.chainId = message.chainId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CanonicalProposal>, I>>(base?: I): CanonicalProposal {
    return CanonicalProposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CanonicalProposal>, I>>(object: I): CanonicalProposal {
    const message = createBaseCanonicalProposal();
    message.type = object.type ?? 0;
    message.height = (object.height !== undefined && object.height !== null)
      ? Long.fromValue(object.height)
      : Long.ZERO;
    message.round = (object.round !== undefined && object.round !== null) ? Long.fromValue(object.round) : Long.ZERO;
    message.polRound = (object.polRound !== undefined && object.polRound !== null)
      ? Long.fromValue(object.polRound)
      : Long.ZERO;
    message.blockId = (object.blockId !== undefined && object.blockId !== null)
      ? CanonicalBlockID.fromPartial(object.blockId)
      : undefined;
    message.timestamp = object.timestamp ?? undefined;
    message.chainId = object.chainId ?? "";
    return message;
  },
};

function createBaseCanonicalVote(): CanonicalVote {
  return { type: 0, height: Long.ZERO, round: Long.ZERO, blockId: undefined, timestamp: undefined, chainId: "" };
}

export const CanonicalVote: MessageFns<CanonicalVote> = {
  encode(message: CanonicalVote, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (!message.height.equals(Long.ZERO)) {
      writer.uint32(17).sfixed64(message.height.toString());
    }
    if (!message.round.equals(Long.ZERO)) {
      writer.uint32(25).sfixed64(message.round.toString());
    }
    if (message.blockId !== undefined) {
      CanonicalBlockID.encode(message.blockId, writer.uint32(34).fork()).join();
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(42).fork()).join();
    }
    if (message.chainId !== "") {
      writer.uint32(50).string(message.chainId);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): CanonicalVote {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCanonicalVote();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        }
        case 2: {
          if (tag !== 17) {
            break;
          }

          message.height = Long.fromString(reader.sfixed64().toString());
          continue;
        }
        case 3: {
          if (tag !== 25) {
            break;
          }

          message.round = Long.fromString(reader.sfixed64().toString());
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.blockId = CanonicalBlockID.decode(reader, reader.uint32());
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }

          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        }
        case 6: {
          if (tag !== 50) {
            break;
          }

          message.chainId = reader.string();
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

  fromJSON(object: any): CanonicalVote {
    return {
      type: isSet(object.type) ? signedMsgTypeFromJSON(object.type) : 0,
      height: isSet(object.height) ? Long.fromValue(object.height) : Long.ZERO,
      round: isSet(object.round) ? Long.fromValue(object.round) : Long.ZERO,
      blockId: isSet(object.blockId) ? CanonicalBlockID.fromJSON(object.blockId) : undefined,
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
      chainId: isSet(object.chainId) ? globalThis.String(object.chainId) : "",
    };
  },

  toJSON(message: CanonicalVote): unknown {
    const obj: any = {};
    if (message.type !== 0) {
      obj.type = signedMsgTypeToJSON(message.type);
    }
    if (!message.height.equals(Long.ZERO)) {
      obj.height = (message.height || Long.ZERO).toString();
    }
    if (!message.round.equals(Long.ZERO)) {
      obj.round = (message.round || Long.ZERO).toString();
    }
    if (message.blockId !== undefined) {
      obj.blockId = CanonicalBlockID.toJSON(message.blockId);
    }
    if (message.timestamp !== undefined) {
      obj.timestamp = message.timestamp.toISOString();
    }
    if (message.chainId !== "") {
      obj.chainId = message.chainId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CanonicalVote>, I>>(base?: I): CanonicalVote {
    return CanonicalVote.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CanonicalVote>, I>>(object: I): CanonicalVote {
    const message = createBaseCanonicalVote();
    message.type = object.type ?? 0;
    message.height = (object.height !== undefined && object.height !== null)
      ? Long.fromValue(object.height)
      : Long.ZERO;
    message.round = (object.round !== undefined && object.round !== null) ? Long.fromValue(object.round) : Long.ZERO;
    message.blockId = (object.blockId !== undefined && object.blockId !== null)
      ? CanonicalBlockID.fromPartial(object.blockId)
      : undefined;
    message.timestamp = object.timestamp ?? undefined;
    message.chainId = object.chainId ?? "";
    return message;
  },
};

function createBaseCanonicalVoteExtension(): CanonicalVoteExtension {
  return { extension: new Uint8Array(0), height: Long.ZERO, round: Long.ZERO, chainId: "" };
}

export const CanonicalVoteExtension: MessageFns<CanonicalVoteExtension> = {
  encode(message: CanonicalVoteExtension, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.extension.length !== 0) {
      writer.uint32(10).bytes(message.extension);
    }
    if (!message.height.equals(Long.ZERO)) {
      writer.uint32(17).sfixed64(message.height.toString());
    }
    if (!message.round.equals(Long.ZERO)) {
      writer.uint32(25).sfixed64(message.round.toString());
    }
    if (message.chainId !== "") {
      writer.uint32(34).string(message.chainId);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): CanonicalVoteExtension {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCanonicalVoteExtension();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.extension = reader.bytes();
          continue;
        }
        case 2: {
          if (tag !== 17) {
            break;
          }

          message.height = Long.fromString(reader.sfixed64().toString());
          continue;
        }
        case 3: {
          if (tag !== 25) {
            break;
          }

          message.round = Long.fromString(reader.sfixed64().toString());
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.chainId = reader.string();
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

  fromJSON(object: any): CanonicalVoteExtension {
    return {
      extension: isSet(object.extension) ? bytesFromBase64(object.extension) : new Uint8Array(0),
      height: isSet(object.height) ? Long.fromValue(object.height) : Long.ZERO,
      round: isSet(object.round) ? Long.fromValue(object.round) : Long.ZERO,
      chainId: isSet(object.chainId) ? globalThis.String(object.chainId) : "",
    };
  },

  toJSON(message: CanonicalVoteExtension): unknown {
    const obj: any = {};
    if (message.extension.length !== 0) {
      obj.extension = base64FromBytes(message.extension);
    }
    if (!message.height.equals(Long.ZERO)) {
      obj.height = (message.height || Long.ZERO).toString();
    }
    if (!message.round.equals(Long.ZERO)) {
      obj.round = (message.round || Long.ZERO).toString();
    }
    if (message.chainId !== "") {
      obj.chainId = message.chainId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CanonicalVoteExtension>, I>>(base?: I): CanonicalVoteExtension {
    return CanonicalVoteExtension.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CanonicalVoteExtension>, I>>(object: I): CanonicalVoteExtension {
    const message = createBaseCanonicalVoteExtension();
    message.extension = object.extension ?? new Uint8Array(0);
    message.height = (object.height !== undefined && object.height !== null)
      ? Long.fromValue(object.height)
      : Long.ZERO;
    message.round = (object.round !== undefined && object.round !== null) ? Long.fromValue(object.round) : Long.ZERO;
    message.chainId = object.chainId ?? "";
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

function toTimestamp(date: Date): Timestamp {
  const seconds = numberToLong(Math.trunc(date.getTime() / 1_000));
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds.toNumber() || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new globalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new globalThis.Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function numberToLong(number: number) {
  return Long.fromNumber(number);
}

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
