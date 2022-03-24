import { useGetAccountInfo, useGetNetworkConfig } from "@elrondnetwork/dapp-core";
import { fadeInVariants, motionContainerProps } from "animation/variants";
import axios from "axios";
import Button from "components/buttons";
import TokenPicker from "components/buttons/TokenPicker";
import PlanCard from "components/cards";
import CheckboxGroup from "components/checkbox/CheckboxGroup";
import { Icon } from "components/icons/Icon";
import Input from "components/input";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMedia } from "react-use";
import useStakeContract from "utils/useStakeContract";

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

const LabelButton = (props: any) => (
	<button
		type="button"
		className="flex px-2 py-1 text-sm font-bold uppercase rounded bg-purple-darker text-purple"
		{...props}>
		Max
	</button>
);

const lklandOptions = [
	{
		label: "LKLAND-6cf78e",
		value: "LKLAND-6cf78e",
		checked: true,
	},
	{
		label: "LKLAND-c617f7",
		value: "LKLAND-c617f7",
		checked: false,
	},
];

const Home = () => {
	const { address, account } = useGetAccountInfo();
	const isMobile = useMedia("(max-width: 768px)");
	const { network } = useGetNetworkConfig();
	const [searchParams] = useSearchParams();

	const [stakedQuantity, setStakedQuantity] = useState("");
	const [referralCode, setReferralCode] = useState("");
	const [selectedToken, setSelectedToken] = useState("LAND");
	const [lklandType, setLklandType] = useState<any>("LKLAND-6cf78e");
	const [stakeTypes, setStakeTypes] = useState<any[]>([]);
	const [totalLandBalance, setTotalLandBalance] = useState(0);
	const [totalLkLandBalance, setTotalLkLandBalance] = useState({
		"LKLAND-6cf78e": 0,
		"LKLAND-c617f7": 0,
	});
	const [activeDay, setActiveDay] = useState(15);
	const { stakeContract } = useStakeContract();

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

	const handleStake = () => {
		stakeContract?.createStakeTransaction();
	};

	const handleSwitchToken = (token: string) => setSelectedToken(token);

	useEffect(() => {
		setReferralCode(searchParams.get("referral") ?? "");
	}, [searchParams]);

	useEffect(() => {
		if (account.address != "") {
			axios.get(`${network.apiAddress}/accounts/${account.address}/tokens`).then((res: any) => {
				if (res.data?.length > 0) {
					const tokens = res.data.filter((a: any) => a?.identifier === "LAND-40f26f" || a?.ticker === "LAND-40f26f");
					const lkLand1 = res.data.filter((a: any) => a?.identifier === "LKLAND-6cf78e");
					const lkLand2 = res.data.filter((a: any) => a?.identifier === "LKLAND-c617f7");
					setTotalLandBalance(tokens.length > 0 ? tokens[0].balance / 10 ** 18 : 0);
					setTotalLkLandBalance({
						"LKLAND-6cf78e": lkLand1.length > 0 ? lkLand1[0].balance / 10 ** 18 : 0,
						"LKLAND-c617f7": lkLand2.length > 0 ? lkLand2[0].balance / 10 ** 18 : 0,
					});
				}
			});
		}
	}, [account]);

	useEffect(() => {
		if (stakeContract) {
			stakeContract.getStakeTypes().then((stakeTypes: any) => {
				console.log("stakeTypes", stakeTypes[0]);
				console.log("stakeTypes", stakeTypes[0].apy.valueOf());
				setStakeTypes(stakeTypes);
			});
			// const stakerAddresses = await stakeContract.getStakerAddresses();
			// const nodesPerStaker = await stakeContract.getNodesPerStaker();
		}
	}, [stakeContract]);

	const plans = useMemo(
		() =>
			landPlans
				.filter((_, index) => (selectedToken === "LKLAND" ? index > 0 : true))
				.map((p) => ({ ...p, apr: selectedToken === "LAND" ? p.apr : p.apr * 0.25 })),
		[selectedToken]
	);

	// @ts-ignore
	const balance = selectedToken === "LAND" ? totalLandBalance : totalLkLandBalance[lklandType];
	const disabled = true || stakedQuantity === "0" || !stakedQuantity || !address || balance < 1000;

	const handleSelectLkLand = (options: any[]) => {
		setLklandType(options.filter((a: any) => a.checked)[0].value);
	};

	return (
		<motion.div className="home" {...motionContainerProps}>
			<div className="stake-container">
				<div className="home__title">
					<motion.h1 variants={fadeInVariants}>
						EARN - STAKE YOUR <span className="text-purple">{selectedToken}</span>
					</motion.h1>
					<motion.p variants={fadeInVariants}>Starts on 25 March 2022</motion.p>
				</div>
				<TokenPicker token={selectedToken} tokens={["LAND", "LKLAND"]} onClick={handleSwitchToken} />
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
											value: balance < 10000 ? balance : 10000,
										},
									})
								}
							/>
						}
					/>
					{selectedToken === "LAND" && (
						<motion.span className="text-sm text-purple" ariants={fadeInVariants}>
							Stake at least 300 land in order to use referral code. Referral code can only be used once
						</motion.span>
					)}
					<AnimatePresence>
						{selectedToken === "LAND" && (
							<Input
								placeholder="TOTHEMOON"
								label="Referral Code"
								value={referralCode}
								onChange={handleChangeReferralCode}
							/>
						)}
					</AnimatePresence>
					{address && (
						<motion.p variants={fadeInVariants} className="home__form--balance">
							{selectedToken === "LAND" ? "LAND" : lklandType} Balance: <span>{balance}</span>
						</motion.p>
					)}
					<AnimatePresence>
						{selectedToken !== "LAND" && (
							<CheckboxGroup label="Tokens" options={lklandOptions} onChange={handleSelectLkLand} single />
						)}
					</AnimatePresence>
					<motion.div variants={fadeInVariants} className="home__form--info">
						<Icon name="info" primary />
						{balance > 0 ? (
							<span>
								There will be a 5 days unbonding time and 30% penalty on rewards for withdrawing before the chosen
								timestamp ends.
							</span>
						) : (
							<a href="https://presale.landboard.io">
								<span>No {selectedToken}, no problem, buy some in the presale here.</span>
							</a>
						)}
					</motion.div>
					{!isMobile && (
						<Button className="filled" onClick={handleStake} disabled={disabled} animate>
							Stake Now
						</Button>
					)}
				</motion.div>
			</div>

			<motion.div className="home__title">
				<motion.h1 variants={fadeInVariants}>
					CHOOSE YOUR <span className="text-purple">PLAN</span>
				</motion.h1>
				<motion.p variants={fadeInVariants}>Become a marketing guru through land advertisement</motion.p>
				<motion.span className="mb-2 text-sm" variants={fadeInVariants}>
					Check APRs for each plan{" "}
					<a className="underline text-purple" href="https://twitter.com/landboard_io/status/1505272042114924547">
						here.
					</a>
				</motion.span>
				<div className="plan-grid">
					<motion.div
						className="plan-grid__content"
						drag={isMobile ? "x" : false}
						dragConstraints={{ left: -800, right: 20 }}>
						<AnimatePresence>
							{plans.map((plan) => (
								<PlanCard
									{...plan}
									key={plan.title}
									isActive={activeDay === plan.days}
									Icon={<Icon name={plan.title.toLowerCase()} primary />}
									handleSelect={() => setActiveDay(plan.days)}
								/>
							))}
						</AnimatePresence>
					</motion.div>
				</div>
				{isMobile && (
					<Button className="filled" containerClassname="mobile-size" onClick={handleStake} disabled={disabled} animate>
						Stake Now
					</Button>
				)}
			</motion.div>
		</motion.div>
	);
};

export default Home;
