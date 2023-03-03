import { ReadableMessageNames } from 'types';
import { MsgAddMarkerRequest } from '../../../../proto/provenance/marker/v1/tx_pb';
import {
  MarkerStatus,
  MarkerType,
} from '../../../../proto/provenance/marker/v1/marker_pb';
import { Access } from '../../../../proto/provenance/marker/v1/accessgrant_pb';

const getKey = (map: { [key: string]: any }, val: any) =>
  Object.keys(map).find((key) => map[key] === val);

/**
 * Formats MsgAddMarkerRequest messages for display
 * @param message of type MsgAddMarkerRequest
 * @returns object with MsgAddMarkerRequest fields
 */
export const msgAddMarkerRequest = (message: MsgAddMarkerRequest) => ({
  typeName: 'MsgAddMarkerRequest' as ReadableMessageNames,
  ...message.toObject(),
  markerType: getKey(MarkerType, (message as MsgAddMarkerRequest).getMarkerType()),
  status: getKey(MarkerStatus, (message as MsgAddMarkerRequest).getStatus()),
  accessListList: (message as MsgAddMarkerRequest)
    .getAccessListList()
    .map((list) => {
      return {
        address: list.getAddress(),
        permissionsList: list
          .getPermissionsList()
          .map((perm) => getKey(Access, perm)),
      };
    }),
});
