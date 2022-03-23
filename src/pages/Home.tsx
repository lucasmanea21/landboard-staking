import { useGetAccountInfo } from "@elrondnetwork/dapp-core";
import { ContractCallPayloadBuilder } from "@elrondnetwork/erdjs/out";
import { fadeInVariants, motionContainerProps } from "animation/variants";
import StakeContract from "api";
import axios from "axios";
import Button from "components/buttons";
import TokenPicker from "components/buttons/TokenPicker";
import PlanCard from "components/cards";
import { Icon } from "components/icons/Icon";
import Input from "components/input";
import { motion } from "framer-motion/dist/framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useMedia } from "react-use";

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
	const isMobile = useMedia("(max-width: 768px)");

	const [stakedQuantity, setStakedQuantity] = useState("");
	const [referralCode, setReferralCode] = useState("");
	const [token, setToken] = useState("LAND");
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

	const handleStake = () => {
		stakeContract?.createStakeTransaction();
	};

	const handleSwitchToken = (token: string) => setToken(token);

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
			stakeContract.getStakeTypes().then((res: any) => {});
		}
	}, [stakeContract]);

	const plans = useMemo(() => landPlans.map((p) => ({ ...p, apr: token === "LAND" ? p.apr : p.apr * 0.75 })), [token]);
	console.log("plans", plans);
	const disabled = true || stakedQuantity === "0" || !stakedQuantity || !address || totalLandBalance < 1000;

	return (
		<motion.div className="home" {...motionContainerProps}>
			<div className="stake-container">
				<div className="home__title">
					<motion.h1 variants={fadeInVariants}>
						EARN - STAKE YOUR <span className="text-purple">{token}</span>
					</motion.h1>
					<motion.p variants={fadeInVariants}>Starts on 20 March 2022 20:00 UTC</motion.p>
				</div>
				<TokenPicker token={token} tokens={["LAND", "LKLAND"]} onClick={handleSwitchToken} />
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
						placeholder="TOTHEMOON"
						label="Referral Code"
						value={referralCode}
						onChange={handleChangeReferralCode}
					/>
					{address && (
						<motion.p variants={fadeInVariants} className="home__form--balance">
							{token} Balance: <span>{totalLandBalance}</span>
						</motion.p>
					)}
					<motion.div variants={fadeInVariants} className="home__form--info">
						<Icon name="info" primary />
						{totalLandBalance > 0 ? (
							<span>
								There will be a 5 days unbonding time and 30% penalty on rewards for withdrawing before the chosen
								timestamp ends.
							</span>
						) : (
							<a href="https://presale.landboard.io">
								<span>No {token}, no problem, buy some in the presale here.</span>
							</a>
						)}
					</motion.div>
					<Button className="filled" onClick={handleStake} disabled={disabled} animate>
						Stake Now
					</Button>
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
						{plans.map((plan) => (
							<PlanCard
								{...plan}
								key={plan.title}
								isActive={activeDay === plan.days}
								Icon={<Icon name={plan.title.toLowerCase()} primary />}
								handleSelect={() => setActiveDay(plan.days)}
							/>
						))}
					</motion.div>
				</div>
			</motion.div>
		</motion.div>
	);
};

export default Home;
