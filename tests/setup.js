// Jest setup file for Chrome extension testing

// Mock Chrome APIs
global.chrome = {
  storage: {
    local: {
      get: jest.fn(),
      set: jest.fn(),
      clear: jest.fn()
    }
  },
  runtime: {
    onMessage: {
      addListener: jest.fn()
    },
    getURL: jest.fn()
  },
  tabs: {
    query: jest.fn(),
    sendMessage: jest.fn(),
    create: jest.fn()
  }
};

// Mock DOM APIs
Object.defineProperty(window, 'postMessage', {
  value: jest.fn()
});

// Setup JSDOM environment
require('jsdom-global')();