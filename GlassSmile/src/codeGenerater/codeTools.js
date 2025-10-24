var tools = function () {
  return {
    toJavaName: function (colName) {
      // 将mysql中字段的名称转换成 驼峰命名，
      //例如： user_name 转换成 userName
      return colName.split('_').map(function (item, index) {
        return index === 0 ? item : item.charAt(0).toUpperCase() + item.slice(1)
      })
    },
    toJavaType: function (colType) {
      switch (colType) {
        case 'int':
        case 'tinyint':
        case 'smallint':
        case 'mediumint':
          return 'Integer'
        case 'bigint':
        case 'timestamp':
        case 'datetime':
        case 'date':
        case 'time':
          return 'Long'
        case 'float':
        case 'double':
        case 'decimal':
          return 'Double'
        case 'char':
        case 'varchar':
        case 'tinytext':
        case 'text':
          return 'String'
      }
    }
  }
}

module.exports = tools();
