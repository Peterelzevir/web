import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Kalkulator = () => {
  const [loading, setLoading] = useState(true);
  const [displayValue, setDisplayValue] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState(0);
  const [history, setHistory] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('dark'); // dark, light, blue, purple, green
  
  const historyRef = useRef(null);
  
  // Set loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress for progress bar
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleDigitInput = (digit) => {
    if (waitingForOperand) {
      setDisplayValue(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };
  
  const handleDotInput = () => {
    if (waitingForOperand) {
      setDisplayValue('0.');
      setWaitingForOperand(false);
    } else if (displayValue.indexOf('.') === -1) {
      setDisplayValue(displayValue + '.');
    }
  };
  
  const handleOperatorInput = (nextOperator) => {
    const inputValue = parseFloat(displayValue);
    
    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const result = performCalculation();
      setPreviousValue(result);
      setDisplayValue(String(result));
      
      // Add to history
      setHistory([
        ...history,
        {
          calculation: `${previousValue} ${operation} ${inputValue}`,
          result: result
        }
      ]);
    }
    
    setWaitingForOperand(true);
    setOperation(nextOperator);
  };
  
  const performCalculation = () => {
    const inputValue = parseFloat(displayValue);
    
    if (operation === '+') {
      return previousValue + inputValue;
    }
    if (operation === '-') {
      return previousValue - inputValue;
    }
    if (operation === '×') {
      return previousValue * inputValue;
    }
    if (operation === '÷') {
      return previousValue / inputValue;
    }
    if (operation === '%') {
      return previousValue % inputValue;
    }
    
    return inputValue;
  };
  
  const handleEquals = () => {
    const inputValue = parseFloat(displayValue);
    
    if (previousValue === null) {
      return;
    }
    
    if (operation) {
      const result = performCalculation();
      
      // Add to history
      setHistory([
        ...history,
        {
          calculation: `${previousValue} ${operation} ${inputValue}`,
          result: result
        }
      ]);
      
      setOperation(null);
      setPreviousValue(null);
      setDisplayValue(String(result));
      setWaitingForOperand(true);
    }
  };
  
  const handleClear = () => {
    setDisplayValue('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };
  
  const handleClearEntry = () => {
    setDisplayValue('0');
  };
  
  const handleToggleSign = () => {
    const newValue = parseFloat(displayValue) * -1;
    setDisplayValue(String(newValue));
  };
  
  const handlePercentage = () => {
    const currentValue = parseFloat(displayValue);
    const newValue = currentValue / 100;
    setDisplayValue(String(newValue));
  };
  
  const handleMemoryAdd = () => {
    setMemory(memory + parseFloat(displayValue));
  };
  
  const handleMemorySubtract = () => {
    setMemory(memory - parseFloat(displayValue));
  };
  
  const handleMemoryRecall = () => {
    setDisplayValue(String(memory));
    setWaitingForOperand(false);
  };
  
  const handleMemoryClear = () => {
    setMemory(0);
  };
  
  const handleSquareRoot = () => {
    const currentValue = parseFloat(displayValue);
    const newValue = Math.sqrt(currentValue);
    setDisplayValue(String(newValue));
    
    // Add to history
    setHistory([
      ...history,
      {
        calculation: `√${currentValue}`,
        result: newValue
      }
    ]);
  };
  
  const handleSquare = () => {
    const currentValue = parseFloat(displayValue);
    const newValue = currentValue * currentValue;
    setDisplayValue(String(newValue));
    
    // Add to history
    setHistory([
      ...history,
      {
        calculation: `${currentValue}²`,
        result: newValue
      }
    ]);
  };
  
  const handleClearHistory = () => {
    setHistory([]);
  };
  
  const handleHistoryItemClick = (item) => {
    setDisplayValue(String(item.result));
  };
  
  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    setIsThemeOpen(false);
  };
  
  // Get theme classes based on current theme
  const getThemeClasses = () => {
    switch (currentTheme) {
      case 'light':
        return {
          background: 'bg-gray-100',
          text: 'text-gray-900',
          calculator: 'bg-white shadow-xl',
          display: 'bg-gray-200 text-gray-900',
          operatorButton: 'bg-gray-300 hover:bg-gray-400 text-gray-900',
          numberButton: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
          equalButton: 'bg-blue-500 hover:bg-blue-600 text-white',
          functionButton: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
          historyCard: 'bg-white'
        };
      case 'blue':
        return {
          background: 'bg-blue-900',
          text: 'text-white',
          calculator: 'bg-blue-800 shadow-xl shadow-blue-900/50',
          display: 'bg-blue-700 text-white',
          operatorButton: 'bg-blue-600 hover:bg-blue-500 text-white',
          numberButton: 'bg-blue-700 hover:bg-blue-600 text-white',
          equalButton: 'bg-yellow-500 hover:bg-yellow-400 text-blue-900',
          functionButton: 'bg-blue-600 hover:bg-blue-500 text-white',
          historyCard: 'bg-blue-800'
        };
      case 'purple':
        return {
          background: 'bg-purple-900',
          text: 'text-white',
          calculator: 'bg-purple-800 shadow-xl shadow-purple-900/50',
          display: 'bg-purple-700 text-white',
          operatorButton: 'bg-purple-600 hover:bg-purple-500 text-white',
          numberButton: 'bg-purple-700 hover:bg-purple-600 text-white',
          equalButton: 'bg-green-400 hover:bg-green-300 text-purple-900',
          functionButton: 'bg-purple-600 hover:bg-purple-500 text-white',
          historyCard: 'bg-purple-800'
        };
      case 'green':
        return {
          background: 'bg-green-900',
          text: 'text-white',
          calculator: 'bg-green-800 shadow-xl shadow-green-900/50',
          display: 'bg-green-700 text-white',
          operatorButton: 'bg-green-600 hover:bg-green-500 text-white',
          numberButton: 'bg-green-700 hover:bg-green-600 text-white',
          equalButton: 'bg-amber-500 hover:bg-amber-400 text-green-900',
          functionButton: 'bg-green-600 hover:bg-green-500 text-white',
          historyCard: 'bg-green-800'
        };
      default: // dark theme
        return {
          background: 'bg-gray-900',
          text: 'text-white',
          calculator: 'bg-gray-800 shadow-xl shadow-black/50',
          display: 'bg-gray-700 text-white',
          operatorButton: 'bg-gray-600 hover:bg-gray-500 text-white',
          numberButton: 'bg-gray-700 hover:bg-gray-600 text-white',
          equalButton: 'bg-blue-500 hover:bg-blue-600 text-white',
          functionButton: 'bg-gray-600 hover:bg-gray-500 text-white',
          historyCard: 'bg-gray-800'
        };
    }
  };
  
  const theme = getThemeClasses();
  
  // Auto scroll to bottom of history
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  return (
    <div className={`min-h-screen ${theme.background} ${theme.text} overflow-x-hidden transition-colors duration-500`}>
      <ProgressBar progress={scrollProgress} theme={currentTheme} />
      <Header theme={theme} />
      
      <main className="container mx-auto px-4 py-24">
        <section className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-12 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Modern Calculator</h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              A powerful calculator with memory functions, history tracking, and multiple themes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator */}
            <div className="animate-fadeIn">
              <div className={`${theme.calculator} rounded-3xl overflow-hidden transition-colors duration-500`}>
                {/* Display */}
                <div className={`${theme.display} p-6 transition-colors duration-500`}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm opacity-70">
                      {previousValue !== null && `${previousValue} ${operation}`}
                    </div>
                    <div className="relative">
                      <button 
                        onClick={() => setIsThemeOpen(!isThemeOpen)}
                        className="text-sm opacity-70 hover:opacity-100 transition-opacity duration-300 flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                        Theme
                      </button>
                      
                      {/* Theme selector */}
                      {isThemeOpen && (
                        <div className="absolute right-0 mt-2 w-36 rounded-lg shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-10 animate-fadeIn">
                          <div className="py-1">
                            <button 
                              onClick={() => handleThemeChange('dark')} 
                              className="block px-4 py-2 text-sm text-white hover:bg-gray-700 w-full text-left"
                            >
                              Dark
                            </button>
                            <button 
                              onClick={() => handleThemeChange('light')} 
                              className="block px-4 py-2 text-sm text-white hover:bg-gray-700 w-full text-left"
                            >
                              Light
                            </button>
                            <button 
                              onClick={() => handleThemeChange('blue')} 
                              className="block px-4 py-2 text-sm text-white hover:bg-gray-700 w-full text-left"
                            >
                              Blue
                            </button>
                            <button 
                              onClick={() => handleThemeChange('purple')} 
                              className="block px-4 py-2 text-sm text-white hover:bg-gray-700 w-full text-left"
                            >
                              Purple
                            </button>
                            <button 
                              onClick={() => handleThemeChange('green')} 
                              className="block px-4 py-2 text-sm text-white hover:bg-gray-700 w-full text-left"
                            >
                              Green
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right text-4xl md:text-5xl font-semibold overflow-x-auto whitespace-nowrap scrollbar-thin">
                    {displayValue}
                  </div>
                </div>
                
                {/* Keypad */}
                <div className="grid grid-cols-4 gap-1 p-2">
                  {/* Memory functions */}
                  <button onClick={handleMemoryClear} className={`calculator-button ${theme.functionButton}`}>MC</button>
                  <button onClick={handleMemoryRecall} className={`calculator-button ${theme.functionButton}`}>MR</button>
                  <button onClick={handleMemoryAdd} className={`calculator-button ${theme.functionButton}`}>M+</button>
                  <button onClick={handleMemorySubtract} className={`calculator-button ${theme.functionButton}`}>M-</button>
                  
                  {/* Functions */}
                  <button onClick={handleClear} className={`calculator-button ${theme.functionButton}`}>AC</button>
                  <button onClick={handleClearEntry} className={`calculator-button ${theme.functionButton}`}>CE</button>
                  <button onClick={handlePercentage} className={`calculator-button ${theme.functionButton}`}>%</button>
                  <button onClick={() => handleOperatorInput('÷')} className={`calculator-button ${theme.operatorButton}`}>÷</button>
                  
                  <button onClick={handleSquareRoot} className={`calculator-button ${theme.functionButton}`}>√</button>
                  <button onClick={handleSquare} className={`calculator-button ${theme.functionButton}`}>x²</button>
                  <button onClick={handleToggleSign} className={`calculator-button ${theme.functionButton}`}>±</button>
                  <button onClick={() => handleOperatorInput('×')} className={`calculator-button ${theme.operatorButton}`}>×</button>
                  
                  {/* Digits and operators */}
                  <button onClick={() => handleDigitInput(7)} className={`calculator-button ${theme.numberButton}`}>7</button>
                  <button onClick={() => handleDigitInput(8)} className={`calculator-button ${theme.numberButton}`}>8</button>
                  <button onClick={() => handleDigitInput(9)} className={`calculator-button ${theme.numberButton}`}>9</button>
                  <button onClick={() => handleOperatorInput('-')} className={`calculator-button ${theme.operatorButton}`}>−</button>
                  
                  <button onClick={() => handleDigitInput(4)} className={`calculator-button ${theme.numberButton}`}>4</button>
                  <button onClick={() => handleDigitInput(5)} className={`calculator-button ${theme.numberButton}`}>5</button>
                  <button onClick={() => handleDigitInput(6)} className={`calculator-button ${theme.numberButton}`}>6</button>
                  <button onClick={() => handleOperatorInput('+')} className={`calculator-button ${theme.operatorButton}`}>+</button>
                  
                  <button onClick={() => handleDigitInput(1)} className={`calculator-button ${theme.numberButton}`}>1</button>
                  <button onClick={() => handleDigitInput(2)} className={`calculator-button ${theme.numberButton}`}>2</button>
                  <button onClick={() => handleDigitInput(3)} className={`calculator-button ${theme.numberButton}`}>3</button>
                  <button onClick={handleEquals} className={`calculator-button row-span-2 ${theme.equalButton}`}>=</button>
                  
                  <button onClick={() => handleDigitInput(0)} className={`calculator-button col-span-2 ${theme.numberButton}`}>0</button>
                  <button onClick={handleDotInput} className={`calculator-button ${theme.numberButton}`}>.</button>
                </div>
              </div>
            </div>
            
            {/* History */}
            <div className="animate-fadeIn animation-delay-300">
              <div className={`${theme.calculator} rounded-3xl overflow-hidden h-full flex flex-col transition-colors duration-500`}>
                <div className={`${theme.display} p-4 flex justify-between items-center transition-colors duration-500`}>
                  <h3 className="text-xl font-semibold">Calculation History</h3>
                  <button 
                    onClick={handleClearHistory} 
                    className="text-sm opacity-70 hover:opacity-100 transition-opacity duration-300 flex items-center"
                    disabled={history.length === 0}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Clear
                  </button>
                </div>
                
                <div 
                  className="flex-grow p-4 overflow-y-auto scrollbar-thin"
                  ref={historyRef}
                >
                  {history.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p>No calculations yet</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {history.map((item, index) => (
                        <div 
                          key={index} 
                          className={`${theme.historyCard} p-3 rounded-lg cursor-pointer hover:opacity-80 transition-all duration-300 transform hover:scale-102 transition-colors duration-500`}
                          onClick={() => handleHistoryItemClick(item)}
                        >
                          <div className="text-sm opacity-70">{item.calculation}</div>
                          <div className="text-xl font-semibold text-right">{item.result}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="max-w-4xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold mb-4">Why use our calculator?</h2>
              <p className="text-gray-400 mb-6">
                Our modern calculator combines simplicity with powerful features to handle all your calculation needs.
              </p>
              
              <ul className="space-y-3">
                {[
                  'Multiple themes to match your preference',
                  'Memory functions for complex calculations',
                  'History tracking to review past calculations',
                  'Responsive design for all devices',
                  'Clean, intuitive interface'
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative animate-fadeIn animation-delay-300">
              <div className="aspect-square rounded-3xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-green-500/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-9xl font-bold text-white/10 animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
            </div>
          </div>
        </section>
        
        <section className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-12 animate-fadeIn">
            <h2 className="text-3xl font-bold mb-4">Supported Operations</h2>
            <p className="text-gray-400">
              Our calculator handles a wide range of operations for your calculation needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Basic Arithmetic',
                description: 'Addition, subtraction, multiplication, and division for everyday calculations.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                )
              },
              {
                title: 'Memory Functions',
                description: 'Store, recall, add to, and subtract from memory for complex calculations.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                )
              },
              {
                title: 'Percentages',
                description: 'Calculate percentages for discounts, tax, and other common scenarios.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                )
              },
              {
                title: 'Square & Square Root',
                description: 'Calculate squares and square roots with a single button press.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                )
              },
              {
                title: 'Sign Toggle',
                description: 'Easily switch between positive and negative numbers.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                )
              },
              {
                title: 'Calculation History',
                description: 'Track and review your previous calculations for reference.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`${theme.calculator} p-6 rounded-xl transition-transform hover:scale-105 duration-300 animate-fadeIn`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="text-center mb-4">
                  <div className="inline-block p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                </div>
                <p className="text-gray-400 text-center">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        <section className="max-w-3xl mx-auto text-center mb-20">
          <div className="animate-fadeIn">
            <h2 className="text-3xl font-bold mb-6">Ready to Calculate?</h2>
            <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
              Our calculator is designed to be intuitive, powerful, and visually appealing. Try different themes and features to find your perfect setup.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/" className="btn-outline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-7-7v14" />
                </svg>
                Back to Home
              </Link>
              <Link to="/ainews" className="btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                View AI News
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer theme={theme} />
      <FloatingNavigation theme={currentTheme} />
    </div>
  );
};

// Loading Screen Component
const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-50">
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 rounded-full border-4 border-t-4 border-blue-500 border-t-transparent animate-spin"></div>
        <div className="absolute inset-3 rounded-full border-4 border-t-4 border-purple-500 border-t-transparent animate-spin-reverse"></div>
        <div className="absolute inset-6 rounded-full border-4 border-t-4 border-green-500 border-t-transparent animate-spin-slow"></div>
        
        <div className="absolute inset-0 flex items-center justify-center animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      
      <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-green-400">
        Modern Calculator
      </h1>
      
      <div className="flex items-center gap-2 mb-6">
        <div className="h-3 w-3 rounded-full bg-blue-500 animate-bounce"></div>
        <div className="h-3 w-3 rounded-full bg-purple-500 animate-bounce" style={{animationDelay: '0.2s'}}></div>
        <div className="h-3 w-3 rounded-full bg-green-500 animate-bounce" style={{animationDelay: '0.4s'}}></div>
      </div>
      
      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 w-0 animate-loading-progress"></div>
      </div>
      
      <p className="mt-4 text-gray-400 animate-pulse">Loading calculator...</p>
    </div>
  );
};

// Progress Bar Component
const ProgressBar = ({ progress, theme }) => {
  const getProgressColor = () => {
    switch (theme) {
      case 'light':
        return 'bg-gradient-to-r from-blue-500 via-purple-500 to-green-500';
      case 'blue':
        return 'bg-gradient-to-r from-blue-300 via-blue-500 to-yellow-400';
      case 'purple':
        return 'bg-gradient-to-r from-purple-300 via-purple-500 to-green-400';
      case 'green':
        return 'bg-gradient-to-r from-green-300 via-green-500 to-amber-400';
      default:
        return 'bg-gradient-to-r from-blue-500 via-purple-500 to-green-500';
    }
  };
  
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-800">
      <div 
        className={`h-full ${getProgressColor()}`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

// Header Component
const Header = ({ theme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className={`${theme.calculator} shadow-lg transition-colors duration-500`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <div className="relative w-8 h-8 mr-2">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-1 bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-white">P</span>
                </div>
              </div>
              <span className="text-xl font-bold text-white">Peter</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex space-x-4">
                <li>
                  <Link 
                    to="/"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-300"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/ainews"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-300"
                  >
                    AI News
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/kalkulator"
                    className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-700 transition-colors duration-300"
                  >
                    Calculator
                  </Link>
                </li>
              </ul>
            </nav>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                <svg 
                  className="h-6 w-6" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  {menuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`md:hidden transition-max-height duration-300 ease-in-out overflow-hidden ${
          menuOpen ? 'max-h-64' : 'max-h-0'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/ainews"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
            >
              AI News
            </Link>
            <Link
              to="/kalkulator"
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-700 transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Calculator
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

// Footer Component
const Footer = ({ theme }) => {
  return (
    <footer className={`py-8 ${theme.calculator} transition-colors duration-500`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="relative w-8 h-8 mr-2">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full"></div>
              <div className="absolute inset-1 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-white">P</span>
              </div>
            </div>
            <span className="text-xl font-bold text-white">Peter</span>
          </div>
          
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Peter. All rights reserved.
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Floating Navigation Component
const FloatingNavigation = ({ theme }) => {
  const getThemeClasses = () => {
    switch (theme) {
      case 'light':
        return {
          container: 'bg-white bg-opacity-80 backdrop-blur-md shadow-lg',
          button1: 'bg-blue-500 hover:bg-blue-600',
          button2: 'bg-purple-500 hover:bg-purple-600',
          button3: 'bg-green-500 hover:bg-green-600'
        };
      case 'blue':
        return {
          container: 'bg-blue-800 bg-opacity-80 backdrop-blur-md shadow-lg',
          button1: 'bg-blue-500 hover:bg-blue-400',
          button2: 'bg-yellow-500 hover:bg-yellow-400',
          button3: 'bg-blue-600 hover:bg-blue-500'
        };
      case 'purple':
        return {
          container: 'bg-purple-800 bg-opacity-80 backdrop-blur-md shadow-lg',
          button1: 'bg-purple-500 hover:bg-purple-400',
          button2: 'bg-green-400 hover:bg-green-300',
          button3: 'bg-purple-600 hover:bg-purple-500'
        };
      case 'green':
        return {
          container: 'bg-green-800 bg-opacity-80 backdrop-blur-md shadow-lg',
          button1: 'bg-green-500 hover:bg-green-400',
          button2: 'bg-amber-500 hover:bg-amber-400',
          button3: 'bg-green-600 hover:bg-green-500'
        };
      default: // dark theme
        return {
          container: 'bg-gray-800 bg-opacity-80 backdrop-blur-md shadow-lg',
          button1: 'bg-blue-500 hover:bg-blue-600',
          button2: 'bg-purple-500 hover:bg-purple-600',
          button3: 'bg-green-500 hover:bg-green-600'
        };
    }
  };
  
  const themeClasses = getThemeClasses();
  
  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className={`${themeClasses.container} rounded-full p-3 flex flex-col items-center space-y-2 transition-colors duration-500`}>
        <a 
          href="#top" 
          className={`w-10 h-10 rounded-full ${themeClasses.button1} flex items-center justify-center transition-colors duration-300 tooltip`}
          data-tooltip="Top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </a>
        
        <Link 
          to="/"
          className={`w-10 h-10 rounded-full ${themeClasses.button2} flex items-center justify-center transition-colors duration-300 tooltip`}
          data-tooltip="Home"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-7-7v18" />
          </svg>
        </Link>
        
        <Link 
          to="/ainews"
          className={`w-10 h-10 rounded-full ${themeClasses.button3} flex items-center justify-center transition-colors duration-300 tooltip`}
          data-tooltip="AI News"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

// Add custom styles to the document
const CustomStyles = () => {
  // Add these styles to the document head
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes spin-reverse {
        to { transform: rotate(-360deg); }
      }
      
      @keyframes spin-slow {
        to { transform: rotate(360deg); }
      }
      
      @keyframes loading-progress {
        0% { width: 0; }
        100% { width: 100%; }
      }
      
      /* Custom Utility Classes */
      .animate-fadeIn {
        animation: fadeIn 1s ease-in-out forwards;
      }
      
      .animation-delay-300 {
        animation-delay: 300ms;
      }
      
      .animate-spin-reverse {
        animation: spin-reverse 2s linear infinite;
      }
      
      .animate-spin-slow {
        animation: spin-slow 4s linear infinite;
      }
      
      .animate-loading-progress {
        animation: loading-progress 2.5s ease-in-out forwards;
      }
      
      .transition-max-height {
        transition-property: max-height;
      }
      
      /* Button Styles */
      .btn-primary {
        display: inline-flex;
        align-items: center;
        padding: 0.75rem 1.5rem;
        background: linear-gradient(to right, #3b82f6, #8b5cf6);
        color: white;
        font-weight: 500;
        border-radius: 9999px;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        z-index: 1;
      }
      
      .btn-primary:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 0%;
        height: 100%;
        background: linear-gradient(to right, #8b5cf6, #3b82f6);
        transition: all 0.3s ease;
        z-index: -1;
      }
      
      .btn-primary:hover:before {
        width: 100%;
      }
      
      .btn-primary:hover {
        box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
        transform: translateY(-2px);
      }
      
      .btn-outline {
        display: inline-flex;
        align-items: center;
        padding: 0.75rem 1.5rem;
        background-color: transparent;
        color: white;
        font-weight: 500;
        border-radius: 9999px;
        transition: all 0.3s ease;
        border: 1px solid rgba(255, 255, 255, 0.3);
      }
      
      .btn-outline:hover {
        border-color: #3b82f6;
        color: #3b82f6;
        transform: translateY(-2px);
      }
      
      /* Calculator Button */
      .calculator-button {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        font-weight: 600;
        height: 3.5rem;
        border-radius: 0.75rem;
        transition: all 0.2s ease;
      }
      
      .calculator-button:active {
        transform: scale(0.97);
      }
      
      /* Tooltip */
      .tooltip {
        position: relative;
      }
      
      .tooltip:after {
        content: attr(data-tooltip);
        position: absolute;
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-right: 10px;
        white-space: nowrap;
        padding: 0.25rem 0.5rem;
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        font-size: 0.75rem;
        border-radius: 0.25rem;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
      }
      
      .tooltip:hover:after {
        opacity: 1;
        margin-right: 15px;
      }
      
      /* Scrollbar styling */
      .scrollbar-thin::-webkit-scrollbar {
        width: 5px;
        height: 5px;
      }
      
      .scrollbar-thin::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 10px;
      }
      
      .scrollbar-thin::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 10px;
      }
      
      .scrollbar-thin::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.3);
      }
      
      /* Scale utility */
      .hover\\:scale-102:hover {
        transform: scale(1.02);
      }
      
      .hover\\:scale-105:hover {
        transform: scale(1.05);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return null;
};

const KalkulatorWithStyles = () => {
  return (
    <>
      <CustomStyles />
      <Kalkulator />
    </>
  );
};

export default KalkulatorWithStyles;