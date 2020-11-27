import React, { useContext, useEffect, useState } from 'react';
import './styles.scss';

const MainNews = (data) => {
    return (
        <div className="top-headlines-list">
            <ul>
                {data && data.length > 0 && data.map(({title, description, urlToImage, publishedAt, author, url}) => (
                    <li>
                        <div className="d-flex align-items-center ncard">
                            <div className="ncard--img">
                                <img src={urlToImage} alt={title} />
                            </div>
                            <div className="ncard--content d-flex flex-column">
                                <h2>{title}</h2>
                                <p>{description}</p>
                                <h6>{author}, {publishedAt}</h6>
                                <a href={url} target="blank">Read More...</a>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MainNews;