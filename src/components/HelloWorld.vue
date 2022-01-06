<template>

	<div>

		<canvas id="three"></canvas>
		<a-drawer class="test" :width="720" placement="right" :closable="false" :visible="visible"
			:after-visible-change="afterVisibleChange" @close="onClose">
			<template slot="title">
				<b>{{content}}</b>
			</template>

			<v-table></v-table>

		</a-drawer>




	</div>


</template>

<script>
	import * as THREE from 'three'
	import VTable from './table.vue'


	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
	//  import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
	// import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'

	import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
	import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
	import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
	import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
	import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';

	import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
	import Vue from 'vue'
	import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";

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

				visible: false,
				test: false,
				controls2: null,
				controls: null,
				labelRenderer: null,
				renderer: null,
				// bodystyle: { background: "rgba(131, 187, 224, 0.6) !important" },
				// headerstyle: { background: "rgba(131, 187, 224, 0.6) !important" },
				// drawerstyle: { background: "rgba(131, 187, 224, 0.6) !important" },
				// wrapstyle: { background: "rgba(131, 187, 224, 0.6) !important" }
			}
		},
		components: { VTable },
		watch: {

		},
		computed: {
			// target() {
			// 	return new THREE.Vector3(this.x, this.y, this.z)
			// },

		},
		mounted() {

			this.initThree()
			this.$nextTick(() => {

				document.addEventListener('keyup', (e) => {
					if (e.keyCode == 27) {
						//this.camera.position.set(0, 1, 10);

						this.moveCamera(this.camera.position,
							({ x: this.x, y: 0, z: 0 }),
							({ x: 0, y: 1, z: 10 }),
							({ x: 0, y: 0, z: 0 }),
						);
						this.x = 0;
					}

				})

			})

		},
		created() {
			//    this.initThree() 

			window.addEventListener('click', this.onMouseClick, false);
		},
		methods: {
			moveCamera(oldP, oldT, newP, newT, callback) {
				let tween = new TWEEN.Tween({
					x1: oldP.x,
					y1: oldP.y,
					z1: oldP.z,
					x2: oldT.x,
					y2: oldT.y,
					z2: oldT.z,
				});
				tween.to(
					{
						x1: newP.x,
						y1: newP.y,
						z1: newP.z,
						x2: newT.x,
						y2: newT.y,
						z2: newT.z,
					},
					2000
				);

				let self = this;
				// 每一帧执行函数 、这个地方就是核心了、每变一帧跟新一次页面元素
				tween.onUpdate((object) => {
					self.camera.position.set(object.x1, object.y1, object.z1);
					self.controls.target0.x = object.x2;
					self.controls.target0.y = object.y2;
					self.controls.target0.z = object.z2;
					self.controls.update();
				});

				// 动画完成后的执行函数
				tween.onComplete(() => {
					this.controls.enabled = true;
				});

				tween.easing(TWEEN.Easing.Cubic.InOut);
				// 这个函数必须有、这个是启动函数、不加不能启动
				tween.start();
			},

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

			initThree() {
				let composer, effectFXAA, labelRenderer;
				let bgtext = new THREE.TextureLoader().load(
					'/static/model/bg.jpeg'
				)

				const group = new THREE.Group();
				const scene = new THREE.Scene()
				scene.background = bgtext// new THREE.Color('#f2f2f2')
				scene.fog = new THREE.Fog('#eee', 20, 50)

				const canvas = document.querySelector('#three')
				const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
				renderer.shadowMap.enabled = true
				this.renderer = renderer;
				//document.body.appendChild(renderer.domElement);

				labelRenderer = new CSS2DRenderer({ canvas });
				labelRenderer.setSize(window.innerWidth, window.innerHeight);
				labelRenderer.domElement.style.position = 'absolute';
				labelRenderer.domElement.style.top = '-100px';
				document.body.appendChild(labelRenderer.domElement);

				const camera = new THREE.PerspectiveCamera(
					50,
					window.innerWidth / window.innerHeight,
					0.1,
					1000
				)
				camera.position.z = 10
				camera.position.y = 1
				camera.position.x = 0


				this.camera = camera;


				let loader = new GLTFLoader()
				loader.load('static/model/smt2.glb', (gltf) => {
					console.log(gltf)
					let model = gltf.scene
					model.position.set(0, 0, 0)
					model.traverse((o) => {
						if (o.name != '文本') {
							if (o.name == 'smt4') {
								console.log(o)
								// o.material = new THREE.MeshBasicMaterial({
								// 	color: 0xe2e2e2,
								// 	transparent: true,
								// 	opacity: 0.9,
								// })
							} else {
								o.material = new THREE.MeshBasicMaterial({
									color: 0xe2e2e2,
									transparent: true,
									opacity: 0.9,
								})
							}
						}

						// if (o.name == "print") {
						// 	let explosionTexture = new THREE.TextureLoader().load(
						// 		'/static/model/11.jpg'
						// 	)
						// 	//调整纹理图的方向
						// 	explosionTexture.flipY = false
						// 	//将纹理图生成基础网格材质(MeshBasicMaterial)
						// 	const material = new THREE.MeshBasicMaterial({
						// 		map: explosionTexture,
						// 	})
						// 	//给模型每部分上材质
						// 	o.material = material


						// }
						// else 
						if (o.name == 'SPI') {
							const earthDiv = document.createElement('div');
							earthDiv.className = 'label';
							earthDiv.id = 'SPI';
							earthDiv.textContent = 'Earth';
							earthDiv.innerHTML = "<button>test</button><table><tr><td>Input</td><td>123</td></tr></table><v-table v-if='" + this.test + "'></v-table>";
							earthDiv.style.marginTop = '-10px';
							earthDiv.style.backgroundColor = 'rgba(122,32,44,0.1)';

							const earthLabel = new CSS2DObject(earthDiv);
							earthLabel.position.set(0, 2, 0);
							o.add(earthLabel);
						}
						if (o.isMesh) {
							o.castShadow = true 
						}
					})
					group.add(model)
					scene.add(group)
				})

				this.group = group;
				const hemLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6)
				hemLight.position.set(0, 5, 2)
				scene.add(hemLight)

				const dirLight = new THREE.DirectionalLight(0xffffff, 1)
				//光源等位置
				dirLight.position.set(0, 10, 5)
				//可以产生阴影
				dirLight.castShadow = true
				dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024)
				scene.add(dirLight)

				let floorGeometry = new THREE.PlaneGeometry(8000, 8000)
				let floorMaterial = new THREE.MeshPhongMaterial({
					color: "grey",
					shininess: 0,
				})

				let floor = new THREE.Mesh(floorGeometry, floorMaterial)
				floor.rotation.x = -0.5 * Math.PI
				floor.receiveShadow = true
				floor.position.y = -0.001
				scene.add(floor)
				// var pointLight = new THREE.PointLight("#fff", 1);
				// //pointLight.position.set(20, 48, 20);
				// pointLight.position.set(20, 48, 20);
				// scene.add(pointLight);

				this.scene = scene;

				this.controls = new OrbitControls(this.camera, renderer.domElement)
				this.controls.enableDamping = true
				//this.controls.enablePan = true
				this.controls.minPolarAngle = 0;
				this.controls.maxPolarAngle = 0.49 * Math.PI;

				this.controls2 = new OrbitControls(this.camera, labelRenderer.domElement)
				this.controls2.enableDamping = true
				//this.controls2.enablePan = true
				this.controls2.minPolarAngle = 0;
				this.controls2.maxPolarAngle = 0.49 * Math.PI;


				composer = new EffectComposer(renderer);

				const renderPass = new RenderPass(scene, camera);
				composer.addPass(renderPass);

				const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);

				outlinePass.visibleEdgeColor.set("green"); // 边缘可见部分发颜色 sColor[0].color
				outlinePass.hiddenEdgeColor.set("green"); // 边缘遮挡部分发光颜色 sColor[1].color
				outlinePass.edgeStrength = Number(10.0); //边框的亮度
				outlinePass.edgeGlow = Number(1); //光晕[0,1]
				outlinePass.edgeThickness = Number(1.0); //边缘浓度
				outlinePass.pulsePeriod = Number(1.8); //呼吸闪烁的速度 闪烁频率 ，默认0 ，值越大频率越低
				outlinePass.usePatternTexture = false; //是否使用父级的材质
				outlinePass.downSampleRatio = 2; // 边框弯曲度
				outlinePass.clear = true;

				this.outlinePass = outlinePass;

				composer.addPass(outlinePass);

				var that = this;
				function animate() {
					that.controls.target.set(that.x, 0, 0);
					that.controls2.target.set(that.x, 0, 0);
					that.controls.update()
					that.controls2.update();
					//that.camera.lookAt(0 + that.x, 0, 0);
					//console.log(that.camera.position.x)

					renderer.render(scene, that.camera)
					composer.render(scene, that.camera);
					labelRenderer.render(scene, that.camera);
					requestAnimationFrame(animate)
					TWEEN.update();
					if (resizeRendererToDisplaySize(renderer)) {
						const canvas = renderer.domElement
						that.camera.aspect = canvas.clientWidth / canvas.clientHeight
						that.camera.updateProjectionMatrix()
					}
				}
				animate()

				function resizeRendererToDisplaySize(renderer) {
					const canvas = renderer.domElement
					var height = window.innerHeight
					var width = window.innerWidth
					var canvasPixelWidth = canvas.width / window.devicePixelRatio
					var canvasPixelHeight = canvas.height / window.devicePixelRatio

					const needResize =
						canvasPixelWidth !== width || canvasPixelHeight !== height
					if (needResize) {
						renderer.setSize(width, height, false)
						composer.setSize(width, height, false)
						labelRenderer.setSize(width, height, false);
					}
					return needResize
				}

			},

			addSelectedObject(object) {
				this.selectedObjects = [];
				this.selectedObjects.push(object);
			},
			onMouseClick(event) {
				let intersects = this.getIntersects(event);
				// console.log(intersects);
				// console.log(intersects[0].object); 
				//获取选中最近的Mesh对象
				//instance坐标是对象，右边是类，判断对象是不是属于这个类的
				if (intersects.length !== 0 && intersects[0].object.type === 'Mesh') {
					const selectObject = intersects[0].object;
					//changeMaterial(selectObject)
					//	selectObject.material.color.set(new THREE.Color('rgba(125,125,250,0.5)'))

					this.addSelectedObject(selectObject);
					if (selectObject.name != '平面') {
						this.outlinePass.selectedObjects = this.selectedObjects;
					}
					var myAppendTo = Vue.extend({
						template: '<div>Hello World</div>'
					});

					switch (selectObject.name) {
						case "reflow":
						case "SMTIO1":
							this.showDrawer(selectObject.name);
							break;
						case "SPI":
							this.test = true;
							//new myAppendTo().$mount().$appendTo('#SPI');//appendTo
							break;
						default:
							console.log(selectObject.position.x)
							this.moveCamera(this.camera.position,
								({ x: this.x, y: 0, z: 0 }),
								({ x: 0 + selectObject.position.x, y: 1, z: 5 }),
								({ x: selectObject.position.x, y: selectObject.position.x, z: 0 }),
							);
							this.x = selectObject.position.x;
							//this.camera.position.set(0 + selectObject.position.x, 1, 5);
							//this.camera.lookAt(0 + selectObject.position.x, 1, 4);

							break;
					}
				} else {
					console.log('未选中 Mesh!');
				}

			},

			getIntersects(event) {
				event.preventDefault();// 阻止默认的点击事件执行, https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault

				//声明 rayCaster 和 mouse 变量
				let rayCaster = new THREE.Raycaster();
				let mouse = new THREE.Vector2();

				// that.img_width = document.querySelector("#myBiaoZhu").clientWidth
				// that.img_height = document.querySelector("#myBiaoZhu").clientHeight

				//通过鼠标点击位置，计算出raycaster所需点的位置，以屏幕为中心点，范围-1到1
				mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
				mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
				//通过鼠标点击的位置(二维坐标)和当前相机的矩阵计算出射线位置
				rayCaster.setFromCamera(mouse, this.camera);


				//获取与射线相交的对象数组， 其中的元素按照距离排序，越近的越靠前。
				//+true，是对其后代进行查找，这个在这里必须加，因为模型是由很多部分组成的，后代非常多。
				let intersects = rayCaster.intersectObjects(this.group.children, true);

				//返回选中的对象
				return intersects;
			}
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

<style>
	.test .ant-drawer-content {
		background-color: rgba(131, 187, 224, 0.6);
	}

	.test .ant-drawer-header {
		background: rgba(131, 187, 224, 0.6);
	}
</style>