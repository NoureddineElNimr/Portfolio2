'use client'

import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMail } from 'react-icons/hi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

export default function ContactModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-3 text-[color:var(--secondary-100)] hover:text-white"
      >
        Contact me
      </button>

      <AnimatePresence>
        {open && (
          <Dialog open={open} onClose={setOpen} className="relative z-50">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <div className="fixed inset-0 flex items-center justify-center px-4">
              
              {/* Modal */}
              <Dialog.Panel
                as={motion.div}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                className="w-full max-w-md rounded-xl bg-[rgba(6,6,6,0.95)] border border-white/10 p-6 text-white shadow-xl"
              >
                <Dialog.Title className="text-xl font-extrabold text-center mb-6 text-[color:var(--secondary-100)]">
                  Get in touch
                </Dialog.Title>

                <div className="flex flex-col gap-4">
                  <a
                    href="mailto:elnimr.noureddine@gmail.com"
                    className="flex items-center justify-center gap-3 rounded-md bg-black/60 px-4 py-3 hover:bg-black transition"
                  >
                    <HiMail className="w-5 h-5" />
                    Email
                  </a>

                  <a
                    href="https://www.linkedin.com/in/noureddine-elnimr/"
                    target="_blank"
                    className="flex items-center justify-center gap-3 rounded-md bg-black/60 px-4 py-3 hover:bg-black transition"
                  >
                    <FaLinkedin className="w-5 h-5" />
                    LinkedIn
                  </a>

                  <a
                    href="https://github.com/NoureddineElNimr"
                    target="_blank"
                    className="flex items-center justify-center gap-3 rounded-md bg-black/60 px-4 py-3 hover:bg-black transition"
                  >
                    <FaGithub className="w-5 h-5" />
                    GitHub
                  </a>
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => setOpen(false)}
                    className="text-sm text-white/60 hover:text-white transition"
                  >
                    Close
                  </button>
                </div>

              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  )
}
