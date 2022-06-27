// import { Error as ServerError } from 'grpc-web';
// import { BaseAccount } from '../proto/cosmos/auth/v1beta1/auth_pb';
import {
  QueryAccountRequest,
  // QueryAccountResponse,
} from '../proto/cosmos/auth/v1beta1/query_pb';
import { QueryClient as AuthQueryClient } from '../proto/cosmos/auth/v1beta1/query_grpc_web_pb';
// import {
//   CalculateTxFeesRequest,
//   CalculateTxFeesResponse,
// } from '../proto/provenance/msgfees/v1/query_pb';
// import { QueryClient as MsgFeeQueryClient } from '../proto/provenance/msgfees/v1/query_grpc_web_pb';

export const grpcService = () => {
  console.log('grpc service');
};

// export const calculateTxFees = (
//   serviceAddress: string,
//   request: CalculateTxFeesRequest
// ): Promise<CalculateTxFeesResponse.AsObject> => {
//   return new Promise((resolve, reject) => {
//     const msgFeeQuery = new MsgFeeQueryClient(serviceAddress, null);
//     msgFeeQuery.calculateTxFees(
//       request,
//       null,
//       (error: ServerError, response: CalculateTxFeesResponse) => {
//         if (error) {
//           reject(
//             new Error(
//               `msgFeeQuery.calculateTxFees error: Code: ${error.code} Message: ${error.message}`
//             )
//           );
//         } else {
//           resolve(response.toObject());
//         }
//       }
//     );
//   });
// };

export const getAccountInfo = (address: string, serviceAddress: string): any => {
  // Promise<{
  //   baseAccount: BaseAccount;
  //   accountNumber: number;
  //   sequence: number;
  // }>
  const accountRequest = new QueryAccountRequest();
  accountRequest.setAddress(address);

  return new Promise((resolve, reject) => {
    const authQuery = new AuthQueryClient(serviceAddress, null);
    resolve('test');
    //     authQuery.account(
    //       accountRequest,
    //       null,
    //       (error: ServerError, response: QueryAccountResponse) => {
    //         if (error)
    //           reject(
    //             new Error(
    //               `authQuery.account error: Code: ${error.code} Message: ${error.message}`
    //             )
    //           );
    //         else {
    //           const accountAny = response.getAccount();
    //           if (accountAny) {
    //             const baseAccount = accountAny.unpack(
    //               BaseAccount.deserializeBinary,
    //               accountAny.getTypeName()
    //             );
    //             if (baseAccount) {
    //               resolve({
    //                 baseAccount,
    //                 accountNumber: baseAccount.getAccountNumber(),
    //                 sequence: baseAccount.getSequence(),
    //               });
    //             } else reject(new Error(`authQuery.account message unpacking failure`));
    //           } else reject(new Error(`No response from authQuery.account`));
    //         }
    //       }
    //     );
  });
};
