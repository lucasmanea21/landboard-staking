import { fadeInVariants, scaleFadeInVariants } from "animation/variants";
import { motion } from "framer-motion/dist/framer-motion";

interface TokenPickerProps {
	token: string;
	tokens: string[];
	onClick: (token: string) => void;
}

const TokenPicker = ({ onClick, token, tokens }: TokenPickerProps) => {
	return (
		<div className="token-picker">
			{tokens.map((tkn, i) => (
				<motion.button
					key={tkn}
					variants={scaleFadeInVariants}
					className={`token-picker__button ${tkn === token ? "active" : ""}`}
					onClick={() => onClick(tkn)}>
					STAKE {tkn}
				</motion.button>
			))}
			<motion.div className="token-picker__line" variants={fadeInVariants}></motion.div>
		</div>
	);
};

export default TokenPicker;
