<template>
	<div>
		<highcharts :options="options" :styles="styles"></highcharts>

	</div>
</template>


<script>
	export default {
		data() {
			return {
				styles: {
					width: "100%",
					height: "300px",
				},

				options: {
					// chart: {
					// 	backgroundColor: null,
					// 	type: 'line',
					// },
					// title: {
					// 	text: 'ads'
					// },
					// tooltip: {
					// 	animation: true,
					// 	shared: true,
					// 	useHTML: true,
					// 	formatter: function () {
					// 		var str = "";
					// 		this.points ?
					// 			this.points.map(function (point) {
					// 				str = str + "<b>" + point.series.name + "</b>" + ': ' + point.y + '<br>';
					// 			}) : []
					// 		return str
					// 	},
					// 	crosshairs: true,

					// },
					// xAxis: {
					// 	title: {
					// 		text: 'x轴标题',
					// 	},

					// },
					// yAxis: {
					// 	title: {
					// 		text: 'y轴标题',
					// 	},
					// },
					// plotOptions: {
					// 	pie: {
					// 		allowPointSelect: true,
					// 		cursor: 'pointer',
					// 		depth: 35,
					// 		dataLabels: {
					// 			enabled: true,
					// 			format: '{point.name}'
					// 		}
					// 	}
					// },
					series: [{
						name: '安装，实施人员',
						data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
					}, {
						name: '工人',
						data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
					}, {
						name: '销售',
						data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
					}, {
						name: '项目开发',
						data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
					}, {
						name: '其他',
						data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
						color:"red"
					}]
				}
			};
		},
	};
</script>