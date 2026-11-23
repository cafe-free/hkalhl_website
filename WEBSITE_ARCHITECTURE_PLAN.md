# 香港愛馬女士協會 (HKALHL) 官方靜態網站架構規劃書
> **架構參考基準：** [東方助人基金 (EVF)](https://evf.hk/)  
> **數據來源：** `facebook_data.json`
> **制定日期：** 2026年3月  

---

## 一、 規劃背景與目標

香港愛馬女士協會（Hong Kong Association of Lady Horse Lovers，簡稱 HKALHL）自2017年創會以來，積極凝聚女性馬主及愛馬人士的力量，透過舉辦大型「專科義診醫療日」、「醫診到會」社區篩查、長者關懷音樂節、福袋派發及慈善籌款盛事服務香港基層社群。

為了提升協會的公信力、服務透明度並方便市民、長者及合作伙伴瀏覽資訊，本規劃以香港知名慈善機構 **《東方助人基金》(evf.hk)** 的成熟資訊架構（Information Architecture, IA）為藍本，為協會構建一個高雅大氣、結構嚴謹、長者友善且易於維護的現代化靜態網站。

---

## 二、 參考基準：evf.hk 資訊架構剖析

經實際檢視，`evf.hk` 作為香港註冊慈善機構及社署認可服務機構，其架構具備以下優秀特點：

1. **清晰的頂部導航階層 (Clear Navigation Hierarchy)：**
   - `首頁 (Home)`
   - `關於我們 (About Us)`：本會簡介、發展里程、架構成員、聯絡我們
   - `服務 (Services)`：核心服務板塊、樂齡科技/醫療項目
   - `專欄 (Blogs)`：最新動向、健康生活與政策宣傳
   - `活動回顧 (Gallery)`：歷史活動圖文歸檔
   - `加入我們 (Join Us)`：會員登記、義工招募
   - `即時查詢 (CTA Button)`：高可見度的聯絡/WhatsApp按鈕
2. **首頁「資訊模組化」導流結構 (Modular Homepage Layout)：**
   - 頂部 Hero 幻燈片 + 宗旨標語 + 核心行動按鈕（CTA）
   - 機構背景與認可資格摘要
   - 核心服務卡片矩陣（3-4 個重點板塊）
   - 服務成果數據統計（數字亮點）
   - 最新消息 / 專欄動態（卡片列表）
   - 活動回顧輪播 / 精選圖集
   - 加入我們 / 義工召集行動區
3. **底部全局頁尾 (Comprehensive Global Footer)：**
   - 機構全名、慈善牌照/註冊資料、快速導航連結、官方聯絡方式（電郵、辦公時間、版權宣告）。

---

## 三、 HKALHL 網站架構映射方案 (Site Architecture Mapping)

將 `facebook_data.json` 中萃取的 HKALHL 核心內容完全映射至 `evf.hk` 架構：

| evf.hk 原生架構 | HKALHL 映射規劃 | 數據來源 / 核心內容 (`facebook_data.json`) |
| :--- | :--- | :--- |
| **首頁 (`/`)** | **首頁 (`/`)** | 協會形象 Banner、宗旨標語、核心服務、成果數據、精選貼文與花絮 |
| **關於我們 (`/about`)** | **關於本會 (`/about`)** | |
| ├ 本會簡介 | ├ 協會宗旨與願景 | 創會初衷（凝聚愛馬女士力量，推動慈善與社區健康） |
| ├ 發展里程 | ├ 發展里程碑 | 2017年創會典禮 ➔ 2018年慈善服裝展 ➔ 2024-2026年專科義診到會深化 |
| ├ 主要架構成員 | ├ 總理團隊與架構 | 主席葉思貝 (Fione Yip)、歷任總理團隊、各界醫護與政商友好嘉賓名錄 |
| └ 聯絡我們 | └ 聯絡資訊 | 官方電郵 (`ka20180801@gmail.com`)、Facebook 專頁導流、查詢表單 |
| **服務 (`/services`)** | **核心服務與項目 (`/services`)** | |
| ├ 認可服務 / 核心計劃 | ├ 「專科義診」與「醫診到會」 | 跨科別義診（眼科、牙科、AI中醫體質評估、AI眼底、心血管篩查、骨科、脊醫等） |
| └ 科技輔助生活 (Gerontech) | └ 「情暖銀齡」長者關懷 | 耆樂仲夏音樂節、節慶福袋派發、家庭全家福攝影等 |
| **專欄 (`/blogs`)** | **最新動向與專欄 (`/news` 或 `/blogs`)** | 協會動態、各區義診通告、健康衛生科普、跨機構合作報導 |
| **活動回顧 (`/gallery`)** | **活動花絮與相簿 (`/gallery`)** | 21+ 則 Facebook 歷史活動記錄、4 大歷史相簿（創會、服裝展、探訪等） |
| **加入我們 (`/join`)** | **支持與參與 (`/join`)** | |
| ├ 登記會員 | ├ 成為會員 | 歡迎馬主、愛馬人士及公眾申請加入協會大家庭 |
| └ 成為義工 | └ 成為義工 | 招募義診現場接待、物資派送、長者關懷探訪義工 |
| **查詢 (CTA)** | **即時查詢 / 聯絡我們** | 頂部與懸浮聯絡按鈕（電郵 / Facebook Messenger / 表單） |

---

## 四、 頁面細部結構規劃規格 (Page Specifications)

### 1. 全局共用元件 (Global Layout Components)

- **頂部導航欄 (Sticky Header / Navigation):**
  - **左側：** 協會官方 Logo + 協會中文名（香港愛馬女士協會）與英文全銜（HKALHL）。
  - **中間主選單：**
    - 首頁
    - 關於本會（下拉：協會簡介、發展里程、組織架構）
    - 核心項目（下拉：專科義診到會、情暖銀齡長者關懷、慈善籌款盛事）
    - 最新動向
    - 活動回顧
    - 支持與參與（下拉：登記會員、加入義工）
  - **右側 CTA 按鈕：** 「聯絡我們」或「即時查詢」。
  - **手機版：** 響應式漢堡選單 (Hamburger Drawer)。

- **底部頁尾 (Footer):**
  - **欄位 1：** 協會品牌、簡介、官方願景。
  - **欄位 2（快速連結）：** 首頁、關於本會、最新動向、活動回顧。
  - **欄位 3（服務項目）：** 專科義診醫療日、醫診到會、情暖銀齡、慈善盛事。
  - **欄位 4（聯絡我們）：** 官方電郵、Facebook 官方專頁按鈕、服務諮詢。
  - **底線版權：** `Copyright © 2017-2026 Hong Kong Association of Lady Horse Lovers (HKALHL). All Rights Reserved.`

---

### 2. 首頁 (Homepage: `/index.html`)

- **Hero 輪播橫額 (Hero Section):**
  - 背景：高解析度活動大圖（例如音樂節大合照、義診現場、慈善晚宴）。
  - 主標題：**凝聚愛馬巾幗力量 · 關懷社群傳遞愛心**
  - 副標題：*To promote and mobilize the power of lady horse owners and horse lovers to serve the community and those in need.*
  - 雙按鈕 CTA：`「了解本會」` (跳轉 `/about`)、`「最新活動」` (跳轉 `/gallery`)。

- **關於協會簡介塊 (About Teaser):**
  - 簡短扼要介紹 HKALHL 的非牟利理念與立會初心。
  - 特色標籤：`創立於2017年` | `凝聚女性馬主` | `推動基層健康` | `跨界慈善合作`。

- **核心服務板塊 (Core Services - 3 Cards Grid):**
  - **卡片 1：專科義診醫療日與「醫診到會」**
    - 說明：直達全港各區社區會堂，提供14+專科義診、AI中醫體質評估、AI眼底篩查、心血管檢測等「早預防、早治療」健康服務。
  - **卡片 2：「情暖銀齡」長者關懷行動**
    - 說明：跨區派發實用食糧福袋與新鮮麵包、舉辦夏日社區音樂節、為長者提供家庭全家福即影即印服務。
  - **卡片 3：跨界慈善籌款與盛事**
    - 說明：聯手著名品牌及頂尖騎師伉儷舉辦大型慈善服裝展，善款全數捐助匡智會、基督教家庭服務中心及逸傑國際慈善基金會。

- **服務成果數據看板 (Impact by Numbers):**
  - 呈現專業與公信力的數字儀表板：
    - `1,130+` 單日專科義診名額
    - `54+` 跨科義務醫護專家團隊
    - `900+` 跨七區銀齡長者福袋
    - `7+` 全港服務覆蓋地區（九龍城、觀塘、灣仔、中西區、荃灣、深水埗、沙田等）

- **最新動向專欄 (Latest News / Articles):**
  - 精選 3 則最新發布的貼文摘要卡片（包含發布日期、地點、精彩封面圖及簡介）。
  - 右上方「查看全部動向 ➔」按鈕。

- **精選活動回顧 (Featured Gallery Carousel):**
  - 橫向滑動或瀑布流展示各區活動生動照片，點擊可開啟燈箱預覽。

- **加入我們號召區 (Join Us Callout Banner):**
  - 左右雙欄版面：
    - 左欄：**「成為會員」** — 歡迎愛馬人士加入，共同推動社會公益。
    - 右欄：**「成為義工」** — 參與前線醫療日或長者探訪，發揮助人精神。

---

### 3. 關於本會 (About Us: `/about/index.html` 或獨立子分頁)

- **本會簡介 (`/about/profile`):**
  - 創會宣言、使命 (Mission) 與願景 (Vision)。
  - 核心精神：將對馬匹的熱愛昇華為對社會弱勢群體的關愛。
- **發展里程碑 (`/about/milestones`):**
  - 垂直時間軸 (Timeline) 設計：
    - **2026年：** 啟德專科義診醫療日移師聖公會聖十架小學，引進自資 AI 眼底與心血管健康檢測，服務破千人次。
    - **2025年：** 「醫診到會」巡迴深耕灣仔、中西區及荃灣等社區；舉辦彩盈邨全家福攝影與樂華音樂節。
    - **2018年：** 攜手 LUXE Tuxedo 與世界級冠軍騎師伉儷舉辦「慈善服裝展」，籌得善款 HK$380,000。
    - **2017年：** 香港愛馬女士協會正式成立，舉辦創會典禮及首次社區長者探訪。
- **組織架構與嘉賓團隊 (`/about/committee`):**
  - 創會主席 / 現任主席致辭：葉思貝女士 (Fione Yip)。
  - 總理團隊與家屬義工介紹。
  - 主禮嘉賓與合作友好（高永文醫生、蔣志豪專員、馮浩賢副處長、立法會議員陳恒鑌、葉劉淑儀、陳家珮、梁思韻等）。

---

### 4. 服務與項目 (Services: `/services/index.html`)

- **專科義診醫療日與「醫診到會」計劃 (`/services/medical`):**
  - **計劃目的：** 消除長者跨區就醫障礙，貫徹「早發現、早治療」理念。
  - **醫療範疇：**
    - 專科諮詢：老人科、眼科、牙科、骨科、呼吸系統科、風濕科、疼痛科、脊骨神經科（脊醫）、乳腺外科等。
    - 創新科技篩查：AI 中醫體質評估、AI 眼底照相、心血管動脈硬化檢測、脂肪肝篩查、大腦認知能力評估。
  - **合作專業機構：** 老有所醫慈善基金會、尚至醫療集團、睛彩慈善基金、東方助人基金、苗康集團等。
- **「情暖銀齡」長者關懷服務 (`/services/elderly`):**
  - 節慶暖心福袋：派發營養米、淮山麵、新鮮出爐麵包。
  - 耆樂仲夏音樂節：邀請音樂學院專業導師及青年學員登台演出，為長者帶來歡樂暑期時光。
  - 「整妝待髮」長者及家庭攝影：贊助禮服與專業化妝造型，即印珍貴全家福。
- **跨界慈善籌款與社會倡導 (`/services/charity`):**
  - 體育與公益結合：歷年慈善時裝秀、騎師跨界演出、全額撥捐弱勢團體。

---

### 5. 最新動態 / 專欄 (News & Blog: `/news/index.html`)

- **數據驅動與活動日期優先原則 (Event Date Priority)：**
  - **重要調整：** 網站全面顯示**「活動實際舉行日期」(`eventDate`)**，而非「社交媒體貼文發布日期」(`postDate`)，忠實記錄每一場社區活動的歷史時間點。
  - 數據集已包含 `eventDateISO` (例如 `2025-11-01`)，支援 Astro 在構建期依真實活動時間進行精準的時間軸排序。
- 列表模式呈現 `facebook_image_posts.json` 中的 40 則完整歷史圖文紀錄。
- **篩選標籤 (Category Filter):**
  - `全部動向 (All)`
  - `專科義診 (Medical Days)`
  - `社區關懷 (Community Care)`
  - `重大盛事 (Milestones)`
- **單篇文章檢視 (Article Modal / Detail View):**
  - 包含活動標題、活動舉行日期 (`eventDate`)、活動地點 (`location`)、完整活動文案、合作夥伴名單、主禮嘉賓、活動相片畫廊。

---

### 6. 活動回顧相簿 (Gallery: `/gallery/index.html`)

- 參照 `evf.hk/gallery` 網格佈局：
  - **相簿集合 (Albums Overview):**
    - 創會典禮盛況 (Congratulations to the Establishment of HKALHL)
    - 慈善服裝展 (Charity Fashion Show w/ LUXE Tuxedo)
    - 啟德專科義診醫療日精彩瞬間
    - 耆樂仲夏音樂節
    - 七區長者福袋派發
  - **相片燈箱 (Lightbox Viewer):** 支持高解析度相片原圖放大、前後滑動、手機手勢滑動。

---

### 7. 支持與參與 (Join Us: `/join/index.html`)

- **成為會員 (Member Registration):**
  - 歡迎愛馬人士、女性馬主或熱心公益的市民填表加入。
  - 支援嵌入 Google Forms 或自建靜態表單提交。
- **成為義工 (Volunteer Registration):**
  - 義工服務範疇：活動接待、醫療日登記分流、物資打包派發、長者陪伴、攝影錄影等。

---

### 8. 聯絡我們 (Contact Us: `/about/contact.html`)

- 參照 `evf.hk/about/contact` 的簡約卡片佈局：
  - **聯絡資訊卡：**
    - 官方電郵：`ka20180801@gmail.com`
    - Facebook 專頁：`facebook.com/hkalhl.org`
    - 辦公/服務時間：週一至週五 09:30 - 18:00
  - **線上留言表單：** 姓名、聯絡電話、電郵、查詢主旨、留言內容。
  - **社交媒體連結：** Facebook 圖示按鈕直達。

---

## 五、 技術選型與圖片雲端託管方案 (Astro + Cloudflare R2)

為確保網站具備**極致速度**、**零伺服器維護負擔**、**永久穩定的相片 CDN** 與**零頻寬成本 (Zero Egress Fees)**，確立採用 **Astro 靜態網站架構** 結合 **Cloudflare R2 雲端儲存與邊緣 CDN**：

```
┌────────────────────────────────────────────────────────┐
│               Astro + Cloudflare 架構流程               │
├────────────────────────────────────────────────────────┤
│ 1. 圖片處理與託管：                                     │
│    Facebook 原始相片 ──(遷移腳本)──> Cloudflare R2 儲存桶│
│                                            │           │
│                                    Cloudflare CDN      │
│                                            │           │
│ 2. 靜態編譯與組裝：                         ▼           │
│    facebook_data.json  ─────────>  https://media.hkalhl.org/
│             │                                          │
│             ▼                                          │
│       Astro SSG 編譯器 (Tailwind CSS)                   │
│             │                                          │
│             ▼                                          │
│       純靜態 HTML/CSS/JS (零客戶端 JS 負擔)              │
│             │                                          │
│             ▼                                          │
│       Cloudflare Pages 全球邊緣託管                     │
└────────────────────────────────────────────────────────┘
```

### 1. 靜態網站生成器：Astro (確立採用)
- **選用理由：**
  - **原生 SSG 與 0-KB 預設 JavaScript：** Astro 採用「島嶼架構 (Islands Architecture)」，產出純靜態 HTML/CSS，加載速度極快，SEO 評分直達 100/100，長者於弱網或手機環境均可秒速載入。
  - **原生整合 JSON 數據源：** Astro 能夠在構建期（Build-time）直接導入 `facebook_data.json`，透過 `.astro` 組件輕鬆渲染最新動向、歷任活動相簿與組織成員名錄。
  - **樣式體系：** 深度整合 **Tailwind CSS**，便於快速建立響應式、無障礙的現代化排版。

### 2. 圖片雲端託管與 CDN：Cloudflare R2 (確立採用)
- **為甚麼不使用本地圖片（Git Repo）？**
  - 避免 Git 倉庫因大量活動原圖膨脹（Repo Bloat），保持代碼庫輕盈（數 MB），確保 CI/CD 構建速度在數秒內完成。
- **為甚麼必須轉移 Facebook CDN 圖片？**
  - Facebook 圖片連結帶有 `_nc_sid`、`oe` 等安全簽名 Token，**通常在數週或數月後即告過期失效**，導致網站圖片變成 `403 Forbidden`。
- **Cloudflare R2 核心優勢：**
  - **$0 流量輸出費用 (Zero Egress Fees)：** 即使活動照片有數萬次瀏覽或高解析度圖片展示，均毋須支付任何帶寬費用。
  - **免費額度充足：** 每月提供 10 GB 儲存空間與 1,000 萬次讀取請求，完全滿足協會長期運作需求。
  - **自訂網域與全球邊緣快取：** 可直接綁定自訂子網域（如 `media.hkalhl.org` 或 `images.hkalhl.org`），自帶免費 SSL 證書，並由 Cloudflare 全球 CDN 在香港本地節點提供邊緣加速（< 10ms 響應）。

### 3. R2 儲存結構與遷移自動化 (Image Pipeline)
- **R2 儲存桶結構劃分：**
  ```text
  hkalhl-media/
  ├── branding/              # 協會 Logo、Icon、Favicon
  ├── banners/               # 頂部 Hero 橫額、宣傳海報
  ├── albums/                # 歷史精選相簿
  │   ├── 2017-establishment/
  │   └── 2018-charity-fashion-show/
  └── events/                # 各期活動圖輯
      ├── 2026-05-30-kaitak-medical-day/
      ├── 2025-08-15-summer-music-festival/
      ├── 2026-01-17-silver-care-giftbags/
      └── 2025-10-11-family-photoshoot/
  ```
- **自動化遷移腳本 (Node.js Script)：**
  1. 讀取 `facebook_data.json` 中的圖片 URL。
  2. 依序下載原圖，並透過 S3 相容 API 上傳至 Cloudflare R2。
  3. 將 `facebook_data.json` 中的臨時 `scontent-*.fbcdn.net` 連結批次替換為永久的 `https://media.hkalhl.org/events/...` 格式。

### 4. 表單與無伺服器方案
- **聯絡我們與會員/義工登記：**
  - 整合免費無伺服器表單轉發（如 Web3Forms / Formspree），訪客提交內容直接安全發送至協會官方電郵 `ka20180801@gmail.com`。
  - 亦可平行支援官方 Google Forms 嵌入連結，便於秘書處以試算表集中管理登記資料。

### 5. 網站部署環境：Cloudflare Pages
- 連結 GitHub / GitLab 倉庫，代碼推送自動觸發 Astro 構建與全球發布。
- 支援與 Cloudflare R2 內網原生連通，綁定 `hkalhl.org` 主網域。

---

## 六、 視覺風格與 UI/UX 設計規範

- **色彩體系 (Color Palette):**
  - **主色（深邃皇家藍 Navy Blue - `#0D2B45` / `#1E3A8A`）：** 傳遞專業、慈善、穩重與信賴感（呼應 evf.hk 的慈善機構形象）。
  - **副主色（雅緻香檳金 Champagne Gold - `#C5A880` / `#D4AF37`）：** 象徵女性愛馬人士的尊貴優雅與活力。
  - **背景底色（柔和米白/極淡灰 - `#F8FAFC` / `#FAF9F6`）：** 減少刺眼感，提供柔和的閱讀環境。
  - **強調色（溫馨暖紅/珊瑚色 - `#E11D48`）：** 用於愛心、義工募捐及重點通知。
- **字體層級 (Typography):**
  - 繁體中文字體優先：`"Noto Sans HK", "PingFang HK", "Microsoft JhengHei", sans-serif`。
  - 大標題清晰易讀，內文字級不小於 `16px`，長者友善模式支援清晰對比度（通過 WCAG 2.1 AA 認證）。

---

## 七、 實施排期與後續工作建議 (Phased Roadmap)

1. **第一階段：圖片雲端化與數據遷移 (R2 Pipeline & Data Preparation)**
   - 建立 Cloudflare R2 儲存桶（例如 `hkalhl-media`）並綁定自訂域名。
   - 執行 Node.js 遷移腳本：將 `facebook_data.json` 中的相片下載並自動上傳至 Cloudflare R2，生成乾淨持久的 CDN URL 數據清單。
2. **第二階段：Astro 專案初始化與範本搭建 (Astro Scaffolding & Components)**
   - 初始化 Astro + Tailwind CSS 專案。
   - 封裝全局共用組件：`Header.astro`、`Footer.astro`、`SEO.astro`、`Card.astro`、`Lightbox.astro`。
3. **第三階段：頁面模組化組裝 (Page Assembly)**
   - 依據本規劃書完成頁面構建：
     - `src/pages/index.astro` (首頁)
     - `src/pages/about/[...slug].astro` (本會簡介、里程碑、組織架構)
     - `src/pages/services/[...slug].astro` (醫療義診到會、長者關懷、慈善盛事)
     - `src/pages/news/index.astro` 與 `[id].astro` (最新動向)
     - `src/pages/gallery.astro` (活動回顧圖集)
     - `src/pages/join.astro` (加入我們)
     - `src/pages/contact.astro` (聯絡我們)
4. **第四階段：響應式適配與無障礙測試 (Responsive & Accessibility QA)**
   - 針對長者閱讀視力優化字體大小與對比度（WCAG 2.1 AA 標準）。
   - 測試桌面端、平板、iOS 與 Android 手機各視窗尺寸。
   - 測試表單線上轉發、圖片延遲加載 (Lazy loading) 與燈箱放大效果。
5. **第五階段：上線部署與域名綁定 (Launch on Cloudflare Pages)**
   - 連接 GitHub 倉庫至 Cloudflare Pages 進行自動化 CI/CD 構建部署。
   - 配置 DNS 解析，將主域名 `hkalhl.org` 與媒體域名 `media.hkalhl.org` 綁定生效。
