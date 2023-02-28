import Head from 'next/head'
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { styled } from '@mui/system';
import { Select, FormControl, MenuItem, InputLabel } from '@mui/material';

import Header from '../components/organisms/header/Header'
import PhotoList from '../components/organisms/photolist/PhotoList';
import PhotosPagination from '../components/organisms/PhotosPagination';
import { currentPageState } from '../state/currentPageState';
import { pageCountState } from '../state/pageCountState';

import { currentGetPhotosState } from '../state/currentGetPhotosState';
import styles from '../styles/Home.module.css'
import flickrApi from '../apis/flickrApi';
import { dayFilterState } from '../state/dayFilterState';
import { tourFilterState } from '../state/tourFilterState';
import { teamFilterState } from '../state/teamFilterState';
import { urlFilterTeamsState } from '../state/urlFilterTeamsState';
import { urlFilterMinTakenDateState } from '../state/urlFilterMinTakenDateState';
import { urlFilterMaxTakenDateState } from '../state/urlFilterMaxTakenDateState';
import { headerModalShowState } from '../state/headerModalShowState';

const MyTeamSelect = styled(Select)({
  width: "200px",
  height: "40px",
  borderRadius: "40px",
})
const MytournamentSelect = styled(Select)({
  width: "340px",
  height: "40px",
  borderRadius: "40px",
})
const MyDaySelect = styled(Select)({
  width: "270px",
  height: "40px",
  borderRadius: "40px",
})

export default function Home() {
  // 取得した写真のstate
  const setCurrentGetPhotos = useSetRecoilState(currentGetPhotosState);
  // ページ数のstate
  const setPageCount = useSetRecoilState(pageCountState);
  // 現在のページ数のstate
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  // APIリクエストを送る際の値のstate
  const [urlFilterTeams, setUrlFilterTeams] = useRecoilState(urlFilterTeamsState);
  const [urlFilterMinTakenDate, setUrlFilterMinTakenDate] = useRecoilState(urlFilterMinTakenDateState)
  const [urlFilterMaxTakenDate, setUrlFilterMaxTakenDate] = useRecoilState(urlFilterMaxTakenDateState)

  // 【チームフィルターの実装】
  // チームフィルターのプルダウンの内容
  const teamFilterStatus =  [
    "すべて",
    "ZETA DIVISION",
    "Crazy Raccoon",
    "Northeption",
    "DRX",
    "Paper Rex",
    "FNATIC",
    "LOUD",
    "OpTic Gaming",
  ]
  // チームフィルターのプルダウンの値を管理
  const [teamFilter, setTeamFilter] = useRecoilState(teamFilterState);
  // const [teamFilter, setTeamFilter] = useState<string>("すべて");
  // チームフィルターのプルダウンを動かすための関数
  const handleChangeTeamFilter = (e:any) => {
    setTeamFilter(e.target.value);
    setTourFilter("すべて");
    setUrlFilterMinTakenDate("");
    setUrlFilterMaxTakenDate("");
    setCurrentPage(1);
    if(e.target.value==="すべて"){
      setUrlFilterTeams("");
    } else {
      setUrlFilterTeams(e.target.value);
    };
  };

  // 【大会フィルターの実装】
  // 大会フィルターのプルダウンの内容
  const tourFilterStatus =  [
    "すべて",
    "vct2021: Stage 2 Masters - Reykjavík",
    "vct2021: Stage 3 Masters - Berlin",
    "vct2021: Champions",
    "vct2022: Stage 1 Masters - Reykjavík",
    "vct2022: Stage 2 Masters - Copenhagen",
    "vct2022: Champions",
  ]
  // 大会フィルターのプルダウンの内容を管理
  const [tourFilter, setTourFilter] = useRecoilState(tourFilterState);
  // const [tourFilter, setTourFilter] = useState<string>("すべて")
  // 大会フィルターのプルダウンを動かすための関数
  const handleChangeTourFilter = async(e:any) => {
    await setTourFilter(e.target.value);
    setCurrentPage(1);
    // 日程フィルターも初期値に戻す
    setDayFilter("すべて");
    switch (e.target.value) {
      case "すべて":
        setUrlFilterMinTakenDate("")
        setUrlFilterMaxTakenDate("")
        return
      case "vct2021: Stage 2 Masters - Reykjavík":
        setUrlFilterMinTakenDate("2021-5-10")
        setUrlFilterMaxTakenDate("2021-6-10")
        return
      case "vct2021: Stage 3 Masters - Berlin":
        setUrlFilterMinTakenDate("2021-9-1")
        setUrlFilterMaxTakenDate("2021-9-30")
        return
      case "vct2021: Champions":
        setUrlFilterMinTakenDate("2021-11-20")
        setUrlFilterMaxTakenDate("2021-12-20")
        return
      case "vct2022: Stage 1 Masters - Reykjavík":
        setUrlFilterMinTakenDate("2022-4-1")
        setUrlFilterMaxTakenDate("2022-4-30")
        return 
      case "vct2022: Stage 2 Masters - Copenhagen":
        setUrlFilterMinTakenDate("2022-7-1")
        setUrlFilterMaxTakenDate("2022-7-30")
        return
      case "vct2022: Champions":
        setUrlFilterMinTakenDate("2022-8-20")
        setUrlFilterMaxTakenDate("2022-9-30")
        return
    }
  }

  // 日程フィルターの実装
  // 日程フィルターのプルダウン（大会を選択していない場合）
  const notSelectedTour = [
    {schedule: "すべて", minDate:"", maxDate:""},
    {schedule: "大会を選択してください", minDate:"",maxDate:""},
  ]
  // 日程フィルターのプルダウン（vct2021stage2）
  const dayFilterStatusVCT2021Stage2 = [
    {schedule: "すべて", minDate:"2021-5-10", maxDate:"2021-6-10"},
    {schedule: "Day1", minDate:"2021-5-25", maxDate:"2021-5-26"},
    {schedule: "Day2", minDate:"2021-5-26", maxDate:"2021-5-27"},
    {schedule: "Day3", minDate:"2021-5-27", maxDate:"2021-5-28"},
    {schedule: "Day4", minDate:"2021-5-28", maxDate:"2021-5-29"},
    {schedule: "Day5", minDate:"2021-5-29", maxDate:"2021-5-30"},
    {schedule: "Day6", minDate:"2021-5-30", maxDate:"2021-5-31"},
    {schedule: "Grand Finals", minDate:"2021-5-31", maxDate:"2021-6-10"},
  ]
  // 日程フィルターのプルダウン（vct2021stage3）
  const dayFilterStatusVCT2021Stage3 = [
    {schedule: "すべて", minDate:"2021-9-1", maxDate:"2021-9-30"},
    {schedule: "Day1", minDate:"2021-9-10", maxDate:"2021-9-11"},
    {schedule: "Day2", minDate:"2021-9-11", maxDate:"2021-9-12"},
    {schedule: "Day3", minDate:"2021-9-12", maxDate:"2021-9-13"},
    {schedule: "Day4", minDate:"2021-9-13", maxDate:"2021-9-14"},
    {schedule: "Day5", minDate:"2021-9-14", maxDate:"2021-9-15"},
    {schedule: "Day6", minDate:"2021-9-15", maxDate:"2021-9-16"},
    {schedule: "Day7", minDate:"2021-9-16", maxDate:"2021-9-17"},
    {schedule: "Quarters", minDate:"2021-9-17", maxDate:"2021-9-18"},
    {schedule: "Semifinals", minDate:"2021-9-18", maxDate:"2021-9-19"},
    {schedule: "Grand Finals", minDate:"2021-9-19", maxDate:"2021-9-20"},
  ]
  // 日程フィルターのプルダウン（VCT2021Champions）
  const dayFilterStatusVCT2021Champions = [
    {schedule: "すべて", minDate:"2021-11-20", maxDate:"2021-12-20"},
    {schedule: "Press Conference", minDate:"2021-11-21", maxDate:"2021-12-1"},
    {schedule: "Day1", minDate:"2021-12-1", maxDate:"2021-12-2"},
    {schedule: "Day2", minDate:"2021-12-2", maxDate:"2021-12-3"},
    {schedule: "Day3", minDate:"2021-12-3", maxDate:"2021-12-4"},
    {schedule: "Day4", minDate:"2021-12-4", maxDate:"2021-12-5"},
    {schedule: "Day5", minDate:"2021-12-5", maxDate:"2021-12-6"},
    {schedule: "Day6", minDate:"2021-12-6", maxDate:"2021-12-7"},
    {schedule: "Day7", minDate:"2021-12-7", maxDate:"2021-12-8"},
    {schedule: "Quarters Day1", minDate:"2021-12-8", maxDate:"2021-12-9"},
    {schedule: "Quarters Day2", minDate:"2021-12-9", maxDate:"2021-12-10"},
    {schedule: "Press Conference", minDate:"2021-12-10", maxDate:"2021-12-11"},
    {schedule: "Semifinal", minDate:"2021-12-11", maxDate:"2021-12-12"},
    {schedule: "Grand Final", minDate:"2021-12-12", maxDate:"2021-12-13"},
  ]
  // 日程フィルターのプルダウン（vct2022stage1）
  const dayFilterStatusVCT2022Stage1 = [
    {schedule: "すべて", minDate:"2022-4-1", maxDate:"2022-4-30"},
    {schedule: "Features", minDate:"2022-4-2", maxDate:"2022-4-9"},
    {schedule: "Press Conference", minDate:"2022-4-9", maxDate:"2022-4-10"},
    {schedule: "Day1", minDate:"2022-4-10", maxDate:"2022-4-11"},
    {schedule: "Day2", minDate:"2022-4-11", maxDate:"2022-4-12"},
    {schedule: "Day3", minDate:"2022-4-12", maxDate:"2022-4-13"},
    {schedule: "Day4", minDate:"2022-4-13", maxDate:"2022-4-14"},
    {schedule: "Day5", minDate:"2022-4-14", maxDate:"2022-4-15"},
    {schedule: "Day6", minDate:"2022-4-15", maxDate:"2022-4-16"},
    {schedule: "Day7", minDate:"2022-4-16", maxDate:"2022-4-17"},
    {schedule: "Day8", minDate:"2022-4-17", maxDate:"2022-4-18"},
    {schedule: "Day9", minDate:"2022-4-18", maxDate:"2022-4-19"},
    {schedule: "Upper Final & Lower Semifinal", minDate:"2022-4-22", maxDate:"2022-4-23"},
    {schedule: "Lower Final", minDate:"2022-4-23", maxDate:"2022-4-24"},
    {schedule: "Grand Final", minDate:"2022-4-24", maxDate:"2022-4-25"},
  ]
  // 日程フィルターのプルダウン（vct2022stage2）
  const dayFilterStatusVCT2022Stage2 = [
    {schedule: "すべて", minDate:"2022-7-1", maxDate:"2022-7-30"},
    {schedule: "Features", minDate:"2022-7-2", maxDate:"2022-7-10"},
    {schedule: "Day1", minDate:"2022-7-10", maxDate:"2022-7-11"},
    {schedule: "Day2", minDate:"2022-7-11", maxDate:"2022-7-12"},
    {schedule: "Day3", minDate:"2022-7-12", maxDate:"2022-7-13"},
    {schedule: "Day4", minDate:"2022-7-13", maxDate:"2022-7-14"},
    {schedule: "Day5", minDate:"2022-7-14", maxDate:"2022-7-15"},
    {schedule: "Day6", minDate:"2022-7-15", maxDate:"2022-7-16"},
    {schedule: "Day7", minDate:"2022-7-16", maxDate:"2022-7-17"},
    {schedule: "Day8", minDate:"2022-7-17", maxDate:"2022-7-18"},
    {schedule: "Day9", minDate:"2022-7-18", maxDate:"2022-7-19"},
    {schedule: "Upper Final & Lower Semifinal", minDate:"2022-7-22", maxDate:"2022-7-23"},
    {schedule: "Lower Final", minDate:"2022-7-23", maxDate:"2022-7-24"},
    {schedule: "Grand Final", minDate:"2022-7-24", maxDate:"2022-7-25"},
  ]
  // 日程フィルターのプルダウン（VCT2022Champions）
  const dayFilterStatusVCT2022Champions = [
    {schedule: "すべて", minDate:"2022-8-20", maxDate:"2022-9-30"},
    {schedule: "Features", minDate:"2022-8-21", maxDate:"2022-8-31"},
    {schedule: "Day1", minDate:"2022-8-31", maxDate:"2022-9-1"},
    {schedule: "Day2", minDate:"2022-9-1", maxDate:"2022-9-2"},
    {schedule: "Day3", minDate:"2022-9-2", maxDate:"2022-9-3"},
    {schedule: "Day4", minDate:"2022-9-3", maxDate:"2022-9-4"},
    {schedule: "Day5", minDate:"2022-9-4", maxDate:"2022-9-5"},
    {schedule: "Day6", minDate:"2022-9-5", maxDate:"2022-9-6"},
    {schedule: "Day7", minDate:"2022-9-7", maxDate:"2022-9-8"},
    {schedule: "Day8", minDate:"2022-9-8", maxDate:"2022-9-9"},
    {schedule: "Day9", minDate:"2022-9-9", maxDate:"2022-9-10"},
    {schedule: "Day10", minDate:"2022-9-10", maxDate:"2022-9-11"},
    {schedule: "Day11", minDate:"2022-9-11", maxDate:"2022-9-12"},
    {schedule: "Day12", minDate:"2022-9-12", maxDate:"2022-9-13"},
    {schedule: "Day13", minDate:"2022-9-13", maxDate:"2022-9-14"},
    {schedule: "Upper Final & Lower Semifinal", minDate:"2022-9-16", maxDate:"2022-9-17"},
    {schedule: "Lower Final", minDate:"2022-9-17", maxDate:"2022-9-18"},
    {schedule: "Grand Final & Gold Carpet", minDate:"2022-9-18", maxDate:"2022-9-19"},
  ]
  
  // 選択した大会によって表示される日程フィルターを変える
  const getTourSchedule = ()=> {
    switch (tourFilter) {
      case "すべて":
        return notSelectedTour;
      case "vct2021: Stage 2 Masters - Reykjavík":
        return dayFilterStatusVCT2021Stage2;
      case "vct2021: Stage 3 Masters - Berlin":
        return dayFilterStatusVCT2021Stage3;
      case "vct2021: Champions":
        return dayFilterStatusVCT2021Champions;
      case "vct2022: Stage 1 Masters - Reykjavík":
        return dayFilterStatusVCT2022Stage1;
      case "vct2022: Stage 2 Masters - Copenhagen":
        return dayFilterStatusVCT2022Stage2;
      case "vct2022: Champions":
        return dayFilterStatusVCT2022Champions;
    };
  };
  const tourSchedule = getTourSchedule();

  // 日程フィルターのプルダウンの値を管理
  const [dayFilter, setDayFilter] = useRecoilState(dayFilterState);
  // const [dayFilter, setDayFilter] = useState<string>("すべて");
  // 日程フィルターのプルダウンを動かすための関数
  const handleChangeDayFilter = (e:any) => {
    setDayFilter(e.target.value);
    setCurrentPage(1);
    setUrlFilterMinTakenDate(tourSchedule.find (({schedule}) => schedule === e.target.value).minDate);
    setUrlFilterMaxTakenDate(tourSchedule.find (({schedule}) => schedule === e.target.value).maxDate);
  };
  
  const getApi =async (serchUrl:string) => {
    await flickrApi.get(serchUrl)
      .then((res) => {
        setCurrentGetPhotos(res.data.photos.photo);
        setPageCount(res.data.photos.pages);
      })
      .catch((error)=>{
        console.log(error);
      });
  };
  useEffect(()=> {
    getApi(`&tags=${urlFilterTeams}`+`&page=${currentPage}`+`&min_taken_date=${urlFilterMinTakenDate}`+`&max_taken_date=${urlFilterMaxTakenDate}`);
  },[urlFilterTeams,urlFilterMinTakenDate,urlFilterMaxTakenDate,currentPage]);

  // 別の場所をクリックしてもモーダルウィンドウを閉じる
  const[headerModalShow, setHeadereModalShow] = useRecoilState(headerModalShowState);
  const closeModalShow = () => {
    if(headerModalShow) return setHeadereModalShow(false);
  }


  return (
    <>
      <Head>
        <title>V-Photo</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/VPhotoIcon2.ico" />
      </Head>
      <div onClick={closeModalShow}>
        <Header />
        <div className={styles.sort_area}>
          <div className={styles.select_box}>
            <FormControl>
              <InputLabel shrink>チーム</InputLabel>
              <MyTeamSelect 
                defaultValue={'すべて'}
                label="チーム"
                notched
                value={teamFilter}
                onChange={(e)=>handleChangeTeamFilter(e)}
              >
                {teamFilterStatus.map((team) => (
                  <MenuItem key={team} value={team}>{team}</MenuItem>
                ))}
              </MyTeamSelect>
            </FormControl>
          </div>
          <div className={styles.select_box}>
            <FormControl>
            <InputLabel shrink>大会</InputLabel>
              <MytournamentSelect 
                defaultValue={'すべて'} 
                label="大会"
                notched
                value={tourFilter}
                onChange={(e)=>handleChangeTourFilter(e)}
              >
                {tourFilterStatus.map((tour) => (
                  <MenuItem key={tour} value={tour}>{tour}</MenuItem>
                ))}              
              </MytournamentSelect>
            </FormControl>
          </div>
          <div className={styles.select_box}>
            <FormControl>
            <InputLabel shrink>日程</InputLabel>
              <MyDaySelect 
                defaultValue={"すべて"} 
                label="日程"
                notched
                value={dayFilter}
                onChange={(e)=>handleChangeDayFilter(e)}
              >
                {tourSchedule.map((day) => (
                  <MenuItem key={day.schedule} value={day.schedule}>{day.schedule}</MenuItem>
                ))}  
              </MyDaySelect>
            </FormControl>
          </div>
        </div>
        <div className={styles.container}>
          <PhotoList />
        </div>
        <div className={styles.pagination}>
          <PhotosPagination />
        </div>
      </div>
    </>
  )
}
