import axiosConfig from "./axiosConfig";

const igdbApi = {
    getGames: (queryParams) => {
        const url = 'games';
        return axiosConfig.post(url, queryParams);
    },
    getGenres: (queryParams) => {
        const url = 'genres';
        return axiosConfig.post(url, queryParams);
    },
    getVideos: (queryParams) => {
        const url = 'game_videos';
        return axiosConfig.post(url, queryParams);
    },
    getScreenshots: (queryParams) => {
        const url = 'screenshots';
        return axiosConfig.post(url, queryParams);
    },
    getCovers: (queryParams) => {
        const url = 'covers';
        return axiosConfig.post(url, queryParams);
    },
    getPlatforms: (queryParams) => {
        const url = 'platforms';
        return axiosConfig.post(url, queryParams);
    },
    getPlatformLogos: (queryParams) => {
        const url = 'platform_logos';
        return axiosConfig.post(url, queryParams);
    },
    getCharacters: (queryParams) => {
        const url = 'characters';
        return axiosConfig.post(url, queryParams);
    },
    getAgeRatings: (queryParams) => {
        const url = 'age_ratings';
        return axiosConfig.post(url, queryParams);
    },
    getWebsites: (queryParams) => {
        const url = 'websites';
        return axiosConfig.post(url, queryParams);
    },
    getReleaseDates: (queryParams) => {
        const url = 'release_dates';
        return axiosConfig.post(url, queryParams);
    },
    getThemes: (queryParams) => {
        const url = 'themes';
        return axiosConfig.post(url, queryParams);
    },
    searchGames: (queryParams) => {
        const url = 'search';
        return axiosConfig.post(url, queryParams);
    }
};

export default igdbApi;