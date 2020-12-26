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
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.props.isOpen) {
      if (this.props.isOpen) {
        this.setState(
          {
            id: null,
            title: '',
            content: '',
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
    const { entryType, sectionId } = this.state;
    e.preventDefault();
    this.setState({
      confirmLoading: true,
    });
  };

  // 录入新数据
  submitAddRequest = async formdata => {
    const res = await Request(api.tunnelDataUrl + 'manual_add_total_station_data', {
      method: 'post',
      data: formdata,
    });
    if (!res.op) {
      res.message && message.error(res.message);
    } else {
      message.success('录入新数据成功');
      this.handleCancel();
      this.props.refresh();
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
