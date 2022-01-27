<template>
    <div>
        <div class="top_1">
            <div class="main_btn" v-for="item in titles" :key="item.key" :style="item.stylecss"
                @click="chose_menu(item)">

                <div class="main_btn_1">
                    {{item.name}}
                </div>



            </div>
        </div>


    </div>
</template>

<script>
    export default {
        data() {
            return {
                titles: [
                    {
                        key: "1", name: "安防安保", src: "3", stylecss: {
                            background: 'url("/static/images/bg.jpg") no-repeat',
                            backgroundSize: '100% 100px',
                        }
                    },
                    {
                        key: "2", name: "环境品质", src: "3", stylecss: {
                            background: 'url("/static/images/board.png") no-repeat',
                            backgroundSize: '100% 100px',
                        }
                    },
                    {
                        key: "3", name: "照明管理", src: "3", stylecss: {
                            background: 'url("/static/images/bg.png") no-repeat',
                            backgroundSize: '100% 100px',
                        }
                    },
                    {
                        key: "4", name: "报警管理", src: "3", stylecss: {
                            background: 'url("/static/images/33.jpeg") no-repeat',
                            backgroundSize: '100% 100px',
                        }
                    },
                    {
                        key: "5", name: "设备管理", src: "3", stylecss: {
                            background: 'url("/static/images/bg.jpg") no-repeat',
                            backgroundSize: '100% 100px',
                        }
                    },
                    {
                        key: "6", name: "能源管理", src: "3", stylecss: {
                            background: 'url("/static/images/55.jpeg") no-repeat',
                            backgroundSize: '100% 100px',
                        }
                    },
                    {
                        key: "7", name: "停车管理", src: "3", stylecss: {
                            background: 'url("/static/images/33.jpeg") no-repeat',
                            backgroundSize: '100% 100px',
                        }
                    },
                    {
                        key: "8", name: "电梯管理", src: "3", stylecss: {
                            background: 'url("/static/images/b-city.png") no-repeat',
                            backgroundSize: '100% 100px',
                        }
                    },
                ]
            }
        },
        components: {},
        watch: {

        },
        computed: {
            dialogheight() {
                return document.documentElement.clientHeight;
            },
            // target() {
            // 	return new THREE.Vector3(this.x, this.y, this.z)
            // }, 
        },
        mounted() {

        },
        created() {

        },
        methods: {
            chose_menu(e) {
                this.$emit('chosemenu', e)
            },
        },

    }



</script>



<style scoped>
    .top_1 {
        justify-content: space-around;
        flex-direction: column;
    }

    .main_btn {
        height: 100px;
        line-height: 100px;
        font-size: 20px;
        font-weight: 500;
        /* background-color: rgba(71, 79, 197, 0.637); */
        background-size: 100% 100px;
        border-radius: 5px;
        background-size: 100% 100px;
        margin-bottom: 10px;
        text-align: right; 
        cursor: pointer;
    }

    .main_btn_1 {
        padding-right: 10px;
        width: 100%;
        color: white;
        font-size: 24px;
        font-weight: 500;
        font-family: 'DFKai-SB', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

    .main_btn_1:hover {
        width: 100%;
        background: rgba(0, 255, 149, 0.438) !important;
    }
</style>

<style>

</style>