import React, { Component } from 'react';
import styles from '@/pages/main/style.less';
import { Button, message, Table, Tag, Breadcrumb, Modal } from 'antd';
import Request from "@/utils/request";
import api from "@/utils/config";
import router from 'umi/router';
import { formatTimeSeconds } from "@/utils/utils";
import NewEntry from './components/NewEntry'
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      record: null,
      type: '病毒知识',
      list: []
    };
  }

  componentDidMount() {
    this.getAllNews()
  }

  // 获取所有数据
  getAllNews = async () => {
    const { type } = this.state
    const res = await Request(api.host + '/getNews', {
      method: 'post',
      requestType: 'form',
      data: {
        type
      },
    });
    if (res.op === "success") {
      let n = 1,
        list = []
      for (let item of res.data) {
        let obj = Object.create(null)
        obj.key = n
        obj.id = item.id
        obj.title = item.title
        obj.content = item.content
        list.push(obj)
        n++
      }
      this.setState({
        list
      })
    } else {
      res.message && message.error(res.message);
    }
  }

  // 添加
  add = () => {
    this.setState({
      isShow: true,
      record: null
    })
  }

  // 修改
  edit = (item) => {
    this.setState({
      isShow: true,
      record: item
    })
  }

  // 删除确认
  showDeleteConfirm(id) {
    confirm({
      title: '确认删除此数据?',
      icon: <ExclamationCircleOutlined />,
      content: '删除后将不可恢复，请谨慎选择',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk:()=> {
        this.delete(id)
      },
      onCancel:()=> {
        console.log('Cancel');
      },
    });
  }

  // 删除
  delete = async (id) => {
    const { type } = this.state
    const res = await Request(api.host + '/deleteNews', {
      method: 'post',
      requestType: 'form',
      data: {
        id,
        type
      },
    });
    if (res.op === 'success') {
      message.success('删除数据成功');
      this.getAllNews()
    } else {
      res.message && message.error(res.message);
    }
  }

  // 关闭弹窗
  close = () => {
    this.setState({
      isShow: false,
    })
  }

  render() {
    const columns = [
      {
        title: '序号',
        dataIndex: 'key',
        key: 'key',
        width: 80,
        //render: text => <a>{text}</a>,
      },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width: 300,
      },
      {
        title: '内容',
        dataIndex: 'content',
        key: 'content',
        ellipsis: true,
      },
      {
        title: '操作',
        key: 'action',
        width: 200,
        render: (text, record) => (
          <div>
            <Tag color={'green'} onClick={this.edit.bind(this, record)}>
              修改
            </Tag>
            <Tag color={'red'} onClick={this.showDeleteConfirm.bind(this, record.id)}>
              删除
            </Tag>
          </div>
        ),
      },
    ];
    return (
      <div className={styles.cardList}>
        <div className={styles.line}>
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>病毒知识
            </Breadcrumb.Item>
          </Breadcrumb>
          <Button type="primary" className="add_button" onClick={this.add.bind(this)}>添加病毒知识</Button></div>
        <Table columns={columns} dataSource={this.state.list} />
        <NewEntry Newstype={this.state.type} isOpen={this.state.isShow} record={this.state.record} callback={this.close} refresh={this.getAllNews}></NewEntry>
      </div>
    );
  }
}

export default Index;
