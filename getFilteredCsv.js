const fs = require("fs");
const dfd = require("danfojs-node");

(async function() {
    df = await dfd.readCSV(__dirname + "/ATCCemeteryData.csv");
    df.drop({
        columns: ["ID", "Start time", "Completion time", "Email", "Name", "Column1", "Location", "_1"],
        inplace: true
    });
    df.head().print();
    var outCsv = dfd.toCSV(df);
    fs.writeFileSync(__dirname + "/filteredGenderedData.csv", outCsv);
})();