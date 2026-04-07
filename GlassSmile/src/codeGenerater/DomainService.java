package com.xiaomi.intl.crm.price.domain.{{fileDirName}}.service;

import com.xiaomi.intl.crm.price.domain.{{fileDirName}}.entity.{{entityName}};

import java.util.List;

/**
 * {{remark}} Domain Service
 * @author zhangyi85
 */
public interface {{entityName}}DomainService {

    List<{{entityName}}> getList();

    {{entityName}} getById(Long id);

    Boolean save(List<{{entityName}}> entityList);

    Boolean delete(List<Long> idList);
}
