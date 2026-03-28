import React from 'react';

import { statusMeta } from '../../../mocks/fieldOpsData';
import { TaskStatus } from '../../../types/fieldOps';
import { MetaChip } from '../MetaChip';

type StatusChipProps = {
  status: TaskStatus;
};

export const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  const meta = statusMeta[status];

  return <MetaChip label={meta.label} color={meta.color} tint={meta.tint} />;
};
