const fs = require("fs");
const dfd = require("danfojs-node");

(async function() {
    df = await dfd.readJSON(__dirname + "/filteredGenderedData.json");
    df.head().print();
    //df.plot("Born: Year ", "Rough Age (death year - birth year)", ["Predicted Gender"]).bar();

    df.sortValues("Born: Year ", { inplace: true });
    var birthYears = df.column("Born: Year ").values;
    var deathYears = df.column("Died: Year").values;
    var predictedGenders = df.column("Predicted Gender").values;
    var yearList = [];
    var mfmf = [];
    var avgAges = [];
    for (var year = 1900; year < 2000; year++) {
        var mLifespans = [];
        var fLifespans = [];

        while (typeof(birthYears[0]) != "number") {
            birthYears.splice(0, 1);
            deathYears.splice(0, 1);
            predictedGenders.splice(0, 1);
        }
        while (birthYears[0] <= year) {
            if (birthYears[0] == year && typeof(deathYears[0]) == "number" && deathYears[0] > birthYears[0]) {
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