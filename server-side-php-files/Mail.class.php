<?php 

require './MailDataBase.class.php';

class Mail
{

    private $dataBase;
    private $labelId = array('inbox' => 1, 'trash' => 2, 'spam' => 3, 'social' => 4, 'promotion' => 5, 'forum' => 6, 'update' => 7);

    public function __construct($DataBase)
    {
        $this->dataBase = $DataBase;
    }

    public function getMail()
    {
        $box = $_GET['box'];
        $result = $this->dataBase->getMail($this->labelId[$box]);
        return json_encode($result);

    }

    public function getUnreadMail()
    {
        $boxes = $_GET['boxes'];
        $parsedJSON = json_decode($boxes);
     
        foreach($parsedJSON as $key => &$value) {
             $value = $this->dataBase->getUnreadMail($this->labelId[$key])[0][0]; // [0][0] should be changed
        }

        return json_encode($parsedJSON);
    }

    public function transferMail()
    {
        $from = $_GET['transferFrom'];
        $to = $_GET['transferTo'];
        $id = $_GET['id'];
        $stringOfIds = implode(",", $id);
        return $this->dataBase->transferMail($this->labelId[$to], $from, $stringOfIds);
    }


}