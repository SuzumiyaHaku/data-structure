import React, { useState, useEffect, useCallback } from 'react';
import BinaryTree1 from './BinaryTree1';
import { Typography } from 'antd';

const { Title } = Typography;

const BinaryTree = () => {
  const [binaryTree, setBinaryTree] = useState({})

  return <div style={{ padding: '20px' }}>BinaryTree
    
    <BinaryTree1/>
  </div>
}

export default BinaryTree;