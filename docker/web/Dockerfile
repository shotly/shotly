ARG NODE=node:22.21.1-alpine

FROM $NODE AS builder

WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV COREPACK_DEFAULT_TO_LATEST=0
ENV COREPACK_INTEGRITY_KEYS=0

COPY ./apps/web ./apps/web
COPY ./packages ./packages
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml .npmrc ./

RUN corepack enable
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN --mount=type=secret,id=NUXT_UI_PRO_LICENSE \
    sh -c 'echo "NUXT_UI_PRO_LICENSE=$(cat /run/secrets/NUXT_UI_PRO_LICENSE)" > ./apps/web/.env'
RUN pnpm build:web

FROM $NODE

WORKDIR /app

ARG APP_PUBLIC_VERSION=unknown
ENV APP_PUBLIC_VERSION=$APP_PUBLIC_VERSION

RUN apk add --no-cache curl

COPY --from=builder /app/apps/web/.output .

EXPOSE 3000/tcp
HEALTHCHECK CMD curl --fail http://localhost:3000/api/healthcheck || exit 1
CMD ["/app/server/index.mjs"]
