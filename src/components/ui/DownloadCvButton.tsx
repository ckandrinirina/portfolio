import Button from './Button'
import { useLanguage } from '../../i18n/useLanguage'

export interface DownloadCvButtonProps {
  className?: string
}

export default function DownloadCvButton(props: DownloadCvButtonProps) {
  const { className } = props
  const { t } = useLanguage()
  const href = import.meta.env.BASE_URL + 'cv/erick-andrinirina-cv.pdf'

  return (
    <Button as="a" href={href} download className={className}>
      {t('downloadCv')}
    </Button>
  )
}
