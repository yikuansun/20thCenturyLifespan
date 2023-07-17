const fs = require("fs");
const dfd = require("danfojs-node");

(async function() {
    df = await dfd.readJSON(__dirname + "/filteredGenderedData.json");
    //df.plot("Born: Year ", "Rough Age (death year - birth year)", ["Predicted Gender"]).bar();

    df.sortValues("Born: Year ", { inplace: true });
    var birthYears = JSON.parse(JSON.stringify(df.column("Born: Year ").values));
    var deathYears = JSON.parse(JSON.stringify(df.column("Died: Year").values));
    var predictedGenders = JSON.parse(JSON.stringify(df.column("Predicted Gender").values));
    var yearList = [];
    var mfmf = [];
    var avgAges = [];
    var cWay = [];
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
        cWay.push("darkblue");

        mfmf.push("f");
        yearList.push(year);
        var fSum = 0;
        for (var age of fLifespans) fSum += age;
        avgAges.push(fSum / fLifespans.length);
        cWay.push("deeppink");

    }
    var pltData1 = [{
        x: [yearList, mfmf],
        y: avgAges,
        type: "bar",
        orientation: "v",
        marker: {
            color: cWay,
        },
    }];
    pltLayout1 = {
        width: 3200,
        height: 450,
        xaxis: {
            tickangle: "auto",
            title: "year",
        },
        yaxis: {
            tickangle: 45,
            title: "avg. lifespan",
        },
    };

    birthYears = JSON.parse(JSON.stringify(df.column("Born: Year ").values));
    deathYears = JSON.parse(JSON.stringify(df.column("Died: Year").values));
    predictedGenders = JSON.parse(JSON.stringify(df.column("Predicted Gender").values));
    var decadeList = [1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990];
    var avgAges10Yr = [];
    var mfmf10Yr = [];
    var cWay10Yr = [];
    for (var decade of decadeList) {
        var mLifespans = [];
        var fLifespans = [];
        
        while (birthYears[0] < decade + 10) {
            if (birthYears[0] >= decade && deathYears[0] > birthYears[0]) {
                ((predictedGenders[0] == "m")?mLifespans:fLifespans).push(deathYears[0] - birthYears[0]);
            }
            birthYears.splice(0, 1);
            deathYears.splice(0, 1);
            predictedGenders.splice(0, 1);
        }

        mfmf10Yr.push("m");
        var mSum = 0;
        for (var age of mLifespans) mSum += age;
        avgAges10Yr.push(mSum / mLifespans.length);
        cWay10Yr.push("darkblue");

        mfmf10Yr.push("f");
        var fSum = 0;
        for (var age of fLifespans) fSum += age;
        avgAges10Yr.push(fSum / fLifespans.length);
        cWay10Yr.push("deeppink");

    }
    decadeList = [1900, 1900, 1910, 1910, 1920, 1920, 1930, 1930, 1940, 1940, 1950, 1950, 1960, 1960, 1970, 1970, 1980, 1980, 1990, 1990];
    var pltData2 = [{
        x: [decadeList, mfmf10Yr],
        y: avgAges10Yr,
        type: "bar",
        orientation: "v",
        marker: {
            color: cWay10Yr,
        },
    }];
    pltLayout2 = {
        width: 1000,
        height: 450,
        xaxis: {
            tickangle: "auto",
            title: "decade",
        },
        yaxis: {
            tickangle: 45,
            title: "avg. lifespan",
        },
    };

    birthYears = JSON.parse(JSON.stringify(df.column("Born: Year ").values));
    var yearListSimple = [];
    var validDataPoints = [];
    for (var year = 1900; year < 2000; year++) {
        var validDataCount = 0;
        
        yearListSimple.push(year);

        while (birthYears[0] <= year) {
            if (birthYears[0] == year && deathYears[0] > birthYears[0]) {
                validDataCount++;
            }
            birthYears.splice(0, 1);
        }

        validDataPoints.push(validDataCount);
    }
    var pltData3 = [{
        x: yearListSimple,
        y: validDataPoints,
        type: "scatter",
        orientation: "v",
    }];
    pltLayout3 = {
        width: 1600,
        height: 450,
        xaxis: {
            tickangle: "auto",
            title: "year",
        },
        yaxis: {
            tickangle: 45,
            title: "valid data points",
        },
    };

    var html = `<script src="https://cdnjs.cloudflare.com/ajax/libs/plotly.js/2.24.2/plotly.min.js" charset="utf-8"></script>

        <div id="tester" style="width:3200px;height:450px;"></div>
        <div id="tester2" style="width:1000px;height:450px;"></div>
        <div id="tester3" style="width:1600px;height:450px;"></div>

        <script>
            TESTER = document.getElementById('tester');
            Plotly.newPlot( TESTER, ${JSON.stringify(pltData1)}, ${JSON.stringify(pltLayout1)} );

            TESTER = document.getElementById('tester2');
            Plotly.newPlot( TESTER, ${JSON.stringify(pltData2)}, ${JSON.stringify(pltLayout2)} );

            TESTER = document.getElementById('tester3');
            Plotly.newPlot( TESTER, ${JSON.stringify(pltData3)}, ${JSON.stringify(pltLayout3)} );
        </script>`.split("\n").join("");
    fs.writeFileSync(__dirname + "/output.html", html, "utf-8");
})();