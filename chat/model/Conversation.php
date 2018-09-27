<?php
/**
 * Created by PhpStorm.
 * User: rxw
 * Date: 2017/9/5
 * Time: 21:05
 */
namespace chat\model;

use framework\base\Model;

class Conversation extends Model
{
    public function save($sendUid, $recvUid, $text)
    {
        $result = $this->db()->insert('conversation', ['s_id' => $sendUid, 'r_id' => $recvUid, 'content' => $text, 'timestamp' => time()]);
        return $result->rowCount() ? true : false;
    }
} 