DOCKER_IMAGE_PREFIX=ghcr.io/shotly

.PHONY: help
help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: lint-makefile
lint-makefile: ## Lint the Makefile
	perl -pi -e 's/^  */\t/' Makefile

.PHONY: build-web-image
build-web-image: ## Build the web image
	docker build \
		--build-arg APP_VERSION=local\
    --secret id=NUXT_UI_PRO_LICENSE,src=./docker/.secrets/NUXT_UI_PRO_LICENSE \
		-t ${DOCKER_IMAGE_PREFIX}/web:local \
		-f docker/web/Dockerfile .

.PHONY: spec-generate-web
spec-generate-web: ## Generate the web API spec
	pnpm spec-builder generate \
		--name api \
		--spec ./specs/web.yml \
		--output ./apps/web \
		--httpHandler defineHttpHandler \
		--zod && \
	pnpm run lint:fix
