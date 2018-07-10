import React from 'react';

import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import sets from "../data/sets";
import { categories } from '../data/consts';

export default ({ set, cat, dfc, setChange, categoryChange, change }) => {
  return (
    <Paper className="controls">
      <FormControl className="controlInput">
        <InputLabel htmlFor="set-dropdown">Set</InputLabel>
        <Select
          value={set.name}
          onChange={e => e.target.value !== set.name ? setChange(e.target.value) : null}
          inputProps={{
            name: 'set',
            id: 'set-dropdown',
          }}>
          {sets.map((s, i) => (
            <MenuItem key={i} value={s.name}>
              <i className={`ss ss-${s.code.toLowerCase()} ss-mythic`} />{s.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="controlInput">
        <InputLabel htmlFor="category-dropdown">Category</InputLabel>
        <Select
          value={cat}
          onChange={e => e.target.value !== cat ? categoryChange(e.target.value) : null}
          inputProps={{
            name: 'category',
            id: 'category-dropdown',
          }}>
          {categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl className="controlInput">
        <TextField
          label="Minimum as-fan"
          type="number"
          name="minAsfan"
          onChange={e => change(e.target.name, parseFloat(`0${e.target.value}`))} />
      </FormControl>
    </Paper>
  )
};
