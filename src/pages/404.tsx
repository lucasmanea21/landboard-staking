import { fadeInVariants, motionContainerProps } from "animation/variants";
import Button from "components/buttons";
import Dracula from "components/icons/Dracula";
import { Icon } from "components/icons/Icon";
import { motion } from "framer-motion/dist/framer-motion";

const NotFound = () => {
  return (
    <motion.div className="page-404" {...motionContainerProps}>
      <Dracula />
      <div className="page-404__content">
        <motion.h1 variants={fadeInVariants}>
          Oh no. <br />
          Page not <span className="text-purple">found</span>.
        </motion.h1>
        <motion.p variants={fadeInVariants}>
          Maybe Dracula has broken this page. Go back to the map.{" "}
        </motion.p>
        <Button className="w-[13.75rem] mt-6 filled" link="/" animate>
          <Icon name="map" />
          Go To Staking
        </Button>
      </div>
    </motion.div>
  );
};

export default NotFound;
