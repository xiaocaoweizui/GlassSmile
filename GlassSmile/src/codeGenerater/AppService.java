package com.xiaomi.intl.crm.price.app.service.{{fileDirName}};

import com.xiaomi.intl.crm.price.api.dto.{{fileDirName}}.{{entityName}}DTO;
import com.xiaomi.intl.crm.price.api.service.{{fileDirName}}.I{{entityName}}Service;
import com.xiaomi.intl.crm.price.domain.{{fileDirName}}.entity.{{entityName}};
import com.xiaomi.intl.crm.price.domain.{{fileDirName}}.service.{{entityName}}DomainService;
import com.xiaomi.youpin.infra.rpc.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import javax.annotation.Resource;

/**
 * {{remark}} app service implementation
 * @author zhangyi85
 */
@Service
@Slf4j
public class {{entityName}}Service implements I{{entityName}}Service {

    @Resource
    private {{entityName}}DomainService {{entityNameLower}}DomainService;

    @Override
    public Result<List<{{entityName}}DTO>> queryList() {
        List<{{entityName}}> entityList = {{entityNameLower}}DomainService.getList();
        if (entityList == null || entityList.isEmpty()) {
            return Result.success(Collections.emptyList());
        }
        List<{{entityName}}DTO> dtoList = entityList.stream()
                .map(item -> item.mapping({{entityName}}DTO.class))
                .collect(Collectors.toList());
        return Result.success(dtoList);
    }

    @Override
    public Result<{{entityName}}DTO> getById(Long id) {
        {{entityName}} entity = {{entityNameLower}}DomainService.getById(id);
        if (entity == null) {
            return Result.success(null);
        }
        return Result.success(entity.mapping({{entityName}}DTO.class));
    }

    @Override
    public Result<Boolean> save(List<{{entityName}}DTO> dtoList) {
        if (dtoList == null || dtoList.isEmpty()) {
            return Result.success(false);
        }
        List<{{entityName}}> entityList = dtoList.stream()
                .map(item -> item.mapping({{entityName}}.class))
                .collect(Collectors.toList());
        return Result.success({{entityNameLower}}DomainService.save(entityList));
    }

    @Override
    public Result<Boolean> delete(List<Long> idList) {
        if (idList == null || idList.isEmpty()) {
            return Result.success(false);
        }
        return Result.success({{entityNameLower}}DomainService.delete(idList));
    }
}
