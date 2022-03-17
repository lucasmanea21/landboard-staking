import AddressButton from "components/buttons/AddressButton";
import { Icon } from "components/icons/Icon";
import { motion } from "framer-motion/dist/framer-motion";
import Logo from "../icons/Logo";

const scaleInVariants = {
	hidden: {
		opacity: 0,
		scale: 0,
	},
	visible: {
		opacity: 1,
		scale: 1,
	},
};

const NavBar = () => {
	return (
		<nav>
			<div className="flex justify-between w-full ">
				<a className="cursor-pointer" href="https://landboard.io/">
					<Logo />
				</a>
				<div className="flex items-center justify-center gap-5 md:ml-auto md:gap-10">
					<motion.a variants={scaleInVariants} href="https://twitter.com/landboard_io" className="uppercase">
						<Icon name="twitter" />
					</motion.a>
					<motion.a variants={scaleInVariants} href="https://t.me/landboardio" className="uppercase">
						<Icon name="telegram" />
					</motion.a>
				</div>
			</div>
			<AddressButton />
		</nav>
	);
};

export default NavBar;
