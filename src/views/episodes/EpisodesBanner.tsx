import Banner from '@/components/Banner';
import EpisodesBannerIllustration from '@/components/illustrations/EpisodesBannerIllustration';

export default function EpisodesBanner() {
	return (
		<Banner
			title='List of Episodes'
			subtitle='Rick and Morty Catalog'
		>
			<EpisodesBannerIllustration />
		</Banner>
	);
}
