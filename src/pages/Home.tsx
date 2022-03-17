import { useGetAccountInfo } from "@elrondnetwork/dapp-core";
import { motionContainerProps } from "animation/variants";
import axios from "axios";
import Button from "components/buttons";
import PlanCard from "components/cards";
import { Icon } from "components/icons/Icon";
import Input from "components/input";
import { motion } from "framer-motion/dist/framer-motion";
import { useEffect, useMemo, useState } from "react";

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

	const [stakedQuantity, setStakedQuantity] = useState(0);
	const [totalLandBalance, setTotalLandBalance] = useState(0);
	const [activeDay, setActiveDay] = useState(15);

	const handleChangeStakedQuantity = (e: any) => {
		const regex = RegExp(/[0-9]+/g);
		const test_result = regex.test(e.target.value);

		if ((test_result && e.target.value <= 1) || e.target.value == "") {
			setStakedQuantity(e.target.value);
		}
	};

	useEffect(() => {
		if (account.address != "") {
			axios.get(`https://${environment}api.elrond.com/accounts/${account.address}/tokens`).then((res: any) => {
				if (res.data?.length > 0) {
					const tokens = res.data.filter((a: any) => a?.identifier === "LAND-40f26f" || a?.ticker === "LAND-40f26f");
					setTotalLandBalance(tokens.length > 0 ? tokens[0].balance / 10 ** 18 : 0);
				}
			});
		}
	}, [account]);

	const disabled = stakedQuantity === 0 || !address;
	console.log("stakedQuantity", stakedQuantity);
	return (
		<div className="home">
			<div className="stake-container">
				<div className="home__title">
					<h1>
						EARN - STAKE YOUR <span className="text-purple">LAND</span>
					</h1>
					<p>Starts on 20 March 2022 20:00 UTC</p>
				</div>
				<div className="home__form" onSubmit={() => {}}>
					<Input
						placeholder="0"
						label="Amount to Stake"
						onChange={handleChangeStakedQuantity}
						LabelButton={
							<LabelButton
								onClick={() =>
									handleChangeStakedQuantity({
										target: {
											value: totalLandBalance < 1 ? totalLandBalance : 1,
										},
									})
								}
							/>
						}
					/>
					{address && (
						<p className="home__form--balance">
							LAND Balance: <span>{totalLandBalance}</span>
						</p>
					)}
					<div className="home__form--info">
						<Icon name="info" primary />
						<span>
							There will be a 9 - 10 days unbonding period when you unstake. You will be able to withdraw your funds
							only after that period.
						</span>
					</div>
					<Button className="filled" disabled={disabled} hideComingSoon>
						Stake Now
					</Button>
				</div>
			</div>

			<div className="home__title">
				<h1>
					CHOOSE YOUR <span className="text-purple">LAND</span>
				</h1>
				<p>Become a marketing guru through land advertisement</p>
				<motion.div {...motionContainerProps} className="plan-grid">
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
		</div>
	);
};

export default Home;
