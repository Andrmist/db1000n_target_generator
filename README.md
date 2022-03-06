# db1000n target generator

This app fetches targets for [db1000n](https://github.com/Arriven/db1000n) from discord channel, using this schema:

```
method ip:port
```

For example:

```
HTTP 127.0.0.1:80
TCP 127.0.0.1:22
```

## Install

For install better use pnpm as package manager

```bash
git clone https://github.com/Andrmist/db1000n_target_generator.git
cd db1000n_target_generator

pnpm install
# or install using npm (not tested)
npm install
```

## Usage

Start fetch tool:

```bash
npm run fetch
```

Serve config.json

```bash
npm run fetch
```

## Configuration

Create `.env` file:

```
TOKEN=<discord bot token for fetching>
DISCORD_CHANNEL_ID=<discord text channel with information>
```
