<?php

namespace App\Services\AI;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Exception;

class AnthropicService implements AiProviderInterface
{
    protected string $apiKey;
    protected string $baseUrl = 'https://api.anthropic.com/v1/messages';
    protected string $model = 'claude-3-5-sonnet-20240620';

    public function __construct()
    {
        $this->apiKey = env('ANTHROPIC_API_KEY', '');
    }

    public function generateContent(string $prompt, ?string $userApiKey = null): ?array
    {
        $key = $userApiKey ?: $this->apiKey;

        if (empty($key)) {
            Log::error('Anthropic API key is not configured.');
            throw new Exception('AI service is currently unavailable. Please add your Anthropic API key in the API Keys settings page.');
        }

        $payload = [
            'model' => $this->model,
            'max_tokens' => 4000,
            'messages' => [
                ['role' => 'user', 'content' => $prompt]
            ],
            'temperature' => 0.7,
        ];

        try {
            $response = Http::withHeaders([
                'x-api-key' => $key,
                'anthropic-version' => '2023-06-01',
                'content-type' => 'application/json',
            ])->timeout(45)->withoutVerifying()->post($this->baseUrl, $payload);

            if ($response->successful()) {
                $data = $response->json();
                $textResponse = $data['content'][0]['text'] ?? null;

                if ($textResponse) {
                    // Sometimes Claude wraps JSON in markdown blocks
                    $textResponse = preg_replace('/```json\s*/', '', $textResponse);
                    $textResponse = preg_replace('/```\s*/', '', $textResponse);
                    return json_decode(trim($textResponse), true);
                }
            } else {
                $errorData = $response->json();
                $errorMessage = $errorData['error']['message'] ?? 'Unknown Anthropic API Error';
                Log::error('Anthropic API Error', [
                    'status' => $response->status(),
                    'body'   => $response->body()
                ]);
                throw new Exception($errorMessage);
            }
        } catch (Exception $e) {
            Log::error('Anthropic API Exception', ['message' => $e->getMessage()]);
            throw $e;
        }

        throw new Exception("Failed to parse response from Anthropic.");
    }
}
