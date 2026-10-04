
import { motion } from "motion/react";

interface ButtonProps {
    children: string,
    onClick: () => void
}

function Button({ children, onClick }: ButtonProps) {
    return (
        <motion.button
            whileHover={{
                scale: 1.05
            }}
            whileTap={{
                scale: 0.95
            }}
            onClick={onClick}
        >
            {children}
        </motion.button>
    );
}

export default Button;