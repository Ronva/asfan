import common from './data/common';

const filterArray = (ar) => {
  return ar.filter(item => { return item !== undefined && !common.includes(item.toLowerCase()) });
};

export const combine = (ar, key, tostr = false) => {
  const combined = ar.map(item => item[key]);
  const flattened = filterArray([].concat.apply([], combined));
  return tostr ? flattened.join(' ').replace(/\n/g, " ").trim().toLowerCase() : flattened;
};

export const freq = (ar) => {
  const counts = {};

  ar.forEach(value => {
    if (!typeof value !== 'string') counts[value] ? counts[value]++ : counts[value] = 1
  });

  return counts;
};

export const matchAbilities = (str) => {
  const re = /(\w+)(?=\s{|\s\(|\s—|—)/g;
  return str.match(re);
};

export const getUniques = (ar, key = null) => {
  return key ? [...new Set(ar.map(item => item[key]))] : [...new Set(ar)];
};

export const flatten = (list) => {
  return list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
};

export const sortData = (data, key, dir) => {
  return data.sort((a, b) => {
    const asc = dir === 'asc';
    return (
      typeof a[key] === 'string'
        ? (!asc ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]))
        : (!asc ? a[key] - b[key] : b[key] - a[key])
    )
  })
};

export const processText = (r) => {
  const re = /{(\S*)}|\((\S*)|(\S*)\)|\+(\S*)|-(\S*)|[0-9]|"(\S*)"/g;
  const combined = combine(r, 'text', true);
  const filtered = filterArray(combined.replace(/\n/g, ' ').replace(/[.:,•]/g, '').split(' ')).filter(item => { return !item.match(re) });
  const counted = freq(filtered);
  console.log(counted);
  return null;
};

export const repeats = (text) => {
  const re = /(\b\w+\b)(?=.*\b\1\b)/gi;
  return text.match(re);
};

export const countSubString = (str, subStr) => {
  return str.split(subStr).length - 1
};

export const cleanCard = (card = '') => {
  // return card.replace(/ *\([^)]*\) */g, "").toLowerCase();
  return card.toLowerCase();
};

export const filterByKey = (cards, key, val) => {
  return cards.filter(card => { return card[key] === val });
};

export const keyIncludes = (cards, key, vals, reverse = false) => {
  return cards.filter(card => {
    return reverse
      ? !vals.some(val => cleanCard(card[key]).includes(val))
      : vals.some(val => cleanCard(card[key]).includes(val))
  });
};
