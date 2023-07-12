const fs = require("fs");
const dfd = require("danfojs-node");

(async function() {
    df = await dfd.readExcel(__dirname + "/ATCCemeteryData.xlsx", {
        sheet: 2
    });
    df.head().print();
})();