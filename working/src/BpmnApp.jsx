import { useState, useEffect } from 'react'
import BpmnViewer from '../../modules/bpmn-canvas/BpmnViewer.jsx'
import './App.css'

function BpmnApp() {
  const [bpmnXML, setBpmnXML] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Sample BPMN XML - Simple process for testing
  const sampleBPMN = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" 
                  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
                  xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
                  id="Definitions_1" 
                  targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="true">
    <bpmn:startEvent id="StartEvent_1" name="Start">
      <bpmn:outgoing>Flow_1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Task_1" name="Phoenix BPMN Demo Task">
      <bpmn:incoming>Flow_1</bpmn:incoming>
      <bpmn:outgoing>Flow_2</bpmn:outgoing>
    </bpmn:task>
    <bpmn:endEvent id="EndEvent_1" name="End">
      <bpmn:incoming>Flow_2</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="Task_1" />
    <bpmn:sequenceFlow id="Flow_2" sourceRef="Task_1" targetRef="EndEvent_1" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="StartEvent_1_di" bpmnElement="StartEvent_1">
        <dc:Bounds x="152" y="102" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="158" y="145" width="24" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_1_di" bpmnElement="Task_1">
        <dc:Bounds x="240" y="80" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_1_di" bpmnElement="EndEvent_1">
        <dc:Bounds x="392" y="102" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="400" y="145" width="20" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1_di" bpmnElement="Flow_1">
        <di:waypoint x="188" y="120" />
        <di:waypoint x="240" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_2_di" bpmnElement="Flow_2">
        <di:waypoint x="340" y="120" />
        <di:waypoint x="392" y="120" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`

  useEffect(() => {
    // Simulate loading sample BPMN
    setTimeout(() => {
      setBpmnXML(sampleBPMN)
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleError = (errorMessage) => {
    setError(errorMessage)
  }

  const loadComplexSample = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      // Load the complex sample BPMN from our modules
      const response = await fetch('/modules/bpmn-canvas/sample-bpmn.xml')
      if (response.ok) {
        const complexXML = await response.text()
        setBpmnXML(complexXML)
      } else {
        setBpmnXML(sampleBPMN) // Fallback to simple sample
      }
    } catch (err) {
      console.error('Error loading complex sample:', err)
      setBpmnXML(sampleBPMN) // Fallback to simple sample
    } finally {
      setIsLoading(false)
    }
  }

  const generateWithAI = () => {
    setError('')
    alert('🚀 AI Generation coming in Module 3: n8n Experiments!')
  }

  return (
    <div className="app">
      <header style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '2.5em' }}>🚀 Phoenix BPMN Canvas</h1>
        <p style={{ margin: '10px 0 0 0', opacity: 0.9 }}>
          Module 2: Professional BPMN Viewer with bpmn-js
        </p>
      </header>
      
      <div style={{ 
        padding: '20px', 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        
        {/* Controls */}
        <div style={{ 
          marginBottom: '20px', 
          display: 'flex', 
          gap: '10px', 
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <button 
            onClick={loadComplexSample}
            disabled={isLoading}
            style={{
              background: '#667eea',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            {isLoading ? 'Loading...' : '📊 Load Complex Sample'}
          </button>
          
          <button 
            onClick={generateWithAI}
            style={{
              background: '#48bb78',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            🤖 Generate with AI
          </button>
          
          <div style={{ marginLeft: 'auto', fontSize: '0.9em', color: '#666' }}>
            Status: {isLoading ? 'Loading BPMN...' : 'Ready'}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div style={{
            background: '#fee2e2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '20px'
          }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* BPMN Viewer */}
        <div style={{
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            margin: '0 0 20px 0',
            color: '#374151',
            fontSize: '1.5em',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            🎨 BPMN Diagram Viewer
            <span style={{
              fontSize: '0.7em',
              background: '#10b981',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '12px',
              fontWeight: '500'
            }}>
              bpmn-js
            </span>
          </h2>
          
          {bpmnXML ? (
            <BpmnViewer xml={bpmnXML} onError={handleError} />
          ) : (
            <div style={{
              height: '500px',
              border: '2px dashed #d1d5db',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6b7280',
              fontSize: '1.2em'
            }}>
              {isLoading ? 'Loading BPMN diagram...' : 'No BPMN diagram loaded'}
            </div>
          )}
        </div>

        {/* Module Info */}
        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#1f2937' }}>
            📋 Module 2: BPMN Canvas Progress
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <div>
              <strong>✅ Completed:</strong>
              <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                <li>bpmn-js integration</li>
                <li>BPMN viewer component</li>
                <li>Sample diagram loading</li>
                <li>Error handling</li>
              </ul>
            </div>
            <div>
              <strong>🚧 Next Steps:</strong>
              <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                <li>BPMN editor mode</li>
                <li>Properties panel</li>
                <li>Export functionality</li>
                <li>Module 3: AI integration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BpmnApp