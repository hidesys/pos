export default function(text: string): void {
  const utterance = new window.SpeechSynthesisUtterance(text)
  utterance.lang = 'ja-JP'
  utterance.rate = 1.0
  utterance.voice = window.speechSynthesis.getVoices().find(voice => voice.lang == 'ja-JP') || null
  window.speechSynthesis.speak(utterance)
}
