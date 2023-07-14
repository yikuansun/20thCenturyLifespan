const fs = require("fs");
const dfd = require("danfojs-node");

(async function() {
    var nameGenders = JSON.parse(fs.readFileSync(__dirname + "/nameGenders.json", "utf-8"));

    var df = await dfd.readCSV(__dirname + "/ATCCemeteryData.csv");
    df.drop({
        columns: ["ID", "Start time", "Completion time", "Email", "Name", "Column1", "Location", "_1"],
        inplace: true
    });

    var genders = [];
    for (var idx of df.index) {
        //if (idx == 0) continue;
        var fmName = df.at(idx, "First/Middle Name:");
        if (typeof(fmName) != "string") {
            genders.push(null);
            continue;
        }
        var fName = fmName.split(" ")[0];
        var gender = null;
        gender = nameGenders[fName.toLowerCase()];
        genders.push(gender);
    }
    df.addColumn("Predicted Gender", genders, { inplace: true });


    df.head().print();
    //var outCsv = dfd.toCSV(df);
    var outCsv = JSON.stringify(dfd.toJSON(df));
    fs.writeFileSync(__dirname + "/filteredGenderedData.json", outCsv);
})();