<?php

namespace App\Services\AI;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Exception;

class GeminiService
{
    protected string $apiKey;
    protected string $baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/';
    protected string $model = 'gemini-2.5-flash';

    public function __construct()
    {
        $this->apiKey = env('GEMINI_API_KEY', '');
    }

    /**
     * Call the Gemini API with a given prompt.
     * 
     * @param string $prompt
     * @return array|null The parsed JSON response or null on failure.
     */
    public function generateContent(string $prompt): ?array
    {
        if (empty($this->apiKey)) {
            Log::error('Gemini API key is not configured.');
            throw new Exception('AI service is currently unavailable.');
        }

        $url = "{$this->baseUrl}{$this->model}:generateContent?key={$this->apiKey}";

        $payload = [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $prompt]
                    ]
                ]
            ],
            'generationConfig' => [
                'temperature' => 0.7,
                'responseMimeType' => 'application/json',
            ]
        ];

        try {
            $response = Http::timeout(30)->post($url, $payload);

            if ($response->successful()) {
                $data = $response->json();
                
                // Extract the generated text (which should be JSON due to responseMimeType)
                $textResponse = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;
                
                if ($textResponse) {
                    return json_decode($textResponse, true);
                }
            } else {
                Log::error('Gemini API Error', [
                    'status' => $response->status(),
                    'body' => $response->body()
                ]);
            }
        } catch (Exception $e) {
            Log::error('Gemini API Exception', ['message' => $e->getMessage()]);
        }

        return null;
    }
}
