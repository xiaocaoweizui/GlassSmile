function splitByUnderline(name) {
  return String(name)
    .trim()
    .split('_')
    .filter(Boolean)
    .map((part) => part.toLowerCase());
}

function toPascalCase(name) {
  const parts = splitByUnderline(name);
  return parts
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function toCamelCase(name) {
  const pascal = toPascalCase(name);
  return pascal ? pascal.charAt(0).toLowerCase() + pascal.slice(1) : '';
}

function mapJavaType(colType) {
  const type = String(colType || '').toLowerCase();
  switch (type) {
    case 'tinyint':
    case 'smallint':
    case 'mediumint':
    case 'int':
    case 'integer':
      return 'Integer';
    case 'bigint':
      return 'Long';
    case 'float':
    case 'double':
    case 'decimal':
    case 'numeric':
      return 'BigDecimal';
    case 'timestamp':
    case 'datetime':
    case 'date':
    case 'time':
    case 'year':
      return 'Long';
    case 'bit':
    case 'boolean':
      return 'Boolean';
    case 'char':
    case 'varchar':
    case 'tinytext':
    case 'text':
    case 'mediumtext':
    case 'longtext':
    case 'json':
    case 'enum':
    case 'set':
    default:
      return 'String';
  }
}

function mapJavaDtoType(colType, colName) {
  const type = String(colType || '').toLowerCase();
  const name = String(colName || '').toLowerCase();
  const looksLikeDateTime =
    name.endsWith('date') ||
    name.endsWith('time') ||
    name.endsWith('_at') ||
    name.endsWith('timestamp');

  if (['timestamp', 'datetime', 'date', 'time', 'year'].includes(type)) {
    return 'DateTime';
  }

  if (type === 'bigint' && looksLikeDateTime) {
    return 'DateTime';
  }

  if (['tinyint', 'smallint', 'mediumint', 'int', 'integer'].includes(type)) {
    return 'Integer';
  }

  if (type === 'bigint') {
    return 'Long';
  }

  if (['float', 'double', 'decimal', 'numeric'].includes(type)) {
    return 'BigDecimal';
  }

  if (['bit', 'boolean'].includes(type)) {
    return 'Boolean';
  }

  return 'String';
}

module.exports = {
  toJavaName: toCamelCase,
  toJavaUpperName: toPascalCase,
  toJavaVariableName: toCamelCase,
  toJavaType: mapJavaType,
  toJavaDtoType: mapJavaDtoType
};
