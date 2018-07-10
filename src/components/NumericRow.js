import React from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export default ({ title, items }) => (
  <TableRow>
    <TableCell>{title}</TableCell>
    {items.map((item, index) => <TableCell key={index} numeric>{this.state.store.rarities[item].length || 0}</TableCell>)}
    <TableCell />
  </TableRow>
);