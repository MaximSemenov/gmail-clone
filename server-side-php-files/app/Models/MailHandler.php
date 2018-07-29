<?php
declare(strict_types=1);

namespace App\Models;

use App\Controllers\MailDataBaseController;
use Framework\Http\Request;

class MailHandler
{
    private $mailDataBase;
    private $labelId = [
        'inbox' => 1,
        'trash' => 2,
        'spam' => 3,
        'social' => 4,
        'promotion' => 5,
        'forum' => 6,
        'update' => 7
    ];

    public function __construct(MailDataBaseController $mailDataBase)
    {
        $this->mailDataBase = $mailDataBase;
    }

    public function loadMail(Request $request): array
    {
        $box = $request->getParameter('box');
        return $this->mailDataBase->getMail($this->labelId[$box]);
    }
}