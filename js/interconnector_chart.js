    $(function() {
    $.getJSON("./data/interconnector.json", function(data) {
        var french = [],
            irish = [],
            dutch = [],
            e_w = [],
            time = [],
            newTime = []
            i = 0;

        for (var i in data) {
            time.push([
                data[i][0], // date
                data[i][1], // period
            ]);
        }

        // convert dates into UTC standard time
        for (var j in time) {
          list = []
          list.push([
            parseInt((time[j][0].toString()).substring(0,4)), //push year as int
            parseInt((time[j][0].toString()).substring(4,6)), //push month as int
            parseInt((time[j][0].toString()).substring(6,8)), //push day as int
            parseInt(time[j][1]/2), //configure period to hour and push
            parseInt(((time[j][1]%2)/2)*60) //configure period to min and push
          ])
          // required format Date.UTC(2018, 08, 23, 15, 40, 00)
          var utc = Date.UTC(list[0][0], list[0][1]-1, list[0][2], list[0][3], list[0][4])
          newTime.push(utc)
        }

        for (var i in data) {
            french.push([
                newTime[i], // time
                data[i][2], // french
            ]),
            irish.push([
                newTime[i], // time
                data[i][3], // irish
            ]),
            dutch.push([
                newTime[i], // time
                data[i][4], // dutch
            ]),
            e_w.push([
                newTime[i], // time
                data[i][5], // east-west
            ]);
        }

        // create the chart
        $('#interconnector_graph_container').highcharts({
            title: {
                text: 'Interconnector flows'
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
                    rotation: 0
                },
                height: '100%',
                max: 2000,
                min: -2000
            }],
            xAxis: {
              type: 'datetime',
              visible: true,
              tickInterval: 1000 * 60 * 60 * 18,
              labels: {
                format: "{value: %e %b %H:%M}"
              },
              align: 'right',
                // y: 30,
                // x: -10,
                // rotation: -30
            },
            dateTimeLabelFormats: {
              second: '%H:%M:%S',
              minute: '%H:%M',
              hour: '%H:%M',
              weekly: '%e. %b %y',
              twicemonthly: '%e. %b %y',
              monthly: '%b %y',
              twomonths: '%b %y',
              threemonths: '%b %y',
              fourmonths: '%b %y',
              sixmonths: '%b %y',
              yearly: '%Y'
            },
            plotOptions: {
              series: {
                pointStart: Date.UTC(1900, 0, 0, 0),
                pointInterval: 1000 * 60 * 60 * 24,
                pointWidth: 10,
                marker: {
                  enabled: false
                  }
                }
              },
            series: [{
                name: 'French',
                type: 'line',
                data: french,
            },
            {
                name: 'Irish',
                type: 'line',
                data: irish,
            },
            {
                name: 'Dutch',
                type: 'line',
                data: dutch,
            },
            {
                name: 'East-West',
                type: 'line',
                data: e_w,
          }]
        });
    });
});
