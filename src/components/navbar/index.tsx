import { useGetAccountInfo } from "@elrondnetwork/dapp-core";
import { mobileMenuVariants, motionContainerProps, scaleInVariants } from "animation/variants";
import Button from "components/buttons";
import AddressButton from "components/buttons/AddressButton";
import { Icon } from "components/icons/Icon";
import Logo from "components/icons/Logo";
import { motion } from "framer-motion/dist/framer-motion";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useMedia } from "react-use";

const NavBar = () => {
	const { address } = useGetAccountInfo();
	const isMobile = useMedia("(max-width: 768px)");

	let menuItems: any[] = [{ label: "Staking" }, { label: "Referrals" }, { label: "Staked" }];
	if (!address) {
		menuItems = [];
	}

	const [isOpen, setIsOpen] = useState(false);

	const handleNav = (item: any) => {
		if (isOpen === true) {
			setIsOpen(false);
			document.body.classList.remove("overflow-hidden");
		} else {
			setIsOpen(true);
			document.body.classList.add("overflow-hidden");
		}
	};

	return (
		<motion.nav {...motionContainerProps}>
			<motion.a variants={scaleInVariants} className="cursor-pointer" href="https://landboard.io/">
				<Logo />
			</motion.a>
			<ul className="justify-between hidden gap-12 md:flex z-100">
				{menuItems.map((item) => {
					return (
						<motion.li variants={scaleInVariants} key={item.label ?? item}>
							{!item.link && (
								<NavLink to={item.label.toLowerCase()} className="p-4 uppercase cursor-pointer hover:text-purple">
									{item.label}
								</NavLink>
							)}
							{item.link && (
								<a href={item.link} className="uppercase">
									{item.label}
								</a>
							)}
						</motion.li>
					);
				})}
			</ul>
			<div className="flex-row hidden gap-5 md:flex">
				<motion.a variants={scaleInVariants} href="https://twitter.com/landboard_io" className="uppercase">
					<Icon primary name="twitter" />
				</motion.a>
				<motion.a variants={scaleInVariants} href="https://t.me/landboardio" className="uppercase">
					<Icon primary name="telegram" />
				</motion.a>
			</div>
			<button className="relative z-20 grid w-8 h-8 place-items-center md:hidden" onClick={handleNav}>
				{isOpen ? <Icon name="close" color="#fff" width={20} /> : <Icon name="hamburger" color="#fff" />}
			</button>
			<motion.div
				className="mobile-menu"
				initial={false}
				animate={isOpen ? "visible" : "hidden"}
				variants={mobileMenuVariants}>
				<ul className="flex flex-col items-center gap-12 max-w-[12.5rem]">
					<motion.li variants={scaleInVariants}>
						<AddressButton />
					</motion.li>
					{menuItems.map((item) => (
						<motion.li variants={scaleInVariants} key={item.label ?? item}>
							{!item.link && (
								<NavLink
									to={item.label.toLowerCase()}
									className="p-4 uppercase cursor-pointer hover:text-purple"
									onClick={handleNav}>
									{item.label}
								</NavLink>
							)}
							{item.link && (
								<a href={item.link} className="uppercase">
									{item.label}
								</a>
							)}
						</motion.li>
					))}
					<motion.li animate={{ scale: [1, 1.05, 1] }} transition={{ ease: "linear", duration: 2, repeat: Infinity }}>
						<Button className="filled" external="https://presale.landboard.io/" animate>
							PRESALE HERE
						</Button>
					</motion.li>
				</ul>
				<div className="flex justify-center gap-5">
					<motion.a variants={scaleInVariants} href="https://twitter.com/landboard_io" className="uppercase">
						<Icon primary name="twitter" />
					</motion.a>
					<motion.a variants={scaleInVariants} href="https://t.me/landboardio" className="uppercase">
						<Icon primary name="telegram" />
					</motion.a>
				</div>
			</motion.div>
			{!isMobile && <AddressButton />}
		</motion.nav>
	);
};

export default NavBar;
