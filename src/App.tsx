import * as React from 'react';
import { Layout, Button, Divider } from 'antd';
import { useTranslation } from 'react-i18next'
const { Header, Footer, Sider, Content } = Layout;
// import "./App.less";
import MainMenu from './components/MainMenu';
import routes from './config/routes';
import { Switch, Route } from 'react-router-dom';
// const App: any = () => {
//   return <div className="wrapper">
//     <div className="nav">
//       <MainMenu/>
//     </div>
//     <div className="main">
//       <Switch>
//         { routes.map((item, index) => <Route exact={item.exact} path={item.path} key={index} component={item.component} />) }
//       </Switch>
//     </div>
//   </div>
// }

const App: React.ReactNode = () => {

  const { t, i18n } = useTranslation();

  return <div>
    <Header style={{
      display: "flex", alignItems: "center", background: "#fff",
      boxShadow: "0 2px 8px #f0f1f2",
      maxWidth: "100%",
      position: "relative",
      zIndex: 10
    }}>
      <h1>Data-Structure<Divider type="vertical" /></h1>
      <Button
        style={{ marginLeft: "auto" }}
        onClick={() => i18n.changeLanguage(i18n.language == 'en' ? 'zh' : 'en')}>{i18n.language == 'en' ? 'en' : '中文'}</Button>
    </Header>

    <Layout style={{ paddingTop: "40px", background: "#fff" }}>
      <Sider
        theme="light" style={{ height: "calc(100vh - 64px)", overflowY: "auto" }} width="260">
        <MainMenu />
      </Sider>
      <Content>
        <Switch>
          {routes.map((item, index) => <Route exact={item.exact} path={item.path} key={index} component={item.component} />)}
        </Switch>
      </Content>
    </Layout>
    <Footer></Footer>
  </div >
}
export default App;