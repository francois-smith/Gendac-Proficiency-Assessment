import { toast } from 'react-toastify';

/**
 * Utility class for toasts, used to display messages to the user. 
 * Can easily be expanded to add more toast types.
 */

const showErrorToast = (message: string): void => {
    toast.dismiss();
    toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}

const showSuccessToast = (message: string): void => {
    toast.dismiss();
    toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}

const Toasts = {
    showErrorToast,
    showSuccessToast
}

export default Toasts;
