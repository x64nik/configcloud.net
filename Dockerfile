FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
COPY . .

ARG NEXT_PUBLIC_API_BASE_URL
RUN printf "NEXT_PUBLIC_API_BASE_URL=%s\n" "$NEXT_PUBLIC_API_BASE_URL" > .env
RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY package.json ./

EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "start"]
