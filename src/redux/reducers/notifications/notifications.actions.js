import { useDispatch, useSelector, useStore } from "react-redux";
import watch from "redux-watch";
import { v4 } from "uuid";
import { PUSH_DIALOG } from "./notifications.reducer";

const useNotificationUtils = () => {
  const store = useStore();
  const dispatch = useDispatch();

  const dialogs = useSelector((state) => state.notifications.dialogs);

  //   const removeFromDialogs = (dialogUuid) => {
  //     const newDialogs = dialogs;
  //     delete newDialogs[dialogUuid];

  //     dispatch({
  //       type: PUSH_DIALOG,
  //       payload: newDialogs,
  //     });

  //     console.log({
  //       type: PUSH_DIALOG,
  //       payload: newDialogs,
  //     });
  //   };

  const pushToDialogs = (dialogConfig) => {
    let dialogUuid = v4();
    let dialogPayload = {
      ...dialogConfig,
      performedAction: null,
    };

    dispatch({
      type: PUSH_DIALOG,
      payload: { ...dialogs, [dialogUuid]: dialogPayload },
    });

    let watcher = watch(
      store.getState,
      `notifications.dialogs.${dialogUuid}`,
      (a, b) => JSON.stringify(a) === JSON.stringify(b)
    );
    store.subscribe(
      watcher((newVal, oldVal, objectPath) => {
        console.log(
          "%s changed from %s to %s",
          objectPath,
          JSON.stringify(oldVal),
          JSON.stringify(newVal)
        );

        removeFromDialogs(dialogUuid);
      })
    );
  };

  const removeFromDialogs = (dialogUuid) => {
    const newDialogs = store.getState()["notifications"]["dialogs"];
    delete newDialogs[dialogUuid];

    console.log(Object.keys(newDialogs));

    dispatch({
      type: PUSH_DIALOG,
      payload: newDialogs,
    });
  };

  return {
    dialogs,
    pushToDialogs,
  };
};

export default useNotificationUtils;
