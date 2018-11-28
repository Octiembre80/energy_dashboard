    $(function() {
    $.getJSON("./data/weather.json", function(data) {
        var temp = [],
            rain = [],
            clouds = [],
            wind = [],
            time = [],
            newTime = []
        i = 0;

        for (var i in data) {
            time.push([
                data[i][2]
            ])
        }

        // convert into UTC time for acceptable graph input
        for (var j in time) {
          list = []
          list.push([
            parseInt(time[j][0].split('-')[0]), //push year as int
            parseInt(time[j][0].split('-')[1]), //push month as int
            parseInt(time[j][0].split('-')[2].split(' ')[0]), //split day from time and push day as int
            parseInt(time[j][0].split('-')[2].split(' ')[1].split(':')[0]) //split time up and push hour as int
          ])
          // required format Date.UTC(2018, 08, 23, 15, 40, 00)
          var utc = Date.UTC(list[0][0], list[0][1]-1, list[0][2], list[0][3])
          newTime.push(utc)
        }

        for (var i in newTime) {
            temp.push([
                newTime[i], //
                data[i][3]
            ]),
            rain.push([
                newTime[i], //
                data[i][1]
            ]),
            clouds.push([
                newTime[i], //
                data[i][0]
            ]),
            wind.push([
                newTime[i], //
                data[i][5]
            ])
        }
        // create the chart
        $('#weather_graph_container').highcharts({
            title: {
                text: 'Weather forecast'
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

            yAxis: [{ // Primary yAxis
                labels: {
                    align: 'right',
                    x: -3,
                    format: '{value}°C',
                },
                title: {
                    text: 'Temperature',
                },
                opposite: false,
                min: 0,
                max: 40

            }, { // Secondary yAxis
                gridLineWidth: 0,
                title: {
                    text: 'Rainfall',
                },
                labels: {
                    align: 'left',
                    x: 3,
                    format: '{value} mm',
                },
                opposite: true,
                visible: true

            }, { // Tertiary yAxis
                gridLineWidth: 0,
                title: {
                    text: 'Wind speed',
                },
                labels: {
                    format: '{value} m/s',
                },
                visible: false
                // opposite: true
            }, { // Fourth yAxis
                gridLineWidth: 0,
                title: {
                    text: 'Cloud cover',
                },
                labels: {
                    format: '{value} %',
                },
                visible: false,
                opposite: true,
                min: 0,
                max: 100
            }],
            xAxis: {
              type: 'datetime',
              visible: true,
              tickInterval: 1000 * 60 * 60 * 24,
              labels: {
                format: "{value: %e %b}"
              },
              align: 'left',
              x: 3
            },
            dateTimeLabelFormats: {
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
                },
              column: {
                pointPadding: 1,
                borderWidth: 0.3,
                }
              },
            series: [
            // {
            //     name: 'Cloud cover',
            //     type: 'bubble',
            //     data: clouds,
            //     opacity: 0.1,
            //     color: '#DD8452',
            // },
            {
                name: 'Rain',
                type: 'column',
                yAxis: 1,
                data: rain,
                fillOpacity: 0.5,
                color: '#4C72B0',
            },
            {
                name: 'Wind',
                type: 'spline',
                data: wind,
                yAxis: 2,
                fillOpacity: 0.5,
                color: '#55A868',
                dashStyle: 'shortdot',
                labels: {
                    format: '{value} m/s',
                }
            },
            {
                name: 'Temperature',
                type: 'spline',
                data: temp,
                yAxis: 0,
                fillOpacity: 0,
                color: '#C44E52',
            }]
        });
    });
});
