const fs = require('fs');
const path = require('path');
const util = require('util');

const cnn = require('../tools/database.js');
const codeTools = require('./codeTools');

const FILE_DIR_NAME = 'grant';
const TABLE_SCHEMA = 'intl_commission_system_price';
const COLUMN_BLACKLIST = new Set(['create_user', 'create_time', 'update_user', 'update_time']);

const TEMPLATE_ROOT = __dirname;
const LOCAL_OUTPUT_ROOT = path.join(TEMPLATE_ROOT, 'code');
const BACKEND_PROJECT_ROOT = process.env.CODEGEN_BACKEND_ROOT || 'C:\\code\\mi-intl-price';
const DEFAULT_OUTPUT_MODE = 'backend';
const RAW_OUTPUT_MODE = String(process.env.CODEGEN_OUTPUT_MODE || '').trim().toLowerCase();
const OUTPUT_MODE = ['backend', 'local'].includes(RAW_OUTPUT_MODE) ? RAW_OUTPUT_MODE : DEFAULT_OUTPUT_MODE;
const DRY_RUN = String(process.env.CODEGEN_DRY_RUN || '').toLowerCase() === 'true';

const params = [
  {
    tableName: 'country_grant_price',
    remark: 'Country grant price'
  },
  {
    tableName: 'country_grant_price_his',
    remark: 'Country grant price history'
  }
];

function backendJavaPath(moduleName, ...parts) {
  return path.join(
    BACKEND_PROJECT_ROOT,
    moduleName,
    'src',
    'main',
    'java',
    'com',
    'xiaomi',
    'intl',
    'crm',
    'price',
    ...parts
  );
}

function resolveOutputPathByMode(mode, localPath, backendPath) {
  return mode === 'backend' ? backendPath : localPath;
}

const templateJobs = [
  {
    templateName: 'Mapper.java',
    outputFile: (context, mode) => resolveOutputPathByMode(
      mode,
      path.join(LOCAL_OUTPUT_ROOT, 'mapper', `${context.entityName}Mapper.java`),
      backendJavaPath('intl-crm-price-infra', 'infra', 'database', 'mapper', context.fileDirName, `${context.entityName}Mapper.java`)
    )
  },
  {
    templateName: 'Repository.java',
    outputFile: (context, mode) => resolveOutputPathByMode(
      mode,
      path.join(LOCAL_OUTPUT_ROOT, 'repo', `${context.entityName}Repository.java`),
      backendJavaPath('intl-crm-price-domain', 'domain', context.fileDirName, 'repo', `${context.entityName}Repository.java`)
    )
  },
  {
    templateName: 'RepositoryImpl.java',
    outputFile: (context, mode) => resolveOutputPathByMode(
      mode,
      path.join(LOCAL_OUTPUT_ROOT, 'repository', `${context.entityName}RepositoryImpl.java`),
      backendJavaPath('intl-crm-price-infra', 'infra', 'repository', context.fileDirName, `${context.entityName}RepositoryImpl.java`)
    )
  },
  {
    templateName: 'DO.java',
    outputFile: (context, mode) => resolveOutputPathByMode(
      mode,
      path.join(LOCAL_OUTPUT_ROOT, 'dataobject', `${context.entityName}DO.java`),
      backendJavaPath('intl-crm-price-infra', 'infra', 'database', 'dataobject', context.fileDirName, `${context.entityName}DO.java`)
    )
  },
  {
    templateName: 'Entity.java',
    outputFile: (context, mode) => resolveOutputPathByMode(
      mode,
      path.join(LOCAL_OUTPUT_ROOT, 'entity', `${context.entityName}.java`),
      backendJavaPath('intl-crm-price-domain', 'domain', context.fileDirName, 'entity', `${context.entityName}.java`)
    )
  },
  {
    templateName: 'DTO.java',
    outputFile: (context, mode) => resolveOutputPathByMode(
      mode,
      path.join(LOCAL_OUTPUT_ROOT, 'dto', `${context.entityName}DTO.java`),
      backendJavaPath('intl-crm-price-api', 'api', 'dto', context.fileDirName, `${context.entityName}DTO.java`)
    )
  },
  {
    templateName: 'ApiService.java',
    outputFile: (context, mode) => resolveOutputPathByMode(
      mode,
      path.join(LOCAL_OUTPUT_ROOT, 'api', 'service', context.fileDirName, `I${context.entityName}Service.java`),
      backendJavaPath('intl-crm-price-api', 'api', 'service', context.fileDirName, `I${context.entityName}Service.java`)
    )
  },
  {
    templateName: 'AppService.java',
    outputFile: (context, mode) => resolveOutputPathByMode(
      mode,
      path.join(LOCAL_OUTPUT_ROOT, 'app', 'service', context.fileDirName, `${context.entityName}Service.java`),
      backendJavaPath('intl-crm-price-app', 'app', 'service', context.fileDirName, `${context.entityName}Service.java`)
    )
  },
  {
    templateName: 'DomainService.java',
    outputFile: (context, mode) => resolveOutputPathByMode(
      mode,
      path.join(LOCAL_OUTPUT_ROOT, 'service', `${context.entityName}DomainService.java`),
      backendJavaPath('intl-crm-price-domain', 'domain', context.fileDirName, 'service', `${context.entityName}DomainService.java`)
    )
  },
  {
    templateName: 'Controller.java',
    outputFile: (context, mode) => resolveOutputPathByMode(
      mode,
      path.join(LOCAL_OUTPUT_ROOT, 'controller', `${context.entityName}Controller.java`),
      backendJavaPath('intl-crm-price-adaptor', 'adaptor', 'controller', context.fileDirName, `${context.entityName}Controller.java`)
    )
  }
];

function loadTemplates() {
  const templateNames = [...new Set(templateJobs.map((job) => job.templateName))];
  const templates = {};

  templateNames.forEach((templateName) => {
    const templatePath = path.join(TEMPLATE_ROOT, templateName);
    templates[templateName] = fs.readFileSync(templatePath, 'utf8');
  });

  return templates;
}

function renderTemplate(template, context) {
  return template.replace(/{{(\w+)}}/g, (fullMatch, key) => {
    const value = context[key];
    return value === undefined || value === null ? '' : String(value);
  });
}

async function queryColumns(queryAsync, tableName) {
  const querySql = `
    SELECT COLUMN_NAME,
           DATA_TYPE,
           IS_NULLABLE,
           COLUMN_DEFAULT,
           COLUMN_COMMENT
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = ?
      AND TABLE_SCHEMA = ?
    ORDER BY ORDINAL_POSITION;
  `;

  const rows = await queryAsync(querySql, [tableName, TABLE_SCHEMA]);
  if (!Array.isArray(rows)) {
    throw new Error(`Unexpected query result for table ${tableName}`);
  }

  return rows.filter((row) => !COLUMN_BLACKLIST.has(String(row.COLUMN_NAME).toLowerCase()));
}

function buildFieldBlocks(columns) {
  const doFields = [];
  const entityFields = [];
  const dtoFields = [];

  columns.forEach((column) => {
    const columnName = column.COLUMN_NAME;
    const columnComment = column.COLUMN_COMMENT || columnName;
    const javaName = codeTools.toJavaName(columnName);
    const javaType = codeTools.toJavaType(column.DATA_TYPE);
    const javaDtoType = codeTools.toJavaDtoType(column.DATA_TYPE, columnName);
    const isPrimaryKey = javaName === 'id';

    const tableField = isPrimaryKey
      ? '@TableId(type = IdType.AUTO)'
      : `@TableField("${columnName}")`;

    doFields.push(`
    /**
     * ${columnComment}
     */
    ${tableField}
    private ${javaType} ${javaName};`);

    entityFields.push(`
    /**
     * ${columnComment}
     */
    private ${javaType} ${javaName};`);

    const jsonFormat = javaDtoType === 'DateTime'
      ? '@JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")\n    '
      : '';

    dtoFields.push(`
    /**
     * ${columnComment}
     */
    ${jsonFormat}private ${javaDtoType} ${javaName};`);
  });

  return {
    fields: doFields.join('\n'),
    entityFields: entityFields.join('\n'),
    dtoFields: dtoFields.join('\n')
  };
}

function buildContext(param, fieldBlocks) {
  const entityName = codeTools.toJavaUpperName(param.tableName);
  const entityNameLower = codeTools.toJavaVariableName(param.tableName);

  return {
    entityName,
    entityNameLower,
    fileDirName: FILE_DIR_NAME,
    tableName: param.tableName,
    remark: param.remark,
    fields: fieldBlocks.fields,
    entityFields: fieldBlocks.entityFields,
    dtoFields: fieldBlocks.dtoFields
  };
}

function writeFileSafely(filePath, content) {
  if (DRY_RUN) {
    console.log(`[DRY_RUN] Skip write: ${filePath}`);
    return;
  }
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}

function clearLocalOutputRootIfNeeded() {
  if (OUTPUT_MODE !== 'local') {
    return;
  }
  if (DRY_RUN) {
    console.log(`[DRY_RUN] Skip clear local output root: ${LOCAL_OUTPUT_ROOT}`);
    return;
  }

  const resolvedTemplateRoot = path.resolve(TEMPLATE_ROOT);
  const resolvedLocalOutputRoot = path.resolve(LOCAL_OUTPUT_ROOT);
  const expectedLocalOutputRoot = path.join(resolvedTemplateRoot, 'code');
  if (resolvedLocalOutputRoot !== expectedLocalOutputRoot) {
    throw new Error(
      `Refuse to clear unexpected local output root: ${resolvedLocalOutputRoot}. Expected: ${expectedLocalOutputRoot}`
    );
  }

  fs.rmSync(resolvedLocalOutputRoot, { recursive: true, force: true });
  fs.mkdirSync(resolvedLocalOutputRoot, { recursive: true });
  console.log(`Cleared local output root: ${resolvedLocalOutputRoot}`);
}

async function generateForTable(queryAsync, templates, param) {
  const columns = await queryColumns(queryAsync, param.tableName);
  if (columns.length === 0) {
    console.warn(`Skip ${param.tableName}: no available columns.`);
    return;
  }

  const fieldBlocks = buildFieldBlocks(columns);
  const context = buildContext(param, fieldBlocks);

  templateJobs.forEach((job) => {
    const template = templates[job.templateName];
    const renderContext = {
      ...context,
      // Keep backward compatibility with historical templates.
      fields: context.fields,
      entityFields: context.entityFields,
      dtoFields: context.dtoFields
    };

    let content = renderTemplate(template, renderContext);
    // Backward compatibility: old templates used {{fields}} for Entity/DTO.
    if (job.templateName === 'Entity.java') {
      content = content.replace(/{{fields}}/g, context.entityFields);
    }
    if (job.templateName === 'DTO.java') {
      content = content.replace(/{{fields}}/g, context.dtoFields);
    }

    const outputFile = job.outputFile(context, OUTPUT_MODE);
    writeFileSafely(outputFile, content);
    console.log(`Generated: ${outputFile}`);
  });

  // Compatibility cleanup for local output.
  if (OUTPUT_MODE === 'local') {
    const legacyDomainServiceImplFile = path.join(
      LOCAL_OUTPUT_ROOT,
      'service',
      'impl',
      `${context.entityName}DomainServiceImpl.java`
    );
    if (fs.existsSync(legacyDomainServiceImplFile) && !DRY_RUN) {
      fs.unlinkSync(legacyDomainServiceImplFile);
      console.log(`Removed legacy file: ${legacyDomainServiceImplFile}`);
    }
  }
}

async function main() {
  if (!Array.isArray(params) || params.length === 0) {
    console.warn('No tables configured in params.');
    return;
  }

  if (RAW_OUTPUT_MODE && !['backend', 'local'].includes(RAW_OUTPUT_MODE)) {
    console.warn(
      `Unsupported CODEGEN_OUTPUT_MODE: ${RAW_OUTPUT_MODE}. Fallback to default mode: ${DEFAULT_OUTPUT_MODE}.`
    );
  }
  if (OUTPUT_MODE === 'backend' && !fs.existsSync(BACKEND_PROJECT_ROOT)) {
    throw new Error(`Backend project root not found: ${BACKEND_PROJECT_ROOT}`);
  }

  clearLocalOutputRootIfNeeded();

  const templates = loadTemplates();

  const connectAsync = util.promisify(cnn.connect).bind(cnn);
  const queryAsync = util.promisify(cnn.query).bind(cnn);
  const endAsync = util.promisify(cnn.end).bind(cnn);

  console.log(
    `Start generate. tables=${params.length}, schema=${TABLE_SCHEMA}, module=${FILE_DIR_NAME}, mode=${OUTPUT_MODE}, dryRun=${DRY_RUN}`
  );

  await connectAsync();
  try {
    for (const param of params) {
      await generateForTable(queryAsync, templates, param);
    }
  } finally {
    await endAsync();
  }

  console.log('Generate finished.');
}

main().catch((error) => {
  console.error('Generate failed:', error);
  process.exitCode = 1;
});
