export type PracticeMode = 'guided' | 'speech';

export type DisplayMode = 
  | 'en_to_en'   // English word -> English definition
  | 'zh_to_en'   // Chinese -> English word
  | 'en_to_zh'   // English word -> Chinese
  | 'zh_to_speech' // Chinese -> Spoken English
  | 'en_to_speech'; // English -> Spoken English

export interface PracticeSettings {
  practiceMode: PracticeMode;
  displayMode: DisplayMode;
}

export interface VocabularyWord {
  id: string;
  word: string;
  definition: string;
  chinese_translation: string;
  level: number;
  frequency_rank: number;
}