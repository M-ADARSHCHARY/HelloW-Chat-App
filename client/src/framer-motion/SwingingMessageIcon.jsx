import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

const SwingingMessageIcon = ()=> {
  return (
    <motion.div
      animate={{ y: [0, -5, 0, 5, 0] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <MessageSquare size={24} strokeWidth={2} className="text-blue-500" />
    </motion.div>
  );
}

export default SwingingMessageIcon;
