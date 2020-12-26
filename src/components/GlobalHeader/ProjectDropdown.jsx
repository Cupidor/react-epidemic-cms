import { Menu } from 'antd';
import React from 'react';
import router from 'umi/router';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
class ProjectDropdown extends React.Component {
  onMenuClick = event => {
    const { key } = event;
    if (key === 'choose') {
      router.push({ pathname: '/main' });
    }
  };

  render() {
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="choose">切换工程</Menu.Item>
      </Menu>
    );
    return (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action}`}>
          <span>当前工程：{localStorage.getItem('projectName')}</span>
        </span>
      </HeaderDropdown>
    );
  }
}

export default ProjectDropdown;
