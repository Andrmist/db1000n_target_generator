require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
// eslint-disable-next-line no-undef
const ENV = process.env;

const { writeFile } = require('fs/promises');
const { Client, Intents } = require('discord.js');
const { default: axios } = require('axios');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  partials: ['CHANNEL']
});

client.once('ready', () => {
  console.log(`Ready to work for ${client.user.tag}`);
});

client.on('messageCreate', async message => {
  console.log(message.channel.id);
  if (message.channel.id === ENV.DISCORD_CHANNEL_ID && message.author.id !== client.id) {
    let res = { jobs: [] };
    const { content } = message;
    const jobs = content.split('\n');
    console.log(jobs);
    for (const job of jobs) {
      const args = job.split(' ').filter(i => i);
      if (args.length === 0) continue;
      const method = args[0].toLowerCase();
      switch (method) {
        case 'http':
          res.jobs.push({
            type: method,
            args: {
              method: 'GET',
              path: `http://${args[1]}`,
              interval_ms: 1
            }
          });
          break;
        case 'https':
          res.jobs.push({
            type: method,
            args: {
              method: 'GET',
              path: `https://${args[1]}`,
              interval_ms: 1
            }
          });
          break;
        case 'tcp':
          res.jobs.push({
            type: method,
            args: {
              address: args[1],
              body: uuidv4(),
              interval_ms: 135
            }
          });
          break;
        case 'udp':
          res.jobs.push({
            type: method,
            args: {
              address: args[1],
              body: uuidv4(),
              interval_ms: 135
            }
          });
          break;
        default:
          continue;
      }
      const [host, port] = args[1].split(':');
      if (ENV.POST_TO_URL === 1) await axios.post(`${ENV.POST_URL}`, [{ method, host, port }]);
    }
    if (res.jobs.length === 0) message.react('❌');
    else {
      await writeFile('config.json', JSON.stringify(res, null, 2));
      message.react('✅');
    }
  }
});

client.login(ENV.TOKEN);
