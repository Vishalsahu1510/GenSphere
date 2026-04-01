import { motion } from 'framer-motion'

/**
 * Consistent layout for /ai/* tool pages: title, optional subtitle, two-column grid.
 */
const ToolWorkspace = ({ title, subtitle, eyebrow = 'Tool', children }) => {
  return (
    <div className="gs-main-inner min-h-full">
      <motion.header
        className="mb-8 max-w-3xl"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-violet-400/90">
          {eyebrow}
        </p>
        <h1 className="font-heading mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-2 text-base text-slate-400 leading-relaxed">{subtitle}</p>
        ) : null}
      </motion.header>
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-8">{children}</div>
    </div>
  )
}

export default ToolWorkspace
