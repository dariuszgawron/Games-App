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
    1: 'Official',
    2: 'Wikia',
    3: 'Wikipedia',
    4: 'Facebook',
    5: 'Twitter',
    6: 'Twitch',
    8: 'Instagram',
    9: 'YouTube',
    10: 'iPhone',
    11: 'iPad',
    12: 'Android',
    13: 'Steam',
    14: 'Reddit',
    15: 'Itch',
    16: 'Epic games',
    17: 'GOG',
    18: 'Discord'
};

const igdbConfig = {
    // baseApiUrl: 'https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/',
    baseApiUrl: 'https://api.igdb.com/v4/',
    clientId: process.env.REACT_APP_IGDB_CLIENT_ID,
    accessToken: process.env.REACT_APP_IGDB_ACCESS_TOKEN,
    imageUrl: (imageSize, imagePath) => `https://images.igdb.com/igdb/image/upload/t_${imageSize}/${imagePath}.jpg`,
    videoUrl: videoKey => `https://youtube.com/embed/${videoKey}`,
    swiperItems: 15
};

export default igdbConfig;