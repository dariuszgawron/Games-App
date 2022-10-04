const igdbConfig = {
    // baseApiUrl: 'https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/',
    baseApiUrl: 'https://api.igdb.com/v4/',
    clientId: process.env.REACT_APP_IGDB_CLIENT_ID,
    accessToken: process.env.REACT_APP_IGDB_ACCESS_TOKEN,
    imageUrl: (imageSize, imagePath) => `https://images.igdb.com/igdb/image/upload/t_${imageSize}/${imagePath}.jpg`,
    videoUrl: videoKey => `https://youtube.com/embed/${videoKey}`,
    swiperItems: 15,
    gridItems: 20
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
        icon: 'bx bx-link'
    },
    2: {
        title: 'Wikia',
        icon: 'bx bx-link'
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
        icon: 'bx bxl-apple'
    },
    11: {
        title: 'iPad',
        icon: 'bx bxl-apple'
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
        icon: 'bx bx-link'
    },
    16: {
        title: 'Epic games',
        icon: 'bx bx-link'
    },
    17: {
        title: 'GOG',
        icon: 'bx bx-link'
    },
    18: {
        title: 'Discord',
        icon: 'bx bxl-discord-alt'
    }
};

export const ageRating = {
    1: 'Three',
    2: 'Seven',
    3: 'Twelve',
    4: 'Sixteen',
    5: 'Eighteen',
    6: 'RP',
    7: 'EC',
    8: 'E',
    9: 'E10',
    10: 'T',
    11: 'M',
    12: 'AO',
    13: 'CERO_A',
    14: 'CERO_B',
    15: 'CERO_C',
    16: 'CERO_D',
    17: 'CERO_Z',
    18: 'USK_0',
    19: 'USK_6',
    20: 'USK_12',
    21: 'USK_18',
    22: 'GRAC_ALL',
    23: 'GRAC_Twelve',
    24: 'GRAC_Fifteen',
    25: 'GRAC_Eighteen',
    26: 'GRAC_TESTING',
    27: 'CLASS_IND_L',
    28: 'CLASS_IND_Ten',
    29: 'CLASS_IND_Twelve',
    30: 'CLASS_IND_Fourteen',
    31: 'CLASS_IND_Sixteen',
    32: 'CLASS_IND_Eighteen',
    33: 'ACB_G',
    34: 'ACB_PG',
    35: 'ACB_M',
    36: 'ACB_MA15',
    37: 'ACB_R18',
    38: 'ACB_RC'
};

export default igdbConfig;