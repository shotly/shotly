.PHONY: spec-generate-web
spec-generate-web:
	pnpm spec-builder generate \
		--name api \
		--spec ./specs/web.yml \
		--output ./apps/web \
		--zod && \
  pnpm run lint:fix
