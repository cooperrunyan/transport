import { DEFAULT_COLOR_SCHEME } from './constants';

const mainPallette = {
  grey: {
    0: '#FFFFFF',
    1: '#F2F2F2',
    2: '#E5E5E5',
    3: '#BFBFBF',
    4: '#999999',
    5: '#808080',
    6: '#666666',
    7: '#4C4C4C',
    8: '#333333',
    9: '#1A1A1A',
    10: '#000000',
  },
  red: {
    0: '#FFEAE8',
    1: '#FFCAC6',
    2: '#FF958E',
    3: '#FF5F55',
    4: '#FF4A3F',
    5: '#FF2A1D',
    6: '#D92419',
    7: '#BF2016',
    8: '#80150E',
    9: '#400A07',
    10: '#1A0403',
  },
  blue: {
    0: '#E8F1FF',
    1: '#C6DDFF',
    2: '#8EBBFF',
    3: '#5599FF',
    4: '#3F8BFF',
    5: '#1D77FF',
    6: '#1965D9',
    7: '#1659BF',
    8: '#0E3B80',
    9: '#071E40',
    10: '#030C1A',
  },
  purple: {
    0: '#F3EAFF',
    1: '#E2CBFF',
    2: '#C497FF',
    3: '#A762FF',
    4: '#9C4DFF',
    5: '#8A2EFF',
    6: '#7527D9',
    7: '#6722BF',
    8: '#451780',
    9: '#220C40',
    10: '#0E051A',
  },
  green: {
    0: '#E5FBE9',
    1: '#BFF5C8',
    2: '#80EA90',
    3: '#40DF59',
    4: '#26DB43',
    5: '#00D422',
    6: '#00B51D',
    7: '#00A019',
    8: '#006B11',
    9: '#003508',
    10: '#001503',
  },
};

const colors = {
  light: mainPallette,
  dark: flip(mainPallette),
};

export const pallette = colors[DEFAULT_COLOR_SCHEME];

function flip<T extends { [key: string]: { [key: number]: string } }>(pallette: T) {
  const clone: typeof pallette = JSON.parse(JSON.stringify(pallette));
  for (const color of Object.keys(pallette) as (keyof T)[]) {
    clone[color][0] = pallette[color][10];
    clone[color][1] = pallette[color][9];
    clone[color][2] = pallette[color][8];
    clone[color][3] = pallette[color][7];
    clone[color][4] = pallette[color][6];
    clone[color][5] = pallette[color][5];
    clone[color][6] = pallette[color][4];
    clone[color][7] = pallette[color][3];
    clone[color][8] = pallette[color][3];
    clone[color][9] = pallette[color][1];
    clone[color][10] = pallette[color][0];
  }
  return clone;
}
