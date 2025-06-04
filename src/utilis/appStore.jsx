import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice_temp";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice"

const appStore = configureStore({
reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
},
});

export default appStore;