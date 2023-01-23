import React, { useState } from 'react'
import { FlickrApiType } from '../types/FlickrApi'
import { Pagination } from '@mui/material';
import { useRecoilState,useRecoilValue } from 'recoil'
import { itemsPerPageState } from '../state/itemsPerPageState'
import { itemsOffsestState } from '../state/itemsOffsestState'
import { styled } from '@mui/system';
import { currentPageState } from '../state/currentPageState';
import { pageCountState } from '../state/pageCountState';


const MyPagination = styled(Pagination)({
  display: "inline-block",
})

type Props = {
  allPhotos: FlickrApiType[];
  currentGetPhotos: FlickrApiType[];
}

const PhotosPagination = ({ allPhotos, currentGetPhotos }:Props) => {

  // const itemsPrePage = useRecoilValue(itemsPerPageState);
  // const [itemsOffsest, setItemsOffsest] = useRecoilState(itemsOffsestState);
  // const pageCount = Math.ceil(allPhotos.length / itemsPrePage)

  // const [page, setPage] = useState(1);

  // 全ページ数
  const pageCount = useRecoilValue(pageCountState);
  // 現在のページ数
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

  const handlePageClick = (e,index) => {
    setCurrentPage(index)
    // setPage(index)
    // const newOffset = ((index - 1) * itemsPrePage ) % allPhotos.length;
    // setItemsOffsest(newOffset);
    // console.log(index - 1)
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