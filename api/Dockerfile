# Installs Node.js image
FROM node:16-slim

# sets the working directory for any RUN, CMD, COPY command
# all files we put in the Docker container running the server will be in /usr/src/app (e.g. /usr/src/app/package.json)
WORKDIR /usr/src/app

# Copies package.json, package-lock.json, tsconfig.json, .env to the root of WORKDIR


COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./tsconfig.json ./

# Copies everything in the src directory to WORKDIR/src

# Installs all packages
RUN npm install



COPY . .

CMD ["npm", "run", "dev"]

