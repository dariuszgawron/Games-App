import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import igdbApi from "../../api/igdbApi";
import igdbConfig from "../../api/igdbConfig";

import "./VideoList.scss";

const VideoList = props => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            const queryParams = `fields *; where game = ${props.gameId};`;
            const response = await igdbApi.getVideos(queryParams);
            setVideos(response);
        };
        getVideos();
    }, [props.gameId]);

    return (
        <div className="video-list">
            {
                videos.length>0 
                ?   <div className="video-list__grid">
                    {   
                        videos.map((video, index) => (
                            <iframe 
                                className="video-list__grid-item"
                                src={igdbConfig.videoUrl(video.video_id)}
                                key={index}
                                title={video.name}
                                allowFullScreen
                            >
                            </iframe>
                        ))
                    }
                    </div>
                :   <span className="video-list__empty">
                        <i class='video-list__empty-icon bx bxs-invader'></i>
                        No trailers
                    </span>
            }
        </div>
    )
};

VideoList.propTypes = {
    gameId: PropTypes.string.isRequired
};

export default VideoList;