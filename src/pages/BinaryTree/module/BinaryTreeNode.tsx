import React, { EventHandler } from 'react';
import "./style/binaryTreeNode.less";
import svg from '../../../../static/bg/binary-bg.svg'

const BinaryTreeNode = (props: any) => {

  let barnchClass = 'top';
  if (props.node && props.node.left) {
    barnchClass += ` left-branch`
  }
  if (props.node && props.node.right) {
    barnchClass += ` right-branch`
  }
  if (props.node && props.node.value === props.currentIndex) {
    barnchClass += ` on`
  }

  const change = (e: MouseEvent | any ,val: number) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    props.emit(val);
  }

  return props.node ? <div className="binary-tree-node">
    <div className={barnchClass}><div className="value" onClick={(e) => change(e, props.node.value)}>{props.node.value}</div></div>
    <div className="child">
      <div className={props.node.left ? 'child-left' : ''}>{props.node.left && BinaryTreeNode({ ...props, node: props.node.left })}</div>
      <div className={props.node.right ? 'child-right' : ''}>{props.node.right && BinaryTreeNode({ ...props, node: props.node.right })}</div>
    </div>
  </div> : <></>;
}

export default React.memo(BinaryTreeNode);