<template>
    <div>
        <a-cascader :options="options" placeholder="Please select" @change="onChange" />

        <a-divider orientation="left">设备</a-divider>
        <div style=" display: flex; flex-wrap: wrap;justify-content: left;">
            <a-button style="margin: 5px;width: 150px;text-align: left;" v-for="item in equips" :key="item.id"
                :value="item.id" ghost @click="chose_equip(item)">
                {{item.id}}-{{item.name}}
            </a-button>
        </div>


        <a-divider orientation="left">{{equipment}}</a-divider>

        <a-tabs type="card" default-active-key="1" :size="size">
            <a-tab-pane key="1" tab="详细信息">
                <v-detail></v-detail>
            </a-tab-pane>
            <a-tab-pane key="2" tab="相关文档">
                Content of tab 2
            </a-tab-pane>
            <a-tab-pane key="3" tab="实时状态">
                <div style="background: url('/static/images/board.png');background-size: 100% 100%;">
                    <v-highchart></v-highchart>
                </div>
            </a-tab-pane>
            <a-tab-pane key="4" tab="运行参数">
                Content of tab 4
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
    import VDetail from './detailInfo.vue'
    import VHighchart from './highchart.vue'

    export default {
        data() {
            return {
                size: 'small',
                equipment: "",
                equips: [],
            };
        },
        components: { VDetail, VHighchart },
        computed: {
            options() {
                var arr = [];
                for (var i = 1; i < 8; i++) {
                    arr.push({
                        value: 'K' + i,
                        label: 'K' + i,
                        children: [
                            {
                                value: '1F',
                                label: '1F',
                                children: [{
                                    value: "1",
                                    label: "test1"
                                }]
                            },
                            {
                                value: '2F',
                                label: '2F',
                                children: [{
                                    value: "1",
                                    label: "test2"
                                }]
                            },
                            {
                                value: '3F',
                                label: '3F',
                                children: [{
                                    value: "1",
                                    label: "test3"
                                }]
                            },
                            {
                                value: '4F',
                                label: '4F',
                                children: [{
                                    value: "1",
                                    label: "test4"
                                }]
                            },
                        ]
                    });
                }
                return arr;
            },
        },
        created() {


            Promise.all(Array(this.$localForage.getItem('names'))).then(value => {
                this.equips = value[0].sort(function (a, b) {
                    return Number(a.id) - Number(b.id)
                })
                console.log(this.equips)
            })
        },
        methods: {
            onChange(value) {
                console.log(value);
            },

            chose_equip(e) {
                this.equipment = e.name;
                this.$emit("choseequip", e)
            },
        },
    };
</script>