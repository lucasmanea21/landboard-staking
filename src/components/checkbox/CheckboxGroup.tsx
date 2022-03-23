import { useEffect, useState } from "react";
import Checkbox from ".";

interface CheckboxGroupProps {
	label: string;
	options: any[];
	info?: string;
	single?: boolean;
	onChange?: (option: any[]) => void;
}

const CheckboxGroup = ({ label, info, options, onChange, single }: CheckboxGroupProps) => {
	const [checkboxOptions, setCheckboxOptions] = useState<any[]>(options);

	useEffect(() => {
		setCheckboxOptions(options);
	}, [options]);

	const handleCheck = (option: any, isChecked: boolean) => {
		const newChecked = checkboxOptions.map((checked) =>
			checked.value === option.value
				? { ...checked, checked: isChecked }
				: { ...checked, checked: !single ? checked.checked : false }
		);
		setCheckboxOptions(newChecked);
		if (onChange) onChange(newChecked);
	};

	return (
		<div className="lboard-checkbox-group">
			<label>
				<span>{label}</span>
				{info && <span className="text-gray-dark">{info}</span>}
			</label>
			{checkboxOptions.map((option) => (
				<Checkbox
					key={option.value}
					onChange={(isChecked) => handleCheck(option, isChecked)}
					defaultChecked={option.checked}
					label={option.label}
				/>
			))}
		</div>
	);
};

export default CheckboxGroup;
