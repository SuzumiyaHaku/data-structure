import * as React from 'react';
import { RouteComponentProps, withRouter, useHistory } from 'react-router-dom';
import { Menu } from 'antd';
const { SubMenu, Item }: any = Menu;
import { MailOutlined } from '@ant-design/icons'; 
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
const MainMenu = function (props: RouteComponentProps) {
  let history = useHistory();
  const [openKeys, setOpenKeys] = React.useState<any[]>(['sub1']);

  const onOpenChange = (keys: React.Key[]) => {
    const latestOpenKey: any = keys.find(key => openKeys.indexOf(key) === -1) || '';
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const navigateTo = (e: any) => {
    // props.history.push(e.key)
    history.push(e.key)
  }

  return <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} onClick={navigateTo}>
    <SubMenu key="sub1" icon={<MailOutlined />} title="数据结构">
      <Item key="/">链表</Item>
      <Item key="/binary-tree">二叉树</Item>
    </SubMenu>
  </Menu>
}
// export default withRouter(MainMenu);
export default MainMenu