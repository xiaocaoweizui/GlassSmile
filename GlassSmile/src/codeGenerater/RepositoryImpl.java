package com.xiaomi.intl.crm.price.infra.repository.{{fileDirName}};

import com.xiaomi.intl.crm.price.common.core.BaseDao;
import com.xiaomi.intl.crm.price.common.core.BaseRepositoryImpl;
import com.xiaomi.intl.crm.price.common.utils.CollectionExtension;
import com.xiaomi.intl.crm.price.common.utils.ObjectExtension;
import com.xiaomi.intl.crm.price.common.utils.StringExtension;
import com.xiaomi.intl.crm.price.domain.{{fileDirName}}.entity.{{entityName}};
import com.xiaomi.intl.crm.price.domain.{{fileDirName}}.repo.{{entityName}}Repository;
import com.xiaomi.intl.crm.price.infra.database.dataobject.{{fileDirName}}.{{entityName}}DO;
import com.xiaomi.intl.crm.price.infra.database.mapper.{{fileDirName}}.{{entityName}}Mapper;
import lombok.experimental.ExtensionMethod;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;
import javax.annotation.Resource;

/**
 * {{remark}} Repository 实现类
 * @author zhangyi85
 */
@Slf4j
@Repository
@ExtensionMethod({CollectionExtension.class, StringExtension.class, ObjectExtension.class})
public class {{entityName}}RepositoryImpl  extends BaseRepositoryImpl<{{entityName}}> implements {{entityName}}Repository {

  @Resource
  private {{entityName}}Mapper {{entityNameLower}}Mapper;

  @Override
  public {{entityName}} saveChanges({{entityName}} entity) {
    {{entityName}}DO entityDO = entity.mapping({{entityName}}DO.class);
    batchSqlHelper.saveChanges(entityDO, {{entityNameLower}}Mapper.getClass());
    return entityDO.mapping({{entityName}}.class);
  }

  @Override
  public List<{{entityName}}> saveChanges(List<{{entityName}}> entityList) {
    List<{{entityName}}DO> entityDOList = entityList.mapping({{entityName}}DO.class);
    batchSqlHelper.saveChanges(entityDOList, {{entityNameLower}}Mapper.getClass());
    return entityDOList.mapping({{entityName}}.class);
  }

  @Override
  public Class<{{entityName}}> getEntityClass() {
    return {{entityName}}.class;
  }

  @Override
  @SuppressWarnings("unchecked")
  public Class<{{entityName}}DO> getDataObjectClass() {
    return {{entityName}}DO.class;
  }

  @Override
  @SuppressWarnings("unchecked")
  public BaseDao<{{entityName}}DO> getMapper() {
    return {{entityNameLower}}Mapper;
  }

}
