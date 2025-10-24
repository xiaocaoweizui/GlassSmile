package com.xiaomi.intl.crm.price.infra.database.dataobject.price;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.xiaomi.intl.crm.price.common.core.BaseDO;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

/**
 * 国际底价主表
 */
@EqualsAndHashCode(callSuper = true)
@TableName("{{tableName}}")
@Data
public class {{entityName}}DO extends BaseDO {

  {{fields}}

}
