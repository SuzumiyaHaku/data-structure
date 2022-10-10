import React, { useRef, useState, useEffect } from 'react';
import { Radio, Button, Space, Divider, Card, Typography } from 'antd';

import * as _ from 'lodash';
import BinaryTreeNode from './module/BinaryTreeNode'

const { Title } = Typography

type TreeNode = {
  value: any,
  left: TreeNode | null,
  right: TreeNode | null,
}

const BinaryTree1 = () => {
  const [list, setList] = useState<any[]>([]);
  const [vlrList, setVLRList] = useState<any[]>([]);
  const [ldrList, setLDRList] = useState<any[]>([]);
  const [lrdList, setLRDList] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [treeObj, setTreeObj] = useState<TreeNode>();
  const [count, setCount] = useState<number>(65); // A~Z  ASCII: 65-90

  const currentObj = React.useMemo(() => {
    let v = list[currentIndex]
    return {
      vlrIndex: vlrList.indexOf(v),
      ldrIndex: ldrList.indexOf(v),
      lrdIndex: lrdList.indexOf(v)
    }
  }, [list, currentIndex, vlrList, ldrList, lrdList])


  const rendomList = () => {
    setList((arr: any[]) => {
      let newArr = [...arr]
      for (let i = 0; i < 7; i++) {
        // newArr.push(_.random(0, 100))
        setCount((val: number) => {
          newArr.push(String.fromCharCode(val))
          return val + 1;
        })
        
      }
      return newArr;
    })
  }

  const addNode = () => {
    setList([...list, String.fromCharCode(count)])
    setCount(count + 1)
  }

  const clearAll = () => {
    setCount(65)
    setList([])
  }


  useEffect(() => {
    arrToTree(list)
  }, [list])

  useEffect(() => {
    if (treeObj) {
      vlr(treeObj);
      ldr(treeObj);
      lrd(treeObj);
    }
    
  }, [treeObj])

  const arrToTree = (list: any[]) => {
    let arr = list
    let tree: TreeNode = {
      value: null,
      left: null,
      right: null,
    }

    const fn = (i: number, childTree: TreeNode) => {
      if (list.length === 0) {
        tree = {
          value: null,
          left: null,
          right: null,
        }
        return
      }
      childTree.value = arr[i];
      childTree.left = {
        value: null,
        left: null,
        right: null,
      }
      childTree.right = {
        value: null,
        left: null,
        right: null,
      }
      if (arr[2 * i + 1]) {// 如果有左节点 (从0开始编号左孩子为2i + 1)
        fn(2 * i + 1, childTree.left)
      } else {
        childTree.left = null
      }
      if (arr[2 * i + 2]) { // 如果有右节点 (从0开始编号右孩子为2i + 2)
        fn(2 * i + 2, childTree.right)
      } else {
        childTree.right = null
      }
    }
    fn(0, tree)
    setTreeObj(tree);
  }

  const changeCurrentIndex = (value: number) => {
    setCurrentIndex(list.indexOf(value))
  }

  /**
   * @desc - 前序
   */
  const vlr = (treeObj: TreeNode) => {
    let arr: string[] = []
    const fn = (node: TreeNode | undefined | null) => {
      if (!node) return;
      if (node.value) {
        arr.push(node.value)
      }
      fn(node.left)
      fn(node.right)
    }
    fn(treeObj);
    setVLRList(arr)
  }

  /**
   * @desc - 中序
   */
  const ldr = (treeObj: TreeNode) => {
    let arr: string[] = [];
    const fn = (node: TreeNode | undefined | null) => {
      if (!node) return;
      fn(node.left)
      if (node.value) {
        arr.push(node.value)
      }
      fn(node.right)
    }
    fn(treeObj);
    setLDRList(arr);
  }


  /**
   * @desc - 后序
   */
  const lrd = (treeObj: TreeNode) => {
    let arr: string[] = [];
    const fn = (node: TreeNode | undefined | null) => {
      if (!node) return;
      fn(node.left)
      fn(node.right)
      if (node.value) {
        arr.push(node.value)
      }
    }
    fn(treeObj);
    setLRDList(arr);
  }

  
  /**
   * @desc - 层序
   * @param arr 
   */
  const levelTraversal = () => {
    let arr: any = [];
    if (!treeObj) {
      return arr;
    }

    // dfs depth first searches
    /*let fn = (node: TreeNode | undefined | null, level: number) => {
      if (!node) return;
      if (node.value) {
        if (!arr[level]) {
          arr[level] = [node.value]
        } else {
          arr[level].push(node.value)
        }
      }
      fn(node.left, level + 1);
      fn(node.right, level + 1);
    }
    fn(treeObj, 0)
    */

    // bfs breadth first search
    let queue = [];
    queue.push(treeObj);
    while (queue.length > 0) {
      let size = queue.length;
      let temp = [];
      for (let i = 0; i < size; i++) {
        let current: any = queue.shift();
        temp.push(current.value);
        if (current.left) {
          queue.push(current.left);
        }
        if (current.right) {
          queue.push(current.right);
        }
      }
      arr.push(temp);
    }

    console.log('arr', treeObj, arr)
    return arr;
  }


  const animation = (arr: any[]) => {
    arr.forEach((item, index) => {
      let i = list.indexOf(item)
      setTimeout(() => {
        setCurrentIndex(i);
      }, 1000 * index)
    })
  }

  return <div>
    <Title>满二叉树Full Binary Tree</Title>
    <Card>
      <Space>
        <Button onClick={addNode}>添加节点</Button>
        <Button onClick={rendomList}>随机</Button>
        <Button onClick={clearAll}>清除</Button>
      </Space>
      <Divider orientation="left">长度：{list.length}</Divider>
      <Radio.Group value={currentIndex}>
        {list.map((item, key) => <Radio.Button onClick={() => setCurrentIndex(key)} value={key} key={key}>{item}</Radio.Button>)}
      </Radio.Group>
      <br/>
      <br/>
      <Card bodyStyle={{ paddingTop: 0 }}>
        <Divider orientation="left">前序遍历Preorder Traversal (VLR)(DLR) <Button size="small" onClick={() => animation(vlrList)}>动画</Button></Divider>
        <Radio.Group value={currentObj.vlrIndex}>
          {vlrList.map((item, key) => <Radio.Button value={key} key={key}>{item}</Radio.Button>)}
        </Radio.Group>
        <Divider orientation="left">中序遍历Inorder Traversal(LDR) <Button size="small" onClick={() => animation(ldrList)}>动画</Button></Divider>
        <Radio.Group value={currentObj.ldrIndex}>
          {ldrList.map((item, key) => <Radio.Button value={key} key={key}>{item}</Radio.Button>)}
        </Radio.Group>
        <Divider orientation="left">后续遍历Postorder Traversal(LRD) <Button size="small" onClick={() => animation(lrdList)}>动画</Button></Divider>
        <Radio.Group value={currentObj.lrdIndex}>
          {lrdList.map((item, key) => <Radio.Button value={key} key={key}>{item}</Radio.Button>)}
        </Radio.Group>
      </Card>
      <br/>
      
      <Button onClick={levelTraversal}>在控制台打印层级</Button>
      
    </Card>
    <BinaryTreeNode node={treeObj} currentIndex={list[currentIndex]} emit={changeCurrentIndex}/>
  </div>
}

export default BinaryTree1;