import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

const defaultConfig = {
	swipeClose: true,
	showCloseButton: true,
	timeout: 3000,
	showIcon: true,
	hideProgressBar: true,
	style: {
		fontFamily: "Poppins",
	},
	position: "bottom-right",
};

export const toastError = (title, description) => {
	createToast(
		{
			title,
			description,
		},
		{
			...defaultConfig,
			toastBackgroundColor: "#d73838",
			type: "danger",
			transition: "slide",
		}
	);
};

export const toastSuccess = (title, description) => {
	createToast(
		{
			title,
			description,
		},
		{
			...defaultConfig,
			toastBackgroundColor: "#43aa48",
			type: "success",
			transition: "slide",
		}
	);
};
