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
    const [mainData, setMainData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [keyword, setKeyword] = useState(null);

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

    const searchNewsWithKeyword = async ({key, newPage}) => {
        setShowLoader(true);
        const tempKey = key || keyword;
        const tempPage = key ? 1 : newPage;
        try{
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