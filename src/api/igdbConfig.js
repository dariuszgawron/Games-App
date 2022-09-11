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
}

const igdbConfig = {
    // baseApiUrl: 'https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/',
    baseApiUrl: 'https://api.igdb.com/v4/',
    clientId: process.env.REACT_APP_IGDB_CLIENT_ID,
    accessToken: process.env.REACT_APP_IGDB_ACCESS_TOKEN,
    imageUrl: (imageSize, imagePath) => `https://images.igdb.com/igdb/image/upload/t_${imageSize}/${imagePath}.jpg`
};

export default igdbConfig;