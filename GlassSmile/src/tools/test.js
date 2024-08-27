var RuleToFunction = {
  "isAmount": "isAmount",
  "isAlphanumeric": "isAlphanumeric",
  "excludeNameKeyWords": "isNotContainKeyWordsProjName"
}

module.exports = {
  titleAnchorPoint: "序号",
  //每个规则需要对应解析函数，可以使用js的eval动态调用
  titleObjects: {
    Code: {
      name: "项目编码",
      index: 0,
      rules: {
        bqRow: {},
        sectionUnitRow: {}
      }
    },
    Name: {
      name: "项目名称",
      index: 0,
      rules: {
        bqRow: {},
        sectionUnitRow: {
          excludeNameKeyWords: true
        }
      }
    },
    Attr: {
      name: "项目特征",
      index: 0,
      rules: {
        bqRow: {},
        sectionUnitRow: {}
      }
    },
    Unit: {
      name: "单位",
      index: 0,
      rules: {
        bqRow: {},
        sectionUnitRow: {}
      }
    },
    Quantity: {
      name: "工程量",
      index: 0,
      rules: {
        bqRow: {
          isAmount: true
        },
        sectionUnitRow: {}
      }
    },
    Price: {
      name: "综合单价/费率",
      index: 0,
      rules: {
        bqRow: {
          isAmount: true
        },
        sectionUnitRow: {}
      }
    },
    TotalAmount: {
      name: "合计",
      index: 0,
      rules: {
        bqRow: {
          isAmount: true
        },
        sectionUnitRow: {}
      }
    },
    Remark: {
      name: "备注",
      index: 0,
      rules: {
        bqRow: {},
        sectionUnitRow: {}
      }
    }
  },
  //{col:0,row:0,colCount:0,rowCount:0}
  titleSpan: null,
  indentifyTitle: function () {
    var me = this;
    var sheet = MySpread.getActiveSheet();
    //标题的锚点
    var titleAnchorPoint = me.titleAnchorPoint;
    // 这里能否让客户，设置一行数据清单行，程序参考这个自动识别
    // 列，先找到锚点，序号列

    for (var i = StartRow; i < sheet.getRowCount(); i++) {
      for (var j = StartCol; j < sheet.getColumnCount(); j++) {
        var text = $MySheet.getCellText(i, j);
        if (text.indexOf(titleAnchorPoint) >= 0) {
          me.titleSpan = $MySheet.getCellSpan(i, j);
          return true;
        }
      }
    }
    return false;
  },
  indentifyRow: function (tmpRowNum, rowTypeName, rowType) {
    //识别行
    //1、行有多少列  2、每列的类型和是否为空
    var me = this;
    if (!me.indentifyTitle()) {
      return;
    }
    var sheet = MySpread.getActiveSheet();

    //获取规则：
    var rowRules = {
      colRules: []
    };
    for (var j = StartCol; j < sheet.getColumnCount(); j++) {
      var span = $MySheet.getCellSpan(tmpRowNum, j);
      var text = sheet.getCell(tmpRowNum, j).text()
      var titleObject = $_.find(me.titleObjects, function (obj) {
        return obj.index == j;
      });
      //通用校验
      var colRule = {
        spanCol: span == null ? null : span.colCount,
        isEmpty: text == ""
      }

      //合并识别出来的列，和通用校验
      if (titleObject != null) {
        colRule = Object.assign({}, colRule, titleObject.rules[rowType]);
      }
      rowRules.colRules.push(colRule);
    }

    var rowCount = sheet.getRowCount();
    var startRowNum = me.titleSpan.row + me.titleSpan.rowCount;

    for (var i = startRowNum; i < rowCount; i++) {
      //已经识别了的，跳过
      if (sheet.getCell(i, RowTypeCol).text() != "") {
        continue;
      }
      var flag = true;
      var j = StartCol;
      while (flag && j < sheet.getColumnCount()) {
        //判断一轮
        var tmpSpan = $MySheet.getCellSpan(i, j);
        var text = sheet.getCell(i, j).text();
        var titleObject = $_.find(me.titleObjects, function (obj) {
          return obj.index == j;
        });
        //通用规则
        var matchTest = {
          spanCol: tmpSpan == null ? null : tmpSpan.colCount,
          isEmpty: text == ""
        }
        //列自定义规则，反射调用
        if (titleObject != null) {
          for (var prop in titleObject.rules[rowType]) {
            var func = RuleToFunction[prop];
            var value = me[func].call(me, text);

            matchTest[prop] = value;
          }
        }

        //比较最后的json对象
        flag = $_.toJSON(matchTest) == $_.toJSON(rowRules.colRules[j - StartCol]);
        j++;
      }
      if (flag) {
        sheet.getCell(i, RowTypeCol).text(rowTypeName);
      }

    }
  },
  indentifyColumn: function (columnName) {
    var me = this;
    var sheet = MySpread.getActiveSheet();

    if (!me.indentifyTitle()) {
      return;
    }

    var columnList = [];
    for (var j = me.titleSpan.col; j < sheet.getColumnCount(); j++) {
      for (var i = me.titleSpan.row; i < me.titleSpan.row + me.titleSpan.rowCount; i++) {
        var text = $MySheet.getCellText(i, j);
        var matchCol = me.matchColumn(text);

        if (matchCol != null) {
          //判断当前列是否已经识别到了，识别了，跳过
          var columnMatch = $_.find(columnList, function (col) {
            return col.Name == matchCol.name;
          });
          if (columnMatch != null) {
            continue;
          }
          matchCol.index = j;
          columnList.push({SerialNum: j, Name: matchCol.name});
        }
      }
    }

    $MySheet.reloadColumn(columnList);

  },
  isAmount: function (str) {
    var regex = /^[-+]?(\d+|\d*\.\d+)$/;
    return regex.test(str);
  },
  isAlphanumeric: function (str) {
    return /^[a-zA-Z0-9]+$/.test(str);
  },
  isNotContainKeyWordsProjName: function (str) {
    //这里可以后台去配置
    var keyWordsList = ["小计"];
    for (var i = 0; i < keyWordsList.length; i++) {
      var keyword = keyWordsList[i];
      var flag = str.indexOf(keyword) >= 0;
      if (flag) {
        return false;
      }
    }
    return true;
  },
  matchColumn: function (name) {
    //todo 丢后台进行匹配逻辑，这里先简单的进行关键词匹配
    //前端粗略按关键词匹配
    var me = this;
    if (name.indexOf("编码") >= 0) {
      return me.titleObjects.Code;
    }
    if (name.indexOf("名称") >= 0) {
      return me.titleObjects.Name;
    }
    if (name.indexOf("特征") >= 0 || name.indexOf("描述") >= 0) {
      return me.titleObjects.Attr;
    }
    if (name.indexOf("单位") >= 0) {
      return me.titleObjects.Unit;
    }
    if (name.indexOf("工程量") >= 0) {
      return me.titleObjects.Quantity;
    }

    if (name.indexOf("工程量") >= 0) {
      return me.titleObjects.Quantity;
    }
    if (name.indexOf("单价") >= 0 || name.indexOf("费率") >= 0) {
      return me.titleObjects.Price;
    }
    if (name.indexOf("合计") >= 0 || name.indexOf("合价") >= 0 || name.indexOf("总价") >= 0) {
      return me.titleObjects.TotalAmount;
    }
    if (name.indexOf("备注") >= 0 || name.indexOf("说明") >= 0) {
      return me.titleObjects.Remark;
    }
    return null;
  }

}
