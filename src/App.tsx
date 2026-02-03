import { WiredProvider, useWired } from './context/WiredContext';
import WiredLayout from './components/wired/WiredLayout';
import WiredOverview from './components/wired/WiredOverview';
import IdentityNode from './components/wired/IdentityNode';
import SignalNode from './components/wired/SignalNode';
import { AnimatePresence, motion } from 'framer-motion';

const MainContent = () => {
  const { activeNode } = useWired();

  return (
    <WiredLayout>
      <AnimatePresence mode="wait">
        {!activeNode && (
          <motion.div
            key="overview"
            className="w-full h-full"
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }}
          >
            <WiredOverview />
          </motion.div>
        )}
        {activeNode === 'identity' && <IdentityNode key="identity" />}
        {activeNode === 'signal' && <SignalNode key="signal" />}
      </AnimatePresence>
    </WiredLayout>
  );
};

function App() {
  return (
    <WiredProvider>
      <MainContent />
    </WiredProvider>
  );
}

export default App;
