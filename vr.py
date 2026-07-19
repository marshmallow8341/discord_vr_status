import discord
from discord.gateway import DiscordWebSocket

original_send_as_json = DiscordWebSocket.send_as_json

async def patched_send_as_json(self, data):
    if data.get('op') == 2:
        data['d']['properties']['$os'] = 'android'
        data['d']['properties']['$browser'] = 'Discord VR'
        data['d']['properties']['$device'] = 'device'
    await original_send_as_json(self, data)

DiscordWebSocket.send_as_json = patched_send_as_json

intents = discord.Intents(guilds=True)
client = discord.Client(intents=intents)

@client.event
async def on_ready():
    print(f'起動: {client.user}')

client.run('Token')
