import { logout, useGetAccountInfo, useGetLoginInfo } from "@elrondnetwork/dapp-core";
import { scaleInVariants } from "animation/variants";
import axios from "axios";
import { Icon } from "components/icons/Icon";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from ".";

const variants = {
	hidden: {
		x: "100%",
	},
	visible: {
		x: "0%",
	},
};

const AddressButton = ({ onClick }: any) => {
	const { isLoggedIn } = useGetLoginInfo();
	const { address, account } = useGetAccountInfo();
	const [totalLandBalance, setTotalLandBalance] = useState(0);
	const navigate = useNavigate();
	const location = useLocation();
	const isInUnlock = window.location.pathname.includes("unlock");

	const handleLogout = () => {
		logout(`${window.location.origin}`);
	};

	const handleUnlock = () => {
		if (isInUnlock) {
			navigate("/");
		} else {
			navigate("/unlock");
		}
		onClick();
	};

	useEffect(() => {
		if (account.address != "") {
			axios.get(`https://api.elrond.com/accounts/${account.address}/tokens`).then((res: any) => {
				if (res.data?.length > 0)
					setTotalLandBalance(res.data.filter((a: any) => a.identifier === "LAND-40f26f")[0].balance / 10 ** 18);
			});
		}
	}, [account]);

	return (
		<div className="address-buttons">
			{!isLoggedIn && (
				<Button className="z-10 filled min-w-[14rem]" onClick={handleUnlock} animate>
					<Icon name="unlock" />
					{isInUnlock ? "Back" : "Connect"}
				</Button>
			)}
			<AnimatePresence>
				{isLoggedIn && (
					<motion.div className="flex" variants={scaleInVariants}>
						<div className="account-button__address">
							<span className="font-bold text-purple">
								{address.slice(0, 6)}...{address.slice(-4)}
							</span>
							<div className="account-button__tag-container">
								<span className="account-button__tag">{totalLandBalance} LAND</span>
							</div>
						</div>
						<Button className="filled w-[8.75rem]" onClick={handleLogout}>
							<Icon name="unlock" />
							Disconnect
						</Button>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default AddressButton;
