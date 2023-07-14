const fs = require("fs");

var babyNames = {};
var babyNamesProbability = {};
var lines = fs.readFileSync(__dirname + "/baby-names.csv", "utf-8").split("\n");
lines.splice(0, 1);

for (var line of lines) {
    if (line.split(",").length < 4) continue;
    var name = line.split(",")[1].replace("\"", "").replace("\"", "");
    var gender = (line.split(",")[3] == `"boy"`)?"m":"f";
    var probability = eval(line.split(",")[2]);
    if (babyNamesProbability[name.toLowerCase()]) {
        if (probability < babyNamesProbability[name.toLowerCase()]) continue;
    }
    babyNames[name.toLowerCase()] = gender;
    babyNamesProbability[name.toLowerCase()] = probability;
}

fs.writeFileSync(__dirname + "/nameGenders.json", JSON.stringify(babyNames));