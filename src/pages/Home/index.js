import React, { useContext, useEffect, useState } from 'react';
import './styles.scss';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';
import SearchBar from './Searchbar';
import MainNews from './MainNews';
import TopHeadlines from './TopHeadlines';
import { AppContext } from '../../contexts/AppContext';
import { searchNewsArticlesByKeyword, initialSearch } from '../../services/newsSearchService';

const Home = () => {

    const [showLoader, setShowLoader] = useContext(AppContext);
    const [topHeadlines, setTopHeadlines] = useState([]);
    /* Intention was to create a more detailed layout with Top Headlines on
    a particular keyword on a side-stack, and the main news on the main-stack.
    Due to the interest of time, showing only the main stack as per the requirement
    for now, will be enhancing this application to show the headlines as well in the
    future */
    const [mainData, setMainData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [keyword, setKeyword] = useState(null);

    /* Initial news contains headline from UK, everything-endpoint cannot query by country*/
    const loadInitialNews = async () => {
        setShowLoader(true);
        try{
            const response = await initialSearch(currentPage);
            if(response) {
                const {data: {articles}} = response;
                setTopHeadlines([...articles]);
            }
        } catch(e) {
            console.log(e)
        } finally{
            setShowLoader(false);
        }
    };

    /* Every search by keyword or page-change calls the search endpoint, which return the main news
    as well as the top headlines. We are currently only using the main news */
    const searchNewsWithKeyword = async ({key, newPage}) => {
        const tempKey = key || keyword;
        const tempPage = key ? 1 : newPage;
        try{
            setShowLoader(true);
            const response = await searchNewsArticlesByKeyword(tempKey, tempPage);
            if(response) {
                const {data: {allNews}} = response;
                setTopHeadlines([...allNews]);
                setKeyword(tempKey);
                setCurrentPage(tempPage);
            }
        } catch(e) {
            console.log(e)
        } finally{
            setShowLoader(false);
        }
    };

    useEffect(() => {
        loadInitialNews();
    }, []);

    return (
        <main className="homepage d-flex">
            {showLoader && <Loader />}
            <div className="homepage--main d-flex flex-column">
                <div className="homepage--main--searchbar">
                    <SearchBar searchKeyword={searchNewsWithKeyword} title={keyword || 'Today\s Headlines'}></SearchBar>
                </div>
                {keyword && <div className="homepage--main--pagination">
                    <Pagination limit={4} selected={currentPage} parentCallback={searchNewsWithKeyword} />
                </div>}
                <div className="homepage--main--news d-flex">
                    {mainData && mainData.length > 0 && (<div className="homepage--main--all-news">
                        <MainNews data={mainData}></MainNews>
                    </div>)}
                    <div className="homepage--main--top-headlines">
                        <TopHeadlines data={topHeadlines}></TopHeadlines>
                    </div>
                </div>
                {keyword && <div className="homepage--main--pagination">
                    <Pagination limit={4} selected={currentPage} parentCallback={searchNewsWithKeyword} />
                </div>}
            </div>
        </main>
    );
}

export default Home;