const fs = require("fs");
const dfd = require("danfojs-node");

(async function() {
    df = await dfd.readJSON(__dirname + "/filteredGenderedData.json");
    //df.plot("Born: Year ", "Rough Age (death year - birth year)", ["Predicted Gender"]).bar();

    var invalidRows = [];
    for (var idx of df.index) {
        var bYear = df.at(idx, "Born: Year ");
        var dYear = df.at(idx, "Died: Year");
        var gender = df.at(idx, "Predicted Gender");
        if (typeof(bYear) != "number" || typeof(dYear) != "number" || typeof(gender) != "string") invalidRows.push(idx);
    }
    df.drop({ index: invalidRows, inplace: true });
    df.head().print();

    df.sortValues("Born: Year ", { inplace: true });
    var birthYears = df.column("Born: Year ").values;
    for (var y of birthYears) console.log(y);
    var deathYears = df.column("Died: Year").values;
    var predictedGenders = df.column("Predicted Gender").values;
    var yearList = [];
    var mfmf = [];
    var avgAges = [];
    for (var year = 1900; year < 2000; year++) {
        var mLifespans = [];
        var fLifespans = [];
        
        while (birthYears[0] <= year) {
            if (birthYears[0] == year && deathYears[0] > birthYears[0]) {
                ((predictedGenders[0] == "m")?mLifespans:fLifespans).push(deathYears[0] - birthYears[0]);
            }
            birthYears.splice(0, 1);
            deathYears.splice(0, 1);
            predictedGenders.splice(0, 1);
        }

        mfmf.push("m");
        yearList.push(year);
        var mSum = 0;
        for (var age of mLifespans) mSum += age;
        avgAges.push(mSum / mLifespans.length);

        mfmf.push("f");
        yearList.push(year);
        var fSum = 0;
        for (var age of fLifespans) fSum += age;
        avgAges.push(fSum / fLifespans.length);

    }
    var pltData = [{
        x: [yearList, mfmf],
        y: avgAges,
        type: "bar",
        orientation: "v",
    }];
    pltLayout = {
        width: 3200,
        height: 450,
    };

    var html = `<script src="https://cdnjs.cloudflare.com/ajax/libs/plotly.js/2.24.2/plotly.min.js" charset="utf-8"></script>

        <div id="tester" style="width:600px;height:250px;"></div>

        <script>
            TESTER = document.getElementById('tester');
            Plotly.newPlot( TESTER, ${JSON.stringify(pltData)}, ${JSON.stringify(pltLayout)} );
        </script>`;
    fs.writeFileSync(__dirname + "/output.html", html, "utf-8");
})();