FROM mcr.microsoft.com/playwright:v1.46.1-jammy

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY playwright.config.ts ./
COPY tests/ ./tests/
COPY utils/ ./utils/
COPY pages/ ./pages/

RUN mkdir -p test-results playwright-report

CMD ["npm", "test"]