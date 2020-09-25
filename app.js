'use strict';
'use strict';
const fs = require('fs'); 
//calling js build-in module 'fs'
//'fs' = FileSystem to deal with files
const readline = require('readline');
//calling js build-in module 'readline'
//'readline' to read line one by one
const rs = fs.createReadStream('./popu-pref.csv');
//create Stream which is for reading file from popu-pref.csv
const rl = readline.createInterface({ input: rs, output: {} });
//assign the Stream 'rs' as input for readline object 'rl'
const prefectureDataMap = new Map(); // key: 都道府県 value: 集計データのオブジェクト
rl.on('line', lineString => {
    const columns = lineString.split(',');
    const year = parseInt(columns[0]); //string to integer
    const prefecture = columns[1];
    const popu = parseInt(columns[3]);
    if (year === 2010 || year === 2015) {
      let value = prefectureDataMap.get(prefecture);
      if (!value) {
        value = {
          popu10: 0,
          popu15: 0,
          change: null
        };
      }
      if (year === 2010) {
        value.popu10 = popu;
      }
      if (year === 2015) {
        value.popu15 = popu;
      }
      prefectureDataMap.set(prefecture, value);
    }
  });
  rl.on('close', () => {
    console.log(prefectureDataMap);
  });
//when 'line' event occurs on 'rl' object, call this function.

//The 'line' event is emitted whenever the input stream receives an end-of-line input (\n, \r, or \r\n). 
//This usually occurs when the user presses the <Enter>, or <Return> keys.


