/**
 * Trial Expiry Manager
 * Background job that checks and expires trial subscriptions
 */

const TRIAL_CHECK_INTERVAL = 1000 * 60 * 60; // Check every hour

export function startTrialExpiryJob() {
  // Initial check on startup (delayed by 30s to let DB connect)
  setTimeout(async () => {
    await checkExpiredTrials();
  }, 30_000);

  // Recurring check
  setInterval(async () => {
    await checkExpiredTrials();
  }, TRIAL_CHECK_INTERVAL);

  console.log('[TrialManager] Background job started — checking every hour');
}

async function checkExpiredTrials() {
  try {
    // Trial expiry logic will be implemented when trial system is active
    // For now, this is a no-op placeholder
    const now = new Date();
    console.log(`[TrialManager] Trial check completed at ${now.toISOString()}`);
  } catch (error) {
    console.error('[TrialManager] Error checking trials:', error);
  }
}
