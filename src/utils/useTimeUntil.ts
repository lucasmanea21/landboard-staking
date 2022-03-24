import parseMs from "parse-ms";
import useCountdown from "react-use-countdown";

const useTimeUntil = (timeUntil: number) => {
	const countdown = useCountdown(() => timeUntil);

	return { ...parseMs(countdown), timeLeft: countdown };
};

export default useTimeUntil;
