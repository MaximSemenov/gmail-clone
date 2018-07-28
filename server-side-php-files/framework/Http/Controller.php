<?php

namespace Framework\Http;

class Controller
{
    function jsonResult($data): string
    {
        return  json_encode($data);
    }

    public function callAction(string $action, array $parameter): Response
    {
        // TODO: Implement callAction() method.
    }
}