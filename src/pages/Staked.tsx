import { useGetAccountInfo, useGetLoginInfo } from "@elrondnetwork/dapp-core";
import StakeCard from "components/cards/StakeCard";
import { Icon } from "components/icons/Icon";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";
import { fadeInVariants, motionContainerProps } from "animation/variants";
import Dracula from "components/icons/Dracula";
import Button from "components/buttons";
import useStakeContract from "utils/useStakeContract";
import ClaimModal from "components/modals/ClaimModal";

const Staked = () => {
	const { isLoggedIn } = useGetLoginInfo();
	const { stakeContract } = useStakeContract();
	const { address } = useGetAccountInfo();
	const navigate = useNavigate();

	const [stakedNodes, setStakeNodes] = useState([]);
	const [selectedNode, setSelectedNode] = useState(null);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		if (!isLoggedIn) {
			navigate("/");
		}
	}, [isLoggedIn]);

	useEffect(() => {
		if (address && stakeContract) {
			stakeContract?.getNodesPerStaker().then((nodes) => {
				setStakeNodes(nodes);
			});
		}
	}, [address]);

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
				<Dracula />
				<motion.p variants={fadeInVariants}>No staked land yet, stake some now!</motion.p>
				<Button className="btn filled" onClick={() => navigate("/")}>
					STAKE NOW
				</Button>
				{stakedNodes.map((node) => (
					<StakeCard
						title="Lander"
						days={15}
						stakedAmount="1000 LAND"
						claimableAmount="1500 LAND"
						startDate="2022-03-20"
						endDate="2022-04-6"
						Icon={<Icon name="lander" primary />}
						handleClaim={() => {
							setSelectedNode(node);
							setShowModal(true);
						}}
						claimable
					/>
				))}
			</div>
			<AnimatePresence>
				{showModal && (
					<ClaimModal
						{...selectedNode}
						title="Lander"
						onClose={() => {
							setShowModal(false);
							setSelectedNode(null);
						}}
					/>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

export default Staked;
