package com.xiaomi.intl.crm.price.domain.{{fileDirName}}.service.impl;

import com.xiaomi.intl.crm.price.common.core.DomainService;
import com.xiaomi.intl.crm.price.common.enums.EntityState;
import com.xiaomi.intl.crm.price.domain.{{fileDirName}}.entity.{{entityName}};
import com.xiaomi.intl.crm.price.domain.{{fileDirName}}.repo.{{entityName}}Repository;
import com.xiaomi.intl.crm.price.domain.{{fileDirName}}.service.{{entityName}}DomainService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import javax.annotation.Resource;

/**
 * {{remark}} Domain Service implementation
 * @author zhangyi85
 */
@Slf4j
@Service
public class {{entityName}}DomainServiceImpl extends DomainService implements {{entityName}}DomainService {

    @Resource
    private {{entityName}}Repository {{entityNameLower}}Repository;

    @Override
    public List<{{entityName}}> getList() {
        return {{entityNameLower}}Repository.findAll();
    }

    @Override
    public {{entityName}} getById(Long id) {
        if (id == null) {
            return null;
        }
        return {{entityNameLower}}Repository.selectById(id);
    }

    @Override
    public Boolean save(List<{{entityName}}> entityList) {
        if (entityList == null || entityList.isEmpty()) {
            return false;
        }

        for ({{entityName}} entity : entityList) {
            if (entity.getId() == null) {
                entity.setEntityState(EntityState.CREATED);
            } else {
                entity.setEntityState(EntityState.CHANGED);
            }
            {{entityNameLower}}Repository.saveChanges(entity);
        }
        return true;
    }

    @Override
    public Boolean delete(List<Long> idList) {
        if (idList == null || idList.isEmpty()) {
            return false;
        }
        return {{entityNameLower}}Repository.deleteIn("id", idList) > 0;
    }
}
