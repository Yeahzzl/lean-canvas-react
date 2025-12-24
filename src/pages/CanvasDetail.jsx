import { useParams } from 'react-router';
import CanvasTitle from '../components/CanvasTitle';
import LeanCanvas from '../components/LeanCanvas';
import { useEffect, useState } from 'react';
import { getCanvasById } from '../api/canvas';

function CanvasDetail() {
  const { id } = useParams();
  const [canvas, setCanvas] = useState('');

  useEffect(() => {
    const fetchCanvas = async () => {
      const data = await getCanvasById(id);
      setCanvas(data);
    };
    fetchCanvas();
  }, [id]);

  return (
    <div>
      <CanvasTitle value={canvas?.title} />
      <LeanCanvas />
    </div>
  );
}

export default CanvasDetail;
