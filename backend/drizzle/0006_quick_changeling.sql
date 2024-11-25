ALTER TABLE "order_products" ALTER COLUMN "quantity" SET DEFAULT 1;--> statement-breakpoint
ALTER TABLE "order_products" DROP COLUMN IF EXISTS "price";