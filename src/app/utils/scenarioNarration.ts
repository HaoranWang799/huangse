export const SCENARIO_PHASE_IDS = ['preheat', 'ongoing', 'preclimax', 'climax', 'afterglow'] as const;

export type ScenarioPhaseId = (typeof SCENARIO_PHASE_IDS)[number];

export interface ScenarioNarration {
  title: string;
  subtitle: string;
  description: string;
  fullNarration: string;
  phaseLines: Record<ScenarioPhaseId, string>;
  speakingLead: string;
}

interface BuildNarrationInput {
  prompt: string;
  roleLabel: string;
  sceneLabel: string;
  intensityLabel: string;
  voiceLabel: string;
  voiceDescription: string;
  durationMinutes: number;
}

const titleMap: Record<string, string> = {
  romantic: '月光对话',
  fantasy: '星夜幻境',
  intimate: '耳语时刻',
  relax: '慢热陪伴',
  exciting: '心跳边界',
  bedtime: '夜色晚安',
};

const sanitizePrompt = (prompt: string) => prompt.replace(/\s+/g, ' ').trim();

const shortenTitle = (input: string) => {
  if (!input) return '';
  return input.length > 12 ? `${input.slice(0, 12)}` : input;
};

export function buildScenarioNarration({
  prompt,
  roleLabel,
  sceneLabel,
  intensityLabel,
  voiceLabel,
  voiceDescription,
  durationMinutes,
}: BuildNarrationInput): ScenarioNarration {
  const normalizedPrompt = sanitizePrompt(prompt);
  const promptCore = normalizedPrompt || `${sceneLabel}里的${roleLabel}陪伴`;
  const title = shortenTitle(normalizedPrompt) || titleMap[sceneLabel] || '月光对话';
  const subtitle = normalizedPrompt || `${roleLabel}与您展开一段${sceneLabel}氛围中的沉浸式互动`;
  const speakingLead = `${voiceLabel}声线，${intensityLabel}节奏`;

  const phaseLines: Record<ScenarioPhaseId, string> = {
    preheat: `我已经来到你设想的${sceneLabel}里了。先别着急，我们就按你喜欢的方式慢慢靠近，让呼吸和心跳一起放松下来。`,
    ongoing: `现在我会继续顺着你的幻想往前走。你提到的“${promptCore}”，我都记住了，我会用${voiceDescription}陪你把这个场景一点点铺开。`,
    preclimax: `气氛已经被你带起来了。此刻不用分心，只要跟着我的声音，把注意力留在我们共同构造的画面里，感受每一次细微变化。`,
    climax: `这一段是今晚最投入的时刻。我会把语气、节奏和停顿都交给你偏好的方向，让整段体验更贴近你真正想要的沉浸感。`,
    afterglow: `先别急着离开。把刚才最有感觉的片段留在脑海里，记住这种被理解、被回应、被陪伴的余韵，我们还可以随时继续。`,
  };

  const fullNarration = [
    `这是为你定制的 ${durationMinutes} 分钟陪伴场景。`,
    `设定关键词是：${promptCore}。`,
    `角色基调采用${roleLabel}，场景氛围落在${sceneLabel}，整体节奏保持${intensityLabel}。`,
    `我会用${voiceLabel}声线陪你进入状态，并在过程中持续维持沉浸感。`,
    phaseLines.preheat,
    phaseLines.ongoing,
    phaseLines.preclimax,
    phaseLines.climax,
    phaseLines.afterglow,
  ].join('');

  return {
    title,
    subtitle,
    description: `围绕“${promptCore}”生成的专属陪伴场景，AI会按照${intensityLabel}节奏推进语音氛围，并在不同阶段切换更贴合情绪的表达。`,
    fullNarration,
    phaseLines,
    speakingLead,
  };
}
