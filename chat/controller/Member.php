<?php
/**
 * Created by PhpStorm.
 * User: rxw
 * Date: 2017/8/27
 * Time: 20:58
 */
namespace chat\controller;
use chat\lib\User;

class Member extends User
{
    private $_userM;

    protected function afterInit()
    {
        $this->_userM = $this->model('User');
    }

    /**
     * @method get
     */
    public function infoApi()
    {
        return [200, $this->_userM->info($this->_uid)];
    }

    /**
     * @method get
     * 
     * @rule password|get|密码错误 require
     * @rule new_password|get|新密码错误 require
     * @rule sure_password|get|确认密码错误 require
     */
    public function passwordApi($password,$new_password,$sure_password)
    {

        if ($new_password !== $sure_password) {
            return [500, '确认密码错误'];
        }

        $result = $this->_userM->password($password, $new_password, $this->_uid);
        if ($result) {
            return [200, true];
        }

        return [500, '密码修改失败'];
    }
}
