package com.xiaomi.intl.crm.price.domain.{{fileDirName}}.entity;

import com.xiaomi.intl.crm.price.common.core.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

/**
 * {{remark}} entity
 * @author zhangyi85
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class {{entityName}} extends BaseEntity {

  {{entityFields}}
}
