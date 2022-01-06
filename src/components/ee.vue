<template>

	<div>


		<a-drawer class="test" :width="720" placement="right" :closable="false" :visible="visible" @close="onClose">
			<template slot="title">
				<b>去玩儿法大V</b>
			</template>


		</a-drawer>


	</div>


</template>

<script>
	export default {
		data() {
			return {
				camera: "",
				mouse: "",
				scene: "",
				group: "",
				img_width: 0,
				img_height: 0,
				x: 0,
				y: 0,
				z: 0,
				outlinePass: "",
				selectedObjects: [],
				content: "",

				visible: true,
				test: false,
			}
		},


		mounted() {



		},
		created() {
			//    this.initThree() 


		},
		methods: {
			afterVisibleChange(val) {
				console.log('visible', val);
			},
			showDrawer(modelname) {
				this.visible = true;
				this.content = modelname

			},
			onClose() {
				this.visible = false;
			},

		},

	}



</script>

<style scoped>
	#three {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
	}

	/* body {
		margin: 0;
		overflow: hidden;
	 
		background: url("/model/b-city.png") center no-repeat;
		-webkit-background-size: cover;
		background-size: cover;

	} */

	.label {
		color: #FFF;
		font-family: sans-serif;
		padding: 2px;
		background: rgba(0, 0, 0, .6);
	}
 
</style>
 