import { Error as ServerError } from 'grpc-web';
import {
  QueryGroupInfoRequest,
  QueryGroupInfoResponse,
  QueryGroupMembersRequest,
  QueryGroupMembersResponse,
  QueryGroupPolicyInfoRequest,
  QueryGroupPolicyInfoResponse,
  QueryGroupPoliciesByAdminRequest,
  QueryGroupPoliciesByAdminResponse,
  QueryGroupPoliciesByGroupRequest,
  QueryGroupPoliciesByGroupResponse,
  QueryProposalRequest as QueryGroupProposalRequest,
  QueryProposalResponse as QueryGroupProposalResponse,
  QueryProposalsByGroupPolicyRequest,
  QueryProposalsByGroupPolicyResponse,
  QueryGroupsByMemberRequest,
  QueryGroupsByMemberResponse,
  QueryGroupsByAdminRequest,
  QueryGroupsByAdminResponse,
} from '../../proto/cosmos/group/v1/query_pb';
import { QueryClient as GroupQueryClient } from '../../proto/cosmos/group/v1/query_grpc_web_pb';
import { PageRequest } from '../../proto/cosmos/base/query/v1beta1/pagination_pb';

export const getGroupInfo = async (
  serviceAddress: string,
  groupId: number
): Promise<QueryGroupInfoResponse.AsObject> => {
  const groupInfoRequest = new QueryGroupInfoRequest();
  groupInfoRequest.setGroupId(groupId);

  return new Promise((resolve, reject) => {
    new GroupQueryClient(serviceAddress, null).groupInfo(
      groupInfoRequest,
      null,
      (error: ServerError, response: QueryGroupInfoResponse) => {
        if (error)
          reject(
            new Error(
              `groupInfoQuery error: Code ${error.code} Message: ${error.message}}`
            )
          );
        else {
          resolve(response.toObject());
        }
      }
    );
  });
};

export const getGroupMembers = async (
  serviceAddress: string,
  groupId: number
): Promise<QueryGroupMembersResponse.AsObject> => {
  const pageRequest = new PageRequest();
  pageRequest.setOffset(0);
  pageRequest.setLimit(1000);
  pageRequest.setCountTotal(true);
  const groupMembersRequest = new QueryGroupMembersRequest();
  groupMembersRequest.setGroupId(groupId);
  groupMembersRequest.setPagination(pageRequest);

  return new Promise((resolve, reject) => {
    new GroupQueryClient(serviceAddress, null).groupMembers(
      groupMembersRequest,
      null,
      (error: ServerError, response: QueryGroupMembersResponse) => {
        if (error)
          reject(
            new Error(
              `groupMemberQuery error: Code ${error.code} Message: ${error.message}}`
            )
          );
        else {
          resolve(response.toObject());
        }
      }
    );
  });
};

export const getGroupPolicyInfo = async (
  address: string,
  serviceAddress: string
): Promise<QueryGroupPolicyInfoResponse.AsObject> => {
  const groupPolicyInfoRequest = new QueryGroupPolicyInfoRequest();
  groupPolicyInfoRequest.setAddress(address);

  return new Promise((resolve, reject) => {
    new GroupQueryClient(serviceAddress, null).groupPolicyInfo(
      groupPolicyInfoRequest,
      null,
      (error: ServerError, response: QueryGroupPolicyInfoResponse) => {
        if (error)
          reject(
            new Error(
              `groupPolicyInfoQuery error: Code ${error.code} Message: ${error.message}}`
            )
          );
        else {
          resolve(response.toObject());
        }
      }
    );
  });
};

export const getGroupPolicyByAdmin = async (
  admin: string,
  serviceAddress: string
): Promise<QueryGroupPoliciesByAdminResponse.AsObject> => {
  const pageRequest = new PageRequest();
  pageRequest.setOffset(0);
  pageRequest.setLimit(1000);
  pageRequest.setCountTotal(true);
  const groupPoliciesByAdminRequest = new QueryGroupPoliciesByAdminRequest();
  groupPoliciesByAdminRequest.setAdmin(admin);
  groupPoliciesByAdminRequest.setPagination(pageRequest);

  return new Promise((resolve, reject) => {
    new GroupQueryClient(serviceAddress, null).groupPoliciesByAdmin(
      groupPoliciesByAdminRequest,
      null,
      (error: ServerError, response: QueryGroupPoliciesByAdminResponse) => {
        if (error)
          reject(
            new Error(
              `groupPoliciesByAdminQuery error: Code ${error.code} Message: ${error.message}}`
            )
          );
        else {
          resolve(response.toObject());
        }
      }
    );
  });
};

export const getGroupPolicyByGroup = async (
  groupId: number,
  serviceAddress: string
): Promise<QueryGroupPoliciesByGroupResponse.AsObject> => {
  const pageRequest = new PageRequest();
  pageRequest.setOffset(0);
  pageRequest.setLimit(1000);
  pageRequest.setCountTotal(true);
  const groupPoliciesByGroupRequest = new QueryGroupPoliciesByGroupRequest();
  groupPoliciesByGroupRequest.setGroupId(groupId);
  groupPoliciesByGroupRequest.setPagination(pageRequest);

  return new Promise((resolve, reject) => {
    new GroupQueryClient(serviceAddress, null).groupPoliciesByGroup(
      groupPoliciesByGroupRequest,
      null,
      (error: ServerError, response: QueryGroupPoliciesByGroupResponse) => {
        if (error)
          reject(
            new Error(
              `groupPoliciesByGroupQuery error: Code ${error.code} Message: ${error.message}}`
            )
          );
        else {
          resolve(response.toObject());
        }
      }
    );
  });
};

export const getGroupProposal = async (
  serviceAddress: string,
  proposalId: number
): Promise<QueryGroupProposalResponse.AsObject> => {
  const groupProposalRequest = new QueryGroupProposalRequest();
  groupProposalRequest.setProposalId(proposalId);

  return new Promise((resolve, reject) => {
    new GroupQueryClient(serviceAddress, null).proposal(
      groupProposalRequest,
      null,
      (error: ServerError, response: QueryGroupProposalResponse) => {
        if (error)
          reject(
            new Error(
              `groupProposalQuery error: Code ${error.code} Message: ${error.message}}`
            )
          );
        else {
          resolve(response.toObject());
        }
      }
    );
  });
};

export const getGroupProposalByGroupPolicy = async (
  address: string,
  serviceAddress: string
): Promise<QueryProposalsByGroupPolicyResponse.AsObject> => {
  const pageRequest = new PageRequest();
  pageRequest.setOffset(0);
  pageRequest.setLimit(1000);
  pageRequest.setCountTotal(true);
  const groupProposalsByGroupPolicyRequest =
    new QueryProposalsByGroupPolicyRequest();
  groupProposalsByGroupPolicyRequest.setAddress(address);
  groupProposalsByGroupPolicyRequest.setPagination(pageRequest);

  return new Promise((resolve, reject) => {
    new GroupQueryClient(serviceAddress, null).proposalsByGroupPolicy(
      groupProposalsByGroupPolicyRequest,
      null,
      (error: ServerError, response: QueryProposalsByGroupPolicyResponse) => {
        if (error)
          reject(
            new Error(
              `proposalsByGroupPolicyQuery error: Code ${error.code} Message: ${error.message}}`
            )
          );
        else {
          resolve(response.toObject());
        }
      }
    );
  });
};

export const getGroupsByMember = async (
  address: string,
  serviceAddress: string
): Promise<QueryGroupsByMemberResponse.AsObject> => {
  const pageRequest = new PageRequest();
  pageRequest.setOffset(0);
  pageRequest.setLimit(1000);
  pageRequest.setCountTotal(true);
  const groupsByMember = new QueryGroupsByMemberRequest();
  groupsByMember.setAddress(address);
  groupsByMember.setPagination(pageRequest);

  return new Promise((resolve, reject) => {
    new GroupQueryClient(serviceAddress, null).groupsByMember(
      groupsByMember,
      null,
      (error: ServerError, response: QueryGroupsByMemberResponse) => {
        if (error)
          reject(
            new Error(
              `groupsByMemberQuery error: Code ${error.code} Message: ${error.message}}`
            )
          );
        else {
          resolve(response.toObject());
        }
      }
    );
  });
};

export const getGroupsByAdmin = async (
  admin: string,
  serviceAddress: string
): Promise<QueryGroupsByAdminResponse.AsObject> => {
  const pageRequest = new PageRequest();
  pageRequest.setOffset(0);
  pageRequest.setLimit(1000);
  pageRequest.setCountTotal(true);
  const groupsByAdmin = new QueryGroupsByAdminRequest();
  groupsByAdmin.setAdmin(admin);
  groupsByAdmin.setPagination(pageRequest);

  return new Promise((resolve, reject) => {
    new GroupQueryClient(serviceAddress, null).groupsByAdmin(
      groupsByAdmin,
      null,
      (error: ServerError, response: QueryGroupsByAdminResponse) => {
        if (error)
          reject(
            new Error(
              `groupsByAdminQuery error: Code ${error.code} Message: ${error.message}}`
            )
          );
        else {
          resolve(response.toObject());
        }
      }
    );
  });
};
