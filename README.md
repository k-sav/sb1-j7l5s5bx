# Module Federation Host App

This React application uses Module Federation to load remote components and is designed to work within a React Native WebView.

## React Native WebView Integration

To integrate this web application in your React Native app, use the WebView component as follows:

```typescript
<WebView
  source={{ uri: 'your-webapp-url' }}
  onMessage={(event) => {
    // Handle any messages from the webapp
    console.log('Message from webapp:', event.nativeEvent.data);
  }}
  injectedJavaScript={`
    window.postMessage(${JSON.stringify(yourData)}, '*');
  `}
/>
```

The web application will:
1. Receive data through the WebView using `postMessage`
2. Store the data in a React Context
3. Automatically pass the data to the remote component as props

## Data Flow

1. React Native sends data through WebView's `injectedJavaScript`
2. Web app's DataContext receives and stores the data
3. Data is passed to the remote component as props
4. Any updates from the web app are sent back to React Native via `postMessage`