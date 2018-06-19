<?php

class Dependencies
{
    private $dependencies = ["Mail" => "MailDataBase"];

    public function __construct()
    {
     
    }

    public function getDependencies(string $dependency) : string
    {
        return $this->dependencies[$dependency];
    }
}


