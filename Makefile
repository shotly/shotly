.PHONY: help
help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: lint-makefile
lint-makefile: ## Lint the Makefile
	perl -pi -e 's/^  */\t/' Makefile

.PHONY: spec-generate-web
spec-generate-web: ## Generate the web API spec
	pnpm spec-builder generate \
		--name api \
		--spec ./specs/web.yml \
		--output ./apps/web \
		--zod && \
	pnpm run lint:fix
