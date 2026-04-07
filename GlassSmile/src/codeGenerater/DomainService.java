package com.xiaomi.intl.crm.price.domain.{{fileDirName}}.service;

import com.xiaomi.intl.crm.price.common.core.DomainService;
import com.xiaomi.intl.crm.price.common.enums.EntityState;
import com.xiaomi.intl.crm.price.domain.{{fileDirName}}.entity.{{entityName}};
import com.xiaomi.intl.crm.price.domain.{{fileDirName}}.repo.{{entityName}}Repository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import javax.annotation.Resource;

/**
 * {{remark}} Domain Service
 * @author zhangyi85
 */
@Slf4j
@Service
public class {{entityName}}DomainService extends DomainService {

    @Resource
    private {{entityName}}Repository {{entityNameLower}}Repository;

    public List<{{entityName}}> getList() {
        return {{entityNameLower}}Repository.findAll();
    }

    public {{entityName}} getById(Long id) {
        if (id == null) {
            return null;
        }
        return {{entityNameLower}}Repository.selectById(id);
    }

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
        }
        List<{{entityName}}> savedList = {{entityNameLower}}Repository.saveChanges(entityList);
        return savedList != null && !savedList.isEmpty();
    }

    public Boolean delete(List<Long> idList) {
        if (idList == null || idList.isEmpty()) {
            return false;
        }
        return {{entityNameLower}}Repository.deleteIn("id", idList) > 0;
    }
}
