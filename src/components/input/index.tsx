import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	LabelButton?: React.ReactNode;
}

const Input = ({ label, name, LabelButton, ...rest }: InputProps) => {
	return (
		<label className="input-container" htmlFor={name}>
			<div className="flex items-center justify-between w-full">
				<span className="font-bold uppercase">{label}</span>
				{LabelButton}
			</div>
			<span className="font-bold">{label}</span>
			<input type="text" {...rest} />
		</label>
	);
};

export default Input;
