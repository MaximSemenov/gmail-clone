<?php

declare(strict_types = 1);
namespace App\Controllers;
use PDO;

class MailDataBase extends QueryBuilder
{
    private function connectToDataBase()
    {
        return new PDO('mysql:host=127.0.0.1:3306;dbname=mydb', "root", "Magneto22&");
    }

    public function getMail($label)
    {
        $query = $this->getMailQuery($label);
        $connection = $this->connectToDataBase();
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $statment = $connection->prepare($query);
        $statment->bindValue(":box", $label);
        $statment->execute();
        return $statment->fetchAll(PDO::FETCH_ASSOC);

    }
    public function transferMail($to, $from, $stringOfIds)
    {

        $query = $this->getMailTransferQuery($stringOfIds);
        $connection = $this->connectToDataBase();
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $statment = $connection->prepare($query);
        $statment->bindValue(":to", $to);
        $statment->execute();
        return true;
    }

    public function getUnreadMail($boxId)
    {
         $query = $this->getUnreadQuery($label);
         $connection = $this->connectToDataBase();
         $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
         $statment = $connection->prepare($query);
        $statment->bindValue(":boxId", $boxId);
         $statment->execute();
        return $statment->fetchAll(PDO::FETCH_NUM);
    }
}
