"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { days, engineSteps, stages, type Day } from "./curriculum";

type View = "home" | "journey" | "engine" | "portfolio" | "day";
type CourseState = {
  completed: number[];
  answers: Record<string, string>;
  reveals: Record<string, boolean>;
  checks: Record<string, boolean>;
  lastDay: number;
};

const initialState: CourseState = {
  completed: [],
  answers: {},
  reveals: {},
  checks: {},
  lastDay: 1,
};

function assessDayOne(state: CourseState) {
  const fields = ["mandate", "evidence", "hypotheses", "request", "intervention", "decision"];
  const answers = Object.fromEntries(fields.map(field => [field, (state.answers[`d1-room-${field}`] || "").trim()]));
  const includesAny = (value: string, terms: string[]) => terms.some(term => value.toLowerCase().includes(term.toLowerCase()));
  const criteria = [
    answers.mandate.length >= 100 && includesAny(answers.mandate, ["CEO", "CFO", "決め", "配分"]),
    includesAny(answers.evidence, ["9.62", "962", "5.22", "522"]) && includesAny(answers.evidence, ["在庫", "695", "6.95"]),
    answers.hypotheses.length >= 140 && includesAny(answers.hypotheses, ["棄却", "反証", "なら"]),
    answers.request.length >= 120 && includesAny(answers.request, ["Finance", "Growth", "Supply", "Analytics", "FP&A"]) && includesAny(answers.request, ["週次", "cohort", "SKU", "チャネル"]),
    answers.intervention.length >= 150 && includesAny(answers.intervention, ["KPI", "CAC", "LTV", "転換", "在庫"]) && includesAny(answers.intervention, ["対照", "比較", "ベースライン"]),
    answers.decision.length >= 120 && includesAny(answers.decision, ["継続", "中止", "Pivot", "ピボット"]) && includesAny(answers.decision, ["週", "%", "ドル", "$"]),
  ];
  return { criteria, score: criteria.filter(Boolean).length * 15 + (criteria.every(Boolean) ? 10 : 0) };
}

function assessDayTwo(state: CourseState) {
  const fields = ["inherit", "classify", "status", "scope", "request", "memo"];
  const answers = Object.fromEntries(fields.map(field => [field, (state.answers[`d2-room-${field}`] || "").trim()]));
  const includesAny = (value: string, terms: string[]) => terms.some(term => value.toLowerCase().includes(term.toLowerCase()));
  const criteria = [
    answers.inherit.length >= 90 && includesAny(answers.inherit, ["判断", "Decision", "投資", "配分"]),
    answers.classify.length >= 160 && includesAny(answers.classify, ["観測", "引用", "計算", "解釈", "仮説", "予測"]),
    answers.status.length >= 140 && includesAny(answers.status, ["confirmed", "確認済"]) && includesAny(answers.status, ["unverified", "未確認", "contradicted", "矛盾"]),
    answers.scope.length >= 120 && includesAny(answers.scope, ["VMware", "一社", "一般化", "適用範囲"]),
    answers.request.length >= 150 && includesAny(answers.request, ["Finance", "Sales", "Product", "RevOps", "Analytics"]) && includesAny(answers.request, ["cohort", "コホート", "列", "週次", "月次"]),
    answers.memo.length >= 180 && includesAny(answers.memo, ["分かる", "確認", "未確認"]) && includesAny(answers.memo, ["次", "Day 3", "出所", "評価"]),
  ];
  return { criteria, score: criteria.filter(Boolean).length * 15 + (criteria.every(Boolean) ? 10 : 0) };
}

const tabs = [
  { id: "orientation", label: "01 今日の任務" },
  { id: "learn", label: "02 理論" },
  { id: "case", label: "03 OJTケース" },
  { id: "practice", label: "04 練習" },
  { id: "apply", label: "05 実案件へ" },
  { id: "pass", label: "06 合格" },
];

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10" /><path d="M9 20v-6h6v6" /></>,
    map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z" /><path d="M9 3v15M15 6v15" /></>,
    engine: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3v-4h.09A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.09A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.14.38.36.72.66 1 .3.28.69.42 1.1.4H21v4h-.09A1.7 1.7 0 0 0 19.4 15Z" /></>,
    case: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" /></>,
    portfolio: <><path d="M6 3h9l4 4v14H6z" /><path d="M15 3v5h5M9 13h6M9 17h6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    lock: <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5z" /><path d="M4 6.5v13" /></>,
    spark: <><path d="m12 3 1.2 4.3L17.5 9l-4.3 1.7L12 15l-1.2-4.3L6.5 9l4.3-1.7Z" /><path d="m19 15 .6 2.1L22 18l-2.4.9L19 21l-.6-2.1L16 18l2.4-.9Z" /></>,
    external: <><path d="M14 3h7v7M10 14 21 3" /><path d="M21 14v6H4V3h6" /></>,
    download: <><path d="M12 3v12M7 10l5 5 5-5" /><path d="M5 21h14" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  };
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function stageColor(day: Day) {
  return stages[day.stage - 1]?.color || "#1d315c";
}

function AppButton({ children, onClick, variant = "primary", disabled = false }: { children: React.ReactNode; onClick: () => void; variant?: "primary" | "ghost" | "soft"; disabled?: boolean }) {
  return <button className={`button ${variant}`} onClick={onClick} disabled={disabled}>{children}</button>;
}

export default function Home() {
  const [view, setView] = useState<View>("home");
  const [selectedDay, setSelectedDay] = useState(1);
  const [tab, setTab] = useState("orientation");
  const [state, setState] = useState<CourseState>(initialState);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    queueMicrotask(() => {
      if (!mounted) return;
      try {
        const saved = localStorage.getItem("cde-course-v1");
        if (saved) {
          const parsed = { ...initialState, ...JSON.parse(saved) };
          setState(parsed);
          setSelectedDay(parsed.lastDay || 1);
        }
      } catch { /* start clean when local data is malformed */ }
      setLoaded(true);
    });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem("cde-course-v1", JSON.stringify(state));
  }, [state, loaded]);

  const currentDay = days[Math.min(selectedDay, 30) - 1];
  const nextOpen = Math.min(30, Math.max(1, state.completed.length ? Math.max(...state.completed) + 1 : 1));
  const progress = Math.round((state.completed.length / 30) * 100);

  function openDay(n: number) {
    setSelectedDay(n);
    setState(s => ({ ...s, lastDay: n }));
    setTab("orientation");
    setView("day");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function setAnswer(key: string, value: string) {
    setState(s => ({ ...s, answers: { ...s.answers, [key]: value } }));
  }

  function toggleCheck(key: string) {
    setState(s => ({ ...s, checks: { ...s.checks, [key]: !s.checks[key] } }));
  }

  function dayScore(day: Day) {
    if (day.day === 1) {
      return assessDayOne(state).score;
    }
    if (day.day === 2) {
      return assessDayTwo(state).score;
    }
    const guided = day.drills.filter((_, i) => (state.answers[`d${day.day}-q${i}`] || "").trim()).length;
    const guidedPoints = Math.round((guided / day.drills.length) * 40);
    const independent = (state.answers[`d${day.day}-ind`] || "").trim() ? 20 : 0;
    const transfer = (state.answers[`d${day.day}-transfer`] || "").trim() ? 20 : 0;
    const checks = [0, 1, 2, 3].filter(i => state.checks[`d${day.day}-c${i}`]).length * 5;
    return guidedPoints + independent + transfer + checks;
  }

  function completeDay(day: Day) {
    if (dayScore(day) < 75) return;
    setState(s => ({
      ...s,
      completed: Array.from(new Set([...s.completed, day.day])).sort((a, b) => a - b),
      lastDay: Math.min(30, day.day + 1),
    }));
    if (day.day < 30) openDay(day.day + 1);
    else setView("portfolio");
  }

  function exportPortfolio() {
    const md = [
      "# Commercial Psychology Portfolio v1",
      "",
      `進捗: ${state.completed.length}/30 Days`,
      `出力日: ${new Date().toLocaleDateString("ja-JP")}`,
      "",
      ...days.flatMap(day => {
        const hasAny = day.drills.some((_, i) => state.answers[`d${day.day}-q${i}`]) || state.answers[`d${day.day}-transfer`];
        if (!hasAny) return [];
        return [
          `## Day ${day.day} — ${day.title}`,
          `成果物: ${day.output}`,
          "",
          ...day.drills.flatMap((q, i) => state.answers[`d${day.day}-q${i}`] ? [`### ${q.prompt}`, state.answers[`d${day.day}-q${i}`], ""] : []),
          ...(state.answers[`d${day.day}-ind`] ? ["### Independent Practice", state.answers[`d${day.day}-ind`], ""] : []),
          ...(state.answers[`d${day.day}-transfer`] ? ["### 自分の実案件", state.answers[`d${day.day}-transfer`], ""] : []),
        ];
      }),
    ].join("\n");
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Commercial_Psychology_Portfolio_v1.md";
    a.click();
    URL.revokeObjectURL(url);
  }

  const nav = [
    { id: "home" as View, label: "Today", icon: "home" },
    { id: "journey" as View, label: "30 Days", icon: "map" },
    { id: "engine" as View, label: "Engine", icon: "engine" },
    { id: "portfolio" as View, label: "Portfolio", icon: "portfolio" },
  ];

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setView("home")} aria-label="ホームへ">
          <span className="brand-mark">C</span>
          <span><strong>Commercial Psychology</strong><em>DECISION INTELLIGENCE ACADEMY</em></span>
        </button>
        <div className="top-progress">
          <span>30-DAY OJT</span>
          <div className="mini-track"><i style={{ width: `${progress}%` }} /></div>
          <b>{state.completed.length}/30</b>
        </div>
        <button className="avatar" aria-label="学習者プロフィール">H</button>
      </header>

      <aside className="sidebar">
        <div className="side-intro">
          <small>YOUR MISSION</small>
          <p>未知案件を、根拠ある商業判断へ。</p>
        </div>
        <nav>
          {nav.map(item => (
            <button key={item.id} className={view === item.id || (view === "day" && item.id === "home") ? "active" : ""} onClick={() => setView(item.id)}>
              <Icon name={item.icon} /><span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="side-card">
          <Icon name="spark" />
          <small>NEXT ASSET</small>
          <strong>{days[nextOpen - 1].output}</strong>
          <button onClick={() => openDay(nextOpen)}>続きを開く <Icon name="arrow" size={15} /></button>
        </div>
      </aside>

      <main className="main">
        {view === "home" && <Dashboard progress={progress} nextOpen={nextOpen} state={state} openDay={openDay} setView={setView} />}
        {view === "journey" && <Journey state={state} openDay={openDay} />}
        {view === "engine" && <Engine />}
        {view === "portfolio" && <Portfolio state={state} openDay={openDay} exportPortfolio={exportPortfolio} />}
        {view === "day" && currentDay && (
          <Lesson
            day={currentDay}
            selectDay={openDay}
            tab={tab}
            setTab={setTab}
            state={state}
            setAnswer={setAnswer}
            toggleCheck={toggleCheck}
            score={dayScore(currentDay)}
            completeDay={() => completeDay(currentDay)}
          />
        )}
      </main>

      <nav className="mobile-nav">
        {nav.map(item => <button key={item.id} className={view === item.id ? "active" : ""} onClick={() => setView(item.id)}><Icon name={item.icon} size={19} /><span>{item.label}</span></button>)}
      </nav>
    </div>
  );
}

function Dashboard({ progress, nextOpen, state, openDay, setView }: { progress: number; nextOpen: number; state: CourseState; openDay: (n: number) => void; setView: (v: View) => void }) {
  const day = days[nextOpen - 1];
  const stage = stages[day.stage - 1];
  const recentOutputs = days.filter(d => state.completed.includes(d.day)).slice(-3).reverse();
  return (
    <div className="page dashboard">
      <section className="hello-hero">
        <div className="hello-copy">
          <div className="eyebrow"><span>経営者・事業責任者・戦略コンサルタントを目指す人のための実務訓練</span></div>
          <h1>顧客が動かない理由を診断し、<br /><span>売上を動かす施策</span>まで設計する。</h1>
          <p className="hero-lead">「売れない」「価格が高い」「若者に選ばれない」。根拠のない依頼をそのまま施策にせず、証拠・顧客心理・事業構造から真因を特定し、経営会議で実行できる提案へ変える30日間の案件型学習プラットフォームです。</p>
          <div className="value-path" aria-label="サービスが提供する価値">
            <div><small>PROBLEM</small><strong>経験と勘による誤診</strong></div>
            <i aria-hidden="true">→</i>
            <div><small>METHOD</small><strong>実在企業の案件OJT</strong></div>
            <i aria-hidden="true">→</i>
            <div><small>OUTCOME</small><strong>施策・KPI・有料提案</strong></div>
          </div>
          <div className="hero-actions">
            <AppButton onClick={() => openDay(nextOpen)}>案件訓練を始める <Icon name="arrow" size={17} /></AppButton>
            <AppButton variant="ghost" onClick={() => document.getElementById("course-blueprint")?.scrollIntoView({ behavior: "smooth" })}>30日後にできること</AppButton>
          </div>
        </div>
        <div className="progress-orbit" aria-label={`学習進捗 ${progress}%`} style={{ "--progress": `${progress * 3.6}deg` } as React.CSSProperties}>
          <div><small>COMPLETE</small><b>{progress}<em>%</em></b><span>{state.completed.length} of 30 days</span></div>
          <i className="orbit-dot" />
        </div>
        <span className="hero-shape shape-a" />
        <span className="hero-shape shape-b" />
      </section>

      <CourseBlueprint />

      <section className="mission-card" style={{ "--accent": stage.color } as React.CSSProperties}>
        <div className="day-tile"><small>DAY</small><strong>{String(day.day).padStart(2, "0")}</strong><span>{stages[day.stage - 1].days}</span></div>
        <div className="mission-copy">
          <div className="micro-label">STAGE {day.stage} · {stage.name}</div>
          <h2>{day.title}</h2>
          <p>{day.question}</p>
          <div className="mission-meta"><span><Icon name="clock" size={16} /> 必須 2–3時間</span><span><Icon name="case" size={16} /> {day.case.name}</span><span><Icon name="portfolio" size={16} /> {day.output}</span></div>
        </div>
        <button className="round-arrow" onClick={() => openDay(day.day)} aria-label={`Day ${day.day}を開く`}><Icon name="arrow" /></button>
      </section>

      <section className="dashboard-grid">
        <div className="panel engine-preview">
          <div className="panel-heading"><div><small>YOUR THINKING SYSTEM</small><h3>Commercial Diagnosis Engine</h3></div><button onClick={() => setView("engine")}>全体を見る <Icon name="arrow" size={15} /></button></div>
          <div className="engine-mini">
            {engineSteps.map((step, i) => <div key={step.n} className={i < Math.ceil((nextOpen / 30) * 10) ? "built" : ""}><span>{step.n}</span><b>{step.name}</b></div>)}
          </div>
          <p className="quiet">観測から価値実現までを一つの循環として運転します。前工程の誤りほど、後工程の損失が大きくなります。</p>
        </div>
        <div className="panel assets-preview">
          <div className="panel-heading"><div><small>PORTFOLIO</small><h3>積み上がった実務資産</h3></div><b>{state.completed.length}<em>/30</em></b></div>
          {recentOutputs.length ? recentOutputs.map(d => <button key={d.day} onClick={() => openDay(d.day)}><span className="asset-check"><Icon name="check" size={14} /></span><span><small>DAY {d.day}</small><strong>{d.output}</strong></span><Icon name="arrow" size={15} /></button>) : <div className="empty-asset"><Icon name="portfolio" /><p>Day 1を終えると、最初の診断成果物がここに保存されます。</p></div>}
        </div>
      </section>
    </div>
  );
}

function CourseBlueprint() {
  const framework = [
    { n: "01–03", name: "診断", detail: "Mandate · Evidence · Hypotheses", result: "症状と原因を分ける" },
    { n: "04–06", name: "意思決定", detail: "Customer · Decision · Market", result: "誰が、なぜ、何と比べて決めるか読む" },
    { n: "07–08", name: "価値設計", detail: "Value · Intervention", result: "商品・価格・一変数実験を組む" },
    { n: "09–10", name: "実証と収益化", detail: "Measure · Realize", result: "結果を測り、有料提案へ変える" },
  ];
  const outcomes = [
    "未知案件の売上停滞を、事実・解釈・競合仮説へ分解できる",
    "顧客のJob、感情、信頼、権限、摩擦から購買判断を説明できる",
    "狙う市場、Offer、価値証拠、参照価格、交渉条件を一貫設計できる",
    "集客・営業施策を一変数で試し、KPIと反証条件から改善できる",
    "診断を6ページの有料提案書と90日Commercial OSへ変換できる",
  ];
  return <section className="course-blueprint" id="course-blueprint">
    <div className="blueprint-heading">
      <div><small>CURRICULUM AT A GLANCE</small><h2>この30日で、何をどの順番で身につけるか</h2></div>
      <p>答えの暗記ではなく、実在ケースでプロの判断順序を反復し、同じ型を別業界と自分の案件へ移植します。</p>
    </div>
    <div className="blueprint-diagram">
      <div className="diagram-input"><small>INPUT</small><strong>数字はある。<br />原因は不明。</strong><span>売上停滞／失注／価格反論／集客不振</span></div>
      <div className="diagram-arrow"><Icon name="arrow" /></div>
      <div className="framework-clusters">{framework.map(item => <div key={item.n}><span>{item.n}</span><strong>{item.name}</strong><small>{item.detail}</small><p>{item.result}</p></div>)}</div>
      <div className="diagram-arrow"><Icon name="arrow" /></div>
      <div className="diagram-output"><small>DAY 30 OUTPUT</small><strong>根拠ある<br />商業判断</strong><span>有料提案書＋90日実行計画</span></div>
    </div>
    <div className="agenda-grid">{stages.map(stage => <div key={stage.id} style={{ "--stage-color": stage.color } as React.CSSProperties}><span>STAGE {stage.id} · {stage.days}</span><strong>{stage.name}</strong><p>{stage.after}</p></div>)}</div>
    <div className="blueprint-bottom">
      <div className="learning-loop">
        <small>EVERY DAY · OJT LOOP</small>
        <div><span>1</span><b>実在ケース</b><i>状況と数値を見る</i></div><Icon name="arrow" />
        <div><span>2</span><b>プロの完成例</b><i>判断順序を読む</i></div><Icon name="arrow" />
        <div><span>3</span><b>型を写す</b><i>問いと模範を即比較</i></div><Icon name="arrow" />
        <div><span>4</span><b>自案件へ移植</b><i>一能力だけ使う</i></div>
      </div>
      <div className="outcome-list"><small>AFTER 30 DAYS · できるようになること</small>{outcomes.map((outcome, i) => <p key={outcome}><span>{i + 1}</span>{outcome}</p>)}</div>
    </div>
  </section>;
}

function Journey({ state, openDay }: { state: CourseState; openDay: (n: number) => void }) {
  const maxOpen = Math.min(30, Math.max(1, state.completed.length ? Math.max(...state.completed) + 1 : 1));
  return (
    <div className="page">
      <PageTitle eyebrow="THE 30-DAY BLUEPRINT" title="一日一能力。30日後、一つのEngine。" text="各Dayは前日までの成果物を使う累積型です。理論は主役ではなく、その日の判断能力を作る道具です。" />
      <div className="stage-list">
        {stages.map(stage => (
          <section key={stage.id} className="stage-block" style={{ "--accent": stage.color } as React.CSSProperties}>
            <header>
              <div className="stage-number">0{stage.id}</div>
              <div><small>{stage.days}</small><h2>{stage.name}</h2></div>
              <div className="ability-shift"><span>{stage.before}</span><Icon name="arrow" size={16} /><strong>{stage.after}</strong></div>
            </header>
            <div className="day-grid">
              {days.filter(d => d.stage === stage.id).map(day => {
                const done = state.completed.includes(day.day);
                const locked = day.day > maxOpen;
                return <button key={day.day} className={`day-card ${done ? "done" : ""} ${locked ? "locked" : ""}`} onClick={() => openDay(day.day)}>
                  <span className="day-number">{done ? <Icon name="check" size={17} /> : locked ? <Icon name="lock" size={15} /> : String(day.day).padStart(2, "0")}</span>
                  <small>DAY {day.day}</small>
                  <strong>{day.title}</strong>
                  <p>{day.capability}</p>
                  <em>{day.output}</em>
                </button>;
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function Engine() {
  return (
    <div className="page">
      <PageTitle eyebrow="YOUR THINKING OPERATING SYSTEM" title="Commercial Diagnosis Engine" text="売れない理由を当てるチェックリストではありません。証拠から仮説を更新し、介入の結果を次の知的資産へ戻す循環です。" />
      <div className="engine-loop">
        {engineSteps.map((step, i) => (
          <div key={step.n} className="engine-step">
            <span>{step.n}</span>
            <div><small>STEP {step.n}</small><h3>{step.name}</h3><p>{step.desc}</p></div>
            <div className="failure"><b>ここを誤ると</b>{step.failure}</div>
            {i < engineSteps.length - 1 && <i><Icon name="arrow" size={17} /></i>}
          </div>
        ))}
        <div className="feedback-loop"><Icon name="engine" /><div><strong>UPDATE LOOP</strong><p>測定結果はEvidenceへ戻り、仮説順位・顧客理解・Offerを更新する。</p></div></div>
      </div>
      <div className="expert-difference">
        <div><small>BEGINNER</small><h3>答えを早く出す</h3><p>最初の物語に合う情報を集め、施策を多く実行する。</p></div>
        <div className="difference-arrow"><Icon name="arrow" /></div>
        <div><small>PROFESSIONAL</small><h3>次の最良判断を出す</h3><p>不確実性を明示し、最も安い識別証拠を取り、予測誤差から更新する。</p></div>
      </div>
    </div>
  );
}

function Lesson({ day, selectDay, tab, setTab, state, setAnswer, toggleCheck, score, completeDay }: {
  day: Day; selectDay: (n: number) => void; tab: string; setTab: (s: string) => void; state: CourseState;
  setAnswer: (k: string, v: string) => void; toggleCheck: (k: string) => void;
  score: number; completeDay: () => void;
}) {
  const color = stageColor(day);
  const lessonTopRef = useRef<HTMLDivElement>(null);
  const lessonBodyRef = useRef<HTMLDivElement>(null);
  const previousDayRef = useRef(day.day);
  const mountedRef = useRef(false);

  useLayoutEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }

    const dayChanged = previousDayRef.current !== day.day;
    previousDayRef.current = day.day;
    const target = dayChanged ? lessonTopRef.current : lessonBodyRef.current;
    target?.scrollIntoView({ block: "start", behavior: "auto" });
  }, [day.day, tab]);

  return (
    <div ref={lessonTopRef} className="lesson" style={{ "--accent": color } as React.CSSProperties}>
      <nav className="day-switcher" aria-label="学習日を選択">
        {days.map(item => (
          <button
            key={item.day}
            className={`${item.day === day.day ? "active" : ""} ${state.completed.includes(item.day) ? "done" : ""}`}
            onClick={() => {
              selectDay(item.day);
            }}
            aria-label={`Day ${item.day} ${item.title}`}
          >
            <small>{item.day}</small><span>{item.title}</span>
          </button>
        ))}
      </nav>
      <section className="lesson-hero">
        <div className="lesson-day"><small>DAY</small><strong>{String(day.day).padStart(2, "0")}</strong></div>
        <div><div className="micro-label">STAGE {day.stage} · {stages[day.stage - 1].name}</div><h1>{day.title}</h1><p>{day.capability}</p></div>
        <div className="lesson-time"><Icon name="clock" /><span><small>REQUIRED</small><b>2–3 HOURS</b></span></div>
      </section>
      <nav className="lesson-tabs">
        {tabs.map(t => <button key={t.id} className={tab === t.id ? "active" : ""} onClick={() => { setTab(t.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}>{t.label}</button>)}
      </nav>

      <div ref={lessonBodyRef} className="lesson-body">
        {tab === "orientation" && <Orientation day={day} setTab={setTab} />}
        {tab === "learn" && <Learn day={day} setTab={setTab} />}
        {tab === "case" && <Case day={day} setTab={setTab} />}
        {tab === "practice" && (day.day === 1
          ? <DayOneCaseRoom state={state} setAnswer={setAnswer} setTab={setTab} />
          : day.day === 2
            ? <DayTwoCaseRoom state={state} setAnswer={setAnswer} setTab={setTab} />
            : <Practice day={day} state={state} setAnswer={setAnswer} setTab={setTab} />)}
        {tab === "apply" && <Apply day={day} state={state} setAnswer={setAnswer} setTab={setTab} />}
        {tab === "pass" && <Pass day={day} state={state} toggleCheck={toggleCheck} score={score} completeDay={completeDay} />}
      </div>
    </div>
  );
}

function Orientation({ day, setTab }: { day: Day; setTab: (s: string) => void }) {
  const prev = day.day > 1 ? days[day.day - 2] : null;
  const totalMinutes = day.sources.reduce((n, source) => n + source.minutes, 0);
  return <div className="content-flow">
    <section className="daily-brief">
      <header>
        <div><small>TODAY’S PARTNER BRIEF</small><h2>{day.question}</h2></div>
        <span className="brief-time"><Icon name="clock" size={17} /> 2–3 HOURS</span>
      </header>
      <div className="brief-grid">
        <article><small>01 · WHY NOW</small><h3>なぜ今日学ぶか</h3><p>{day.why}</p></article>
        <article><small>02 · DECISION SKILL</small><h3>今日できるようになること</h3><p>{day.capability}</p></article>
        <article><small>03 · WORKED CASE</small><h3>{day.case.name}</h3><p>{day.case.scene}</p></article>
        <article><small>04 · DELIVERABLE</small><h3>{day.output}</h3><p>完成例を読み、3つの小判断、別業界、自分の案件の順で作ります。</p></article>
      </div>
      <div className="brief-route">
        <span><b>INPUT</b>{day.sources.length}資料 · {totalMinutes}分</span><Icon name="arrow" size={16} />
        <span><b>MODEL</b>プロの判断順序</span><Icon name="arrow" size={16} />
        <span><b>PRACTICE</b>3判断＋別業界</span><Icon name="arrow" size={16} />
        <span><b>OUTPUT</b>{day.output}</span>
      </div>
    </section>
    <div className="connection-row">
      <div><small>YESTERDAY</small><strong>{prev ? prev.title : "ここから開始"}</strong><p>{prev ? prev.output : "診断する問題の境界を作る"}</p></div>
      <Icon name="arrow" />
      <div className="today"><small>TODAY</small><strong>{day.title}</strong><p>{day.capability}</p></div>
      <Icon name="arrow" />
      <div><small>TOMORROW</small><strong>{day.day < 30 ? days[day.day].title : "90日実務へ"}</strong><p>{day.next}</p></div>
    </div>
    <NextButton label="理論を日本語で理解する" onClick={() => setTab("learn")} />
  </div>;
}

function Learn({ day, setTab }: { day: Day; setTab: (s: string) => void }) {
  return <div className="content-flow">
    <SectionHead index="D" eyebrow="WORKING THEORY" title={day.theory.name} text="理論名を暗記する必要はありません。今日の判断の、どこで使い、どこで止めるかを理解します。" />
    {day.day === 1 && <DayOneTheory />}
    <section className="theory-grid">
      <div className="theory-main"><small>PLAIN JAPANESE</small><h3>ひとことで言うと</h3><p>{day.theory.plain}</p></div>
      <div><small>説明できる</small><p>{day.theory.can}</p></div>
      <div><small>説明できない</small><p>{day.theory.limit}</p></div>
      <div className="warning"><small>よくある誤用</small><p>{day.theory.misuse}</p></div>
    </section>
    <section className="source-section">
      <div className="source-heading"><div><small>PRIMARY MATERIALS</small><h3>今日見る範囲だけ</h3></div><span>合計 {day.sources.reduce((n, s) => n + s.minutes, 0)} min</span></div>
      {day.sources.map((source, i) => {
        const kind = source.kind || (source.provider.includes("Coursera") ? "COURSE" : "READING");
        const action = kind === "VIDEO" ? "視聴" : kind === "COURSE" ? "受講" : "読解";
        return <a className="source-card" key={`${source.url}-${i}`} href={source.url} target="_blank" rel="noreferrer">
        <span className="source-index">{kind}</span>
        <div><small>{source.provider}</small><h4>{source.title}</h4><p><b>{action}範囲：</b>{source.range}</p><p><b>{action}中の問い：</b>{source.purpose}ために、原著者が「言えること／言っていないこと」を一つずつ拾う。</p></div>
        <div className="source-time"><Icon name="clock" size={15} /> {source.minutes} min <Icon name="external" size={16} /></div>
      </a>})}
      <div className="source-goal"><Icon name="check" /><p><b>教材後の到達条件</b>：{day.theory.name}を、定義・使う工程・限界・誤用の4文で説明できる。</p></div>
    </section>
    <NextButton label="プロの完成思考を見る" onClick={() => setTab("case")} />
  </div>;
}

function DayOneTheory() {
  const gates = [
    ["1", "Decision / 意思決定", "分析結果を使う人は誰か。いつ、どの選択肢から一つを選ぶのか。決定がなければ調査は知識収集で終わる。"],
    ["2", "Value at Stake / 守る価値", "売上、利益、キャッシュ、戦略顧客、能力、信頼の何が、いくら・どの速度で失われるのか。"],
    ["3", "Validity / 問題妥当性", "症状は目標戦略に照らして本当に悪いか。別の価値源の成長や、解く機会費用を含めても優先すべきか。"],
    ["4", "Boundary / 診断境界", "市場・顧客・商品・地域・期間・ファネルのどこまでを今回扱い、何を別ワークストリームへ送るか。"],
    ["5", "Evidence / 識別証拠", "競合する説明の順位を変えるデータは何か。社内のどの部署・役職が、どの名称の資料を持つか。"],
    ["6", "Action Test / 行動条件", "結果がAなら何をし、Bなら何をしないか。結論に関係なく同じ施策をするなら、その分析は不要。"],
  ];
  return <>
    <section className="mentor-lecture">
      <div className="mentor-kicker">10-MINUTE PARTNER LECTURE · 先に理解</div>
      <h2>問題は「数字が下がったこと」ではない。<br />経営判断を誤らせる、不確実性の塊である。</h2>
      <div className="lecture-columns">
        <p>クライアントは通常、症状・原因・処方を一文に混ぜて持ってきます。「若者が減った。ブランドが古い。SNSを強化したい」「売上が落ちた。需要がない。広告を増やしたい」。コンサルタントの最初の仕事は、文章を測定可能に短くすることではありません。<b>その会社が今、本当に何を決めなければならないかへ戻すこと</b>です。</p>
        <p>若年客が減っても、戦略が高単価成熟層へ移行中なら成功の副作用かもしれません。売上が減っても、低粗利製品から高LTV継続収益へ移行中なら、集計売上だけでは悪化を判定できません。ゆえに「問題を固定する」前に、<b>問題として扱う資格があるか</b>を審査します。</p>
      </div>
      <div className="partner-rule"><span>PARTNER RULE</span><strong>症状 → 測定</strong>へ急がず、<strong>意思決定 → 価値毀損 → 妥当性 → 境界 → 証拠 → 行動条件</strong>の順で診断契約を作る。</div>
    </section>
    <section className="gate-framework">
      <div className="framework-title"><small>PROBLEM VALIDITY GATE</small><h3>この6問を通過しない問題には、分析工数を使わない</h3></div>
      <div className="gate-grid">{gates.map(([n, title, body]) => <article key={n}><span>{n}</span><div><h4>{title}</h4><p>{body}</p></div></article>)}</div>
    </section>
    <section className="contrast-table">
      <div className="framework-title"><small>QUALITY BAR</small><h3>同じ依頼が、どこまで経営課題になっているか</h3></div>
      <div className="comparison-row head"><span>水準</span><span>書き方</span><span>欠けているもの</span></div>
      <div className="comparison-row"><b>受付メモ</b><p>最近、若い人に選ばれない。</p><p>事実・戦略との関係がない。</p></div>
      <div className="comparison-row"><b>分析課題</b><p>20代の新規予約率が前年同期比で何％低下したか。</p><p>測れるが、低下を解く価値と意思決定がない。</p></div>
      <div className="comparison-row pro"><b>Decision Mandate</b><p>院長が次四半期の広告費と施術枠を20代再獲得／50–60代高単価治療のどちらへ配分するか決めるため、年齢×施術別の限界利益・LTV・稼働を比較する。</p><p>結果が資源配分を変え、問題の妥当性も検査できる。</p></div>
    </section>
  </>;
}

function Case({ day, setTab }: { day: Day; setTab: (s: string) => void }) {
  return <div className="content-flow">
    <SectionHead index="E" eyebrow="WORKED EXAMPLE" title={day.case.name} text={day.case.role} />
    <section className="case-brief">
      <div className="brief-label">SITUATION</div>
      <h3>{day.case.scene}</h3>
      <div className="fact-grid">{day.case.facts.map((fact, i) => <div key={fact}><span>FACT {i + 1}</span><p>{fact}</p></div>)}</div>
    </section>
    <section className="reasoning-track">
      <div className="track-title"><small>PROFESSIONAL REASONING</small><h3>結論ではなく、判断の順序を追う</h3></div>
      {day.case.reasoning.map((step, i) => <div className="reason-step" key={step}><span>{String(i + 1).padStart(2, "0")}</span><p>{step}</p></div>)}
    </section>
    {day.day === 1 && <DayOneWorkpapers />}
    <section>
      <SectionHead index="F" eyebrow="DISSECTION" title="三段階の答えを比較する" text="それらしく聞こえる答えほど、反証と測定がないと危険です。" />
      <div className="answer-levels">
        <div><small>BEGINNER</small><h4>初心者</h4><p>最初に目立った説明を原因とみなし、すぐ施策を提案する。</p></div>
        <div><small>DANGEROUSLY SMART</small><h4>一見優秀だが危険</h4><p>専門理論を多数当てはめるが、どの証拠で順位が変わるかを示さない。</p></div>
        <div><small>PROFESSIONAL</small><h4>プロ</h4><p>事実と不足を分け、競合仮説を置き、最小の識別証拠→予測→更新の順で決める。</p></div>
      </div>
    </section>
    <NextButton label="一判断ずつ真似する" onClick={() => setTab("practice")} />
  </div>;
}

function DayOneWorkpapers() {
  return <section className="workpapers">
    <div className="framework-title"><small>ENGAGEMENT WORKPAPERS · 実務資料</small><h3>公開10-Kから、社内追加資料の依頼までつなぐ</h3><p>10-Kは症状の分解と仮説設定には使えますが、広告・価格・転換・在庫のどれが原因かまでは証明しません。次に社内データを取りに行きます。</p></div>
    <div className="workpaper-table">
      <div className="workpaper-head"><span>現物資料／保有者</span><span>見る場所・数字</span><span>比較・判断</span></div>
      <div><b>FY2022 Form 10-K<br /><small>IR / Finance</small></b><p>Consolidated Statements、Segment information、Key Operational Metrics、Inventory</p><p>FY2021 vs FY2022を製品／Subscriptionで分解。会員数と在庫の方向が全社売上と一致するか。</p></div>
      <div><b>Weekly funnel report<br /><small>Growth / E-commerce</small></b><p>Impression、visit、PDP、cart、checkout、purchaseをchannel・device・geo別</p><p>前年同週・価格改定前後・同一チャネルで比較し、需要低下が流入か転換かを識別。</p></div>
      <div><b>Media spend & CAC bridge<br /><small>Growth Finance</small></b><p>Spend、new customers、blended／incremental CAC、payback、promotion</p><p>広告量不足か効率悪化かを分離。追加1ドルの限界獲得価値が正か。</p></div>
      <div><b>SKU inventory aging<br /><small>Supply Chain / FP&amp;A</small></b><p>SKU別units、days on hand、forecast accuracy、markdown、cancellation、return</p><p>在庫増が需要予測、SKU mix、供給リードタイム、返品のどこで発生したか。</p></div>
      <div><b>Subscriber cohort file<br /><small>Product Analytics</small></b><p>加入月別activation、usage、churn、ARPU、service cost</p><p>会員増がLTV・Contribution Marginへ変換されているか。獲得縮小後も継続価値を守れるか。</p></div>
    </div>
    <div className="final-mandate">
      <small>PARTNER-READY OUTPUT · 完成形</small>
      <h3>Diagnostic Mandate v1</h3>
      <p><b>Decision：</b>CEO／CFOが30日後、次四半期の成長資金を新規獲得・会員価値・在庫圧縮へどう再配分するか決める。</p>
      <p><b>Issue：</b>FY2022の製品売上▲9.62億ドルと在庫＋6.95億ドルがキャッシュを毀損する一方、Subscription売上＋5.22億ドル・会員＋27%は保護すべき価値源。需要全体の消滅とは定義しない。</p>
      <p><b>Scope：</b>米国Connected Fitnessの新規獲得ファネル、価格・プロモーション、CAC、SKU在庫をFY2021–22週次で分析。既存会員解約原因・海外市場・ブランド刷新は除外。</p>
      <p><b>Decision rule：</b>限界CACが会員Contribution LTV内で、流入不足が主要因なら広告を選択。転換悪化なら価格／商品／配送を修正。在庫ミスマッチが主因なら広告ではなくSKU・調達・処分へ資金を移す。</p>
    </div>
  </section>;
}

const dayOneRoomSteps = [
  {
    key: "mandate",
    n: "01",
    label: "PARTNER INTAKE",
    title: "依頼をDecision Mandateへ変換する",
    prompt: "誰が・いつ・何を決める案件か、守る経済価値、今回扱わない範囲まで書いてください。",
    evidence: "CEO／CFO、次四半期の資金配分、製品売上・継続収益・在庫キャッシュ、米国Connected Fitness",
    model: "CEO／CFOが30日後、次四半期の成長資金を①新規獲得、②会員価値、③在庫圧縮のどこへ配分するか決める。FY2022の製品売上減と在庫増によるキャッシュ毀損を止めつつ、成長したSubscription価値を守る。海外市場とブランド刷新は今回の範囲外とする。",
  },
  {
    key: "evidence",
    n: "02",
    label: "DATA ROOM 01",
    title: "10-Kから矛盾する証拠を抽出する",
    prompt: "製品、Subscription、会員、在庫の4点をFY2021→FY2022で比較し、「需要が消えた」に対する暫定判断を書いてください。",
    evidence: "Product revenue $3.15bn→$2.19bn／Subscription $0.87bn→$1.39bn／会員＋27%／Inventory $0.52bn→$1.21bn",
    model: "製品売上は約9.62億ドル減った一方、Subscription売上は約5.22億ドル増え、Connected Fitness会員も27%増えた。在庫は約6.95億ドル増加した。したがって全需要の消滅は支持されず、機器新規獲得・価格／転換・供給過剰と、既存会員価値を分けて診断する。",
  },
  {
    key: "hypotheses",
    n: "03",
    label: "HYPOTHESIS CONTROL",
    title: "競合仮説と棄却条件を置く",
    prompt: "最低3仮説を順位づけし、各仮説が正しいなら見える数字／棄却する数字を対で書いてください。",
    evidence: "H1 流入不足／H2 価格・商品・配送による転換悪化／H3 SKU需要予測・調達過剰。広告増はH1だけに効く。",
    model: "H1流入不足：同一価格・同一地域のvisitが低下しCVRが安定なら支持、visit安定でCVR低下なら棄却。H2転換悪化：PDP→purchaseが価格改定・配送LT悪化後に低下すれば支持。H3供給過剰：sell-through安定でも発注・入荷が需要を上回りagingが増えれば支持。最初に週次ファネルでH1/H2を識別する。",
  },
  {
    key: "request",
    n: "04",
    label: "CLIENT REQUEST",
    title: "誰へ、どの名称の資料を要求するか",
    prompt: "部署／役職、正式な資料名、必要列、期間・粒度、比較軸、回答期限を含む依頼文を書いてください。",
    evidence: "Growth Finance: Media spend & CAC bridge／E-commerce: Weekly funnel report／Supply Chain: SKU inventory aging／Product Analytics: Subscriber cohort file",
    model: "Growth Finance責任者へMedia Spend & CAC Bridge、E-commerce AnalyticsへWeekly Funnel Reportを依頼。FY2021–22の週次、channel×device×geoでspend, visit, PDP, cart, checkout, purchase, price, promotion, CACを含め、価格改定日を付す。Supply ChainへSKU Inventory Aging、Product Analyticsへ加入月別cohortを5営業日以内に依頼する。",
  },
  {
    key: "intervention",
    n: "05",
    label: "INTERVENTION MEMO",
    title: "仮説ごとの施策と因果測定を設計する",
    prompt: "有力仮説、介入、対象／比較群、先行KPI、遅行KPI、ガードレール、測定期間を一続きで設計してください。",
    evidence: "広告増／価格・配送改善／SKU圧縮は原因別に分離。Incremental CAC、CVR、Contribution LTV、在庫日数、キャッシュを測る。",
    model: "H2が有力なら、同質地域を介入／比較群に分け、配送確約＋価格表示を4週間テストする。先行KPIはcheckout completionとCVR、遅行KPIはincremental CAC、90日Contribution LTV、返品後粗利。値引率と解約率をガードレールにし、広告費は固定して因果を分離する。",
  },
  {
    key: "decision",
    n: "06",
    label: "EXECUTIVE DECISION",
    title: "継続・中止・Pivotの閾値を先に固定する",
    prompt: "結果別に、どの数字なら継続／中止／Pivotか、次回経営会議の提案文として書いてください。",
    evidence: "施策前に閾値を固定。効果、経済性、悪影響、不確実性の4点で判断する。",
    model: "4週後、CVRが比較群比＋10%以上、incremental CACがContribution LTVの30%以内、返品・解約が各＋2pt未満なら継続。CVR差が3%未満なら中止。CVRは改善してもCAC回収が12か月超なら、広告拡大せず高粗利SKU・配送地域へPivotし、2週間再検証する。",
  },
];

function DayOneCaseRoom({ state, setAnswer, setTab }: { state: CourseState; setAnswer: (k: string, v: string) => void; setTab: (s: string) => void }) {
  const completed = dayOneRoomSteps.filter(step => (state.answers[`d1-room-${step.key}`] || "").trim()).length;
  return <div className="content-flow case-room">
    <section className="room-command">
      <div><small>LIVE ENGAGEMENT · CASE 001</small><h2>Peloton FY2022｜需要消滅か、事業構造転換か</h2><p>資料を読むだけで終わらせず、経営判断・追加資料・仮説棄却・施策・測定・再配分まで一巡します。</p></div>
      <div className="room-status"><b>{completed}<span>/6</span></b><small>WORKPAPERS</small></div>
    </section>
    <section className="data-room">
      <header><div><small>SIMULATED DATA ROOM</small><h3>案件ファイル｜閲覧順と用途</h3></div><span>4 FILES · 1 INTERVIEW</span></header>
      <div className="file-grid">
        {[
          ["01", "FY2022 Form 10-K", "IR / Finance", "pp.49–53", "製品・Subscription・会員・在庫を分解"],
          ["02", "Weekly Funnel Report", "E-commerce Analytics", "FY21–22 weekly", "流入低下と転換悪化を識別"],
          ["03", "Media Spend & CAC Bridge", "Growth Finance", "channel × geo", "広告量と限界効率を分離"],
          ["04", "SKU Inventory Aging", "Supply Chain / FP&A", "SKU × aging", "需要予測・発注・返品を識別"],
          ["05", "CFO Intake Interview", "CFO", "12 min transcript", "決定期限・資金制約・反論を確定"],
        ].map(file => <article key={file[0]}><span>{file[0]}</span><div><b>{file[1]}</b><small>{file[2]} · {file[3]}</small><p>{file[4]}</p></div></article>)}
      </div>
    </section>
    <section className="stakeholder-tension">
      <small>STAKEHOLDER ROOM · 同じ数字でも利害が違う</small>
      <div><p><b>CEO</b>「ブランド投資を止めれば回復が遅れる」</p><p><b>CFO</b>「在庫とCACの両方へ現金は使えない」</p><p><b>Growth</b>「広告不足が売上減の主因だ」</p><p><b>Supply Chain</b>「発注時点の需要予測は承認済みだった」</p></div>
    </section>
    {dayOneRoomSteps.map(step => {
      const key = `d1-room-${step.key}`;
      const value = state.answers[key] || "";
      return <section className="room-step" key={step.key}>
        <header><span>{step.n}</span><div><small>{step.label}</small><h3>{step.title}</h3></div><em>{value.trim() ? "DRAFTED" : "OPEN"}</em></header>
        <div className="room-evidence"><b>案件内で使う証拠</b><p>{step.evidence}</p></div>
        <h4>{step.prompt}</h4>
        <div className="room-work">
          <textarea value={value} onChange={e => setAnswer(key, e.target.value)} placeholder="証拠 → 判断 → 反証／比較 → 次の行動条件まで書く…" />
          <aside><small>PARTNER-LEVEL MODEL</small><p>{step.model}</p></aside>
        </div>
      </section>;
    })}
    <section className="closed-loop">
      <small>THE OPERATING LOOP YOU JUST RAN</small>
      <div>{["Mandate", "Evidence", "Hypotheses", "Request", "Intervention", "Continue / Stop / Pivot"].map((x, i) => <span key={x}><b>{i + 1}</b>{x}</span>)}</div>
    </section>
    <NextButton label="自分の案件へ移植する" onClick={() => setTab("apply")} disabled={completed < 6} />
  </div>;
}

const dayTwoRoomSteps = [
  {
    key: "inherit", n: "01", label: "INPUT FROM DAY 1", title: "証拠収集をDecision Mandateへ接続する",
    prompt: "このEvidence Logが、誰のどの判断を変えるためのものか。Day 1の出力を使い、一文で固定してください。",
    evidence: "CFO／Growth Leadershipが、Enterprise成長投資をself-serve、sales-assisted、既存顧客拡張のどこへ配分するか。",
    model: "CFOとGrowth Leadershipが次四半期のEnterprise成長資金を、①self-serve獲得、②sales-assisted獲得、③既存顧客のseat expansionへどう配分するか判断するため、Zoomの成長要因に関する主張を検証可能な証拠へ分解する。",
  },
  {
    key: "classify", n: "02", label: "EVIDENCE LOG A", title: "主張を6つの意味へ分解する",
    prompt: "下の案件ファイルから最低6行を選び、観測・引用・計算・解釈・因果仮説・予測のどれかを付けてください。同じ文に二種類を混ぜないでください。",
    evidence: "FY2019 revenue $330.5m／net income $7.6m／VMware 19,000 users・41m meeting minutes／『frictionless』『viral growth』。",
    model: "観測：S-1記載のFY2019売上$330.5m。観測：VMware約19,000人が利用。計算：売上高純利益率は約2.3%。引用：会社はfrictionless experienceと表現。解釈：導入摩擦が低い。因果仮説：低摩擦体験が口コミを介して有料導入を増やした。予測：同じ機構なら紹介起点コホートは他流入よりfree→paid転換と継続率が高い。",
  },
  {
    key: "status", n: "03", label: "EVIDENCE LOG B", title: "確認済み・矛盾・未確認を別列で付ける",
    prompt: "各主張へconfirmed／contradicted／unverifiedを付け、何をもってその状態としたか出所を併記してください。",
    evidence: "Confirmedは資料が直接示す範囲だけ。Unverifiedは証拠不足。Contradictedは同じ対象・期間・定義の反対証拠がある場合だけ。",
    model: "Confirmed｜FY2019売上$330.5m｜Zoom S-1 audited financials。Confirmed｜VMwareの利用規模｜S-1 customer example。Unverified｜VMwareが『簡単だから』購入した｜購入理由データなし。Unverified｜viralが全社成長の主因｜流入源別転換・CACなし。Contradictedは現資料ではなし。反対仮説があるだけで矛盾扱いしない。",
  },
  {
    key: "scope", n: "04", label: "GENERALIZATION CONTROL", title: "一社事例が言える範囲を切る",
    prompt: "VMware事例から言えること／言えないこと／他社へ移すために必要な条件を分けてください。",
    evidence: "一社の大規模利用はexistence proof。市場での発生率、購入理由、収益性、再現性は別証拠が必要。",
    model: "言える：大企業一社で19,000人規模・41m分超の利用が実現した。言えない：全Enterprise顧客が同じ理由で購入する、利用量が高収益・高継続を生む、sales-assistedなしで拡張した。移す条件：同規模企業の複数コホートで、導入経路、seat expansion、継続率、support cost、契約単価を比較する。",
  },
  {
    key: "request", n: "05", label: "CLIENT REQUEST", title: "未確認仮説を識別する社内資料を要求する",
    prompt: "保有部署／役職、正式な資料名、必要列、期間・粒度、比較軸、期限を含む依頼文を書いてください。",
    evidence: "RevOps: Acquisition & Conversion Cohort／Product Analytics: Activation & Referral Events／Finance: CAC & Gross Margin Bridge／Sales Ops: Enterprise Expansion Report。",
    model: "RevOps責任者へAcquisition & Conversion Cohortを5営業日以内に依頼。FY2018–19の月次cohort×source×self-serve/sales-assistedでsignup、hosted meeting、invite、free→paid、days-to-paid、seat count、ARR、90/180日継続を含める。FinanceへCAC & Gross Margin Bridge、Sales OpsへEnterprise Expansion Reportを同一customer IDで結合可能な形式で求め、紹介起点と非紹介起点を比較する。",
  },
  {
    key: "memo", n: "06", label: "PARTNER SYNTHESIS", title: "分かること・未確認・次の一手を返す",
    prompt: "CFO向けに、現時点で分かること、まだ言えないこと、次に取る証拠、Day 3で評価する論点を200〜300字でまとめてください。",
    evidence: "Day 2の出口は原因断定ではない。経営判断に必要な未確認主張と、次の証拠取得順を明確にする。",
    model: "FY2019の売上$330.5m・純利益$7.6mと、VMwareでの大規模利用は確認できる。一方、低摩擦体験やviralが有料成長の主因であること、同様の拡張が顧客全体で再現することは未確認である。まず流入源別cohort、free→paid、seat expansion、CAC、180日継続を結合し、紹介起点とsales-assistedを比較する。Day 3ではS-1、会社事例、社内ログそれぞれの母集団・測定方法・作成者の利害を評価し、投資判断に使う重みを決める。",
  },
];

function DayTwoCaseRoom({ state, setAnswer, setTab }: { state: CourseState; setAnswer: (k: string, v: string) => void; setTab: (s: string) => void }) {
  const completed = dayTwoRoomSteps.filter(step => (state.answers[`d2-room-${step.key}`] || "").trim()).length;
  const inherited = state.answers["d1-room-mandate"] || "Day 1未入力の場合は、上記のZoom用Decision Mandateを仮入力として使用する。";
  return <div className="content-flow case-room">
    <section className="room-command">
      <div><small>LIVE ENGAGEMENT · CASE 002</small><h2>Zoom FY2019｜成長事実か、成長物語か</h2><p>Day 1の診断指示書を入口に、公開資料・顧客事例・経営者の説明を、原因断定前のEvidence Logへ変換します。</p></div>
      <div className="room-status"><b>{completed}<span>/6</span></b><small>WORKPAPERS</small></div>
    </section>
    <section className="stakeholder-tension">
      <small>INHERITED DECISION MANDATE · 前日の成果物を使う</small>
      <div><p><b>Decision</b>{inherited}</p></div>
    </section>
    <section className="data-room">
      <header><div><small>SIMULATED DATA ROOM</small><h3>案件ファイル｜何が書いてあり、何は書いていないか</h3></div><span>5 FILES · 3 CLAIM TYPES</span></header>
      <div className="file-grid">
        {[
          ["01", "FY2019 Form S-1", "IR / Finance", "audited statements", "売上・利益は確認可能。成長原因は直接証明しない"],
          ["02", "VMware Customer Example", "Company-authored", "19k users / 41m min", "一社の利用規模。市場全体へ一般化不可"],
          ["03", "CEO Growth Narrative", "Management interview", "frictionless / viral", "経営者の解釈と因果仮説"],
          ["04", "Acquisition Cohort", "RevOps · REQUEST", "source × cohort", "流入→有料化→継続を識別"],
          ["05", "Enterprise Expansion", "Sales Ops · REQUEST", "account × month", "seat拡張と営業介入を識別"],
        ].map(file => <article key={file[0]}><span>{file[0]}</span><div><b>{file[1]}</b><small>{file[2]} · {file[3]}</small><p>{file[4]}</p></div></article>)}
      </div>
    </section>
    <section className="stakeholder-tension">
      <small>CASE TENSION · 4人の発言を事実欄へ入れない</small>
      <div><p><b>CEO</b>「viral growthが勝因だ」</p><p><b>Sales</b>「大企業は営業が取った」</p><p><b>Product</b>「使いやすさが拡張を生んだ」</p><p><b>CFO</b>「どこへ追加投資すべきか数字で示してほしい」</p></div>
    </section>
    {dayTwoRoomSteps.map(step => {
      const key = `d2-room-${step.key}`;
      const value = state.answers[key] || "";
      return <section className="room-step" key={step.key}>
        <header><span>{step.n}</span><div><small>{step.label}</small><h3>{step.title}</h3></div><em>{value.trim() ? "DRAFTED" : "OPEN"}</em></header>
        <div className="room-evidence"><b>この判断に使う材料</b><p>{step.evidence}</p></div>
        <h4>{step.prompt}</h4>
        <div className="room-work">
          <textarea value={value} onChange={e => setAnswer(key, e.target.value)} placeholder="意味分類 → 証拠状態 → 出所 → 適用範囲 → 次証拠の順で書く…" />
          <aside><small>PARTNER-LEVEL MODEL</small><p>{step.model}</p></aside>
        </div>
      </section>;
    })}
    <section className="closed-loop">
      <small>DAY 2 OPERATING LOOP</small>
      <div>{["Mandate", "Meaning", "Status", "Scope", "Next evidence", "Synthesis"].map((x, i) => <span key={x}><b>{i + 1}</b>{x}</span>)}</div>
    </section>
    <NextButton label="自分の案件へ移植する" onClick={() => setTab("apply")} disabled={completed < 6} />
  </div>;
}

function Practice({ day, state, setAnswer, setTab }: { day: Day; state: CourseState; setAnswer: (k: string, v: string) => void; setTab: (s: string) => void }) {
  return <div className="content-flow">
    <SectionHead index="G" eyebrow="USE CASE → SAMPLE → PATTERN" title="実例と模範を先にインストールする。" text="一から正解を発明しません。ケース、プロの答え、転用できる型を同じ画面で読み、自分の言葉で一度だけ再現します。" />
    <section className="practice-case-anchor">
      <div><small>CASE INPUT · 今日の全設問で使う実例</small><h3>{day.case.name}</h3><p>{day.case.scene}</p></div>
      <div className="practice-facts">{day.case.facts.map((fact, i) => <span key={fact}><b>FACT {i + 1}</b>{fact}</span>)}</div>
    </section>
    {day.drills.map((drill, i) => {
      const key = `d${day.day}-q${i}`;
      return <section className="drill-card" key={key}>
        <div className="drill-top"><span>USE CASE {i + 1} / {day.drills.length}</span><small>{i === 0 ? "OBSERVE" : i === 1 ? "DIAGNOSE" : "DECIDE"}</small></div>
        <h3>{drill.prompt}</h3>
        <div className="drill-guidance"><p><b>この設問で見るもの</b>{drill.hint}</p><p className="avoid"><b>混ぜないもの</b>{drill.avoid}</p></div>
        <div className="practice-pair">
          <div className="learner-side"><div className="pair-label"><span>01</span><b>型を写す</b><small>模範を読んでから、同じ判断を自分の言葉で1〜3文</small></div><textarea value={state.answers[key] || ""} onChange={e => setAnswer(key, e.target.value)} placeholder="右の模範を参考に、判断の型を一度だけ再現する…" /></div>
          <div className="model-answer"><div className="model-label"><Icon name="spark" size={17} /> 02 · プロの模範解答</div><p>{drill.model}</p><div className="model-notes"><span><b>なぜ良い？</b>{drill.why}</span><span><b>失敗パターン</b>{drill.mistake}</span></div><div className="revise-line"><b>別案件へ転用する型</b>：{drill.hint}を確認し、「観測できる根拠 → 判断 → 次に変わる条件」の順で書く。</div></div>
        </div>
      </section>;
    })}
    <section className="independent-card">
      <div className="independent-head"><span>H</span><div><small>ANOTHER INDUSTRY · 別業界サンプル</small><h3>{day.independent.name}</h3></div></div>
      <p className="scene">{day.independent.scene}</p>
      <h4>{day.independent.prompt}</h4>
      <div className="independent-pair">
        <div><div className="pair-label light"><span>01</span><b>10秒で型を当てる</b><small>長考せず、上の3例と同じ順番で書く</small></div><textarea value={state.answers[`d${day.day}-ind`] || ""} onChange={e => setAnswer(`d${day.day}-ind`, e.target.value)} placeholder="1〜3文で型を移植する…" /></div>
        <div className="ind-model"><b>02 · 模範の筋道</b><p>{day.independent.model}</p><small>読んだら、自分の答案に不足している判断を一つだけ追記する。</small></div>
      </div>
    </section>
    <NextButton label="自分の案件へ一つ移植する" onClick={() => setTab("apply")} />
  </div>;
}

function Apply({ day, state, setAnswer, setTab }: { day: Day; state: CourseState; setAnswer: (k: string, v: string) => void; setTab: (s: string) => void }) {
  const key = `d${day.day}-transfer`;
  const transferModels = day.day === 2 ? dayTwoRoomSteps.slice(1, 6).map(step => step.model) : day.drills.map(drill => drill.model);
  return <div className="content-flow">
    <SectionHead index="I" eyebrow="TRANSFER PRACTICE" title="今日は、この能力だけを自分の案件へ。" text="大きな診断書を毎日完成させません。今日つくった部品を、統合ファイルへ一つ追加します。" />
    <section className="transfer-card">
      <div className="transfer-badge"><Icon name="case" /> YOUR REAL CASE</div>
      <h2>{day.transfer}</h2>
      <p>実名や機密情報は避け、判断に必要な文脈だけを書いてください。</p>
      <div className="transfer-pair">
        <textarea value={state.answers[key] || ""} onChange={e => setAnswer(key, e.target.value)} placeholder="左で学んだ型を、自分の実案件へ置き換える…" />
        <div className="transfer-model"><small>書き方の見本 · 今日のケースなら</small><h3>{day.case.name}</h3>{transferModels.map((model, i) => <p key={model}><b>{i + 1}</b>{model}</p>)}</div>
      </div>
      <div className="save-note"><Icon name="portfolio" /><span>保存先</span><strong>{day.output}</strong><em>入力内容はこのブラウザに自動保存されます。</em></div>
    </section>
    <section className="tomorrow-card"><small>L · WHY TOMORROW?</small><p>{day.next}</p></section>
    <NextButton label="判断品質を採点する" onClick={() => setTab("pass")} disabled={!(state.answers[key] || "").trim()} />
  </div>;
}

function Pass({ day, state, toggleCheck, score, completeDay }: { day: Day; state: CourseState; toggleCheck: (k: string) => void; score: number; completeDay: () => void }) {
  if (day.day === 1) {
    const assessment = assessDayOne(state);
    const dimensions = [
      ["Evidence", "10-Kの製品・Subscription・会員・在庫を数値で比較", 15],
      ["Causality", "3つ以上の競合仮説に支持／棄却条件がある", 15],
      ["Data Request", "保有部署・資料名・列・粒度・期限がある", 15],
      ["Commerciality", "売上だけでなくCAC・LTV・粗利・在庫キャッシュへ接続", 15],
      ["Experiment", "介入群／比較群、先行・遅行KPI、ガードレールがある", 15],
      ["Decision", "継続・中止・Pivotを数値閾値で先に固定", 15],
    ];
    return <div className="content-flow">
      <SectionHead index="J" eyebrow="SUBSTANTIVE ASSESSMENT" title="入力有無ではなく、案件を動かせる品質で採点する。" text="各15点は答案内の具体要件を満たした時だけ加点し、全6項目を満たした場合のみ統合力10点が加わります。" />
      <section className="assessment quality-assessment">
        <div className="score-ring" style={{ "--score": `${score * 3.6}deg` } as React.CSSProperties}><div><b>{score}</b><span>/ 100</span><small>{score >= 75 ? "PASS READY" : "REVISION REQUIRED"}</small></div></div>
        <div className="quality-grid">{dimensions.map(([name, desc, points], i) => <div className={assessment.criteria[i] ? "met" : ""} key={String(name)}><span>{assessment.criteria[i] ? "✓" : String(i + 1).padStart(2, "0")}</span><p><b>{name}</b>{desc}</p><em>{points} pts</em></div>)}</div>
      </section>
      <section className="decision-gate"><small>PASS GATE</small><h3>75点だけでは足りません。</h3><p>Evidence・Causality・Experiment・Decisionのいずれかが欠ける答案は、合計点に関係なく実務投入不可。案件ルームへ戻り、欠けた判断を本文に追記してください。</p></section>
      <button className="complete-button" disabled={score < 90} onClick={completeDay}>{score >= 90 ? <><Icon name="check" /> Day 1を完了して次へ</> : <>案件ルームへ戻り、あと {90 - score} 点を実質修正する</>}</button>
    </div>;
  }
  if (day.day === 2) {
    const assessment = assessDayTwo(state);
    const dimensions = [
      ["Decision Link", "Day 1の経営判断とEvidence Logの用途が接続", 15],
      ["Semantic Separation", "観測・引用・計算・解釈・仮説・予測を分離", 15],
      ["Evidence State", "confirmed／contradicted／unverifiedと出所を記録", 15],
      ["Scope Control", "一社事例の適用範囲と一般化限界を明示", 15],
      ["Next Evidence", "部署・資料名・列・粒度・期限まで指定", 15],
      ["Partner Synthesis", "分かる／未確認／次証拠／Day 3への引継ぎを統合", 15],
    ];
    return <div className="content-flow">
      <SectionHead index="J" eyebrow="SUBSTANTIVE ASSESSMENT" title="分類数ではなく、誤診を止める証拠設計で採点する。" text="原因を当てたかではなく、確認済みの範囲、未確認の推論、一般化限界、次に取る識別証拠が答案内に存在するかを判定します。" />
      <section className="assessment quality-assessment">
        <div className="score-ring" style={{ "--score": `${score * 3.6}deg` } as React.CSSProperties}><div><b>{score}</b><span>/ 100</span><small>{score >= 90 ? "PASS READY" : "REVISION REQUIRED"}</small></div></div>
        <div className="quality-grid">{dimensions.map(([name, desc, points], i) => <div className={assessment.criteria[i] ? "met" : ""} key={String(name)}><span>{assessment.criteria[i] ? "✓" : String(i + 1).padStart(2, "0")}</span><p><b>{name}</b>{desc}</p><em>{points} pts</em></div>)}</div>
      </section>
      <section className="decision-gate"><small>PASS GATE</small><h3>事実と解釈を分けただけでは未完成です。</h3><p>Decision Link・Evidence State・Scope Control・Next Evidenceのどれかが欠ける場合、合計点に関係なくDay 3へ進めません。原因帰属や責任判断は書き足さず、証拠の境界と次の取得指示を修正してください。</p></section>
      <button className="complete-button" disabled={score < 90} onClick={completeDay}>{score >= 90 ? <><Icon name="check" /> Day 2を完了して次へ</> : <>案件ルームへ戻り、あと {90 - score} 点を実質修正する</>}</button>
    </div>;
  }
  const checks = [
    ["最低合格", day.rubric.pass],
    ["標準レベル", day.rubric.standard],
    ["プロレベル", day.rubric.pro],
    ["修正できた", day.rubric.revise],
  ];
  return <div className="content-flow">
    <SectionHead index="J" eyebrow="JUDGMENT QUALITY" title="文章量ではなく、判断品質で合格する。" text="自己採点は『できた気がする』ではなく、実際の答案にその要素が見える場合だけチェックします。" />
    <section className="assessment">
      <div className="score-ring" style={{ "--score": `${score * 3.6}deg` } as React.CSSProperties}><div><b>{score}</b><span>/ 100</span><small>{score >= 75 ? "PASS READY" : "KEEP REVISING"}</small></div></div>
      <div className="check-list">
        {checks.map((item, i) => <label key={item[0]} className={state.checks[`d${day.day}-c${i}`] ? "checked" : ""}>
          <input type="checkbox" checked={!!state.checks[`d${day.day}-c${i}`]} onChange={() => toggleCheck(`d${day.day}-c${i}`)} />
          <span className="fake-check">{state.checks[`d${day.day}-c${i}`] && <Icon name="check" size={15} />}</span>
          <span><b>{item[0]}</b><p>{item[1]}</p></span>
        </label>)}
      </div>
    </section>
    <section className="integration-card">
      <div><small>K · ENGINE INTEGRATION</small><h3>{day.output}</h3><p>今日の回答はPortfolioへ統合され、次のDayの入力として使います。</p></div>
      <Icon name="engine" size={36} />
    </section>
    <button className="complete-button" disabled={score < 75} onClick={completeDay}>
      {score >= 75 ? <><Icon name="check" /> Day {day.day} を完了して次へ</> : <>あと {75 - score} 点：回答と自己修正を追加する</>}
    </button>
  </div>;
}

function Portfolio({ state, openDay, exportPortfolio }: { state: CourseState; openDay: (n: number) => void; exportPortfolio: () => void }) {
  return <div className="page">
    <PageTitle eyebrow="YOUR COMMERCIAL IP" title="Commercial Psychology Portfolio" text="毎日の小さな判断が、一つの診断・提案・実行システムへ累積します。回答はMarkdownで手元へ書き出せます。" />
    <section className="portfolio-hero">
      <div><small>PORTFOLIO v1</small><h2>{state.completed.length}<span>/30</span></h2><p>実務成果物 完成</p></div>
      <div className="portfolio-copy"><h3>{state.completed.length === 30 ? "未知案件を一人で運転できる状態です。" : "次の成果物を完成させよう。"}</h3><p>暗記した理論ではなく、あなたが実際に書き、比較し、修正した判断の記録です。</p></div>
      <AppButton onClick={exportPortfolio} variant="soft"><Icon name="download" size={17} /> Markdownを出力</AppButton>
    </section>
    <div className="portfolio-list">
      {days.map(day => {
        const done = state.completed.includes(day.day);
        return <button key={day.day} className={done ? "done" : ""} onClick={() => openDay(day.day)}>
          <span className="portfolio-day">{done ? <Icon name="check" size={16} /> : day.day}</span>
          <span><small>DAY {day.day} · STAGE {day.stage}</small><strong>{day.output}</strong><p>{day.title}</p></span>
          <span className="portfolio-status">{done ? "COMPLETED" : "NOT YET"} <Icon name="arrow" size={15} /></span>
        </button>;
      })}
    </div>
  </div>;
}

function PageTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <header className="page-title"><small>{eyebrow}</small><h1>{title}</h1><p>{text}</p></header>;
}

function SectionHead({ index, eyebrow, title, text }: { index: string; eyebrow: string; title: string; text: string }) {
  return <header className="section-head"><span>{index}</span><div><small>{eyebrow}</small><h2>{title}</h2><p>{text}</p></div></header>;
}

function NextButton({ label, onClick, disabled = false }: { label: string; onClick: () => void; disabled?: boolean }) {
  return <button className="next-section" onClick={onClick} disabled={disabled}><span>{label}</span><Icon name="arrow" /></button>;
}
