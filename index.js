const fs = require("fs");
const dfd = require("danfojs-node");

(async function() {
    df = await dfd.readJSON(__dirname + "/filteredGenderedData.json");
    df.head().print();
})();