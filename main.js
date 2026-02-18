document.addEventListener('DOMContentLoaded', () => {
    const passwordGate = document.getElementById('passwordGate');
    const appContainer = document.getElementById('appContainer');
    const passwordInput = document.getElementById('passwordInput');
    const loginBtn = document.getElementById('loginBtn');
    const passwordError = document.getElementById('passwordError');

    const VALID_PASSWORD = 'zukai2026';

    // Check if already authenticated
    if (localStorage.getItem('zukai_auth') === 'true') {
        showApp();
    }

    loginBtn.addEventListener('click', checkPassword);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkPassword();
    });

    function checkPassword() {
        if (passwordInput.value === VALID_PASSWORD) {
            localStorage.setItem('zukai_auth', 'true');
            showApp();
        } else {
            passwordError.style.display = 'block';
            passwordInput.value = '';
        }
    }

    function showApp() {
        passwordGate.style.display = 'none';
        appContainer.style.display = 'block';
    }

    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');
    const resetBtn = document.getElementById('resetBtn');
    const promptOutput = document.getElementById('promptOutput');
    const copyNotice = document.getElementById('copyNotice');

    generateBtn.addEventListener('click', () => {
        const title = document.getElementById('title').value;
        const layout = document.getElementById('layout').value;
        const ratio = document.getElementById('ratio').value;
        const customLayout = document.getElementById('customLayout').value;
        const taste = document.getElementById('taste').value;
        const colorPattern = document.getElementById('colorPattern').value;
        const mainColor = document.getElementById('mainColor').value;
        const texture = document.getElementById('texture').value;
        const character = document.getElementById('character').value;
        const content = document.getElementById('content').value;
        const additional = document.getElementById('additional').value;
        const infoStyle = document.getElementById('infoStyle').value;

        let styleDetail = "";
        if (taste.includes("和風")) {
            if (taste.includes("基本")) {
                styleDetail = "日本画風の繊細なタッチ、和紙のテクスチャ、藍色と金のアクセントを使い、伝統的かつ高級感のある和風デザインにしてください。";
            } else if (taste.includes("柔らかい")) {
                styleDetail = "現代的な和モダン、淡い「くすみカラー」、透け感のある和紙の質感、ミニマルで柔らかなレイアウトにしてください。";
            } else if (taste.includes("神聖")) {
                styleDetail = "水墨画のような墨の濃淡、鋭い筆跡、背景に広大な余白を活かし、アクセントとして金箔のような輝きを加えてください。";
            } else if (taste.includes("華やか")) {
                styleDetail = "豪華な金屏風絵のような雰囲気、朱色や群青色の強いコントラスト、金箔の装飾、細部まで描き込まれた優雅な装飾を施してください。";
            } else if (taste.includes("可愛い")) {
                styleDetail = "ちりめん細工のような質感、パステル調の和色（桃色、鶸色など）、小さな和柄（麻の葉、七宝など）を散りばめた愛らしいデザインにしてください。";
            }
        } else if (taste.includes("漫画風")) {
            styleDetail = "日本の漫画（コミック）調のデザイン。太い輪郭線、強調線、トーン、キャッチーなフォント、躍動感のある構図にしてください。";
        } else if (taste.includes("サイバー")) {
            styleDetail = "近未来的、ダークな背景に鮮やかなネオン光（ブルー、ピンク等）、グリッド線、ホログラム効果、ハイテクな電子回路をイメージした質感にしてください。";
        } else if (taste.includes("高級感")) {
            styleDetail = "上品でラグジュアリーなデザイン。洗練された配色（ゴールド、モノトーン、深い紺など）、高精細な質感、余裕のあるレイアウト、極めて高品質な表現にしてください。";
        } else if (taste.includes("こどもの絵本風")) {
            styleDetail = "クレヨンや色鉛筆で描いたような温かいタッチ。塗りムラやガタガタした線、素朴なキャラクター、優しく親しみやすい色彩と手描き感を重視してください。";
        } else if (taste.includes("水彩絵手紙風")) {
            styleDetail = "透明感のある水彩絵の具の「にじみ」や筆跡。柔らかいグラデーション、墨による味のある文字・輪郭線、季節感を感じる情緒的な雰囲気にしてください。";
        }

        // Info Style logic
        let infoStyleInstruction = "";
        if (infoStyle.includes("テキスト重視")) {
            infoStyleInstruction = "【情報伝達ルール：テキスト重視】要点を的確に伝えるため、適切な文字量を含めてください。各セクションに読みやすい要約文を配置し、理解を助ける構成にしてください。";
        } else {
            infoStyleInstruction = "【情報伝達ルール：アイコン・イラスト重視】文字による説明を最小限（キーワード程度）に抑え、アイコン、記号、ピクトグラム、イラストを多用して視認性高く情報を伝えてください。";
        }

        const prompt = `
# 縦長インフォグラフィック生成プロンプト (V4.2)

あなたはプロのデザイナーです。以下の詳細な指示に従い、最高品質の図解画像を生成してください。

## 1. 全体のコンセプト
- **タイトル**: ${title || "指定なし"}
- **基本テイスト**: ${taste}
- **レイアウトの型**: ${layout}
- **画面比率**: ${ratio}

## 2. デザイン・ディテール
- **スタイルの詳細**: ${styleDetail}
- **配色パターン**: ${colorPattern}
- **メインカラー**: ${mainColor || "テイストに合わせて最適化"}
- **質感 (テクスチャ)**: ${texture}
- **${infoStyleInstruction}**

## 3. キャラクター設定 (任意)
- **キャラクター詳細**: ${character || "なし"}

## 4. 図解の内容 (インプット)
${customLayout ? `### レイアウトの自由指定:\n${customLayout}\n\n` : ""}
### 構成データ:
${content || "（具体的な内容が入力されていません。AI側で一般的な内容で構成してください）"}

## 5. 追加の指示
- **詳細指示**: ${additional || "特になし"}

## 6. 生成ルール (厳守)
- 指示された比率 (${ratio}) を厳守すること。
- テキストは日本語を基本とし、読みやすさを最優先する。
- 画面端まで美しくデザインを配置し、高品質なグラフィックに仕上げる。
`;

        promptOutput.textContent = prompt;
        // Scroll to output
        promptOutput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    copyBtn.addEventListener('click', () => {
        const text = promptOutput.textContent;
        if (text && text !== 'ここにプロンプトが生成されます...') {
            navigator.clipboard.writeText(text).then(() => {
                showNotice();
            });
        }
    });

    resetBtn.addEventListener('click', () => {
        if (confirm('入力をリセットしますか？')) {
            document.querySelectorAll('input, select, textarea').forEach(el => {
                if (el.tagName === 'SELECT') {
                    el.selectedIndex = 0;
                } else {
                    el.value = '';
                }
            });
            promptOutput.textContent = 'ここにプロンプトが生成されます...';
        }
    });

    function showNotice() {
        copyNotice.classList.add('show');
        setTimeout(() => {
            copyNotice.classList.remove('show');
        }, 2000);
    }
});
