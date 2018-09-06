export interface ModalWindowMessage {
	title: string;
	message: string;
}

export interface ModalWindowConfirm {
	title: string;
	message: string;
	callbackOnAccept: Function;
	callbackOnCancel?: Function;
}