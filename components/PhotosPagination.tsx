import React from 'react'
import { useRecoilState,useRecoilValue } from 'recoil'

import { Pagination } from '@mui/material';
import { styled } from '@mui/system';

import { currentPageState } from '../state/currentPageState';
import { pageCountState } from '../state/pageCountState';
import { currentGetPhotosState } from '../state/currentGetPhotosState';

// ページネーションのcss
const MyPagination = styled(Pagination)({
  display: "inline-block",
})

const PhotosPagination = () => {
  // 表示される写真
  const [currentGetPhotos, setCurrentGetPhotos] = useRecoilState(currentGetPhotosState);

  // 全ページ数
  const pageCount = useRecoilValue(pageCountState);

  // 現在のページ数
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

  // ページネーションをクリックした時に走る関数
  const handlePageClick = async(e,index) => {
    setCurrentGetPhotos([])
    setCurrentPage(index)
    window.scrollTo({top:0,behavior: "smooth",});
  }
  
  return (
    <>
      <MyPagination 
        variant="outlined" 
        count={pageCount}
        onChange={handlePageClick}
        page={currentPage} 
      />
    </>
  )
}

export default PhotosPagination