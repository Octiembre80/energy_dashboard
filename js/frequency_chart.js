    $(function() {
    $.getJSON("./data/frequency.json", function(data) {
        var frequency = [],
            i = 0;

        for (var i in data) {
            frequency.push([
                data[i][1], // time
                data[i][0], // frequency
            ]);
        }
        // create the chart
        $('#frequency_container').highcharts({
            title: {
                text: null
            },
            legend: {
              enabled: false
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
                    text: 'System Frequency (Hz)'
                },
                height: '100%',
                lineWidth: 2,
                min: 49.5,
                max: 50.5
            }],
            xAxis: {
                visible: false
            },
            plotOptions: {
              series: {
                marker: {
                  enabled: false
                  }
                }
              },
            series: [{
                name: 'Frequency',
                type: 'line',
                data: frequency,
                color: '#55A868',

            }]
        });
    });
});
