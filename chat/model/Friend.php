<?php
/**
 * Created by PhpStorm.
 * User: rxw
 * Date: 2017/9/5
 * Time: 21:05
 */
namespace chat\model;

use framework\base\Model;

class Friend extends Model
{
    public function list($uid)
    {
        return $this->db()->select('friends', ['[><]user' => ['f_id' => 'union_id']], ['name', 'mobile', 'friends.f_id(union_id)'], ['s_id' => $uid]);
    }

    public function findUserByMobile($uid, $mobile) 
    {
        $result = $this->db()->get('friends', ['[><]user' => ['f_id' => 'union_id']], ['name', 'mobile', 'friends.f_id(union_id)'], ['s_id' => $uid, 'mobile' => $mobile]);
        if ($result) {
            $result['is_friend'] = true;
            return $result;
        }
        $result = $this->db()->get('user', ['name', 'mobile', 'union_id'], ['mobile' => $mobile]);
        if ($result) {
            return $result;
        } else {
            return false;
        }
    }

    public function add($sendUid, $recvUid)
    {
        $isSend = $this->db()->get('user_add_log', 'id', ['s_id' => $sendUid, 'r_id' => $recvUid]);
        if ($isSend) {
            return HAS_SEND_ADD_REQUEST;
        }
        $result = $this->db()->insert('user_add_log',['s_id' => $sendUid, 'r_id' => $recvUid, 'status' => 1, 'timestamp' => time()]);
        return $result->rowCount() == 1 ? true : false;
    }

    public function sureAdd($sendUid, $recvUid)
    {
        $this->db()->action(function() use (&$sendUid, $recvUid) {
            $result = $this->db()->update('user_add_log', ['status' => 2], ['s_id' => $recvUid, 'r_id' => $sendUid, 'status' => 1]);
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
        $result['add'] = $this->db()->select('user_add_log', ['[><]user' => ['r_id' => 'union_id'], ['name', 'mobile', 'r_id(union_id)', 'user_add_log.status']], ['s_id' => $uid]);
        $result['request'] = $this->db()->select('user_add_log', ['[><]user' => ['r_id' => 'union_id'], ['name', 'mobile', 'r_id(union_id)', 'user_add_log.status']], ['f_id' => $uid]);
        return $result;
    }
}