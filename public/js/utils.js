// Configuring the notification object
const notyf = new Notyf({
    duration: settings.TOAST.DURATION,
    dismissible: settings.TOAST.DISMISSIBLE,
    position: {
        x: "right",
        y: "bottom",
    },
    types: [["error", "success", "warning"].map((type) => ({ type, className: "toast" }))],
});

const showToast = (message, type) => {
    switch (type) {
        case "success":
            notyf.success(message);
        case "error":
            notyf.error(message);
        case "warning":
            notyf.warning(message);
    }
};
