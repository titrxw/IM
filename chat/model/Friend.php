<?php
/**
 * Created by PhpStorm.
 * User: rxw
 * Date: 2017/9/5
 * Time: 21:05
 */
namespace chat\model;

use framework\base\Model;

class User extends Model
{
    public function list($uid)
    {
        return $this->db()->select('friends', ['[><]user' => ['f_id' => 'uid']], ['name', 'mobile', 'friends.f_id(uid)'], ['s_id' => $uid]);
    }

    public function findUserByMobile($uid, $mobile) 
    {
        $result = $this->db()->get('friends', ['[><]user' => ['f_id' => 'uid']], ['name', 'mobile', 'friends.f_id(uid)'], ['s_id' => $uid, 'mobile' => $mobile]);
        if ($result) {
            $result['is_friend'] = true;
            return $result;
        }
        $result = $this->db()->get('user', ['name', 'mobile', 'uid'], ['mobile' => $mobile]);
        if ($result) {
            return $result;
        } else {
            return [];
        }
    }

    public function add($sendUid, $recvUid)
    {
        $isSend = $this->db()->get('user_add_log', 'id', ['send_uid' => $sendUid, 'recv_uid' => $recvUid]);
        if ($isSend) {
            return HAS_SEND_ADD_REQUEST;
        }
        $result = $this->db()->insert('user_add_log',['send_uid' => $sendUid, 'recv_uid' => $recvUid, 'status' => 1]);
        return $result->rowCount() == 1 ? true : false;
    }

    public function sureAdd($sendUid, $recvUid)
    {
        $this->db()->action(function() use (&$sendUid, $recvUid) {
            $result = $this->db()->update('user_add_log', ['status' => 2], ['send_uid' => $recvUid, 'recv_uid' => $sendUid, 'status' => 1]);
            if (!$result->rowCount()) {
                $sendUid = false;
                return false;
            }
            $result = $this->db()->insert('friends', ['s_id' => $recvUid, 'f_id' => $sendUid, 'timestamp' => time()]);
            if (!$result->rowCount()) {
                $sendUid = false;
                return false;
            }
            $result = $this->db()->insert('friends', ['s_id' => $sendUid, 'f_id' => $recvUid, 'timestamp' => time()]);
            if (!$result->rowCount()) {
                $sendUid = false;
                return false;
            }
        });
        
        return $sendUid ? true : false;
    }

    public function addLogs($uid)
    {
        $result = $this->db()->select('user_add_log', ['[><]user' => ['recv_uid' => 'uid'], ['name', 'mobile', 'recv_uid(uid)']], ['send_uid' => $uid]);
        return $result ? $result : [];
    }
}