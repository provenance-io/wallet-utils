import { ReadableMessageNames } from 'types';
import { StoreCodeProposal } from '../../../../proto/cosmwasm/wasm/v1/proposal_pb';
import { accessTypeOptions } from '../../../../utils';

/**
 * Formats StoreCodeProposal messages for display
 * @param message of type StoreCodeProposal
 * @returns object with StoreCodeProposal fields
 */
export const storeCodeProposal = (message: StoreCodeProposal) => {
  const instantiatePerms = message.getInstantiatePermission();
  // Check permission type. If an address list, we need to display it correctly
  const permissionType =
    accessTypeOptions[Number(instantiatePerms?.getPermission())];
  return {
    proposalType: 'Store Code Proposal' as ReadableMessageNames,
    title: message.getTitle(),
    description: message.getDescription(),
    runAs: message.getRunAs(),
    wasmByteCode: message.getWasmByteCode_asB64(),
    // If no permission type, omit this field
    ...(permissionType && {
      instantiatePermission: {
        address: instantiatePerms?.getAddress(),
        permission: permissionType,
        // Conditionally return address list if permissioned
        ...(permissionType === 'ACCESS_TYPE_ANY_OF_ADDRESSES' && {
          permissionList: instantiatePerms?.getAddressesList().map((address) => {
            address;
          }),
        }),
      },
    }),
  };
};
