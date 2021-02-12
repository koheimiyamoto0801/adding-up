'use strict';
'use strict';

// ----- task -----
// 2010 年から 2015 年にかけて 15〜19 歳の人が増えた割合の都道府県ランキング
// 1.ファイルからデータを読み取る
// 2.2010 年と 2015 年のデータを選ぶ
// 3.都道府県ごとの変化率を計算する
// 4.変化率ごとに並べる
// 5.並べられたものを表示する


// ----- calling modules to be required -----
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

// data structure: objects inside Map

rl.on('line', lineString => { 
  // ----- 1&2. read csv file and extract desired data -----
  //triger arrow function with `line` event
  //when 'line' event occurs on 'rl' object, call this function.
  //The 'line' event is emitted whenever the input stream receives an end-of-line input (\n, \r, or \r\n). 
  //This usually occurs when the user presses the <Enter>, or <Return> keys.

    const columns = lineString.split(','); 
    //store each row of data with split by `,` into array called "columns"
    const year = parseInt(columns[0]); //string to integer
    const prefecture = columns[1];
    const popu = parseInt(columns[3]);
    if (year === 2010 || year === 2015) {
      let value = prefectureDataMap.get(prefecture);
      if (!value) {
        //if `value` is falsy
        //in other words, when this is the first time to process data
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
      //key: prefecture, value: object(popu10, popu15, change)
    }
  });

rl.on('close', () => { 
  //triger arrow function with `close` event
  // `close` even is called when all the readline are done

  for (let [key, value] of prefectureDataMap) { //[For of] loop though Map
    // ----- 3.calculation of rate of change from 2010 to 2015 -----
    value.change = value.popu15 / value.popu10;
}

const rankingArray = Array.from(prefectureDataMap).sort((pair1, pair2) => {
    return pair1[1].change - pair2[1].change;
});
// ----- 4.Sorting -----
//Array.from(prefectureDataMap) change Map into array
//Then sort them in ascending order


const rankingStrings = rankingArray.map(([key, value], i) => {
  // ----- 5.align and show -----
    return (
      'rank:' + (i+1) + ' ' +
      key + ': ' + value.popu10 + '=>' + value.popu15 + ' change rate:' + value.change
    );
  });

  console.log(rankingStrings);
});



