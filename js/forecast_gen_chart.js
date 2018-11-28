    $(function() {
    $.getJSON("./data/forecast_gen.json", function(data) {
        var ccgt = [],
            coal = [],
            e_w = [],
            france = [],
            ire = [],
            dutch = [],
            non_hydro = [],
            nuclear = [],
            ocgt = [],
            other = [],
            pumped = [],
            wind = [],
            biomass = [],
            time = [],
            newTime = []
            i = 0;

        for (var i in data) {
          time.push([
            data[i][4],
            data[i][3]
          ])
        };
        // convert dates into UTC standard time
        // moment.js requires input as string, with valueOf() it converts the input into UTC standard time
        for (var j in time) {
          var date = time[j][0] + '/' + time[j][1]
          var utc = moment(date, 'YYYY/w').valueOf()
          newTime.push(utc)
        }

        for (var i in data) {
          if (data[i][0] == 'CCGT') {
            ccgt.push([
                newTime[i], // time
                data[i][5], //
            ])}
          else if (data[i][0] == 'COAL') {
            coal.push([
                newTime[i], // time
                data[i][5], //
            ])}
          else if (data[i][0] == 'INTEW') {
            e_w.push([
                newTime[i], // time
                data[i][5], // dutch
            ])}
          else if (data[i][0] == 'INTFR') {
            france.push([
                newTime[i], // time
                data[i][5], // east-west
            ])}
          else if (data[i][0] == 'INTIRL') {
            ire.push([
                newTime[i], // time
                data[i][5], // french
            ])}
          else if (data[i][0] == 'INTNED') {
            dutch.push([
                newTime[i], // time
                data[i][5], // irish
            ])}
          else if (data[i][0] == 'NPSHYD') {
            non_hydro.push([
                newTime[i], // time
                data[i][5], // dutch
            ])}
          else if (data[i][0] == 'NUCLEAR') {
            nuclear.push([
                newTime[i], // time
                data[i][5], // french
            ])}
          else if (data[i][0] == 'OCGT') {
            ocgt.push([
                newTime[i], // time
                data[i][5], // irish
            ])}
          else if (data[i][0] == 'OTHER') {
            other.push([
                newTime[i], // time
                data[i][5], // dutch
            ])}
          else if (data[i][0] == 'PS') {
            pumped.push([
                newTime[i], // time
                data[i][5], // french
            ])}
          else if (data[i][0] == 'WIND') {
            wind.push([
                newTime[i], // time
                data[i][5], // irish
            ])}
          else if (data[i][0] == 'BIOMASS') {
            biomass.push([
                newTime[i], // time
                data[i][5], // dutch
            ])};
        }
        // create the chart
        $('#gen_forecast_graph_container').highcharts({
            title: {
                text: 'Forecast available generation'
            },
            chart: {
              plotBackgroundColor: '#3f3d3d'
            },
            exporting: {
              enabled: false,
              buttons: {
                  exportButton: {
                      enabled:false
                  },
                  printButton: {
                      enabled:false
                }
              }
            },
            yAxis: [{
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'MW',
                    rotation: 0,
                    x: 30,
                    y: -110
                },
                height: '100%',
                lineWidth: 2
                // max: 2000,
                // min: -2000
            }],
            xAxis: {
              type: 'datetime',
              visible: true,
              tickInterval: 1000 * 60 * 60 * 24 * 7 * 4,
              labels: {
                format: "{value: %b %y}"
              },
                align: 'right',

            },
            plotOptions: {
                column: {
                    pointStart: Date.UTC(1900, 0, 0, 0),
                    pointInterval: 1000 * 60 * 60 * 24 ,
                    pointPadding: -0.2,
                    borderWidth: 0.5,
                    pointWidth: 9,
                    stacking: 'normal'
                }
            },
            series: [
            {
                name: 'Other',
                type: 'column',
                data: other,
            },
            {
                name: 'East-West IC',
                type: 'column',
                data: e_w,
            },
            {
                name: 'France IC',
                type: 'column',
                data: france,
            },
            {
                name: 'Irish IC',
                type: 'column',
                data: ire,
            },
            {
                name: 'Dutch IC',
                type: 'column',
                data: dutch,
            },
            {
                name: 'Non_pumped hydro',
                type: 'column',
                data: non_hydro,
            },
            {
                name: 'OCGT',
                type: 'column',
                data: ocgt,
            },
            {
                name: 'Pumped storage',
                type: 'column',
                data: pumped,
            },
            {
                name: 'Biomass',
                type: 'column',
                data: biomass,
            },
            {
                name: 'Wind',
                type: 'column',
                data: wind,
            },
            {
                name: 'Nuclear',
                type: 'column',
                data: nuclear,
            },
            {
                name: 'Coal',
                type: 'column',
                data: coal,
            },
            {
                name: 'CCGT',
                type: 'column',
                data: ccgt,
            }]
        });
    });
});
