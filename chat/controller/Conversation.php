<?php
/**
 * Created by PhpStorm.
 * User: rxw
 * Date: 2017/8/27
 * Time: 20:58
 */
namespace chat\controller;
use chat\lib\User;

class Conversation extends User
{
    private $_covM;

    protected function afterInit()
    {
        $this->_covM = $this->model('Conversation');
    }

    /**
     * @method get
     * 
     * @rule uid|get|参数错误 require
     * @rule text|get|发送内容错误 require
     */
    public function textApi()
    {
        $uid = $this->request->get('uid');
        $text = $this->request->get('text');
        if ($uid == $this->_uid) {
            return [501, '发送失败'];
        }

        // $result = $this->_covM->save($this->_uid, $uid, $text);
        // if (!$result) {
        //   return [501, '发送失败'];
        // }

        $fd = $this->getFdByUid($uid);
        if ($fd) {
          $this->send($fd, [
              'type' => 'text',
              'from' => $this->getUser($this->_uid),
              'content' => $text
          ]);
        }

        return [200, true];
    }
}
