// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.7.0
//   protoc               v5.29.3
// source: provenance/msgfees/v1/msgfees.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { Coin } from "../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "provenance.msgfees.v1";

/** Params defines the set of params for the msgfees module. */
export interface Params {
  /**
   * floor_gas_price is the constant used to calculate fees when gas fees shares denom with msg fee.
   *
   * Conversions:
   *   - x nhash/usd-mil = 1,000,000/x usd/hash
   *   - y usd/hash = 1,000,000/y nhash/usd-mil
   *
   * Examples:
   *   - 40,000,000 nhash/usd-mil = 1,000,000/40,000,000 usd/hash = $0.025/hash,
   *   - $0.040/hash = 1,000,000/0.040 nhash/usd-mil = 25,000,000 nhash/usd-mil
   */
  floorGasPrice?:
    | Coin
    | undefined;
  /** nhash_per_usd_mil is the total nhash per usd mil for converting usd to nhash. */
  nhashPerUsdMil: Long;
  /** conversion_fee_denom is the denom usd is converted to. */
  conversionFeeDenom: string;
}

/** MsgFee is the core of what gets stored on the blockchain to define a msg-based fee. */
export interface MsgFee {
  /** msg_type_url is the type-url of the message with the added fee, e.g. "/cosmos.bank.v1beta1.MsgSend". */
  msgTypeUrl: string;
  /** additional_fee is the extra fee that is required for the given message type (can be in any denom). */
  additionalFee?:
    | Coin
    | undefined;
  /**
   * recipient is an option address that will receive a portion of the additional fee.
   * There can only be a recipient if the recipient_basis_points is not zero.
   */
  recipient: string;
  /**
   * recipient_basis_points is an optional portion of the additional fee to be sent to the recipient.
   * Must be between 0 and 10,000 (inclusive).
   *
   * If there is a recipient, this must not be zero. If there is not a recipient, this must be zero.
   *
   * The recipient will receive additional_fee * recipient_basis_points / 10,000.
   * The fee collector will receive the rest, i.e. additional_fee * (10,000 - recipient_basis_points) / 10,000.
   */
  recipientBasisPoints: number;
}

/** EventMsgFee final event property for msg fee on type */
export interface EventMsgFee {
  msgType: string;
  count: string;
  total: string;
  recipient: string;
}

/** EventMsgFees event emitted with summary of msg fees */
export interface EventMsgFees {
  msgFees: EventMsgFee[];
}

function createBaseParams(): Params {
  return { floorGasPrice: undefined, nhashPerUsdMil: Long.UZERO, conversionFeeDenom: "" };
}

export const Params: MessageFns<Params> = {
  encode(message: Params, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.floorGasPrice !== undefined) {
      Coin.encode(message.floorGasPrice, writer.uint32(18).fork()).join();
    }
    if (!message.nhashPerUsdMil.equals(Long.UZERO)) {
      writer.uint32(24).uint64(message.nhashPerUsdMil.toString());
    }
    if (message.conversionFeeDenom !== "") {
      writer.uint32(34).string(message.conversionFeeDenom);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Params {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.floorGasPrice = Coin.decode(reader, reader.uint32());
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }

          message.nhashPerUsdMil = Long.fromString(reader.uint64().toString(), true);
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.conversionFeeDenom = reader.string();
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

  fromJSON(object: any): Params {
    return {
      floorGasPrice: isSet(object.floorGasPrice) ? Coin.fromJSON(object.floorGasPrice) : undefined,
      nhashPerUsdMil: isSet(object.nhashPerUsdMil) ? Long.fromValue(object.nhashPerUsdMil) : Long.UZERO,
      conversionFeeDenom: isSet(object.conversionFeeDenom) ? globalThis.String(object.conversionFeeDenom) : "",
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (message.floorGasPrice !== undefined) {
      obj.floorGasPrice = Coin.toJSON(message.floorGasPrice);
    }
    if (!message.nhashPerUsdMil.equals(Long.UZERO)) {
      obj.nhashPerUsdMil = (message.nhashPerUsdMil || Long.UZERO).toString();
    }
    if (message.conversionFeeDenom !== "") {
      obj.conversionFeeDenom = message.conversionFeeDenom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Params>, I>>(base?: I): Params {
    return Params.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.floorGasPrice = (object.floorGasPrice !== undefined && object.floorGasPrice !== null)
      ? Coin.fromPartial(object.floorGasPrice)
      : undefined;
    message.nhashPerUsdMil = (object.nhashPerUsdMil !== undefined && object.nhashPerUsdMil !== null)
      ? Long.fromValue(object.nhashPerUsdMil)
      : Long.UZERO;
    message.conversionFeeDenom = object.conversionFeeDenom ?? "";
    return message;
  },
};

function createBaseMsgFee(): MsgFee {
  return { msgTypeUrl: "", additionalFee: undefined, recipient: "", recipientBasisPoints: 0 };
}

export const MsgFee: MessageFns<MsgFee> = {
  encode(message: MsgFee, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.msgTypeUrl !== "") {
      writer.uint32(10).string(message.msgTypeUrl);
    }
    if (message.additionalFee !== undefined) {
      Coin.encode(message.additionalFee, writer.uint32(18).fork()).join();
    }
    if (message.recipient !== "") {
      writer.uint32(26).string(message.recipient);
    }
    if (message.recipientBasisPoints !== 0) {
      writer.uint32(32).uint32(message.recipientBasisPoints);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgFee {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFee();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.msgTypeUrl = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.additionalFee = Coin.decode(reader, reader.uint32());
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.recipient = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }

          message.recipientBasisPoints = reader.uint32();
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

  fromJSON(object: any): MsgFee {
    return {
      msgTypeUrl: isSet(object.msgTypeUrl) ? globalThis.String(object.msgTypeUrl) : "",
      additionalFee: isSet(object.additionalFee) ? Coin.fromJSON(object.additionalFee) : undefined,
      recipient: isSet(object.recipient) ? globalThis.String(object.recipient) : "",
      recipientBasisPoints: isSet(object.recipientBasisPoints) ? globalThis.Number(object.recipientBasisPoints) : 0,
    };
  },

  toJSON(message: MsgFee): unknown {
    const obj: any = {};
    if (message.msgTypeUrl !== "") {
      obj.msgTypeUrl = message.msgTypeUrl;
    }
    if (message.additionalFee !== undefined) {
      obj.additionalFee = Coin.toJSON(message.additionalFee);
    }
    if (message.recipient !== "") {
      obj.recipient = message.recipient;
    }
    if (message.recipientBasisPoints !== 0) {
      obj.recipientBasisPoints = Math.round(message.recipientBasisPoints);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgFee>, I>>(base?: I): MsgFee {
    return MsgFee.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgFee>, I>>(object: I): MsgFee {
    const message = createBaseMsgFee();
    message.msgTypeUrl = object.msgTypeUrl ?? "";
    message.additionalFee = (object.additionalFee !== undefined && object.additionalFee !== null)
      ? Coin.fromPartial(object.additionalFee)
      : undefined;
    message.recipient = object.recipient ?? "";
    message.recipientBasisPoints = object.recipientBasisPoints ?? 0;
    return message;
  },
};

function createBaseEventMsgFee(): EventMsgFee {
  return { msgType: "", count: "", total: "", recipient: "" };
}

export const EventMsgFee: MessageFns<EventMsgFee> = {
  encode(message: EventMsgFee, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.msgType !== "") {
      writer.uint32(10).string(message.msgType);
    }
    if (message.count !== "") {
      writer.uint32(18).string(message.count);
    }
    if (message.total !== "") {
      writer.uint32(26).string(message.total);
    }
    if (message.recipient !== "") {
      writer.uint32(34).string(message.recipient);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): EventMsgFee {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventMsgFee();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.msgType = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.count = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.total = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.recipient = reader.string();
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

  fromJSON(object: any): EventMsgFee {
    return {
      msgType: isSet(object.msgType) ? globalThis.String(object.msgType) : "",
      count: isSet(object.count) ? globalThis.String(object.count) : "",
      total: isSet(object.total) ? globalThis.String(object.total) : "",
      recipient: isSet(object.recipient) ? globalThis.String(object.recipient) : "",
    };
  },

  toJSON(message: EventMsgFee): unknown {
    const obj: any = {};
    if (message.msgType !== "") {
      obj.msgType = message.msgType;
    }
    if (message.count !== "") {
      obj.count = message.count;
    }
    if (message.total !== "") {
      obj.total = message.total;
    }
    if (message.recipient !== "") {
      obj.recipient = message.recipient;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EventMsgFee>, I>>(base?: I): EventMsgFee {
    return EventMsgFee.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventMsgFee>, I>>(object: I): EventMsgFee {
    const message = createBaseEventMsgFee();
    message.msgType = object.msgType ?? "";
    message.count = object.count ?? "";
    message.total = object.total ?? "";
    message.recipient = object.recipient ?? "";
    return message;
  },
};

function createBaseEventMsgFees(): EventMsgFees {
  return { msgFees: [] };
}

export const EventMsgFees: MessageFns<EventMsgFees> = {
  encode(message: EventMsgFees, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    for (const v of message.msgFees) {
      EventMsgFee.encode(v!, writer.uint32(10).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): EventMsgFees {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventMsgFees();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.msgFees.push(EventMsgFee.decode(reader, reader.uint32()));
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

  fromJSON(object: any): EventMsgFees {
    return {
      msgFees: globalThis.Array.isArray(object?.msgFees) ? object.msgFees.map((e: any) => EventMsgFee.fromJSON(e)) : [],
    };
  },

  toJSON(message: EventMsgFees): unknown {
    const obj: any = {};
    if (message.msgFees?.length) {
      obj.msgFees = message.msgFees.map((e) => EventMsgFee.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EventMsgFees>, I>>(base?: I): EventMsgFees {
    return EventMsgFees.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventMsgFees>, I>>(object: I): EventMsgFees {
    const message = createBaseEventMsgFees();
    message.msgFees = object.msgFees?.map((e) => EventMsgFee.fromPartial(e)) || [];
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
