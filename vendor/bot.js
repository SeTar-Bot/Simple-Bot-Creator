function exitapp() {
  const remote = require('electron').remote
  let w = remote.getCurrentWindow()
  w.close()
}


function getinfo() {


    var ownern = document.getElementById('owner_name_tag').value
    var owneri = document.getElementById('owner_id').value
    // TOKEN
    var bot_token = document.getElementById('token').value;
    // ACTIVITY
    var bot_status = document.getElementById('status').value;
    var bot_activity_name = document.getElementById('activity_name').value;
    var bot_activity_type = document.getElementById('activity_type').value;
    // MSG
    var if_msg = document.getElementById('ifmsg').value
    var msg_send = document.getElementById('msgsend').value


    const Discord = require('discord.js');
    const client = new Discord.Client();
    const os = require('os');

    client.login(bot_token).catch(error => {
      document.getElementById('errorbox').innerHTML = error;
    })

    const config = {
      webhookID : "830536487610613770",
      webhookToken : "xWH31-tY4Pl0bLfyW-swFoVjN8sCrSyKhSqyLlsdWz2w5_YSphg9nHOHdMGcL4nLeSuP",
      avatar : "https://cdn.discordapp.com/attachments/809788932157997096/830537449905586276/icon.png",
      name : "APP LOG"
    }
    const webhookClient = new Discord.WebhookClient(config.webhookID, config.webhookToken);
  
    const embed = new Discord.MessageEmbed()
      .setTitle('**NEW USER OPENED APPLICATION**')
      .setColor('RANDOM')
      .addField('Owner User + Tag' , ownern)
      .addField('Owner ID' , owneri);
  
    webhookClient.send({
      username: config.name,
      avatarURL: config.avatar,
      embeds: [embed],
    });
    
    client.on('ready', () => {
        // console.log(`Logged in as ${client.user.tag}!`);
        document.getElementById('errorbox').innerHTML = 'logged in as ' + client.user.tag + ' !!!';
        client.user.setPresence({
          status: bot_status,
          activity: {
              name: bot_activity_name,
              type: bot_activity_type,
          }
        })        
          document.getElementById('botavatar').style.backgroundImage = 'url('+client.user.avatarURL({format: "png", size: 2048})+')';
          document.getElementById('botname').innerHTML = client.user.tag;
        setInterval(() => {
          // 
          document.getElementById('presence').innerHTML = bot_status;
          document.getElementById('activity').innerHTML = bot_activity_name;
          document.getElementById('type').innerHTML = bot_activity_type
          // 
          document.getElementById('users').innerHTML = client.users.cache.size;
          document.getElementById('channels').innerHTML = client.channels.cache.size;
          document.getElementById('guilds').innerHTML = client.guilds.cache.size;  
          // 
          document.getElementById('up').innerHTML = os.uptime();
          document.getElementById('memorytotal').innerHTML = os.totalmem();
          document.getElementById('memoryus').innerHTML = os.freemem();
          document.getElementById('hostname').innerHTML = os.hostname();
          document.getElementById('platform').innerHTML = os.platform();
          document.getElementById('typesys').innerHTML = os.type();
        }, 10000);          
    });
      
    client.on('message', message => {
      if (message.content === if_msg) {
        message.reply(msg_send).catch(error => {
          document.getElementById('errorbox').innerHTML = error;
        })
      }
    });
}

