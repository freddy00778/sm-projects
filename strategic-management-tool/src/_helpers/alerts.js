import {toast} from "react-toastify";

const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 5000));

export const promiseToast = (pending, successMessage) => toast.promise(
    resolveAfter3Sec,
    {
        pending: pending,
        success: `${successMessage} 👌`,
        error: `Failed! 🤯`
    }
)