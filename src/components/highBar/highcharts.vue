<template>
	<div></div>
</template>

<script>
	import merge from 'deepmerge'
	import Highcharts from 'highcharts/highstock';
	import HighchartsMore from 'highcharts/highcharts-more';
	import HighchartsDrilldown from 'highcharts/modules/drilldown';
	import Highcharts3D from 'highcharts/highcharts-3d';
	HighchartsMore(Highcharts)
	HighchartsDrilldown(Highcharts);
	Highcharts3D(Highcharts);

	export default {
		props: {
			styles: {
				type: Object, default: () => ({

				})
			},
			options: {
				type: Object, default: () => ({})
			},
			optionsDef: {
				type: Object, default: () => ({
					chart: {
						backgroundColor: null,
						type: 'line',
					},
					title: {
						text: 'test'
					},
					credits: {
						enabled: false //去除右下角水印
						// text: "EF2Factory",
						// href: "http://efactory.getac.com.cn",
						// style: {                            // 样式设置
						// 	cursor: 'pointer',
						// 	color: '#e2e2e2',
						// 	fontSize: '10px'
						// },
						// position: {
						// 	y: -10, 
						// }
					},
					xAxis: {
						title: {
							text: null,
							style: {
								fontSize: "14px",
								fontWeight: "999",
								color: "#fff",
							}
						},
						labels: {
							style: {
								color: "white"
							},
							formatter: function () {
								return this.value
							}
						}
					},
					yAxis: {

						title: {
							text: null,
							style: {
								fontSize: "14px",
								fontWeight: "999",
								color: "#fff",
							}
						},
						labels: {
							style: {
								color: "white"
							},
							formatter: function () {
								return this.value
							}
						}
					},
					tooltip: {
						animation: true,
						shared: true,
						useHTML: true,
						formatter: function () {
							var str = "";
							this.points ?
								this.points.map(function (point) {
									str = str + "<b>" + point.series.name + "</b>" + ': ' + point.y + '<br>';
								}) : []
							return str
						},
						crosshairs: true,

					},
				})
			}
		},
		name: 'highcharts',
		data() {
			return {
				chart: null
			}
		},
		mounted() {
			this.initChart();
		},
		computed: {
			optionsSet: function () {
				return merge(this.optionsDef, this.options)
			},
		},
		methods: {
			initChart() {

				this.$el.style.width = (this.styles.width || "400px");
				this.$el.style.height = (this.styles.height || "200px");
				this.$el.style.background = this.styles.backgroundColor
				// this.$el.style.width = (this.styles.width || 400) + 'px';
				// this.$el.style.height = (this.styles.height || 200) + 'px';
				console.log(this.optionsSet)
				this.chart = new Highcharts.Chart(this.$el, this.optionsSet);
			}
		}
	}
</script>