const _0x111ac5 = _0x1f62;
(function (_0xa5873, _0x1ac420) {
    const _0x43a1ae = _0x1f62,
        _0x593e0b = _0xa5873();
    while (true) {
        try {
            const _0x2e3b5b = parseInt(_0x43a1ae(0x117)) / 0x1 * (-parseInt(_0x43a1ae(0xfa)) / 0x2) + parseInt(_0x43a1ae(0xf3)) / 0x3 + -parseInt(_0x43a1ae(0x118)) / 0x4 * (parseInt(_0x43a1ae(0x105)) / 0x5) + -parseInt(_0x43a1ae(0x103)) / 0x6 + -parseInt(_0x43a1ae(0x108)) / 0x7 * (parseInt(_0x43a1ae(0x111)) / 0x8) + parseInt(_0x43a1ae(0xee)) / 0x9 + -parseInt(_0x43a1ae(0xdf)) / 0xa * (-parseInt(_0x43a1ae(0xf7)) / 0xb);
            if (_0x2e3b5b === _0x1ac420) break;
            else _0x593e0b.push(_0x593e0b.shift());
        } catch (_0xc4384f) {
            _0x593e0b.push(_0x593e0b.shift());
        }
    }
}(_0x2095, 0x549d7));
function _0x2095() {
    const _0x3e33a9 = ['video', '@distube/ytdl-core', 'response', 'filter', 'fs-extra', '2309592uLViUh', 'exports', '655510iJqAxB', 'pipe', '[ERROR]', '66283qKvapw', 'https://www.googleapis.com/youtube/v3/videos?key=', '&id=', '&playlistId=', 'audioandvideo', '/cache/', 'end', 'length', 'floor', '208hGQkQw', 'threadID', 'senderID', 'sendMessage', '[DOWNLOADER]', 'items', '183822BEseHi', '4RmMXyT', 'title', 'data', 'statSync', 'PLCiXFxWx8d2Br6CneoQUiq9mM8OB2MEb8', 'unlinkSync', 'An error occurred while processing the command.', '3526450hyTRyG', 'unsendMessage', 'https://www.googleapis.com/youtube/v3/playlistItems?key=', 'videoId', 'size', '&part=contentDetails&maxResults=50', 'Loading random pubg video 💖...', 'sentVideos', 'info', 'get', 'random', '.mp4', 'get Free Fire edits videos from YouTube', 'messageID', 'Starting download now!', '4119579gJEvfd', '❌ | Give a next try again 🥱', 'map', '[DOWNLOADER] Downloaded', 'snippet', '388836Ebkkuq', 'something went wrong', 'contentDetails', 'includes', '22gvYNyG', '📹 | Here\'s the random pubg video.', 'createReadStream', '2oifszL', 'push', 'createWriteStream', 'AIzaSyAO1tuGus4-S8RJID51f8WJAM7LXz1tVNc'];
    _0x2095 = function () {
        return _0x3e33a9;
    };
    return _0x2095();
}
const axios = require('axios'),
    fs = require(_0x111ac5(0x102)),
    os = require('os'),
    ytdl = require(_0x111ac5(0xff));
function _0x1f62(_0x4fd05e, _0x174e4f) {
    const _0x20955b = _0x2095();
    return _0x1f62 = function (_0x1f625e, _0x2a0b20) {
        _0x1f625e = _0x1f625e - 0xda;
        let _0x546cbb = _0x20955b[_0x1f625e];
        return _0x546cbb;
    }, _0x1f62(_0x4fd05e, _0x174e4f);
}
module[_0x111ac5(0x104)] = {
    'sentVideos': [],
    'config': {
        'name': 'pubg',
        'version': '2.0',
        'role': 0x0,
        'author': '𝐀𝐒𝐈𝐅 𝐱𝟔𝟗',
        'cooldowns': 0x5,
        'shortDescription': '',
        'longDescription': _0x111ac5(0xeb),
        'category': '🎬 | Media',
        'dependencies': {
            'fs-extra': '',
            'axios': '',
            'ytdl-core': '',
            'yt-search': ''
        }
    },
    'onStart': async function ({
        api: _0x5b4f84,
        event: _0x24c8e6,
        message: _0x4725c0
    }) {
        const _0x119ff6 = _0x111ac5;
        try {
            const _0x1c3861 = _0x24c8e6[_0x119ff6(0x113)],
                _0x49c0ad = await _0x5b4f84[_0x119ff6(0x114)](_0x119ff6(0xe5), _0x24c8e6[_0x119ff6(0x112)], null, _0x24c8e6[_0x119ff6(0xec)]),
                _0x5ddbc4 = _0x119ff6(0xfd),
                _0x48f1c2 = _0x119ff6(0xdc),
                _0x517371 = _0x119ff6(0xe1) + _0x5ddbc4 + _0x119ff6(0x10b) + _0x48f1c2 + _0x119ff6(0xe4),
                _0x20391d = await axios.get(_0x517371),
                _0x1fc049 = _0x20391d[_0x119ff6(0xda)].items,
                _0x47f9fe = _0x1fc049[_0x119ff6(0xf0)](_0x5c8316 => _0x5c8316[_0x119ff6(0xf5)][_0x119ff6(0xe2)]);
            this.sentVideos[_0x119ff6(0x10f)] === _0x47f9fe.length && (this[_0x119ff6(0xe6)] = []);
            const _0x2ced28 = _0x47f9fe[_0x119ff6(0x101)](_0x230d1c => !this[_0x119ff6(0xe6)][_0x119ff6(0xf6)](_0x230d1c));
            if (_0x2ced28[_0x119ff6(0x10f)] === 0x0) return _0x5b4f84[_0x119ff6(0xe0)](_0x49c0ad[_0x119ff6(0xec)]), _0x5b4f84[_0x119ff6(0x114)](_0x119ff6(0xf4), _0x24c8e6[_0x119ff6(0x112)], null, _0x24c8e6.messageID);
            const _0x23630b = _0x2ced28[Math[_0x119ff6(0x110)](Math[_0x119ff6(0xe9)]() * _0x2ced28[_0x119ff6(0x10f)])];
            this.sentVideos[_0x119ff6(0xfb)](_0x23630b);
            const _0x472857 = _0x119ff6(0x109) + _0x5ddbc4 + _0x119ff6(0x10a) + _0x23630b + '&part=snippet,contentDetails',
                _0x1057a2 = await axios[_0x119ff6(0xe8)](_0x472857),
                _0xab2b3f = _0x1057a2.data[_0x119ff6(0x116)][0x0][_0x119ff6(0xf2)],
                _0x11f9dc = _0x1057a2[_0x119ff6(0xda)][_0x119ff6(0x116)][0x0],
                _0x4df668 = _0xab2b3f[_0x119ff6(0x119)],
                _0x4e5129 = ytdl(_0x23630b, {
                    'filter': _0x119ff6(0x10c)
                }),
                _0x5e5a70 = _0x1c3861 + _0x119ff6(0xea),
                _0x309d77 = __dirname + (_0x119ff6(0x10d) + _0x5e5a70);
            _0x4e5129[_0x119ff6(0x106)](fs[_0x119ff6(0xfc)](_0x309d77)), _0x4e5129.on(_0x119ff6(0x100), () => {
                const _0x5779d8 = _0x119ff6;
                console.info(_0x5779d8(0x115), _0x5779d8(0xed));
            }), _0x4e5129.on(_0x119ff6(0xe7), () => {
                const _0x2abc17 = _0x119ff6;
                console[_0x2abc17(0xe7)](_0x2abc17(0x115), 'Downloading video: ' + _0x4df668);
            }), _0x4e5129.on(_0x119ff6(0x10e), () => {
                const _0x2164ef = _0x119ff6;
                console[_0x2164ef(0xe7)](_0x2164ef(0xf1));
                if (fs[_0x2164ef(0xdb)](_0x309d77)[_0x2164ef(0xe3)] > 0x1900000) return fs[_0x2164ef(0xdd)](_0x309d77), _0x5b4f84.unsendMessage(_0x49c0ad.messageID), _0x5b4f84[_0x2164ef(0x114)](_0x2164ef(0xef), _0x24c8e6.threadID, null, _0x24c8e6[_0x2164ef(0xec)]);
                const _0x9489b1 = {
                    'body': _0x2164ef(0xf8),
                    'attachment': fs[_0x2164ef(0xf9)](_0x309d77)
                };
                _0x5b4f84[_0x2164ef(0x114)](_0x9489b1, _0x24c8e6[_0x2164ef(0x112)], null, _0x24c8e6[_0x2164ef(0xec)], () => {
                    const _0x595baa = _0x2164ef;
                    fs[_0x595baa(0xdd)](_0x309d77);
                }), setTimeout(() => {
                    const _0x4c0047 = _0x2164ef;
                    _0x5b4f84[_0x4c0047(0xe0)](_0x49c0ad[_0x4c0047(0xec)]);
                }, 0x2710);
            });
        } catch (_0x310177) {
            console.error(_0x119ff6(0x107), _0x310177), _0x5b4f84[_0x119ff6(0x114)](_0x119ff6(0xde), _0x24c8e6[_0x119ff6(0x112)], null, _0x24c8e6.messageID);
        }
    }
};
