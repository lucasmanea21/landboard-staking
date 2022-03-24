import { useGetAccountInfo, useGetLoginInfo } from "@elrondnetwork/dapp-core";
import { copyButtonVariants, fadeInVariants, motionContainerProps } from "animation/variants";
import axios from "axios";
import Dracula from "components/icons/Dracula";
import { Icon } from "components/icons/Icon";
import Input from "components/input";
import { motion } from "framer-motion/dist/framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CopyButton = ({ onClick }: any) => {
	const [active, setActive] = useState(false);

	const handleClick = (e: any) => {
		setActive(true);
		setTimeout(() => {
			setActive(false);
		}, 1000);
		onClick && onClick(e);
	};

	return (
		<div className="cursor-pointer">
			<svg
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				onClick={handleClick}>
				<motion.path
					variants={copyButtonVariants}
					animate={active ? "active" : "inactive"}
					d="M11.6665 6.66667H3.33317C2.414 6.66667 1.6665 7.41417 1.6665 8.33334V16.6667C1.6665 17.5858 2.414 18.3333 3.33317 18.3333H11.6665C12.5857 18.3333 13.3332 17.5858 13.3332 16.6667V8.33334C13.3332 7.41417 12.5857 6.66667 11.6665 6.66667Z"
					fill="white"
				/>
				<motion.path
					variants={copyButtonVariants}
					animate={active ? "active" : "inactive"}
					d="M16.6665 1.66667H8.33317C7.89114 1.66667 7.46722 1.84227 7.15466 2.15483C6.8421 2.46739 6.6665 2.89131 6.6665 3.33334V5.00001H13.3332C13.7752 5.00001 14.1991 5.1756 14.5117 5.48816C14.8242 5.80072 14.9998 6.22464 14.9998 6.66667V13.3333H16.6665C17.1085 13.3333 17.5325 13.1577 17.845 12.8452C18.1576 12.5326 18.3332 12.1087 18.3332 11.6667V3.33334C18.3332 2.89131 18.1576 2.46739 17.845 2.15483C17.5325 1.84227 17.1085 1.66667 16.6665 1.66667Z"
					fill="white"
				/>
			</svg>
		</div>
	);
};

const Referrals = () => {
	const [heroTag, setHeroTag] = useState("");
	const { isLoggedIn } = useGetLoginInfo();
	const { account } = useGetAccountInfo();
	const navigate = useNavigate();
	console.log("account", account);
	useEffect(() => {
		if (!isLoggedIn) {
			navigate("/");
		}
	}, [isLoggedIn]);

	useEffect(() => {
		if (account.address != "") {
			axios.get(`https://api.elrond.com/accounts/${account.address}`).then((res: any) => {
				setHeroTag(res.data?.username);
			});
		}
	}, [account]);

	if (!isLoggedIn) return null;

	const referralCode = heroTag ?? account.address;

	return (
		<motion.div className="staked" {...motionContainerProps}>
			<motion.div className="home__title">
				<motion.h1 variants={fadeInVariants}>
					REFERRAL <span className="text-purple">&</span> REWARDS
				</motion.h1>
				<motion.p variants={fadeInVariants}>Share your code (herotag or address) and get awesome rewards</motion.p>
			</motion.div>

			<div className="rewards-container">
				<Input
					placeholder="0"
					className="text-purple"
					label="Referral Code"
					value={referralCode}
					readOnly
					LabelButton={
						<CopyButton
							onClick={() => {
								try {
									navigator.clipboard.writeText(
										`Hey! I am staking my Landboard tokens for up to 60% APR. You should try it too! Use my referral code for bonuses: ` +
											referralCode
									);
								} catch (err) {
									console.error("Failed to copy text: ", err);
								}
							}}
						/>
					}
				/>
				<motion.h2 className="font-bold text-xl" variants={fadeInVariants}>
					YOUR REWARDS
				</motion.h2>
				<motion.ul variants={fadeInVariants} className="rewards-list">
					<li>
						<Icon primary name="lander" />0 referred stakers
					</li>
					<li>
						<Icon primary name="money" />
						0% APR increase
					</li>
					<li>
						<Icon primary name="gift" />
						earned 0 LAND
					</li>
				</motion.ul>
			</div>
		</motion.div>
	);
};

export default Referrals;
