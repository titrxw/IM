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
}
