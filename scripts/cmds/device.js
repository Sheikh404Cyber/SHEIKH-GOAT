const axios = require('axios');

module.exports = {
  config: {
    name: "device",
    aliases: ["device, android"],
    version: "1.0",
    author: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
    countDown: 5,
    role: 0,
    shortDescription: { 
      en: "get device data"
    },
    longDescription: { 
      en: "Get Device info by the command"
      },
    category: "👥 | Member",
    guide: "{p}{n} {<device_name>}"
  },

onStart: async function ({ message, args }) {
    const name = args.join(" ");
    if (!name)
      return message.reply(`⚠️ | Please enter device name!`);
    else {
      try {
        const res = await axios(`https://anbusec.xyz/api/tools/device?apikey=jmBOjQSgq5mK8GScw9AB&search=${encodeURIComponent(name)}`
    );
  const result = res.data.data;
  const body = result.body;
  const display = result.display; 
        const connectivity = result.connectivity;
        const platform = result.platform;
        const memory = result.memory;
        const camera = result.camera;
        
  let nam = result.deviceinfo.name || "No data!";
  let brand = result.deviceinfo.brand || "No data!";
  let model = result.deviceinfo.model || "No data!";
  let price = result.deviceinfo.price || "No data!";
  let ctgry = result.deviceinfo.category || "No data!";

  let ntr = result.network.networktype || "No data!";
  let ntr2 = result.network.network2g || "No data!";
  let ntr3 = result.network.network3g || "No data!";
  let ntr4 = result.network.network4g || "No data!";
  let speed = result.network.speed || "No data!";
  let gprs = result.network.gprs || "No data!";
  let edge = result.network.edge || "No data!";

  let lunched = result.launch.launchdate || "No data!";
  let launchannouncement = result.launch.launchannouncement || "No data!";

  let bodyd = body.bodydimensions || "No data!";
  let bodyw = body.bodyweight || "No data!";
  let ntrs = body.networksim || "No data!";

  let dsp = display.displaytype || "No data!";
  let dsps = display.displaysize || "No data!";
  let dspr = display.displayresolution || "No data!";
  let dspm = display.displaymultitouch || "No data!";
  let dspd = display.displaydensity || "No data!";
  let dspp = display.displayscreenprotection || "No data!";

        let opsys = platform.operatingsystem || "No data!";
        let osv = platform.osversion || "No data!";
        let oem = platform.userinterfaceui || "No data!";
        let chip = platform.chipset || "No data!";
        let cpu = platform.cpu || "No data!";
        let gpu = platform.gpu || "No data!";
        
        let internal = memory.memoryinternal || "No data!";
        let external = memory.memoryexternal || "No data!";
        let ram = memory.ram || "No data!";
        
        let camp = camera.primarycamera || "No data!";
        let cams = camera.secondarycamera || "No data!";
        let camf = camera.camerafeatures || "No data!";
        let vdo = camera.video || "No data!";
        let aud = result.sound.audio || "No data!";
        let lspkr = result.sound.loudspeaker || "No data!";
        let jack = result.sound.mmjack || "Error!";
        let wifi = connectivity.wifi || "No data!";
        let bt = connectivity.bluetooth || "No data!";
        let nfc = connectivity.nfc || "No data!";
        let infrared = connectivity.infrared || "No data!";
        let usb = connectivity.usb || "No data!";
        let gps = connectivity.gps || "No data!";
        let fm = connectivity.fmradio || "No data!";
  let sensor = result.features.sensors || "No data!";
  let msg = result.features.messaging || "No data!";

  let btryt = result.battery.batterytype || "No data!";
  let btryc = result.battery.batterycapacity || "No data!";
  let crg = result.battery.charging || "No data!";
  let color = result.more.bodycolor || "No data!";
    let img = res.data.image

             const form = {
        body: `╭「Device Specifications」`
            + `\n│`
          + `\n❏ Brand: ${brand}`
          + `\n❏ Model: ${model}`
          + `\n❏ Price: ${price}`
          + `\n❏ Category: ${ctgry}`
          + `\n❏ Released: ${lunched}`
          + `\n❏ Body Color: ${color}`
          + `\n╰—————————`

          + `\n\n╭「Network」`
          + `\n❏ Network Type: ${ntr}`
          + `\n❏ 2G: ${ntr2}`
          + `\n❏ 3G: ${ntr3}`
          + `\n❏ 4G: ${ntr4}`
          + `\n❏ Speed: ${speed}`
          + `\n❏ GPRS: ${gprs}`
          + `\n❏ EDGE: ${edge}`
          + `\n╰—————————`

          + `\n\n╭「Body」`
          + `\n❏ Body Dimensions: ${bodyd}`
          + `\n❏ Weight: ${bodyw}`
          + `\n❏ Network Sim: ${ntrs}`
          + `\n╰—————————`

          + `\n\n╭「Display」`
          + `\n❏ Display Type: ${dsp}`
          + `\n❏ Size: ${dsps}`
          + `\n❏ Resolution: ${dspr}`
          + `\n❏ Multitouch: ${dspm}`
          + `\n❏ Density: ${dspd}`
          + `\n❏ Protection: ${dspp}`
          + `\n╰—————————`

          + `\n\n╭「Platform」`
          + `\n❏ OS system: ${opsys}`
          + `\n❏ Version: ${osv}`
          + `\n❏ User Interface: ${oem}`
            + `\n❏ Chipset: ${chip}`
          + `\n❏ Cpu: ${cpu}`
          + `\n❏ Gpu: ${gpu}`
          + `\n╰—————————`

          + `\n\n╭「Memory」`
          + `\n❏ Internal: ${internal}`
          + `\n❏ External: ${external}`
          + `\n❏ RAM: ${ram}`
          + `\n╰—————————`

          + `\n\n╭「Camera」`
          + `\n❏ Primary Camera: ${camp}`
          + `\n❏ Secondary Camera: ${cams}`
          + `\n❏ Camera Features: ${camf}`
          + `\n╰—————————`

          + `\n\n╭「Sound」`
          + `\n❏ Audio: ${aud}`
          + `\n❏ Loudspeaker: ${lspkr}`
          + `\n❏ 3.5mm Jack: ${jack}`
          + `\n╰—————————`

          + `\n\n╭「Connectivity」`
          + `\n❏ Wifi: ${wifi}`
          + `\n❏ Bluetooth: ${bt}`
          + `\n❏ NFC: ${nfc}`
          + `\n❏ Infrared: ${infrared}`
          + `\n❏ USB: ${usb}`
          + `\n❏ GPS: ${gps}`
          + `\n╰—————————`

          + `\n\n╭「Features」`
          + `\n❏ FM: ${fm}`
          + `\n❏ Sensos: ${sensor}`
          + `\n❏ Message: ${msg}`
          + `\n╰—————————`

          + `\n\n╭「Battery」`
          + `\n❏ Battery Type: ${btryt}`
          + `\n❏ Battery Capacity: ${btryc}`
          + `\n❏ Cherging: ${crg}`
          + `\n╰—————————`

      };
        if (img)
      form.attachment = await global.utils.getStreamFromURL(img);
      message.reply(form);
      }catch(e){message.reply(`𝐀𝐒𝐈𝐅 𝐱𝟔𝟗 || 404, 🥺 Not Found Device Data`)}

    }
  }
};
