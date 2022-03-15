// Copyright 2022 @rossbulat/polkadot-staking-experience authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState, useEffect } from 'react';
import { List, Header, Wrapper as ListWrapper } from '../../library/List';
import { motion } from 'framer-motion';
import { Validator } from '../../library/Validator';
import { useApi } from '../../contexts/Api';
import { StakingMetricsContext, useStakingMetrics } from '../../contexts/Staking';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGripVertical } from '@fortawesome/free-solid-svg-icons';

export const ValidatorListInner = (props: any) => {

  const { isReady }: any = useApi();
  const { fetchValidatorMetaBatch, getValidatorMetaBatch }: any = useStakingMetrics();
  const { validators }: any = props;

  const [metaSynced, setMetaSynced] = useState(false);
  const [layout, setLayout] = useState(props.layout);

  useEffect(() => {
    fetchValidatorMetaBatch(props.batchKey, props.validators);
    setMetaSynced(true);
  }, [isReady()]);

  useEffect(() => {
    if (getValidatorMetaBatch(props.batchKey) !== null) {
    }
  }, [getValidatorMetaBatch(props.batchKey)]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.025,
      }
    }
  };

  const listItem = {
    hidden: {
      y: 25,
      opacity: 0
    },
    show: {
      y: 0,
      opacity: 1,
    }
  };

  if (!validators.length) {
    return (<></>);
  }

  const meta: any = getValidatorMetaBatch(props.batchKey) ?? [];

  return (
    <ListWrapper>
      <Header>
        <div>
        </div>
        <div>
          <button onClick={() => setLayout('row')}><FontAwesomeIcon icon={faBars} color={layout === 'row' ? '#d33079' : '#222'} /></button>
          <button onClick={() => setLayout('col')}><FontAwesomeIcon icon={faGripVertical} color={layout === 'col' ? '#d33079' : '#222'} /></button>
        </div>
      </Header>
      <List
        variants={container}
        initial="hidden"
        animate="show"
      >
        {validators.map((addr: string, index: number) =>
          <motion.div className={`item ${layout === 'row' ? `row` : `col`}`} key={`nomination_${index}`} variants={listItem}>
            <Validator
              address={addr}
              meta={meta[index] ?? null}
              synced={metaSynced}
            />
          </motion.div>
        )}
      </List>
    </ListWrapper>
  );
}

export class ValidatorList extends React.Component<any, any> {

  static contextType = StakingMetricsContext;

  shouldComponentUpdate (nextProps: any, nextState: any) {
    return (this.props.validators !== nextProps.validators);
  }

  render () {
    return (
      <ValidatorListInner
        {...this.props}
      />
    )
  }
}

export default ValidatorList