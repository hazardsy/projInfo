var mtg = require("mtgtop8");

let lists = {};
let trainingData = {};
let testData = {};
let nLists = 0;
let page = 1;
const maxNLists = 500;

verifyDeckSize = deck =>
  deck.reduce((size, currentValue) => {
    return size + currentValue.count;
  }, 0) >= 60;

getLists = () => {
  mtg.modernEvents(page, function(err, events) {
    if (err) return console.error(err);

    events.forEach(element => {
      mtg.event(element.id, function(err, event) {
        if (err) return console.error(err);
        event.decks.forEach(item => {
          let curList = nLists++;
          if (curList < maxNLists) {
            if (verifyDeckSize(item.cards)) {
              lists[curList] = item.cards;
              if (curList < 0.8 * maxNLists) trainingData[curList] = item.cards;
              else testData[curList] = item.cards;
            } else nLists--;
            //console.log(lists);
          }
        });
      });
    });
    if (nLists < maxNLists) {
      page++;
      getLists();
    } else {
      var fs = require("fs");
      fs.writeFile(
        "rawData.json",
        JSON.stringify(lists, null, 1),
        "utf8",
        err => {
          if (err) console.log(err);
        }
      );
      fs.writeFile(
        "trainingData.json",
        JSON.stringify(trainingData, null, 1),
        "utf8",
        err => {
          if (err) console.log(err);
        }
      );
      fs.writeFile(
        "testData.json",
        JSON.stringify(testData, null, 1),
        "utf8",
        err => {
          if (err) console.log(err);
        }
      );
    }
  });
};

getLists();
