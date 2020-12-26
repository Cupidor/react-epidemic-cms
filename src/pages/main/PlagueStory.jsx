import React, { Component } from 'react';
import styles from '@/pages/main/style.less';
import { Button, Card, List, message, Typography, Table, Tag, Space } from 'antd';
import Request from "@/utils/request";
import api from "@/utils/config";
import router from 'umi/router';
import { formatTimeSeconds } from "@/utils/utils";
const { Paragraph } = Typography;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    console.log(this.props)
  }

  // 修改
  edit = (id) => {
    console.log(id)
  }

  // 删除
  delete = (id) => {
    console.log(id)
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
            <Tag color={'green'} onClick={this.edit.bind(this, record.id)}>
              修改
            </Tag>
            <Tag color={'red'} onClick={this.delete.bind(this, record.id)}>
              删除
            </Tag>
          </div>
        ),
      },
    ];
    const data = [
      {
        key: 1,
        title: "绘·勇气│新冠疫苗试验志愿者：作为一个普通武汉人，贡献自己力量",
        content: [
          "由陈薇院士领衔的军事科学院军事医学研究院科研团队研制的重组新冠疫苗，正在湖北武汉进行Ⅰ期临床试验。前期招募的志愿者陆续入组，并在近日接种疫苗。渔具店店主陈凯是其中一员。3月19日中午11点54分，编号为“011”的志愿者陈凯注射了疫苗。经过体温升高、精神不振等轻微反应后，陈凯的身体状况已经恢复正常。接受采访时，爱好跑步的他正在隔离酒店房间里绕圈跑步。谈及报名参加试验的初衷，陈凯说，就是想作为一个普通的武汉人，贡献自己的一份力量",
        ],
      },
      {
        key: 2,
        title: "绘·团结│武汉同济医院里的“Tony理发屋”",
        content: [
          "同济医院中法新城院区是武汉市新冠肺炎重症和危重症病人的收治中心之一。收治患者的病区是医护人员与病毒战斗的“主战场”。在“战场”上，头发看似不起眼，却可能绊住“战士们”的脚步。在防护帽里闷久了的头发，被汗水浸湿，贴伏在头皮上，令人不适，长发掉落出来，还可能成为传播病毒的媒介。可由于武汉市内理发店悉数关门歇业，理发成了难题。为了解决数千名医护人员的理发问题，王璐和几位理发师志愿者在这里集结，“Tony理发屋”正在营业。",
        ],
      },
      {
        key: 3,
        title: "绘·爱心│无声的战“疫”：武汉城内的聋哑人",
        content: [
          "在武汉，登记在册的听障人士有1.3万人。对这个群体而言，听力的阻隔带来不少困难，他们资讯获取滞后，对疫情的反应比正常人慢，防护物资也告急，甚至求援都成难题。30岁的崔竟是一名听障人士，另一个身份是“守语者”公益小组的负责人。疫情期间，她带领卢小强在内的7名志愿者，为武汉受困的聋哑人群提供定向帮扶。",
        ],
      },
      {
        key: 4,
        title: "绘·希望│ 对话血浆捐献者：隔离到捐献的27天，希望比药物更可贵",
        content: [
          "新冠肺炎疫情暴发，朱红一家被病毒侵扰，最早发病的公公不幸离世，其余三人得到及时救治后均已康复。2月15日，朱红回到曾住院隔离的金银潭医院，以新冠肺炎康复者的身份捐献了400毫升带有抗体的血浆，这些血浆经过抽检、病毒灭活、分离、提取抗体后，将被用于临床，救治重症患者。她希望以这种方式给治疗中的患者带去希望，尽可能救助更多的人",
        ],
      },
      {
        key: 5,
        title: "绘·人性│一位自由摄影师眼中的武汉：疫情下，人性在",
        content: [
          "蜘蛛原本是个自由影视工作者，因为拍摄肺炎时期的武汉日记，短短十几天内，他的微博粉丝从1万多涨到了230多万。在蜘蛛的镜头里，有拿着行李箱无法回家的人迷茫在街头，有戴着口罩坚持工作的环卫工，有骑着摩托依旧在路上奔波的外卖员……这部片子，成为许多人了解疫情期间武汉境况的一个窗口。",
        ],
      },
      {
        key: 6,
        title: "绘·责任│“OK哥”治愈之后：想献血、健身 、重返一线",
        content: [
          "32岁的张昌盛是武汉协和医院神经外科重症监护室的一名男护士，也是钟南山院士1月20日在接受央视采访时披露的人传人事例中，“14名被感染医护人员”之一。2月23日，他治愈出院后的第17天，重返一线，完成了“最笨拙”的两例PICC置管操作。",
        ],
      },
      {
        key: 7,
        title: "绘·善良│武汉街头的义务送药人",
        content: [
          "疫情之下，对于有购药需求的居家隔离人员和隔离点患者来说，买药变得困难，在网上紧急求助的帖子数以万计。不少武汉市民自发加入到为患者免费送药的行动中。吴悠和他的朋友们就在其中。截至2月13日，他们已经为500多户求助者送去药品和防护物资。",
        ],
      },
      {
        key: 8,
        title: "绘·坚持│疫情下的武汉咖啡馆：就算店垮了，最后一杯咖啡也给医生",
        content: [
          "Wacanda咖啡，一个在武汉刚刚成立一年多的咖啡品牌。在肺炎疫情蔓延武汉期间，它成为这座城市里唯一还在运营的咖啡馆。从武汉关闭离汉通道后的第三天起，他们已经为一线的医护人员免费送去了7850杯“武汉拿铁”。咖啡店老板90后姑娘田亚珍说：“即使有一天店垮了，开不下去了，那最后一杯咖啡也一定是送到医护人员手里的。”",
        ],
      },
      {
        key: 9,
        title: "绘·力量│在医院“救急”的武汉环卫人：出份力，在前面顶着",
        content: [
          "疫情暴发后的武汉，不止一家医院出现保洁人员紧缺的情况。在人手告急的情况下，江汉、江岸、汉南等多个区的城管部门采取行动，号召员工支援保洁工作。一批又一批环卫工人告别街头，开始忙碌在武汉市的各家定点医院和方舱里",
        ],
      },
      {
        key: 10,
        title: "绘·温暖│“武汉好人”庞先生 每天12小时免费摆渡工人",
        content: [
          "1月31日清晨，武汉火神山医院工地外，武汉市民庞先生开着电动三轮车等候下夜班的工人，招呼他们乘坐免费摆渡车。29日早晨起，庞先生便开始免费用自己的三轮车摆渡上下班的工人，一天工作12个小时左右。“一直交通管制，看着工人们辛苦，非常需要摆渡车”，庞先生每天往返火神山医院工地百余趟，他的摆渡车上有自己亲手写的标语：“中国加油，武汉加油，火神山加油”。",
        ],
      },
      {
        key: 11,
        title: "绘·生活│专访“武汉宣传片”导演：灵感来源于吃不到的热干面",
        content: [
          "2月2日，一部武汉最新城市宣传片在网上走红，创作者们用镜头记录下了这个“像被按下了暂停键”的武汉，记录下了全国上下抗疫防疫的感人瞬间。视频一经发出，两天的时间内全网播放量超5000w。《紧急呼叫》连线该片导演乐乐，探访了这部视频背后的故事。导演称，自己在武汉生活了八九年，发现这时候连一碗以前吃腻了的热干面都突然吃不到了，因此她想记录下对生活变化的感受。团队共3人，用一周的时间完成了拍摄及制作。",
        ],
      },
      {
        key: 12,
        title: "绘·坚强│新冠痊愈女孩经历10次核酸检测 实时记录病情",
        content: [
          "新冠肺炎确诊女孩阿布，在病情期间自称“战地记者”，在社交媒体上持续更新病情，吸引了一大波网友的“追随”。4月3日，阿布告诉新京报记者，医护人员没有时间拍视频，他们其实很想记录这一切，“我就像一个战地记者，帮他们记录。”历经10次核酸检测，她如今身体已经恢复，并且完成了14天的居家隔离。她说，现在虽然不少湖北人复工了，但是还是有受到歧视的情况，“即便身体上的病情没有了，但心理上还需要逐步的去清零”。",
        ],
      },
    ];
    return (
      <div className={styles.cardList}>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default Index;