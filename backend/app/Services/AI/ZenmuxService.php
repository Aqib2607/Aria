<?php

namespace App\Services\AI;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Exception;

class ZenmuxService implements AiProviderInterface
{
    protected string $apiKey;
    protected string $baseUrl = 'https://api.zenmux.ai/v1/chat/completions';
    protected string $model = 'gpt-4o-mini'; // Zenmux supports standard OpenAI model names typically

    public function __construct()
    {
        $this->apiKey = env('ZENMUX_API_KEY', '');
    }

    public function generateContent(string $prompt, ?string $userApiKey = null): ?array
    {
        $key = $userApiKey ?: $this->apiKey;

        if (empty($key)) {
            Log::error('Zenmux API key is not configured.');
            throw new Exception('AI service is currently unavailable. Please add your Zenmux API key in the API Keys settings page.');
        }

        $payload = [
            'model' => $this->model,
            'messages' => [
                ['role' => 'user', 'content' => $prompt]
            ],
            'temperature' => 0.7,
            'response_format' => ['type' => 'json_object'],
        ];

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $key,
            ])->timeout(45)->withoutVerifying()->post($this->baseUrl, $payload);

            if ($response->successful()) {
                $data = $response->json();
                $textResponse = $data['choices'][0]['message']['content'] ?? null;

                if ($textResponse) {
                    return json_decode($textResponse, true);
                }
            } else {
                $errorData = $response->json();
                $errorMessage = $errorData['error']['message'] ?? 'Unknown Zenmux API Error';
                Log::error('Zenmux API Error', [
                    'status' => $response->status(),
                    'body'   => $response->body()
                ]);
                throw new Exception($errorMessage);
            }
        } catch (Exception $e) {
            Log::error('Zenmux API Exception', ['message' => $e->getMessage()]);
            throw $e;
        }

        throw new Exception("Failed to parse response from Zenmux.");
    }
}
