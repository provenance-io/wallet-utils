// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.7.0
//   protoc               v5.29.3
// source: provenance/exchange/v1/commitments.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { Coin } from "../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "provenance.exchange.v1";

/** Commitment contains information on committed funds. */
export interface Commitment {
  /** account is the bech32 address string with the committed funds. */
  account: string;
  /** market_id is the numeric identifier of the market the funds are committed to. */
  marketId: number;
  /** amount is the funds that have been committed by the account to the market. */
  amount: Coin[];
}

/** AccountAmount associates an account with a coins amount. */
export interface AccountAmount {
  /** account is the bech32 address string of the account associated with the amount. */
  account: string;
  /** amount is the funds associated with the address. */
  amount: Coin[];
}

/** MarketAmount associates a market with a coins amount. */
export interface MarketAmount {
  /** market_id is the numeric identifier the amount has been committed to. */
  marketId: number;
  /** amount is the funds associated with the address. */
  amount: Coin[];
}

/**
 * NetAssetPrice is an association of assets and price used to record the value of things.
 * It is related to the NetAssetValue message from the x/marker module, and is therefore often referred to as "a NAV".
 */
export interface NetAssetPrice {
  /** assets is the volume and denom that has been bought or sold. */
  assets?:
    | Coin
    | undefined;
  /** price is what was paid for the assets. */
  price?: Coin | undefined;
}

function createBaseCommitment(): Commitment {
  return { account: "", marketId: 0, amount: [] };
}

export const Commitment: MessageFns<Commitment> = {
  encode(message: Commitment, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (message.marketId !== 0) {
      writer.uint32(16).uint32(message.marketId);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(26).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Commitment {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommitment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.account = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }

          message.marketId = reader.uint32();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.amount.push(Coin.decode(reader, reader.uint32()));
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

  fromJSON(object: any): Commitment {
    return {
      account: isSet(object.account) ? globalThis.String(object.account) : "",
      marketId: isSet(object.marketId) ? globalThis.Number(object.marketId) : 0,
      amount: globalThis.Array.isArray(object?.amount) ? object.amount.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: Commitment): unknown {
    const obj: any = {};
    if (message.account !== "") {
      obj.account = message.account;
    }
    if (message.marketId !== 0) {
      obj.marketId = Math.round(message.marketId);
    }
    if (message.amount?.length) {
      obj.amount = message.amount.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Commitment>, I>>(base?: I): Commitment {
    return Commitment.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Commitment>, I>>(object: I): Commitment {
    const message = createBaseCommitment();
    message.account = object.account ?? "";
    message.marketId = object.marketId ?? 0;
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAccountAmount(): AccountAmount {
  return { account: "", amount: [] };
}

export const AccountAmount: MessageFns<AccountAmount> = {
  encode(message: AccountAmount, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(18).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): AccountAmount {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountAmount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.account = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.amount.push(Coin.decode(reader, reader.uint32()));
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

  fromJSON(object: any): AccountAmount {
    return {
      account: isSet(object.account) ? globalThis.String(object.account) : "",
      amount: globalThis.Array.isArray(object?.amount) ? object.amount.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: AccountAmount): unknown {
    const obj: any = {};
    if (message.account !== "") {
      obj.account = message.account;
    }
    if (message.amount?.length) {
      obj.amount = message.amount.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountAmount>, I>>(base?: I): AccountAmount {
    return AccountAmount.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccountAmount>, I>>(object: I): AccountAmount {
    const message = createBaseAccountAmount();
    message.account = object.account ?? "";
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMarketAmount(): MarketAmount {
  return { marketId: 0, amount: [] };
}

export const MarketAmount: MessageFns<MarketAmount> = {
  encode(message: MarketAmount, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.marketId !== 0) {
      writer.uint32(8).uint32(message.marketId);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(18).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MarketAmount {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarketAmount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.marketId = reader.uint32();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.amount.push(Coin.decode(reader, reader.uint32()));
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

  fromJSON(object: any): MarketAmount {
    return {
      marketId: isSet(object.marketId) ? globalThis.Number(object.marketId) : 0,
      amount: globalThis.Array.isArray(object?.amount) ? object.amount.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: MarketAmount): unknown {
    const obj: any = {};
    if (message.marketId !== 0) {
      obj.marketId = Math.round(message.marketId);
    }
    if (message.amount?.length) {
      obj.amount = message.amount.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MarketAmount>, I>>(base?: I): MarketAmount {
    return MarketAmount.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MarketAmount>, I>>(object: I): MarketAmount {
    const message = createBaseMarketAmount();
    message.marketId = object.marketId ?? 0;
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseNetAssetPrice(): NetAssetPrice {
  return { assets: undefined, price: undefined };
}

export const NetAssetPrice: MessageFns<NetAssetPrice> = {
  encode(message: NetAssetPrice, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.assets !== undefined) {
      Coin.encode(message.assets, writer.uint32(10).fork()).join();
    }
    if (message.price !== undefined) {
      Coin.encode(message.price, writer.uint32(18).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): NetAssetPrice {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNetAssetPrice();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.assets = Coin.decode(reader, reader.uint32());
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.price = Coin.decode(reader, reader.uint32());
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

  fromJSON(object: any): NetAssetPrice {
    return {
      assets: isSet(object.assets) ? Coin.fromJSON(object.assets) : undefined,
      price: isSet(object.price) ? Coin.fromJSON(object.price) : undefined,
    };
  },

  toJSON(message: NetAssetPrice): unknown {
    const obj: any = {};
    if (message.assets !== undefined) {
      obj.assets = Coin.toJSON(message.assets);
    }
    if (message.price !== undefined) {
      obj.price = Coin.toJSON(message.price);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NetAssetPrice>, I>>(base?: I): NetAssetPrice {
    return NetAssetPrice.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NetAssetPrice>, I>>(object: I): NetAssetPrice {
    const message = createBaseNetAssetPrice();
    message.assets = (object.assets !== undefined && object.assets !== null)
      ? Coin.fromPartial(object.assets)
      : undefined;
    message.price = (object.price !== undefined && object.price !== null) ? Coin.fromPartial(object.price) : undefined;
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
