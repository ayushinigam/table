import React, { PropTypes } from 'react';
import shallowequal from 'shallowequal';
import _ from 'lodash';
import { $ } from '../utils/ki';
import ExpandIcon from './ExpandIcon';

export default React.createClass({
  propTypes: {
    prefixCls: PropTypes.string,
    rowStyle: PropTypes.object,
    rows: PropTypes.array,
  },
  getInitialState() {
    return {
      rows: this.props.rows
    };
  },
  // shouldComponentUpdate(nextProps) {
  //   return !shallowequal(nextProps, this.props);
  // },
  componentDidMount() {
    const data = this.state.rows[0]
    data.forEach(child=>{
      if(child.parent !== 'parent' && child.colIndex) {
        $(`.rc-table-body td:nth-of-type(${child.colIndex + 2})`).hide();
        $(`.rc-table-body th:nth-of-type(${child.colIndex + 2})`).hide();
      }
    })
  },
  getChild(expanded, record, e) {
    console.log(expanded)
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
    const { prefixCls, rowStyle } = this.props;
    const { rows } = this.state;
    console.log( this.state )
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
                    prefixCls="rc-table-row"
                    onExpand={this.getChild}
                    needIndentSpaced={false}
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
