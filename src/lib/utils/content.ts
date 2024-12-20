export function extractContentSections(content: string) {
  const paragraphs = content.split('\n\n')
  
  return {
    vocabulary: paragraphs
      .find(p => p.includes('Vocabulary:'))
      ?.split('\n')
      .slice(1)
      .map(word => word.replace(/^[-•]\s*/, '').trim())
      .filter(Boolean) || [],
      
    sentences: paragraphs
      .filter(p => p.includes('Dialogue'))
      .flatMap(p => 
        p.split('\n')
          .filter(line => line.includes(':'))
          .map(line => line.split(':')[1].trim())
      ),
      
    grammar: paragraphs
      .find(p => p.includes('Key Points:') || p.includes('Key Concepts:'))
      ?.split('\n')
      .slice(1)
      .map(point => point.replace(/^\d+\.\s*|-\s*/, ''))
      .filter(Boolean) || []
  }
}