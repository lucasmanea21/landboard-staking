import { Fragment, useRef } from "react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper.min.css";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";

SwiperCore.use([Navigation]);

const Carousel = ({ items }) => {
	const navigationPrevRef = useRef(null);
	const navigationNextRef = useRef(null);

	return (
		<Fragment>
			<div className="relative flex flex-row items-start justify-between max-w-full mb-8">
				<div className="absolute left-0 w-full h-2 px-4 rounded top-20 bg-purple" />
				<Swiper
					navigation={{
						prevEl: navigationPrevRef.current,
						nextEl: navigationNextRef.current,
					}}
					onSwiper={(swiper) => {
						setTimeout(() => {
							// Override prevEl & nextEl now that refs are defined
							swiper.params.navigation.prevEl = navigationPrevRef.current;
							swiper.params.navigation.nextEl = navigationNextRef.current;

							// Re-init navigation
							swiper.navigation.destroy();
							swiper.navigation.init();
							swiper.navigation.update();
						});
					}}
					breakpoints={{}}
					slidesPerView="auto"
					className="lboard-carousel">
					{items.map((item, index) => (
						<SwiperSlide key={index} className={`lboard-carousel-slide ${index === 0 ? "ml-10 md:ml-0" : ""}`}>
							{item}
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</Fragment>
	);
};

export default Carousel;
