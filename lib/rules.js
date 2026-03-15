/** DON'T EDIT THIS FILE; was created by scripts. */

import disableEnablePair from "./rules/disable-enable-pair.js"
import noAggregatingEnable from "./rules/no-aggregating-enable.js"
import noDuplicateDisable from "./rules/no-duplicate-disable.js"
import noRestrictedDisable from "./rules/no-restricted-disable.js"
import noUnlimitedDisable from "./rules/no-unlimited-disable.js"
import noUnusedEnable from "./rules/no-unused-enable.js"
import noUse from "./rules/no-use.js"
import requireDescription from "./rules/require-description.js"

export default {
    "disable-enable-pair": disableEnablePair,
    "no-aggregating-enable": noAggregatingEnable,
    "no-duplicate-disable": noDuplicateDisable,
    "no-restricted-disable": noRestrictedDisable,
    "no-unlimited-disable": noUnlimitedDisable,
    "no-unused-enable": noUnusedEnable,
    "no-use": noUse,
    "require-description": requireDescription,
}
