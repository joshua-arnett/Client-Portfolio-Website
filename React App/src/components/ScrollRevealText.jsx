import { motion } from 'framer-motion';

export function ScrollRevealText() {
  return (
    <section>
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{ fontSize: '2rem' }}
      >
        Some really elegant and cool design example text.
      </motion.h1>
    </section>
  );
}

const sentence = "Some really elegant and cool design example text.";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, // Delay between each word
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export function WordRevealText() {
  const words = sentence.split(" ");

  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3em', fontSize: '2rem' }}
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={wordVariants}>
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

const text = "Some really elegant and cool design example text.";

const letterContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04, // Faster stagger for letters
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2 },
  },
};

export function LetterRevealText() {
  const letters = Array.from(text);

  return (
    <motion.h1
      className="letter-reveal-text"
      variants={letterContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {letters.map((char, index) => (
        <motion.span key={index} variants={letterVariants}>
          {char}
        </motion.span>
      ))}
    </motion.h1>
  );
}