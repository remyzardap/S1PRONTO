/**
 * Google Secret Manager Integration
 * Loads secrets from GCP Secret Manager at startup
 * 
 * Set SKIP_SECRET_MANAGER=true to use local .env instead
 */

export async function loadSecretsFromSecretManager() {
  if (process.env.SKIP_SECRET_MANAGER === 'true') {
    console.log('[SecretManager] Skipped — using local environment variables');
    return;
  }

  try {
    const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    if (!credentialsPath) {
      console.log('[SecretManager] No GOOGLE_APPLICATION_CREDENTIALS set, skipping');
      return;
    }

    const projectId = process.env.VERTEX_PROJECT_ID || process.env.VERTEX_PROJECT;
    if (!projectId) {
      console.log('[SecretManager] No project ID configured, skipping');
      return;
    }

    // Dynamic import to avoid hard dependency on GCP SDK
    const { SecretManagerServiceClient } = await import('@google-cloud/secret-manager').catch(() => {
      console.log('[SecretManager] @google-cloud/secret-manager not installed, skipping');
      return { SecretManagerServiceClient: null };
    });

    if (!SecretManagerServiceClient) return;

    const client = new SecretManagerServiceClient();
    
    // List of secrets to load
    const secretNames = [
      'ANTHROPIC_API_KEY',
      'KIMI_API_KEY', 
      'GEMINI_API_KEY',
      'SONAR_API_KEY',
      'OPENAI_API_KEY',
      'ELEVEN_LABS_API_KEY',
      'STRIPE_SECRET_KEY',
      'JWT_SECRET',
      'SESSION_SECRET',
      'DATABASE_URL',
    ];

    for (const name of secretNames) {
      // Skip if already set in environment
      if (process.env[name]) continue;

      try {
        const [version] = await client.accessSecretVersion({
          name: `projects/${projectId}/secrets/${name}/versions/latest`,
        });
        const payload = version.payload?.data?.toString();
        if (payload) {
          process.env[name] = payload;
        }
      } catch {
        // Secret doesn't exist in Secret Manager, skip
      }
    }

    console.log('[SecretManager] Secrets loaded from Google Cloud');
  } catch (error) {
    console.warn('[SecretManager] Failed to load secrets:', error);
    console.log('[SecretManager] Falling back to local environment variables');
  }
}
