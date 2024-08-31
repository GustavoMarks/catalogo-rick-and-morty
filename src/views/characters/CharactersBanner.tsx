import Banner from '@/components/Banner';
import CharactersBannerIllustration from '@/components/illustrations/CharactersBannerIllustration';

export default function CharactersBanner() {
	return (
		<Banner
			title='List of Characters'
			subtitle='Rick and Morty Catalog'
		>
			<CharactersBannerIllustration />
		</Banner>
	);
}
