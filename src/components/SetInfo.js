import React from 'react';

import FontAwesome from 'react-fontawesome';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import { rarityNames } from "../data/consts";

export default ({ set }) => (
  <ExpansionPanel>
    <ExpansionPanelSummary expandIcon={<FontAwesome name="chevron-down" />}>
      {set.name} Set Info
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <div className="setInfo">
        <div className="setIcons">
          {rarityNames.map(r => (
            <i key={r} className={`ss ss-${set.code.toLowerCase()} ss-${r}`} />
          ))}
        </div>
        <div>Coming Soon.</div>
      </div>
    </ExpansionPanelDetails>
  </ExpansionPanel>
);
