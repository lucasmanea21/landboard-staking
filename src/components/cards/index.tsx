import { scaleFadeInVariants } from "animation/variants";
import Button from "components/buttons";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";
import { ReactNode } from "react";
import { Icon as LBIcon } from "components/icons/Icon";

interface PlanCardProps {
	title: string;
	days: number;
	apr: number;
	stakedLand?: number;
	isActive: boolean;
	Icon?: ReactNode;
	handleSelect?: () => void;
}

const CheckMark = () => {
	return (
		<motion.svg
			className="check-mark"
			animate="visible"
			variants={scaleFadeInVariants}
			initial="hidden"
			exit="hidden"
			width="32"
			height="32"
			viewBox="0 0 32 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<rect width="32" height="32" rx="16" fill="url(#paint0_linear_688_1541)" />
			<g clip-path="url(#clip0_688_1541)">
				<path
					d="M12.8068 19.49L8.60093 15.2841L6.79492 17.0901L12.8068 23.102L25.2049 10.704L23.3989 8.89796L12.8068 19.49Z"
					fill="#14073B"
				/>
			</g>
			<defs>
				<linearGradient
					id="paint0_linear_688_1541"
					x1="0.457143"
					y1="1.66667"
					x2="17.5686"
					y2="37.5487"
					gradientUnits="userSpaceOnUse">
					<stop stop-color="#8E2DE2" />
					<stop offset="1" stop-color="#4A00E0" />
					<stop offset="1" stop-color="#4A00E0" />
				</linearGradient>
				<clipPath id="clip0_688_1541">
					<rect width="18.41" height="20.2041" fill="white" transform="translate(6.79492 5.89796)" />
				</clipPath>
			</defs>
		</motion.svg>
	);
};

const PlanCard = ({ title, days, apr, isActive, Icon, handleSelect, stakedLand }: PlanCardProps) => {
	return (
		<motion.div
			variants={scaleFadeInVariants}
			{...{ initial: "hidden", whileInView: "visible", viewport: { once: true } }}
			className={`plan-card ${isActive ? "active" : ""}`}>
			<AnimatePresence>{isActive ? <CheckMark /> : null}</AnimatePresence>
			{Icon && Icon}
			<h2>{title}</h2>
			<ul>
				<li className="plan-card__days">
					<LBIcon name="calendar_star" primary />
					<span>{days} days</span>
				</li>
				<li className="plan-card__apr">
					<LBIcon name="money" primary />
					<span>APR: {apr}%</span>
				</li>
			</ul>
			<Button onClick={handleSelect} className={isActive ? "filled" : "outline"}>
				{isActive ? "Selected" : "Select"}
			</Button>
			{stakedLand && (
				<div className="plan-card__staked-info">
					<LBIcon name="info" primary width={24} />
					<span>{stakedLand} LAND staked </span>
				</div>
			)}
		</motion.div>
	);
};

export default PlanCard;
