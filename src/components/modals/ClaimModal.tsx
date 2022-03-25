import Button from "components/buttons";
import { ReactNode } from "react";
import { motion } from "framer-motion/dist/framer-motion";
import { scaleFadeInVariants } from "animation/variants";

interface ClaimModalProps {
	title: string;
	Icon?: ReactNode;
	startDate: string;
	endDate: string;
	stakedAmount: string;
	claimableAmount: string;
	apr: string;
	claimable: boolean;
	onClose: () => void;
}

const landPlans = [
	{
		title: "Lander",
		days: 15,
		apr: 50,
	},
	{
		title: "Fan",
		days: 30,
		apr: 52,
	},
	{
		title: "LandLord",
		days: 60,
		apr: 55,
	},
	{
		title: "Wizard",
		days: 120,
		apr: 58,
	},
	{
		title: "Cyborg",
		days: 240,
		apr: 64,
	},
];

const ClaimModal = ({
	title,
	Icon,
	startDate,
	endDate,
	stakedAmount,
	claimableAmount,
	claimable,
	apr,
	onClose,
}: Partial<ClaimModalProps>) => {
	return (
		<div className="lboard-modal">
			<motion.div className="lboard-modal__content" variants={scaleFadeInVariants}>
				<div className="lboard-modal__header">
					{title && <img src={`/assets/images/${title.toLowerCase()}.png`} alt="" />}
					{Icon && Icon}
					<h2>{title}</h2>
				</div>
				<div className="lboard-modal__body">
					<ul>
						<li>
							<span>Staked</span>
							<span>1500 LAND</span>
						</li>
						<li>
							<span>Rewards</span>
							<span>2500 LAND</span>
						</li>
						<li>
							<span>Stake Time</span>
							<span>2500 LAND</span>
						</li>
						<li>
							<span>Unlock Time</span>
							<span>2500 LAND</span>
						</li>
						<li>
							<span>APR</span>
							<span>50%</span>
						</li>
					</ul>
					<div className="lboard-modal__actions">
						<Button className="filled" disabled={!claimable} hideAnimate hideComingSoon>
							Claim Rewards
						</Button>
						<Button className="outline" onClick={onClose} hideAnimate>
							Cancel
						</Button>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default ClaimModal;
