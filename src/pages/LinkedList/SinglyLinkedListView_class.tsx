import * as React from 'react';
// import { connect, useSelector } from 'react-redux';
import * as _ from 'lodash';

// @ts-ignore
import * as THREE from 'three/build/three.module.js';
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { Button, Space, Slider, InputNumber, Row, Col, Radio, RadioChangeEvent, Divider, message } from 'antd';

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
  console.log('cube', cube)
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
  font.position.y = 0.8;
  console.log('font', font);
  return font
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

  var controls = new OrbitControls(camera, renderer.domElement);

  controls.addEventListener('change', function render() {
    // 加载完控制器后，在进行场景渲染
    renderer.render(scene, camera);
  });


};



class SinglyLinkedListView extends React.Component<any, any>{
  constructor(prop: any) {
    super(prop)
    this.state = {
      nodeList: [],
      currentIndex: 0,
      animatioHasStarted: false,
      requestID: 0,
      ref: React.createRef()
    }
  }

  /**
   * @desc - 添加一个cube对象
   * @returns { THREE.Cube }
   */
  addCubeItem(v?: number | React.MouseEvent<HTMLElement>) {
    this.setState((state: any) => {
      if (state.nodeList.length > 10) {
        message.warning("The length of the NodeList is > 10.")
        return
      }
      let val: number = typeof v === 'number' ? v : ~~(Math.random() * 10);
      let color: string = `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0')}`;
      let cube: any = createCube(color);
      let font: any = createFont(val, color);
      let x = state.nodeList.length ? state.nodeList[state.nodeList.length - 1].node.position.x + 1 : -9;

      let node: any = new THREE.Group();
      node.add(cube, font);
      node.position.x = x;
      scene.add(node);
      renderer.render(scene, camera);
      return {
        nodeList: [...state.nodeList, {
          node,
          val
        }]
      }
    })
  };

  /**
   * @desc - 清空
   */
  clearAll() {
    this.state.nodeList.forEach((item: any) => {
      scene.remove(item.node)
    })
    this.setState({
      nodeList: []
    })
    renderer.render(scene, camera);
  }

  randomData() {
    this.clearAll()
    for (let i = 0; i <= _.random(5, 10); i++) {
      this.addCubeItem(_.random(0, 100));
    }
  }

  onChange(val: number, type: any) {
    if (this.state.nodeList.length) {
      this.state.nodeList[this.state.currentIndex].node.position[type] = val;
      this.setState({
        nodeList: [...this.state.nodeList]
      })
      renderer.render(scene, camera);
    }
  };

  handleSetCurrentIndex(e: RadioChangeEvent) {
    this.setState({
      currentIndex: e.target.value
    })
  };

  animate() {
    if (this.state.animatioHasStarted) {
      this.setState({
        requestID: requestAnimationFrame(this.animate.bind(this))
      })
      // cube.rotation.x += 0.01;
      this.state.nodeList.forEach((item: any) => {
        item.node.rotation.x += 0.01;
      })
      this.setState({
        nodeList: [...this.state.nodeList]
      })
      renderer.render(scene, camera);
    } else {
      cancelAnimationFrame(this.state.requestID)
    }
  };

  openAnimation() {
    this.setState({
      animatioHasStarted: !this.state.animatioHasStarted
    })
    setTimeout(() => {
      this.animate()
    }, 0)
  }

  componentDidUpdate() {
    console.log("The this.state.nodeList was updated!");
  }

  componentDidMount() {
    init(this.state.ref.current);

    this.setState({
      nodeList: [{
        node: firstNode,
        val: 0
      }]
    })
  }


  render() {
    return <>
      <Space>
        <Button onClick={this.addCubeItem.bind(this)}>addCubeItem</Button>
        <Button onClick={this.clearAll.bind(this)}>Create Empty</Button>
        <Button onClick={this.randomData.bind(this)}>Random</Button>
        <Button>Random Sorted</Button>
        <Button>Random Fixed Szie</Button>
        <Button onClick={this.openAnimation.bind(this)}>animate ({(!this.state.animatioHasStarted).toString()})</Button>
      </Space>
      <Divider orientation="left">Cube List</Divider>
      <Radio.Group value={this.state.currentIndex} onChange={this.handleSetCurrentIndex.bind(this)}>
        {this.state.nodeList.map((item: any, key: number) => <Radio.Button value={key} key={key}>{item.val}</Radio.Button>)}
      </Radio.Group>
      <fieldset>
        <legend></legend>
        {JSON.stringify(this.state.nodeList[this.state.currentIndex]?.node?.position)}
      </fieldset>
      <Divider orientation="left">Operations</Divider>
      {
        !!this.state.nodeList.length &&
        <><Row gutter={24}>
          <Col span={2}>x:</Col>
          <Col span={12}>
            <Slider
              min={-10}
              max={10}
              onChange={(val: number) => this.onChange(val, 'x')}
              value={typeof this.state.nodeList[this.state.currentIndex].node.position.x === 'number' ? this.state.nodeList[this.state.currentIndex].node.position.x : 0}
            />
          </Col>
          <Col span={10}>
            <InputNumber
              min={-10}
              max={10}
              style={{ margin: '0 16px' }}
              value={this.state.nodeList[this.state.currentIndex].node.position.x}
              onChange={(val: number) => this.onChange(val, 'x')}
            />
          </Col>
        </Row>
          <Row gutter={24}>
            <Col span={2}>y:</Col>
            <Col span={12}>
              <Slider
                min={-10}
                max={10}
                onChange={(val: number) => this.onChange(val, 'y')}
                value={typeof this.state.nodeList[this.state.currentIndex].node.position.y === 'number' ? this.state.nodeList[this.state.currentIndex].node.position.y : 0}
              />
            </Col>
            <Col span={10}>
              <InputNumber
                min={-10}
                max={10}
                style={{ margin: '0 16px' }}
                value={this.state.nodeList[this.state.currentIndex].node.position.y}
                onChange={(val: number) => this.onChange(val, 'y')}
              />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={2}>z:</Col>
            <Col span={12}>
              <Slider
                min={-10}
                max={10}
                onChange={(val: number) => this.onChange(val, 'z')}
                value={typeof this.state.nodeList[this.state.currentIndex].node.position.z === 'number' ? this.state.nodeList[this.state.currentIndex].node.position.z : 0}
              />
            </Col>
            <Col span={10}>
              <InputNumber
                min={-10}
                max={10}
                style={{ margin: '0 16px' }}
                value={this.state.nodeList[this.state.currentIndex].node.position.z}
                onChange={(val: number) => this.onChange(val, 'z')}
              />
            </Col>
          </Row>
        </>
      }
      <Divider />
      <div ref={this.state.ref}></div>
    </>
  }
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