const fs = require("fs");
const dfd = require("danfojs-node");

(async function() {
    df = await dfd.readJSON(__dirname + "/filteredGenderedData.json");
    df.head().print();
    //df.plot("Born: Year ", "Rough Age (death year - birth year)", ["Predicted Gender"]).bar();

    var birthYears = df.column("Born: Year ").values;
    var ages = df.column("Rough Age (death year - birth year)").values;
    var predictedGenders = df.column("Predicted Gender").values;
    var pltData = [{
        x: [birthYears, predictedGenders],
        y: ages,
        type: "bar",
        orientation: "v",
    }];
    
    var html = `<script src="https://cdnjs.cloudflare.com/ajax/libs/plotly.js/2.24.2/plotly.min.js" charset="utf-8"></script>

        <div id="tester" style="width:600px;height:250px;"></div>

        <script>
            TESTER = document.getElementById('tester');
            Plotly.newPlot( TESTER, ${JSON.stringify(pltData)});
        </script>`;
    fs.writeFileSync(__dirname + "/output.html", html, "utf-8");
})();