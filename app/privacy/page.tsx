import type { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import Reveal from '@/components/Reveal';
import { SITE, PRIVACY_EFFECTIVE } from '@/lib/copy';

export const metadata: Metadata = {
  alternates: { canonical: '/privacy' },
  title: '개인정보처리방침',
  description: '아트에이치치과의 개인정보 수집·이용 목적, 보유기간, 정보주체의 권리와 개인정보 보호책임자 안내.',
};

const effective = `${PRIVACY_EFFECTIVE.slice(0, 4)}년 ${Number(PRIVACY_EFFECTIVE.slice(5, 7))}월 ${Number(PRIVACY_EFFECTIVE.slice(8, 10))}일`;

// 의료법 시행규칙 제15조가 정한 진료기록 보존기간 — 임의로 바꾸지 않는다.
const RETENTION: [string, string][] = [
  ['진료기록부', '10년'],
  ['수술기록', '10년'],
  ['환자 명부', '5년'],
  ['검사내용 및 검사소견기록', '5년'],
  ['방사선 사진 및 그 소견서', '5년'],
  ['간호기록부', '5년'],
  ['진단서 등 부본', '3년'],
  ['처방전', '2년'],
];

const PURPOSE: [string, string, string][] = [
  ['진료 접수 · 진료', '성명, 생년월일, 성별, 연락처, 주소, 건강보험 자격 정보', '본인 확인, 진료 예약·접수, 진료 및 상담'],
  ['진료 기록', '병력, 진단·치료 내용, 방사선 영상, 구강 사진, 처방 내역', '진단·치료, 경과 관찰, 진료 연속성 확보'],
  ['요양급여 청구', '성명, 주민등록번호, 진료 내역', '건강보험심사평가원·국민건강보험공단 청구'],
  ['안내', '성명, 연락처', '예약 확인·변경 안내, 진료 후 주의사항 안내'],
];

const AGENCIES: [string, string][] = [
  ['개인정보침해신고센터', 'privacy.kisa.or.kr · 국번없이 118'],
  ['개인정보 분쟁조정위원회', 'kopico.go.kr · 1833-6972'],
  ['대검찰청 사이버수사과', 'spo.go.kr · 1301'],
  ['경찰청 사이버수사국', 'ecrm.police.go.kr · 국번없이 182'],
];

export default function PrivacyPage() {
  return (
    <>
      <article className="pv">
        <Breadcrumb items={[{ label: '홈', href: '/' }, { label: '개인정보처리방침' }]} />
        <Reveal variant="fade" duration="0.7s">
          <p className="pvEyebrow">PRIVACY POLICY</p>
        </Reveal>
        <Reveal variant="fade" delay={0.05} duration="0.8s">
          <h1 className="pvTitle">개인정보처리방침</h1>
        </Reveal>
        <Reveal variant="fade" delay={0.12} duration="0.8s">
          <p className="pvIntro">
            {SITE.name}(이하 &lsquo;본원&rsquo;)는 「개인정보 보호법」과 「의료법」 등 관련 법령을 준수하며,
            환자분의 개인정보를 안전하게 보호하기 위해 다음과 같이 개인정보처리방침을 수립·공개합니다.
          </p>
        </Reveal>

        <section className="pvSec">
          <h2>제1조 (처리하는 개인정보 항목과 목적)</h2>
          <p>본원은 진료와 관련하여 아래 항목을 처리합니다.</p>
          <div className="pvTableWrap">
            <table className="pvTable">
              <thead>
                <tr><th>구분</th><th>처리 항목</th><th>처리 목적</th></tr>
              </thead>
              <tbody>
                {PURPOSE.map(([a, b, c]) => (
                  <tr key={a}><td>{a}</td><td>{b}</td><td>{c}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="pvNote">
            <strong>홈페이지 이용 시</strong> — 본원 홈페이지는 회원가입이나 문의 양식 등 개인정보를 입력받는 기능을 두고
            있지 않으며, 방문자 분석 도구나 광고용 쿠키를 사용하지 않습니다. 예약은 네이버 예약, 상담은 전화로 연결되며
            이때의 개인정보 처리는 각 서비스 제공자의 방침을 따릅니다.
          </p>
        </section>

        <section className="pvSec">
          <h2>제2조 (개인정보의 보유·이용 기간)</h2>
          <p>의료법 시행규칙 제15조가 정한 기간 동안 보관한 뒤 지체 없이 파기합니다.</p>
          <div className="pvTableWrap">
            <table className="pvTable">
              <thead>
                <tr><th>기록</th><th>보존기간</th></tr>
              </thead>
              <tbody>
                {RETENTION.map(([a, b]) => (
                  <tr key={a}><td>{a}</td><td>{b}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="pvSec">
          <h2>제3조 (개인정보의 제3자 제공)</h2>
          <p>본원은 원칙적으로 환자분의 개인정보를 제3자에게 제공하지 않습니다. 다만 아래의 경우는 예외로 합니다.</p>
          <ul className="pvList">
            <li>환자분이 사전에 동의한 경우</li>
            <li>요양급여 청구를 위해 국민건강보험공단·건강보험심사평가원에 제공하는 경우</li>
            <li>법령에 특별한 규정이 있거나, 수사기관이 법이 정한 절차에 따라 요구하는 경우</li>
          </ul>
        </section>

        <section className="pvSec">
          <h2>제4조 (개인정보 처리의 위탁)</h2>
          <p>
            본원은 원활한 진료 업무를 위해 개인정보 처리 업무의 일부를 외부에 위탁할 수 있습니다. 위탁 계약 시
            개인정보의 안전한 관리에 관한 사항을 문서로 정하고, 수탁자가 개인정보를 안전하게 처리하는지 감독합니다.
            위탁 업무의 내용과 수탁자가 변경될 경우 본 방침을 통해 공개합니다.
          </p>
        </section>

        <section className="pvSec">
          <h2>제5조 (정보주체의 권리와 행사 방법)</h2>
          <p>환자분과 법정대리인은 언제든지 아래 권리를 행사할 수 있습니다.</p>
          <ul className="pvList">
            <li>개인정보 열람 요구</li>
            <li>오류 등이 있을 경우 정정 요구</li>
            <li>삭제 요구</li>
            <li>처리 정지 요구</li>
          </ul>
          <p className="pvNote">
            진료기록 열람과 사본 발급은 의료법 제21조에 따라 본인 또는 법에서 정한 대리인만 신청할 수 있으며
            신분 확인 서류가 필요합니다. 접수는 본원 데스크 방문 또는 전화(
            <a href={`tel:${SITE.phone.replace(/-/g, '')}`}>{SITE.phone}</a>)로 하실 수 있습니다.
          </p>
        </section>

        <section className="pvSec">
          <h2>제6조 (개인정보의 파기)</h2>
          <p>
            보유기간이 지나거나 처리 목적이 달성된 개인정보는 지체 없이 파기합니다. 전자적 파일은 복구할 수 없는
            방법으로 삭제하고, 종이 문서는 분쇄하거나 소각합니다.
          </p>
        </section>

        <section className="pvSec">
          <h2>제7조 (개인정보의 안전성 확보 조치)</h2>
          <ul className="pvList">
            <li>개인정보를 다루는 직원의 최소화 및 정기 교육</li>
            <li>진료정보 시스템 접근 권한 관리와 접속기록 보관</li>
            <li>개인정보가 포함된 서류의 잠금장치 보관</li>
            <li>백신 프로그램 설치 등 기술적 보호 조치</li>
          </ul>
        </section>

        <section className="pvSec">
          <h2>제8조 (개인정보 보호책임자)</h2>
          <p>
            본원은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 환자분의 문의를 처리하기 위하여
            아래와 같이 개인정보 보호책임자를 두고 있습니다.
          </p>
          <dl className="pvDl">
            <div><dt>개인정보 보호책임자</dt><dd>{SITE.business.ceo} 대표원장</dd></div>
            <div><dt>연락처</dt><dd><a href={`tel:${SITE.phone.replace(/-/g, '')}`}>{SITE.phone}</a></dd></div>
            <div><dt>주소</dt><dd>{SITE.business.regAddress}</dd></div>
          </dl>
          <p className="pvNote">개인정보 침해에 대한 상담·신고는 아래 기관에도 문의하실 수 있습니다.</p>
          <dl className="pvDl">
            {AGENCIES.map(([a, b]) => (
              <div key={a}><dt>{a}</dt><dd>{b}</dd></div>
            ))}
          </dl>
        </section>

        <section className="pvSec">
          <h2>제9조 (방침의 변경)</h2>
          <p>
            이 방침은 {effective}부터 적용됩니다. 법령이나 병원의 정책에 따라 내용이 추가·삭제·수정될 경우
            시행 7일 전부터 홈페이지에 공지합니다.
          </p>
        </section>

        <p className="pvEffective">시행일 {effective}</p>
      </article>

      <style>{`
        .pv {
          max-width: 800px; margin: 0 auto;
          padding: clamp(96px, 11vw, 140px) clamp(24px, 5vw, 40px) clamp(72px, 9vw, 110px);
        }
        .pvEyebrow {
          font-family: var(--f-display); font-size: 13px;
          color: var(--c-gold-text); letter-spacing: 4px; margin: 0 0 14px;
        }
        .pvTitle {
          font-family: var(--f-serif-ko); font-size: clamp(28px, 4vw, 42px);
          font-weight: 700; letter-spacing: -0.02em; color: var(--c-navy);
          line-height: 1.3; margin: 0 0 24px;
        }
        .pvIntro {
          font-size: 15px; line-height: 1.95; color: var(--c-text);
          font-weight: 400; margin: 0 0 8px; word-break: keep-all;
        }
        .pvSec { margin-top: clamp(40px, 5vw, 56px); }
        .pvSec h2 {
          font-family: var(--f-heading); font-size: 17px; font-weight: 700;
          color: var(--c-navy); letter-spacing: -0.02em;
          margin: 0 0 14px; padding-bottom: 12px;
          border-bottom: 1px solid var(--c-line);
        }
        .pvSec p {
          font-size: 14.5px; line-height: 1.9; color: var(--c-text);
          font-weight: 400; margin: 0 0 12px; word-break: keep-all;
        }
        .pvSec p:last-child { margin-bottom: 0; }
        .pvSec a { color: var(--c-blue-text); border-bottom: 1px solid rgba(46,111,212,0.35); }
        .pvNote {
          background: var(--c-warm); border-radius: 2px;
          padding: 16px 18px; font-size: 13.5px !important;
          line-height: 1.85 !important; margin-top: 16px !important;
        }
        .pvNote strong { font-weight: 600; color: var(--c-navy); }
        .pvList { margin: 0 0 12px; padding-left: 18px; }
        .pvList li {
          font-size: 14.5px; line-height: 1.9; color: var(--c-text);
          font-weight: 400; word-break: keep-all; margin-bottom: 4px;
        }
        .pvTableWrap { overflow-x: auto; margin: 0 0 12px; }
        .pvTable {
          width: 100%; border-collapse: collapse; font-size: 13.5px;
          line-height: 1.75; min-width: 480px;
        }
        .pvTable th, .pvTable td {
          text-align: left; padding: 11px 14px; vertical-align: top;
          border-bottom: 1px solid var(--c-line); word-break: keep-all;
        }
        .pvTable th {
          font-weight: 600; color: var(--c-navy);
          background: var(--c-warm); white-space: nowrap;
        }
        .pvTable td { color: var(--c-text); font-weight: 400; }
        .pvTable tbody tr:last-child td { border-bottom: none; }
        .pvDl { margin: 0 0 12px; }
        .pvDl > div {
          display: grid; grid-template-columns: 168px 1fr; gap: 12px;
          padding: 9px 0; border-bottom: 1px solid var(--c-line);
        }
        .pvDl > div:last-child { border-bottom: none; }
        .pvDl dt { font-size: 13.5px; font-weight: 600; color: var(--c-navy); }
        .pvDl dd {
          margin: 0; font-size: 14px; color: var(--c-text);
          font-weight: 400; word-break: keep-all;
        }
        .pvEffective {
          margin: clamp(40px, 5vw, 56px) 0 0; padding-top: 20px;
          border-top: 1px solid var(--c-line);
          font-size: 13px; color: var(--c-text2);
        }
        @media (max-width: 560px) {
          .pvDl > div { grid-template-columns: 1fr; gap: 2px; }
        }
      `}</style>
    </>
  );
}
