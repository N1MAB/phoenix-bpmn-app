# 🧪 N8N Experiments - Phoenix BPMN

## 🎯 Purpose
Isolated testing environment for n8n AI workflow refinement without affecting main development.

## 📋 Experiment Tracking

### **Test 1: Basic BPMN Generation**
- **Status**: Ready to test
- **Input**: Simple process description
- **Expected**: Valid BPMN XML
- **Webhook**: https://nimab.app.n8n.cloud/webhook/bpmn-generator

### **Test 2: Complex Processes**
- **Status**: Pending
- **Input**: Multi-step process with decision points
- **Expected**: BPMN with gateways and parallel flows

### **Test 3: Swimlane Support**
- **Status**: Pending  
- **Input**: Process with multiple actors/departments
- **Expected**: BPMN with swimlane organization

### **Test 4: Timeout Prevention**
- **Status**: Critical priority
- **Goal**: Prevent 99-second browser timeout
- **Approach**: Async fire-and-forget pattern

## 🔬 Test Files
- `test-basic.html` - Simple webhook test
- `test-complex.html` - Advanced process testing
- `test-async.html` - Timeout prevention test
- `results/` - Test output logging

## 📊 Results Log
*Test results will be documented here*

---
**Branch**: feature/n8n-experiments
**Independence**: Can be developed parallel to main