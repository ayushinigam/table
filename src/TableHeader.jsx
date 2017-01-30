import React, { PropTypes } from 'react';
import shallowequal from 'shallowequal';
import _ from 'lodash';
import { $ } from './utils/ki';
import ExpandIcon from './ExpandIcon';

export default React.createClass({
  propTypes: {
    prefixCls: PropTypes.string,
    rowStyle: PropTypes.object,
    rows: PropTypes.array,
    prefixClsExpand: PropTypes.string
  },
  getInitialState() {
    return {
      rows: this.props.rows
    };
  },
  getDefaultProps() {
    return {
      prefixClsExpand: 'rc-table-row'
    };
  },
  // shouldComponentUpdate(nextProps) {
  //   return !shallowequal(nextProps, this.props);
  // },
  componentDidMount() {
    const rows = this.state.rows[0]
    rows.forEach(child=>{
      if(child.parent !== 'parent' && child.colIndex) {
        $(`.rc-table-body td:nth-of-type(${child.colIndex + 2})`).hide();
        $(`.rc-table-body th:nth-of-type(${child.colIndex + 2})`).hide();
      }
    })
  },
  getChild(expanded, record, e) {
    const rows = this.state.rows[0]
    const children = _.filter(rows, {'parent': record.key})
    children.forEach(child=>{
      $(`.rc-table-body td:nth-of-type(${child.colIndex + 2})`).toggle();
      $(`.rc-table-body th:nth-of-type(${child.colIndex + 2})`).toggle();
    })
    const newState = rows.map(header=>{
      if(header.key === record.key) {
        console.log('before',header,'after',Object.assign({},header,{expanded:expanded}));
        return Object.assign({},header,{expanded:expanded})
      }
      return header
    })
    this.setState({
      rows:[newState]
    })
  },
  render() {
    const { prefixCls, rowStyle, prefixClsExpand} = this.props;
    const { rows } = this.state;
    return (
      <thead className={`${prefixCls}-thead`}>
        {
          rows.map((row, index) => (
            <tr key={index} style={rowStyle}>
              {row.map((cellProps, i) => {
                if(cellProps.parent === 'parent') {
                  return (<th {...cellProps} key={i}> {cellProps.children}
                  <ExpandIcon
                    expandable={true}
                    prefixCls={prefixClsExpand}
                    onExpand={this.getChild}
                    needIndentSpaced={true}
                    expanded={cellProps.expanded}
                    record={cellProps}
                  />
                  </th>)
                } else {
                  return (<th {...cellProps} key={i}></th>)
                }
              })}
            </tr>
          ))
        }
      </thead>
    );
  },
});
