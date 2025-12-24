import { useEffect, useState } from 'react';
import CanvasList from '../components/CanvasList';
import SearchBar from '../components/SearchBar';
import ViewToggle from '../components/ViewToggle';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { createCanvas, deleteCanvas, getCanvases } from '../api/canvas';
import Button from '../components/Button';

function Home() {
  const [searchText, setSearchText] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);

  async function fetchData(params) {
    try {
      setIsLoading(true);
      setError(null);
      await new Promise(resolver => setTimeout(resolver, 1000));
      const response = await getCanvases(params);
      // console.log(response);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleDeleteItem = async id => {
    // setData(data.filter(item => item.id !== id));
    if (confirm('삭제하시겠습니까?') === false) {
      return;
    }
    // delete logic
    try {
      await deleteCanvas(id);
      fetchData({ title_like: searchText });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSearch = () => {
    setSearchKeyword(searchText);
  };

  const handleCreateCanvas = async () => {
    try {
      setIsLoadingCreate(true);
      await new Promise(resolver => setTimeout(resolver, 1000));
      await createCanvas();
      fetchData({ title_like: searchText });
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoadingCreate(false);
    }
  };

  useEffect(() => {
    if (searchKeyword?.trim() === '') {
      fetchData();
    } else {
      fetchData({ title_like: searchText });
    }
  }, [searchKeyword]);

  useEffect(() => {
    if (searchText === '') {
      setSearchKeyword('');
    }
  }, [searchText]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          handleSearch={handleSearch}
        />
        <ViewToggle isGridView={isGridView} setIsGridView={setIsGridView} />
      </div>
      <div className="flex justify-end mb-6">
        <Button onClick={handleCreateCanvas} loading={isLoadingCreate}>
          등록하기
        </Button>
      </div>

      {isLoading && <Loading />}
      {error && (
        <Error
          message={error.message}
          onRetry={() => fetchData({ title_like: searchText })}
        />
      )}
      {!isLoading && !error && (
        <CanvasList
          filteredData={data}
          searchText={searchText}
          isGridView={isGridView}
          onDeleteItem={handleDeleteItem}
        />
      )}
    </div>
  );
}

export default Home;
