import { AccessType } from '../../proto/cosmwasm/wasm/v1/types_pb';
import { VoteOption as GovVoteOption } from '../../proto/cosmos/gov/v1/gov_pb';
import { Exec } from '../../proto/cosmos/group/v1/tx_pb';
import { VoteOption as GroupVoteOption } from '../../proto/cosmos/group/v1/types_pb';

/**
 * Returns governnance vote option enum values as strings for display
 */
export const govVoteOptions = Object.keys(GovVoteOption).map((option) => option);

/**
 * Returns group vote option enum values as strings for display
 */
export const groupVoteOptions = Object.keys(GroupVoteOption).map((option) => option);

/**
 * Returns Exec enum values as strings for display
 */
export const execOptions = Object.keys(Exec).map((exec) => exec);

/**
 * Returns Access Type enum values as strings for display
 */
export const accessTypeOptions = Object.keys(AccessType).map((exec) => exec);
