import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion/dist/framer-motion";
import { motionContainerProps } from "animation/variants";

interface CheckboxProps {
	label: string;
	defaultChecked?: boolean;
	onChange?: (value: boolean) => void;
}

const Checkbox = ({ onChange, label, defaultChecked }: CheckboxProps) => {
	const [isChecked, setIsChecked] = useState(defaultChecked);
	const pathLength = useMotionValue(0);
	const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

	useEffect(() => {
		setIsChecked(defaultChecked);
	}, [defaultChecked]);

	const handleChange = () => {
		setIsChecked(!isChecked);
		if (onChange) onChange(!isChecked);
	};

	return (
		<motion.div className="lboard-checkbox-container" onTap={handleChange} {...motionContainerProps}>
			<motion.div
				className="lboard-checkbox-box"
				animate={{
					backgroundColor: isChecked ? "#8E2DE2" : "#14073B",
				}}
				initial={false}
				transition={{ type: "spring", stiffness: 300, damping: 20 }}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150">
					<motion.path
						d="M38 74.707l24.647 24.646L116.5 45.5"
						fill="transparent"
						strokeWidth="20"
						stroke="#14073B"
						strokeLinecap="round"
						initial={{ pathLength: 1, opacity: 1 }}
						animate={{ pathLength: isChecked ? 1 : 0 }}
						style={{ pathLength, opacity }}
					/>
				</svg>
			</motion.div>
			<span>{label}</span>
		</motion.div>
	);
};

export default Checkbox;
