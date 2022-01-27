import highcharts from './highcharts.vue';
 
highcharts.install = function (Vue) {
    Vue.component(highcharts.name, highcharts);
};
export default highcharts;