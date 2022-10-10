import * as React from 'react';
import { Typography, Card, Button } from 'antd';
import { useTranslation } from 'react-i18next'
import SinglyLinkedListView from './SinglyLinkedListView'
import DoubleLinkedList from './DoubleLinkedList';

const { Paragraph, Title, Text } = Typography;
const data: Array<string> = [
  '获取链表中第index个节点的值。如果索引无效，则返回-1。index从0开始',
  '在链表的第一个元素之前添加一个值为val的节点。插入后，新节点将成为链表的第一个节点。',
  '将值为val的节点追加到链表的最后一个元素。',
  '在链表中的第index个结点之前添加值为val的节点。如果index等于链表的长度，则该节点将附加到链表的末尾。如果index大于链表的长度，则不会插入节点。如果index小于0，则在头部插入节点。',
  '如果索引index有效，则删除链表中的第index个结点。',
]


const LinkedList = () => {
  const { t, i18n } = useTranslation();

  //而这个changeLanguage方法 是用来修改你的多语言的 如果你的语言假设从接口获取的
  // React.useEffect(() => {
  //   //就可以在useEffect内等接口执行完成后调用这个方法替换语言了 当然 你也可以在最初始化的状态去定义 可能有些并不是在useEffect初始化的
  //   changeLanguage(i18n.language=='en'?'zh':'en')
  // }, [])
  return (<div style={{ padding: "20px" }}>
    <Title>{t('链表的设计')}</Title>
    <Paragraph>
      {
        i18n.language === 'en' ? <div key="p1">
          <p>
            Design your implementation of the linked list. You can choose to use a singly or doubly linked list.
          </p>
          <p>
            A node in a singly linked list should have two attributes: <Text code>val</Text> and <Text code>next</Text>. <Text code>val</Text> is the value of the current node, and <Text code>next</Text> is a pointer/reference to the next node.
          </p>
          <p>
            If you want to use the doubly linked list, you will need one more attribute <Text code>prev</Text> to indicate the previous node in the linked list. Assume all nodes in the linked list are <Text strong>0-indexed</Text>.
          </p>
          <p>
            Implement the MyLinkedList class:
          </p>
        </div>
          : <div key="p2">
            <p>
              设计链表的实现。您可以选择使用单链表或双链表。
            </p>
            <p>
              单链表中的节点应该具有两个属性：<Text code>val</Text> 和 <Text code>next</Text>。<Text code>val</Text> 是当前节点的值，<Text code>next</Text> 是指向下一个节点的指针/引用。
            </p>
            <p>
              如果要使用双向链表，则还需要一个属性 <Text code>prev</Text> 以指示链表中的上一个节点。假设链表中的所有节点都是 <Text strong>0-indexed</Text> 的。
            </p>
            <p>
              在链表类中实现这些功能：
            </p>
          </div>
      }

      <ul>
        {data.map((str, key) => <li key={key}>{t(str)}</li>)}
      </ul>
    </Paragraph>
    <Title level={2}>{t("单链表")}</Title>
    <Card>
      <SinglyLinkedListView/>
    </Card>
    <Title level={2}>{t("双链表")}</Title>
    <Card>
      <DoubleLinkedList/>
    </Card>
  </div>)
}

export default LinkedList;