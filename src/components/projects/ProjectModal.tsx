/**
 * ProjectModal — the project detail overlay.
 *
 * A controlled component: App (04-01) owns the open state by passing the active
 * `project` (or `null`). Renders the artwork header, the role/impact/stack
 * columns, and only the action buttons whose links exist. Closes on `Escape`
 * and backdrop click; locks body scroll while open; moves focus into the modal
 * on open and restores it to the trigger on close.
 *
 * SOLID notes:
 *   - S: renders detail UI only; open state is owned by the parent.
 *   - I: narrow contract — `{ project | null, onClose, returnFocusRef? }`.
 *   - D: depends on the `Project` type, not on concrete data.
 */

import { useEffect, useRef, type RefObject } from 'react'
import { useLanguage } from '../../i18n/useLanguage'
import type { Project } from '../../content/types'
import Button from '../ui/Button'
import ProjectArt from './artwork/ProjectArt'

export interface ProjectModalProps {
  /** The project to show, or null when the modal is closed. */
  project: Project | null
  /** Close the modal (Escape, backdrop, or close button). */
  onClose: () => void
  /** Element to restore focus to when the modal closes (the triggering card). */
  returnFocusRef?: RefObject<HTMLElement | null>
}

export default function ProjectModal({
  project,
  onClose,
  returnFocusRef,
}: ProjectModalProps) {
  const { t } = useLanguage()
  const closeRef = useRef<HTMLButtonElement | null>(null)

  // Lock body scroll + move focus into the modal while a project is shown.
  useEffect(() => {
    if (!project) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    // Capture the trigger element now; the ref may point elsewhere by cleanup.
    const triggerEl = returnFocusRef?.current

    return () => {
      document.body.style.overflow = previousOverflow
      // Restore focus to the trigger (the card that opened the modal).
      triggerEl?.focus()
    }
  }, [project, returnFocusRef])

  // Close on Escape while open.
  useEffect(() => {
    if (!project) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [project, onClose])

  if (!project) return null

  const { detail } = project

  return (
    <div
      className="modal-bg"
      data-testid="modal-backdrop"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={project.name}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <span className="proj-num">{project.num}</span>
          <h3 className="proj-name">{project.name}</h3>
        </div>

        <button
          ref={closeRef}
          type="button"
          className="modal-close"
          aria-label="Close"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="modal-body">
          <div className="modal-art">
            <ProjectArt id={project.id} />
          </div>

          <div className="modal-cols">
            <div>
              <div className="modal-col-label">Role</div>
              <div className="modal-col-value">{detail.role}</div>
            </div>
            <div>
              <div className="modal-col-label">Impact</div>
              <div className="modal-col-value">{detail.impact}</div>
            </div>
            <div>
              <div className="modal-col-label">Stack</div>
              <div className="modal-col-value">{detail.stack}</div>
            </div>
          </div>

          <div className="modal-actions">
            {project.link && (
              <Button
                as="a"
                href={project.link}
                variant="primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('visitLive')}
              </Button>
            )}
            {project.repo && (
              <Button
                as="a"
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('readCase')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
