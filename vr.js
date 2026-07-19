const { Client, GatewayIntentBits, SimpleShardingStrategy } = require('discord.js');

const client = new Client({
   intents: [
      GatewayIntentBits.Guilds
   ],
   ws: {
      buildStrategy: (manager) =>
         new (class MobileSimpleShardingStrategy extends SimpleShardingStrategy {
            constructor(manager) {
               manager.options.identifyProperties = {
                  os: 'android',
                  device: 'device',
                  browser: 'Discord VR'
               };
               super(manager);
            }
         })(manager)
   }
});

client.on('ready', () => {
    console.log(`起動: ${client.user.tag}`);
});

client.login('Token');
