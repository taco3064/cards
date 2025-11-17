import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Deck from '~app/containers/Deck';
import CardBackImg from '~app/assets/imgs/poker-pattern.png';

/**
 * TODO: 關於洗牌動畫
 * 1. 洗牌時避免重複點擊
 * 2. 建立 /component/Card
 *   - Card 可透過 props.className 傳入額外 class，方便後續注入動畫效果
 *     - Front: 卡牌內容，使用 CSS transform rotateY(180deg) 實現背面效果
 *     - Back: 卡牌背面，CSS background image 需統一
 *   - props
 *     - id: 卡牌 id
 *     - backImg: 卡牌背面圖片
 *     - onClick: 點擊事件
 * 3. /containers/Deck
 *   - 管理卡牌堆疊邏輯，包含洗牌動畫、扇形展開、選取 Highlight 等功能
 *   - 關於洗牌動畫，使用 CSS transform rotate3d(1, 1, -1, 60deg) 實現蓋牌及 45 度視角效果
 *     - Overhand Shuffle
 *       - 透過各張卡牌的 CSS transform translateZ 達到牌堆堆疊的效果
 *       - pinched (捏住的部分): 使用 CSS transform translateZ 達到下移效果
 *       - remaining (剩餘的部分): 使用 CSS transform translateY(抽出) -> translateZ(上移) -> translateY(蓋回) 的效果
 *     - Riffle Shuffle (還沒想好)
 */

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Deck
      cardOptions={{
        backImg: CardBackImg,
        size: { width: 180, height: 260 },
        total: 52,
        generateMeta: (index) => ({ id: index }),
      }}
    />
  </StrictMode>,
);
