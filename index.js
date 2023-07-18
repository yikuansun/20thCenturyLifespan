const fs = require("fs");
const dfd = require("danfojs-node");

(async function() {
    df = await dfd.readJSON(__dirname + "/filteredGenderedData.json");
    //df.plot("Born: Year ", "Rough Age (death year - birth year)", ["Predicted Gender"]).bar();

    df.sortValues("Born: Year ", { inplace: true });
    var birthYears = JSON.parse(JSON.stringify(df.column("Born: Year ").values));
    var deathYears = JSON.parse(JSON.stringify(df.column("Died: Year").values));
    var predictedGenders = JSON.parse(JSON.stringify(df.column("Predicted Gender").values));
    var yearListM = [];
    var yearListF = [];
    var avgAgesM = [];
    var avgAgesF = [];
    for (var year = 1850; year < 1950; year++) {
        var mLifespans = [];
        var fLifespans = [];
        
        while (birthYears[0] <= year) {
            if (birthYears[0] == year && deathYears[0] >= birthYears[0]) {
                ((predictedGenders[0] == "m")?mLifespans:fLifespans).push(deathYears[0] - birthYears[0]);
            }
            birthYears.splice(0, 1);
            deathYears.splice(0, 1);
            predictedGenders.splice(0, 1);
        }

        var mSum = 0;
        for (var age of mLifespans) mSum += age;
        var ageM = mSum / mLifespans.length;
        if (ageM) avgAgesM.push(ageM);
        if (ageM) yearListM.push(year);

        var fSum = 0;
        for (var age of fLifespans) fSum += age;
        var ageF = fSum / fLifespans.length;
        if (ageF) avgAgesF.push(ageF);
        if (ageF) yearListF.push(year);

    }
    var pltData1 = [{
        x: yearListM,
        y: avgAgesM,
        type: "scatter",
        orientation: "v",
        marker: {
            color: "darkblue",
        },
        name: "male",
    }, {
        x: yearListF,
        y: avgAgesF,
        type: "scatter",
        orientation: "v",
        marker: {
            color: "deeppink",
        },
        name: "female",
    }];
    pltLayout1 = {
        width: 1200,
        height: 450,
        xaxis: {
            tickangle: "auto",
            title: "year of birth",
        },
        yaxis: {
            tickangle: 45,
            title: "avg. lifespan",
        },
    };

    birthYears = JSON.parse(JSON.stringify(df.column("Born: Year ").values));
    deathYears = JSON.parse(JSON.stringify(df.column("Died: Year").values));
    predictedGenders = JSON.parse(JSON.stringify(df.column("Predicted Gender").values));
    var decadeList = [];
    var avgAges10YrM = [];
    var avgAges10YrF = [];
    for (var decade = 1850; decade < 1950; decade += 10) {
        decadeList.push(decade);

        var mLifespans = [];
        var fLifespans = [];
        
        while (birthYears[0] < decade + 10) {
            if (birthYears[0] >= decade && deathYears[0] >= birthYears[0]) {
                ((predictedGenders[0] == "m")?mLifespans:fLifespans).push(deathYears[0] - birthYears[0]);
            }
            birthYears.splice(0, 1);
            deathYears.splice(0, 1);
            predictedGenders.splice(0, 1);
        }

        var mSum = 0;
        for (var age of mLifespans) mSum += age;
        avgAges10YrM.push(mSum / mLifespans.length);

        var fSum = 0;
        for (var age of fLifespans) fSum += age;
        avgAges10YrF.push(fSum / fLifespans.length);

    }
    var pltData2 = [{
        x: decadeList,
        y: avgAges10YrM,
        type: "scatter",
        orientation: "v",
        marker: {
            color: "darkblue",
        },
        name: "male",
    }, {
        x: decadeList,
        y: avgAges10YrF,
        type: "scatter",
        orientation: "v",
        marker: {
            color: "deeppink",
        },
        name: "female",
    }];
    pltLayout2 = {
        width: 1000,
        height: 450,
        xaxis: {
            tickangle: "auto",
            title: "decade of birth",
        },
        yaxis: {
            tickangle: 45,
            title: "avg. lifespan",
        },
    };

    birthYears = JSON.parse(JSON.stringify(df.column("Born: Year ").values));
    var yearListSimple = [];
    var validDataPoints = [];
    for (var year = 1850; year < 1950; year++) {
        var validDataCount = 0;
        
        yearListSimple.push(year);

        while (birthYears[0] <= year) {
            if (birthYears[0] == year && deathYears[0] >= birthYears[0]) {
                validDataCount++;
            }
            birthYears.splice(0, 1);
        }

        validDataPoints.push(validDataCount);
    }
    var pltData3 = [{
        x: yearListSimple,
        y: validDataPoints,
        type: "bar",
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

    birthYears = JSON.parse(JSON.stringify(df.column("Born: Year ").values));
    deathYears = JSON.parse(JSON.stringify(df.column("Died: Year").values));
    predictedGenders = JSON.parse(JSON.stringify(df.column("Predicted Gender").values));
    var decadeList2 = [];
    var gap10Yr = [];
    var cWayGaps = [];
    for (var decade = 1850; decade < 1950; decade += 10) {
        decadeList2.push(decade);

        var mLifespans = [];
        var fLifespans = [];
        
        while (birthYears[0] < decade + 10) {
            if (birthYears[0] >= decade && deathYears[0] >= birthYears[0]) {
                ((predictedGenders[0] == "m")?mLifespans:fLifespans).push(deathYears[0] - birthYears[0]);
            }
            birthYears.splice(0, 1);
            deathYears.splice(0, 1);
            predictedGenders.splice(0, 1);
        }

        var mSum = 0;
        for (var age of mLifespans) mSum += age;
        var avgMAge = mSum / mLifespans.length;

        var fSum = 0;
        for (var age of fLifespans) fSum += age;
        var avgFAge = fSum / fLifespans.length;

        gap10Yr.push( avgMAge - avgFAge );

        cWayGaps.push((avgMAge > avgFAge)?"darkblue":"deeppink");
    }
    var pltData4 = [{
        x: decadeList2,
        y: gap10Yr,
        type: "bar",
        orientation: "v",
        marker: {
            color: cWayGaps,
        },
    }];
    pltLayout4 = {
        width: 1000,
        height: 450,
        xaxis: {
            tickangle: "auto",
            title: "decade of birth",
        },
        yaxis: {
            tickangle: 45,
            title: "avg. male lifespan - avg. female lifespan",
        },
    };

    var html = `<script src="https://cdnjs.cloudflare.com/ajax/libs/plotly.js/2.24.2/plotly.min.js" charset="utf-8"></script>

        <div id="tester" style="width:1200px;height:450px;"></div>
        <div id="tester2" style="width:1000px;height:450px;"></div>
        <div id="tester3" style="width:1600px;height:450px;"></div>
        <div id="tester4" style="width:1600px;height:450px;"></div>

        <script>
            TESTER = document.getElementById('tester');
            Plotly.newPlot( TESTER, ${JSON.stringify(pltData1)}, ${JSON.stringify(pltLayout1)} );

            TESTER = document.getElementById('tester2');
            Plotly.newPlot( TESTER, ${JSON.stringify(pltData2)}, ${JSON.stringify(pltLayout2)} );

            TESTER = document.getElementById('tester3');
            Plotly.newPlot( TESTER, ${JSON.stringify(pltData3)}, ${JSON.stringify(pltLayout3)} );

            TESTER = document.getElementById('tester4');
            Plotly.newPlot( TESTER, ${JSON.stringify(pltData4)}, ${JSON.stringify(pltLayout4)} );
        </script>`.split("\n").join("");
    fs.writeFileSync(__dirname + "/output.html", html, "utf-8");
})();