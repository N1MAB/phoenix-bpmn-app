import { useEffect, useRef, useState } from 'react';
import BpmnJS from 'bpmn-js/lib/Viewer';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';

const BpmnViewer = ({ xml, onError }) => {
  const containerRef = useRef();
  const viewerRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create BPMN viewer instance
    const viewer = new BpmnJS({
      container: containerRef.current,
      width: '100%',
      height: '500px'
    });

    viewerRef.current = viewer;

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!viewerRef.current || !xml) return;

    const importDiagram = async () => {
      setIsLoading(true);
      
      try {
        await viewerRef.current.importXML(xml);
        
        // Fit diagram to viewport
        const canvas = viewerRef.current.get('canvas');
        canvas.zoom('fit-viewport');
        
      } catch (error) {
        console.error('Error importing BPMN diagram:', error);
        if (onError) {
          onError(`Failed to load BPMN diagram: ${error.message}`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    importDiagram();
  }, [xml, onError]);

  return (
    <div style={{ position: 'relative', border: '1px solid #ddd', borderRadius: '8px' }}>
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
          background: 'rgba(255,255,255,0.9)',
          padding: '10px 20px',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            border: '2px solid #f3f3f3',
            borderTop: '2px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          Loading BPMN diagram...
        </div>
      )}
      
      <div 
        ref={containerRef}
        style={{ 
          width: '100%', 
          height: '500px',
          minHeight: '400px'
        }}
      />
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default BpmnViewer;