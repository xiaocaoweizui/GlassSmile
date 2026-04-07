package com.xiaomi.intl.crm.price.api.dto.{{fileDirName}};

import com.fasterxml.jackson.annotation.JsonFormat;
import com.xiaomi.intl.crm.price.api.dto.EntityDTO;
import cn.hutool.core.date.DateTime;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

/**
 * {{remark}} dto
 *
 * @author zhangyi85
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class {{entityName}}DTO extends EntityDTO {

  {{dtoFields}}

}
