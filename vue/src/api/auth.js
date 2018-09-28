import base from './base'
import user from '@/beans/user'

/**
 * 登录类
 */
export default class Auth extends base {
    static async register(form) {
        let result = await this.post('common/register', form)
        if (result) {
            user.login(result)
        }
        return result
    }
    static async login(form) {
        let result = await this.post('common/login', form)
        if (result) {
            user.login(result)
        }
        return result
    }
    static unLogin() {
        user.unLogin()
    }
}