// 发布页
import { useState } from 'react';
import { PlusCircle, Camera, ImagePlus } from 'lucide-react';
import { CloudLocation, CloudStar, CloudBuddy, CloudCheck } from '../../components/icons/CloudIcons';
import { Z_INDEX } from '../../data/constants';
import { safeAreaTop, safeAreaBottom } from '../../utils/safeArea';

interface PublishPageProps {
  onClose: () => void;
}

export function PublishPage({ onClose }: PublishPageProps) {
  const [step, setStep] = useState<'select' | 'form'>('select');
  const [publishType, setPublishType] = useState<'photo' | 'buddy' | 'guide'>('photo');

  if (step === 'select') {
    return (
      <div className="fixed inset-0 flex items-end justify-center" style={{ zIndex: Z_INDEX.modal }} onClick={onClose}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative w-full max-w-[430px] bg-card rounded-t-2xl p-5 pb-8" style={safeAreaBottom('32px')}
          onClick={e => e.stopPropagation()}>
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
          <h3 className="text-[17px] font-semibold text-text-primary text-center mb-5">选择发布类型</h3>
          <div className="space-y-3">
            {[
              { type: 'photo' as const, icon: <Camera size={22} className="text-primary" />, title: '发图文', desc: '分享景点、美食、体验' },
              { type: 'buddy' as const, icon: <CloudBuddy size={22} />, title: '找搭子', desc: '找人一起玩' },
              { type: 'guide' as const, icon: <CloudStar size={22} />, title: '当向导', desc: '申请成为向导' },
            ].map(item => (
              <button key={item.type} onClick={() => { setPublishType(item.type); setStep('form'); }}
                className="w-full flex items-center gap-3 p-3 bg-background rounded-xl touch-feedback active:scale-[0.98] transition-fast">
                <div className="w-11 h-11 bg-primary/10 rounded-full flex items-center justify-center shrink-0">{item.icon}</div>
                <div className="text-left">
                  <p className="text-[15px] font-semibold text-text-primary">{item.title}</p>
                  <p className="text-[12px] text-text-secondary">{item.desc}</p>
                </div>
                <PlusCircle size={18} className="text-text-tertiary ml-auto rotate-45" />
              </button>
            ))}
          </div>
          <button onClick={onClose} className="w-full mt-4 py-2.5 text-[15px] text-text-secondary">取消</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background" style={{ ...safeAreaTop('0px'), zIndex: Z_INDEX.modal }}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-divider">
        <button onClick={() => setStep('select')} className="text-[15px] text-text-secondary">取消</button>
        <span className="text-[16px] font-semibold text-text-primary">
          {publishType === 'photo' ? '发布图文' : publishType === 'buddy' ? '找搭子' : '申请向导'}
        </span>
        <button className="text-[15px] text-primary font-semibold">发布</button>
      </div>
      <div className="px-4 py-4">
        {publishType === 'photo' && (
          <>
            <div className="flex gap-2 mb-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <ImagePlus size={24} className="text-gray-400" />
                </div>
              ))}
              <div className="w-24 h-24 bg-primary/5 rounded-lg flex items-center justify-center border-2 border-dashed border-primary/30">
                <div className="text-center">
                  <PlusCircle size={20} className="text-primary mx-auto" />
                  <span className="text-[10px] text-primary">添加图片</span>
                </div>
              </div>
            </div>
            <input type="text" placeholder="添加标题（必填）" className="w-full text-[16px] font-semibold text-text-primary placeholder:text-text-tertiary py-2 border-b border-divider mb-3" />
            <textarea placeholder="添加描述（选填）" rows={4} className="w-full text-[14px] text-text-primary placeholder:text-text-tertiary py-2 resize-none" />
            <div className="mt-4 space-y-3">
              <button className="flex items-center gap-2 w-full py-3 border-b border-divider">
                <CloudLocation size={18} /><span className="text-[14px] text-text-secondary">添加位置</span>
              </button>
              <button className="flex items-center gap-2 w-full py-3 border-b border-divider">
                <CloudStar size={18} /><span className="text-[14px] text-text-secondary">添加标签</span>
              </button>
              <div className="flex items-center justify-between py-3">
                <span className="text-[14px] text-text-secondary flex items-center gap-2"><CloudBuddy size={18} /> 求搭子</span>
                <div className="w-10 h-6 bg-gray-200 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 shadow" /></div>
              </div>
            </div>
          </>
        )}
        {publishType === 'buddy' && (
          <>
            <div className="space-y-4">
              <div>
                <label className="text-[13px] text-text-tertiary mb-1 block">目的地</label>
                <input type="text" placeholder="去哪里玩？" className="w-full text-[15px] py-2 border-b border-divider text-text-primary" />
              </div>
              <div>
                <label className="text-[13px] text-text-tertiary mb-1 block">时间</label>
                <input type="text" placeholder="什么时候去？" className="w-full text-[15px] py-2 border-b border-divider text-text-primary" />
              </div>
              <div>
                <label className="text-[13px] text-text-tertiary mb-1 block">人数</label>
                <div className="flex gap-2">
                  {['2人', '3-4人', '5人+'].map(n => (
                    <button key={n} className="px-4 py-1.5 bg-primary/10 text-primary text-[13px] rounded-full">{n}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[13px] text-text-tertiary mb-1 block">兴趣标签</label>
                <div className="flex flex-wrap gap-2">
                  {['摄影', '美食', '徒步', '密室', '购物', '文艺', '自驾', '露营'].map(tag => (
                    <button key={tag} className="px-3 py-1 bg-background text-text-secondary text-[12px] rounded-full">{tag}</button>
                  ))}
                </div>
              </div>
              <textarea placeholder="说点什么，吸引搭子来..." rows={3} className="w-full text-[14px] py-2 resize-none border border-divider rounded-lg p-2" />
            </div>
            <button className="w-full mt-6 py-3 bg-primary text-white text-[16px] font-semibold rounded-xl touch-feedback active:scale-[0.97]">发布找搭子</button>
          </>
        )}
        {publishType === 'guide' && (
          <div className="text-center py-8">
            <CloudStar size={48} className="mx-auto mb-4" />
            <h3 className="text-[18px] font-bold text-text-primary mb-2">成为云旅友途向导</h3>
            <p className="text-[14px] text-text-secondary mb-6">分享你的专业知识，陪旅友玩转目的地</p>
            <div className="text-left space-y-3 mb-6">
              <div className="flex items-start gap-3 p-3 bg-background rounded-lg">
                <CloudCheck size={20} className="text-success shrink-0 mt-0.5" />
                <div><p className="text-[14px] font-medium text-text-primary">实名认证</p><p className="text-[12px] text-text-tertiary">需提供身份证信息</p></div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-background rounded-lg">
                <CloudCheck size={20} className="text-success shrink-0 mt-0.5" />
                <div><p className="text-[14px] font-medium text-text-primary">技能认证</p><p className="text-[12px] text-text-tertiary">至少一项专业标签</p></div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-background rounded-lg">
                <CloudCheck size={20} className="text-success shrink-0 mt-0.5" />
                <div><p className="text-[14px] font-medium text-text-primary">灵活收入</p><p className="text-[12px] text-text-tertiary">自由定价，按单结算</p></div>
              </div>
            </div>
            <button className="w-full py-3 bg-primary text-white text-[16px] font-semibold rounded-xl touch-feedback active:scale-[0.97]">开始申请</button>
          </div>
        )}
      </div>
    </div>
  );
}
