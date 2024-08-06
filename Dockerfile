# # Use an official Node.js runtime as a parent image
# FROM node:20-alpine

# # Install bash
# RUN apk add --no-cache bash postgresql-client

# # Create app directory and set working directory
# WORKDIR /usr/src/app

# # Install pnpm
# RUN npm install -g pnpm@9.1.1 typeorm ts-node

# # Copy package.json and pnpm-lock.yaml to install dependencies
# COPY package.json pnpm-lock.yaml ./

# # Install dependencies
# RUN pnpm install --frozen-lockfile

# # Copy the rest of the application code
# COPY . .

# # Build the application
# RUN pnpm run build

# # Make the entrypoint script executable
# COPY entrypoint.sh /usr/src/app/
# RUN chmod +x /usr/src/app/entrypoint.sh

# # Expose the application port
# EXPOSE 3001

# # Set the entrypoint
# ENTRYPOINT ["/usr/src/app/entrypoint.sh"]

# # Use the start script as the entry point
# CMD ["pnpm", "run", "start:prod"]