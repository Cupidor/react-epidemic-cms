import { Modal, message, Form, DatePicker, Input } from 'antd';
import React, { Component } from 'react';
import moment from 'moment';
import styles from '../style.less';
import Request from '../../../utils/request';
import api from '../../../utils/config';

const { TextArea } = Input;

class NewEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmLoading: false,
      entryType: '添加',
      id: null,
      title: '',
      content: '',
      Newstype: '',
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.props.isOpen || prevProps.Newstype !== this.props.Newstype) {
      if (this.props.isOpen) {
        this.setState(
          {
            id: null,
            title: '',
            content: '',
            Newstype: this.props.Newstype,
          },
          () => {
            if (this.props.record === null) {
              this.setState({
                entryType: '添加',
              });
            } else {
              this.setState({
                entryType: '修改',
                id: this.props.record.id,
                title: this.props.record.title,
                content: this.props.record.content,
              });
            }
          },
        );
      }
    }
  }

  // 关闭弹窗
  handleCancel = () => {
    this.props.callback();
  };

  // 确定
  handleOk = e => {
    const { entryType, title, content } = this.state;
    e.preventDefault();
    if (title.trim() === '') {
      message.warning('标题不能为空');
      return;
    }
    if (content.trim() === '') {
      message.warning('内容不能为空');
      return;
    }
    if (entryType === '添加') {
      this.submitAddRequest();
    } else {
      this.submitEditRequest();
    }
  };

  // 录入新数据
  submitAddRequest = async () => {
    const { title, content, Newstype } = this.state;
    this.setState({
      confirmLoading: true,
    });
    const res = await Request(api.host + '/addNews', {
      method: 'post',
      requestType: 'form',
      data: {
        title,
        content,
        type: Newstype,
      },
    });
    if (res.op === 'success') {
      message.success('录入新数据成功');
      this.setState(
        {
          confirmLoading: false,
        },
        () => {
          this.handleCancel();
          this.props.refresh();
        },
      );
    } else {
      res.message && message.error(res.message);
    }
  };

  // 修改
  submitEditRequest = async () => {
    const { id, title, content, Newstype } = this.state;
    this.setState({
      confirmLoading: true,
    });
    const res = await Request(api.host + '/editNews', {
      method: 'post',
      requestType: 'form',
      data: {
        id,
        title,
        content,
        type: Newstype,
      },
    });
    if (res.op === 'success') {
      message.success('修改数据成功');
      this.setState(
        {
          confirmLoading: false,
        },
        () => {
          this.handleCancel();
          this.props.refresh();
        },
      );
    } else {
      res.message && message.error(res.message);
    }
  };

  // 监听标题修改
  onTitleChange = e => {
    e.persist();
    this.setState({
      title: e.target.value,
    });
  };

  // 监听内容修改
  onContentChange = e => {
    e.persist();
    this.setState({
      content: e.target.value,
    });
  };

  render() {
    const { entryType, confirmLoading } = this.state;
    const { isOpen } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 14 },
      },
    };
    return (
      <Modal
        centered={true}
        width={'60%'}
        destroyOnClose={true}
        className={styles.modal_setting}
        title={entryType}
        visible={isOpen}
        onOk={this.handleOk}
        confirmLoading={confirmLoading}
        onCancel={this.handleCancel}
      >
        <Form {...formItemLayout} name="basic">
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input value={this.state.title} onChange={this.onTitleChange.bind(this)} />
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <TextArea
              rows={8}
              value={this.state.content}
              onChange={this.onContentChange.bind(this)}
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(NewEntry);
