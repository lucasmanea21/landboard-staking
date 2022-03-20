import { useGetAccountInfo, useGetLoginInfo } from "@elrondnetwork/dapp-core";
import StakeCard from "components/cards/StakeCard";
import { Icon } from "components/icons/Icon";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion/dist/framer-motion";
import { fadeInVariants, motionContainerProps } from "animation/variants";

const Staked = () => {
	const { isLoggedIn } = useGetLoginInfo();
	const { address, account } = useGetAccountInfo();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoggedIn) {
			navigate("/");
		}
	}, [isLoggedIn]);

	if (!isLoggedIn) return null;

	return (
		<motion.div className="staked" {...motionContainerProps}>
			<motion.div className="home__title">
				<motion.h1 variants={fadeInVariants}>
					YOUR STAKED <span className="text-purple">LAND</span>
				</motion.h1>
				<motion.p variants={fadeInVariants}>Stake your way to fortune in the marketing metaverse.</motion.p>
			</motion.div>

			<div className="staked-grid">
				<StakeCard
					title="Lander"
					days={15}
					stakedAmount="1000 LAND"
					claimableAmount="1500 LAND"
					startDate="2022-03-20"
					endDate="2022-04-6"
					Icon={<Icon name="lander" primary />}
					claimable
				/>
				<StakeCard
					title="Landlord"
					days={60}
					stakedAmount="1000 LAND"
					claimableAmount="1500 LAND"
					startDate="2022-03-20"
					endDate="2022-04-6"
					Icon={<Icon name="cyborg" primary />}
				/>
				<StakeCard
					title="Cyborg"
					days={240}
					stakedAmount="1000 LAND"
					claimableAmount="1500 LAND"
					startDate="2022-03-20"
					endDate="2022-04-6"
					Icon={<Icon name="cyborg" primary />}
				/>
			</div>
		</motion.div>
	);
};

export default Staked;
