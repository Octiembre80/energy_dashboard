//
// Custom theme for dashboard
//
(function(a){"object"===typeof
module&&module.exports?module.exports=a:a(Highcharts)})(function(a)
{a.theme = {
    colors: ['#4C72B0', '#C44E52', '#55A868', '#DD8452', '#8172B3', '#937860',
             '#DA8BC3', '#CCB974', '#8C8C8C', '#64B5CD'],
    chart: {
        plotBackgroundColor: '#3f3d3d',
        backgroundColor:  'rgba(80, 140, 200, 0)',
    },
    title: {
        style: {
            color: '#FFFFFF',
            font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
        }
    },
    subtitle: {
        style: {
            color: '#FFFFFF',
            font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
        }
    },
    yAxis: {
      labels: {
        style: {
          color: "#FFFFFF"
        }
      },
      title: {
        style: {
          color: "#FFFFFF"
        }
      }
    },
    xAxis: {
      labels: {
        style: {
          color: "#FFFFFF"
        }
      }
    },
    legend: {
        itemStyle: {
            font: '9pt Trebuchet MS, Verdana, sans-serif',
            color: '#FFFFFF'
        },
        itemHoverStyle:{
            color: 'gray'
        },
        verticalAlign: "bottom"
    }
};

// Apply the theme
a.setOptions(a.theme)});
