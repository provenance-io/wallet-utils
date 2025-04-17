// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.7.0
//   protoc               v5.29.3
// source: tendermint/libs/bits/types.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";

export const protobufPackage = "tendermint.libs.bits";

export interface BitArray {
  bits: Long;
  elems: Long[];
}

function createBaseBitArray(): BitArray {
  return { bits: Long.ZERO, elems: [] };
}

export const BitArray: MessageFns<BitArray> = {
  encode(message: BitArray, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (!message.bits.equals(Long.ZERO)) {
      writer.uint32(8).int64(message.bits.toString());
    }
    writer.uint32(18).fork();
    for (const v of message.elems) {
      writer.uint64(v.toString());
    }
    writer.join();
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): BitArray {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBitArray();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.bits = Long.fromString(reader.int64().toString());
          continue;
        }
        case 2: {
          if (tag === 16) {
            message.elems.push(Long.fromString(reader.uint64().toString(), true));

            continue;
          }

          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.elems.push(Long.fromString(reader.uint64().toString(), true));
            }

            continue;
          }

          break;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BitArray {
    return {
      bits: isSet(object.bits) ? Long.fromValue(object.bits) : Long.ZERO,
      elems: globalThis.Array.isArray(object?.elems) ? object.elems.map((e: any) => Long.fromValue(e)) : [],
    };
  },

  toJSON(message: BitArray): unknown {
    const obj: any = {};
    if (!message.bits.equals(Long.ZERO)) {
      obj.bits = (message.bits || Long.ZERO).toString();
    }
    if (message.elems?.length) {
      obj.elems = message.elems.map((e) => (e || Long.UZERO).toString());
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BitArray>, I>>(base?: I): BitArray {
    return BitArray.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BitArray>, I>>(object: I): BitArray {
    const message = createBaseBitArray();
    message.bits = (object.bits !== undefined && object.bits !== null) ? Long.fromValue(object.bits) : Long.ZERO;
    message.elems = object.elems?.map((e) => Long.fromValue(e)) || [];
    return message;
  },
};

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
