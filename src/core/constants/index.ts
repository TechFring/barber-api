const open = new Date();
open.setHours(8, 0, 0, 0);

const close = new Date();
close.setHours(20, 0, 0, 0);

export const openingHours = {
	open,
	close,
};
