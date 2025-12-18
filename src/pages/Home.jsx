import { useEffect, useState } from 'react';
import CanvasList from '../components/CanvasList';
import SearchBar from '../components/SearchBar';
import ViewToggle from '../components/ViewToggle';
import { getCanvases } from '../../api/canvas';

function Home() {
  const [searchText, setSearchText] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [data, setData] = useState([]);

  async function fetchData(params) {
    const response = await getCanvases(params);
    // console.log(response);
    setData(response.data);
  }

  const handleDeleteItem = id => {
    setData(data.filter(item => item.id !== id));
  };

  const handleSearch = () => {
    setSearchKeyword(searchText);
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
      <CanvasList
        filteredData={data}
        searchText={searchText}
        isGridView={isGridView}
        onDeleteItem={handleDeleteItem}
      />
    </div>
  );
}

export default Home;
