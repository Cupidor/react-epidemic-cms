import React from 'react';
import { connect } from 'dva';
import Avatar from './AvatarDropdown';
import styles from './index.less';
import ProjectDropdown from '@/components/GlobalHeader/ProjectDropdown';

const GlobalHeaderRight = props => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }
  if (theme === 'green' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.green}`;
  }

  return (
    <div className={className}>
      <ProjectDropdown />
      <Avatar />
    </div>
  );
};

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
