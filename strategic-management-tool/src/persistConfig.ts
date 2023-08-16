import { PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { RootState } from "./app/store";

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
  // Add other configuration options if needed
};

export default persistConfig;
