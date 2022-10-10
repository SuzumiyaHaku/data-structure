import React, { useState, useEffect, useCallback } from 'react';
import { Spin, Alert } from 'antd';
const getListData = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(function (response) {
        return response.json()
      })
      .then(function (res) {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
  })
}

const BinaryTree = () => {
  const [list1, setList1] = useState<any[]>([]);
  const [list2, setList2] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<number>(1);
  useEffect(() => {
    let fn = async () => {
      setLoading(true)
      let res1 = await getListData()
      res1.length = 10
      setList1(res1)
      let res2 = await getListData()
      res2.length = 1
      setList2(res2)
      setLoading(false)
    }
    fn()
  }, [query])

  return loading ? <Spin tip="loading...">
    <div>
      <Alert message="BinaryTree" type="info"/>
      <button onClick={() => setQuery(query + 1)}>点我</button>
    </div>
  </Spin> : <div>
      <Alert message="BinaryTree" type="info"/>
      <button onClick={() => setQuery(query + 1)}>点我</button>
    </div>
}

export default BinaryTree;