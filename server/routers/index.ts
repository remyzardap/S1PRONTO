/**
 * Combined tRPC App Router
 * Merges all feature routers into a single appRouter
 */
import { router } from '../_core/trpc';
import { agentsRouter } from './agents';
import { auditRouter } from './audit';
import { betaInvitesRouter } from './betaInvites';
import { blocksRouter } from './blocks';
import { businessesRouter } from './businesses';
import { fileSharingRouter } from './file-sharing';
import { googleRouter } from './google';
import { healthRouter } from './health';
import { imageGenRouter } from './imageGen';
import { kpisRouter } from './kpis';
import { openclawRouter } from './openclawRouter';
import { paymentsRouter } from './payments';
import { procurementRouter } from './procurement';
import { receiptsRouter } from './receipts';
import { reportsRouter } from './reports';
import { tasksRouter } from './tasks';
import { telegramRouter } from './telegramRouter';
import { whatsappRouter } from './whatsapp';
import { systemRouter } from '../_core/systemRouter';

export const appRouter = router({
  system: systemRouter,
  agents: agentsRouter,
  audit: auditRouter,
  betaInvites: betaInvitesRouter,
  blocks: blocksRouter,
  businesses: businessesRouter,
  fileSharing: fileSharingRouter,
  google: googleRouter,
  health: healthRouter,
  imageGen: imageGenRouter,
  kpis: kpisRouter,
  openclaw: openclawRouter,
  payments: paymentsRouter,
  procurement: procurementRouter,
  receipts: receiptsRouter,
  reports: reportsRouter,
  tasks: tasksRouter,
  telegram: telegramRouter,
  whatsapp: whatsappRouter,
});

export type AppRouter = typeof appRouter;
