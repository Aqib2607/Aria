<?php

namespace App\Http\Controllers;

use App\Models\UserApiKey;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class UserApiKeyController extends Controller
{
    /**
     * GET /api/api-keys
     * Return the authenticated user's API keys (masked).
     */
    public function index(Request $request): JsonResponse
    {
        $keys = UserApiKey::where('user_id', $request->user()->id)->get();

        $masked = $keys->map(function (UserApiKey $key) {
            $raw     = $key->api_key; // decrypted by cast
            $visible = strlen($raw) > 8
                ? substr($raw, 0, 6) . str_repeat('•', max(0, strlen($raw) - 10)) . substr($raw, -4)
                : str_repeat('•', strlen($raw));

            return [
                'id'         => $key->id,
                'provider'   => $key->provider,
                'key_masked' => $visible,
                'is_active'  => $key->is_active,
                'updated_at' => $key->updated_at,
            ];
        });

        return response()->json(['data' => $masked]);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'provider' => 'required|string|in:gemini,openai,anthropic,groq,zenmux',
            'api_key'  => 'required|string|min:10',
        ]);

        // Deactivate all other keys for this user
        UserApiKey::where('user_id', $request->user()->id)
            ->where('provider', '!=', $request->provider)
            ->update(['is_active' => false]);

        $record = UserApiKey::updateOrCreate(
            ['user_id' => $request->user()->id, 'provider' => $request->provider],
            ['api_key' => $request->api_key, 'is_active' => true]
        );

        return response()->json([
            'message' => 'API key saved successfully and set as active.',
            'data'    => ['id' => $record->id, 'provider' => $record->provider, 'is_active' => $record->is_active],
        ]);
    }

    /**
     * DELETE /api/api-keys/{provider}
     * Revoke (delete) a user's API key by provider slug.
     */
    public function destroy(Request $request, string $provider): JsonResponse
    {
        $deleted = UserApiKey::where('user_id', $request->user()->id)
            ->where('provider', $provider)
            ->delete();

        if (!$deleted) {
            return response()->json(['message' => 'API key not found.'], 404);
        }

        return response()->json(['message' => 'API key revoked successfully.']);
    }

    /**
     * POST /api/api-keys/{provider}/active
     * Set a specific provider as active and deactivate all others.
     */
    public function setActive(Request $request, string $provider): JsonResponse
    {
        $key = UserApiKey::where('user_id', $request->user()->id)
            ->where('provider', $provider)
            ->first();

        if (!$key) {
            return response()->json(['message' => 'API key not found.'], 404);
        }

        // Deactivate all others
        UserApiKey::where('user_id', $request->user()->id)
            ->update(['is_active' => false]);

        // Activate the selected one
        $key->update(['is_active' => true]);

        return response()->json(['message' => ucfirst($provider) . ' set as active provider.']);
    }
}
