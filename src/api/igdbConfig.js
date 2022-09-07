export const coverSize = {
    big: 'cover_big',
    small: 'cover_small'
};

export const screenshotSize = {
    huge: 'screenshot_huge',
    big: 'screenshot_big',
    medium: 'screenshot_med',
    size700p: '720p',
    size1080p: '1080p'
};

const igdbConfig = {
    // baseApiUrl: 'https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/',
    baseApiUrl: 'https://api.igdb.com/v4/',
    clientId: process.env.REACT_APP_IGDB_CLIENT_ID,
    accessToken: process.env.REACT_APP_IGDB_ACCESS_TOKEN,
    imageUrl: (imageSize, imagePath) => `https://images.igdb.com/igdb/image/upload/t_${imageSize}/${imagePath}.jpg`
};

export default igdbConfig;