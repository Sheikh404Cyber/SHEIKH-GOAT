const axios = require("axios");
const {
  getStreamFromURL
} = global.utils;
module.exports = {
  'config': {
    'name': "bing2",
    'aliases': ["dalle2", "dalle3"],
    'version': '',
    'author': "RUBISH",
    'countDown': 0x3c,
    'role': 0x0,
    'longDescription': {
      'en': "Latest DALL·E 3 image generator"
    },
    'guide': {
      'en': "{pn} 'prompt' "
    },
    'category': 'AI'
  },
  'onStart': async function ({
    message: _0x4fd165,
    args: _0x150cc7
  }) {
    try {
      if (_0x150cc7.length === 0) {
        await _0x4fd165.reply("Please provide a prompt.");
        return;
      }
      const _0x398c74 = _0x150cc7.join(" ");
      const _0x29d214 = encodeURIComponent(_0x398c74);
      const _0x168b23 = "https://dalle-3-rubish.api-host.repl.co/api/gen-img-url?prompt=" + _0x29d214 + "&apikey=" + "rubish69";
      const _0x51997b = Date.now();
      const _0x146640 = await _0x4fd165.reply("\n  ⏳ | Processing your imagination\n  \n  Prompt: " + _0x398c74 + "\n  \n  Please wait a few seconds...");
      const _0x2ba5f2 = await axios.get(_0x168b23);
      const _0x5cfb8a = Date.now();
      const _0x2247b2 = ((_0x5cfb8a - _0x51997b) / 1000).toFixed(2);
      const _0x16e740 = _0x2ba5f2.data;
      if (!_0x16e740.imageLinks || _0x16e740.imageLinks.length === 0) {
        if (_0x16e740.errorMessage === "Invalid API key") {
          await _0x4fd165.reply("⚠️ | Invalid API key. Please check your API key and try again.");
        } else {
          await _0x4fd165.reply("No images found for the prompt: " + _0x398c74 + ". Please try again.");
        }
        return;
      }
      const _0x23fd0c = await Promise.all(_0x16e740.imageLinks.map(async _0x48be91 => {
        const _0x4bb3d2 = await getStreamFromURL(_0x48be91);
        return _0x4bb3d2;
      }));
      await _0x4fd165.reply({
        'body': "\n  ✅ | Here are the images for..\n  \n  Prompt: \"" + _0x398c74 + "\" \n  \n  Processing Time: " + _0x2247b2 + 's',
        'attachment': _0x23fd0c
      });
      _0x4fd165.unsend((await _0x146640).messageID);
    } catch (_0x5039f9) {
      console.error(_0x5039f9);
      if (_0x5039f9.response && _0x5039f9.response.status === 401) {
        await _0x4fd165.reply("⚠️ | Unauthorized your API key \n\nContact with Rubish for new apikey");
      } else {
        if (_0x5039f9.response && _0x5039f9.response.data) {
          const _0x307626 = _0x5039f9.response.data;
          if (_0x307626.errorMessage === "Pending") {
            await _0x4fd165.reply("⚠️ | This prompt has been blocked by Bing. Please try again with another prompt.");
          } else {
            if (typeof _0x307626 === "object") {
              const _0x399a55 = Object.entries(_0x307626).map(([_0x49b39d, _0x30edce]) => _0x49b39d + ": " + _0x30edce).join("\n");
              await _0x4fd165.reply("⚠️ | Server error details:\n\n" + _0x399a55);
            } else if (_0x5039f9.response.status === 404) {
              await _0x4fd165.reply("⚠️ | The DALL·E 3 API endpoint was not found. Please check the API URL.");
            } else {
              await _0x4fd165.reply("⚠️ | Rubish dalle -3 server busy now\n\nPlease try again later ");
            }
          }
        } else {
          await _0x4fd165.reply("⚠️ | An unexpected error occurred. Please try again later.");
        }
      }
    }
  }
};
