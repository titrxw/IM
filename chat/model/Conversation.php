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
    protected $_pageSize = 10;

    public function save($sendUid, $recvUid, $text)
    {
        $roomId = $sendUid > $recvUid ? hash33($recvUid.$sendUid) : hash33($sendUid.$recvUid); 
        $result = $this->db()->insert('conversation', ['room_id' => $roomId, 's_id' => $sendUid, 'r_id' => $recvUid, 'content' => $text, 'type' => 'text', 'timestamp' => time()]);
        return $result->rowCount() ? true : false;
    }

    public function list($sendUid, $recvUid, $page)
    {
        $roomId = $sendUid > $recvUid ? hash33($recvUid.$sendUid) : hash33($sendUid.$recvUid); 
        $result =$this->db()->select('conversation',['s_id','content','type'], ['room_id' => $roomId,'LIMIT' => [($page - 1) * $this->_pageSize, $this->_pageSize], 'ORDER' => ['id' => 'ASC','timestamp' => 'DESC']]);
        // data.isMy = true;
    //   data.sendStatus = "success";
        
        foreach ($result as &$value) {
            # code...
            $value['isMy'] = false;
            $value['sendStatus'] = "success";
            if ($value['s_id'] == $sendUid) {
                $value['isMy'] = true;
            }
        }

        return $result;
    }
} 