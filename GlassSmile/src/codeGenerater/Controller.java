package com.xiaomi.intl.crm.price.adaptor.controller.{{fileDirName}};

import com.xiaomi.intl.crm.price.api.dto.{{fileDirName}}.{{entityName}}DTO;
import com.xiaomi.intl.crm.price.api.service.{{fileDirName}}.I{{entityName}}Service;
import com.xiaomi.youpin.infra.rpc.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import javax.annotation.Resource;

/**
 * {{remark}} controller
 * @author zhangyi85
 */
@Slf4j
@RestController
@RequestMapping("/crm-price/{{fileDirName}}/{{entityNameLower}}")
public class {{entityName}}Controller {

    @Resource
    private I{{entityName}}Service i{{entityName}}Service;

    /**
     * Query list
     */
    @GetMapping("/queryList")
    public Result<List<{{entityName}}DTO>> queryList() {
        return i{{entityName}}Service.queryList();
    }

    /**
     * Query by id
     */
    @GetMapping("/getById")
    public Result<{{entityName}}DTO> getById(@RequestParam("id") Long id) {
        return i{{entityName}}Service.getById(id);
    }

    /**
     * Batch save
     */
    @PostMapping("/save")
    public Result<Boolean> save(@RequestBody List<{{entityName}}DTO> dtoList) {
        return i{{entityName}}Service.save(dtoList);
    }

    /**
     * Batch delete by id
     */
    @PostMapping("/delete")
    public Result<Boolean> delete(@RequestBody List<Long> idList) {
        return i{{entityName}}Service.delete(idList);
    }
}
