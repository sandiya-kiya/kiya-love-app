import React, { useMemo, useState } from 'react';
import HeartCatchGame from './HeartCatchGame';
import MemoriesGallery from './MemoriesGallery';
import ProposalPage from './ProposalPage';

export default function LovePage() {
  const [showLoveNote, setShowLoveNote] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');
  const [showNextHeart, setShowNextHeart] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [showMemories, setShowMemories] = useState(false);
  const [showProposal, setShowProposal] = useState(false);

  const hearts = useMemo(
    () =>
      Array.from({ length: 40 }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`, // 0–100%
        duration: `${8 + Math.random() * 6}s`, // 8s–14s
        delay: `${Math.random() * 3}s`, // 0–3s so they appear quickly
      })),
    []
  );

  const bigHearts = useMemo(
    () =>
      Array.from({ length: 4 }, (_, index) => ({
        id: index,
        left: `${10 + Math.random() * 80}%`,
        delay: `${Math.random() * 6}s`,
      })),
    []
  );

  const sparkles = useMemo(
    () =>
      Array.from({ length: 25 }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 3}s`,
      })),
    []
  );

  const handleLoveNote = () => {
    setInfoMessage('');
    setShowLoveNote(true);
  };

  const handleLoveGame = () => {
    setShowLoveNote(false);
    setShowGame(true);
  };

  const handleMemories = () => {
    setShowLoveNote(false);
    setShowMemories(true);
  };

  const closeModal = () => {
    setShowLoveNote(false);
  };

  return (
    <div className="love-page">
      <div className="love-background-glow" />
      <div className="love-vignette" />
      <div className="love-background-hearts" />

      <div className="love-big-hearts">
        {bigHearts.map((heart) => (
          <div
            key={heart.id}
            className="big-floating-heart"
            style={{
              left: heart.left,
              animationDelay: heart.delay,
            }}
          >
            ♥
          </div>
        ))}
      </div>

      <div className="love-hearts-layer">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="heart"
            style={{
              left: heart.left,
              width: '18px',
              height: '18px',
              animationDelay: heart.delay,
              animationDuration: heart.duration,
            }}
          />
        ))}
      </div>

      <div className="love-sparkles-layer">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="sparkle"
            style={{
              left: sparkle.left,
              top: sparkle.top,
              animationDelay: sparkle.delay,
            }}
          />
        ))}
      </div>

      <div className="love-content">
        <h1 className="love-heading">love you kunju ❤️</h1>

        <div className="love-buttons">
          <button className="love-card love-button" onClick={handleLoveNote}>
            LOVE NOTE
          </button>
          <button className="love-card love-button" onClick={handleLoveGame}>
            LOVE GAME
          </button>
          <button className="love-card love-button" onClick={handleMemories}>
            MEMORIES
          </button>
        </div>

        <button
          className="final-surprise-btn"
          onClick={() => setShowProposal(true)}
        >
          💖 Final Surprise
        </button>

        {infoMessage && !showLoveNote && (
          <div className="love-info">{infoMessage}</div>
        )}

        {showLoveNote && (
          <div className="love-modal-overlay" onClick={closeModal}>
            <div className="love-note-modal" onClick={e => e.stopPropagation()}>
              <h2>For You</h2>
              <div
                className="love-message-container"
                onScroll={e => {
                  const element = e.target;
                  if (
                    element.scrollTop + element.clientHeight >=
                    element.scrollHeight - 5
                  ) {
                    setShowNextHeart(true);
                  }
                }}
              >
                <p className="love-message">Hey thangameyyyy 😚💋<br/>
Enna chello unnaku idhu pudichurukum nu namburen enna da iva onu pesi tholla pannura illana text padika solli tholla pannura nu nenaikadha ma 😂<br/>
Konjo neram tha padichutu pollam unnaku oru game kuda iruku viladalam seriya 🫂</p>
                <p className="love-message">Sari thango coming to the point na neriya peoples life la meet panniten ma but unna maari oru gem 💎 na pakkala. Seriously I am in love with you. Romba neriya 1st time unnaku na okay sollalana unna kandipa miss panni aludhurupen. Thank God la ne ennaku kedachadhuku.</p>
                <p className="love-message">Ne ennakaga evalovo pannita ma. Enna care panni love pannura varaikum unna adichuka aalu illa 🥰👑💗<br/>
Na ennoda last breath varaikum unnaku loyal ah irupen ma. Adhalam unnakey theriyum nu solluriya? Sari vidu 😅</p>
                <p className="love-message">Apro ne romba nalla paiyan ma thango 🥰<br/>
Na evalo psycho pithi vella pannalum ne enkuda iruka 🥹🤍<br/>
Love you so much for that.</p>
                <p className="love-message">Apro nama indha 5 years ellamey therijukitom namala pathi and neriya change airukom nama future kaga. Ipadi nu neriya sollalam ma. Na unnaku thank you sollanum nu thonuchu ma thango 😚<br/>
Summa sonna epadi adha chinnadha oru web app create panna 🤭</p>
                <p className="love-message">Apro ennaku unna romba pudikum ma ana na neriya unna kasta paduthuren ennakey theriyum. Kai, thalla nu paavo ne avalo pressure handle pannura. Na adhukellam romba feel panni alugala senjuruken but unkita katala. Ini apadi pannama iruka try panu ma 🫂</p>
                <p className="love-message">Apro inu onu ma ne bayapadura maari ennaku onu agadhu ma. Na nalla irupen safe ah unkudavey last varaikum. Apadiye edho onu analum ne odanjuradha ma 🫂</p>
                <p className="love-message">Ellamey face pannanum. Na illa so ne iruka matten la sollitu irukala adhalam venda ma. Purincha samatha nalla papa va iru. Nanum irupen. Rendu perum jolly ah irupom 💗😌</p>
                <p className="love-message">Engha daddy bayapatu anaiku na sethuruven nu sollumbodhey manasey illa tha. But apadi la onu agadhu nu pray pannikalam ma. Murugan irukaru.</p>
                <p className="love-message">Apro unna ennaku romba istam. Safe ah iru ma. Apro enna romba alaga love pannura ma ne 🥰💋💋💋</p>
                <p className="love-message">Love you love you so much ma buluku kunjaaannnn 💋💋🥰🥰🤍💗💋💋🥰</p>
                <p className="love-message">Na idhu varaikum hurt pannadhalam manasula vachukadha ma. Manichuru 💋🥰</p>
                <p className="love-message">Sari di patu… va. Next “LOVE GAME” nu button irukum. Press pannu di patu. Idha close pannitu 😍😚😚💋</p>
              </div>
              {showNextHeart && (
                <div className="next-heart-container">
                  <div className="big-heart"></div>
                  <p className="next-text">Now press LOVE GAME 💖</p>
                </div>
              )}
              <button className="love-close" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        )}

        {showGame && (
          <HeartCatchGame onClose={() => setShowGame(false)} />
        )}

        {showMemories && (
          <MemoriesGallery onClose={() => setShowMemories(false)} />
        )}

        {showProposal && (
          <ProposalPage onClose={() => setShowProposal(false)} />
        )}
      </div>
    </div>
  );
}

