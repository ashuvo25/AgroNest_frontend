import { createStyles } from '@mui/styles';

export const chatBotStyles = createStyles({
  messageWrapper: {
    opacity: 0,
    transform: 'translateY(20px)',
    animation: '$messageAppear 0.3s ease forwards',
  },
  '@keyframes messageAppear': {
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  userMessage: {
    backgroundColor: '#4CAF50',
    color: 'white',
    marginLeft: 'auto',
    borderRadius: '12px',
    padding: '1rem 1.5rem',
    maxWidth: '80%',
  },
  aiMessage: {
    backgroundColor: 'white',
    color: '#333',
    marginRight: 'auto',
    borderRadius: '12px',
    padding: '1rem 1.5rem',
    maxWidth: '80%',
  },
  // Add more styles as needed
});
