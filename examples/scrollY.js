/* eslint-disable no-console,func-names,react/no-multi-comp */
const React = require('react');
const ReactDOM = require('react-dom');
const Table = require('rc-table-forked');
require('rc-table/assets/index.less');

const data = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    a: `a${i}`,
    b: `b${i}`,
    c: `c${i}`,
  });
}

const Test = React.createClass({
  getInitialState() {
    return {
      showBody: true,
    };
  },

  toggleBody() {
    this.setState({
      showBody: !this.state.showBody,
    });
  },

  render() {
    const columns = [
      { title: 'title1', key: 'a', dataIndex: 'a', width: 100 },
      { id: '123', title: 'title2', dataIndex: 'b', key: 'b', width: 100 },
      { title: 'title3', key: 'c', dataIndex: 'c', width: 200 },
      {
        title: <a onClick={this.toggleBody} href="#">{this.state.showBody ? '隐藏' : '显示'}体</a>,
        key: 'x',
        width: 200,
        render() {
          return <a href="#">Operations</a>;
        },
      },
    ];
    return (
      <Table
        columns={columns}
        data={data}
        scroll={{ y: 300 }}
        rowKey={record => record.key}
        bodyStyle={{
          display: this.state.showBody ? '' : 'none',
        }}
      />
    );
  },
});

ReactDOM.render(
  <div>
    <h2>scroll body table</h2>
    <Test/>
  </div>,
  document.getElementById('__react-content')
);
