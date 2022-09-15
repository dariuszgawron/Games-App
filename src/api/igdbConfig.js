const igdbConfig = {
    // baseApiUrl: 'https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/',
    baseApiUrl: 'https://api.igdb.com/v4/',
    clientId: process.env.REACT_APP_IGDB_CLIENT_ID,
    accessToken: process.env.REACT_APP_IGDB_ACCESS_TOKEN,
    imageUrl: (imageSize, imagePath) => `https://images.igdb.com/igdb/image/upload/t_${imageSize}/${imagePath}.jpg`,
    videoUrl: videoKey => `https://youtube.com/embed/${videoKey}`,
    swiperItems: 15
};

export const imageSize = {
    micro: 'micro',
    thumb: 'thumb',
    coverSmall: 'cover_small',
    logoMedium: 'logo_med', 
    coverBig: 'cover_big',
    screenshotMedium: 'screenshot_med',
    screenshotBig: 'screenshot_big',
    screenshotHuge: 'screenshot_huge',
    size720p: '720p',
    size1080p: '1080p'
};

export const websitesCategory = {
    1: {
        title: 'Official',
        icon: 'bx bx-link-external'
    },
    2: {
        title: 'Wikia',
        icon: ''
    },
    3: {
        title: 'Wikipedia',
        icon: 'bx bxl-wikipedia'
    },
    4: {
        title: 'Facebook',
        icon: 'bx bxl-facebook-circle'
    },
    5: {
        title: 'Twitter',
        icon: 'bx bxl-twitter'
    },
    6: {
        title: 'Twitch',
        icon: 'bx bxl-twitch'
    },
    8: {
        title: 'Instagram',
        icon: 'bx bxl-instagram'
    },
    9: {
        title: 'YouTube',
        icon: 'bx bxl-youtube'
    },
    10: {
        title: 'iPhone',
        icon: ''
    },
    11: {
        title: 'iPad',
        icon: ''
    },
    12: {
        title: 'Android',
        icon: 'bx bxl-android'
    },
    13: {
        title: 'Steam',
        icon: 'bx bxl-steam'
    },
    14: {
        title: 'Reddit',
        icon: 'bx bxl-reddit'
    },
    15: {
        title: 'Itch',
        icon: ''
    },
    16: {
        title: 'Epic games',
        icon: ''
    },
    17: {
        title: 'GOG',
        icon: ''
    },
    18: {
        title: 'Discord',
        icon: 'bx bxl-discord-alt'
    }
};

export default igdbConfig;