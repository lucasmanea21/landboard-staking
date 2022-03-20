import { useGetAccountInfo } from "@elrondnetwork/dapp-core";
import { fadeInVariants, motionContainerProps } from "animation/variants";
import StakeContract from "api";
import axios from "axios";
import Button from "components/buttons";
import PlanCard from "components/cards";
import { Icon } from "components/icons/Icon";
import Input from "components/input";
import { motion } from "framer-motion/dist/framer-motion";
import { useEffect, useState } from "react";

const plans = [
	{
		title: "Lander",
		days: 15,
	},
	{
		title: "Fan",
		days: 30,
	},
	{
		title: "LandLord",
		days: 60,
	},
	{
		title: "Wizard",
		days: 120,
	},
	{
		title: "Cyborg",
		days: 240,
	},
];

const environment =
	process.env.REACT_APP_ELROND_NETWORK === "mainnet" ? "" : process.env.REACT_APP_ELROND_NETWORK + "-";

const LabelButton = (props: any) => (
	<button
		type="button"
		className="flex px-2 py-1 text-sm font-bold uppercase rounded bg-purple-darker text-purple"
		{...props}>
		Max
	</button>
);

const Home = () => {
	const { address, account, ...rest } = useGetAccountInfo();

	const [stakedQuantity, setStakedQuantity] = useState("");
	const [referralCode, setReferralCode] = useState("");
	const [totalLandBalance, setTotalLandBalance] = useState(0);
	const [activeDay, setActiveDay] = useState(15);
	const [stakeContract, setStakeContract] = useState<null | StakeContract>(null);

	const handleChangeStakedQuantity = (e: any) => {
		const regex = RegExp(/[0-9]+/g);
		const test_result = regex.test(e.target.value);
		let newStakedQuantity = "";

		if (test_result) {
			const value = parseInt(e.target.value);
			if (value > 0 && value <= 20000) {
				newStakedQuantity = e.target.value;
				setStakedQuantity(newStakedQuantity);
			}
		}
		if (e.target.value === "") {
			setStakedQuantity("");
		}
	};

	const handleChangeReferralCode = (e: any) => {
		setReferralCode(e.target.value);
	};

	useEffect(() => {
		if (account.address != "") {
			setStakeContract(new StakeContract(account.address));
			axios.get(`https://${environment}api.elrond.com/accounts/${account.address}/tokens`).then((res: any) => {
				if (res.data?.length > 0) {
					const tokens = res.data.filter((a: any) => a?.identifier === "LAND-40f26f" || a?.ticker === "LAND-40f26f");
					setTotalLandBalance(tokens.length > 0 ? tokens[0].balance / 10 ** 18 : 0);
				}
			});
		}
	}, [account]);

	useEffect(() => {
		if (stakeContract) {
			stakeContract.getStakerAddresses().then((res: any) => {
				console.log("stakerAddresses", res);
			});
		}
	}, [stakeContract]);

	const disabled = stakedQuantity === "0" || !stakedQuantity || !address || totalLandBalance < 1000;

	return (
		<motion.div className="home" {...motionContainerProps}>
			<div className="stake-container">
				<div className="home__title">
					<motion.h1 variants={fadeInVariants}>
						EARN - STAKE YOUR <span className="text-purple">LAND</span>
					</motion.h1>
					<motion.p variants={fadeInVariants}>Starts on 20 March 2022 20:00 UTC</motion.p>
				</div>
				<motion.div className="home__form" onSubmit={() => {}} {...motionContainerProps}>
					<Input
						placeholder="0"
						label="Amount to Stake"
						value={stakedQuantity}
						onChange={handleChangeStakedQuantity}
						LabelButton={
							<LabelButton
								onClick={() =>
									handleChangeStakedQuantity({
										target: {
											value: totalLandBalance < 10000 ? totalLandBalance : 10000,
										},
									})
								}
							/>
						}
					/>
					<Input
						placeholder="erd1dl8ucer...4d74dfqwy7ntn"
						label="Referral Code (Paste address)"
						value={referralCode}
						onChange={handleChangeReferralCode}
					/>
					{address && (
						<motion.p variants={fadeInVariants} className="home__form--balance">
							LAND Balance: <span>{totalLandBalance}</span>
						</motion.p>
					)}
					<motion.div variants={fadeInVariants} className="home__form--info">
						<Icon name="info" primary />
						{totalLandBalance > 0 ? (
							<span>
								There will be a 9 - 10 days unbonding period when you unstake. You will be able to withdraw your funds
								only after that period.
							</span>
						) : (
							<a href="https://presale.landboard.io">
								<span>No LAND, no problem, buy some in the presale here.</span>
							</a>
						)}
					</motion.div>
					<Button className="filled" disabled={disabled} hideComingSoon animate>
						Stake Now
					</Button>
				</motion.div>
			</div>

			<motion.div className="home__title">
				<motion.h1 variants={fadeInVariants}>
					CHOOSE YOUR <span className="text-purple">LAND</span>
				</motion.h1>
				<motion.p variants={fadeInVariants}>Become a marketing guru through land advertisement</motion.p>
				<div className="plan-grid">
					{plans.map((plan) => (
						<PlanCard
							{...plan}
							key={plan.title}
							isActive={activeDay === plan.days}
							Icon={<Icon name={plan.title.toLowerCase()} primary />}
							handleSelect={() => setActiveDay(plan.days)}
						/>
					))}
				</div>
			</motion.div>
		</motion.div>
	);
};

export default Home;
