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

    // Wafuu Details Mapping
    const wafuuDetails = {
        '和風：基本（日本画風・和紙・藍と金）': '日本画のような雰囲気で、和紙の質感、藍色を基調に、控えめな金のアクセント。',
        '和風：柔らかい（和モダン・和紙・くすみ色）': '日本画のような柔らかい色彩、和紙の質感、くすみ色中心の落ち着いた和モダン。',
        '和風：神聖（水墨画・墨と金・余白）': '水墨画のような静けさ、墨と金を基調に、余白を活かした和の構図。',
        '和風：華やか（屏風絵・朱と藍・金箔）': '屏風絵のような装飾性、金箔のアクセント、朱と藍のコントラスト。',
        '和風：可愛い（ちりめん・淡い和色・和柄）': 'ちりめんのような柔らかい質感、淡い和色、和柄モチーフ。'
    };

    generateBtn.addEventListener('click', () => {
        const title = document.getElementById('title').value;
        const layout = document.getElementById('layout').value;
        const ratio = document.getElementById('ratio').value;
        const customLayout = document.getElementById('customLayout').value;
        const tasteValue = document.getElementById('taste').value;
        const colorPattern = document.getElementById('colorPattern').value;
        const mainColor = document.getElementById('mainColor').value || '指定なし（配色パターンに合わせて最適化）';
        const texture = document.getElementById('texture').value;
        const character = document.getElementById('character').value || 'なし（キャラ無しで構成）';
        const content = document.getElementById('content').value;
        const additional = document.getElementById('additional').value || 'なし';

        // Process Wafuu taste
        let tasteOutput = tasteValue;
        if (wafuuDetails[tasteValue]) {
            tasteOutput = wafuuDetails[tasteValue];
        }

        const prompt = `あなたはプロのインフォグラフィックデザイナー兼イラストレーターです。
以下の指定に従い、SNS（Xなど）で投稿しやすい「読みやすい縦長図解」を作成してください。

${title ? `# 図解タイトル\n${title}\n` : ''}
# ① 図解の型
- 指定：${layout}
- 自由指定（あれば優先）：${customLayout || 'なし'}

# ⑧ 図解の形（比率）
- 指定：${ratio}
- 自由指定（あれば優先）：なし

# ② 図解のテイスト
- ${tasteOutput}

# ③ 配色パターン
- ${colorPattern}

# ④ メインカラー
- ${mainColor}

# ⑤ 質感
- ${texture}

# ⑥ キャラの指定（任意）
- ${character}

# ⑦ 図解のデータ（内容）
${content || '（図解化したい内容を入力してください）'}

# 追加の指示（任意）
${additional}

# 生成ルール
1. 視認性最優先：文字は読みやすいサイズ、詰め込みすぎない。
2. 情報は適切に要約し、見出し→要点の構造で整理する。
3. 図解の型（レイアウト）の意図を崩さない。
4. 配色は指定の雰囲気とメインカラーに揃え、統一感を出す。
5. キャラを入れる場合、邪魔にならないサイズで各セクションに自然に配置する。
6. 仕上がりは1枚の完成画像として、装飾（アイコン/罫線/矢印など）で理解を助ける。`;

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
