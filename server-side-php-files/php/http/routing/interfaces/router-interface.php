
<?php 


interface Router
{

    public function resolve(Request $request) : ?Route;


}


