import { canvases } from './http';

// 가져오기
export function getCanvases(params) {
  return canvases.get('/', { params });
}

// 수정, 삭제, 등록 가능
