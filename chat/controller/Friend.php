<?php
/**
 * Created by PhpStorm.
 * User: rxw
 * Date: 2017/8/27
 * Time: 20:58
 */
namespace chat\controller;
use chat\lib\User;

class Friend extends User
{
    private $_friendM;

    protected function afterInit()
    {
        $this->_friendM = $this->model('User');
    }

    /**
     * @method get
     * 
     * @rule mobile|get|账号格式错误 regex|/^1[34578]\d{9}$/  
     */
    public function findUserByMobileApi()
    {
        $mobile = $this->request->get('mobile');
        if ($mobile == $this->_user['mobile']) {
            return [200, []];
        }


        return [200, $this->_friendM->findUserByMobile($mobile)];
    }

    /**
     * @method get
     * 
     * @rule uid|get|参数错误 require 
     */
    public function addUserApi()
    {
        $uid = $this->request->get('uid');
        // 添加请求记录

        $result = $this->_user->addUser($this->_uid, $uid);
        if ($result === HAS_SEND_ADD_REQUEST) {
            return [200, true];
        }
        if (!$result) {
            return [501, '添加失败'];
        }

        $fd = $this->getFdByUid($uid);
        if ($fd) {
            $this->send($fd, [
                'cmd' => 'addUser',
                'from' => [
                    'name' => $this->_user['name'],
                    'mobile' => $this->_user['mobile'],
                    'uid' => $this->_uid
                ]
            ]);
        }
        
        return [200, true];
    }

    /**
     * @method get
     * 
     * @rule uid|get|参数错误 require 
     */
    public function sureAddUserApi()
    {
        $uid = $this->request->get('uid');

        $result = $this->_user->sureAddUser($this->_uid, $uid);
        if ($result) {
            $fd = $this->getFdByUid($uid);
            if ($fd) {
                $this->send($fd, [
                    'cmd' => 'sureAddUser',
                    'from' => [
                        'name' => $this->_user['name'],
                        'mobile' => $this->_user['mobile'],
                        'uid' => $this->_uid
                    ]
                ]);
            }
            return [200, true];
        }
        return [501, '添加失败'];
    }

    /**
     * @method get
     */
    public function addUserLogApi()
    {
        return [200, $this->_friendM->addUserLogs($this->_uid)];
    }

    /**
     * @method get
     */
    public function friendListApi()
    {
        return [200, $this->_friendM->friendList($this->_uid)];
    }


}
