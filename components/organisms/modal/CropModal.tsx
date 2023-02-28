import { useRecoilState } from 'recoil';
import Cropper,{ Area, MediaSize } from 'react-easy-crop';

import Slider from '@mui/material/Slider';

import styles from '../../../styles/cropModal.module.css'
import { cropModalShowState } from '../../../state/cropModalShowState';
import { MyMuiCloseIcon } from '../../atoms/icons/MyMuiCloseIcon';
import { ASPECT_RATIO, CROP_WIDTH } from '../../../const/cropValue';
import { MyMuiRoundButton } from '../../atoms/buttons/MyMuiRoundButton';



type Props = {
  crop: {
    x: number;
    y: number;
  };
  setCrop: (crop: { x: number; y: number }) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
  imgSrc: string;
  showCroppedImage: () => void;
  onMediaLoaded: (mediaSize: MediaSize) => void;
  minZoom: number;
};

const CropModal = ({
  crop,
  setCrop,
  onCropComplete,
  setZoom,
  zoom,
  imgSrc,
  showCroppedImage,
  onMediaLoaded,
  minZoom
}:Props) => {
  
  // クロップモーダルの値をrecoilで管理
  const [cropModalShow, setCropModalShow] = useRecoilState(cropModalShowState);

  // モーダルウィンドウを閉じる関数
  const closeCropModal = () => {
    setCropModalShow(false);
  };

  if(cropModalShow){
    return (
      <>
        <div id={styles.crop_modal}>
          <div id={styles.crop_modal_content}>
            <MyMuiCloseIcon onClick={closeCropModal}/>
            <div className={styles.crop_container_outline}>
              <div className={styles.crop_container}>
                <div >
                  <Cropper 
                    image={imgSrc}
                    crop={crop}
                    onCropChange={setCrop}
                    zoom={zoom}
                    onZoomChange={setZoom}
                    minZoom={minZoom}
                    maxZoom={minZoom + 8}
                    aspect={1}
                    onCropComplete={onCropComplete}
                    cropShape={'round'}
                    showGrid={true}
                    cropSize={{
                      width: CROP_WIDTH,
                      height: CROP_WIDTH / ASPECT_RATIO
                    }}
                    onMediaLoaded={onMediaLoaded}

                  />
                </div>
              </div>

            </div>
            <div className={styles.slider}>
              <Slider
                min={minZoom}
                value={zoom}
                max={minZoom + 3}
                step={0.1}
                onChange={(e, value) => {
                  if (typeof value === "number") {
                    setZoom(value);
                  }
                }}
              />
            </div>
            <MyMuiRoundButton 
              onClick={() => {
                showCroppedImage();
                closeCropModal();
              }}
            >OK</MyMuiRoundButton>
          </div>
        </div>
      </>
    )
  } else {
    return null;
  }
}

export default CropModal