export type Source = {
  kind?: "VIDEO" | "READING" | "COURSE";
  title: string;
  provider: string;
  range: string;
  minutes: number;
  purpose: string;
  url: string;
};

export type Day = {
  day: number;
  stage: number;
  title: string;
  capability: string;
  question: string;
  why: string;
  theory: {
    name: string;
    plain: string;
    can: string;
    limit: string;
    misuse: string;
  };
  case: {
    name: string;
    role: string;
    scene: string;
    facts: string[];
    reasoning: string[];
  };
  drills: {
    prompt: string;
    avoid: string;
    hint: string;
    model: string;
    why: string;
    mistake: string;
  }[];
  independent: {
    name: string;
    scene: string;
    prompt: string;
    model: string;
  };
  transfer: string;
  rubric: {
    pass: string;
    standard: string;
    pro: string;
    revise: string;
  };
  output: string;
  next: string;
  sources: Source[];
};

export const stages = [
  { id: 1, name: "観察し、誤診を止める", days: "Day 1–5", color: "#ef7d8f", before: "印象からすぐ施策を決める", after: "事実・出所・反証可能な仮説を分ける" },
  { id: 2, name: "顧客の決定を診断する", days: "Day 6–10", color: "#6d8de8", before: "属性や発言を顧客理解だと思う", after: "Job・感情・信頼・政治・摩擦を構造化する" },
  { id: 3, name: "市場と価値を設計する", days: "Day 11–15", color: "#13a887", before: "広い市場に良さを訴える", after: "決定文脈・代替・証拠から勝つ場所を選ぶ" },
  { id: 4, name: "商品・価格・提案を組む", days: "Day 16–20", color: "#f4ad32", before: "機能を足し値引きで反論を処理する", after: "Offer・参照価格・証拠・交渉を一貫させる" },
  { id: 5, name: "売れる仕組みを実験する", days: "Day 21–25", color: "#9b72cf", before: "投稿や広告を勘で増やす", after: "経済性・チャネル・倫理・実験・因果を管理する" },
  { id: 6, name: "独立実務へ統合する", days: "Day 26–30", color: "#1d315c", before: "部分知識を持つ", after: "未知案件を診断し、有料提案と90日実行計画にする" },
];

const courseraSocial: Source = {
  kind: "COURSE",
  title: "Social Psychology",
  provider: "Wesleyan University / Coursera",
  range: "Week 1: The Psychology of Self-Presentation（動画・確認問題）",
  minutes: 38,
  purpose: "人が状況をそのまま見ず、解釈を構成することを理解する",
  url: "https://www.coursera.org/learn/social-psychology",
};
const courseraMarketing: Source = {
  kind: "COURSE",
  title: "Introduction to Marketing",
  provider: "University of Pennsylvania / Coursera",
  range: "Module 1: Branding—Marketing Strategy and Brand Positioning",
  minutes: 42,
  purpose: "顧客中心の価値・ポジショニングを商業判断へ接続する",
  url: "https://www.coursera.org/learn/wharton-marketing",
};
const courseraAnalytics: Source = {
  kind: "COURSE",
  title: "Customer Analytics",
  provider: "University of Pennsylvania / Coursera",
  range: "Module 2: Descriptive Analytics—Customer Base Audit",
  minutes: 47,
  purpose: "平均ではなく顧客分布と行動データを見る",
  url: "https://www.coursera.org/learn/wharton-customer-analytics",
};
const negotiation: Source = {
  kind: "COURSE",
  title: "Successful Negotiation",
  provider: "University of Michigan / Coursera",
  range: "Module 1: Prepare—BATNA, reservation price, interests",
  minutes: 45,
  purpose: "立場ではなく利害と代替案で交渉を準備する",
  url: "https://www.coursera.org/learn/negotiation-skills",
};
const jtbd: Source = {
  kind: "READING",
  title: "Know Your Customers’ Jobs to Be Done",
  provider: "Harvard Business Review",
  range: "全文：状況・進歩・雇用する解決策の節",
  minutes: 28,
  purpose: "属性ではなく、顧客が前進したい状況を捉える",
  url: "https://hbr.org/2016/09/know-your-customers-jobs-to-be-done",
};
const testLearn: Source = {
  kind: "READING",
  title: "Test, Learn, Adapt",
  provider: "UK Cabinet Office",
  range: "pp. 4–18: RCTの原則、介入群と比較群",
  minutes: 35,
  purpose: "介入前に予測と比較方法を固定する",
  url: "https://www.gov.uk/government/publications/test-learn-adapt-developing-public-policy-with-randomised-controlled-trials",
};
const wells: Source = {
  kind: "READING",
  title: "CFPB Fines Wells Fargo $100 Million",
  provider: "Consumer Financial Protection Bureau",
  range: "不正口座の行動・報酬制度・処分額",
  minutes: 18,
  purpose: "個人の性格でなく制度・インセンティブへ帰属を広げる",
  url: "https://www.consumerfinance.gov/about-us/newsroom/consumer-financial-protection-bureau-fines-wells-fargo-100-million-widespread-illegal-practice-secretly-opening-unauthorized-accounts/",
};
const zoom: Source = {
  kind: "READING",
  title: "Zoom Video Communications S-1",
  provider: "U.S. SEC",
  range: "Prospectus Summary / Our Customers / VMware case",
  minutes: 30,
  purpose: "採用拡大を支えた製品体験と証拠の組み合わせを読む",
  url: "https://www.sec.gov/Archives/edgar/data/1585521/000119312519083351/d642624ds1.htm",
};
const slack: Source = {
  kind: "READING",
  title: "Slack Technologies S-1",
  provider: "U.S. SEC",
  range: "Business / Customers / Growth Strategy",
  minutes: 32,
  purpose: "利用・無料組織・有料化の違いからファネルを読む",
  url: "https://www.sec.gov/Archives/edgar/data/1764925/000162828019004786/slacks-1.htm",
};
const airbnb: Source = {
  kind: "READING",
  title: "Airbnb S-1",
  provider: "U.S. SEC",
  range: "COVID-19 impact / Trust / Community",
  minutes: 34,
  purpose: "需要ショック、信頼、両面市場の相互作用を診断する",
  url: "https://www.sec.gov/Archives/edgar/data/1559720/000119312520294801/d81668ds1.htm",
};
const peloton: Source = {
  kind: "READING",
  title: "Peloton FY2022 Form 10-K",
  provider: "U.S. SEC",
  range: "p.5（Business概況）／pp.49–53（Connected Fitness・Subscription・売上構成）",
  minutes: 36,
  purpose: "売上減と会員基盤増を分け、単一指標の誤診を避ける",
  url: "https://www.sec.gov/Archives/edgar/data/1639825/000163982522000117/pton-20220630.htm",
};
const adobe: Source = {
  kind: "READING",
  title: "Adobe FY2013 Form 10-K",
  provider: "U.S. SEC",
  range: "Creative Cloud transition / Revenue recognition / Risk",
  minutes: 32,
  purpose: "買い切りから継続課金への移行を価値とリスクで読む",
  url: "https://www.sec.gov/Archives/edgar/data/796343/000079634314000004/adbe10kfy13.htm",
};
const costco: Source = {
  kind: "READING",
  title: "Costco FY2025 Annual Report",
  provider: "Costco Investor Relations",
  range: "Business model / Membership / Net sales",
  minutes: 30,
  purpose: "会費と商品粗利を分けた価格アーキテクチャを理解する",
  url: "https://investor.costco.com/financials/annual-reports-and-proxy-statements/default.aspx",
};
const duolingo: Source = {
  kind: "READING",
  title: "Duolingo Q1 FY2026 Shareholder Letter",
  provider: "Duolingo Investor Relations",
  range: "DAU / paid subscribers / subscription bookings",
  minutes: 25,
  purpose: "利用習慣・有料化・収益を別の状態として読む",
  url: "https://investors.duolingo.com/financials/quarterly-results/default.aspx",
};
const autoEnroll: Source = {
  kind: "READING",
  title: "Workplace pension participation and savings trends",
  provider: "UK Department for Work and Pensions",
  range: "Eligible employee participation / automatic enrolment trend",
  minutes: 24,
  purpose: "デフォルト変更の効果と制度文脈の境界を理解する",
  url: "https://www.gov.uk/government/statistics/workplace-pension-participation-and-savings-trends-2009-to-2024",
};
const amazonFTC: Source = {
  kind: "READING",
  title: "FTC Secures $2.5 Billion Settlement with Amazon",
  provider: "U.S. Federal Trade Commission",
  range: "Prime enrollment and cancellation allegations / remedy",
  minutes: 22,
  purpose: "選択設計と操作の境界、長期信頼コストを検討する",
  url: "https://www.ftc.gov/news-events/news/press-releases/2025/09/ftc-secures-historic-25-billion-settlement-amazon",
};

export const days: Day[] = [
  {
    day: 1, stage: 1, title: "診断する問題を固定する", capability: "依頼文を、観測可能で商業結果につながる診断課題へ翻訳する",
    question: "「売れない」「ブランドが弱い」という相談を、今日調べられる問いへどう変えるか。",
    why: "問題を曖昧なまま受け取ると、広告・値下げ・リブランディングが最初から答えになり、原因を調べない。",
    theory: { name: "Problem Framing / 診断契約", plain: "何を、誰の、どの行動・結果として説明するか境界を決める。", can: "同じ現象に複数の問題設定があることを示す。", limit: "正しい原因そのものはまだ決められない。", misuse: "依頼者の言葉を専門用語へ言い換えただけで診断したと思う。" },
    case: { name: "Peloton FY2022", role: "売上減だけで事業全体を失敗と判定しない", scene: "経営会議で『需要が消えた。広告を増やすべきだ』という主張が出た。", facts: ["FY2022総売上は前年比11%減。", "Connected Fitness subscription baseは27%増。", "機器販売と継続利用は異なる動きをした。"], reasoning: ["判断1：問題を『需要消滅』で固定しない。", "理由：購入流入・会員継続・供給在庫が混在している。", "判断2：新規機器需要、獲得効率、継続価値を別々に診断する。", "次の判断：各指標の期間と母集団を揃える。"] },
    drills: [
      { prompt: "依頼文「最近売れない」から、観測できる結果を一つ書く。", avoid: "景気が悪い、魅力がない等の原因を書く。", hint: "誰が・いつ・どの行動をしなくなったか。", model: "過去8週間、初回相談から有料契約への転換率が31%から18%へ低下した。", why: "期間・母集団・行動・差分があり確認できる。", mistake: "『顧客が価格に敏感になった』と解釈を混ぜる。" },
      { prompt: "その結果が悪いと判断する比較基準を一つ書く。", avoid: "目標がないのに『低い』と断定する。", hint: "過去、目標、類似群のどれと比べるか。", model: "同じ流入元・同じ価格だった直前8週間の31%を基準にする。", why: "比較条件を揃え、季節差以外の変化を探せる。", mistake: "業界平均だけを無条件に採用する。" },
      { prompt: "今回あえて診断しない範囲を一つ決める。", avoid: "会社全体・ブランド全体に広げる。", hint: "今回の意思決定に不要な範囲を切る。", model: "既存顧客の継続率は別課題とし、今回は初回相談後の離脱に限定する。", why: "一つの意思決定に必要な範囲へ焦点を作る。", mistake: "重要そうなものを全部含める。" },
    ],
    independent: { name: "地方クリニック", scene: "予約数は横ばいだが、受付は『若者に選ばれなくなった』と言う。", prompt: "診断課題を1文で固定してください。", model: "直近3か月、20–29歳の新規予約が前年同期比で何件・何率変化し、その変化は認知、予約開始、予約完了のどこで起きたか。" },
    transfer: "自分の事業で今いちばん困っていることを「対象・期間・行動・比較・商業結果」の1文へ変換する。",
    rubric: { pass: "5要素のうち4つが入り、原因を断定していない。", standard: "診断範囲と除外範囲が明確。", pro: "答えが変わると次の意思決定も変わる。", revise: "形容詞を消し、カメラや台帳で確認できる行動へ置換する。" },
    output: "Diagnostic Mandate v1", next: "問題を固定しても、見聞きした情報に解釈が混ざっていれば誤診する。Day2で証拠を分離する。", sources: [peloton],
  },
  {
    day: 2, stage: 1, title: "事実と解釈を分ける", capability: "観測事実・発言・計算・推測を別の証拠状態として記録する",
    question: "顧客の『高い』を、値下げの根拠にせず分析するにはどう記録するか。",
    why: "発言を原因や本音と同一視すると、価格以外の承認・信頼・優先順位の障害を見落とす。",
    theory: { name: "Constructed Reality / 推論の梯子", plain: "人は観測から一部を選び、意味を付け、結論へ上る。", can: "どこからが人間の推測か可視化する。", limit: "観測データも測定方法の影響を受ける。", misuse: "『事実など存在しない』として検証を放棄する。" },
    case: { name: "Zoom S-1", role: "印象ではなく導入・利用・収益の事実を積む", scene: "『無料で使えるから成長しただけ』という説明を検査する。", facts: ["FY2019売上は約3.305億ドル、純利益は約760万ドル。", "VMwareは約19,000人が利用し、3か月で4,100万分超の会議。", "数値は導入規模を示すが、個々の購入理由は直接示さない。"], reasoning: ["判断1：財務数値と顧客事例を別の証拠として置く。", "理由：全社成長と一社の利用は一般化範囲が違う。", "判断2：『簡単だから』は仮説に戻す。", "次の判断：他の説明と区別する追加データを求める。"] },
    drills: [
      { prompt: "「顧客は高いと言って帰った」を事実と解釈に分ける。", avoid: "『価格が原因』を事実欄に置く。", hint: "録音で確認できる文と、その意味を分ける。", model: "事実：顧客は見積提示後に『高いですね。持ち帰ります』と発言し、その場で契約しなかった。解釈：価格が主要障害かもしれない。", why: "発言・行動と原因仮説の境界が明確。", mistake: "『買う気がない』まで事実扱いする。" },
      { prompt: "同じ事実から別の解釈を二つ作る。", avoid: "単なる言い換えを二つ並べる。", hint: "お金以外のリスク・権限・比較を考える。", model: "①自分だけでは決裁できない。②効果証拠が弱く、失敗リスクに見合わない。", why: "異なる追加情報で順位が変わる仮説。", mistake: "『高い』『割高』を別仮説にする。" },
      { prompt: "解釈を検査する観測を一つ足す。", avoid: "『本当ですか』と聞く。", hint: "選択肢ごとに異なる答えが出る質問。", model: "「もし費用が同じでも今日決めにくい点は何ですか」と尋ね、価格以外の障害を確認する。", why: "価格仮説だけで説明できない情報を取れる。", mistake: "値引き後の成約だけで原因を証明する。" },
    ],
    independent: { name: "B2B研修", scene: "担当者は『内容は良いですが検討します』と答え、返信が止まった。", prompt: "観測事実・解釈・代替解釈を分けてください。", model: "事実：提案後14日返信なし。解釈：優先順位が下がった。代替：予算承認待ち／比較先の評価中／担当者が社内説明できない。" },
    transfer: "自分の案件のメモを3行選び、Fact／Quote／Calculation／Interpretationのラベルを付ける。",
    rubric: { pass: "事実欄に心理原因がない。", standard: "発言・行動・計算を別記録する。", pro: "一般化できる範囲と不足情報まで明示する。", revise: "『〜と思っている』『〜だから』を解釈欄へ移す。" },
    output: "Fact / Interpretation Separation Sheet", next: "分離できても、証拠の出所や利害が弱ければ仮説は歪む。Day3で情報源を評価する。", sources: [courseraSocial, zoom],
  },
  {
    day: 3, stage: 1, title: "証拠の強さと出所を評価する", capability: "一次・二次資料、母集団、利害、測定方法から証拠の重みを変える",
    question: "有名成功事例や顧客インタビューを、どこまで信じてよいか。",
    why: "有名企業の物語は結果を知った後に整えられやすく、魅力的な説明ほど他案件へ過剰一般化される。",
    theory: { name: "Source Monitoring / Evidence Hierarchy", plain: "主張の中身だけでなく、誰が何の目的でどう測ったかを評価する。", can: "証拠の採用・保留・棄却を一貫させる。", limit: "一次資料も完全・中立とは限らない。", misuse: "権威ある出所だけを自動的に真実とする。" },
    case: { name: "Airbnb S-1", role: "公式資料の強さと限界を同時に読む", scene: "『コミュニティの強さが危機を救った』という物語を検査する。", facts: ["2020年売上は約34億ドル、前年約48億ドルから30%減。", "S-1は監査済み財務と会社側の説明を含む。", "危機対応と回復の因果は資料だけでは単独証明できない。"], reasoning: ["判断1：財務数値は強いが、原因説明は仮説として扱う。", "理由：同じ文書でも証拠の性質が違う。", "判断2：予約、供給、地域、時系列を追加する。", "次の判断：反対説明でも同じ結果が起こるか検査する。"] },
    drills: [
      { prompt: "企業ブログの『満足度95%』に必要な確認項目を一つ書く。", avoid: "企業発表だから嘘と決める。", hint: "誰に、いつ、どう聞いたか。", model: "回答者数・回答率・対象母集団・質問文・調査時点を確認する。", why: "95%という数字を再解釈できる。", mistake: "サンプル数だけ確認し代表性を見ない。" },
      { prompt: "顧客インタビュー1名の発言を使える範囲を書く。", avoid: "市場全体の需要へ一般化する。", hint: "証明ではなく仮説生成に使う。", model: "その顧客の状況理解と新しい仮説の生成には使うが、発生率や市場規模の推定には使わない。", why: "質的証拠の役割を適切に限定。", mistake: "具体的だから代表的だと思う。" },
      { prompt: "証拠にA/B/Cの重みを付け、理由を一文で書く。", avoid: "好きな結論を支持する資料をAにする。", hint: "直接性・再現性・利害・代表性。", model: "A：同一期間の決済ログ。対象行動を直接・全件記録し、記憶回答に依存しないため。", why: "結論でなく測定特性で評価している。", mistake: "最新資料という理由だけでAにする。" },
    ],
    independent: { name: "美容医療広告", scene: "院のLPは『98%が効果を実感』と掲載するが調査詳細がない。", prompt: "採用・保留・棄却のどれにし、何を追加確認しますか。", model: "保留。対象施術、母数、追跡期間、脱落者、質問尺度、有害事象、第三者確認の有無を求める。" },
    transfer: "自分が根拠にしている数字を一つ選び、出所・母集団・利害・測定・一般化範囲を追記する。",
    rubric: { pass: "数字と説明の証拠強度を分ける。", standard: "採用範囲と保留条件がある。", pro: "反対利害の資料や行動ログで三角測量する。", revise: "『公式』『有名』を理由から外し、測定方法を書く。" },
    output: "Observation Evidence Log", next: "強い証拠でも、比較する基準や文脈が違えば結論を誤る。Day4でベースレートを入れる。", sources: [airbnb],
  },
  {
    day: 4, stage: 1, title: "比較基準と文脈を入れる", capability: "時系列・類似群・母集団・外部変化を揃えて異常を判定する",
    question: "転換率が下がったとき、本当に問題が起きたのかどう見分けるか。",
    why: "構成比や季節、チャネル変更を無視すると、正常な変動を危機と呼び、逆に重大な劣化を平均で隠す。",
    theory: { name: "Base Rate / Reference Class", plain: "個別の鮮明な情報より先に、類似した条件で通常どの程度起こるかを見る。", can: "異常度と予測の初期値を改善する。", limit: "適切な類似群がなければ誤誘導する。", misuse: "平均を個別案件の運命として扱う。" },
    case: { name: "Duolingo Q1 FY2026", role: "利用・課金・売上の異なる母数を読む", scene: "『DAUが伸びたので収益も同率で伸びる』と予測する。", facts: ["DAU 56.5百万。", "有料加入者12.5百万。", "Subscription bookings 268.1百万ドル。"], reasoning: ["判断1：三指標を同じ割合として扱わない。", "理由：利用者・有料状態・期間収益の母集団と時点が違う。", "判断2：各率の分母と推移を作る。", "次の判断：コホート別の継続と単価を見る。"] },
    drills: [
      { prompt: "今月CVR 2.4%を評価する比較群を二つ書く。", avoid: "無関係な業界平均だけを置く。", hint: "自社時系列と条件一致群。", model: "①同じLP・価格・流入元の過去12週。②同期間の既存LPを見たランダム比較群。", why: "季節と介入差を分離しやすい。", mistake: "全チャネル平均とSNS広告だけを比べる。" },
      { prompt: "平均CVRが隠す構成変化を一つ挙げる。", avoid: "原因を心理で説明する。", hint: "新規/既存、端末、国、チャネル。", model: "低意向の動画広告流入が全体の20%から55%へ増え、各チャネルCVRは不変でも全体が低下した。", why: "ミックス変化で見かけの悪化を説明できる。", mistake: "平均だけからLP劣化と断定する。" },
      { prompt: "異常と判定する前に固定する期間を書く。", avoid: "結果を見て都合よく期間を変える。", hint: "意思決定周期を含める。", model: "週次変動ではなく、同じ曜日構成の4週間移動平均を事前基準にする。", why: "ノイズへの過剰反応を抑える。", mistake: "最悪の1日と最高の1日を比較する。" },
    ],
    independent: { name: "採用サービス", scene: "応募数は30%減ったが求人掲載数も40%減っている。", prompt: "何を分母にし、どの比較で問題を定義しますか。", model: "求人1件当たり応募、閲覧→応募率、職種・地域別を前年同時期と比較し、総応募減と求人供給減を分離する。" },
    transfer: "自分の主要指標に分母・比較期間・類似群・構成比を追記する。",
    rubric: { pass: "比較条件が一つ以上揃う。", standard: "分母と構成比を明示。", pro: "介入前に異常判定ルールを固定する。", revise: "単独の数字を比率と時系列に置き換える。" },
    output: "Context & Baseline Card", next: "異常を確認しても、原因候補が一つでは診断にならない。Day5で競合仮説を作る。", sources: [duolingo, courseraAnalytics],
  },
  {
    day: 5, stage: 1, title: "競合仮説と反証を作る", capability: "同じ結果を説明する複数仮説と、順位を変える証拠を設計する",
    question: "最初に思いついた原因へ飛びつかず、次に何を調べるか決めるには。",
    why: "一つの仮説しかなければ、あらゆる情報がその物語の補強に使われ、調査が説得活動になる。",
    theory: { name: "Confirmation Bias / Falsification", plain: "自説を支持する情報だけを探しやすいので、反対なら何が観測されるかを先に書く。", can: "仮説の識別力と更新可能性を高める。", limit: "複雑な商業現象は一因だけで決まらない。", misuse: "一つの反例で多因子の仮説を全否定する。" },
    case: { name: "Slack S-1", role: "利用拡大と有料化を別仮説で説明する", scene: "無料利用が多いので価格を下げれば有料化すると主張された。", facts: ["DAU 1,000万超。", "有料顧客88,000超。", "無料組織50万超、週50百万時間超の利用。"], reasoning: ["第一仮説：価格障害。", "代替：組織規模、管理機能、導入権限、無料でJobを満たす。", "識別：価格閲覧、管理者行動、席数、利用深度で群を分ける。", "更新：値下げ前に障害別の小実験を行う。"] },
    drills: [
      { prompt: "『体験後に購入しない』の第一仮説を一つ書く。", avoid: "複数原因を一文に詰める。", hint: "一つの原因なら何が観測されるか。", model: "体験で期待した成果の兆候を感じられず、支払う価値が低いと判断した。", why: "検査可能な価値仮説。", mistake: "『刺さらなかった』で終える。" },
      { prompt: "機構が異なる代替仮説を三つ書く。", avoid: "価格の言い換えを並べる。", hint: "価値・信頼・権限・摩擦。", model: "①成果証拠への不信。②家族の承認が必要。③申込手順で離脱。", why: "必要な追加証拠がそれぞれ違う。", mistake: "高い／割高／予算不足。" },
      { prompt: "仮説順位を変える識別質問を一つ作る。", avoid: "『どう思いましたか』と広く聞く。", hint: "答えAなら仮説1、Bなら仮説2が上がる。", model: "「申込めない最大の理由が一つ解消するとしたら、効果への確信・支払時期・家族確認・手続きのどれですか。なぜですか」", why: "選択後の理由で順位を更新できる。", mistake: "顧客に原因診断を丸投げする。" },
    ],
    independent: { name: "寄付サイト", scene: "寄付ページ閲覧は増えたが完了率は低下。", prompt: "第一仮説・代替2つ・識別証拠を作ってください。", model: "第一：決済摩擦。代替：使途への不信／低意向流入増。端末別エラー、使途ページ閲覧、流入別CVRで識別する。" },
    transfer: "自案件の問題に、機構が異なる4仮説と各反証条件を置く。",
    rubric: { pass: "代替仮説が2つ以上。", standard: "各仮説に異なる識別証拠。", pro: "事前確率と反証後の次判断まである。", revise: "原因候補を『もし正しければ／誤りなら』の二文にする。" },
    output: "Competing Hypothesis Map + Falsification Table", next: "仮説を作れても、顧客が達成したい進歩を外すと局所最適になる。Day6でJobを捉える。", sources: [slack],
  },
  {
    day: 6, stage: 2, title: "顧客のJobを捉える", capability: "商品属性ではなく、特定状況で顧客が進めたい変化を定義する",
    question: "顧客はその商品を何のために『雇う』のか。",
    why: "年齢・性別・好みだけでは、購入が起きる瞬間、競合する代替、成功条件を説明できない。",
    theory: { name: "Jobs to Be Done", plain: "顧客は状況の中で望む進歩を実現するために解決策を採用する。", can: "機能的・感情的・社会的Jobと代替を結ぶ。", limit: "市場規模や支払意思を単独では示さない。", misuse: "『便利になりたい』のような普遍的欲求で止める。" },
    case: { name: "Adobe Creative Cloud移行", role: "ソフト所有でなく継続的な制作環境のJobを読む", scene: "買い切り利用者へサブスクを導入し反発が起きた。", facts: ["FY2013 subscription revenue約11.38億ドル。", "Q3 FY2013までに有料Creative Cloud個人会員100万。", "支払方法だけでなく更新・連携・アクセスの価値が変化。"], reasoning: ["状況：複数端末・継続更新・共同制作。", "進歩：制作環境を最新状態で途切れず使う。", "不安：永続所有を失う、継続費用。", "診断：Jobが弱い群に一律移行を迫らない。"] },
    drills: [
      { prompt: "顧客の状況を『〜のとき』で書く。", avoid: "30代女性など属性だけを書く。", hint: "変化や締切が起きた瞬間。", model: "重要な提案の3日前に、専門家らしい資料へ短時間で仕上げたいとき。", why: "採用が発生する具体的文脈。", mistake: "仕事を効率化したい人。" },
      { prompt: "望む進歩を現在→望む状態で書く。", avoid: "商品機能を答える。", hint: "ツールがなくても成立する表現。", model: "資料作成に迷う状態から、判断根拠が伝わり自信を持って提出できる状態へ。", why: "代替解決策を比較できる。", mistake: "テンプレートを使いたい。" },
      { prompt: "機能・感情・社会的Jobを一つずつ書く。", avoid: "同じ文の言い換え。", hint: "成し遂げる／感じる／どう見られる。", model: "機能：締切内に完成。感情：不安を減らす。社会：信頼できる提案者と見られる。", why: "意思決定の複数価値を保持する。", mistake: "すべて『成功したい』。" },
    ],
    independent: { name: "医療観光", scene: "海外患者が高額な健診パッケージを比較する。", prompt: "状況・進歩・不安・代替を定義してください。", model: "母国で診断が曖昧なとき、言語と移動の不安を管理しつつ短期間で信頼できる判断材料を得る。代替は母国再診・オンライン相談・経過観察。" },
    transfer: "実顧客1人の採用前状況、押す力、引く力、不安、習慣、成功条件を1枚にする。",
    rubric: { pass: "状況と進歩が商品名なしで書ける。", standard: "4つの力と代替がある。", pro: "同じ属性でもJobが違う群を分ける。", revise: "属性を『〜のとき』へ、機能を『〜になりたい』へ変える。" },
    output: "Jobs to Be Done Snapshot", next: "Jobが分かっても、どの段階で決定が止まるかは別問題。Day7で旅程と摩擦を描く。", sources: [jtbd, adobe],
  },
  {
    day: 7, stage: 2, title: "決定旅程と摩擦を描く", capability: "認知から価値実現までの行動・疑問・離脱点を時系列で特定する",
    question: "顧客が『欲しい』のに進まない場所はどこか。",
    why: "購入だけを見ると、情報探索、比較、社内承認、導入、初期成功で起きる損失を取り逃す。",
    theory: { name: "Customer Decision Journey / Friction", plain: "決定は一瞬でなく、複数の行動と不確実性を通過する。", can: "止まる段階と必要な介入を対応させる。", limit: "全員が同じ直線を進むわけではない。", misuse: "企業側の部署工程を顧客旅程として描く。" },
    case: { name: "Zoomの導入拡大", role: "初回利用から組織採用までの摩擦を分ける", scene: "無料会議の利用者をすぐ企業契約見込みとみなす。", facts: ["個人利用と組織契約は異なる意思決定。", "VMware事例では大規模な実利用が証拠になった。", "セキュリティ、管理、購買が後段に現れる。"], reasoning: ["旅程：試す→反復→チーム拡散→管理要件→購買。", "摩擦：技術より権限とリスクが後段で増える。", "介入：各段階の次行動に必要な証拠を置く。", "測定：同一母集団の段階転換を追う。"] },
    drills: [
      { prompt: "購入前後を含む行動を5段階で書く。", avoid: "認知→興味→購入だけ。", hint: "探索・比較・承認・導入・初期成果。", model: "問題認識→候補探索→比較と相談→契約・設定→最初の成果確認。", why: "価値実現までの離脱を見られる。", mistake: "企業の営業工程を書く。" },
      { prompt: "各段階の『顧客が答えたい問い』を一つ置く。", avoid: "企業の訴求文を書く。", hint: "次へ進めない不確実性。", model: "比較段階：自分の状況でも成果が出る証拠はあるか。", why: "コンテンツや証拠の役割が明確。", mistake: "商品の特徴は何か、だけ。" },
      { prompt: "摩擦を能力・動機・機会に分ける。", avoid: "すべて面倒でまとめる。", hint: "できない／したくない／環境が許さない。", model: "能力：設定方法不明。動機：失敗不安。機会：決裁者不在。", why: "介入の種類を誤らない。", mistake: "説明を増やせば全部解決すると考える。" },
    ],
    independent: { name: "オンライン教育", scene: "無料体験完了者は多いが有料開始後7日で休眠する。", prompt: "旅程のどこを問題にし、何を観測しますか。", model: "購入でなく初期価値実現を問題にする。初回課題完了、次回予約、学習時間、期待とのずれ、支援利用を追う。" },
    transfer: "自事業の『知る前』から『最初の成果』までを7行で描き、最大摩擦を一つ選ぶ。",
    rubric: { pass: "購入後を含む。", standard: "行動・問い・証拠・摩擦が対応。", pro: "複数経路と戻りを認め、測定点がある。", revise: "社内工程を顧客が実際に行う動詞へ書き換える。" },
    output: "Decision Journey + Friction Audit", next: "摩擦の場所が分かっても、なぜそこが感情的に重いかはまだ分からない。Day8で動機を扱う。", sources: [zoom],
  },
  {
    day: 8, stage: 2, title: "動機・感情・アイデンティティを読む", capability: "接近と回避、予期感情、自己像が決定へ与える仮説を作る",
    question: "合理的には得でも、なぜ顧客は動かないのか。",
    why: "ROIだけを示すと、後悔・恥・自己効力感・所属への脅威など、行動を止める予期感情を見逃す。",
    theory: { name: "Approach–Avoidance / Anticipated Emotion", plain: "同じ選択が望ましい結果と避けたい結果を同時に呼ぶ。", can: "先延ばしや接近後の離脱の仮説を作る。", limit: "感情を測らず普遍的原因と断定できない。", misuse: "恐怖を煽れば動くと操作へ使う。" },
    case: { name: "高額美容サービス（複合ケース）", role: "価格以外の自己像と後悔リスクを理解する", scene: "相談者は施術結果を望む一方、『周囲に気づかれたくない』と言う。", facts: ["効果期待と社会的露出不安が同時にある。", "高額支払は失敗時の後悔を拡大しうる。", "医学的効果・副作用は個別の専門評価が必要。"], reasoning: ["第一仮説：金額障害。", "代替：自己像の不一致、露出、不可逆性。", "識別：結果・過程・他者反応のどれが怖いかを分ける。", "介入：煽らず、選択しない自由と可逆な段階を用意。"] },
    drills: [
      { prompt: "接近したい結果と避けたい結果を一つずつ書く。", avoid: "好き／嫌いだけ。", hint: "選んだ後に何が起きる予想か。", model: "接近：鏡を見る不安を減らす。回避：不自然な変化を他者に指摘される。", why: "同じ選択内の葛藤を表す。", mistake: "効果がほしい／価格が嫌。" },
      { prompt: "アイデンティティ仮説を検査する質問を作る。", avoid: "『自信がないですか』と誘導する。", hint: "選択が自分らしさに合う／合わない場面。", model: "「この選択をした自分を、半年後どんな人だと感じそうですか。逆に迷うのはどんな自分に見えそうだからですか」", why: "本人の語彙で自己像を確認できる。", mistake: "高級志向などのラベルを先に当てる。" },
      { prompt: "倫理的な不安低減策を一つ作る。", avoid: "緊急性を捏造する。", hint: "情報、可逆性、相談、熟考。", model: "副作用・代替・総費用を同じ視認性で示し、24時間の熟考期間とキャンセル手順を用意する。", why: "自律性を保ちながら不確実性を下げる。", mistake: "不安を否定して成功例だけ見せる。" },
    ],
    independent: { name: "管理職研修", scene: "候補者は昇進したいが、研修参加を部下に知られるのを嫌がる。", prompt: "動機葛藤と識別質問を作ってください。", model: "成長・昇進への接近と『能力不足と見られる』回避の葛藤。参加形式、匿名性、上司推薦の意味を質問して識別する。" },
    transfer: "自顧客が選択後に期待する感情と恐れる感情を各2つ、根拠となる発言と並べる。",
    rubric: { pass: "接近と回避が両方ある。", standard: "発言・行動根拠と識別質問がある。", pro: "自律性を守る介入に変換。", revise: "性格ラベルを、特定状況での予期へ書き換える。" },
    output: "Motivation & Emotion Map", next: "本人の動機が強くても、相手や提供者を信頼できなければ動けない。Day9で信頼とリスクを分解する。", sources: [courseraSocial],
  },
  {
    day: 9, stage: 2, title: "信頼と知覚リスクを分解する", capability: "能力・善意・誠実さと、性能・金銭・社会・時間リスクを対応させる",
    question: "『怪しい』『失敗したくない』を、どの証拠で解消するか。",
    why: "信頼不足を口コミの量で埋めると、能力証拠は増えても利益相反や失敗時対応の不安は残る。",
    theory: { name: "Trustworthiness / Perceived Risk", plain: "信頼は相手の能力、善意、約束の一貫性を不確実な状況で評価すること。", can: "リスク種類ごとに必要な証拠・保証を設計する。", limit: "証拠があっても個人・制度の文脈で評価は異なる。", misuse: "社会的証明で合理的リスクを覆い隠す。" },
    case: { name: "Airbnbの両面市場", role: "ホストとゲスト双方の信頼装置を理解する", scene: "見知らぬ人の家に泊まる／貸すという相互リスクがある。", facts: ["本人確認、レビュー、決済、サポートが複数リスクに対応。", "レビューだけでは安全・補償・情報の完全性を保証しない。", "信頼装置は参加者双方の行動へ影響する。"], reasoning: ["リスク：安全、資産、品質、決済、評判。", "証拠：同じ口コミを万能に使わない。", "移転：保証・手順・第三者確認で負担主体を変える。", "測定：成約だけでなく事故・問い合わせ・再利用を見る。"] },
    drills: [
      { prompt: "『怪しい』を具体的リスク二つに変換する。", avoid: "信頼感がないで止める。", hint: "何を失う、誰にどう見られる。", model: "①前払い後に成果物が届かない金銭リスク。②推薦して失敗し社内評価を失う社会的リスク。", why: "必要な対策が別になる。", mistake: "不安、心配、怪しいを並べる。" },
      { prompt: "証拠と保証を区別して一つずつ書く。", avoid: "成功事例だけを保証と呼ぶ。", hint: "確率を知る／損失を引き受ける。", model: "証拠：同条件顧客の継続率。保証：未達時の再実施条件を契約に明記。", why: "不確実性低減と損失移転を分ける。", mistake: "返金保証で効果まで証明したと思う。" },
      { prompt: "信頼の能力・善意・誠実さに各証拠を置く。", avoid: "資格一つで全てを満たす。", hint: "できる／こちらの利益を見る／約束を守る。", model: "能力：同条件の監査事例。善意：不適合時に販売しない基準。誠実さ：料金・失敗・変更履歴の開示。", why: "信頼不足の型に対応。", mistake: "フォロワー数だけ。" },
    ],
    independent: { name: "新規SaaS", scene: "機能は評価されるが、顧客はデータ移行と倒産リスクを懸念。", prompt: "Risk×Trust Matrixを作るなら何を置きますか。", model: "性能：移行テスト、時間：移行支援、継続性：データエクスポート・SLA・財務/運用情報。能力・誠実さ双方の証拠を置く。" },
    transfer: "自分のOfferで顧客が失う可能性を5分類し、証拠・保証・可逆性を一つずつ対応させる。",
    rubric: { pass: "リスクが具体的損失で書ける。", standard: "証拠と保証が分離。", pro: "残余リスクと販売しない条件も示す。", revise: "口コミを外し、損失の種類ごとに再設計する。" },
    output: "Risk & Trust Matrix", next: "個人が信頼しても、組織では決定権・予算・政治が止める。Day10で意思決定単位を見る。", sources: [airbnb],
  },
  {
    day: 10, stage: 2, title: "意思決定権限と組織政治を読む", capability: "利用者・推進者・決裁者・阻害者・予算所有者の利害を分ける",
    question: "担当者が賛成なのに、なぜ案件は進まないのか。",
    why: "担当者の熱意を組織の意思決定と同一視すると、決裁条件と内部リスクを聞かないまま提案を作る。",
    theory: { name: "Buying Center / Principal–Agent", plain: "組織の選択には異なる役割・評価指標・リスクを持つ人が参加する。", can: "誰のJobと証拠が不足しているかを特定する。", limit: "役職名だけでは非公式権力を示さない。", misuse: "決裁者だけを攻略し利用者を無視する。" },
    case: { name: "Zoom × VMware", role: "大規模利用と企業採用の決定単位を推定する", scene: "現場利用が広がった後、全社契約を提案する。", facts: ["利用者は使いやすさと会議品質を経験。", "ITはセキュリティ、統合、管理を評価。", "購買・財務は契約と総費用を評価。"], reasoning: ["地図：利用者、現場推進、IT、法務、購買、経営。", "利害：同じ『価値』ではない。", "証拠：役割ごとの意思決定リスクに合わせる。", "質問：公式プロセスと過去の却下例を聞く。"] },
    drills: [
      { prompt: "案件の5役割を役職でなく行動で定義する。", avoid: "部長、担当者だけ。", hint: "使う／推す／払う／止める／承認する。", model: "日常利用者、社内説明するChampion、予算を失うOwner、技術承認者、最終署名者。", why: "兼任や非公式権力を扱える。", mistake: "肩書から利害を決めつける。" },
      { prompt: "Championが負う個人的リスクを書く。", avoid: "会社のROIだけ。", hint: "推薦が失敗したら何を失うか。", model: "導入失敗で判断力を疑われ、次の改善案件の発言権を失う。", why: "社内説明資料や段階導入の必要性が見える。", mistake: "担当者は味方だからリスクなし。" },
      { prompt: "非公式阻害者を見つける質問を作る。", avoid: "決裁者は誰ですか、だけ。", hint: "過去に止まった例と意見を聞かれる人。", model: "「似た提案が最後に止まったのは誰のどんな懸念でしたか。署名前に必ず意見を求められる人はいますか」", why: "組織図にない拒否権を発見できる。", mistake: "担当者に人名リストだけ要求する。" },
    ],
    independent: { name: "自治体DX", scene: "現場課は賛成だが、情報政策課と財務課が未参加。", prompt: "Decision Unit Mapと最初の介入を作ってください。", model: "現場価値、情報セキュリティ、予算周期、住民説明を別条件にし、提案前に各部門の拒否条件を短時間で確認する。" },
    transfer: "自案件の意思決定者を7役割で描き、各人の勝ち・損失・証拠・次行動を1行ずつ書く。",
    rubric: { pass: "利用者と決裁者を分ける。", standard: "利害・拒否条件・非公式権力がある。", pro: "Championが社内で売れる材料を設計。", revise: "役職表を、行動・リスク・証拠の表へ変換する。" },
    output: "Decision Unit & Politics Map", next: "決定構造が分かっても、誰に最初に集中するか決めなければ資源が散る。Day11で文脈セグメントを作る。", sources: [zoom, wells],
  },
  {
    day: 11, stage: 3, title: "決定文脈でセグメントする", capability: "属性でなく、Job・きっかけ・制約・代替・決定構造で優先顧客を分ける",
    question: "誰に売るかを、年齢や業種より実務的に決めるには。",
    why: "属性が同じでも必要な進歩と購買条件が違えば、同じOffer・証拠・チャネルは機能しない。",
    theory: { name: "Needs-based Segmentation", plain: "似た商業反応を生む状況・ニーズ・制約で群を作る。", can: "Offerと到達方法を変える単位を作る。", limit: "調査内の群が市場で到達可能とは限らない。", misuse: "細分化そのものを目的にし、小さすぎるペルソナを量産する。" },
    case: { name: "Slackの無料組織と有料顧客", role: "利用量だけでなく組織文脈を分ける", scene: "無料組織50万を一つの有料化市場として扱う。", facts: ["利用者数・組織数・有料顧客は異なる。", "規模、統制、検索、連携の必要性で有料価値は変わる。", "無料でJobを満たす組織もある。"], reasoning: ["分割軸：協働複雑性、統制要求、利用密度、決裁力。", "優先：痛みが強く、到達可能で、証拠が作れる群。", "除外：無料で十分な群を無理に説得しない。", "測定：群別の行動と経済性を見る。"] },
    drills: [
      { prompt: "属性セグメントを決定文脈へ変換する。", avoid: "30代女性、IT企業などで止める。", hint: "何が起きた時、何を失い、誰と決めるか。", model: "初めて部下を持ち、90日以内に評価面談を任されるが、相談相手のいない新任管理職。", why: "きっかけ・期限・Job・制約がある。", mistake: "意識の高い管理職。" },
      { prompt: "優先度を痛み・到達・支払・証拠で採点する。", avoid: "市場規模だけで選ぶ。", hint: "今の自分が勝てるか。", model: "新任管理職：痛み4、到達4、支払3、証拠4＝15/20。独立経営者全般：8/20。", why: "願望でなく選択基準を作る。", mistake: "人数が多い群を優先。" },
      { prompt: "非顧客条件を一つ書く。", avoid: "誰でも歓迎。", hint: "成果を出せない／経済性が合わない条件。", model: "意思決定権も実験用データもなく、助言だけを求める案件は対象外。", why: "信頼と資源を守る。", mistake: "予算が低い人だけを除外。" },
    ],
    independent: { name: "医療健診", scene: "40–60代富裕層を狙う案がある。", prompt: "実務で反応が異なる文脈セグメントを3つ作ってください。", model: "診断不確実性を解消したい群／時間制約下で包括確認したい群／家族の安心を得たい群。移動、言語、医師紹介、決裁者が異なる。" },
    transfer: "自市場を3–5文脈に分け、最優先と明確な非対象を決める。",
    rubric: { pass: "属性以外の軸が3つ。", standard: "各群でOfferか証拠が変わる。", pro: "到達可能性と経済性まで評価。", revise: "群名を『〜のとき〜したい人』へ書き換える。" },
    output: "Decision-context Segmentation", next: "顧客を選んでも、顧客が実際に比較する代替を外せば価値は伝わらない。Day12で競争を再定義する。", sources: [slack, courseraMarketing],
  },
  {
    day: 12, stage: 3, title: "真の代替と競争を特定する", capability: "同カテゴリ製品だけでなく、現状維持・内製・別Jobの解決策を比較する",
    question: "顧客の頭の中で、自分は本当は何と競っているか。",
    why: "競合企業の機能表だけを見ると、最大の競争相手である『何もしない』『Excelで続ける』を無視する。",
    theory: { name: "Competitive Set / Switching Forces", plain: "代替は同じ商品分類でなく、同じ進歩を別の方法で実現する選択肢。", can: "切替コストと比較基準を顧客視点で発見する。", limit: "語られた代替と実際の行動は一致しないことがある。", misuse: "全てを競合と呼び差別化不能にする。" },
    case: { name: "Airbnbの代替", role: "ホテルだけでなく旅行しない選択を含める", scene: "宿泊市場のシェアだけで需要を予測する。", facts: ["ゲストにはホテル、友人宅、日帰り、旅行中止がある。", "ホストには空室維持、長期賃貸、売却がある。", "両面の代替が供給と需要を同時に変える。"], reasoning: ["Job別に代替集合を作る。", "現状維持の利得と切替不安を記録。", "比較基準は価格だけでなく場所、信頼、柔軟性。", "介入：勝てないJobでは競わない。"] },
    drills: [
      { prompt: "同カテゴリ外の代替を三つ書く。", avoid: "競合ブランド名だけ。", hint: "自作、延期、相談、何もしない。", model: "コンサル購入の代替：社内で調査、同業者へ相談、問題を延期。", why: "予算がどこから来るかも見える。", mistake: "他社コンサル3社だけ。" },
      { prompt: "現状維持が提供する利得を書く。", avoid: "怠惰と呼ぶ。", hint: "変えないことで避けられる損失。", model: "導入責任、学習時間、既存業務停止、社内対立を避けられる。", why: "不作為も合理的選択になりうる。", mistake: "危機感がない人。" },
      { prompt: "切替の押す力・引く力・不安・習慣を置く。", avoid: "メリット／デメリットだけ。", hint: "現状から押す、未来へ引く、切替を止める、戻す。", model: "押す：集計ミス。引く：即時可視化。不安：移行失敗。習慣：Excel共有。", why: "介入点が4方向に分かれる。", mistake: "引く力だけを強調。" },
    ],
    independent: { name: "英語学習アプリ", scene: "競合アプリ分析は詳細だが、継続率が上がらない。", prompt: "実際の代替と比較基準を再定義してください。", model: "YouTube、講師、通勤中のSNS、学習しないを含め、開始摩擦、即時報酬、会話成果、費用、習慣適合で比較する。" },
    transfer: "最優先セグメントの過去の解決法を5つ聞き、選ぶ／捨てる基準を記録する。",
    rubric: { pass: "現状維持を含む3代替。", standard: "代替ごとの利得と切替力がある。", pro: "予算競合と勝たない条件まで決める。", revise: "製品カテゴリを消し、『同じ進歩を得る方法』で列挙する。" },
    output: "Alternative & Switching Map", next: "代替が分かっても、自社価値を形容詞で語れば比較に勝てない。Day13で価値証拠を作る。", sources: [airbnb, jtbd],
  },
  {
    day: 13, stage: 3, title: "価値を証拠の梯子へ変える", capability: "機能→行動変化→業務結果→経済・感情価値を根拠とともに接続する",
    question: "『高品質』『効率化』を、顧客が判断できる証拠へどう変えるか。",
    why: "便益を断定しても、誰にどの条件でどれほど起きるかがなければ、価格比較だけが残る。",
    theory: { name: "Value Proposition / Evidence Ladder", plain: "提供物が顧客行動を変え、その結果が価値になる因果の段を示す。", can: "主張に必要な証拠と測定条件を特定する。", limit: "相関事例だけでは因果を保証しない。", misuse: "最終ROIを根拠なく積み上げる。" },
    case: { name: "Zoom × VMware", role: "機能から利用証拠、組織価値へ段階を追う", scene: "『使いやすいので生産性が上がる』という主張を検査する。", facts: ["19,000人の利用と3か月4,100万分超の会議。", "利用規模は採用・使用を示す。", "生産性・移動費削減を直接示すには追加比較が必要。"], reasoning: ["機能：容易な会議接続。", "行動：大規模・反復利用。", "結果仮説：会議成立率、移動回避。", "価値：時間・費用・協働。ただし測定が必要。"] },
    drills: [
      { prompt: "『AIで効率化』を4段の梯子にする。", avoid: "効率化を三回言い換える。", hint: "機能→行動→結果→価値。", model: "要約生成→会議後30分以内に確認→再確認時間が週2時間減る→担当者月8時間を顧客対応へ移せる。", why: "各段を測定可能。", mistake: "売上20%増まで飛ぶ。" },
      { prompt: "各段に証拠強度を付ける。", avoid: "事例一件を因果証明にする。", hint: "デモ、ログ、比較、RCT。", model: "生成機能A、確認時間B、時間削減B、売上転換C。売上主張は保留する。", why: "言える範囲を守る。", mistake: "すべてA。" },
      { prompt: "失敗条件を一つ書く。", avoid: "誰でも効果。", hint: "行動変化が起きない条件。", model: "要約の確認責任者と利用手順がない組織では、生成されても確認時間は減らない。", why: "導入条件を価値に含める。", mistake: "利用者の努力不足に帰属。" },
    ],
    independent: { name: "人材採用支援", scene: "『採用品質を上げる』と提案している。", prompt: "価値証拠の梯子と未検証部分を作ってください。", model: "構造化面接→評価項目の使用率→面接官間一致→入社後評価/離職。後半は時間差と交絡が大きく、検証計画が必要。" },
    transfer: "自Offerの主張を一つ選び、4段・証拠・失敗条件へ分解する。",
    rubric: { pass: "4段が因果順。", standard: "証拠強度と未検証が分離。", pro: "価値実現条件と反証指標がある。", revise: "形容詞を時間・率・行動・損失の単位へ変える。" },
    output: "Value Evidence Table", next: "価値が示せても、どのカテゴリーとして比較されるかで意味が変わる。Day14で位置を決める。", sources: [zoom, courseraMarketing],
  },
  {
    day: 14, stage: 3, title: "カテゴリーとポジションを決める", capability: "最優先セグメントが自社価値を理解できる比較枠を選ぶ",
    question: "『何者か』を、顧客が比較・理解できる一文にするには。",
    why: "独自性を増やしても、比較枠が不明なら顧客は評価できず、既知の安いカテゴリへ分類する。",
    theory: { name: "Positioning / Categorization", plain: "顧客が判断に使うカテゴリー、代替、重要属性の中で意味を作る。", can: "価値証拠を比較基準へ接続する。", limit: "言葉だけで製品体験や供給能力は変わらない。", misuse: "競合と違う形容詞を並べる。" },
    case: { name: "Adobe Creative Cloud", role: "製品購入から制作サービスへのカテゴリー移行を見る", scene: "買い切りソフトの値段で月額を比較される。", facts: ["継続更新・複数サービス・クラウド連携を束ねた。", "一方で所有喪失と累積費用の反発。", "新カテゴリーの価値と新リスクが同時発生。"], reasoning: ["旧枠：ソフトの永続ライセンス。", "新枠：継続的な制作環境。", "証拠：更新、連携、アクセス。", "境界：単発利用者には旧枠が合理的な場合もある。"] },
    drills: [
      { prompt: "現在入れられているカテゴリーを書く。", avoid: "自分の希望だけ。", hint: "顧客が検索・予算化する名前。", model: "『SNS運用代行』として比較され、投稿本数と月額で評価されている。", why: "実際の比較軸を認識。", mistake: "唯一無二の伴走者。" },
      { prompt: "別カテゴリーに移す根拠を一つ作る。", avoid: "名前だけ高級化。", hint: "Job・成果・証拠が変わるか。", model: "運用代行ではなく『商談仮説検証システム』とし、投稿数でなく有効仮説・商談化・学習速度を納品する。", why: "提供物と測定が新枠に一致。", mistake: "プレミアム運用。" },
      { prompt: "ポジショニング文を5要素で書く。", avoid: "全員向け。", hint: "対象・状況・カテゴリー・価値・証拠。", model: "初商品を販売前に検証したい個人事業主向けの診断OJT。広告講座と違い、実データから仮説・実験・提案を毎日完成させる。", why: "誰が何と比べ何を信じるか明確。", mistake: "心理学で売上を最大化。" },
    ],
    independent: { name: "高級ホテルのワーケーション", scene: "宿泊費で近隣ホテルと比較され価格負けする。", prompt: "新しい比較枠と必要証拠を提案してください。", model: "宿泊でなく『経営チームの3日間意思決定オフサイト』。会議環境、集中時間、決定完了率、運営支援の証拠が必要。" },
    transfer: "自Offerの現在の比較枠、新しい比較枠、移行を支える3証拠を書く。",
    rubric: { pass: "対象・代替・価値が明確。", standard: "カテゴリーと提供実態が一致。", pro: "入るべきでない顧客と反証条件がある。", revise: "形容詞を削り、比較対象と証拠を入れる。" },
    output: "Positioning Architecture", next: "良い位置でも需要が十分・到達可能とは限らない。Day15で市場成立条件を検査する。", sources: [adobe, courseraMarketing],
  },
  {
    day: 15, stage: 3, title: "需要と市場成立条件を検査する", capability: "痛み、頻度、支払源、到達、供給能力を証拠で評価する",
    question: "『役に立つ』アイデアが、本当に事業になるかどう見分けるか。",
    why: "共感やアンケートの購入意向だけでは、実際の予算移動、獲得費用、提供制約を説明できない。",
    theory: { name: "Demand Validation / Market Sizing by Constraints", plain: "市場は人数ではなく、Job発生、支払、到達、提供が同時に成立する範囲。", can: "TAM物語を初期の実行可能市場へ縮める。", limit: "初期データは不確実で、探索で更新が必要。", misuse: "大きな人口×仮単価だけで市場を証明する。" },
    case: { name: "Pelotonの需要変動", role: "一時的ショックと継続需要を分ける", scene: "パンデミック期の成長率を恒久需要として生産計画に使う。", facts: ["家庭内運動需要の急増と正常化。", "FY2022総売上減でも会員基盤は増加。", "機器、在庫、継続課金の時間軸が異なる。"], reasoning: ["需要発生の外部条件を明記。", "新規獲得と継続利用を別予測。", "供給の固定費・在庫リスクを含める。", "シナリオ幅で判断し一予測に賭けない。"] },
    drills: [
      { prompt: "需要成立の5条件を自案へ当てる。", avoid: "興味がある人の数だけ。", hint: "発生・強度・支払・到達・提供。", model: "月1回以上発生／未解決損失5万円超／既存予算あり／業界団体で到達／月10社提供可能。", why: "収益化のボトルネックを見つける。", mistake: "日本の企業数×1%。" },
      { prompt: "言葉でなく行動の需要証拠を書く。", avoid: "欲しいと言った人数。", hint: "時間、金、評判を既に使った行動。", model: "過去6か月に代替サービスへ支払った、社内で予算申請した、手作業を毎週続けている。", why: "実際の犠牲を伴う。", mistake: "SNSのいいね。" },
      { prompt: "市場を否定する停止条件を書く。", avoid: "絶対成功前提。", hint: "何件試して何が起きなければ止めるか。", model: "適合条件を満たす30件へ提案し、有料診断への移行が2件未満なら対象JobかOfferを再設計する。", why: "失敗から学び、資金を守る。", mistake: "反応が出るまで続ける。" },
    ],
    independent: { name: "地域コミュニティ", scene: "『孤独を減らす』アプリに400人が事前登録した。", prompt: "事業成立を判断する追加証拠を設計してください。", model: "参加頻度、実際の対面/オンライン代替、主催コスト、支払者、地域密度、初回後継続を小規模有料パイロットで確認する。" },
    transfer: "自事業の需要証拠をStrong/Medium/Weakに分け、次に取る一番安いStrong証拠を決める。",
    rubric: { pass: "5条件と一つの行動証拠。", standard: "供給・到達・停止条件がある。", pro: "複数シナリオと更新ルールを置く。", revise: "人口×仮率を、今週観測できる行動へ変える。" },
    output: "Demand Conditions Scorecard", next: "市場を選んだら、診断結果を買えるOfferへ構造化する。Day16で提供物を設計する。", sources: [peloton, courseraAnalytics],
  },
  {
    day: 16, stage: 4, title: "Offerを成果の仕組みにする", capability: "対象、約束、工程、証拠、境界、価値実現支援を一つの提供設計にする",
    question: "知識や作業を、顧客が買って成果まで進める商品へどう組み替えるか。",
    why: "コンテンツ量や作業時間を増やしても、顧客の成功経路と責任分担がなければ価値は実現しない。",
    theory: { name: "Service Blueprint / Offer Architecture", plain: "顧客の行動と提供側の工程・証拠・支援を対応させる。", can: "成果に必要な部品と範囲外を明確にする。", limit: "成果を保証するものではなく、顧客側条件も必要。", misuse: "ボーナスを大量追加して価値が増えたと見せる。" },
    case: { name: "Adobe Creative Cloud", role: "束ね方が継続価値と負担を変える", scene: "複数アプリと更新を一つの継続Offerへ移す。", facts: ["機能集合だけでなく更新・クラウド・契約形態が変化。", "継続価値と継続支払が同時に生じる。", "利用頻度の低い顧客には過剰になりうる。"], reasoning: ["対象Jobを限定。", "成果経路に沿い必須部品を配置。", "不適合・解約・データ移行を境界に含める。", "使用量で価値実現を追う。"] },
    drills: [
      { prompt: "Offerの約束を条件付き成果で書く。", avoid: "必ず売上2倍。", hint: "対象・期間・行動変化・前提。", model: "既存商談データを持つ小規模B2B企業が、4週間で失注仮説と次の検証3件を決められる状態を作る。", why: "制御可能な成果と条件が明確。", mistake: "成約率を保証する。" },
      { prompt: "必須工程と不要なボーナスを分ける。", avoid: "多いほど良い。", hint: "成果への因果鎖に必要か。", model: "必須：失注ログ、仮説会議、顧客確認、実験設計。不要：一般心理学動画20本。", why: "認知負荷と原価を抑える。", mistake: "競合にある機能を全部追加。" },
      { prompt: "顧客側の責任を一つ契約化する。", avoid: "成果責任を全て顧客へ移す。", hint: "必要データ・参加・実行。", model: "週1回、意思決定者が45分参加し、匿名化商談データ10件を提供する。", why: "価値実現条件を事前共有。", mistake: "やる気のある人限定。" },
    ],
    independent: { name: "非営利団体の寄付改善", scene: "研修動画50本を提供する案。", prompt: "成果型Offerへ再設計してください。", model: "8週間で寄付旅程を診断し、2つの倫理的実験を実施、完了率と継続寄付を測る。動画は必要工程の補助だけ。" },
    transfer: "自Offerを対象・進歩・工程・証拠・顧客責任・境界・初期成功の7要素で1枚にする。",
    rubric: { pass: "成果と工程が接続。", standard: "顧客責任・境界・価値実現がある。", pro: "不適合時の退出と原価構造まで一貫。", revise: "機能一覧を、顧客が次にする行動順へ並べ替える。" },
    output: "Offer Architecture", next: "Offerができても、価格は価値だけでなく比較枠と損失認識に左右される。Day17で参照価格を診断する。", sources: [adobe],
  },
  {
    day: 17, stage: 4, title: "参照価格と支払意思を診断する", capability: "顧客が使う比較価格、予算、損失、代替費用を分離する",
    question: "『高い』が、金額・比較枠・証拠・予算のどれかを見分けるには。",
    why: "値下げは全ての価格反論に効くように見えるが、信頼不足や不適合を隠し、将来の参照点を下げる。",
    theory: { name: "Reference Dependence / Willingness to Pay", plain: "価格は絶対額だけでなく、期待・代替・過去価格・予算との比較で評価される。", can: "価格反応の異質性と質問設計を改善する。", limit: "参照点から個人の支払意思を正確には予測できない。", misuse: "高いアンカーを置けば高く売れると断定する。" },
    case: { name: "Costcoの会員制", role: "会費と商品価格の参照枠を分ける", scene: "小売利益を商品マージンだけで評価する。", facts: ["FY2025 net sales約2,699億ドル。", "Membership fees約53.23億ドル。", "会員価値と商品節約・利用頻度が相互に作用。"], reasoning: ["参照点：他店価格、会費、買物頻度。", "価値：節約だけでなく品揃え・信頼・アクセス。", "異質性：利用頻度が低い群は会費負担が重い。", "測定：更新率と購買行動を結ぶ。"] },
    drills: [
      { prompt: "『高い』の4種類を作る。", avoid: "予算不足だけ。", hint: "比較、価値、流動性、権限。", model: "代替より高い／成果証拠に比べ高い／今期現金がない／自分の決裁枠を超える。", why: "対応策がそれぞれ異なる。", mistake: "全部値下げ。" },
      { prompt: "価格を聞く前の識別質問を作る。", avoid: "いくらなら買いますか、だけ。", hint: "何と比べ、どの損失を避けたいか。", model: "「今回の費用は、現在の手作業・他社委託・問題を残す損失のどれと比較されていますか」", why: "参照枠を発見。", mistake: "予算だけ聞いて上限価格にする。" },
      { prompt: "WTP調査の行動証拠を一つ設計する。", avoid: "5段階の購入意向だけ。", hint: "実際の時間・金・予約。", model: "価格を明示した有料パイロットで、申込金を伴う予約率を比較する。", why: "仮想回答より犠牲がある。", mistake: "友人の好意的回答。" },
    ],
    independent: { name: "B2Bコンサル", scene: "100万円提案に『相場より高い』と言われた。", prompt: "値下げ前に確認する4情報を書いてください。", model: "比較相手の範囲、放置損失、予算所有者、成果証拠への確信。相場が作業代なら成果型Offerの比較枠も再検討。" },
    transfer: "直近の価格反応3件を4分類し、各ケースの識別質問と必要証拠を書く。",
    rubric: { pass: "価格反論を2種類以上に分ける。", standard: "参照点・代替費用・予算・権限を確認。", pro: "行動を伴うWTP検証と倫理的境界がある。", revise: "値下げ案を消し、まず仮説順位が変わる質問を書く。" },
    output: "Reference Price Map", next: "参照点が分かったら、単一価格でなく価格体系全体を設計する。Day18へ進む。", sources: [costco],
  },
  {
    day: 18, stage: 4, title: "価格アーキテクチャを設計する", capability: "価値指標、パッケージ、支払時点、リスク分担を一貫させる",
    question: "いくらにするかではなく、何に対してどう課金するかを決めるには。",
    why: "原価＋利益や競合追随だけでは、顧客価値の増え方と提供コスト、継続関係がずれる。",
    theory: { name: "Value Metric / Price Discrimination", plain: "異なる価値・利用・制約の顧客に、選択可能な価格構造を設ける。", can: "収益・アクセス・提供原価の整合を検討する。", limit: "複雑さは理解と信頼を損なう。", misuse: "不透明な条件で支払能力の高い人だけ高く取る。" },
    case: { name: "Costco × Adobe", role: "会費型と継続課金型の価値指標を比較する", scene: "全顧客に同一の買い切り価格しか提示しない。", facts: ["Costcoは会員アクセスと購買を分離。", "Adobeは永続ライセンスから継続利用へ移行。", "どちらも利用頻度・離脱・累積支払の新リスクを生む。"], reasoning: ["価値指標：席、利用、成果、期間の候補。", "パッケージ：異なるJobに必要な差だけ。", "支払：キャッシュとコミットメントを両立。", "透明性：総費用と退出条件を明示。"] },
    drills: [
      { prompt: "自Offerの価値指標候補を三つ比較する。", avoid: "時間単価を自動採用。", hint: "顧客価値と共に増え、測定可能か。", model: "席数：簡単だが価値と弱い。実験数：活動偏重。検証済み事業単位：価値に近いが定義が必要。", why: "課金単位のトレードオフを示す。", mistake: "売上歩合が必ず最適。" },
      { prompt: "Good/Better/Bestの差をJobで作る。", avoid: "同じものを量だけ増やす。", hint: "複雑性・支援・リスク。", model: "診断のみ／診断＋実験設計／診断＋実装伴走。顧客の内製能力で選ぶ。", why: "自己選択の理由がある。", mistake: "動画10本/20本/30本。" },
      { prompt: "価格体系の不公平感を検査する。", avoid: "細字で条件を隠す。", hint: "同じ価値・同じ条件で説明可能か。", model: "総支払、更新、追加料金、解約、成果条件を一枚で同じ視認性にする。", why: "短期CVRより長期信頼を守る。", mistake: "月額だけ大きく表示。" },
    ],
    independent: { name: "採用SaaS", scene: "一律月額だが、小企業は高い、大企業は使い放題で原価超過。", prompt: "価値指標と3層パッケージを提案してください。", model: "アクティブ求人＋採用チーム規模を候補に、基本採用／統制・分析／複数部門運用へ分け、上限と追加費用を透明化。" },
    transfer: "自Offerの価格指標、3層、支払時点、追加料金、退出条件を一枚にする。",
    rubric: { pass: "価格と提供範囲が対応。", standard: "価値指標・原価・自己選択が整合。", pro: "公平性、総費用、シナリオ収益まで検証。", revise: "金額を決める前に『何が増えると価値が増えるか』を書く。" },
    output: "Pricing Architecture", next: "価格体系が正しくても、メッセージが証拠を飛ばすと信じられない。Day19で主張と証拠を接続する。", sources: [costco, adobe],
  },
  {
    day: 19, stage: 4, title: "メッセージを主張・証拠・境界で作る", capability: "顧客の状況から価値へ、誇張せず判断可能なメッセージを設計する",
    question: "売り文句を強くしながら、怪しく・抽象的にしないには。",
    why: "感情刺激だけ、数字だけ、権威だけでは、適用条件と顧客自身の判断が失われる。",
    theory: { name: "Claim–Evidence Reasoning / Processing Fluency", plain: "理解しやすさは判断を助けるが、真実性の代わりにはならない。", can: "主張と根拠、適用条件を対応させる。", limit: "分かりやすい表現が行動を保証しない。", misuse: "簡潔なら正しい、反復すれば信じるとして操作する。" },
    case: { name: "Zoom S-1の顧客証拠", role: "企業の主張と大規模利用の証拠を分ける", scene: "『世界で最も使いやすい』だけを広告する。", facts: ["財務、利用、顧客事例は異なる主張を支える。", "VMwareの利用規模は導入証拠。", "すべての企業の生産性効果を直接保証しない。"], reasoning: ["状況：会議が成立しない摩擦。", "主張：導入・反復利用を容易にする。", "証拠：利用規模と顧客文脈。", "境界：成果は環境・運用で変わる。"] },
    drills: [
      { prompt: "誇張文『誰でも必ず売れる』を判断可能な文へ変える。", avoid: "弱い形容詞に置換するだけ。", hint: "対象・条件・行動・証拠。", model: "過去商談10件以上を持つ個人事業主が、30日で失注仮説と3つの検証を完成できる設計。売上結果は実行条件で変わる。", why: "買う人が適合を判断できる。", mistake: "売れやすくなります。" },
      { prompt: "主張に最小十分な証拠を一つ対応させる。", avoid: "権威ロゴの羅列。", hint: "その主張を直接測る証拠。", model: "『30日完遂』には登録数でなく、開始者のDay30課題提出率と分布を示す。", why: "主張と指標が一致。", mistake: "フォロワー数で学習成果を証明。" },
      { prompt: "境界文を価値を損なわず書く。", avoid: "免責を細字へ隠す。", hint: "向く条件・向かない条件。", model: "実データを使って検証する人向けです。即効テクニックや売上保証を求める場合は適しません。", why: "信頼と顧客適合を高める。", mistake: "成果には個人差があります、だけ。" },
    ],
    independent: { name: "医療サービスLP", scene: "『最先端で安心、治癒率No.1』と記載する案。", prompt: "主張・証拠・境界へ再構成してください。", model: "対象疾患・比較群・期間・定義・出所を示せないNo.1は削除。診療プロセス、専門資格、選択肢・リスク説明、適応外条件を同じ画面に置く。" },
    transfer: "自LPの主要3主張をClaim／Evidence／Condition／Not forへ変換する。",
    rubric: { pass: "主張に直接証拠が一つ。", standard: "対象・条件・境界がある。", pro: "反対証拠も含め顧客が自己選択できる。", revise: "最上級・必ず・脳科学を消し、観測可能な行動へ置換する。" },
    output: "Message–Proof Matrix", next: "正しいメッセージでも、反論を説得で潰すと真の障害を失う。Day20で反論診断と交渉を学ぶ。", sources: [zoom],
  },
  {
    day: 20, stage: 4, title: "反論を診断し、交渉する", capability: "反論を価格・価値・信頼・権限・優先・条件へ分類し、利害で解く",
    question: "『高い』『検討します』に、反射的な値引きや説得をせず次へ進むには。",
    why: "反論は情報であり、言い負かす対象ではない。早い反論処理は不適合顧客を成約させ、後の解約や不信を増やす。",
    theory: { name: "Interest-based Negotiation / BATNA", plain: "表明された立場の背後にある利害、代替案、最低条件を明確にする。", can: "譲歩交換と撤退基準を準備する。", limit: "権力差・倫理・関係性で合意可能範囲は変わる。", misuse: "心理戦で相手の最低価格を引き出す。" },
    case: { name: "B2Bコンサル提案（複合ケース）", role: "100万円反論を診断会話へ変える", scene: "担当者は価値を評価するが『100万円は難しい』と答えた。", facts: ["金額だけでは、予算・価値・権限・比較先を識別できない。", "値下げは範囲・リスク分担を変えず利益だけ下げる。", "不適合なら撤退が正しい。"], reasoning: ["承認：反論を否定しない。", "識別：何と比較し、何が解消すれば進むか。", "利害：期限、内部説明、リスク。", "交換：範囲・支払・証拠を条件付きで変更。"] },
    drills: [
      { prompt: "反論を6分類から一つ仮置きする。", avoid: "顧客が間違っていると考える。", hint: "価格・価値・信頼・権限・優先・条件。", model: "『検討します』は権限仮説。本人は賛成でも社内説明材料が不足している可能性。", why: "次の質問が決まる。", mistake: "買う気がない。" },
      { prompt: "防御を生まない識別質問を書く。", avoid: "何が不満ですか。", hint: "進む条件と比較を聞く。", model: "「進めるために、金額・成果確信・社内承認・開始時期のどれを最初に解く必要がありますか」", why: "相手の選択で仮説を更新。", mistake: "安くしたら決めますか。" },
      { prompt: "値引き以外の条件交換を一つ作る。", avoid: "無料追加。", hint: "範囲・期間・支払・証拠・責任。", model: "予算制約なら、診断範囲を1部門に限定した有料パイロットへ縮め、成功指標を満たした後に拡張する。", why: "価格と価値・原価を同時に調整。", mistake: "同じ範囲を20%引き。" },
    ],
    independent: { name: "ラグジュアリー商品", scene: "顧客は『似た商品が半額』と比較する。", prompt: "診断質問と撤退基準を作ってください。", model: "比較基準が素材・希少性・アフターケア・象徴価値のどれか確認。差を裏付けられず同等機能だけなら値段を正当化せず撤退/再設計。" },
    transfer: "直近の反論を分類し、識別質問、譲歩条件、BATNA、撤退基準を1枚にする。",
    rubric: { pass: "説得前に分類質問。", standard: "利害・BATNA・条件交換がある。", pro: "不適合時に信頼を守って撤退できる。", revise: "反論への回答を消し、順位が変わる質問から書き直す。" },
    output: "Objection Taxonomy + Negotiation Card", next: "提案が成立しても、獲得費用と継続価値が合わなければ事業ではない。Day21で経済性を見る。", sources: [negotiation],
  },
  {
    day: 21, stage: 5, title: "ファネルとユニットエコノミクスを読む", capability: "量ではなく段階転換・粗利・獲得費用・継続価値の因果を読む",
    question: "売上が増えても損をする構造を、どの数値で見抜くか。",
    why: "フォロワー、リード、売上の総数だけでは、どこで価値が漏れ、1顧客ごとに利益が残るか分からない。",
    theory: { name: "Funnel Math / Unit Economics", plain: "顧客1単位の獲得・提供・継続で収入と変動費を追う。", can: "成長のボトルネックと持続性を比較する。", limit: "LTVは仮定に敏感で初期事業ほど不確実。", misuse: "将来LTVを楽観的に置き赤字獲得を正当化する。" },
    case: { name: "Lyft S-1", role: "取扱高・売上・利用者・供給者を混同しない", scene: "乗車総額の成長だけで健全性を評価する。", facts: ["Q4 2018 active riders約1,860万、drivers約110万。", "2018 revenueはbookingsの約27%。", "両面の補助、保険、運用費と継続が重要。"], reasoning: ["単位：乗車、乗客、運転者を分ける。", "ファネル：獲得→初回→反復→利益。", "経済性：売上でなく貢献利益。", "感度：継続・割引・供給費を幅で見る。"] },
    drills: [
      { prompt: "1000流入→100相談→20契約を率にする。", avoid: "20件売れたで終える。", hint: "各段階を直前分母で割る。", model: "流入→相談10%、相談→契約20%、全体2%。", why: "改善位置を比較できる。", mistake: "1000から20だけ見る。" },
      { prompt: "1顧客の貢献利益を計算する。", avoid: "売上を利益と呼ぶ。", hint: "価格−変動提供費−決済−サポート。", model: "価格10万円−外注3万円−決済3千円−追加支援1万円＝5.7万円。", why: "獲得に使える上限が見える。", mistake: "固定費と変動費を無差別に割る。" },
      { prompt: "LTVの最も危険な仮定を一つ選ぶ。", avoid: "一点予測。", hint: "継続率・粗利・割引。", model: "3か月しか観測していないのに平均継続24か月と置く。6/12/24月で感度表を作る。", why: "判断が仮定に依存する程度を示す。", mistake: "LTVは確定値。" },
    ],
    independent: { name: "サブスク教育", scene: "月額8,000円、CAC18,000円、粗利75%、月次解約12%。", prompt: "概算回収月数と最初の改善仮説を示してください。", model: "月次粗利6,000円なので単純回収約3か月。平均継続を楽観視せず、初月解約の理由とコホート別継続を先に診断。" },
    transfer: "自事業のファネル、貢献利益、CAC回収、LTV感度を現在分かる範囲で一枚にする。",
    rubric: { pass: "率・分母・粗利を区別。", standard: "CAC回収と感度分析。", pro: "群別コホートと制約資源まで接続。", revise: "総売上を顧客1人・1段階の式へ分解する。" },
    output: "Commercial Economics Sheet", next: "経済性が見えたら、同じ顧客へどの経路で届くかを選ぶ。Day22でチャネル適合を診断する。", sources: [{ title: "Lyft S-1", provider: "U.S. SEC", range: "Business / Key Metrics / Selected Financial Data", minutes: 32, purpose: "両面市場の成長単位と経済性を読む", url: "https://www.sec.gov/Archives/edgar/data/1759509/000119312519059849/d633517ds1.htm" }],
  },
  {
    day: 22, stage: 5, title: "チャネルと市場の適合を選ぶ", capability: "顧客の探索行動、信頼形成、単価、販売周期に合う獲得経路を選ぶ",
    question: "SNS、紹介、広告、パートナーのどれに資源を置くか。",
    why: "流行のチャネルを採用すると、リード量は増えても顧客Job・信頼・経済性と合わず営業負荷だけ増える。",
    theory: { name: "Channel–Market Fit", plain: "顧客が問題を認識し、証拠を信じ、購入できる経路と販売モデルを整合させる。", can: "チャネルごとの役割と期待値を設計する。", limit: "チャネル性能は競争・規約・時期で変わる。", misuse: "一つの成功チャネルを永続的な正解にする。" },
    case: { name: "Slackのボトムアップ拡散", role: "利用者獲得と企業契約のチャネルを分ける", scene: "無料利用の自然拡散だけで全企業契約が取れると考える。", facts: ["無料組織と有料顧客の大きな母数差。", "利用者の体験が採用証拠になる。", "大規模契約では管理・購買の別経路が必要。"], reasoning: ["発見：同僚招待と口コミ。", "体験：無料利用。", "拡張：利用深度シグナル。", "契約：管理者・営業・セキュリティ証拠。"] },
    drills: [
      { prompt: "チャネルを発見・信頼・成約の役割に分ける。", avoid: "SNS一本で全部。", hint: "各段階で必要な関係密度。", model: "発見：専門記事。信頼：同条件ケースと紹介。成約：診断面談。", why: "高単価の不確実性に合う。", mistake: "フォロワー増＝売上。" },
      { prompt: "チャネルの経済性を一式で書く。", avoid: "CPCだけで比較。", hint: "獲得量×適合率×成約率×粗利−運用。", model: "紹介10件×適合80%×成約30%×粗利6万円−紹介費2万円＝12.4万円。", why: "量より貢献を比較。", mistake: "リード単価最安を選ぶ。" },
      { prompt: "依存リスクと代替を一つ決める。", avoid: "全チャネルを同時にやる。", hint: "規約変更で止まるもの。", model: "検索広告依存を60%以下にし、顧客事例から紹介経路を育てる。", why: "学習集中と耐性を両立。", mistake: "毎週新チャネルを試す。" },
    ],
    independent: { name: "医療観光", scene: "高額治療を短尺動画広告だけで集客する案。", prompt: "信頼・規制・販売周期に合うチャネル構成を提案してください。", model: "認知は検索/教育コンテンツ、信頼は医師・提携機関・患者支援、成約は多言語診断相談。煽情広告は適合と信頼を損なう。" },
    transfer: "自事業の上位3チャネルを役割、経済性、制御可能性、学習速度で採点し一つ選ぶ。",
    rubric: { pass: "顧客行動とチャネルが接続。", standard: "役割と経済性を分ける。", pro: "依存リスクと退出ルールがある。", revise: "人気を基準から外し、顧客が信じて決める経路を書く。" },
    output: "Channel–Market Fit Map", next: "チャネルで到達した後の選択画面は行動を変えるが、操作にならない境界が必要。Day23へ。", sources: [slack],
  },
  {
    day: 23, stage: 5, title: "倫理的な選択構造を設計する", capability: "デフォルト・順序・摩擦を使いながら、透明性と退出可能性を守る",
    question: "選びやすくすることと、選ばせることの境界はどこか。",
    why: "短期CVRだけを最適化すると、隠れた継続、解約摩擦、誤認で成約を作り、長期信頼と顧客価値を破壊する。",
    theory: { name: "Choice Architecture / Libertarian Paternalism", plain: "選択の提示方法は行動へ影響するため、目的・情報・自由を意識して設計する。", can: "理解負荷を減らし望む行動を支援する。", limit: "誰にとって望ましいかという価値判断を含む。", misuse: "ダークパターンをナッジと呼ぶ。" },
    case: { name: "英国年金自動加入 × Amazon Prime", role: "有益なデフォルトと操作的摩擦を比較する", scene: "CVR向上ならどんなデフォルトも正当化できるか。", facts: ["英国の対象従業員年金加入は2024年82%、2,330万人。", "自動加入には退出権と制度目的がある。", "FTCは2025年Amazon Primeの登録・解約を巡り25億ドル和解を発表。"], reasoning: ["目的：利用者利益か企業利益だけか。", "情報：費用・継続・結果が対称か。", "可逆性：入るより出る方が難しくないか。", "測定：CVRに加え後悔・解約・苦情。"] },
    drills: [
      { prompt: "デフォルト設計を4つの倫理テストにかける。", avoid: "合法なら良い。", hint: "利益・透明・可逆・対称。", model: "自動継続は、総費用を事前表示し通知・ワンクリック解約・返金猶予があれば透明性と可逆性が高い。", why: "利用者が判断と退出を保てる。", mistake: "細字規約に書けば透明。" },
      { prompt: "摩擦を減らすべき所と残す所を一つずつ。", avoid: "全摩擦を悪とする。", hint: "望む行動／重大な不可逆選択。", model: "住所再入力は減らす。高額・不可逆契約の最終確認は残し、主要条件を再表示する。", why: "誤操作と熟慮を区別。", mistake: "成約率が落ちる確認を全削除。" },
      { prompt: "CVR以外のガードレールを三つ置く。", avoid: "売上だけ。", hint: "後悔・継続・信頼。", model: "48時間解約率、誤認問い合わせ率、30日価値実現率。", why: "短期成功が長期損失を隠さない。", mistake: "クリック率のみ。" },
    ],
    independent: { name: "寄付フォーム", scene: "毎月寄付を初期選択にし、単発への変更を薄く表示する案。", prompt: "倫理的に再設計してください。", model: "単発/月次を同じ視認性で示し、用途・総額・変更/停止を明示。月次の社会価値は説明するが誤認させない。" },
    transfer: "自LP・申込・解約を、利用者利益・透明性・可逆性・対称性・ガードレールで監査する。",
    rubric: { pass: "退出と費用が明確。", standard: "利用者利益とガードレールがある。", pro: "弱い立場への影響と代替設計を検証。", revise: "CVRだけの成功条件を削り、後悔指標を追加する。" },
    output: "Choice Architecture & Ethics Audit", next: "介入を選べても、同時に多く変えると何が効いたか分からない。Day24で実験を設計する。", sources: [autoEnroll, amazonFTC],
  },
  {
    day: 24, stage: 5, title: "一変数の商業実験を設計する", capability: "仮説・介入・事前予測・比較・停止条件を実施前に固定する",
    question: "売上を危険にさらさず、何が効いたか学ぶには。",
    why: "LP、価格、対象、広告を同時変更すると、結果が良くても再現できず、悪くても原因を特定できない。",
    theory: { name: "Experimentation / Potential Outcomes", plain: "介入した場合としなかった場合の差を、公平な比較で推定する。", can: "因果仮説の不確実性を減らす。", limit: "小標本、波及、長期効果、外部妥当性に限界。", misuse: "有意差の有無だけで実務価値を決める。" },
    case: { name: "UK Test, Learn, Adapt", role: "政策実験の原則を小規模事業へ移す", scene: "成功しそうな施策を全顧客へ即導入する。", facts: ["介入群と比較群を事前に設ける。", "測定指標と分析を先に決める。", "実験の倫理・実施可能性を確認する。"], reasoning: ["仮説：どの機構が変わるか。", "一変数：証拠提示だけ変更。", "予測：対象率・副作用・期間。", "決定：採用、保留、棄却の閾値。"] },
    drills: [
      { prompt: "曖昧な施策を一変数へ変える。", avoid: "サイトを改善する。", hint: "誰に何だけ変えるか。", model: "高リスク群に、申込前の同条件ケース証拠を追加し、他要素は固定する。", why: "仮説との対応が一つ。", mistake: "コピー、色、価格を同時変更。" },
      { prompt: "方向・量・期間の事前予測を書く。", avoid: "上がると思う。", hint: "主要指標とガードレール。", model: "2週間で相談→申込が18%から24%以上、48時間解約は現状±2pt以内。", why: "結果後の物語化を抑える。", mistake: "結果を見て成功基準を変える。" },
      { prompt: "停止条件を安全・無効・勝利で作る。", avoid: "ずっと続ける。", hint: "害、十分な否定、十分な価値。", model: "苦情5%で停止、200件で差2pt未満なら棄却、+6ptかつガードレール維持なら拡張。", why: "事業と顧客を守る。", mistake: "有意になるまでサンプル追加。" },
    ],
    independent: { name: "価格ページ", scene: "3プラン化と20%値上げを同時に試す案。", prompt: "学べる最小実験へ分解してください。", model: "まず価格固定で3プラン提示の理解・選択を検証。次に適合群で価格差をテスト。主要指標、苦情、解約を事前固定。" },
    transfer: "自分の最大仮説を、対象・一変数・予測・KPI・ガードレール・停止条件へ変換する。",
    rubric: { pass: "仮説と一変数が対応。", standard: "比較・予測・停止条件が事前化。", pro: "統計・実務・倫理の三条件で判断。", revise: "介入を一つ減らし、結果で次判断が変わる式を書く。" },
    output: "Offer Experiment Sheet", next: "実験しても、指標が因果鎖と合わなければ学べない。Day25で測定と帰属を設計する。", sources: [testLearn],
  },
  {
    day: 25, stage: 5, title: "測定・帰属・更新を管理する", capability: "先行・結果・ガードレール指標を因果鎖に置き、仮説を更新する",
    question: "売上が増えたのは施策のせいか、偶然や別要因か。",
    why: "最後の売上だけを見ると、季節、チャネル構成、営業差、顧客選別を施策効果として誤認する。",
    theory: { name: "Causal Attribution / Measurement Model", plain: "観測指標が何を表し、他の原因をどう除くかを定義する。", can: "学習可能なダッシュボードと更新ルールを作る。", limit: "観測データだけで完全な因果は難しい。", misuse: "クリックの後に購入したので広告が原因と断定する。" },
    case: { name: "Duolingoの指標階層", role: "利用習慣・課金・収益を因果鎖で読む", scene: "DAU増を最終的な事業成功と同一視する。", facts: ["DAU、有料加入者、bookingsは別の状態。", "利用増が課金・継続へ至る機構を検査する必要。", "短期エンゲージメントが学習成果を保証しない。"], reasoning: ["先行：初回・継続学習。", "中間：習慣と価値到達。", "結果：加入・継続・粗利。", "ガードレール：学習成果、後悔、過度利用。"] },
    drills: [
      { prompt: "介入の指標を先行・結果・ガードレールに分ける。", avoid: "売上だけ。", hint: "最初の反応／商業結果／副作用。", model: "先行：証拠閲覧率。結果：適合顧客の申込率。ガード：解約・不適合申込・苦情。", why: "機構と副作用を同時に見る。", mistake: "PVを成果にする。" },
      { prompt: "帰属を脅かす要因を三つ書く。", avoid: "施策以外は無視。", hint: "時間、構成、人、同時変更。", model: "繁忙期、流入元比率、営業担当変更。", why: "代替説明を保持。", mistake: "実施後に上がった＝効果。" },
      { prompt: "仮説更新ルールを書く。", avoid: "成功/失敗の二択だけ。", hint: "支持・保留・棄却と次証拠。", model: "先行は上がるが申込不変なら理解は改善、価値/権限が残ると更新し、次は決裁支援を検査。", why: "結果を次の診断へ接続。", mistake: "コピーが悪かったと曖昧にする。" },
    ],
    independent: { name: "採用広告", scene: "応募は増えたが採用は増えず、面接工数が倍増。", prompt: "成功判定を再設計してください。", model: "適格応募率、面接→採用、採用単価、90日定着を結果にし、面接工数をガードレールへ。応募数単独を成功から外す。" },
    transfer: "実施予定施策の因果鎖、3種指標、代替説明、更新ルールを事前登録する。",
    rubric: { pass: "3種指標がある。", standard: "代替説明と更新ルール。", pro: "測定誤差・セグメント・長期効果まで扱う。", revise: "虚栄指標を、顧客状態の変化へ置き換える。" },
    output: "Measurement & Hypothesis Update Plan", next: "部品は揃った。Day26から、会話・提案・価値実現へ一気通貫で統合する。", sources: [duolingo, courseraAnalytics, testLearn],
  },
  {
    day: 26, stage: 6, title: "診断会話を運転する", capability: "依頼文から事実・Job・仮説・意思決定・次証拠を45分で引き出す",
    question: "初回相談を無料コンサルや売り込みにせず、有料価値のある診断入口にするには。",
    why: "質問リストを上から読むだけでは、答えに応じた仮説更新が起きず、情報収集で終わる。",
    theory: { name: "Hypothesis-driven Interview / Motivational Interviewing principles", plain: "開かれた探索と焦点質問を使い、相手の自律性を保ちながら矛盾を整理する。", can: "診断の順序と次の一手を共同で明確にする。", limit: "臨床面接ではなく、心理状態を診断しない。", misuse: "誘導質問で自社Offerへ着地させる。" },
    case: { name: "SaaS失注診断（複合ケース）", role: "45分の判断順序を練習する", scene: "CEOは『営業が弱い』と言う。商談数120、提案40、受注6。", facts: ["依頼者の原因説明は未検証。", "段階別率と過去比較が必要。", "決裁、価値、競合、対象品質の仮説がある。"], reasoning: ["0–5分：目的と意思決定を固定。", "5–15分：事実・基準・変化。", "15–30分：Job・決定単位・代替仮説。", "30–45分：不足証拠・小実験・責任。"] },
    drills: [
      { prompt: "冒頭3分の診断契約を書く。", avoid: "今日は何でも相談してください。", hint: "終わる時の決定。", model: "45分後に、受注低下の上位2仮説と、来週取る証拠を一つ決めます。解決策の販売は診断後に分けます。", why: "会話の成果と境界が明確。", mistake: "最初から商品説明。" },
      { prompt: "追跡質問を事実→意味→反証で3つ作る。", avoid: "なぜを連打。", hint: "数値、本人の解釈、反対例。", model: "いつから何率変化？／何が変わったと解釈？／その説明に合わない商談は？", why: "責めずに仮説を広げる。", mistake: "営業の何が悪い？" },
      { prompt: "会話の終わりを一つの次証拠へ閉じる。", avoid: "資料を全部ください。", hint: "仮説順位を最も変える情報。", model: "失注10件の決裁者同席有無と失注理由原文を48時間以内に確認する。", why: "行動可能で学習価値が高い。", mistake: "市場調査を一式実施。" },
    ],
    independent: { name: "ブランド再構築", scene: "創業者は『若返りたい』と相談。既存顧客の再購入は安定。", prompt: "45分診断の順序と終了条件を設計してください。", model: "若返りの商業結果を固定し、新規/既存影響、対象Job、証拠、損失許容を確認。最後に調べるべき顧客行動を一つ決める。" },
    transfer: "自分用45分診断スクリプトを作り、実案件または録音ロールプレイで実施する。",
    rubric: { pass: "診断目的と境界がある。", standard: "答えで質問順が変わり次証拠へ閉じる。", pro: "相手の自律性・反対証拠・商業判断を同時に守る。", revise: "質問数を半分にし、各質問が変える仮説を書く。" },
    output: "Diagnostic Conversation Guide", next: "良い診断を、結論の押し売りでなく意思決定可能な提案書へ変換する。Day27へ。", sources: [negotiation],
  },
  {
    day: 27, stage: 6, title: "有料提案書へ変換する", capability: "診断根拠、未確実性、介入、予測、価格、責任を一つの意思決定文書にする",
    question: "相手が社内で『なぜ今、なぜこれ、なぜこの金額』を説明できる提案書とは。",
    why: "会社紹介と作業一覧だけの提案は、顧客の問題・証拠・選択肢・成功条件を代弁できない。",
    theory: { name: "Decision Memo / Argument Structure", plain: "主張、根拠、前提、代替、リスク、決定を一つの論理へ組む。", can: "提案の検証可能性と社内伝達性を高める。", limit: "文書の良さは組織政治や価値実現を代替しない。", misuse: "都合の良いデータだけで既定案を正当化する。" },
    case: { name: "新規事業ピボット提案（複合ケース）", role: "診断から段階投資へ変換する", scene: "6か月開発した機能の利用率が8%。経営は追加開発を求める。", facts: ["利用率だけで需要なしとは断定不可。", "到達、理解、権限、Job不一致の仮説。", "追加開発は仮説を識別しない可能性。"], reasoning: ["問題：どの顧客状態で利用が止まるか。", "証拠：ログ＋未利用インタビュー。", "提案：2週間の診断実験。", "決定：閾値後に拡張・変更・停止。"] },
    drills: [
      { prompt: "提案冒頭を顧客の決定文にする。", avoid: "当社は〜から始める。", hint: "今決めることと放置損失。", model: "追加開発前に、利用率8%の主因が認知・Job不一致・導入摩擦のどれかを2週間で識別するかを決める提案です。", why: "提案の役割が一文で伝わる。", mistake: "最高品質の伴走を提供。" },
      { prompt: "確実・仮説・不明を分ける。", avoid: "提案を強く見せるため断定。", hint: "証拠状態を明示。", model: "確実：利用率8%。仮説：Job不一致。不明：対象ユーザーの利用開始条件。", why: "信頼と追加調査の理由になる。", mistake: "8%だから機能不要。" },
      { prompt: "価格を範囲・価値・リスクで説明する。", avoid: "工数×単価だけ。", hint: "何を判断でき、何を含まないか。", model: "診断60万円は、全社開発投資前の意思決定を対象とし、調査20件・ログ分析・実験設計を含む。実装開発は含まない。", why: "価格と決定価値・境界が一致。", mistake: "市場相場なので。" },
    ],
    independent: { name: "組織変革", scene: "離職増に対し全社エンゲージメント研修を提案予定。", prompt: "診断型の有料提案へ変換してください。", model: "部署/在職期間別離職、制度変更、管理職行動を先に診断し、対象部署で一変数パイロット。研修全社展開は証拠後の選択肢にする。" },
    transfer: "自案件の6ページ提案書：Decision／Evidence／Hypotheses／Intervention／Measurement／Price & Boundariesを完成する。",
    rubric: { pass: "顧客問題と提案が接続。", standard: "不確実性・代替・測定・境界がある。", pro: "Championが社内で再説明でき、停止基準も明確。", revise: "自社紹介を末尾へ移し、冒頭を顧客の決定文にする。" },
    output: "Paid Commercial Proposal", next: "契約はゴールではない。Day28で顧客が価値を実現し、証拠を残す運用を設計する。", sources: [negotiation],
  },
  {
    day: 28, stage: 6, title: "価値実現を運用する", capability: "契約後の初期成功・利用・成果・証拠化を共同で管理する",
    question: "売った後に『使われない』『成果が分からない』を防ぐには。",
    why: "提供完了と顧客成果は違う。価値実現がなければ継続、紹介、価格正当化、学習資産が全て失われる。",
    theory: { name: "Customer Success / Value Realization", plain: "顧客が期待した進歩へ到達する行動・条件・測定を契約後も管理する。", can: "早期離脱と成果不明を減らし証拠を作る。", limit: "外部環境や顧客実行を完全には制御できない。", misuse: "利用時間を増やすこと自体を成功にする。" },
    case: { name: "Procore S-1", role: "利用拡大と収益成長の裏にある価値実現を読む", scene: "導入契約数だけを成功KPIにする。", facts: ["2020年顧客10,166社、売上約4.003億ドル。", "純損失約9,620万ドル。", "建設業務での導入・利用・拡張と経済性を別に見る必要。"], reasoning: ["初期成功：重要ワークフロー1つが稼働。", "採用：役割別の行動変化。", "成果：時間・エラー・可視性。", "証拠：開始前基準と共同レビュー。"] },
    drills: [
      { prompt: "契約後7日以内の初期成功を一つ定義する。", avoid: "全機能を学ぶ。", hint: "顧客が価値の兆候を感じる最小行動。", model: "過去失注10件がEvidence Logへ入り、上位2仮説が合意される。", why: "短期間で進歩を可視化。", mistake: "オンボーディング動画視聴。" },
      { prompt: "提供KPIと顧客成果KPIを分ける。", avoid: "納品数だけ。", hint: "こちらがした／顧客状態が変わった。", model: "提供：診断会議4回。成果：実験意思決定までの時間が21日→10日。", why: "作業と価値を区別。", mistake: "満足度だけ。" },
      { prompt: "価値レビューの問いを三つ作る。", avoid: "満足ですか。", hint: "基準差・機構・次価値。", model: "何が何から変わった？どの行動が寄与？残る障害と次の検証は？", why: "事例化と継続判断ができる。", mistake: "推薦文を先に依頼。" },
    ],
    independent: { name: "経営者コミュニティ", scene: "入会者は多いが3か月後の参加が低い。", prompt: "価値実現計画を作ってください。", model: "入会目的別に初週の意味ある接続を定義し、参加回数でなく意思決定・紹介・協働の成果を30/60/90日で確認する。" },
    transfer: "自OfferのDay0/7/30/90の顧客行動、成果、証拠、責任者を設計する。",
    rubric: { pass: "納品と成果を区別。", standard: "初期成功・基準・共同責任がある。", pro: "証拠化が次のOffer改善と紹介へ戻る。", revise: "利用量を、顧客のJob進歩を示す結果へ置換する。" },
    output: "Value Realization Plan", next: "一案件を成功させても、毎回ゼロからでは独立事業にならない。Day29で再現可能な90日システムへする。", sources: [{ title: "Procore Technologies S-1/A", provider: "U.S. SEC", range: "Business / Customers / Financial Data", minutes: 32, purpose: "顧客規模・成長・損失を分け価値実現を考える", url: "https://www.sec.gov/Archives/edgar/data/1611052/000119312521141830/d37601ds1a.htm" }],
  },
  {
    day: 29, stage: 6, title: "90日商業システムへ統合する", capability: "診断・獲得・提案・提供・学習を週次リズムと知的資産へ変える",
    question: "一人で営業・提供・改善を回し、案件ごとに賢くなるには。",
    why: "単発の成功は再現性がなく、忙しくなるほど記録・反証・実験が消え、勘の事業へ戻る。",
    theory: { name: "Learning System / Knowledge Compounding", plain: "案件の証拠・判断・結果を再利用可能な型へ変え、次の仮説精度を上げる。", can: "個人事業の時間制約と学習速度を管理する。", limit: "標準化しすぎると特殊文脈を見落とす。", misuse: "テンプレートを正解として全案件へ強制する。" },
    case: { name: "独立Commercial Diagnostician（複合ケース）", role: "一人事業の容量と学習を設計する", scene: "提案、提供、発信が常に緊急で、顧客データが散在している。", facts: ["制約は1人の時間と注意。", "顧客別成果物と共通知識を分ける必要。", "成約率だけでなく適合・粗利・価値実現を管理。"], reasoning: ["週次：証拠→仮説→実験→レビュー。", "容量：同時案件上限と固定枠。", "資産：匿名化パターン・質問・反証・結果。", "経営：90日ごとに市場・Offer・価格を更新。"] },
    drills: [
      { prompt: "週次の4つの意思決定会議を一人用に作る。", avoid: "毎日全部やる。", hint: "診断、獲得、提供、学習。", model: "月：案件診断、火：獲得実験、木：価値実現、金：Evidence Reviewと次週更新。", why: "緊急作業から学習時間を守る。", mistake: "空いた時間に改善。" },
      { prompt: "同時案件上限を計算する。", avoid: "売れた分だけ受ける。", hint: "提供時間＋販売＋学習＋余白。", model: "週40h−販売8−経営4−余白8＝提供20h。1社5hなら上限4社。", why: "品質と納期を守る。", mistake: "稼働100%前提。" },
      { prompt: "案件を知的資産へ変える5項目を書く。", avoid: "顧客名と秘密を保存。", hint: "匿名化した状況・仮説・証拠・介入・結果。", model: "状況タグ、初期仮説、識別証拠、実験、更新結果を匿名化カードにする。", why: "守秘と再利用を両立。", mistake: "成功談だけ残す。" },
    ],
    independent: { name: "小規模ブランド支援", scene: "3社同時で納期遅延、発信停止、利益不明。", prompt: "90日システムの最初の3変更を決めてください。", model: "案件上限、標準診断週、顧客別貢献利益を導入。新規獲得は適合セグメント一つ、実験一つに絞る。" },
    transfer: "自分の90日目標、週次リズム、案件上限、ダッシュボード、知的資産化手順を完成する。",
    rubric: { pass: "週次リズムと案件上限。", standard: "経済性・価値実現・学習資産が接続。", pro: "停止・委任・商品化のルールまである。", revise: "ToDo一覧を、毎週変える意思決定の一覧へ変える。" },
    output: "90-Day Commercial Operating System", next: "Day30は未知案件でEngine全体を通し、有料提案まで完成できるかを実技で証明する。", sources: [courseraAnalytics],
  },
  {
    day: 30, stage: 6, title: "未知ケース実技試験", capability: "Commercial Diagnosis Engineを未知案件へ通し、根拠ある有料提案にする",
    question: "情報が不完全な現実案件で、何を知り、何をまだ知らず、次に何をすべきか決められるか。",
    why: "理論名の暗記では独立実務にならない。制限時間内に証拠を分け、仮説を競わせ、商業判断へ閉じる必要がある。",
    theory: { name: "Integrated Commercial Diagnosis", plain: "観測→仮説→顧客決定→価値→介入→測定→更新→価値実現を一つの循環として運転する。", can: "未知案件の次の最良判断を作る。", limit: "30日で専門資格・万能な予測力を保証しない。実案件で継続校正が必要。", misuse: "Engineを長いチェックリストとして機械的に埋める。" },
    case: { name: "LumaCare Medical Travel（未知複合ケース）", role: "Day1–29の能力を全て使う最終試験", scene: "海外患者向け精密健診。月1,200訪問、相談96、見積48、契約9。平均価格72万円、粗利38%。直近3か月は契約率が14%から9.4%へ低下。相談の42%が『家族に確認』、失注理由の31%が『高い』、回答なし27%。広告費月180万円。紹介患者は契約率28%、広告患者7%。通訳日程の変更率18%、契約後30日キャンセル11%。", facts: ["売上低下には流入構成、信頼、家族決定、価格、運用摩擦の複数仮説。", "医療効果は専門家・個別判断が必要で、商業診断が代替しない。", "紹介と広告で適合・信頼・経済性が異なる。"], reasoning: ["これは模範結論ではなく採点基準：観測と推測を分離する。", "少なくとも4つの異なる機構の仮説を順位付けする。", "最小の識別証拠と倫理的実験を選ぶ。", "提案は価格変更より先に価値・信頼・決定単位・摩擦を結ぶ。"] },
    drills: [
      { prompt: "試験1：問題定義、事実/解釈、競合仮説4つ、反証をまとめる（30点）。", avoid: "『高いから売れない』で固定。", hint: "紹介/広告差、家族、通訳、キャンセルを同時に説明しないこと。", model: "基準：期間・分母を固定し、流入構成、信頼、家族権限、価格参照、運用摩擦を別仮説にする。各仮説へ順位が下がる証拠を置く。", why: "Engine前半の誤診防止を評価。", mistake: "施策を先に書く。" },
      { prompt: "試験2：Job、決定単位、Risk/Trust、価値・参照価格を診断する（25点）。", avoid: "富裕層だから払える。", hint: "患者、家族、医師、通訳、支払者のJobと損失。", model: "基準：機能/感情/社会Job、各役割の拒否条件、医療・移動・金銭リスク、同条件証拠と限界、比較代替を接続する。", why: "顧客決定の構造理解を評価。", mistake: "口コミ追加だけ。" },
      { prompt: "試験3：一変数介入、予測、KPI、更新、有料提案、価値実現を作る（45点）。", avoid: "値下げ＋LP改修＋広告変更を同時実施。", hint: "最大不確実性を最小コストで減らす。", model: "基準：例えば広告患者の家族同席診断導線だけを試し、相談→契約、後悔/キャンセル、通訳変更を追う。結果別更新と、診断パイロットの範囲・価格・境界・30日価値レビューを提案する。", why: "独立実務として判断を閉じられるか評価。", mistake: "成約率だけで成功判定。" },
    ],
    independent: { name: "最終判定", scene: "100点満点：問題/証拠15、仮説/反証15、顧客決定15、価値/価格10、介入/倫理15、測定/更新10、有料提案10、価値実現/資産化10。", prompt: "答案完成後、点数ではなく不足能力を一つ選び修正してください。", model: "0–49 初心者、50–69 実務補助者、70–84 独立実務者、85–100 Commercial Psychologist。独立実務合格は75点以上かつ全8領域で半分以上。" },
    transfer: "同じ100点ルーブリックで自分の実案件を診断し、6ページ有料提案と90日実行計画にする。",
    rubric: { pass: "75点以上かつ全領域50%以上。", standard: "70–84：監督なしで小規模案件を診断・実験できる。", pro: "85点以上：限界と倫理を示しながら複雑案件を統合できる。", revise: "最低領域を特定し、そのDayの成果物を再提出してから再受験する。" },
    output: "Commercial Psychology Portfolio v1", next: "卒業後は90日ごとに実案件を再診断し、予測と結果の誤差からEngineを更新する。", sources: [jtbd, testLearn, negotiation],
  },
];

export const engineSteps = [
  { n: "01", name: "Mandate", desc: "何を判断する診断か", failure: "施策が最初から答えになる" },
  { n: "02", name: "Evidence", desc: "事実・出所・比較", failure: "印象を証拠と誤認する" },
  { n: "03", name: "Hypotheses", desc: "競合仮説・反証", failure: "確証探しになる" },
  { n: "04", name: "Customer", desc: "Job・感情・信頼", failure: "属性へ還元する" },
  { n: "05", name: "Decision", desc: "旅程・権限・政治", failure: "担当者＝買い手になる" },
  { n: "06", name: "Market", desc: "文脈・代替・需要", failure: "広い市場へ散る" },
  { n: "07", name: "Value", desc: "証拠・Offer・価格", failure: "形容詞と値引きになる" },
  { n: "08", name: "Intervention", desc: "一変数・予測・倫理", failure: "何が効いたか不明" },
  { n: "09", name: "Measure", desc: "KPI・帰属・更新", failure: "結果後に物語を作る" },
  { n: "10", name: "Realize", desc: "提案・成果・資産化", failure: "成約で学習が止まる" },
];
