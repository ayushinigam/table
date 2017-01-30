webpackJsonp([21],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(319);


/***/ },

/***/ 319:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/* eslint-disable no-console,func-names,react/no-multi-comp */
	var React = __webpack_require__(4);
	var ReactDOM = __webpack_require__(37);
	var Table = __webpack_require__(188);
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"rc-table/assets/index.less\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var data = [{
	  a: 'a1',
	  b: 'b1',
	  c: 'c1',
	  d: 'd1'
	}, {
	  a: 'a2',
	  b: 'b2',
	  children: [{
	    a: 'a2-1',
	    b: 'b2-1'
	  }, {
	    a: 'a2-2',
	    b: 'b2-2'
	  }],
	  c: 'c2'
	}, {
	  a: 'a3',
	  c: 'c3',
	  d: 'd3'
	}];
	
	var MyTable = React.createClass({
	  displayName: 'MyTable',
	  handleClick: function handleClick(record, e) {
	    e.preventDefault();
	    console.log(record.a);
	  },
	  render: function render() {
	    var _this = this;
	
	    var columns = [{ title: 'title1', dataIndex: 'a', key: 'a', width: 100, parentID: 'parent' }, { title: 'title2', dataIndex: 'b', key: 'b', width: 100, parentID: 'parent' }, { title: 'title3', dataIndex: 'c', key: 'c', width: 200, parentID: 'a' }, { title: 'title4', dataIndex: 'd', key: 'd', width: 200, parentID: 'b' }, {
	      title: 'Operations', dataIndex: '', key: 'x', parentID: 'a', render: function render(text, record) {
	        return React.createElement(
	          'a',
	          { href: '#', onClick: function onClick(e) {
	              return _this.handleClick(record, e);
	            } },
	          'click ',
	          record.a
	        );
	      }
	    }];
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h2',
	        null,
	        'sub table'
	      ),
	      React.createElement(Table, {
	        columns: columns,
	        expandIconAsCell: true,
	        data: data,
	        rowKey: function rowKey(record) {
	          return record.a;
	        }
	      })
	    );
	  }
	});
	
	ReactDOM.render(React.createElement(MyTable, null), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=subTable.js.map