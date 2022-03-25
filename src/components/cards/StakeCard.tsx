import { scaleFadeInVariants } from "animation/variants";
import Button from "components/buttons";
import { Icon as LBIcon } from "components/icons/Icon";
import ClaimModal from "components/modals/ClaimModal";
import { motion } from "framer-motion/dist/framer-motion";
import { ReactNode, useState } from "react";

interface StakeCardProps {
	title: string;
	startDate: string;
	endDate: string;
	stakedAmount: string;
	claimableAmount: string;
	days: number;
	claimable?: boolean;
	Icon?: ReactNode;
	handleClaim?: () => void;
}

const StakeCard = ({
	title,
	days,
	Icon,
	handleClaim,
	stakedAmount,
	claimableAmount,
	claimable,
	startDate,
	endDate,
}: StakeCardProps) => {
	return (
		<motion.div variants={scaleFadeInVariants} className="stake-card">
			<div className="stake-card__hero">
				<img src={`/assets/images/${title.toLowerCase()}.png`} alt="" />
				{Icon && Icon}
				<h2>{title}</h2>
				<span>{days} days</span>
			</div>
			<div className="stake-card__body">
				<ul>
					<li>
						{/* <LBIcon name="calendar" primary /> */}
						{startDate} - {endDate}
					</li>

					<li>
						<LBIcon name="money" primary />
						staked {stakedAmount}
					</li>
					<li>
						<hr />
					</li>

					<li>
						<LBIcon name="wizard" primary />
						claim {claimableAmount}
					</li>
				</ul>
				<Button className="uppercase filled" disabled={!claimable} onClick={handleClaim}>
					Claim Now
				</Button>
			</div>
		</motion.div>
	);
};

export default StakeCard;
