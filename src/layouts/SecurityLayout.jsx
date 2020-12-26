import React from 'react';
import { notification } from 'antd';
import { connect } from 'dva';
import { Redirect } from 'umi';
import PageLoading from '@/components/PageLoading';
import Request from "@/utils/request";
import api from "@/utils/config";

class SecurityLayout extends React.Component {
  state = {
    isReady: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, currentUser } = this.props;

    if ((!currentUser.userid && loading) || !isReady) {
      return <PageLoading />;
    }

    if (!currentUser.userid) {
      //return <Redirect to="/user/login"></Redirect>;
    }

    return children;
  }
}

export default connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);
