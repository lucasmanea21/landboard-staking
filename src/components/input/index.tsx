import React from "react";
import { motion } from "framer-motion/dist/framer-motion";
import { scaleFadeInVariants } from "animation/variants";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	LabelButton?: React.ReactNode;
}

const Input = ({ label, name, LabelButton, ...rest }: InputProps) => {
	return (
		<motion.label variants={scaleFadeInVariants} exit="hidden" className="input-container" htmlFor={name}>
			<div className="flex items-center justify-between w-full">
				<span className="font-bold">{label}</span>
				{LabelButton}
			</div>
			<input type="text" {...rest} />
		</motion.label>
	);
};

export default Input;
