import { useState, useEffect, useRef } from 'react'
import './App.css'

function BpmnApp() {
  const [processName, setProcessName] = useState('Sample Process')
  const [processDescription, setProcessDescription] = useState('A simple business process')
  const [bpmnXML, setBpmnXML] = useState(`<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" 
                  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
                  xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
                  id="Definitions_1" 
                  targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="true">
    <bpmn:startEvent id="StartEvent_1">
      <bpmn:outgoing>Flow_1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Task_1" name="Sample Task">
      <bpmn:incoming>Flow_1</bpmn:incoming>
      <bpmn:outgoing>Flow_2</bpmn:outgoing>
    </bpmn:task>
    <bpmn:endEvent id="EndEvent_1">
      <bpmn:incoming>Flow_2</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="Task_1" />
    <bpmn:sequenceFlow id="Flow_2" sourceRef="Task_1" targetRef="EndEvent_1" />
  </bpmn:process>
</bpmn:definitions>`)
  const [isGenerating, setIsGenerating] = useState(false)
  const bpmnRef = useRef()

  useEffect(() => {
    // For now, just display the XML - we'll integrate bpmn-js later
    if (bpmnRef.current) {
      bpmnRef.current.innerHTML = `<pre style="white-space: pre-wrap; font-family: monospace; font-size: 12px;">${bpmnXML}</pre>`
    }
  }, [bpmnXML])

  const generateBPMN = async () => {
    if (!processDescription.trim()) {
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch('https://nimab.app.n8n.cloud/webhook/bpmn-generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          process_name: processName,
          process_description: processDescription,
          complexity: 'medium'
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('BPMN Response:', data)
      
      if (data.bpmn_xml) {
        setBpmnXML(data.bpmn_xml)
      } else if (data.output) {
        setBpmnXML(data.output)
      }
    } catch (error) {
      console.error('BPMN Generation Error:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="app">
      <header>
        <h1>Phoenix BPMN Generator</h1>
        <p>Professional BPMN diagrams with AI - Foundation Test</p>
      </header>
      
      <div className="container">
        <div className="editor-panel">
          <div className="ai-section">
            <h2>AI BPMN Generator</h2>
            
            <div className="input-group">
              <label>Process Name:</label>
              <input
                type="text"
                value={processName}
                onChange={(e) => setProcessName(e.target.value)}
                placeholder="Enter process name"
              />
            </div>
            
            <div className="input-group">
              <label>Process Description:</label>
              <textarea
                value={processDescription}
                onChange={(e) => setProcessDescription(e.target.value)}
                placeholder="Describe your business process..."
                rows="4"
              />
            </div>
            
            <button 
              onClick={generateBPMN} 
              disabled={isGenerating || !processDescription.trim()}
              className={`ai-button ${isGenerating ? 'loading' : ''}`}
            >
              {isGenerating ? 'Generating BPMN...' : 'Generate BPMN'}
            </button>
          </div>
        </div>
        
        <div className="preview-panel">
          <div className="preview-header">
            <h2>BPMN Preview</h2>
          </div>
          
          <div 
            ref={bpmnRef} 
            className="diagram-container"
            style={{ 
              border: '1px solid #ccc', 
              padding: '20px', 
              minHeight: '400px',
              backgroundColor: '#f9f9f9',
              overflow: 'auto'
            }}
          />
          
          <div className="diagram-info">
            <small>BPMN XML output - bpmn-js integration coming next</small>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BpmnApp