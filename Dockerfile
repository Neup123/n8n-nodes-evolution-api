FROM node:22-alpine AS builder

WORKDIR /node-package
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts

COPY credentials ./credentials
COPY nodes ./nodes
COPY gulpfile.js tsconfig.json ./
RUN pnpm build && pnpm pack --pack-destination /package

FROM n8nio/n8n:latest

USER root
COPY --from=builder /package/*.tgz /tmp/n8n-nodes-evolution-api.tgz
RUN mkdir -p /opt/n8n-community-nodes \
    && cd /opt/n8n-community-nodes \
    && npm install /tmp/n8n-nodes-evolution-api.tgz --omit=dev --ignore-scripts \
    && rm /tmp/n8n-nodes-evolution-api.tgz \
    && chown -R node:node /opt/n8n-community-nodes

ENV N8N_CUSTOM_EXTENSIONS=/opt/n8n-community-nodes/node_modules/n8n-nodes-evolution-api-en/dist

USER node
