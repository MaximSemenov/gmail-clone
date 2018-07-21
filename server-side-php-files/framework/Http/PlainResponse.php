<?php
declare(strict_types = 1);

namespace Framework\Http;

class PlainResponse implements Response
{
    /**
     * @var string
     */
    private $content;

    /**
     * @var int
     */
    private $status;

    /**
     * @var array
     */
    private $headers;

    public function __construct(string $content = '', int $status = Response::STATUS_OK, array $headers = [])
    {
        $this->content = $content;
        $this->status = $status;
        $this->headers = $headers;
    }

    public function send(): void
    {
        $this->sendHeaders();
        $this->sendContent();

        if (function_exists('fastcgi_finish_request')) {
            fastcgi_finish_request();
        }
    }

    private function sendHeaders(): void
    {
        $this->headers[] = "HTTP/1.1 {$this->status}";

        foreach ($this->headers as $header) {
            header($header);
        }
    }

    private function sendContent()
    {
        echo $this->content;
    }
}
