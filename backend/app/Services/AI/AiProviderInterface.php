<?php

namespace App\Services\AI;

interface AiProviderInterface
{
    /**
     * Call the AI provider API with a given prompt.
     *
     * @param string $prompt
     * @param string|null $userApiKey Optional per-user key
     * @return array|null The parsed JSON response or null on failure.
     */
    public function generateContent(string $prompt, ?string $userApiKey = null): ?array;
}
