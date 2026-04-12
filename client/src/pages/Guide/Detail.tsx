// 向导详情页 /guide/:id
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useIdParam, SlideInPage } from '../../components/layout/SubNavBar';
import { MOCK_GUIDES, MOCK_REVIEWS } from '../../data/mock';
import { getGuideTheme } from './theme';
import { DefaultDetail, EscapeRoomDetail, CampingDetail, BusinessDetail } from './DetailComponents';

export default function GuideDetailPage() {
  const [searchParams] = useSearchParams();
  const id = useIdParam();
  const guide = MOCK_GUIDES.find(g => g.id === id);
  const backUrl = searchParams.get('back') || '/';
  const theme = getGuideTheme(guide?.category);
  const [priceType, setPriceType] = useState<'hourly' | 'halfDay' | 'fullDay'>('hourly');
  const [showBooking, setShowBooking] = useState(false);
  const [bookDate, setBookDate] = useState('今天');
  const [bookTime, setBookTime] = useState('14:00');

  if (!guide) return <SlideInPage><div className="flex items-center justify-center h-64 text-text-tertiary">向导不存在</div></SlideInPage>;

  const reviews = MOCK_REVIEWS.filter(r => r.guideId === id);
  const prices = [
    { key: 'hourly' as const, label: '2小时', price: guide.priceHourly },
    { key: 'halfDay' as const, label: '半天', price: guide.priceHalfDay },
    { key: 'fullDay' as const, label: '全天', price: guide.priceFullDay },
  ];

  // 根据分类渲染不同的详情页
  if (guide.category === 'escape') {
    return <EscapeRoomDetail guide={guide} theme={theme} backUrl={backUrl} reviews={reviews} />;
  }
  if (guide.category === 'camping') {
    return <CampingDetail guide={guide} theme={theme} backUrl={backUrl} reviews={reviews} />;
  }
  if (guide.category === 'business') {
    return <BusinessDetail guide={guide} theme={theme} backUrl={backUrl} reviews={reviews} />;
  }

  // 默认通用布局
  return <DefaultDetail guide={guide} theme={theme} backUrl={backUrl} reviews={reviews} prices={prices} priceType={priceType} setPriceType={setPriceType} showBooking={showBooking} setShowBooking={setShowBooking} bookDate={bookDate} setBookDate={setBookDate} bookTime={bookTime} setBookTime={setBookTime} />;
}
