import React, { Component } from 'react';
import styles from '@/components/SecondMenu/style.less';
import { Layout, Menu } from 'antd';
import config from '../../../config/config';
import Link from 'umi/link';
const { Sider } = Layout;

class Index extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  menuDataRender = (menuList, currentRoute, result) => {
    for (let row of menuList) {
      if (row.path === currentRoute.path) {
        result.push(...row.routes);
        break;
      } else if (row.routes != null && row.routes.length !== 0) {
        this.menuDataRender(row.routes, currentRoute, result);
      }
    }
  };

  render() {
    const { currentRoute,location } = this.props;
    let currentRouteArr=currentRoute.routes.filter(item=>{
      return item.name!=null
    })
    return (
      <Sider width={250} className={styles.slider}>
        <div className={styles.menu_title}>
          <h1>{currentRoute.name}</h1>
        </div>
        <Menu mode="inline" defaultSelectedKeys={[location.pathname]}>
          {currentRouteArr.map(item => {
            return (
              <Menu.Item key={item.path}>
                <Link to={item.path}>{item.name}</Link>
                {/*<span>{}</span>*/}
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
    );
  }
}

export default Index;
