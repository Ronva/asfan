import React, { Component } from 'react';

import { Flipper, Flipped } from 'react-flip-toolkit';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import Controls from './components/Controls';
import SetInfo from './components/SetInfo';
import SortTitle from './components/SortTitle';

import { freq, combine, getUniques, sortData, filterByKey, keyIncludes } from './utils';
import { rarityObject, packFrequencies, rarityNames, categories } from './data/consts';
import sets from './data/sets';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      set: sets[0],
      category: categories[0],
      dfc: sets[0].booster.includes('double faced'),
      minAsfan: 0,
      store: {
        matches: [],
        rarities: this.fetchRarities(sets[0].cards),
        types: rarityObject,
        subtypes: rarityObject,
      },
      cachedSets: {},
      tableData: [],
      sortBy: '',
      sortDirection: 'asc'
    }
  }

  componentDidMount() {
    this.handleCategoryChange(this.state.category);
    this.cacheSet(this.state.set);
  }

  componentDidUpdate(prevProps, prevState) {
    const { store, sortBy, sortDirection } = this.state;

    if (prevState.store !== store) {
      const data = this.createTableData(store.matches);
      const key = sortBy;
      const dir = sortDirection === 'asc' ? 'desc' : 'asc';

      this.setState({
        tableData: sortData(data, key, dir)
      });
    }
  }

  handleChange = (key, val) => {
    this.setState({ [key]: val });
  };

  handleSetChange = async(name) => {
    const newSet = sets.find(set => { return set.name === name });
    const includesDfc = newSet.booster.includes('double faced');

    await this.setState({
      set: newSet,
      dfc: includesDfc,
      store: {
        ...this.state.store,
        rarities: this.cacheSet(newSet)
      }
    });

    await this.handleCategoryChange(this.state.category);
  };

  handleCategoryChange = (newCat) => {
    const r = this.state.store.rarities;
    let obj = rarityObject;
    let matches = [];

    switch (newCat) {
      case 'mechanics':
        obj = this.countMechanics();
        matches = this.state.set.mechanics.map(m => m.label);
        break;
      default:
        obj = this.createCategoryObject(r, newCat);
        matches = getUniques(combine(this.state.set.cards, newCat));
        break;
    }

    this.setState({
      category: newCat,
      store: {
        ...this.state.store,
        matches: matches,
        [newCat]: obj
      }
    });
  };

  cacheSet = (set) => {
    if (this.state.cachedSets[set.name]) {
      return this.state.cachedSets[set.name];
    }
    else {
      const r = this.fetchRarities(set.cards);
      this.setState({
        cachedSets: {
          ...this.state.cachedSets,
          [set.name]: r
        }
      });
      return r;
    }
  };

  createTableData = (matches) => {
    const c = this.state.category;
    const rarities = this.state.store.rarities;

      return matches.map(m => {
        let data = {};

        data.value = m;
        data.asfan = rarityNames.map(r => {
          const atRarity = this.state.store[c][r][m];
          data[r] = atRarity || 0;
          return atRarity / rarities[r].length * packFrequencies[r] || 0;
        }).reduce((a, b) => a + b, 0).toFixed(2);

        return data;
      });
  };

  fetchRarities = (cards) => {
    return {
      common: filterByKey(cards, 'rarity', 'Common'),
      uncommon: filterByKey(cards, 'rarity', 'Uncommon'),
      rare: filterByKey(cards, 'rarity', 'Rare'),
      mythic: filterByKey(cards, 'rarity', 'Mythic Rare'),
    }
  };

  fetchFromStore = (key, val) => {
    const { common, uncommon, rare, mythic } = this.state.store.rarities;

    return {
      common: filterByKey(common, key, val),
      uncommon: filterByKey(uncommon, key, val),
      rare: filterByKey(rare, key, val),
      mythic: filterByKey(mythic, key, val),
    }
  };

  countMechanics = () => {
    const { rarities } = this.state.store;
    const obj = rarityObject;

    this.state.set.mechanics.map(mechanic => {
      const vals = mechanic.value.split('|');
      rarityNames.map(r => {
        const cards = keyIncludes(rarities[r], 'number', ['b'], true);
        obj[r][mechanic.label] = keyIncludes(cards, 'text', vals).length;
        return null;
      });
      return null;
    });

    return obj;
  };

  combineAndCount = (ar, key) => {
    return freq(combine(ar, key));
  };

  createCategoryObject = (cards, cat) => {
    return {
      common: this.combineAndCount(cards.common, cat),
      uncommon: this.combineAndCount(cards.uncommon, cat),
      rare: this.combineAndCount(cards.rare, cat),
      mythic: this.combineAndCount(cards.mythic, cat)
    };
  };

  sortTable = (key) => {
    const data = this.state.tableData;
    const dir = this.state.sortDirection;

    if (key === this.state.sortBy) {
      this.setState({
        tableData: sortData(data, key, dir),
        sortDirection: dir === 'desc' ? 'asc' : 'desc'
      });
    }
    else {
      this.setState({
        tableData: sortData(data, key, 'desc'),
        sortBy: key,
        sortDirection: 'asc'
      });
    }
  };

  render() {
    const { set, category, dfc, store, minAsfan, sortBy, sortDirection, tableData } = this.state;

    return (
      <div className="app">
        <Controls
          set={set}
          cat={category}
          dfc={dfc}
          setChange={this.handleSetChange}
          categoryChange={this.handleCategoryChange}
          change={this.handleChange} />
        <Flipper flipKey={`${this.state.sortBy}-${this.state.sortDirection}`} duration={400} ease="easeFromTo">
        <Paper className="mainTable">
          <Table>
            <SortTitle
              active={sortBy}
              dir={sortDirection}
              items={[
                {value: "value", label: "Sort Alphabetically"},
                {value: "common", label: "Common"},
                {value: "uncommon", label: "Uncommon"},
                {value: "rare", label: "Rare"},
                {value: "mythic", label: "Mythic Rare"},
                {value: "asfan", label: "As-Fan"},
              ]}
              sort={this.sortTable} />
            <TableBody>
              <TableRow>
                <TableCell>Total</TableCell>
                {rarityNames.map((r, i) => <TableCell key={i} numeric>{store.rarities[r].length || 0}</TableCell>)}
                <TableCell />
              </TableRow>
              <TableRow>
                <TableCell>In pack</TableCell>
                {rarityNames.map((r, i) => <TableCell key={i} numeric>{packFrequencies[r]}</TableCell>)}
                <TableCell />
              </TableRow>
              {tableData.map((row, i) => (
                row.asfan >= minAsfan &&
                <Flipped key={i} flipId={row.value}>
                <TableRow>
                  <TableCell>{row.value}</TableCell>
                  <TableCell numeric>{row.common}</TableCell>
                  <TableCell numeric>{row.uncommon}</TableCell>
                  <TableCell numeric>{row.rare}</TableCell>
                  <TableCell numeric>{row.mythic}</TableCell>
                  <TableCell numeric>{row.asfan}</TableCell>
                </TableRow>
                </Flipped>
              ))}
            </TableBody>
          </Table>
        </Paper>
        </Flipper>
        <SetInfo set={this.state.set} />
      </div>
    );
  }
}
