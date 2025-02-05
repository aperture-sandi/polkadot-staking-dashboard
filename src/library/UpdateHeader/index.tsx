// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { PayeeItem } from 'library/Hooks/usePayeeConfig';
import { usePayeeConfig } from 'library/Hooks/usePayeeConfig';
import { Wrapper } from './Wrapper';

interface UpdateHeaderProps {
  current: string | null;
  selected: string | null;
}

export const UpdateHeader = ({ current, selected }: UpdateHeaderProps) => {
  const { getPayeeItems } = usePayeeConfig();

  const currentTitle =
    getPayeeItems(true).find((p: PayeeItem) => p.value === current)?.title ||
    '';

  const selectedTitle =
    getPayeeItems(true).find((p: PayeeItem) => p.value === selected)?.title ||
    '';

  return (
    <Wrapper>
      <div>
        <h4>{currentTitle}</h4>
      </div>
      <span>
        <FontAwesomeIcon icon={faAnglesRight} />
      </span>
      <div>
        <h4>{selectedTitle}</h4>
      </div>
    </Wrapper>
  );
};
