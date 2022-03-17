export const defaultMotionContainerProps = {
	initial: "hidden",
	whileInView: "visible",
	viewport: { once: true },
};

export const motionSlideUpContainerProps = {
	...defaultMotionContainerProps,
	variants: {
		hidden: {
			y: "100%",
			opacity: 0,
		},
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				delayChildren: 0.5,
				staggerChildren: 0.5,
			},
		},
	},
};

export const motionContainerProps = {
	...defaultMotionContainerProps,
	variants: {
		hidden: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
			transition: {
				delayChildren: 0.5,
				staggerChildren: 0.5,
			},
		},
	},
};

export const fadeInVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
	},
};

export const scaleFadeInVariants = {
	hidden: {
		opacity: 0,
		scale: 0,
	},
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.5,
		},
	},
};

export const scaleInVariants = {
	hidden: {
		scale: 0,
	},
	visible: {
		scale: 1,
	},
};

export const slideUpMenuVariants = {
	expanded: {
		y: "20px",
	},
	collapsed: {
		y: "320px",
	},
};
