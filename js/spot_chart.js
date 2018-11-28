    $(function() {
    $.getJSON("./data/priceData.json", function(data) {
        var mip = [],
            imbPrice = [],
            volume = [],
            time = [],
            newTime = []
            i = 0;

        for (var i in data) {
          time.push(
              data[i][5], // date
          );
        }

        // convert dates into UTC standard time
        for (var j in time) {
          list = []
          list.push([
            parseInt(time[j].split('-')[0]), //push year as int
            parseInt(time[j].split('-')[1]), //push month as int
            parseInt(time[j].split('-')[2]), //push day as int
            parseInt(parseInt(time[j].split('-')[3])/2), //configure period to hour and push
            (((parseInt(time[j].split('-')[3])%2)/2)*60) //configure period to min and push
          ])
          // required format Date.UTC(2018, 08, 23, 15, 40, 00)
          var utc = Date.UTC(list[0][0], list[0][1]-1, list[0][2], list[0][3], list[0][4])
          newTime.push(utc)
        }

        for (var i in data) {
            mip.push([
                newTime[i], // date
                data[i][2], // mip
            ]);

            imbPrice.push([
                newTime[i], // date
                data[i][4]  // imbalance price
            ]);

            volume.push([
                newTime[i],  // date
                data[i][3]  // volume
            ]);
        }
        // create the chart
        $('#spot_market_graph_container').highcharts({
            title: {
                text: 'Spot Market'
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
                    text: 'Price (£/MWh)'
                },
                height: '60%',
                lineWidth: 2
            }, {
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'Volume (MW)'
                },
                top: '65%',
                height: '35%',
                offset: 0,
                lineWidth: 2
            }],
            xAxis: {
                type: 'datetime',
                tickInterval: 1000 * 60 * 60 * 12,
                labels: {
                  format: "{value: %e %b %H:%M}",
                  align: 'right',
                  // rotation: -30,
                  // y: 40
                }
              },
            plotOptions: {
              series: {
                pointStart: Date.UTC(1900, 0, 0, 0),
                pointInterval: 1000 * 60 * 60 * 24,
                marker: {
                  enabled: false
                  }
                },
              column: {
                pointStart: Date.UTC(1900, 0, 0, 0),
                pointInterval: 1000 * 60 * 60 * 24,
                pointPadding: -0,
                borderWidth: 0.3,
              }
            },
            series: [{
                name: 'Market Index',
                type: 'areaspline',
                data: mip,
                fillOpacity: 0.5,
            }, {
                name: 'Imbalance Price',
                type: 'areaspline',
                fillOpacity: 0.5,
                data: imbPrice,
            }, {
                name: 'Volume',
                type: 'column',
                data: volume,
                yAxis: 1,
            }]
        });
    });
});
