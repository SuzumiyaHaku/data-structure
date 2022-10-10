import * as React from 'react';
let { useEffect, useRef, useState, useCallback, useReducer } = React;
// import { connect, useSelector } from 'react-redux';
import * as _ from 'lodash';

// @ts-ignore
import * as THREE from 'three/build/three.module.js';
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { Button, Space, Slider, InputNumber, Row, Col, Radio, RadioChangeEvent, Divider, message } from 'antd';
import { withTranslation } from 'react-i18next';
import threeFrontJSON from 'three/examples/fonts/helvetiker_bold.typeface.json';
let camera: any;
let scene: any;
let renderer: any;

let firstNode: any;

/**
 * @desc - 创建方块
 * @param color - 方块的颜色
 * @returns { THREE.Cube } - 一个Cube 对象
 */
const createCube = (color: string) => {
	let geometry = new THREE.BoxGeometry(1, 1, 1);
	let material = new THREE.MeshBasicMaterial({ color });
	let cube = new THREE.Mesh(geometry, material)
	return cube
};

/**
 * @desc - 创建文字
 * @param val - 文字内容
 * @param color - 文字颜色
 * @returns { THREE.Font } - 一个文字对象
 */
const createFont = (val: any, color: string) => {
	let geometryText = new THREE.TextGeometry(val + '', {
		font: new THREE.Font(threeFrontJSON), // 字体obj对象
		size: .4, // 字体大小默认100
		height: .1, // 字体厚度默认50
		curveSegments: 1, // 表示文本的）曲线上点的数量。默认值为12
		bevelEnabled: false, // 是否开启斜角，默认为false
		bevelThickness: 20, // 文本上斜角的深度，默认值为20
		// bevelSize: 8, // 斜角与原始文本轮廓之间的延伸距离。默认值为8
		// bevelSegments: 3 // 斜角的分段数。默认值为3
	});
	let meshMaterial: any = new THREE.MeshBasicMaterial({
		color: new THREE.Color(color),
	});
	
	let font: any = new THREE.Mesh(geometryText, meshMaterial);
	if (val > 9){
		font.position.x = -0.3;
	} else if (val >= 100){
		font.position.x = -0.5;
	} else {
		font.position.x = -0.1;
	}
	
	font.position.y = 0.8;
	return font
}


const createLine = (value1: THREE.Vector2, value2: THREE.Vector2, color: string) => {
	let geometry = new THREE.BufferGeometry(); //声明一个几何体对象Geometry
	// 绘制一个U型轮廓
	let R = 5;//圆弧半径
	// let arc = new THREE.ArcCurve(0, 0, R, 0, Math.PI, true);
	// 半圆弧的一个端点作为直线的一个端点
	let line1 = new THREE.LineCurve(value1, value2);
	// let line2 = new THREE.LineCurve(new THREE.Vector2(-R, 0, 0), new THREE.Vector2(-R, 5, 0));
	// 创建组合曲线对象CurvePath
	let CurvePath = new THREE.CurvePath();
	// 把多个线条插入到CurvePath中
	CurvePath.curves.push(line1);
	//分段数200
	let points = CurvePath.getPoints(2);
	// setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
	geometry.setFromPoints(points);
	//材质对象
	let material = new THREE.LineBasicMaterial({
		color
	});
	//线条模型对象
	let line = new THREE.Line(geometry, material);
	
	line.position.x = 0;
	line.position.y = 0;
	return line
}

function init(dom: HTMLDivElement | null) {

	const width: number = window.innerWidth - 370;
	const height: number = 500;

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, width / height, .1, 1000);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);
	dom && dom.appendChild(renderer.domElement);

	let cube: any = createCube('#ff0000');

	let font: any = createFont('0', '#ff0000');

	font.position.y = .8;
	// scene.add(font);
	// cube.add(font)
	firstNode = new THREE.Group();
	firstNode.add(cube, font);
	firstNode.position.x = -9
	scene.add(firstNode);

	camera.position.z = 10;
	renderer.render(scene, camera);

	let controls = new OrbitControls(camera, renderer.domElement);
	
	controls.addEventListener('change', function render() {
		// 加载完控制器后，在进行场景渲染
    renderer.render( scene, camera );
	});

	renderer.render( scene, camera );
};




const SinglyLinkedListView = () => {
	const ref: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
	const [nodeList, setNodeList] = useState<any[]>([]);

	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [animatioHasStarted, setAnimationHasStarted] = useState<boolean>(true);
	const [requestID, setRequestID] = useState<number>(0);

	/**
	 * @desc - 添加一个cube对象
	 * @returns { THREE.Cube }
	 */
	const addCubeItem = (v?: number | React.MouseEvent<HTMLElement>) => {
		setNodeList((list: any[]) => {
			let val: number = typeof v === 'number' ? v : ~~(Math.random() * 10 + 1);
			let color: string = `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0')}`;
			let cube: any = createCube(color);
			let font: any = createFont(val, color);

			let lastCube = list.length ? list[list.length - 1] : null

			
			let line: any = createLine(
				new THREE.Vector2(-1, 0, 0),
				new THREE.Vector2(0, 0, 0),
				color
			);

			let node: any = new THREE.Group();
			
			let x = lastCube ? lastCube.node.position.x + 1 + .5 : -9;
			
			node.add(cube, font, line);
			node.position.x = x;	
			scene.add(node);
			renderer.render(scene, camera);	
			return [...list, { node, val }]
		})
	};

	/**
	 * @desc - 清空
	 */
	const clearAll = useCallback(() => {
		nodeList.forEach((item) => {
			scene.remove(item.node)
		})
		setNodeList(() => {
			renderer.render(scene, camera);
			return []
		})
		setAnimationHasStarted(true)
	}, [nodeList])

	const randomData = useCallback(() => {
		clearAll()
		for(let i = 0; i <= _.random(5, 10); i++) {
			addCubeItem(_.random(0, 100));
		}
		setAnimationHasStarted(true)
	}, [clearAll])

	const onChange = (val: number, type: any) => {
		if (nodeList.length) {
			nodeList[currentIndex].node.position[type] = val;
			setNodeList([...nodeList])
			renderer.render(scene, camera);
		}
	};

	const handleSetCurrentIndex = (e: RadioChangeEvent) => {
		setCurrentIndex(e.target.value)
	};

	const animate = function () {
		if (animatioHasStarted) {
			setRequestID(requestAnimationFrame(animate))
			// cube.rotation.x += 0.01;
			nodeList.forEach((item: any) => {
				item.node.rotation.x += 0.01;
			})
			renderer.render(scene, camera);
		} else {
			cancelAnimationFrame(requestID)
		}
	};

	const openAnimation = function () {
		setAnimationHasStarted(!animatioHasStarted)
		animate()
	}

	useEffect(() => {
		init(ref.current);
		setNodeList([{
			node: firstNode,
			val: 0
		}])
		return () => {
			
		}
	}, [])

	const addCubeItemHander = () => {
		if (nodeList.length > 10) {
			message.warning("The length of the NodeList is > 10.")
			return
		} else {
			addCubeItem()
		}
	}

	return <>
		<Space>
			<Button onClick={addCubeItemHander}>addCubeItem</Button>
			<Button onClick={clearAll}>Create Empty</Button>
			<Button onClick={randomData}>Random</Button>
			<Button onClick={openAnimation}>animate ({(!animatioHasStarted).toString()})</Button>
		</Space>
		<Divider orientation="left">Cube List</Divider>
		<Radio.Group value={currentIndex} onChange={handleSetCurrentIndex}>
			{nodeList.map((item, key) => <Radio.Button value={key} key={key}>{item.val}</Radio.Button>)}
		</Radio.Group>
		<fieldset>
			<legend></legend>
			{JSON.stringify(nodeList[currentIndex]?.node?.position)}
		</fieldset>
		<Divider orientation="left">Operations</Divider>
		{
			!!nodeList.length &&
			<><Row gutter={24}>
				<Col span={2}>x:</Col>
				<Col span={12}>
					<Slider
							min={-10}
							max={10}
							onChange={(val: number) => onChange(val, 'x')}
							value={typeof nodeList[currentIndex].node.position.x === 'number' ? nodeList[currentIndex].node.position.x : 0}
						/> 
				</Col>
				<Col span={10}>
					<InputNumber
						min={-10}
						max={10}
						style={{ margin: '0 16px' }}
						value={nodeList[currentIndex].node.position.x}
						onChange={(val: number) => onChange(val, 'x')}
					/>
				</Col>
			</Row>
				<Row gutter={24}>
					<Col span={2}>y:</Col>
					<Col span={12}>
						<Slider
							min={-10}
							max={10}
							onChange={(val: number) => onChange(val, 'y')}
							value={typeof nodeList[currentIndex].node.position.y === 'number' ? nodeList[currentIndex].node.position.y : 0}
						/>
					</Col>
					<Col span={10}>
						<InputNumber
							min={-10}
							max={10}
							style={{ margin: '0 16px' }}
							value={nodeList[currentIndex].node.position.y}
							onChange={(val: number) => onChange(val, 'y')}
						/>
					</Col>
				</Row>
				<Row gutter={24}>
					<Col span={2}>z:</Col>
					<Col span={12}>
						<Slider
							min={-10}
							max={10}
							onChange={(val: number) => onChange(val, 'z')}
							value={typeof nodeList[currentIndex].node.position.z === 'number' ? nodeList[currentIndex].node.position.z : 0}
						/>
					</Col>
					<Col span={10}>
						<InputNumber
							min={-10}
							max={10}
							style={{ margin: '0 16px' }}
							value={nodeList[currentIndex].node.position.z}
							onChange={(val: number) => onChange(val, 'z')}
						/>
					</Col>
				</Row>
			</>
		}
		<Divider />
		<div ref={ref}></div>
	</>
}

export default SinglyLinkedListView;

// const mapStateToProps = (store) => {
//   return store.postReducer;
// };
// const mapDispatchToProps = dispatch => ({ dispatch });
// export default connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(SinglyLinkedListView)