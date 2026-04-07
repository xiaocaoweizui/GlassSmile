package com.xiaomi.intl.crm.price.api.service.{{fileDirName}};

import com.xiaomi.intl.crm.price.api.dto.{{fileDirName}}.{{entityName}}DTO;
import com.xiaomi.youpin.infra.rpc.Result;

import java.util.List;

/**
 * {{remark}} service interface
 * @author zhangyi85
 */
public interface I{{entityName}}Service {

    Result<List<{{entityName}}DTO>> queryList();

    Result<{{entityName}}DTO> getById(Long id);

    Result<Boolean> save(List<{{entityName}}DTO> dtoList);

    Result<Boolean> delete(List<Long> idList);
}
