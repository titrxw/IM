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
    public function register($name, $mobile, $password) 
    {
        $userInfo = $this->db()->get('user', 'id', [
            'mobile' => $mobile,
        ]);
        if ($userInfo) {
            return false;
        }

        $password = $this->password->setPassword($password)->MakeHashStr();
        $salt = $this->password->GetHashSalt();

        $user = [
            'union_id' => 'u_' . \uniqueId(),
            'name' => $name,
            'mobile' => $mobile,
            'password' => $password,
            'salt' => $salt,
            'timestamp' => time()
        ];

        $result = $this->db()->insert('user', $user);

        if ($result && $result->rowCount()) {
            unset($user['password'], $user['salt']);
            return $user;
        }

        return false;
    }

    public function login($mobile, $password)
    {
        $userInfo = $this->db()->get('user', ['union_id', 'mobile', 'password','salt', 'name', 'head_pic'], [
            'mobile' => $mobile,
        ]);
        if (!$userInfo) {
            return false;
        }

        $result = $this->password->setPassword($password)
        ->setSalt($userInfo['salt'])
        ->setHash($userInfo['password'])
        ->validate();

        if (!$result) {
            return false;
        }

        unset($userInfo['password'], $userInfo['salt']);
        return $userInfo;
    }
}