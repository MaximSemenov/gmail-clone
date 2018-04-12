<?php 

require './MailQueryBuilder.class.php';

class MailDataBase extends QueryBuilder
{
    private function connectToDataBase()
    {
        return new PDO('mysql:host=127.0.0.1:3306;dbname=mydb', "root", "!!!YOURPASSWORD!!!");
    }

    public function __construct()
    {

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


}