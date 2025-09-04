import { useState, useEffect, useRef } from 'react'
import mermaid from 'mermaid'
import './App.css'

// Initialize Mermaid
mermaid.initialize({
  startOnLoad: true,
  theme: 'default',
  flowchart: {
    useMaxWidth: false,
    htmlLabels: true,
    curve: 'basis'
  }
})

// Convert our custom syntax to Mermaid
const convertToMermaid = (customSyntax) => {
  const lines = customSyntax.split('\n').filter(line => line.trim())
  const nodes = new Map()
  let nodeCounter = 1
  let hasSwimlanes = false
  
  // Check if we have swimlanes
  const swimlaneLines = lines.filter(line => line.includes('{') && line.includes('}'))
  if (swimlaneLines.length > 0) {
    hasSwimlanes = true
  }
  
  let mermaidCode = hasSwimlanes ? 'flowchart TD\n' : 'flowchart TD\n'
  
  lines.forEach(line => {
    line = line.trim()
    
    // Parse swimlanes
    if (line.includes('{') && line.includes('}') && !line.includes('[')) {
      const swimlaneName = line.split('{')[0].trim()
      const swimlaneContent = line.match(/\{([^}]+)\}/)?.[1] || ''
      
      // Add subgraph for swimlane
      mermaidCode += `  subgraph ${swimlaneName}["${swimlaneName}"]\n`
      
      // Parse nodes within swimlane
      const swimlaneNodes = swimlaneContent.split(',').map(n => n.trim()).filter(n => n)
      swimlaneNodes.forEach(nodeName => {
        if (!nodes.has(nodeName)) {
          const nodeId = `N${nodeCounter++}`
          nodes.set(nodeName, { id: nodeId, label: nodeName, shape: 'rectangle', swimlane: swimlaneName })
          mermaidCode += `    ${nodeId}["${nodeName}"]\n`
        }
      })
      
      mermaidCode += `  end\n`
      return
    }
    
    // Parse node definitions
    if (line.includes('[') && line.includes(']') && !line.includes('>')) {
      const parts = line.split('[')
      const nodeName = parts[0].trim()
      const nodeConfig = parts[1].replace(']', '')
      
      // Extract label
      const labelMatch = nodeConfig.match(/label:\s*"([^"]+)"/);
      const label = labelMatch ? labelMatch[1].replace('\\n', '<br/>') : nodeName
      
      // Extract shape
      const shapeMatch = nodeConfig.match(/shape:\s*(\w+)/)
      const shape = shapeMatch ? shapeMatch[1] : 'rectangle'
      
      // Extract swimlane
      const swimlaneMatch = nodeConfig.match(/swimlane:\s*"([^"]+)"/)
      const swimlane = swimlaneMatch ? swimlaneMatch[1] : null
      
      const nodeId = `N${nodeCounter++}`
      nodes.set(nodeName, { id: nodeId, label, shape, swimlane })
      
      if (!hasSwimlanes || !swimlane) {
        // Add node to main flow
        if (shape === 'oval') {
          mermaidCode += `  ${nodeId}("${label}")\n`
        } else if (shape === 'diamond') {
          mermaidCode += `  ${nodeId}{"${label}"}\n`
        } else {
          mermaidCode += `  ${nodeId}["${label}"]\n`
        }
      }
    }
    
    // Parse connections
    if (line.includes('>')) {
      const parts = line.split('>')
      const from = parts[0].trim()
      const to = parts[1].trim()
      
      if (nodes.has(from) && nodes.has(to)) {
        mermaidCode += `  ${nodes.get(from).id} --> ${nodes.get(to).id}\n`
      }
    }
  })
  
  return mermaidCode
}

function App() {
  const [inputText, setInputText] = useState(() => {
    // Load from localStorage or use default
    const saved = localStorage.getItem('diagram-tool-content')
    return saved || `start [shape: oval, label: "Start"]
analyse [label: "Requirements\\nAnalyse"]
design [label: "System\\nDesign"] 
implementatie [label: "Code\\nImplementatie"]
review [shape: diamond, label: "Review"]
testing [label: "Test\\nFase"]
deployment [label: "Deploy\\nProces"]
klaar [shape: oval, label: "Production"]

start > analyse
analyse > design
design > implementatie
implementatie > review
review > testing
review > deployment
testing > klaar
deployment > klaar`
  })
  
  const [mermaidCode, setMermaidCode] = useState('')
  const [aiRequest, setAiRequest] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [aiError, setAiError] = useState('')
  const [showTemplates, setShowTemplates] = useState(false)
  const [lastAiResponse, setLastAiResponse] = useState('')
  const mermaidRef = useRef()

  const templates = {
    'project-planning': {
      name: 'Project Planning',
      code: `start [shape: oval, label: "Start"]
initiatie [label: "Project\\nInitiatie"]
planning [label: "Planning\\nFase"]
uitvoering [label: "Uitvoering"]
monitoring [shape: diamond, label: "On Track?"]
bijsturen [label: "Bijsturen"]
afsluiting [label: "Project\\nAfsluiting"]
evaluatie [shape: oval, label: "Evaluatie"]

start > initiatie
initiatie > planning
planning > uitvoering
uitvoering > monitoring
monitoring > bijsturen
monitoring > afsluiting
bijsturen > uitvoering
afsluiting > evaluatie`
    },
    'e-commerce': {
      name: 'E-commerce Flow',
      code: `start [shape: oval, label: "Start"]
product [label: "Product\\nSelecteren"]
cart [label: "Winkel\\nwagen"]
checkout [label: "Checkout"]
payment [shape: diamond, label: "Betaling\\nOK?"]
success [label: "Bevestiging"]
shipping [label: "Verzending"]
end [shape: oval, label: "Einde"]

start > product
product > cart
cart > checkout
checkout > payment
payment > success
success > shipping
shipping > end`
    },
    'software-deployment': {
      name: 'Software Deployment',
      code: `start [shape: oval, label: "Start"]
code [label: "Code\\nCommit"]
build [label: "Build"]
test [label: "Tests"]
test-check [shape: diamond, label: "Tests\\nPassed?"]
deploy-staging [label: "Deploy\\nStaging"]
review [label: "Review"]
deploy-prod [label: "Deploy\\nProduction"]
rollback [label: "Rollback"]
success [shape: oval, label: "Success"]

start > code
code > build
build > test
test > test-check
test-check > deploy-staging
test-check > rollback
deploy-staging > review
review > deploy-prod
deploy-prod > success
rollback > code`
    },
    'approval-process': {
      name: 'Goedkeuringsproces',
      code: `start [shape: oval, label: "Aanvraag"]
review1 [label: "Manager\\nReview"]
manager-ok [shape: diamond, label: "Manager\\nOK?"]
review2 [label: "HR\\nReview"] 
hr-ok [shape: diamond, label: "HR\\nOK?"]
approved [label: "Goedgekeurd"]
rejected [label: "Afgewezen"]
end [shape: oval, label: "Einde"]

start > review1
review1 > manager-ok
manager-ok > review2
manager-ok > rejected
review2 > hr-ok
hr-ok > approved
hr-ok > rejected
approved > end
rejected > end`
    }
  }

  useEffect(() => {
    const converted = convertToMermaid(inputText)
    setMermaidCode(converted)
    
    if (mermaidRef.current) {
      mermaidRef.current.innerHTML = ''
      mermaid.render('mermaid-diagram', converted).then(({ svg }) => {
        mermaidRef.current.innerHTML = svg
      }).catch(error => {
        console.error('Mermaid rendering error:', error)
        mermaidRef.current.innerHTML = '<p>Error rendering diagram</p>'
      })
    }
  }, [inputText])

  // Auto-save to localStorage
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('diagram-tool-content', inputText)
    }, 1000) // Debounce 1 second
    
    return () => clearTimeout(timeoutId)
  }, [inputText])

  const downloadSVG = () => {
    const svg = mermaidRef.current.querySelector('svg')
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg)
      const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'})
      const svgUrl = URL.createObjectURL(svgBlob)
      const downloadLink = document.createElement('a')
      downloadLink.href = svgUrl
      downloadLink.download = 'diagram.svg'
      downloadLink.click()
    }
  }

  const downloadPNG = () => {
    const svg = mermaidRef.current.querySelector('svg')
    if (svg) {
      // Create a canvas element
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      // Get SVG data and dimensions
      const svgData = new XMLSerializer().serializeToString(svg)
      const svgRect = svg.getBoundingClientRect()
      
      // Set canvas size (double for high quality)
      const scale = 2
      canvas.width = svgRect.width * scale
      canvas.height = svgRect.height * scale
      
      // Scale context for high quality
      ctx.scale(scale, scale)
      
      img.onload = () => {
        // Fill white background
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, svgRect.width, svgRect.height)
        
        // Draw the image
        ctx.drawImage(img, 0, 0, svgRect.width, svgRect.height)
        
        // Download PNG
        canvas.toBlob((blob) => {
          const pngUrl = URL.createObjectURL(blob)
          const downloadLink = document.createElement('a')
          downloadLink.href = pngUrl
          downloadLink.download = 'diagram.png'
          document.body.appendChild(downloadLink)
          downloadLink.click()
          document.body.removeChild(downloadLink)
          URL.revokeObjectURL(pngUrl)
        }, 'image/png')
      }
      
      img.onerror = () => {
        console.error('Failed to load SVG for PNG conversion')
        alert('PNG export failed. Please try SVG export instead.')
      }
      
      // Convert SVG to data URL properly
      const svgDataUrl = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
      img.src = svgDataUrl
    }
  }

  const generateWithAI = async () => {
    if (!aiRequest.trim()) {
      setAiError('Voer eerst een beschrijving in')
      return
    }

    setIsGenerating(true)
    setAiError('')

    // Test with mock data first (uncomment to test without n8n)
    if (aiRequest.toLowerCase().includes('test')) {
      setTimeout(() => {
        setInputText(`start [shape: oval, label: "Start"]
process [label: "Test\\nProces"]
decision [shape: diamond, label: "OK?"]
success [label: "Success"]
end [shape: oval, label: "Einde"]

start > process
process > decision
decision > success
success > end`)
        setAiRequest('')
        setIsGenerating(false)
      }, 1000)
      return
    }

    try {
      // Replace with your actual n8n webhook URL
      const response = await fetch('https://nimab.app.n8n.cloud/webhook/diagram-generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          request: aiRequest,
          type: 'flowchart',
          complexity: 'medium',
          current_diagram: lastAiResponse ? inputText : null,
          is_followup: lastAiResponse && aiRequest.toLowerCase().includes('aanpass') || 
                      aiRequest.toLowerCase().includes('verander') ||
                      aiRequest.toLowerCase().includes('voeg toe') ||
                      aiRequest.toLowerCase().includes('maak')
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      // Debug: log the full response
      console.log('AI Response:', data)
      
      if (data.diagram_code) {
        setInputText(data.diagram_code)
        setLastAiResponse(data.diagram_code)
        setAiRequest('') // Clear the input
      } else if (data.output) {
        // Try alternative field names
        setInputText(data.output)
        setLastAiResponse(data.output)
        setAiRequest('')
      } else if (data.response) {
        // Another alternative
        setInputText(data.response)
        setLastAiResponse(data.response)
        setAiRequest('')
      } else if (data.error) {
        setAiError(data.error)
      } else {
        setAiError(`Geen diagram code ontvangen van AI. Response: ${JSON.stringify(data)}`)
      }
    } catch (error) {
      console.error('AI Generation Error:', error)
      setAiError('Fout bij verbinden met AI service. Probeer later opnieuw.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="app">
      <header>
        <h1>AI Diagram Generator</h1>
        <p>Van natuurlijke taal naar professionele diagrammen - powered by AI</p>
        <div className="header-stats">
        </div>
      </header>
      
      <div className="container">
        <div className="editor-panel">
          <div className="ai-section">
            <div className="ai-header">
              <h2>AI Diagram Generator</h2>
              <div className="ai-examples">
                <span 
                  className="example-chip" 
                  onClick={() => setAiRequest("Maak een customer support proces met escalatie")}
                >
                  Customer Support
                </span>
                <span 
                  className="example-chip"
                  onClick={() => setAiRequest("E-commerce bestelling met betaling en verzending")}
                >
                  E-commerce Flow
                </span>
                <span 
                  className="example-chip"
                  onClick={() => setAiRequest("Software deployment met testing en rollback")}
                >
                  IT Deployment
                </span>
              </div>
            </div>
            
            <div className="ai-input-group">
              <div className="input-wrapper">
                <textarea
                  value={aiRequest}
                  onChange={(e) => setAiRequest(e.target.value)}
                  placeholder="Beschrijf je diagram in gewone taal... Of maak aanpassingen: 'Voeg een extra controle stap toe' of 'Verander de kleuren'"
                  onKeyPress={(e) => e.key === 'Enter' && e.ctrlKey && !isGenerating && aiRequest.trim() && generateWithAI()}
                  disabled={isGenerating}
                  className="ai-input ai-textarea"
                  rows="3"
                />
                <div className="input-help">
                  Voorbeelden: "Goedkeuringsproces met 3 stappen", "Voeg een review stap toe", "Maak swimlanes voor HR en IT"
                  <br />
                  <span className="shortcut-hint">Druk Ctrl+Enter om te genereren</span>
                </div>
              </div>
              <button 
                onClick={generateWithAI} 
                disabled={isGenerating || !aiRequest.trim()}
                className={`ai-button ${isGenerating ? 'loading' : ''}`}
              >
                {isGenerating ? (
                  <><span className="spinner"></span> Genereren...</>
                ) : (
                  <>Genereer</>
                )}
              </button>
            </div>
            
            {aiError && <div className="ai-error">Fout: {aiError}</div>}
            
            {lastAiResponse && (
              <div className="followup-hint">
                <strong>Follow-up mogelijk!</strong> Probeer: "Voeg een extra stap toe", "Maak het eenvoudiger", "Voeg swimlanes toe"
              </div>
            )}
            
            <div className="ai-stats">
              <small>AI-powered • Privacy-safe • Instant results {lastAiResponse && '• Follow-up ready'}</small>
            </div>
          </div>

          <div className="code-section">
            <div className="code-header">
              <h2>Diagram Code</h2>
              <div className="code-actions">
                <button 
                  onClick={() => setShowTemplates(!showTemplates)} 
                  className="secondary-button"
                  title="Templates"
                >
                  Templates
                </button>
                <button 
                  onClick={() => setInputText('')} 
                  className="secondary-button"
                  title="Wis alles"
                >
                  Wissen
                </button>
                <button onClick={downloadSVG} className="secondary-button">
                  SVG
                </button>
                <button onClick={downloadPNG} className="primary-button">
                  PNG
                </button>
              </div>
            </div>
            
            {showTemplates && (
              <div className="templates-dropdown">
                <h3>Diagram Templates</h3>
                <div className="templates-grid">
                  {Object.entries(templates).map(([key, template]) => (
                    <div 
                      key={key} 
                      className="template-card"
                      onClick={() => {
                        setInputText(template.code)
                        setShowTemplates(false)
                      }}
                    >
                      <div className="template-name">{template.name}</div>
                      <div className="template-preview">
                        Klik om te gebruiken
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Je diagram code verschijnt hier automatisch na AI generatie, of typ handmatig..."
              rows={14}
              className="code-textarea"
            />
            
            <details className="debug-section">
              <summary>Debug: Mermaid Code</summary>
              <pre className="debug-code">{mermaidCode}</pre>
            </details>
          </div>
        </div>
        
        <div className="preview-panel">
          <div className="preview-header">
            <h2>Live Preview</h2>
            <div className="preview-controls">
              <button 
                onClick={() => {
                  const diagram = mermaidRef.current
                  if (diagram) {
                    diagram.style.transform = diagram.style.transform === 'scale(0.8)' ? 'scale(1)' : 'scale(0.8)'
                  }
                }}
                className="control-button"
                title="Zoom in/out"
              >
                Zoom
              </button>
              <button
                onClick={() => {
                  if (mermaidRef.current) {
                    mermaidRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }
                }}
                className="control-button"
                title="Center diagram"
              >
                Center
              </button>
            </div>
          </div>
          
          <div 
            ref={mermaidRef} 
            className="diagram-container"
          />
          
          <div className="diagram-info">
            <small>
              Automatisch gerenderd • Mobile-friendly • Real-time updates
            </small>
          </div>
        </div>
      </div>
      
      <footer>
        <div className="footer-content">
        </div>
      </footer>
    </div>
  )
}

export default App
