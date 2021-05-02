// echarts和zrender被echarts-plain.js写入为全局接口
var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

option = {
    tooltip: {
        trigger: 'item'
    },
    // legend: {
    //     top: '5%',
    //     left: 'center'
    // },
    series: [
        {
            name: 'Nutrition',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold',
                    color: 'white'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 50,name: 'Protein'},
                {value: 735, name: 'Vitamin C'},
                {value: 580, name: 'Fiber'},
                {value: 484, name: 'Sugar'},
                {value: 300, name: 'Fat'},
                {value: 300, name: 'Carbohydrates'},
                {value: 300, name: 'Sodium'}
            ]
        }
    ]
};

myChart.setOption(option);

var chartDom1 = document.getElementById('main1');
var myChart1 = echarts.init(chartDom1);
var option1;

option1 = {
    tooltip: {
        trigger: 'item'
    },
    // legend: {
    //     top: '5%',
    //     left: 'center'
    // },
    series: [
        {
            name: 'Calories Status',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold',
                    color: 'white'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 50,name: 'Calories Intake'},
                {value: 735, name: 'Calories Quota'}
            ]
        }
    ]
};

myChart1.setOption(option1);

var chartDom2 = document.getElementById('main2');
var myChart2 = echarts.init(chartDom2);
var option2;

option2 = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['Standard', 'Actual Intake']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        data: ['Sodium','Carbohydrates' , 'Fat', 'Suger','Fiber', 'Vitamin C','Protein']
    },
    series: [
        {
            name: 'Standard',
            type: 'bar',
            data: [2.3, 310, 70, 90, 30, 0.08,50]
        },
        {
            name: 'Actual Intake',
            type: 'bar',
            data: [2.3, 310, 70, 90, 30, 0.08,50]
        }
    ]
};

option2 && myChart2.setOption(option2);