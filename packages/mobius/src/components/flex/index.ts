import { WithInstall, withInstall } from '../utils/with-install'
import _Flex from './Flex.vue';

// 未标记 WithInstall 会导致构建后类型丢失
export const Flex: WithInstall<typeof _Flex> = withInstall(_Flex)
export default Flex