import { useParams } from 'react-router';
import CanvasTitle from '../components/CanvasTitle';
import LeanCanvas from '../components/LeanCanvas';
import { useEffect, useState } from 'react';
import { getCanvasById, updateTitle } from '../api/canvas';

function CanvasDetail() {
  const { id } = useParams();
  const [canvas, setCanvas] = useState('');

  const handleTitleChange = async title => {
    try {
      await updateTitle(id, title);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    const fetchCanvas = async () => {
      const data = await getCanvasById(id);
      setCanvas(data);
    };
    fetchCanvas();
  }, [id]);

  return (
    <div>
      <CanvasTitle value={canvas?.title} onChange={handleTitleChange} />
      {canvas && <LeanCanvas canvas={canvas} />}
    </div>
  );
}

export default CanvasDetail;
