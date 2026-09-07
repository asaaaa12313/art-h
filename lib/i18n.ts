/**
 * 외국어 안내 페이지 콘텐츠 (영어·일본어·중국어 간체).
 *
 * 사이트 전체를 번역하지 않는 이유: 진료 상세는 의료 표현이 많아 오역이 곧 잘못된 의료 정보가 된다.
 * 대신 외국인 환자가 실제로 필요한 것 — 어떤 병원인지, 무엇을 진료하는지, 언제 어디로 가는지,
 * 어떻게 예약하는지, 진료 중 의사소통은 어떻게 되는지 — 를 언어별 한 페이지에 담는다.
 *
 * 가격·부작용·시술 설명은 여기에 싣지 않는다(한국어 원문과 어긋나면 고지 위반이 된다).
 * 대신 한국어 원문 페이지로 안내한다.
 */

export const LOCALES = ['en', 'ja', 'zh'] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABEL: Record<Locale, string> = {
  en: 'English',
  ja: '日本語',
  zh: '中文',
};

/** <html lang> 값 — 스크린리더 발음과 검색엔진 언어 판별에 쓰인다 */
export const LOCALE_HTML_LANG: Record<Locale, string> = {
  en: 'en',
  ja: 'ja',
  zh: 'zh-Hans',
};

type Section = { h: string; body?: string; rows?: { k: string; v: string }[]; list?: string[] };

export type LocaleContent = {
  title: string;
  metaDescription: string;
  tagline: string;
  lead: string;
  sections: Section[];
  cta: { call: string; book: string; korean: string };
  backToKorean: string;
};

export const LOCALE_CONTENT: Record<Locale, LocaleContent> = {
  en: {
    title: 'Art H Dental Clinic — Songdo, Incheon',
    metaDescription:
      'English guide to Art H Dental Clinic in Songdo IBS Tower, Incheon. Oral surgeon and endodontist on site, conscious sedation available, hours, directions and how to book.',
    tagline: 'We settle your nerves first, then begin treatment.',
    lead:
      'Art H Dental Clinic is a dental clinic on the 8th floor of IBS Tower in Songdo International Business District, Incheon. An oral and maxillofacial surgeon and an endodontist treat patients here. For people who find dental visits stressful, we explain each step before starting and offer conscious sedation.',
    sections: [
      {
        h: 'Our doctors',
        rows: [
          { k: 'Dr. Choi Jong-won', v: 'Director · Board-certified oral and maxillofacial surgeon. Implants, wisdom tooth extraction, TMJ, conscious sedation.' },
          { k: 'Dr. Kang Ji-su', v: 'Board-certified endodontist. Root canal treatment and saving natural teeth.' },
        ],
      },
      {
        h: 'What we treat',
        list: [
          'Dental implants (including bone grafting and sinus lift)',
          'Wisdom tooth extraction, including impacted teeth',
          'Root canal treatment and retreatment',
          'TMJ disorders — splint therapy, physical therapy',
          'Conscious sedation (sleep dentistry) for anxious patients',
          'Gum care and scaling with the GBT protocol',
          'Professional teeth whitening',
        ],
      },
      {
        h: 'If you are nervous about dental treatment',
        body:
          'Conscious sedation lets you stay responsive while feeling much calmer. Our oral surgeon performs both the sedation and the procedure, monitoring oxygen saturation, blood pressure and pulse throughout, and adjusting the dose with a syringe pump. You will need someone to accompany you home afterwards, and you must not drive on the day. Tell us in advance about any medication, heart or respiratory conditions, allergies, or pregnancy.',
      },
      {
        h: 'Hours',
        rows: [
          { k: 'Mon, Thu', v: '09:30 – 20:30 (evening clinic)' },
          { k: 'Tue, Wed, Fri', v: '09:30 – 18:30' },
          { k: 'Saturday', v: '09:30 – 14:00' },
          { k: 'Lunch break', v: '14:00 – 15:00' },
          { k: 'Sunday', v: 'Closed' },
        ],
      },
      {
        h: 'Getting here',
        rows: [
          { k: 'Address', v: '8F, IBS Tower, 263 Central-ro, Yeonsu-gu, Incheon' },
          { k: 'Subway', v: 'Incheon Line 1, International Business District Station, Exit 5 — 470 m on foot (about 7 minutes)' },
          { k: 'Landmark', v: 'Across from G-Tower. Enter through the office building lobby, not the residence wing.' },
          { k: 'Parking', v: 'Underground parking in IBS Tower' },
        ],
      },
      {
        h: 'Booking and language',
        body:
          'Please call or book through Naver. Consultations are conducted in Korean; if you would like to bring an interpreter or a Korean-speaking companion, that is welcome. Let us know when you book so we can allow extra time. For treatment details, fees and safety information, please see the Korean pages — they are the authoritative version.',
      },
    ],
    cta: { call: 'Call the clinic', book: 'Book via Naver', korean: 'Korean site' },
    backToKorean: 'This page is a summary. Full information is on the Korean site.',
  },

  ja: {
    title: 'アートエイチ歯科 — 仁川・松島（ソンド）',
    metaDescription:
      '仁川・松島IBSタワーのアートエイチ歯科の日本語案内。口腔外科専門医と歯内療法専門医が在籍、意識下鎮静に対応。診療時間・アクセス・予約方法をご案内します。',
    tagline: '不安をやわらげてから、治療を始めます。',
    lead:
      'アートエイチ歯科は、仁川・松島国際業務団地のIBSタワー8階にある歯科医院です。口腔顎顔面外科の専門医と歯内療法（根管治療）の専門医が診療しています。歯科治療に不安のある方には、始める前に必ず説明を行い、意識下鎮静（眠っているような状態での治療）もご用意しています。',
    sections: [
      {
        h: '医師',
        rows: [
          { k: 'チェ・ジョンウォン 院長', v: '口腔顎顔面外科 専門医。インプラント、親知らずの抜歯、顎関節、意識下鎮静を担当。' },
          { k: 'カン・ジス 医師', v: '歯内療法（保存科）専門医。根管治療と歯を残す治療を担当。' },
        ],
      },
      {
        h: '診療内容',
        list: [
          'インプラント（骨移植・上顎洞挙上術を含む）',
          '親知らずの抜歯（埋伏歯を含む）',
          '根管治療・再根管治療',
          '顎関節症 — スプリント、理学療法',
          '意識下鎮静（歯科恐怖症の方向け）',
          'GBTプロトコルによる歯ぐきのケア・スケーリング',
          'オフィスホワイトニング',
        ],
      },
      {
        h: '歯科治療が怖い方へ',
        body:
          '意識下鎮静は、意識を保ったまま緊張を大きくやわらげた状態で治療を受ける方法です。鎮静と処置はいずれも口腔外科専門医が担当し、治療中は酸素飽和度・血圧・脈拍を継続的に確認しながら、シリンジポンプで薬剤量を調整します。当日はご家族などの付き添いが必要で、ご自身の運転はお控えください。服用中のお薬、心臓・呼吸器の疾患、アレルギー、妊娠の可能性は事前にお知らせください。',
      },
      {
        h: '診療時間',
        rows: [
          { k: '月・木', v: '09:30 – 20:30（夜間診療）' },
          { k: '火・水・金', v: '09:30 – 18:30' },
          { k: '土', v: '09:30 – 14:00' },
          { k: '昼休み', v: '14:00 – 15:00' },
          { k: '日曜', v: '休診' },
        ],
      },
      {
        h: 'アクセス',
        rows: [
          { k: '住所', v: '仁川広域市 延寿区 セントラルロ263 IBSタワー 業務棟 8階' },
          { k: '地下鉄', v: '仁川1号線 国際業務地区駅 5番出口から470m（徒歩約7分）' },
          { k: '目印', v: 'G-Towerの向かい側。オフィステル棟ではなく業務棟のロビーからお入りください。' },
          { k: '駐車', v: 'IBSタワー地下駐車場をご利用いただけます' },
        ],
      },
      {
        h: 'ご予約・言語について',
        body:
          'お電話またはNAVER予約をご利用ください。診療は韓国語で行っています。通訳の方や韓国語のわかる同伴者とのご来院も歓迎です。ご予約の際にお知らせいただければ、余裕をもって時間を確保いたします。治療内容・費用・安全に関する詳細は、正式な案内である韓国語ページをご確認ください。',
      },
    ],
    cta: { call: '電話をかける', book: 'NAVERで予約', korean: '韓国語サイト' },
    backToKorean: 'このページは要約です。詳細は韓国語サイトをご覧ください。',
  },

  zh: {
    title: 'Art H 牙科 — 仁川松岛',
    metaDescription:
      '仁川松岛IBS大厦Art H牙科中文指南。设有口腔颌面外科专科医师与牙髓病专科医师，可选择镇静治疗。诊疗时间、交通与预约方式说明。',
    tagline: '先让心情平静下来，再开始治疗。',
    lead:
      'Art H 牙科位于仁川松岛国际商务区IBS大厦8层。由口腔颌面外科专科医师与牙髓病（根管治疗）专科医师坐诊。对看牙感到紧张的患者，我们会在开始前充分说明，并提供清醒镇静治疗。',
    sections: [
      {
        h: '医师',
        rows: [
          { k: '崔宗源 院长', v: '口腔颌面外科专科医师。负责种植牙、智齿拔除、颞下颌关节、清醒镇静。' },
          { k: '姜智秀 医师', v: '牙髓病（保存科）专科医师。负责根管治疗与保留天然牙。' },
        ],
      },
      {
        h: '诊疗项目',
        list: [
          '种植牙（含骨移植、上颌窦提升）',
          '智齿拔除（含阻生齿）',
          '根管治疗与再治疗',
          '颞下颌关节紊乱 — 咬合板、物理治疗',
          '清醒镇静治疗（适合看牙恐惧的患者）',
          'GBT 方案的牙龈护理与洁牙',
          '专业美白',
        ],
      },
      {
        h: '如果您害怕看牙',
        body:
          '清醒镇静是在保持意识的同时大幅减轻紧张感的治疗方式。镇静与手术均由口腔颌面外科专科医师负责，治疗中持续监测血氧饱和度、血压与脉搏，并通过注射泵精确调节药量。当天需有人陪同回家，请勿自行驾车。请提前告知正在服用的药物、心脏或呼吸系统疾病、过敏史及是否怀孕。',
      },
      {
        h: '诊疗时间',
        rows: [
          { k: '周一、周四', v: '09:30 – 20:30（夜间诊疗）' },
          { k: '周二、周三、周五', v: '09:30 – 18:30' },
          { k: '周六', v: '09:30 – 14:00' },
          { k: '午休', v: '14:00 – 15:00' },
          { k: '周日', v: '休诊' },
        ],
      },
      {
        h: '交通',
        rows: [
          { k: '地址', v: '仁川广域市 延寿区 Central路263号 IBS大厦 办公楼 8层' },
          { k: '地铁', v: '仁川1号线 国际业务园区站 5号出口步行470米（约7分钟）' },
          { k: '地标', v: 'G-Tower 对面。请从办公楼大堂进入，而非公寓楼。' },
          { k: '停车', v: '可使用IBS大厦地下停车场' },
        ],
      },
      {
        h: '预约与语言',
        body:
          '请致电或通过NAVER预约。诊疗以韩语进行，欢迎您携带翻译或懂韩语的同行者。预约时告知我们，我们会预留更充裕的时间。治疗内容、费用与安全须知请以韩语页面为准。',
      },
    ],
    cta: { call: '致电诊所', book: '通过NAVER预约', korean: '韩语网站' },
    backToKorean: '本页为摘要，详细信息请参见韩语网站。',
  },
};
