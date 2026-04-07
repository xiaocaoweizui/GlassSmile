package com.xiaomi.intl.crm.price.infra.database.dataobject.{{fileDirName}};

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.xiaomi.intl.crm.price.common.core.BaseDO;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

/**
 * {{remark}} table
 * @author zhangyi85
 */
@EqualsAndHashCode(callSuper = true)
@TableName("{{tableName}}")
@Data
public class {{entityName}}DO extends BaseDO {

  {{fields}}

}
