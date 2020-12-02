import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IsUploaded {
  isUploaded: boolean
  assetID: string
}

export interface IsPreloaded {
  isPreloaded: boolean
  videoURL: string
  imageURLs: Array<string>
}

export type UploadState = IsUploaded & IsPreloaded;

const initialState: UploadState = {
  isUploaded: false,
  isPreloaded: false,
  assetID: '',
  videoURL: '',
  imageURLs: []
}

const uploadSlice = createSlice ({
  name: 'upload',
  initialState,
  reducers: {
    setIsUploaded (state, action: PayloadAction<IsUploaded>) {
      state.isUploaded = true;
      state.assetID = action.payload.assetID;
    },
    setIsPreloaded (state, action: PayloadAction<IsPreloaded>) {
      state.isPreloaded = true;
      state.videoURL = action.payload.videoURL;
      state.imageURLs = action.payload.imageURLs;
    }   
  }
});

export const {
  setIsUploaded,
  setIsPreloaded
} = uploadSlice.actions;

export type SetIsUploaded = ReturnType <typeof setIsUploaded>;
export type SetIsPreloaded = ReturnType <typeof setIsPreloaded>;

export default uploadSlice.reducer;