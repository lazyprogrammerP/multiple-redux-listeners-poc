import React from "react";
import { useDispatch } from "react-redux";
import useNotificationUtils from "../reducers/notifications/notifications.actions";
import { PUSH_DIALOG } from "../reducers/notifications/notifications.reducer";

const Temp = () => {
  const dispatch = useDispatch(); // Temp

  const { dialogs, pushToDialogs } = useNotificationUtils();

  return (
    <div>
      <button
        onClick={() =>
          pushToDialogs({
            title: "Error",
            msg: "Some error :(",
            actions: [
              {
                name: "Okay",
                value: "callApi",
              },
              {
                name: "Cancel",
                value: "discardChanges",
              },
            ],
          })
        }
      >
        Push To Dialog
      </button>
      {Object.keys(dialogs).length && (
        <button
          onClick={() => {
            // Temp
            dispatch({
              type: PUSH_DIALOG,
              payload: {
                ...dialogs,
                [Object.keys(dialogs)[0]]: {
                  ...dialogs[Object.keys(dialogs)[0]],
                  performedAction: "someAction",
                },
              },
            });
          }}
        >
          Update Dialog {Object.keys(dialogs)[0]}
        </button>
      )}
    </div>
  );
};

export default Temp;
