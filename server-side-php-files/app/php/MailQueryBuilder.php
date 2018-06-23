<?php 
namespace Mail;

class QueryBuilder
{

    public function getMailQuery()
    {
        return "SELECT
        t1.mail_id as id, 
        t1.mail_title as title, 
        t1.mail_body as body, 
        t1.mail_isRead as isRead, 
        t1.mail_isStarred as isStarred, 
        t1.mail_isImportant as isImportant, 
        DATE_FORMAT(t1.mail_date, '%b %d' ) as date,
        t2.sender_email as email,
        t2.sender_fullname as fullName
            FROM mail as t1
    INNER JOIN sender as t2 ON t2.sender_id  = t1.sender_id AND t1.box_id = :box";
    }

    public function getMailTransferQuery($stringOfIds)
    {
        return "UPDATE mail 
        SET box_id = :to 
        WHERE mail_id IN ($stringOfIds)";
    }

    public function getUnreadQuery($stringOfIds)
    {
        return "SELECT COUNT(mail_isRead) 
        FROM mail
        WHERE mail_isRead = 0 AND box_id = :boxId";
    }

}