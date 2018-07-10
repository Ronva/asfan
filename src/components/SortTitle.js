import React from 'react';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';

export default ({ active, dir, items, sort }) => (
  <TableHead>
    <TableRow>
      {items.map((item, index) => (
        <TableCell key={index}>
          <TableSortLabel
            active={active === item.value}
            direction={dir}
            onClick={() => sort(item.value)}>
            {item.label}
          </TableSortLabel>
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);
