/// <refrence path="./test/test.d.ts" />;
import LinkedList from '../pages/LinkedList';
import BinaryTree from '../pages/BinaryTree';
export default [
  {
    path: '/',
    exact: true,
    component: LinkedList
  },
  {
    path: '/binary-tree',
    exact: true,
    component: BinaryTree
  }
]