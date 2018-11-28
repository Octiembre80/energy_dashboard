    $(function() {
    $.getJSON("./data/forecast_dem.json", function(data) {
        var wn = [],
            wt = [],
            wm = [],
            oc = [],
            time = [],
            newTime = []
        i = 0;

        for (var i in data) {
          if (data[i][0] == 'WN') {
            wn.push([
                data[i][1], // time
                data[i][4], //
            ])}
          else if (data[i][0] == 'WT') {
            wt.push([
                data[i][1], // time
                data[i][4], //
            ])}
          else if (data[i][0] == 'WM') {
            wm.push([
                data[i][1], // time
                data[i][4], // dutch
            ])}
          else if (data[i][0] == 'OCNMFW2') {
            oc.push([
                data[i][1], // time
                data[i][4], // east-west
            ])};
        }
        // convert dates into UTC standard time
        list = [wn, wt, wm, oc];
        for (var i in list) {
          array = list[i];
          // console.log(array);
          dateNow = Date.now();
          year = moment(dateNow).year();
          for (var j in array) {
            var date = year + '/' + array[j][0];
            if (array[j][0] == '52'){
              year = year + 1;
            }
            array[j][0] = moment(date, 'YYYY/w').valueOf();
          }
        };
        // create the chart
        $('#dem_forecast_graph_container').highcharts({
            title: {
                text: 'Forecast demand'
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
                    y: -140
                },
                height: '100%',
                lineWidth: 2
                // max: 2000,
                // min: -2000
            }],
            xAxis: {
              type: 'datetime',
              visible: true,
              tickInterval: 1000 * 60 * 60 * 24 * 30,
              labels: {
                format: "{value: %b %y}"
              },
                align: 'right',
                // y: 30,
                // x: -10,
                // rotation: -30
            },
            plotOptions: {
              series: {
                pointStart: Date.UTC(1900, 0, 0, 0),
                pointInterval: 1000 * 60 * 60 * 24 * 30,
                pointWidth: 10,
                marker: {
                  enabled: false
                  }
                }
              },
            series: [
            {
                name: 'NDFW',
                type: 'areaspline',
                data: wn,
                fillOpacity: 0.5
            },
            {
                name: 'TSDFW',
                type: 'areaspline',
                data: wt,
                fillOpacity: 0.5
            },
            {
                name: 'OCNMFW',
                type: 'areaspline',
                data: wm,
                fillOpacity: 0.5
            },
            {
                name: 'OCNMFW2',
                type: 'areaspline',
                data: oc,
                fillOpacity: 0.5
            }]
        });
    });
});
