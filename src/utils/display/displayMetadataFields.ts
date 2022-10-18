import { format } from 'date-fns';

export const displayMetadataFields = ({
  peerMetadataName = 'N/A',
  // gasFee,
  peerMetadataDate,
  peerMetadataDescription,
}: {
  peerMetadataName?: string;
  // gasFee?: string;
  peerMetadataDescription?: string;
  peerMetadataDate?: number;
}) => {
  return {
    platform: peerMetadataName,
    // 'Gas Fee': TODO gas fee is calculated on FW side
    date: peerMetadataName
      ? format(new Date(peerMetadataDate as number), 'MMM d, h:mm a')
      : 'N/A',
    description: peerMetadataDescription || 'N/A',
  };
};
