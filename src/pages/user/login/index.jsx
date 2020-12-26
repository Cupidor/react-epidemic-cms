import { Alert, Checkbox, message, Input, Typography, Button } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { connect } from 'dva';
import LoginComponents from './components/Login';
import styles from './style.less';
import Request from '@/utils/request';
import api from '@/utils/config';
import { InfoCircleOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const { Paragraph } = Typography;

const { Tab, UserName, Password, Submit } = LoginComponents;

@connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))
class Login extends Component {
  loginForm = undefined;

  state = {
    type: 'account',
    submitting: false,
  };

  handleSubmit = async (err, values) => {
    let username = values.userName;
    let password = values.password;
    if (username === undefined || username === '' || password === undefined || password === '') {
      return;
    }
    this.setState({
      submitting: true,
    });
    setTimeout(() => {
      this.login(username, password);
    }, 1000);
  };

  // 登录
  login = (userName, passWord) => {
    this.setState({
      submitting: false,
    });
    message.success('登录成功!');
    this.props.history.push({ pathname: '/main' });
    /*const res = await Request(api.userUrl + 'user_login', {
      method: 'post',
      requestType: 'form',
      data: {
        username: userName.trim(),
        password: passWord.trim(),
      },
    });
    if (!res.op) {
      res.message && message.error(res.message);
    } else {
    }*/
  };

  onTabChange = type => {
    this.setState({
      type,
    });
  };

  render() {
    const {
      type,
      rememberPass,
      submitting,
    } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          onCreate={form => {
            this.loginForm = form;
          }}
        >
          <Tab
            key="account"
            tab={formatMessage({
              id: 'user-login.login.tab-login-credentials',
            })}
          >
            <UserName
              name="userName"
              placeholder={`${formatMessage({
                id: 'user-login.login.userName',
              })}: 请输入`}
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: 'user-login.userName.required',
                  }),
                },
              ]}
            />
            <Password
              name="password"
              placeholder={`${formatMessage({
                id: 'user-login.login.password',
              })}: 请输入`}
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: 'user-login.password.required',
                  }),
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();
                if (this.loginForm) {
                  this.loginForm.validateFields(this.handleSubmit);
                }
              }}
            />
          </Tab>
          <Submit loading={submitting}>
            <FormattedMessage id="user-login.login.login" />
          </Submit>
        </LoginComponents>
      </div>
    );
  }
}

export default Login;
